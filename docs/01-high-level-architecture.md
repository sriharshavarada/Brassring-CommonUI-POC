# High-Level Architecture

## Purpose
This POC provides a UI abstraction layer so screens use only common wrappers (`br-grid`, `br-date`) while the underlying UI library can be switched centrally.

## Core Design
- `Facade pattern`: Screen code uses only wrapper controls.
- `Adapter pattern`: Generic JSON config is transformed into implementation-specific inputs.
- `Mode-based strategy`: Control rendering is selected based on configured mode (`CUSTOM`, `MATERIAL`, `CANVAS` for grid; `CUSTOM`/`MATERIAL` for date).

## Key Layers
- **Consumer layer**: Feature screens such as:
  - `/Users/sriharshavinfinite.com/Desktop/CommonUIForBRPOC/src/app/screens/user-list/user-list.component.ts`
  - `/Users/sriharshavinfinite.com/Desktop/CommonUIForBRPOC/src/app/screens/order-list/order-list.component.ts`
- **Common public API**:
  - `/Users/sriharshavinfinite.com/Desktop/CommonUIForBRPOC/src/app/common/index.ts`
- **Wrapper facades**:
  - `/Users/sriharshavinfinite.com/Desktop/CommonUIForBRPOC/src/app/common/components/br-grid/br-grid.component.ts`
  - `/Users/sriharshavinfinite.com/Desktop/CommonUIForBRPOC/src/app/common/components/br-date/br-date.component.ts`
- **Adapters**:
  - `/Users/sriharshavinfinite.com/Desktop/CommonUIForBRPOC/src/app/common/adapters/grid.adapter.ts`
  - `/Users/sriharshavinfinite.com/Desktop/CommonUIForBRPOC/src/app/common/adapters/date.adapter.ts`
- **Implementations**:
  - Grid:
    - `/Users/sriharshavinfinite.com/Desktop/CommonUIForBRPOC/src/app/common/implementations/custom-grid/custom-grid.component.ts`
    - `/Users/sriharshavinfinite.com/Desktop/CommonUIForBRPOC/src/app/common/implementations/material-grid/material-grid.component.ts`
    - `/Users/sriharshavinfinite.com/Desktop/CommonUIForBRPOC/src/app/common/implementations/canvas-grid/canvas-grid.component.ts`
    - Shared advanced shell:
      - `/Users/sriharshavinfinite.com/Desktop/CommonUIForBRPOC/src/app/common/implementations/grid-shell/grid-shell.component.ts`
  - Date:
    - `/Users/sriharshavinfinite.com/Desktop/CommonUIForBRPOC/src/app/common/implementations/custom-date/custom-date.component.ts`
    - `/Users/sriharshavinfinite.com/Desktop/CommonUIForBRPOC/src/app/common/implementations/material-date/material-date.component.ts`
- **Mode configuration**:
  - `/Users/sriharshavinfinite.com/Desktop/CommonUIForBRPOC/src/app/common/config/ui-mode.config.ts`

## Configuration Model Strategy
- **Behavior/Data config**: sort/filter/pagination/actions/personalization.
- **Visual config (`uiConfig`)**: density, size, variants, tokens.
- Adapters normalize defaults so implementations always receive complete values.

## Event Strategy
- Grid emits one structured event stream via `(action)` with `source`, `actionId`, and contextual payload.
- Business logic stays in consumer screens/services, not inside grid/date implementations.

