# Project Handoff: Work Completed So Far (Updated)

This document is intended for the next engineer/AI agent to continue work without re-discovery.

## Repositories

### Demo / docs / consumer app
- Path: `/Users/sriharshavinfinite.com/Desktop/CommonUIForBRPOC`
- Branch: `main`
- Role: consumer app, docs site, playground, GitHub Pages host

### Library repo
- Path: `/Users/sriharshavinfinite.com/Desktop/br-ui-wrapper`
- Branch: `main`
- Role: source of `@sriharshavarada/br-ui-wrapper`, published to GitHub Packages

## Commit Timeline (Important)
These are the key commits in order (older -> newer):
- `cdfbad1` `Day 1 Changes`
- `5d42f2b` `Day 2 Changes`
- `e62b24f` `increasing the budget`
- `76b26f5` `KT Doc`
- `9c2c63c` `Model PopUP`
- `3d1c98e` `Cusome modelpopup` (current `HEAD`)
- `59a221e` `docs: update handoff with date control and tree editor changes`
- `81c77af` `2-Way-Binding Attempt 1`

## Post-Commit Delta After Latest Local HEADs
This section captures local work that exists after the latest checked-in commits currently visible in each repo.

Latest local commit before these changes:
- app repo:
  - `054fd39` `docs: capture yalc accordion handoff and app demos`
- library repo:
  - `0447bed` `feat: add projected accordion items and branded accessibility updates`

### Current package mode
- The app is intentionally left in local `yalc` mode only.
- App dependency currently points to:
  - `file:.yalc/@sriharshavarada/br-ui-wrapper`
- This is reflected in:
  - `/Users/sriharshavinfinite.com/Desktop/CommonUIForBRPOC/package.json`
  - `/Users/sriharshavinfinite.com/Desktop/CommonUIForBRPOC/package-lock.json`
- Do not treat this state as published-package verification; this is local library-consumer validation mode.

### App repo changes after `054fd39`
- `add-user` screen now contains a projected-content accordion example using:
  - `br-accordion`
  - `br-accordion-item`
  - nested wrapper controls inside accordion bodies
- Files:
  - `/Users/sriharshavinfinite.com/Desktop/CommonUIForBRPOC/src/app/screens/add-user/add-user.component.ts`
  - `/Users/sriharshavinfinite.com/Desktop/CommonUIForBRPOC/src/app/screens/add-user/add-user.component.html`
  - `/Users/sriharshavinfinite.com/Desktop/CommonUIForBRPOC/src/app/screens/add-user/add-user.component.scss`

- Accordion playground was expanded substantially:
  - new `Direct Input` preset was added
  - direct-input variant now demonstrates projected `br-accordion-item` usage instead of `[items]`-driven accordion config
  - direct-input variant keeps a small note instead of pretending there is a real `BrAccordionConfig`
  - code studio for direct-input shows one combined projected-markup example
  - live direct-input cards now include:
    - basic projected items
    - multi-expand
    - flush
    - disabled item
    - projected-content example with nested wrapper controls
  - direct-input accordion lists were stabilized as readonly properties after a bug where getter-created arrays caused projected items to rebuild and prevented panels from staying open
- Files:
  - `/Users/sriharshavinfinite.com/Desktop/CommonUIForBRPOC/src/app/screens/playground/playground.component.ts`
  - `/Users/sriharshavinfinite.com/Desktop/CommonUIForBRPOC/src/app/screens/playground/playground.component.html`
  - `/Users/sriharshavinfinite.com/Desktop/CommonUIForBRPOC/src/app/screens/playground/playground.component.scss`

- Grid playground and library were extended for frozen-column testing and delivery:
  - dedicated `Frozen Columns + Horizontal Scroll` preset was added in Playground
  - preset now uses a wider dense column set so horizontal movement is easy to validate
  - `Columns` panel now supports `Pin` / `Unpin`
  - pinned columns show a `Frozen` badge
  - frozen columns were tested and aligned across:
    - `CUSTOM`
    - `MATERIAL`
    - `PRIMENG`
    - `CANVAS`
  - final expected behavior is:
    - only the inner grid table area scrolls horizontally
    - pinned columns and their headers stay fixed on the left
    - toolbar / sort / filter / pagination do not slide as one outer block
- Files:
  - `/Users/sriharshavinfinite.com/Desktop/CommonUIForBRPOC/src/app/screens/playground/playground.component.ts`
  - `/Users/sriharshavinfinite.com/Desktop/CommonUIForBRPOC/src/app/screens/playground/playground.component.html`
  - `/Users/sriharshavinfinite.com/Desktop/CommonUIForBRPOC/src/app/screens/playground/playground.component.scss`

### App repo accessibility/demo changes after `054fd39`
- Playground consumer config/code generation now preserves field-level accessibility inputs for wrapper controls:
  - `ariaLabel`
  - `ariaLabelledBy`
  - `ariaDescribedBy`
- This was wired through the generated consumer helper code for:
  - text
  - text-area
  - single-select
  - multi-select
  - checkbox
  - radio
  - autocomplete
  - date

- Playground presets now visibly expose accessibility config instead of hiding it behind internal defaults:
  - grid presets include `accessibility` blocks for grid labels, dialog labels, selection labels, search labels, pagination labels, and row/primary action menu labels
  - form presets include form-level `accessibility` plus field-level `ariaLabel`
  - single-control, events-demo, and registry-demo variants now automatically inject missing field-level `ariaLabel` values from the field label and keep a form-level `accessibility.ariaLabel`
  - button presets now include `ariaLabel` across all variants, not just icon-only buttons
  - modal presets include dialog labels/descriptions/close button labels
  - accordion presets include top-level `ariaLabel` plus item-level `ariaLabel`

- A WCAG tracking document was added to separate current implementation status from actual compliance signoff:
  - `/Users/sriharshavinfinite.com/Desktop/CommonUIForBRPOC/docs/09-wcag-2.1-aa-coverage-matrix.md`
  - This matrix covers all 47 WCAG 2.1 A/AA criteria with ownership/status notes

- Dev-server restart workflow was hardened to reduce stale Angular/lazy-chunk issues during local `yalc` verification:
  - `/Users/sriharshavinfinite.com/Desktop/CommonUIForBRPOC/scripts/restart-app-clean.sh`
  - Script now accepts host/port arguments and clears `.angular/cache`, `out-tsc`, and `dist/br-ui-framework` before restart

### Additional app-side rollout after `3e59e05` (local `yalc` validation, not checked in yet)
- Playground direct-input variants were expanded beyond text-only usage so consumers can validate wrapper-attribute usage directly for:
  - text
  - text-area
  - single-select
  - multi-select
  - checkbox
  - radio
  - autocomplete
  - date
- Direct-input Code Studio output was simplified so generated consumer examples no longer lean on large config objects for these variants:
  - generated HTML now shows direct wrapper attributes/bindings
  - generated TS now keeps only small local properties/option arrays where needed
  - `Apply Code`/preview logic was updated accordingly
- Playground accessibility exposure was also tightened for direct-input usage:
  - direct-input examples now visibly show the same ARIA-style wrapper inputs consumers are expected to pass
  - this keeps accessibility discoverable in both config-driven and direct-input demos instead of hiding it in internal defaults
- Code editor / JSON workbench usability was improved for long snippets:
  - horizontal overflow was enabled for long generated code/config
  - textareas were switched to non-wrapping behavior
  - direct-input snippet rendering now preserves long lines so horizontal scrolling works instead of forced wrapping
- Date control verification was continued in playground across variants:
  - `CUSTOM` date keyboard behavior was improved locally for popup focus trapping and single active day focus
  - `MATERIAL` date header/month synchronization was improved locally so the dropdown reflects keyboard-driven month changes
  - `PRIMENG` date received multiple local keyboard-navigation attempts, but it is still not reliable enough to call accessibility-ready
  - current practical conclusion:
    - `CUSTOM`: workable baseline
    - `MATERIAL`: workable baseline
    - `PRIMENG`: still a known keyboard accessibility gap and should not be treated as signoff-ready
- Important implementation constraint confirmed during this work:
  - do not rely on document-level listeners for library popup/date behavior
  - keep keyboard/focus handling scoped to the component/overlay itself so consumer apps do not inherit unexpected document-level side effects

### Library repo changes after `0447bed`
- `br-accordion` now supports projected child items through:
  - `ContentChildren(BrAccordionItemComponent)`
  - runtime adaptation of projected items into the wrapper contract
  - sync/update logic for projected item expansion state
- Public projected child component is now exposed:
  - `/Users/sriharshavinfinite.com/Desktop/br-ui-wrapper/projects/br-ui-wrapper/src/lib/common/components/br-accordion/br-accordion-item.component.ts`
  - exported from `/Users/sriharshavinfinite.com/Desktop/br-ui-wrapper/projects/br-ui-wrapper/src/public-api.ts`

- Accordion item model was expanded to support projected content templates:
  - `contentTemplate?: TemplateRef<unknown> | null`
- File:
  - `/Users/sriharshavinfinite.com/Desktop/br-ui-wrapper/projects/br-ui-wrapper/src/lib/common/models/controls-config.model.ts`

