# Runtime Flow: Browser URL to Final Grid/Date

## 1. Browser loads app
1. Browser opens app URL.
2. Angular bootstrap starts from:
   - `/Users/sriharshavinfinite.com/Desktop/CommonUIForBRPOC/src/main.ts`
3. App-level providers are registered from:
   - `/Users/sriharshavinfinite.com/Desktop/CommonUIForBRPOC/src/app/app.config.ts`
4. The demo app depends on the published package:
   - `@sriharshavarada/br-ui-wrapper`

## 2. Root shell and routing
1. Root component loads:
   - `/Users/sriharshavinfinite.com/Desktop/CommonUIForBRPOC/src/app/app.component.ts`
2. Router config is read from:
   - `/Users/sriharshavinfinite.com/Desktop/CommonUIForBRPOC/src/app/app.routes.ts`
3. Route resolves lazy screen component (`/users` or `/orders`).

## 3. Screen component creates generic configs
1. Screen TS defines `gridConfig` and `dateConfig` JSON.
2. Screen template uses only:
   - `<br-grid [config]="gridConfig" ...>`
   - `<br-date [config]="dateConfig" ...>`
3. Screens do not import implementation controls directly.

## 4. Wrapper facade resolves control mode
1. `br-grid` reads grid mode from library runtime mode config/service:
   - `/Users/sriharshavinfinite.com/Desktop/CommonUIForBRPOC/projects/br-ui-wrapper/src/lib/common/config/ui-mode.config.ts`
   - `/Users/sriharshavinfinite.com/Desktop/CommonUIForBRPOC/projects/br-ui-wrapper/src/lib/common/services/runtime-ui-config.service.ts`
2. `br-date` reads date mode from the same library layer.

## 5. Adapter transforms generic JSON
1. `br-grid` calls adapter:
   - `/Users/sriharshavinfinite.com/Desktop/CommonUIForBRPOC/projects/br-ui-wrapper/src/lib/common/adapters/grid.adapter.ts`
2. `br-date` calls adapter:
   - `/Users/sriharshavinfinite.com/Desktop/CommonUIForBRPOC/projects/br-ui-wrapper/src/lib/common/adapters/date.adapter.ts`
3. Adapters apply defaults (including `features` and `uiConfig`).

## 6. Implementation selection/rendering
1. `br-grid` template conditionally renders one implementation:
   - custom/material/canvas
2. `br-date` template conditionally renders one implementation:
   - custom/material
3. For advanced grid behavior, implementations delegate to:
   - `/Users/sriharshavinfinite.com/Desktop/CommonUIForBRPOC/projects/br-ui-wrapper/src/lib/common/implementations/grid/shell/grid-shell.component.ts`

## 7. User interactions and action flow
1. User clicks toolbar/context/selection/sort/filter/pagination controls.
2. `grid-shell` emits typed action event.
3. Event bubbles:
   - `grid-shell` -> implementation component -> `br-grid` -> consuming screen
4. Screen handler executes behavior (API calls, persistence, dialogs, navigation).

## 8. Date value flow
1. User picks date.
2. Implementation emits raw date value.
3. `br-date` normalizes and emits generic `dateChange` output.
4. Screen receives standardized date string.
