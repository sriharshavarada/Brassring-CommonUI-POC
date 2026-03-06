# High-Level Architecture

## Purpose
This POC provides a UI abstraction layer so screens use only wrapper components (`br-grid`, `br-date`, `br-modal`, form controls) while the underlying UI library can be switched centrally.

The reusable package is now consumed as:
- `@sriharshavarada/br-ui-wrapper`

The current repo is the demo/docs app that consumes that package.

## Core Design
- `Facade pattern`: Screen code uses only wrapper controls.
- `Adapter pattern`: Generic JSON config is transformed into implementation-specific inputs.
- `Mode-based strategy`: Control rendering is selected based on configured mode (`CUSTOM`, `MATERIAL`, `CANVAS` for grid; `CUSTOM`/`MATERIAL` for date).

## Key Layers
- **Consumer layer**: Feature screens such as:
  - `/Users/sriharshavinfinite.com/Desktop/CommonUIForBRPOC/src/app/screens/user-list/user-list.component.ts`
  - `/Users/sriharshavinfinite.com/Desktop/CommonUIForBRPOC/src/app/screens/order-list/order-list.component.ts`
- **Library public API**:
  - `/Users/sriharshavinfinite.com/Desktop/CommonUIForBRPOC/projects/br-ui-wrapper/src/public-api.ts`
- **Wrapper facades / adapters / implementations**:
  - moved into `/Users/sriharshavinfinite.com/Desktop/CommonUIForBRPOC/projects/br-ui-wrapper/src/lib/common/`
- **Implementations**:
  - Grid:
    - `components/br-grid`
    - `adapters/grid.adapter.ts`
    - `implementations/grid/custom`
    - `implementations/grid/material`
    - `implementations/grid/canvas`
    - Shared advanced shell:
      - `implementations/grid/shell/grid-shell.component.ts`
  - Date:
    - `components/br-date`
    - `adapters/date.adapter.ts`
    - `implementations/form/controls/date/custom`
    - `implementations/form/controls/date/material`
- **Mode configuration**:
  - `/Users/sriharshavinfinite.com/Desktop/CommonUIForBRPOC/projects/br-ui-wrapper/src/lib/common/config/ui-mode.config.ts`

## Configuration Model Strategy
- **Behavior/Data config**: sort/filter/pagination/actions/personalization.
- **Visual config (`uiConfig`)**: density, size, variants, tokens.
- Adapters normalize defaults so implementations always receive complete values.

## Event Strategy
- Grid emits one structured event stream via `(action)` with `source`, `actionId`, and contextual payload.
- Business logic stays in consumer screens/services, not inside grid/date implementations.