- Modal and form models were extended so accordion can be used as a field type:
  - form field type now includes `accordion`
  - modal field type now includes `accordion`
  - accordion item arrays plus `multiple` / `flush` are accepted in those contracts
- Files:
  - `/Users/sriharshavinfinite.com/Desktop/br-ui-wrapper/projects/br-ui-wrapper/src/lib/common/models/form-config.model.ts`
  - `/Users/sriharshavinfinite.com/Desktop/br-ui-wrapper/projects/br-ui-wrapper/src/lib/common/models/modal-config.model.ts`

- Accordion rendering was wired into modal implementations:
  - custom modal
  - material modal
  - primeng modal
- Files:
  - `/Users/sriharshavinfinite.com/Desktop/br-ui-wrapper/projects/br-ui-wrapper/src/lib/common/implementations/modal/custom/custom-modal.component.ts`
  - `/Users/sriharshavinfinite.com/Desktop/br-ui-wrapper/projects/br-ui-wrapper/src/lib/common/implementations/modal/custom/custom-modal.component.html`
  - `/Users/sriharshavinfinite.com/Desktop/br-ui-wrapper/projects/br-ui-wrapper/src/lib/common/implementations/modal/material/material-modal.component.ts`
  - `/Users/sriharshavinfinite.com/Desktop/br-ui-wrapper/projects/br-ui-wrapper/src/lib/common/implementations/modal/material/material-modal.component.html`
  - `/Users/sriharshavinfinite.com/Desktop/br-ui-wrapper/projects/br-ui-wrapper/src/lib/common/implementations/modal/primeng/prime-modal.component.ts`

- Accordion branding pass was completed across all implementations:
  - custom, material, and Prime accordions now use branding tokens for typography, surface colors, borders, shadows, focus treatment, and disabled styling
- Files:
  - `/Users/sriharshavinfinite.com/Desktop/br-ui-wrapper/projects/br-ui-wrapper/src/lib/common/implementations/form/controls/accordion/custom/custom-accordion-control.component.scss`
  - `/Users/sriharshavinfinite.com/Desktop/br-ui-wrapper/projects/br-ui-wrapper/src/lib/common/implementations/form/controls/accordion/material/material-accordion-control.component.scss`
  - `/Users/sriharshavinfinite.com/Desktop/br-ui-wrapper/projects/br-ui-wrapper/src/lib/common/implementations/form/controls/accordion/primeng/prime-accordion-control.component.scss`

- Accordion accessibility was improved, but not fully exhausted:
  - custom and Prime keep controlled regions in the DOM when collapsed via `[hidden]`
  - decorative icon/caret content is now `aria-hidden`
  - region/header relationships were improved with stable ids and `aria-labelledby`
  - Material icon text is also hidden from assistive tech
- Files:
  - `/Users/sriharshavinfinite.com/Desktop/br-ui-wrapper/projects/br-ui-wrapper/src/lib/common/implementations/form/controls/accordion/custom/custom-accordion-control.component.html`
  - `/Users/sriharshavinfinite.com/Desktop/br-ui-wrapper/projects/br-ui-wrapper/src/lib/common/implementations/form/controls/accordion/material/material-accordion-control.component.html`
  - `/Users/sriharshavinfinite.com/Desktop/br-ui-wrapper/projects/br-ui-wrapper/src/lib/common/implementations/form/controls/accordion/primeng/prime-accordion-control.component.html`

- Grid layout behavior was extended beyond scaffolding and is now working in local validation mode:
  - horizontal scrolling is implemented inside the actual grid table area
  - leading columns can be frozen with `frozen: true`
  - column layout state now supports user pin/unpin flows through the shared Columns panel
  - sticky left offsets are computed per frozen column so headers and body cells stay aligned
  - shell sizing was corrected so the whole grid container does not slide during horizontal movement
  - sticky/z-index layering was corrected so frozen headers stay above regular scrolling cells
  - variant-specific fixes were required for:
    - `MATERIAL` frozen header offsets
    - `PRIMENG` frozen sticky header behavior
- Main files touched during this rollout:
  - `/Users/sriharshavinfinite.com/Desktop/br-ui-wrapper/projects/br-ui-wrapper/src/lib/common/implementations/grid/shell/grid-shell.component.ts`
  - `/Users/sriharshavinfinite.com/Desktop/br-ui-wrapper/projects/br-ui-wrapper/src/lib/common/implementations/grid/shell/grid-shell.component.html`
  - `/Users/sriharshavinfinite.com/Desktop/br-ui-wrapper/projects/br-ui-wrapper/src/lib/common/implementations/grid/shell/grid-shell.component.scss`
  - `/Users/sriharshavinfinite.com/Desktop/br-ui-wrapper/projects/br-ui-wrapper/src/lib/common/implementations/grid/engine/grid-layout.utils.ts`
  - `/Users/sriharshavinfinite.com/Desktop/br-ui-wrapper/projects/br-ui-wrapper/src/lib/common/implementations/grid/custom/engine/*`
  - `/Users/sriharshavinfinite.com/Desktop/br-ui-wrapper/projects/br-ui-wrapper/src/lib/common/implementations/grid/canvas/engine/*`
  - `/Users/sriharshavinfinite.com/Desktop/br-ui-wrapper/projects/br-ui-wrapper/src/lib/common/implementations/grid/material/engine/*`
  - `/Users/sriharshavinfinite.com/Desktop/br-ui-wrapper/projects/br-ui-wrapper/src/lib/common/implementations/grid/primeng-grid/engine/*`

### Library repo accessibility changes after `0447bed`
- A shared accessibility contract was added across public models and adapters so consumer config can carry accessibility data consistently through all implementations:
  - control-level aria support was added for text, text-area, single-select, multi-select, checkbox, radio, autocomplete, date, and button adapters/models
  - modal contracts now carry dialog labels/descriptions/close button labels
  - grid contracts now carry labels for grid, pagination, search, select-all, row selection, row menus, primary action menus, sort/filter/columns dialogs, and icon-only cell actions

- Control implementations were updated to consume the new accessibility contract across custom/material/Prime renderers where available:
  - text
  - text-area
  - single-select
  - multi-select
  - checkbox
  - radio
  - autocomplete
  - date
  - button
  - accordion

- Grid accessibility hardening was applied across shell and engine layers:
  - row action triggers and primary action menus now expose accessible names and menu semantics
  - sort/filter/columns overlays now use accessible dialog labels
  - grid toolbar/icon-only actions now expose accessible names
  - row-selection and select-all controls now expose labels
  - pagination now exposes a named navigation landmark
  - visible focus styling was added to grid overlays and popup controls
  - all grid engines were updated to consume the same labels:
    - custom
    - material
    - canvas
    - primeng

- Modal accessibility hardening was added across custom/material/Prime modal implementations:
  - dialog container focus target
  - focus handoff into the modal on open
  - tab trapping inside supported modal variants
  - focus return on close

- Regression tests were added for the new accessibility behavior:
  - `/Users/sriharshavinfinite.com/Desktop/br-ui-wrapper/projects/br-ui-wrapper/src/lib/common/implementations/grid/shell/grid-shell.component.spec.ts`
  - `/Users/sriharshavinfinite.com/Desktop/br-ui-wrapper/projects/br-ui-wrapper/src/lib/common/implementations/modal/custom/custom-modal.component.spec.ts`

### Additional library-side rollout after `83b545f` (local `yalc` validation, not checked in yet)
- Direct-input accessibility gaps were reduced at the wrapper level so consumers can pass ARIA-style inputs as wrapper attributes instead of only through config objects:
  - text
  - text-area
  - single-select
  - multi-select
  - checkbox
  - radio
  - autocomplete
  - date
  - button was extended beyond `ariaLabel`
  - accordion / projected `br-accordion-item`
  - modal accessibility override inputs
- This means consumer usage is now intended to support both patterns:
  - config-driven accessibility
  - direct wrapper attributes such as `[ariaLabel]`, `[ariaLabelledBy]`, and `[ariaDescribedBy]`
- Grid remains config-driven by design:
  - there is no equivalent direct-attribute consumer mode for grid
  - consumers should keep passing grid accessibility through the grid config/accessibility contract
- Date-control accessibility/local keyboard work continued after the earlier accessibility commit:
  - `CUSTOM` date:
    - popup focus trapping was tightened
    - active-day/tab-order behavior was reduced to a single active date cell instead of tabbing every date
    - month/year dropdown binding was corrected so header selection matches the visible month
  - `MATERIAL` date:
    - month/year header binding was corrected
    - header synchronization was improved so keyboard month navigation updates the visible dropdown state
  - `PRIMENG` date:
    - several local attempts were made to improve popup close behavior, arrow navigation, disabled-date skipping, and month crossover behavior
    - despite that iteration, PrimeNG date keyboard navigation is still not stable enough for accessibility signoff
    - treat PrimeNG date as a known limitation until a deeper rework or variant-specific replacement is done

### Validation already performed for this local state
- library build passed locally
- library tests passed locally for the new grid/modal accessibility coverage
- library was pushed through:
  - `npm run dev:yalc:push`
- app was restarted with:
  - `/Users/sriharshavinfinite.com/Desktop/CommonUIForBRPOC/scripts/restart-app-clean.sh`
