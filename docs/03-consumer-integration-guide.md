# Consumer Integration Guide

## Who this is for
Teams using `br-grid` and `br-date` either:
- inside this project, or
- from another Angular project consuming this common UI layer.

## What consumers should do

## 1. Import only from common API
Use:
- `/Users/sriharshavinfinite.com/Desktop/CommonUIForBRPOC/src/app/common/index.ts`

Do not import:
- adapters
- implementation components
- mode internals

## 2. Use wrapper controls in templates
```html
<br-grid [config]="gridConfig" (action)="onGridAction($event)"></br-grid>
<br-date [config]="dateConfig" (dateChange)="onDateChange($event)"></br-date>
```

## 3. Provide generic JSON config
- Build `BrGridConfig` and `BrDateConfig`.
- Put behavior options in config (`features`, actions, sorting/filter defaults).
- Optional visual tuning with `uiConfig`.

## 4. Handle behavior outside the control
- Do not put business logic inside grid/date components.
- Handle actions in screen/container/service:
  - API calls
  - DB persistence
  - dialog/open/route logic

## 5. Use action routing by `actionId`
Example:
```ts
onGridAction(event: BrGridActionEvent): void {
  switch (event.actionId) {
    case 'edit':
      // open edit flow
      break;
    case 'sort-apply':
      // persist sort criteria
      break;
  }
}
```

## 6. Mode control
- Central control-level mode config is in:
  - `/Users/sriharshavinfinite.com/Desktop/CommonUIForBRPOC/src/app/common/config/ui-mode.config.ts`
- Change `UI_MODE_BY_CONTROL.grid` and `UI_MODE_BY_CONTROL.date` as needed.

## For external project adoption

## 1. Expose common module/library package
- Publish or workspace-link common components/models.

## 2. Keep consumer contract stable
- Consumer should depend only on:
  - `BrGridConfig`, `BrDateConfig`
  - `BrGridActionEvent`
  - wrapper selectors and outputs

## 3. Avoid coupling to implementation details
- Do not reference `CUSTOM`/`MATERIAL` implementation classes directly.
- Treat mode switching as infrastructure-level config.

## 4. Versioning recommendation
- Version the common contract.
- Mark additive config keys as optional.
- Keep backward-compatible adapter defaults.

