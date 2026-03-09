# Consumer Integration Guide

## Who this is for
Teams using `br-grid` and `br-date` either:
- inside this project, or
- from another Angular project consuming this common UI layer.

## What consumers should do

## 1. Import only from the public wrapper API
Preferred:
- `@sriharshavarada/br-ui-wrapper`

Install in a consumer repo:

```ini
# .npmrc
@sriharshavarada:registry=https://npm.pkg.github.com
```

```bash
npm login --registry=https://npm.pkg.github.com
npm install @sriharshavarada/br-ui-wrapper
```

Do not import:
- adapters
- implementation components
- mode internals

## 2. Use wrapper controls in templates
```html
<br-grid [config]="gridConfig" (action)="onGridAction($event)"></br-grid>
<br-date [config]="dateConfig" (dateChange)="onDateChange($event)"></br-date>
```

## Public package contents
- Wrapper components:
  - `BrGridComponent`
  - `BrModalComponent`
  - `BrTextComponent`
  - `BrDateComponent`
  - `BrSingleSelectComponent`
  - `BrMultiSelectComponent`
  - `BrCheckboxComponent`
  - `BrRadioComponent`
  - `BrAutocompleteComponent`
- Config and event types for the above wrappers
- `RuntimeUiConfigService`
- `ControlRegistryService`
- mode exports such as `UI_MODE_BY_CONTROL`

## Runtime branding and light/dark mode
- Branding is an app-level runtime concern, not a per-control input.
- Consumers should not push branding into each control config object.
- Preferred flow:
  - load raw team branding
  - normalize through adapter if needed
  - call `BrandingRuntimeService.setBranding(...)`
  - call `BrandingRuntimeService.setMode('light' | 'dark')`
- Branded controls such as `br-text`, `br-text-area`, `br-grid`, `br-modal`, and future branded controls read the current runtime branding automatically.

Example:
```ts
constructor(private readonly brandingRuntimeService: BrandingRuntimeService) {}

initializeBranding(): void {
  this.brandingRuntimeService.setBranding(
    EnterpriseBrandingAdapter.toBrBrandingConfig(rawEnterpriseBranding)
  );
  this.brandingRuntimeService.setMode('light');
}
```

## 3. Provide generic JSON config
- Build `BrGridConfig` and `BrDateConfig`.
- Put behavior options in config (`features`, actions, sorting/filter defaults).
- Optional visual tuning with `uiConfig`.

### Grid usage model

#### Plain columns first
- For normal text columns, keep config simple.
- You usually only need:
  - `field`
  - `header`
  - `sortable`
  - `filterable`
- Do not specify `type` unless the cell is richer than plain text.

Example:
```ts
gridConfig: BrGridConfig = {
  title: 'Users',
  columns: [
    { field: 'id', header: 'ID', sortable: true },
    { field: 'name', header: 'Name', sortable: true },
    { field: 'status', header: 'Status', sortable: true }
  ],
  data: [
    { id: 'U-101', name: 'Alex Ross', status: 'Active' }
  ],
  pagination: true,
  pageSize: 10
};
```

What you will see:
- A normal grid with plain text cells for ID, Name, and Status.

What event comes out:
- Only normal grid events such as sorting, paging, selection, or toolbar actions.

#### Rich cells only where needed
- Supported rich cell types include:
  - `link`
  - `badge`
  - `icon`
  - `button`
  - `button-group`
  - `dropdown`
  - `dropdown-action`
  - `route-link`
  - `custom-template`

Example:
```ts
gridConfig: BrGridConfig = {
  title: 'Candidate Grid',
  columns: [
    { field: 'id', header: 'ID', sortable: true },
    {
      field: 'candidateName',
      header: 'Candidate',
      type: 'link',
      cellConfig: {
        actions: [{ id: 'open-profile', label: 'Open Profile', variant: 'link' }]
      }
    },
    {
      field: 'status',
      header: 'Status',
      type: 'badge',
      cellConfig: {
        badgeVariant: 'neutral'
      }
    },
    {
      field: 'hrStatus',
      header: 'HR Status',
      type: 'dropdown-action',
      cellConfig: {
        buttonLabel: 'Update',
        submitActionId: 'update-stage',
        options: [
          { label: 'Applied', value: 'Applied' },
          { label: 'First Interview', value: 'First Interview' },
          { label: 'Second Interview', value: 'Second Interview' }
        ]
      }
    }
  ],
  data: []
};
```

What you will see:
- Candidate name renders as clickable text.
- Status renders as a badge.
- HR status renders as dropdown plus Update button.

What event comes out:
- `cell-action` for clickable cells and inline buttons
- `cell-value-change` when dropdown value changes
- `inline-submit` when dropdown-action update is clicked

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
    case 'open-profile':
      // open profile
      break;
    case 'update-stage':
      // call backend and then update grid input state
      break;
  }
}
```

### Send feedback back into the grid with `rowMeta`
- `data` is business data.
- `rowMeta` is temporary UI state such as saving, success, error, or helper text.

Example:
```ts
this.gridConfig = {
  ...this.gridConfig,
  rowMeta: {
    ...(this.gridConfig.rowMeta || {}),
    'C-1001': {
      cells: {
        hrStatus: {
          state: 'success',
          tone: 'success',
          message: 'Updated to Second Interview'
        }
      }
    }
  }
};
```

What you will see:
- The cell keeps the real business value from `data`.
- The UI can additionally show success/error/helper feedback from `rowMeta`.

### Template override is the escape hatch
- Use built-in cell types first.
- Use template override only when config is not enough.

Example:
```html
<br-grid [config]="gridConfig" (action)="onGridAction($event)">
  <ng-template brGridCell="hrStatus" let-row let-value="value" let-meta="meta">
    <div class="custom-stage-cell">
      <select [ngModel]="value" (ngModelChange)="onStageDraftChange(row, $event)"></select>
      <button type="button" (click)="saveStage(row)">Update</button>
      <small *ngIf="meta?.message">{{ meta?.message }}</small>
    </div>
  </ng-template>
</br-grid>
```

What you will see:
- The grid still renders from config.
- Only the `hrStatus` cell is replaced by your custom Angular template.

What event comes out:
- Your template can call its own handlers directly.
- The surrounding grid still emits its normal standardized action events.

## 6. Mode control
- Central control-level mode config is in:
  - `/Users/sriharshavinfinite.com/Desktop/CommonUIForBRPOC/projects/br-ui-wrapper/src/lib/common/config/ui-mode.config.ts`
- Change `UI_MODE_BY_CONTROL.grid` and `UI_MODE_BY_CONTROL.date` as needed.

## For external project adoption

## 1. Expose common module/library package
- Publish or workspace-link `@sriharshavarada/br-ui-wrapper`.

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