- app is currently expected to be verified in local `yalc` mode, not published-package mode

### What those missed 2 commits likely covered
If someone missed recent check-ins:
- `9c2c63c` / `3d1c98e` are modal-related iterations (popup behavior/configuration and custom modal wiring refinement).
- `76b26f5` introduced/updated handoff/knowledge-transfer documentation.

## Original Goal
Build a common Angular UI abstraction layer where consuming screens use only wrappers (facades), while implementation libraries can be switched centrally.

## Public API Contract (Consumer-facing)
Consumers should import only from:
- `@sriharshavarada/br-ui-wrapper`

Primary wrappers currently exposed:
- `BrGridComponent`
- `BrModalComponent`
- `BrTextComponent`
- `BrTextAreaComponent`
- `BrDateComponent`
- `BrSingleSelectComponent`
- `BrMultiSelectComponent`
- `BrCheckboxComponent`
- `BrRadioComponent`
- `BrAutocompleteComponent`

Also exposed:
- config and event models
- `RuntimeUiConfigService`
- `ControlRegistryService`
- `BrandingRuntimeService`
- `EnterpriseBrandingAdapter`
- `TalentGatewayBrandingAdapter`
- normalized branding models

## Architecture Already Implemented

### 1) Wrapper + Adapter pattern
- The actual wrappers/adapters/implementations now live in the library repo:
  - `/Users/sriharshavinfinite.com/Desktop/br-ui-wrapper/projects/br-ui-wrapper/src/public-api.ts`
  - `/Users/sriharshavinfinite.com/Desktop/br-ui-wrapper/projects/br-ui-wrapper/src/lib/common/`
- App-local duplicates for form controls, grid, and modal were removed after library migration.

### 2) Implementations supported
- Grid: `CUSTOM`, `MATERIAL`, `CANVAS`
- Date: `CUSTOM`, `MATERIAL`
- Modal: `CUSTOM`, `MATERIAL`
- Controls (separate wrappers per control): `CUSTOM`, `MATERIAL`

### 2A) PrimeNG work added later by another contributor
Two later commits introduced PrimeNG as a third implementation family:

- library repo:
  - `07cc1d4` `Prime Ng Changes`
- app repo:
  - `fde3a31` `Prime NG changes`

What those commits added:
- `PRIMENG` mode added to:
  - `/Users/sriharshavinfinite.com/Desktop/br-ui-wrapper/projects/br-ui-wrapper/src/lib/common/config/ui-mode.config.ts`
- PrimeNG implementation components added in the library repo for:
  - text
  - text-area
  - single-select
  - multi-select
  - checkbox
  - radio
  - autocomplete
  - date
  - grid
  - modal
- Wrappers and adapters updated to branch on `PRIMENG`
- App-side mode/playground UI updated to expose PrimeNG mode options

Important caveat discovered during verification:
- the committed PrimeNG package versions were `21.x`
- this workspace is Angular 19
- PrimeNG 21 is not compatible with Angular 19 build tooling here

Result:
- committed PrimeNG source changes exist in both repos
- but the committed dependency versions were not locally buildable on Angular 19 as-is

### 2B) App repo cleanup after that PrimeNG commit
Later app cleanup commit:
- app repo:
  - `e2f6b3c` `Cleanup local artifacts and remove app primeicons`

This commit intentionally removed only the unnecessary app-side friend changes:
- tracked `.vs/` files
- tracked `.yalc/` package artifacts
- `yalc.lock`
- `poc_build_output.txt`
- `poc_serve_output.txt`
- `primeicons` from app `package.json` / `package-lock.json`

What this cleanup did **not** remove:
- the PrimeNG app wiring itself
- the app’s local `yalc` library flow
- the library repo’s PrimeNG source changes

### 2C) PrimeNG compatibility state now
PrimeNG was normalized to Angular 19-compatible versions and is now part of the freeze-ready state.

Current version alignment:
- app repo:
  - `primeng@19.1.4`
  - `@primeng/themes@19.1.4`
- library repo workspace:
  - `primeng@19.1.4`
- library repo publishable peer deps:
  - `primeng@^19.0.0`
  - `@primeng/themes@^19.0.0`

Current result:
- library repo builds successfully
- published package `@sriharshavarada/br-ui-wrapper@0.0.3` includes PrimeNG support
- app repo builds successfully against the published package
- local app runs successfully with PrimeNG mode at:
  - `http://localhost:4200/`

### 2D) Grid redesign planning started
Grid requirements have now outgrown the current implementation shape. A dedicated architecture plan was added here:
- `/Users/sriharshavinfinite.com/Desktop/CommonUIForBRPOC/docs/07-grid-architecture-plan.md`

Phase 1 contract scaffolding has been added locally in the library model file:
- `/Users/sriharshavinfinite.com/Desktop/br-ui-wrapper/projects/br-ui-wrapper/src/lib/common/models/grid-config.model.ts`

Draft types added:
- `BrGridCellType`
- `BrGridCellConfig`
- `BrGridCellActionConfig`
- `BrGridCellOption`
- `BrGridQueryState`
- `BrGridDataResult`
- `BrGridColumnLayoutState`

Existing types expanded in a backward-compatible way:
- `BrGridColumn`
- `BrGridActionEvent`
- `BrGridConfig`

This started as scaffolding, but the library has now moved further than the initial draft:
- separate engine boundaries exist for all current grid variants
- rich cell types are implemented
- template override plumbing is implemented
- the contract is now part of the release state, not just a plan

### 2E) Grid scaffolding adopted locally without breaking demos
After the Phase 1 contract scaffolding was added, the grid adapter and shared shell were updated locally to understand the new model areas without changing current consumer demos.

Library files updated locally:
- `/Users/sriharshavinfinite.com/Desktop/br-ui-wrapper/projects/br-ui-wrapper/src/lib/common/adapters/grid.adapter.ts`
- `/Users/sriharshavinfinite.com/Desktop/br-ui-wrapper/projects/br-ui-wrapper/src/lib/common/implementations/grid/shell/grid-shell.component.ts`

What was added to the shell/adapter flow:
- `dataMode`
- `queryState`
- `result`
- `layoutState`

The shared grid shell now emits additional normalized events:
- `query-change`
- `columns-layout-change`

Remote-mode behavior is scaffolded but not yet consumer-integrated:
- if `dataMode === 'remote'`, shell uses `result.rows` and `result.totalCount`
- search/sort/filter/page changes emit normalized query state

This step was verified locally as non-breaking:
- library build passed
- app still ran successfully after local `yalc` refresh

### 2F) PrimeNG grid first proof: shell parity before full engine split
PrimeNG grid was first moved from a thin standalone table into the shared shell experience so it could inherit:
- top toolbar
- search
- settings icon / column panel
- selection bar
- pagination framing
- shared context-menu orchestration

At that bridge step:
- `br-prime-grid` rendered `br-grid-shell`
- `grid-shell.component.html` contained PrimeNG `p-table` markup directly for the Prime variant

This was intentionally a temporary bridge state, not the final architecture.

### 2G) Grid shell/engine split is now in place for all variants
The grid is no longer using shell-owned table markup for any variant. Each variant now has its own engine component, while the shell keeps shared product-level behavior.

Current structure:
- `br-grid`
- variant wrapper (`br-custom-grid`, `br-material-grid`, `br-canvas-grid`, `br-prime-grid`)
- `br-grid-shell`
- variant-specific engine

Engine files:
- custom:
  - `/Users/sriharshavinfinite.com/Desktop/br-ui-wrapper/projects/br-ui-wrapper/src/lib/common/implementations/grid/custom/engine/custom-grid-engine.component.ts`
- material:
  - `/Users/sriharshavinfinite.com/Desktop/br-ui-wrapper/projects/br-ui-wrapper/src/lib/common/implementations/grid/material/engine/material-grid-engine.component.ts`
- canvas:
  - `/Users/sriharshavinfinite.com/Desktop/br-ui-wrapper/projects/br-ui-wrapper/src/lib/common/implementations/grid/canvas/engine/canvas-grid-engine.component.ts`
- primeng:
  - `/Users/sriharshavinfinite.com/Desktop/br-ui-wrapper/projects/br-ui-wrapper/src/lib/common/implementations/grid/primeng-grid/engine/prime-grid-engine.component.ts`

What remains in the shell:
- title/header
- toolbar
- search
- settings / columns panel
- selection bar
- pagination placement
- sort/filter/columns overlays
- context-menu orchestration

What moved into engines:
- table body rendering
- row templates
- row selection DOM
- engine-specific table markup
- engine-specific styling

Boundary normalization already done:
- shell uses generic engine bridge methods:
  - `onEngineSelectAllChange`
  - `onEngineRowSelectionChange`
  - `onEngineRowContextMenu`
  - `onEngineRowMenuClick`
- engines emit the matching generic outputs:
  - `engineSelectAllChange`
  - `engineRowSelectionChange`
  - `engineRowContextMenu`
  - `engineRowMenuClick`

Additional important note:
- `material` grid is now a real Material table engine (`mat-table`), not only a Material-styled shell variant.

