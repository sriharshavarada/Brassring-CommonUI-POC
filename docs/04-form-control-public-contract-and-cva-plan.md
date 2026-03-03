# Form Control Public Contract + Reusable CVA Plan

## Purpose
This document explains the newly implemented direction for form controls:
- framework-neutral public API at wrapper level,
- reusable CVA base for Angular forms integration,
- 2-hop event forwarding,
- control registry for id/name/class value lookup.

Current implementation scope in code: `br-text` and `br-date`.

## Architecture (3 parties)
1. Consumer (screens)
2. Wrapper (`br-*` components)
3. Implementation (`custom` / `material`)

### Data and event flow
- Consumer -> Wrapper -> Implementation for value/disabled/config rendering.
- Implementation -> Wrapper -> Consumer for UI events.
- Angular Forms <-> Wrapper via CVA methods (internal bridge).

## Public Contract (Wrapper-level)
Wrappers now expose/normalize these neutral inputs:
- `id`
- `controlId` (alias; normalized into effective id)
- `name`
- `className`
- `value`
- `disabled`
- `required`
- `meta` (consumer-defined arbitrary payload bag)

Wrappers now expose these outputs:
- `valueChange`
- `blur`
- `focus`
- `input`
- `change`
- `keydown`
- `keyup`
- `click`
- `controlEvent` (normalized envelope with control identity + value + meta + originalEvent)

This contract is designed to remain stable even if implementation internals change.

## CVA Base (shared)
A shared base abstraction was added to avoid duplicated CVA boilerplate.

File:
- `/Users/sriharshavinfinite.com/Desktop/CommonUIForBRPOC/src/app/common/forms/base-value-accessor.ts`

Contains common CVA plumbing:
- `writeValue`
- `registerOnChange`
- `registerOnTouched`
- `setDisabledState`
- helpers: `emitValueChange(...)`, `markTouched()`

Usage:
- `BrTextComponent` extends `BaseValueAccessor<string>`
- `BrDateComponent` extends `BaseValueAccessor<string>`

## Control Registry (native comfort API)
A central registry service was added to support value lookups by id/name/class.

File:
- `/Users/sriharshavinfinite.com/Desktop/CommonUIForBRPOC/src/app/common/services/control-registry.service.ts`

API:
- `valueById(id)`
- `valuesByName(name)`
- `valuesByClass(className)`

Wrappers register/unregister themselves and provide `getValue` handles.

## 2-Hop Event Forwarding
All required UI events are forwarded in two steps:
1. Implementation emits event to wrapper.
2. Wrapper emits event to consumer.

Also, wrapper invokes CVA callbacks where needed:
- value events -> `onChange` callback via `emitValueChange(...)`
- blur/touch events -> `onTouched` callback via `markTouched()`

## Files by Plan Part

### A) Shared CVA + Registry
- `/Users/sriharshavinfinite.com/Desktop/CommonUIForBRPOC/src/app/common/forms/base-value-accessor.ts`
- `/Users/sriharshavinfinite.com/Desktop/CommonUIForBRPOC/src/app/common/services/control-registry.service.ts`
- Barrel exports:
  - `/Users/sriharshavinfinite.com/Desktop/CommonUIForBRPOC/src/app/common/index.ts`

### B) Model updates for normalized public contract
- Text config model:
  - `/Users/sriharshavinfinite.com/Desktop/CommonUIForBRPOC/src/app/common/models/controls-config.model.ts`
- Date config model:
  - `/Users/sriharshavinfinite.com/Desktop/CommonUIForBRPOC/src/app/common/models/date-config.model.ts`

### C) Adapter propagation of id/name/class
- `/Users/sriharshavinfinite.com/Desktop/CommonUIForBRPOC/src/app/common/adapters/text.adapter.ts`
- `/Users/sriharshavinfinite.com/Desktop/CommonUIForBRPOC/src/app/common/adapters/date.adapter.ts`

### D) Wrapper refactors (CVA + neutral inputs/outputs + registry)
- Text wrapper:
  - `/Users/sriharshavinfinite.com/Desktop/CommonUIForBRPOC/src/app/common/components/br-text/br-text.component.ts`
  - `/Users/sriharshavinfinite.com/Desktop/CommonUIForBRPOC/src/app/common/components/br-text/br-text.component.html`
- Date wrapper:
  - `/Users/sriharshavinfinite.com/Desktop/CommonUIForBRPOC/src/app/common/components/br-date/br-date.component.ts`
  - `/Users/sriharshavinfinite.com/Desktop/CommonUIForBRPOC/src/app/common/components/br-date/br-date.component.html`

### E) Implementation-level event emitters and id/name/class wiring
- Text custom:
  - `/Users/sriharshavinfinite.com/Desktop/CommonUIForBRPOC/src/app/common/implementations/form/controls/text/custom/custom-text-control.component.ts`
  - `/Users/sriharshavinfinite.com/Desktop/CommonUIForBRPOC/src/app/common/implementations/form/controls/text/custom/custom-text-control.component.html`
- Text material:
  - `/Users/sriharshavinfinite.com/Desktop/CommonUIForBRPOC/src/app/common/implementations/form/controls/text/material/material-text-control.component.ts`
  - `/Users/sriharshavinfinite.com/Desktop/CommonUIForBRPOC/src/app/common/implementations/form/controls/text/material/material-text-control.component.html`
- Date custom:
  - `/Users/sriharshavinfinite.com/Desktop/CommonUIForBRPOC/src/app/common/implementations/form/controls/date/custom/custom-date.component.ts`
  - `/Users/sriharshavinfinite.com/Desktop/CommonUIForBRPOC/src/app/common/implementations/form/controls/date/custom/custom-date.component.html`
- Date material:
  - `/Users/sriharshavinfinite.com/Desktop/CommonUIForBRPOC/src/app/common/implementations/form/controls/date/material/material-date.component.ts`
  - `/Users/sriharshavinfinite.com/Desktop/CommonUIForBRPOC/src/app/common/implementations/form/controls/date/material/material-date.component.html`

### F) Normalized event payload model
- `/Users/sriharshavinfinite.com/Desktop/CommonUIForBRPOC/src/app/common/models/control-event.model.ts`
- Exported via:
  - `/Users/sriharshavinfinite.com/Desktop/CommonUIForBRPOC/src/app/common/index.ts`

## Consumer Example Added
A concrete consumer demonstration was added in Add User screen to show:
- `meta` passing from config,
- wrapper-level forwarded events (`blur`, `keyup`, `focus`),
- normalized `controlEvent` payload handling,
- registry reads by id and class.

Files:
- `/Users/sriharshavinfinite.com/Desktop/CommonUIForBRPOC/src/app/screens/add-user/add-user.component.ts`
- `/Users/sriharshavinfinite.com/Desktop/CommonUIForBRPOC/src/app/screens/add-user/add-user.component.html`
- `/Users/sriharshavinfinite.com/Desktop/CommonUIForBRPOC/src/app/screens/add-user/add-user.component.scss`

## Notes and Current Limits
- Scope currently implemented: `br-text` and `br-date`.
- Remaining controls still need same pattern rollout:
  - `br-radio`, `br-checkbox`, `br-single-select`, `br-multi-select`, `br-autocomplete`.
- Wrapper `[config]` usage is still supported for backward compatibility while neutral inputs are added.

## Validation status
- Typecheck command used:
  - `npx tsc -p tsconfig.app.json --noEmit`
- Status: passing after current changes.