### 2H) Grid rich cell contract is implemented
Built-in rich cell types now render in the library engines:
- `text`
- `link`
- `badge`
- `icon`
- `button`
- `button-group`
- `dropdown`
- `dropdown-action`
- `route-link`
- `custom-template`

Supporting files:
- `/Users/sriharshavinfinite.com/Desktop/br-ui-wrapper/projects/br-ui-wrapper/src/lib/common/implementations/grid/engine/grid-cell-render.utils.ts`
- `/Users/sriharshavinfinite.com/Desktop/br-ui-wrapper/projects/br-ui-wrapper/src/lib/common/implementations/grid/engine/_grid-rich-cell-styles.scss`

Consumer guidance:
- plain text remains the default when `type` is omitted
- richer cell behavior uses `type` + `cellConfig`
- business logic stays in the consumer through one `BrGridActionEvent` handler

### 2I) Grid template override support is implemented
The library now supports cell-level template overrides as a controlled escape hatch on top of the config-driven grid.

Directive:
- `/Users/sriharshavinfinite.com/Desktop/br-ui-wrapper/projects/br-ui-wrapper/src/lib/common/components/br-grid/br-grid-cell-template.directive.ts`

Consumer shape:
```html
<br-grid [config]="gridConfig" (action)="onGridAction($event)">
  <ng-template brGridCell="hrStatus" let-row let-value="value" let-meta="meta">
    ...
  </ng-template>
</br-grid>
```

Intent:
- grid still renders from config
- only the named cell/field is overridden
- row/table/shell are not opened for arbitrary override

### 2J) Grid native paginator adoption started
Pagination is now mixed by variant:
- `CUSTOM` and `CANVAS` still use shell pagination
- `MATERIAL` uses native Material paginator within the shell footer area
- `PRIMENG` uses native PrimeNG paginator within the shell footer area

This is not the final paginator polish state, but it is the current structural direction.

### 2K) Grid docs were expanded for real consumer use
`br-grid` docs now cover:
- plain columns
- rich cell types
- row/cell feedback via meta state
- template overrides
- one consumer-side action handler pattern

Files updated in app docs:
- `/Users/sriharshavinfinite.com/Desktop/CommonUIForBRPOC/src/app/screens/docs/docs.component.ts`
- `/Users/sriharshavinfinite.com/Desktop/CommonUIForBRPOC/docs/03-consumer-integration-guide.md`

Live grid previews were added to the docs so code and output can be compared directly.
- app restarted cleanly
- PrimeNG grid continued to work in the app with shell parity

### 2L) Button support is now integrated into the consumer app
The separate library repo added `br-button`, and the app now demonstrates it instead of relying on native buttons for consumer-facing examples.

What the library now exposes:
- `BrButtonComponent`
- `ButtonAdapter`
- button config support in:
  - `/Users/sriharshavinfinite.com/Desktop/br-ui-wrapper/projects/br-ui-wrapper/src/lib/common/models/controls-config.model.ts`
  - `/Users/sriharshavinfinite.com/Desktop/br-ui-wrapper/projects/br-ui-wrapper/src/lib/common/models/form-config.model.ts`
- custom / material / primeng button implementations

What the app now demonstrates:
- a dedicated `Buttons Playground`
- `br-button` docs with setup, direct-input usage, config usage, and live preview
- consumer/demo screens now use `br-button` for actual action examples instead of native `<button>`:
  - add-user
  - add-order
  - modal-demo
  - key consumer-facing actions inside Playground and Docs

What intentionally still uses native buttons:
- internal editor chrome and tooling controls (tabs, toggles, JSON tree buttons, collapse controls)
- those are app tooling widgets, not consumer-facing library demos

### 2M) Direct-input support is now demonstrated more honestly
The wrappers already support direct inputs for common scalar properties, while config remains the advanced/dynamic path.

Current app/doc changes:
- `Text Box` playground has a `Direct Input` variant
- that variant no longer shows the JSON config editor
- generated TS for that variant no longer uses `controlsConfig`
- `Apply Code` for that variant parses edited wrapper attributes and updates the live preview
- docs now list supported direct inputs per control based on actual wrapper surface, not assumptions

Current recommendation:
- simple/common usage -> direct inputs
- advanced/dynamic usage -> config

### 2N) Playground SCSS was corrected
Playground Code Studio previously showed demo shell SCSS that looked like required consumer CSS.

That was corrected so the SCSS tab now reflects reality:
- library controls already style themselves
- consumer SCSS is optional host/page layout only
- the app no longer implies consumers must copy fake wrapper/demo styles

### 2O) Date bounds bug was fixed at the real root cause
The main date bug was not in docs or wrapper forwarding. The root cause was in the library relative-date parser:
- `-1m` parsed correctly
- `+3m` did not parse

That caused:
- past-year bounds to work
- future-year bounds to remain effectively open

The parser was corrected and the date controls were additionally hardened for:
- invalid persisted out-of-range values
- custom month/year navigation clamping
- material/primeng emitted value guards

Current result:
- `Mindate: -1m` and `Maxdate: +3m` now behave correctly in Playground/docs across variants

### 2P) Docs/live preview mismatches were cleaned up
Several docs examples had drifted so the snippet and live preview no longer matched.

Corrected areas:
- plain grid example
- rich-cells grid example
- date configuration live preview

Current rule:
- docs snippet and live preview should match exactly
- scaffolding-only features must be described as scaffolding, not as completed behavior

### 2H) Branding status across implementations
Branding work is much further along locally than the older KT sections imply.

Completed locally in the library:
- normalized branding contract exists
- Enterprise and Talent Gateway adapters exist
- `BrandingRuntimeService` exists
- branding studio integration exists in the app

Branding coverage status:
- `CUSTOM`: broadly complete at practical contract level
- `MATERIAL`: brought to the same semantic token level as custom
- `PRIMENG`: real branding implementation added for controls, modal, and grid

Important runtime/default work also done locally:
- default light/dark palettes were tuned for better contrast and professional UX
- additional branding tokens were added for:
  - badge colors
  - danger
  - overlay
  - shadow
  - input/focus semantics

Specific bug fixes already handled locally:
- dark-mode grid pagination text visibility
- Enterprise branding sample in Playground had inconsistent light-mode text colors and was corrected
- Material text/text-area now correctly honor branded typed text color via explicit WebKit text fill handling
- PrimeNG dark grid row contrast issue was fixed by removing the white row fallback and giving all rows a branded base background

### 3) Shared advanced grid behavior
- `/Users/sriharshavinfinite.com/Desktop/br-ui-wrapper/projects/br-ui-wrapper/src/lib/common/implementations/grid/shell/grid-shell.component.ts`
- Supports:
  - top toolbar actions
  - search/refresh
  - sort/filter dialogs
  - row selection + selection actions
  - context menu
  - column personalization
  - pagination
  - event emission for all actions

### 4) Per-control mode switching
- Mode config:
  - `/Users/sriharshavinfinite.com/Desktop/br-ui-wrapper/projects/br-ui-wrapper/src/lib/common/config/ui-mode.config.ts`
- `UI_MODE_BY_CONTROL` supports separate mode per control:
  - grid/date/modal
  - text/singleSelect/multiSelect/checkbox/radio/autocomplete

### 5) Runtime mode switching service
- Added runtime service with localStorage persistence:
  - `/Users/sriharshavinfinite.com/Desktop/br-ui-wrapper/projects/br-ui-wrapper/src/lib/common/services/runtime-ui-config.service.ts`
- Wrappers subscribe to runtime mode updates so mode can change live without code edits.

### 5A) Library migration status
- Library project exists in the separate repo:
  - `/Users/sriharshavinfinite.com/Desktop/br-ui-wrapper`
- Migrated into library:
  - all form controls
  - date control and date configuration support
  - grid wrapper + adapter + implementations + shell
  - modal wrapper + adapter + implementations
  - shared config/event models used by those wrappers
- App screens, playground, and docs now import public types/components from `@sriharshavarada/br-ui-wrapper`.
- The old `src/app/common` transition layer was removed after the migration was stabilized.

### 5B) Package split and publish status (new)
The architecture is now split into:
- private library repo
- public demo/docs/consumer repo

Private library repo created and populated:
- GitHub repo:
  - `https://github.com/sriharshavarada/br-ui-wrapper`
- Initial library workspace commit pushed there:
  - `7e1b934` `Initial library workspace`
- Follow-up publish config commit pushed there:
  - `4267f23` `Prepare GitHub Packages publish config`

Published package:
- package name:
  - `@sriharshavarada/br-ui-wrapper`
- latest successfully published version at time of this handoff:
  - `0.0.1`
- registry:
  - `https://npm.pkg.github.com`

Manual publish flow already verified:
1. `npm login --registry=https://npm.pkg.github.com`
2. `npm install`
3. `npm run build`
4. `cd dist/br-ui-wrapper && npm publish`

Important implication:
- library source is no longer needed in this demo repo for runtime/build
- this repo now behaves like a real external consumer of the published package
- local development still uses `yalc` when iterating quickly across both repos

### 5C) Demo repo switched to package-consumer mode (new)
This current repo (`/Users/sriharshavinfinite.com/Desktop/CommonUIForBRPOC`) is now the consumer/demo/docs app, not the library source repo.

What changed:
- dependency added in root `package.json`:
  - `@sriharshavarada/br-ui-wrapper`
- root `.npmrc` added:
  - `@sriharshavarada:registry=https://npm.pkg.github.com`
- root `tsconfig.json` local path alias for `br-ui-wrapper` removed
- local library source deleted from this repo:
  - `projects/br-ui-wrapper/`
- Angular workspace library project removed from:
  - `/Users/sriharshavinfinite.com/Desktop/CommonUIForBRPOC/angular.json`
- all app imports / docs / playground code generation updated to use:
  - `@sriharshavarada/br-ui-wrapper`

Validation completed:
- local `npm install` resolves the package
- local app build passes against installed package
- `npm start` works against installed package

### 5E) Local dev workflow after repo separation
This is now the standard split:

#### Library repo (`/Users/sriharshavinfinite.com/Desktop/br-ui-wrapper`)
- local fast iteration:
  - `npm run dev:yalc`
  - `npm run dev:yalc:push`
- real package release:
  - `npm run release:publish`

Supporting shell wrappers:
- `/Users/sriharshavinfinite.com/Desktop/br-ui-wrapper/scripts/yalc-publish.sh`
- `/Users/sriharshavinfinite.com/Desktop/br-ui-wrapper/scripts/yalc-publish-push.sh`
- `/Users/sriharshavinfinite.com/Desktop/br-ui-wrapper/scripts/release-publish.sh`

#### Demo app repo (`/Users/sriharshavinfinite.com/Desktop/CommonUIForBRPOC`)
- use local library package:
  - `npm run dev:use-local-lib`
- refresh local package after library change:
  - `npm run dev:refresh-local-lib`
- remove local override and go back to published package:
  - `npm run dev:use-published-lib`

Supporting shell wrappers:
- `/Users/sriharshavinfinite.com/Desktop/CommonUIForBRPOC/scripts/use-local-lib.sh`
- `/Users/sriharshavinfinite.com/Desktop/CommonUIForBRPOC/scripts/refresh-local-lib.sh`
- `/Users/sriharshavinfinite.com/Desktop/CommonUIForBRPOC/scripts/use-published-lib.sh`
- `/Users/sriharshavinfinite.com/Desktop/CommonUIForBRPOC/scripts/run-app.sh`
- `/Users/sriharshavinfinite.com/Desktop/CommonUIForBRPOC/scripts/restart-app-clean.sh`

Important release rule:
- `yalc` state is local-only
- before pushing the demo app for GitHub Pages / CI, run:
  - `npm run dev:use-published-lib`
- GitHub Pages cannot reproduce local `yalc` state

Important publish rule:
- library package version must be bumped in:
  - `/Users/sriharshavinfinite.com/Desktop/br-ui-wrapper/projects/br-ui-wrapper/package.json`
- do **not** bump only the root workspace `package.json`
- `npm publish` will fail with `409 Conflict` if you try to republish an existing version

### 5D) GitHub Actions / Pages dependency note (new)
Because the package is private, GitHub Actions for this demo repo must authenticate before `npm ci`.

Workflow updated:
- `/Users/sriharshavinfinite.com/Desktop/CommonUIForBRPOC/.github/workflows/angular-pages.yml`

Current requirement in GitHub repo settings:
- add repository secret:
  - `GH_PACKAGES_TOKEN`

Token needs:
- `read:packages`
- and private repo access as needed for your GitHub account/package visibility model

Without `GH_PACKAGES_TOKEN`, GitHub Pages build will fail during dependency install.

## Consumer Screens Existing
- `/Users/sriharshavinfinite.com/Desktop/CommonUIForBRPOC/src/app/screens/user-list/user-list.component.ts`
- `/Users/sriharshavinfinite.com/Desktop/CommonUIForBRPOC/src/app/screens/order-list/order-list.component.ts`
- `/Users/sriharshavinfinite.com/Desktop/CommonUIForBRPOC/src/app/screens/modal-demo/modal-demo.component.ts`
- `/Users/sriharshavinfinite.com/Desktop/CommonUIForBRPOC/src/app/screens/add-user/add-user.component.ts`
- `/Users/sriharshavinfinite.com/Desktop/CommonUIForBRPOC/src/app/screens/add-order/add-order.component.ts`

## Documentation Pages Added
- `/Users/sriharshavinfinite.com/Desktop/CommonUIForBRPOC/src/app/screens/docs/docs.component.ts`
- `/Users/sriharshavinfinite.com/Desktop/CommonUIForBRPOC/src/app/screens/docs/docs.component.html`
- `/Users/sriharshavinfinite.com/Desktop/CommonUIForBRPOC/src/app/screens/docs/docs.component.scss`

## Major Work Done

### A) Developer Playground (new capability)
Added a full interactive playground route and screen:
- `/Users/sriharshavinfinite.com/Desktop/CommonUIForBRPOC/src/app/screens/playground/playground.component.ts`
- `/Users/sriharshavinfinite.com/Desktop/CommonUIForBRPOC/src/app/screens/playground/playground.component.html`
- `/Users/sriharshavinfinite.com/Desktop/CommonUIForBRPOC/src/app/screens/playground/playground.component.scss`

What it provides now:
- Presets for each control type
- Collapsible config editor sections
- Collapsible consumer code sections
- Live preview rendering
- Event log panel
- Per-playground local mode switching (grid / modal popup / controls)
- Page-level `Branding Studio` popup for runtime branding

### B) Real JSON editor workbench
Added reusable JSON workbench with tree editing:
- `/Users/sriharshavinfinite.com/Desktop/CommonUIForBRPOC/src/app/screens/playground/components/json-workbench/json-workbench.component.ts`
- `/Users/sriharshavinfinite.com/Desktop/CommonUIForBRPOC/src/app/screens/playground/components/json-workbench/json-workbench.component.html`
- `/Users/sriharshavinfinite.com/Desktop/CommonUIForBRPOC/src/app/screens/playground/components/json-workbench/json-workbench.component.scss`

Tree node component:
- `/Users/sriharshavinfinite.com/Desktop/CommonUIForBRPOC/src/app/screens/playground/components/json-tree-node/json-tree-node.component.ts`
- `/Users/sriharshavinfinite.com/Desktop/CommonUIForBRPOC/src/app/screens/playground/components/json-tree-node/json-tree-node.component.html`
- `/Users/sriharshavinfinite.com/Desktop/CommonUIForBRPOC/src/app/screens/playground/components/json-tree-node/json-tree-node.component.scss`

Behavior added/fixed today:
- Collapse/expand nodes
- Collapse all / expand all
- Live sync tree <-> raw JSON
- Preserve collapse state on in-place edits (so expanding one node and editing does not reset all)
- Raw and tree panes same height
- Color picker support for hex color values on keys containing `color`

### C) Consumer Code Studio (TS/HTML/SCSS)
Added VSCode-like editor component and integrated in Playground:
- `/Users/sriharshavinfinite.com/Desktop/CommonUIForBRPOC/src/app/screens/playground/components/code-editor/code-editor.component.ts`
- `/Users/sriharshavinfinite.com/Desktop/CommonUIForBRPOC/src/app/screens/playground/components/code-editor/code-editor.component.html`
- `/Users/sriharshavinfinite.com/Desktop/CommonUIForBRPOC/src/app/screens/playground/components/code-editor/code-editor.component.scss`

Capabilities:
- Dark IDE-style editor visuals
- Line numbers
- TS/HTML/SCSS syntax coloring
- Fixed editor height
- Selection behavior fixed

Important bug fixes today:
- Removed accidental visible token strings like `tok-attr`, `tok-keyword`, `tok-selector` by preventing re-tokenization of generated spans.
- Made code editor scrollbar visible on dark theme (vertical/horizontal thumb styling).

### D) Real code execution intent in preview
Playground now treats consumer HTML as **real code snippets** containing actual wrapper tags:
- `<br-grid ...></br-grid>`
- `<br-date ...></br-date>`
- `<br-modal ...></br-modal>`

Apply flow on Code Studio:
- TS block parsed from `// CONFIG_JSON_START` ... `// CONFIG_JSON_END`
- HTML validated and split around the actual wrapper tag
- SCSS validated (brace balance)
- On errors: preview shows error panel below
- On success: preview renders control normally with applied wrapper and style

## Routes / App shell updates done today
- Routes updated to include playground + docs + modes:
  - `/Users/sriharshavinfinite.com/Desktop/CommonUIForBRPOC/src/app/app.routes.ts`
- Nav/app shell updated to expose these pages and show live mode state:
  - `/Users/sriharshavinfinite.com/Desktop/CommonUIForBRPOC/src/app/app.component.ts`
  - `/Users/sriharshavinfinite.com/Desktop/CommonUIForBRPOC/src/app/app.component.html`
  - `/Users/sriharshavinfinite.com/Desktop/CommonUIForBRPOC/src/app/app.component.scss`
- README updated with docs/playground references:
  - `/Users/sriharshavinfinite.com/Desktop/CommonUIForBRPOC/README.md`

## Latest Delta (Most Recent UI / Playground Changes)

This section is the most important for the next AI to continue correctly.

### 1) `Mode Studio` moved out of Playground into a dedicated page
- New route/page:
  - `/Users/sriharshavinfinite.com/Desktop/CommonUIForBRPOC/src/app/screens/modes/modes.component.ts`
  - `/Users/sriharshavinfinite.com/Desktop/CommonUIForBRPOC/src/app/screens/modes/modes.component.html`
  - `/Users/sriharshavinfinite.com/Desktop/CommonUIForBRPOC/src/app/screens/modes/modes.component.scss`
- `Mode Studio` removed from `/playground` to reduce clutter.
- New top-nav item added: `Modes`.
- Top-right compact Modes dropdown `Manage` now routes to `/modes`.

### 2) Playground now has local mode switching per playground section
- Grid Playground header has inline `Grid Mode` segmented switch.
- Controls Playground header has inline mode switch:
  - `All Controls` => bulk `CUSTOM/MATERIAL`
  - single control playground => mode for that control only
  - Date control uses date modes

### 3) `br-text-area` added to the library and app
- New wrapper exported from the package:
  - `BrTextAreaComponent`
- Supports:
  - `rows`
  - `maxLength`
  - `id`, `name`, `className`, `meta`
  - CVA support
  - wrapper event forwarding
  - registry integration
  - `CUSTOM` and `MATERIAL` implementations
- Playground and docs were updated to include `br-text-area`

### 4) Branding system added to the library
Library repo now contains:
- normalized branding model:
  - `/Users/sriharshavinfinite.com/Desktop/br-ui-wrapper/projects/br-ui-wrapper/src/lib/common/models/branding-config.model.ts`
- branding adapters:
  - `/Users/sriharshavinfinite.com/Desktop/br-ui-wrapper/projects/br-ui-wrapper/src/lib/common/adapters/enterprise-branding.adapter.ts`
  - `/Users/sriharshavinfinite.com/Desktop/br-ui-wrapper/projects/br-ui-wrapper/src/lib/common/adapters/talent-gateway-branding.adapter.ts`
- runtime branding service:
  - `/Users/sriharshavinfinite.com/Desktop/br-ui-wrapper/projects/br-ui-wrapper/src/lib/common/services/branding-runtime.service.ts`

Branding flow:
1. raw team branding payload
2. optional adapter normalization
3. `BrandingRuntimeService.setBranding(...)`
4. `BrandingRuntimeService.setMode('light' | 'dark')`
5. library writes CSS variables and implementations pick them up

Important architecture note:
- branding is app-level runtime state
- it is **not** passed inside each control config
- controls consume branding automatically from the shared runtime service

### 5) Branding token contract was expanded and corrected
New normalized tokens include:
- `accentColor`
- `focusColor`
- `focusRingColor`
- `sectionBorderColor`
- `inputBackgroundColor`
- `inputBorderColor`
- `inputTextColor`
- `inputPlaceholderColor`
- `inputDisabledBackgroundColor`
- `inputDisabledTextColor`

Important semantic fix:
- `baseFontColor` should affect typed text if a more specific `inputTextColor` is not supplied
- this fallback is handled in the branding runtime merge layer
- Enterprise/TG payloads still only map the keys they truly expose

### 6) Branding consumption was implemented across library controls
Initially branding was applied only to:
- `br-text`
- `br-text-area`

It has now been extended across the remaining implementation surfaces:
- `br-single-select`
- `br-multi-select`
- `br-autocomplete`
- `br-checkbox`
- `br-radio`
- `br-date`
- `br-grid` (through shared `grid-shell`; canvas/custom/material all flow through the shell)
- `br-modal`

Important clarification:
- branding was implemented at the library implementation/style layer
- consumer control code did **not** need to change structurally
- meaning: consumers still configure controls the same way; they set runtime branding once and controls update visually

### 7) Branding documentation added in the library repo
New mapping document:
- `/Users/sriharshavinfinite.com/Desktop/br-ui-wrapper/docs/branding-surface-mapping.md`

It records, per component:
- purpose/surface
- Enterprise raw key
- Talent Gateway raw key
- normalized library branding key

This is the main reference for future expansion or debugging of branding behavior.

### 8) Playground branding UX was reworked
Earlier attempt:
- branding variants were added per control
- user rejected this because branding is app-level, not control-level

Current solution:
- `Branding Studio` is now a page-level popup in Playground
- not nested under `Controls Playground`
- it lets users:
  - choose branding source:
    - `Enterprise`
    - `Talent Gateway`
    - `Library`
  - choose color mode:
    - `Light`
    - `Dark`
  - edit branding JSON with color picker support
  - inspect the runtime branding code in a dedicated `Code Studio` tab

Implementation files:
- `/Users/sriharshavinfinite.com/Desktop/CommonUIForBRPOC/src/app/screens/playground/playground.component.ts`
- `/Users/sriharshavinfinite.com/Desktop/CommonUIForBRPOC/src/app/screens/playground/playground.component.html`
- `/Users/sriharshavinfinite.com/Desktop/CommonUIForBRPOC/src/app/screens/playground/playground.component.scss`

### 9) Docs page updated for branding runtime model
Docs page now explicitly explains:
- branding and light/dark mode are runtime app-level settings
- not per-control config
- `br-text` and `br-text-area` branding reference pages include complete code snippets with:
  - control config
  - team branding payload
  - adapter usage
  - `BrandingRuntimeService`

Relevant file:
- `/Users/sriharshavinfinite.com/Desktop/CommonUIForBRPOC/src/app/screens/docs/docs.component.ts`

### 10) Current release caveat
At time of this handoff:
- library source has many new changes after `0.0.1`
- attempting to republish `0.0.1` fails with:
  - `409 Conflict - Cannot publish over existing version`

So next real release must:
1. bump version in `/Users/sriharshavinfinite.com/Desktop/br-ui-wrapper/projects/br-ui-wrapper/package.json`
2. commit/push library repo
3. run `npm run release:publish`
4. switch demo app back to published package mode
5. verify build
6. commit/push demo app repo
- Modal Popup Playground header has inline `Modal Pop-up Mode` switch.
- This makes testing possible without going to global Mode Studio.

### 3) Developer Playground layout/UX improved significantly
- Standalone `Date Playground` tab removed (date is covered under Controls Playground).
- Local collapsible accordions for each playground:
  - Configurator
  - Code Studio
- Both are above preview and default collapsed for Grid / Controls / Modal Popup.
- Redundant top `Show/Hide Config Editor` and `Show/Hide Code Studio` buttons removed.
- Preview remains immediately visible.
- Modal section renamed to **Modal Popup Playground** and wording aligned to “popup”.
- Modal action button moved near preview content (`Open Current Popup`) for better discoverability.

### 4) Top app header/nav redesigned
- Feature pages grouped into `Pages` dropdown (Users, Orders, Add User, Add Order, Modals).
- `Playground`, `Modes`, `Docs` remain direct links.
- Compact top-right `Modes` status dropdown added (instead of long inline mode text).
- `Pages` and `Modes` dropdowns now close on outside click and close each other when opened.

### 5) Controls implementation split (important architecture evolution)
- Separate wrappers and implementations exist for each form control:
  - `br-text`
  - `br-single-select`
  - `br-multi-select`
  - `br-checkbox`
  - `br-radio`
  - `br-autocomplete`
  - `br-date`
- Adapters added for each control config mapping (similar to date adapter pattern).
- Implementations grouped under `/src/app/common/implementations/form/controls/...`
- Date implementations are now also in controls hierarchy:
  - `/src/app/common/implementations/form/controls/date/custom/...`
  - `/src/app/common/implementations/form/controls/date/material/...`

### 6) UI quality changes in controls/playground
- Custom vs Material radio styles are intentionally differentiated now.
- Multi-select redesigned:
  - dropdown-style control
  - checkbox options
  - selected chips below with `x` remove
- Material multi-select duplicate checkbox indicator issue fixed (Material pseudo-checkbox hidden in panel).

### 7) Consumer Code generator improvements
- Controls playground generated TS now matches generated HTML:
  - includes `asTextConfig`, `asSingleSelectConfig`, etc. only when needed
  - generated code is control-specific (single-control playgrounds no longer show all-control helper noise)
- Modal consumer demo text updated to popup wording.

### 8) Grid pagination defaults changed for easier preview
- Shared grid shell page size options changed to: `5, 10, 15`
- Default page size changed to `5`
- Playground grid presets (`simple`, `moderate`, `complex`) now default to `5`
- This was done to make bottom pagination/footer visible immediately in playground.

### 9) Naming consistency changes
- User-facing labels now use **Modal Pop-up** in several places (playground + modes page + top modes summary).

### 10) Date control updates (major)
- Advanced DateConfiguration support added in adapter for both `CUSTOM` and `MATERIAL`:
  - `Mindate` / `Maxdate` relative token handling (days/weeks/months/years)
  - week/month/year range anchoring logic
  - `Defaulttodaysdate` default value behavior
  - include-today handling (`includeToday` / `Includetoday` / `IncludeToday`)
  - disabled weekdays (`Disabledaysofweek`)
- Fixed disabled-day parsing bug:
  - empty strings in `Disabledaysofweek` are ignored (not treated as Sunday).
- `Firstdayofweek` now works consistently:
  - used in min/max week calculations
  - applied to Material calendar display week start.
- Locale/language support added on date config:
  - sibling fields on date control: `language` / `locale`
  - locale-aware month names + weekday labels in both Custom and Material.
- `dateFormat` added as sibling property on date control (not inside DateConfiguration):
  - supported in both Custom and Material format/parse flows.
  - currently supported patterns include slash and hyphen variants:
    - `yyyy-MM-dd`
    - `MM/dd/yyyy`, `M/d/yyyy`, `dd/MM/yyyy`, `d/M/yyyy`
    - `MM-dd-yyyy`, `M-d-yyyy`, `dd-MM-yyyy`, `d-M-yyyy`
    - corresponding `yy` variants.
- Timezone off-by-one fix for Material path:
  - removed UTC-based date output behavior; now emits local calendar date correctly.
- Custom date picker no longer uses native browser date popup:
  - replaced with custom popup calendar to support week-start + disabled-day parity.
  - month/year direct switching added (dropdowns).
- Material date picker now also has month/year direct switching:
  - custom calendar header component with month/year dropdowns + prev/next buttons.
- Open behavior aligned for both modes:
  - if value exists -> open to selected date’s month/year
  - if empty -> open to current month/year.
- Date Playground JSON presets updated to include:
  - `DateConfiguration`
  - locale/language
  - `dateFormat`.

### 11) JSON Tree Editor quality-of-life update
- Tree editor now supports deleting any non-root node directly from tree view.
- Deletion updates object keys/array indexes in model and auto-keeps JSON syntax valid in raw pane.

### 12) 2-Way Binding Attempt 1 (post-date-control work)
Commit reference:
- `81c77af` `2-Way-Binding Attempt 1`

Goal:
- Add a framework-neutral wrapper contract while keeping Angular forms compatibility internal.
- Implement first for `br-text` and `br-date`.

What was implemented:
- Reusable CVA base abstraction:
  - now lives in library repo/package source:
    - `projects/br-ui-wrapper/src/lib/common/forms/base-value-accessor.ts`
- Control registry for native-comfort lookups:
  - now lives in library repo/package source:
    - `projects/br-ui-wrapper/src/lib/common/services/control-registry.service.ts`
  - API: `valueById`, `valuesByName`, `valuesByClass`
- Wrapper neutral inputs added (text/date scope):
  - `id`, `controlId`, `name`, `className`, `value`, `disabled`, `required`
- Wrapper event outputs added/forwarded (text/date scope):
  - `valueChange`, `blur`, `focus`, `input`, `change`, `keydown`, `keyup`, `click`
- 2-hop event flow wired:
  - implementation -> wrapper -> consumer
  - with CVA callbacks invoked at wrapper boundary (`onChange`, `onTouched`)
- Generic metadata support:
  - `meta` input support in config/wrapper
  - normalized event payload model:
    - `projects/br-ui-wrapper/src/lib/common/models/control-event.model.ts`
  - `controlEvent` output includes identity/value/meta/originalEvent
- Adapters updated to carry identity/class fields for text/date implementations.
- Add User consumer updated as reference usage:
  - `/Users/sriharshavinfinite.com/Desktop/CommonUIForBRPOC/src/app/screens/add-user/add-user.component.ts`
  - `/Users/sriharshavinfinite.com/Desktop/CommonUIForBRPOC/src/app/screens/add-user/add-user.component.html`
  - `/Users/sriharshavinfinite.com/Desktop/CommonUIForBRPOC/src/app/screens/add-user/add-user.component.scss`
  - demonstrates `meta`, `controlEvent`, and registry reads in submit payload.

Companion design/implementation doc:
- `/Users/sriharshavinfinite.com/Desktop/CommonUIForBRPOC/docs/04-form-control-public-contract-and-cva-plan.md`

Current scope limit (at commit `81c77af`):
- Full pattern rollout was done only for `br-text` and `br-date`.
- Remaining controls were pending at that point.

### 13) Post-commit rollout and playground parity updates (latest)
After `81c77af`, the same public-contract/CVA/events/registry pattern was rolled out across all form controls and wired in Playground demos.

#### A) Full form control parity completed
Controls now aligned on the same feature contract:
- `br-text`
- `br-date`
- `br-radio`
- `br-autocomplete`
- `br-checkbox`
- `br-single-select`
- `br-multi-select`

Implemented across these controls:
- CVA support (`writeValue`, `registerOnChange`, `registerOnTouched`, `setDisabledState`) via shared base.
- Wrapper inputs:
  - `id`, `controlId`, `name`, `className`, `value`, `disabled`, `required`, `meta`
  - plus control-specific inputs (`label`, `options`, `placeholder`, etc.).
- Wrapper outputs:
  - `valueChange`, `blur`, `focus`, `input`, `change`, `keydown`, `keyup`, `click`, `controlEvent`
  - `br-date` also keeps `dateChange`.
- 2-hop event forwarding:
  - implementation -> wrapper -> consumer.
- Registry coverage:
  - `valueById`, `valuesByName`, `valuesByClass` for all above controls.

Supporting updates:
- `BrRegisteredControlType` expanded for:
  - `checkbox`, `singleSelect`, `multiSelect`.
- `BrSingleSelectConfig`, `BrMultiSelectConfig`, `BrCheckboxConfig` extended with normalized identity/meta fields.
- Adapters and custom/material implementations updated accordingly.

#### B) Consumer event trace updates
Added control-event tracing on real consumer pages:
- `/Users/sriharshavinfinite.com/Desktop/CommonUIForBRPOC/src/app/screens/add-user/add-user.component.ts`
- `/Users/sriharshavinfinite.com/Desktop/CommonUIForBRPOC/src/app/screens/add-user/add-user.component.html`
- `/Users/sriharshavinfinite.com/Desktop/CommonUIForBRPOC/src/app/screens/add-order/add-order.component.ts`
- `/Users/sriharshavinfinite.com/Desktop/CommonUIForBRPOC/src/app/screens/add-order/add-order.component.html`
- `/Users/sriharshavinfinite.com/Desktop/CommonUIForBRPOC/src/app/screens/add-order/add-order.component.scss`

Both pages now show recent control event traces in UI.

#### C) Playground variants enhanced for each control
Controls Playground now supports richer per-control variants:
- config variants (existing + refined naming like `*-config`)
- `events-demo`
- `ngmodel-simple` (no config)
- `registry-demo` (byId/byName/byClass demo)

### 14) Documentation + help-text alignment for package consumption (latest)
Consumer-facing docs were updated to treat the package as the primary entry point.

Updated areas:
- in-app docs page now explains:
  - install/auth flow
  - what consumers can import
  - component index
  - package boundary wording
- Playground Code Studio now generates imports from:
  - `@sriharshavarada/br-ui-wrapper`
- README and markdown docs now describe this repo as the demo/docs app consuming the published package

Important file updates:
- `/Users/sriharshavinfinite.com/Desktop/CommonUIForBRPOC/src/app/screens/docs/docs.component.ts`
- `/Users/sriharshavinfinite.com/Desktop/CommonUIForBRPOC/src/app/screens/playground/playground.component.ts`
- `/Users/sriharshavinfinite.com/Desktop/CommonUIForBRPOC/README.md`
- `/Users/sriharshavinfinite.com/Desktop/CommonUIForBRPOC/docs/01-high-level-architecture.md`
- `/Users/sriharshavinfinite.com/Desktop/CommonUIForBRPOC/docs/02-runtime-flow-browser-to-control.md`
- `/Users/sriharshavinfinite.com/Desktop/CommonUIForBRPOC/docs/03-consumer-integration-guide.md`
- `/Users/sriharshavinfinite.com/Desktop/CommonUIForBRPOC/docs/05-br-ui-wrapper-library-repo-migration.md`

UI/labeling updates:
- Config Editor title now reflects selected control + variant.
- Code Studio title now reflects selected control + variant.
- JSON workbench title now reflects selected control context.

#### D) Playground event + registry demo behavior
For control previews:
- `controlEvent` is wired and pushed to Event Log.
- `events-demo` variants include interaction-oriented setups (often 2 controls).
- `registry-demo` includes:
  - controls configured with `id`/`name`/`className`/`meta`,
  - preview action button:
    - `Read Registry Values (byId/byName/byClass)`,
  - logs registry API results in Event Log.

#### E) Code Studio generated code improved (copy-paste ready)
For `registry-demo`, generated TS/HTML now includes real working integration:
- imports and injects `ControlRegistryService`,
- includes `readRegistryValues()` method using:
  - `valueById(...)`
  - `valuesByName(...)`
  - `valuesByClass(...)`,
- generated control config mapping includes identity/meta fields.

#### F) Model updates for Playground support
`BrFormField` now supports identity/meta fields used by generated/previewed controls:
- `controlId?`
- `name?`
- `className?`
- `meta?`

### 15) Consumer Docs overhaul (latest)
The `/docs` page was upgraded from a static page into a production-style docs experience.

Primary files:
- `/Users/sriharshavinfinite.com/Desktop/CommonUIForBRPOC/src/app/screens/docs/docs.component.ts`
- `/Users/sriharshavinfinite.com/Desktop/CommonUIForBRPOC/src/app/screens/docs/docs.component.html`
- `/Users/sriharshavinfinite.com/Desktop/CommonUIForBRPOC/src/app/screens/docs/docs.component.scss`

What was implemented:
- 3-pane docs UX:
  - left navigation index,
  - center running document,
  - right “On This Page” anchors.
- Searchable left nav with live filtering and no-result state.
- Hierarchical left nav support:
  - `br-date` is parent,
  - `br-date configuration reference` is child/sub-entry.
- Better consumer readability:
  - new `Preface and Key Terms` page,
  - simple-language “why/use” context,
  - key-term sections added in major pages and control pages.
- Expanded production-grade content:
  - getting started, forms/events/registry,
  - per-control usage (config style + ngModel style + reactive forms),
  - control input/output tables,
  - grid/modal guidance.
- Dedicated deep reference:
  - `br-date configuration reference` now documents:
    - top-level date props,
    - `DateConfiguration` property meanings,
    - relative min/max token behavior,
    - locale/language and dateFormat notes,
    - consumer examples.

### 15) CI/build pipeline updates (latest)
GitHub Actions and build budget handling were adjusted to stabilize deployments.

Workflow file:
- `/Users/sriharshavinfinite.com/Desktop/CommonUIForBRPOC/.github/workflows/angular-pages.yml`

Changes:
- Build step now runs with verbose output for clearer diagnostics.
- Artifact path detection hardened to support both layouts:
  - `dist/br-ui-framework/browser`
  - `dist/br-ui-framework`
- Workflow now fails with explicit dist tree dump if artifact path is missing.
- `.nojekyll` and `404.html` creation moved to detected artifact path.

Budget/config updates:
- `/Users/sriharshavinfinite.com/Desktop/CommonUIForBRPOC/angular.json`
- Initial bundle budget `maximumError` was raised to `1.5MB` to unblock CI budget failures.

## Current Known State / Caveats
- Angular compile/typecheck passes:
  - `npx ngc -p tsconfig.app.json`
  - `npx tsc -p tsconfig.app.json --noEmit`
- In this environment, `npm run build` currently fails with a Node runtime malloc crash (`pointer being freed was not allocated`) on Node `v22.21.1`.
- Dev server runs fine.
- Multiple ng serve processes may exist; if `4200` is taken, Angular auto-prompts next port.

## Current Working Tree Changes (not yet committed)
The working tree is still dirty and includes substantial changes across:
- app shell/nav (`app.component.*`)
- routes (`app.routes.ts`)
- common runtime mode service + config + wrappers + adapters
- grid shell / grid implementations
- controls wrappers/adapters/implementations
- playground (large set of files)
- docs screen + handoff docs
- new `Modes` page (`src/app/screens/modes/...`)

If continuing from here, run `git status --short` first and avoid reverting unrelated user changes.

## How next AI should continue (recommended order)
1. Read this document first.
2. Read these detailed docs:
   - `/Users/sriharshavinfinite.com/Desktop/CommonUIForBRPOC/docs/01-high-level-architecture.md`
   - `/Users/sriharshavinfinite.com/Desktop/CommonUIForBRPOC/docs/02-runtime-flow-browser-to-control.md`
   - `/Users/sriharshavinfinite.com/Desktop/CommonUIForBRPOC/docs/03-consumer-integration-guide.md`
3. Verify GitHub repo secret is present for Pages build:
   - `GH_PACKAGES_TOKEN`
4. Verify local run using `npm start` and open:
   - `/playground`
   - `/modes`
5. Confirm local mode switches (inside each playground card) and global modes (`/modes`) both update runtime behavior.
6. If continuing Playground editor accuracy, next step is replacing custom highlighter with Monaco for true folding/intellisense/diagnostics.
7. Before new feature work, commit or stash current uncommitted changes intentionally to avoid loss.

## One-line context for next AI prompt
Use `/Users/sriharshavinfinite.com/Desktop/CommonUIForBRPOC/docs/00-project-handoff-so-far.md` as the authoritative handoff; project now has a dedicated `/modes` page for global mode control, local per-playground mode switches, advanced grid shell (custom/material/canvas), popup modal playground, controls wrappers/adapters/implementations, and a large uncommitted Playground/Code Studio UX iteration.

## March 9, 2026 freeze checkpoint
- Separate library repo:
  - `/Users/sriharshavinfinite.com/Desktop/br-ui-wrapper`
- Library repo pushed commits:
  - `38edb42` `Stabilize library release with branding, date, and grid contracts`
  - `1dff902` `Bump library package version to 0.0.3`
- Published GitHub package:
  - `@sriharshavarada/br-ui-wrapper@0.0.4`
- App repo should use the published package version `0.0.4` for freeze/CI/GitHub Pages readiness instead of local `file:.yalc/...`.

- Grid wishlist and future capability target is now documented in [docs/08-grid-wishlist.md](docs/08-grid-wishlist.md).

## March 16, 2026 autocomplete stabilization + playground follow-up

This pass focused on closing the remaining autocomplete inconsistencies across `CUSTOM`, `MATERIAL`, and `PRIMENG`, then surfacing the newer API features directly in the Playground so they are testable without manual JSON edits.

### Library repo changes (`/Users/sriharshavinfinite.com/Desktop/br-ui-wrapper`)

Primary areas touched:
- adapters/contracts:
  - `projects/br-ui-wrapper/src/lib/common/adapters/autocomplete.adapter.ts`
  - `projects/br-ui-wrapper/src/lib/common/adapters/multi-select.adapter.ts`
- wrapper/public inputs:
  - `projects/br-ui-wrapper/src/lib/common/components/br-autocomplete/br-autocomplete.component.ts`
  - `projects/br-ui-wrapper/src/lib/common/components/br-autocomplete/br-autocomplete.component.html`
  - `projects/br-ui-wrapper/src/lib/common/components/br-multi-select/br-multi-select.component.ts`
- models:
  - `projects/br-ui-wrapper/src/lib/common/models/controls-config.model.ts`
  - `projects/br-ui-wrapper/src/lib/common/models/form-config.model.ts`
  - `projects/br-ui-wrapper/src/lib/common/models/control-event.model.ts`
- implementations:
  - custom/material/primeng autocomplete controls
  - custom/material/primeng multi-select controls

What changed:
- Added shared `maxSelections` support for:
  - `br-multi-select`
  - `br-autocomplete` when `selectionMode="multiple"`
- Fixed remote autocomplete behavior where async option updates could wipe or fight with the user’s in-progress query text.
- Fixed PrimeNG remote single-select suggestion refresh so matches appear on the first valid term instead of only after an extra keystroke.
- Fixed Material multi-autocomplete floating label overlap when chips exist and focus leaves the field.
- Fixed Material remote single-select backspace/re-edit behavior so a previously selected value does not get forced back into the input while the user is clearing/retyping.
- Fixed PrimeNG max-selection behavior:
  - removed the transient empty chip / lone close-icon artifact after hitting the limit,
  - disabled remaining options once the selection cap is reached,
  - normalized emitted multi-value payloads so the limit is enforced cleanly.
- Added clearer disabled styling for custom/material multi-autocomplete option rows once `maxSelections` is reached so the blocked state is obvious visually, not only behaviorally.

### App repo changes (`/Users/sriharshavinfinite.com/Desktop/CommonUIForBRPOC`)

Primary files:
- `src/app/screens/playground/playground.component.ts`
- `src/app/screens/playground/playground.component.html`
- `src/app/screens/playground/components/code-editor/code-editor.component.scss`

What changed:
- Playground autocomplete debug/demo coverage expanded across:
  - `default-config`
  - `multi-local-config`
  - `remote-config`
  - `remote-multi-config`
- Reset handling was corrected so multi-value autocomplete variants reset to `[]` instead of `''`.
- Remote autocomplete demo behavior improved:
  - default suggestion set now appears on open for remote variants,
  - empty-state timing is less misleading for below-min-chars scenarios.
- `Direct Input` autocomplete was turned into a gallery showing all key variants together:
  - local single
  - local multi
  - remote single
  - remote multi
- Code Studio generation was expanded so direct-input autocomplete examples emit the corresponding multiple-wrapper setup instead of a single isolated field.
- Added horizontal scroll to the black Code Studio/editor area for long generated lines.
- Playground presets now expose `maxSelections` without manual config editing:
  - multi-select default/preselected/direct-input demos use `maxSelections: 2`
  - autocomplete multi-local/remote-multi/direct-input demos use `maxSelections: 2`
  - labels/descriptions in the UI now call out that the cap exists

### Local validation done during this pass
- Library:
  - `npm run build:lib`
  - `npm run dev:yalc:push`
- App:
  - `./node_modules/.bin/tsc -p tsconfig.app.json --noEmit`
  - restart via `./scripts/restart-app-clean.sh 127.0.0.1 4200`

### Notes for next handoff / continuation
- The app repo also contains untracked architecture diagram sources:
  - `docs/project-architecture.drawio`
  - `docs/project-architecture.excalidraw`
- During this pass, testing was primarily targeted at wrapper/playground interaction parity rather than a new docs or CI sweep.
