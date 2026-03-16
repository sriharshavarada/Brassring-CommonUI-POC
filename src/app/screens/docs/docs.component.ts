import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BrButtonComponent, BrButtonConfig, BrDateComponent, BrDateConfig, BrGridActionEvent, BrGridCellTemplateDirective, BrGridComponent, BrGridConfig } from '@sriharshavarada/br-ui-wrapper';

type DocGroupId = 'overview' | 'forms' | 'runtime' | 'controls' | 'containers';

type DocBlock =
  | { kind: 'text'; text: string }
  | { kind: 'list'; items: string[] }
  | { kind: 'code'; language: 'html' | 'typescript' | 'json'; code: string }
  | { kind: 'table'; columns: string[]; rows: string[][] }
  | { kind: 'callout'; title: string; text: string }
  | { kind: 'date-preview' }
  | { kind: 'button-preview' }
  | { kind: 'grid-preview'; preview: 'plain' | 'rich' | 'meta' | 'template' };

interface DocSection {
  id: string;
  title: string;
  blocks: DocBlock[];
}

interface DocPage {
  slug: string;
  title: string;
  summary: string;
  group: DocGroupId;
  order: number;
  parentSlug?: string;
  sections: DocSection[];
}

interface DocGroup {
  id: DocGroupId;
  label: string;
}

interface NavPageNode {
  page: DocPage;
  children: DocPage[];
}

@Component({
  selector: 'app-docs',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, BrDateComponent, BrButtonComponent, BrGridComponent, BrGridCellTemplateDirective],
  templateUrl: './docs.component.html',
  styleUrls: ['./docs.component.scss'],
})
export class DocsComponent {
  readonly repoPath = '/Users/sriharshavinfinite.com/Desktop/CommonUIForBRPOC/docs';
  navSearch = '';
  docDateValueText = 'No date selected.';
  docButtonEventText = 'No action yet.';
  docGridEventText: Record<'plain' | 'rich' | 'meta' | 'template', string> = {
    plain: 'No action yet.',
    rich: 'No action yet.',
    meta: 'No action yet.',
    template: 'No action yet.',
  };
  docTemplateDraftByRow: Record<string, string> = {
    'C-3001': 'First Interview',
  };

  readonly plainGridPreviewConfig: BrGridConfig = {
    title: 'Users',
    columns: [
      { field: 'id', header: 'ID', sortable: true },
      { field: 'name', header: 'Name', sortable: true },
      { field: 'status', header: 'Status', sortable: true },
    ],
    data: [
      { id: 'U-101', name: 'Alex Ross', status: 'Active' },
    ],
    pagination: true,
    pageSize: 10,
    sorting: true,
    features: {
      enableTopBar: false,
      enableRowSelection: false,
      enableSelectionActions: false,
      enableContextMenu: false,
      enableRowActionButton: false,
      enableColumnPersonalization: false,
      enableColumnVisibilityToggle: false,
      enableColumnReorder: false,
      enableSorting: true,
      sortLevels: 1,
      enableFiltering: false,
      filterLevels: 1,
      enableSearch: false,
      enableRefresh: false,
      enableShare: false,
      enableViewMode: false,
      enablePrimaryAction: false,
      enablePrimaryActionMenu: false,
      showPaginationSizeSelector: false,
      showPaginationSummary: false,
      showPaginationNavigation: false,
    },
  };

  readonly docDatePreviewConfig: BrDateConfig = {
    id: 'docs-start-date',
    label: 'Start Date',
    value: '',
    locale: 'fr-FR',
    dateFormat: 'dd-MM-yyyy',
    dateConfiguration: {
      Disabledaysofweek: [0, 6],
      Firstdayofweek: 1,
      Defaulttodaysdate: true,
      Mindate: '-1m',
      Maxdate: '+3m',
      includeToday: true,
    },
  };

  readonly docButtonPreviewConfig: BrButtonConfig = {
    id: 'docs-save-button',
    label: 'Save Changes',
    variant: 'primary',
    size: 'md',
    type: 'button',
  };

  readonly richGridPreviewConfig: BrGridConfig = {
    title: 'Rich Cells Preview',
    columns: [
      { field: 'id', header: 'ID', sortable: true },
      {
        field: 'candidateName',
        header: 'Candidate',
        type: 'link',
        cellConfig: {
          actions: [{ id: 'open-profile', label: 'Open Profile', variant: 'link' }],
        },
      },
      {
        field: 'status',
        header: 'Status',
        type: 'badge',
        cellConfig: { badgeVariant: 'neutral' },
      },
      {
        field: 'pin',
        header: 'Pin',
        type: 'icon',
        cellConfig: {
          icon: 'pin',
          actions: [{ id: 'toggle-pin', label: 'Toggle Pin', icon: 'pin', variant: 'ghost' }],
        },
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
            { label: 'Second Interview', value: 'Second Interview' },
          ],
        },
      },
      {
        field: 'team',
        header: 'Team',
        type: 'route-link',
        cellConfig: {
          route: '/users',
        },
      },
      {
        field: 'actions',
        header: 'Actions',
        type: 'button-group',
        cellConfig: {
          actions: [
            { id: 'edit-user', label: 'Edit', variant: 'secondary' },
            { id: 'delete-user', label: 'Delete', variant: 'danger' },
          ],
        },
      },
    ],
    data: [
      {
        id: 'C-1001',
        candidateName: 'Anya Ross',
        status: 'Active',
        pin: 'pin',
        hrStatus: 'First Interview',
        team: 'Platform',
        actions: '',
      },
    ],
    pagination: false,
    sorting: true,
    features: {
      enableTopBar: false,
      enableRowSelection: false,
      enableSelectionActions: false,
      enableContextMenu: false,
      enableRowActionButton: false,
      enableColumnPersonalization: false,
      enableColumnVisibilityToggle: false,
      enableColumnReorder: false,
      enableSorting: true,
      sortLevels: 1,
      enableFiltering: false,
      filterLevels: 1,
      enableSearch: false,
      enableRefresh: false,
      enableShare: false,
      enableViewMode: false,
      enablePrimaryAction: false,
      enablePrimaryActionMenu: false,
      showPaginationSizeSelector: false,
      showPaginationSummary: false,
      showPaginationNavigation: false,
    },
  };

  readonly metaGridPreviewConfig: BrGridConfig = {
    title: 'rowMeta Feedback Preview',
    columns: [
      { field: 'id', header: 'ID' },
      { field: 'candidateName', header: 'Candidate' },
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
            { label: 'Second Interview', value: 'Second Interview' },
          ],
        },
      },
    ],
    data: [
      {
        id: 'C-2101',
        candidateName: 'Ravi Singh',
        hrStatus: 'Second Interview',
      },
    ],
    rowMeta: {
      'C-2101': {
        cells: {
          hrStatus: {
            state: 'success',
            tone: 'success',
            message: 'Updated to Second Interview',
          },
        },
      },
    },
    pagination: false,
    sorting: false,
    features: {
      enableTopBar: false,
      enableRowSelection: false,
      enableSelectionActions: false,
      enableContextMenu: false,
      enableRowActionButton: false,
      enableColumnPersonalization: false,
      enableColumnVisibilityToggle: false,
      enableColumnReorder: false,
      enableSorting: false,
      sortLevels: 1,
      enableFiltering: false,
      filterLevels: 1,
      enableSearch: false,
      enableRefresh: false,
      enableShare: false,
      enableViewMode: false,
      enablePrimaryAction: false,
      enablePrimaryActionMenu: false,
      showPaginationSizeSelector: false,
      showPaginationSummary: false,
      showPaginationNavigation: false,
    },
  };

  readonly templateGridPreviewConfig: BrGridConfig = {
    title: 'Template Override Preview',
    columns: [
      { field: 'id', header: 'ID' },
      { field: 'candidateName', header: 'Candidate' },
      {
        field: 'hrStatus',
        header: 'HR Status',
        type: 'custom-template',
        cellConfig: {
          emptyText: 'Custom template expected',
        },
      },
    ],
    data: [
      {
        id: 'C-3001',
        candidateName: 'Mia Chen',
        hrStatus: 'First Interview',
      },
    ],
    rowMeta: {
      'C-3001': {
        cells: {
          hrStatus: {
            state: 'idle',
            message: 'No update yet',
            tone: 'neutral',
          },
        },
      },
    },
    pagination: false,
    sorting: false,
    features: {
      enableTopBar: false,
      enableRowSelection: false,
      enableSelectionActions: false,
      enableContextMenu: false,
      enableRowActionButton: false,
      enableColumnPersonalization: false,
      enableColumnVisibilityToggle: false,
      enableColumnReorder: false,
      enableSorting: false,
      sortLevels: 1,
      enableFiltering: false,
      filterLevels: 1,
      enableSearch: false,
      enableRefresh: false,
      enableShare: false,
      enableViewMode: false,
      enablePrimaryAction: false,
      enablePrimaryActionMenu: false,
      showPaginationSizeSelector: false,
      showPaginationSummary: false,
      showPaginationNavigation: false,
    },
  };

  readonly groups: DocGroup[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'forms', label: 'Forms and Events' },
    { id: 'runtime', label: 'Runtime and Branding' },
    { id: 'controls', label: 'Form Controls' },
    { id: 'containers', label: 'Containers' },
  ];

  readonly pages: DocPage[] = [
    {
      slug: 'preface-and-key-terms',
      title: 'Preface and Key Terms',
      summary: 'Simple language overview of why this UI layer exists and core terms consumers should know.',
      group: 'overview',
      order: 0,
      sections: [
        {
          id: 'why-this-exists',
          title: 'Why This Exists (Simple Terms)',
          blocks: [
            {
              kind: 'list',
              items: [
                'Teams need stable UI APIs even if implementation library changes.',
                'Wrappers (`br-*`) prevent feature screens from depending on internal implementation details.',
                'Mode switching (CUSTOM/MATERIAL) should not force consumer code rewrites.',
                'Forms and events should behave consistently across all controls.',
              ],
            },
          ],
        },
        {
          id: 'key-terms',
          title: 'Key Terms',
          blocks: [
            {
              kind: 'table',
              columns: ['Term', 'Simple meaning'],
              rows: [
                ['Wrapper (`br-*`)', 'Consumer-facing component you should use in screens.'],
                ['Config style', 'Pass one object through `[config]` to control behavior.'],
                ['No-config style', 'Pass direct inputs and bind with `[(ngModel)]` or `formControlName`.'],
                ['CVA', 'Angular forms bridge that lets wrappers behave like native inputs.'],
                ['controlEvent', 'Standard payload for all interaction events with id/name/class/meta/value.'],
                ['meta', 'Your custom payload object passed through events for context.'],
                ['controlId', 'Legacy alias for `id`, normalized by wrapper.'],
                ['Registry', 'Service to read values by id/name/class at runtime.'],
                ['Runtime mode', 'Switch CUSTOM/MATERIAL implementations without screen code changes.'],
              ],
            },
          ],
        },
      ],
    },
    {
      slug: 'getting-started',
      title: 'Getting Started',
      summary: 'How to consume wrappers safely in production screens.',
      group: 'overview',
      order: 1,
      sections: [
        {
          id: 'quick-preface',
          title: 'Quick Preface',
          blocks: [
            {
              kind: 'callout',
              title: 'In one line',
              text: 'Consumer screens should only know wrapper APIs; implementation details must stay hidden behind wrappers.',
            },
          ],
        },
        {
          id: 'what-this-library-provides',
          title: 'What This Library Provides',
          blocks: [
            {
              kind: 'list',
              items: [
                'Consumer-safe wrapper components (`br-*`) with stable API.',
                'Runtime switch between CUSTOM and MATERIAL without changing screen code.',
                'Consistent event contract (`valueChange`, UI events, `controlEvent`).',
                'Angular forms compatibility through CVA for both reactive forms and ngModel.',
              ],
            },
            {
              kind: 'callout',
              title: 'Consumer Boundary',
              text: 'Import wrappers and public types from `@sriharshavarada/br-ui-wrapper`. Do not import adapters or implementation components directly.',
            },
          ],
        },
        {
          id: 'install-and-auth',
          title: 'Install and Auth',
          blocks: [
            {
              kind: 'text',
              text: 'This package is a separate published library. Consumer apps install it from GitHub Packages and then import wrappers/types from the package name.',
            },
            {
              kind: 'code',
              language: 'json',
              code: `// package.json
{
  "dependencies": {
    "@sriharshavarada/br-ui-wrapper": "^0.0.1"
  }
}`,
            },
            {
              kind: 'code',
              language: 'json',
              code: `# .npmrc
@sriharshavarada:registry=https://npm.pkg.github.com`,
            },
            {
              kind: 'code',
              language: 'typescript',
              code: `npm login --registry=https://npm.pkg.github.com
npm install`,
            },
            {
              kind: 'callout',
              title: 'Private package note',
              text: 'Because the package is private, each developer machine and each CI pipeline must authenticate to GitHub Packages before install.',
            },
          ],
        },
        {
          id: 'public-api-surface',
          title: 'What Consumers Can Import',
          blocks: [
            {
              kind: 'table',
              columns: ['Category', 'Available from `@sriharshavarada/br-ui-wrapper`'],
              rows: [
                ['Wrapper components', 'BrGridComponent, BrModalComponent, BrTextComponent, BrTextAreaComponent, BrDateComponent, BrSingleSelectComponent, BrMultiSelectComponent, BrCheckboxComponent, BrRadioComponent, BrAutocompleteComponent'],
                ['Config and event types', 'BrGridConfig, BrGridActionEvent, BrModalConfig, BrModalActionEvent, BrDateConfig, BrAdvancedDateConfiguration, BrTextConfig, BrSingleSelectConfig, BrMultiSelectConfig, BrCheckboxConfig, BrRadioConfig, BrAutocompleteConfig, BrControlsConfig, BrControlField, BrControlActionEvent, BrControlEvent'],
                ['Services', 'RuntimeUiConfigService, ControlRegistryService'],
                ['Mode exports', 'UI_MODE_BY_CONTROL, UI_MODE, UiMode and related mode types'],
              ],
            },
            {
              kind: 'callout',
              title: 'Use the public package only',
              text: 'Treat `@sriharshavarada/br-ui-wrapper` as the only consumer entry point. Do not reference internal file paths, adapters, or implementation folders from application code.',
            },
          ],
        },
        {
          id: 'runtime-branding-model',
          title: 'Runtime Branding and Light/Dark Mode',
          blocks: [
            {
              kind: 'callout',
              title: 'App-level concern',
              text: 'Branding and light/dark mode are runtime app-level settings, not per-control inputs. You set them once through BrandingRuntimeService, and branded controls read the current runtime state automatically.',
            },
            {
              kind: 'text',
              text: 'Do not pass branding through every br-text or br-text-area config object. The normal flow is: app loads branding -> optional adapter normalizes it -> BrandingRuntimeService.setBranding(...) -> BrandingRuntimeService.setMode(...) -> controls update through runtime styling.',
            },
            {
              kind: 'code',
              language: 'typescript',
              code: `constructor(private readonly brandingRuntimeService: BrandingRuntimeService) {}

initializeBranding(): void {
  this.brandingRuntimeService.setBranding({
    light: {
      focusColor: '#ea580c',
      inputBorderColor: '#cbd5e1',
      primaryButtonColor: '#0f766e'
    }
  });
  this.brandingRuntimeService.setMode('light');
}`,
            },
          ],
        },
        {
          id: 'component-index',
          title: 'Component Index',
          blocks: [
            {
              kind: 'table',
              columns: ['Component', 'Purpose'],
              rows: [
                ['BrGridComponent', 'Tabular data wrapper with toolbar, actions, sorting, filtering, selection, and pagination.'],
                ['BrModalComponent', 'Modal/popup wrapper with action-driven close and confirm flows.'],
                ['BrTextComponent', 'Text input wrapper with CVA/event support.'],
                ['BrTextAreaComponent', 'Multi-line text wrapper with CVA/event support and textarea-specific config.'],
                ['BrDateComponent', 'Date input wrapper with locale, format, and advanced DateConfiguration support.'],
                ['BrSingleSelectComponent', 'Single-choice select/dropdown wrapper.'],
                ['BrMultiSelectComponent', 'Multi-value select wrapper.'],
                ['BrCheckboxComponent', 'Boolean checkbox wrapper.'],
                ['BrRadioComponent', 'Radio group wrapper.'],
                ['BrAutocompleteComponent', 'Autocomplete/searchable text wrapper.'],
              ],
            },
          ],
        },
        {
          id: 'minimum-setup',
          title: 'Minimum Setup in a Screen',
          blocks: [
            {
              kind: 'code',
              language: 'typescript',
              code: `import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrTextComponent, BrTextConfig } from '@sriharshavarada/br-ui-wrapper';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, BrTextComponent],
  templateUrl: './your-screen.component.html'
})
export class YourScreenComponent {
  nameConfig: BrTextConfig = {
    id: 'user-name',
    label: 'Name',
    value: '',
    placeholder: 'Enter full name',
    required: true
  };

  onNameChange(value: string): void {
    this.nameConfig = { ...this.nameConfig, value };
  }
}`,
            },
            {
              kind: 'code',
              language: 'html',
              code: `<br-text [config]="nameConfig" (valueChange)="onNameChange($event)"></br-text>`,
            },
          ],
        },
        {
          id: 'integration-checklist',
          title: 'Production Integration Checklist',
          blocks: [
            {
              kind: 'list',
              items: [
                'Assign stable `id`/`name`/`className` if registry lookup is needed.',
                'Use either config-based wiring or direct inputs with ngModel; keep one style per screen for consistency.',
                'Subscribe to `controlEvent` only if your screen needs standardized analytics/tracing.',
                'Keep business logic in screen/service layers, not inside wrapper configs.',
                'Validate mode-specific behavior in Playground before shipping.',
              ],
            },
          ],
        },
      ],
    },
    {
      slug: 'forms-and-events',
      title: 'Forms, Events, and Registry',
      summary: 'How CVA, events, metadata, and value registry work together.',
      group: 'forms',
      order: 1,
      sections: [
        {
          id: 'cva-basics',
          title: 'CVA Basics (Reactive + ngModel)',
          blocks: [
            {
              kind: 'text',
              text: 'All current form wrappers implement ControlValueAccessor through `BaseValueAccessor`, so Angular Forms can read/write values and disabled state.',
            },
            {
              kind: 'code',
              language: 'html',
              code: `<form [formGroup]="form">
  <br-text formControlName="userName"></br-text>
  <br-date formControlName="startDate"></br-date>
</form>

<br-radio [(ngModel)]="employmentType" [options]="typeOptions"></br-radio>`,
            },
          ],
        },
        {
          id: 'simple-model',
          title: 'Simple Mental Model',
          blocks: [
            {
              kind: 'list',
              items: [
                'Consumer writes value -> wrapper receives and forwards to implementation.',
                'User interacts in implementation -> wrapper emits standardized events to consumer.',
                'Angular Forms talks to wrapper via CVA functions; wrapper keeps implementation in sync.',
              ],
            },
          ],
        },
        {
          id: 'standard-event-contract',
          title: 'Standard Event Contract',
          blocks: [
            {
              kind: 'table',
              columns: ['Output', 'Purpose'],
              rows: [
                ['valueChange', 'Primary value update output from wrapper.'],
                ['blur / focus', 'Focus lifecycle handling (validation UX, touched state).'],
                ['input / change', 'Low-level input/change stream if needed.'],
                ['keydown / keyup / click', 'User interaction hooks.'],
                ['controlEvent', 'Normalized payload for uniform telemetry and generic handlers.'],
              ],
            },
            {
              kind: 'callout',
              title: 'Recommended Pattern',
              text: 'Use `valueChange` for form state updates and use `controlEvent` for logging/audit/analytics.',
            },
          ],
        },
        {
          id: 'control-event-payload',
          title: 'controlEvent Payload Shape',
          blocks: [
            {
              kind: 'code',
              language: 'typescript',
              code: `type BrControlEventType =
  | 'valueChange' | 'blur' | 'focus' | 'input'
  | 'change' | 'keydown' | 'keyup' | 'click';

interface BrControlEvent<TValue = unknown> {
  type: BrControlEventType;
  id?: string;
  name?: string;
  className?: string;
  value?: TValue;
  meta?: Record<string, any>;
  originalEvent?: Event;
}`,
            },
            {
              kind: 'code',
              language: 'html',
              code: `<br-text
  [id]="'add-user-name'"
  [meta]="{ source: 'add-user' }"
  (controlEvent)="onControlEvent($event)">
</br-text>`,
            },
            {
              kind: 'code',
              language: 'typescript',
              code: `onControlEvent(event: BrControlEvent<unknown>): void {
  console.log(event.type, event.id, event.value, event.meta);
}`,
            },
          ],
        },
        {
          id: 'registry-usage',
          title: 'Registry Usage (byId, byName, byClass)',
          blocks: [
            {
              kind: 'text',
              text: 'ControlRegistryService enables direct lookup of live wrapper values by identity. Useful for orchestration screens and diagnostics.',
            },
            {
              kind: 'code',
              language: 'typescript',
              code: `constructor(private readonly controlRegistry: ControlRegistryService) {}

readValues(): void {
  const byId = this.controlRegistry.valueById('add-user-name');
  const byName = this.controlRegistry.valuesByName('userName');
  const byClass = this.controlRegistry.valuesByClass('profile-field');
  console.log({ byId, byName, byClass });
}`,
            },
            {
              kind: 'callout',
              title: 'Identity Requirement',
              text: 'Registry lookups require wrappers to receive `id`, `name`, and/or `className` via config or direct inputs.',
            },
          ],
        },
      ],
    },
    this.runtimeBrandingPage(),
    this.controlPage('br-text', 'Text Box', 'string', true, true, false),
    this.controlPage('br-text-area', 'Text Area', 'string', true, true, false, false, true),
    this.buttonPage(),
    this.controlPage('br-date', 'Date', 'string | Date | null', true, true, false, true),
    {
      slug: 'br-date-configuration',
      title: 'br-date configuration reference',
      summary: 'Detailed meaning of DateConfiguration, locale/language, dateFormat, and relative bounds.',
      group: 'controls',
      order: 2.1,
      parentSlug: 'br-date',
      sections: [
        {
          id: 'overview',
          title: 'Overview',
          blocks: [
            {
              kind: 'text',
              text: 'Use this page when you need advanced date behavior. `br-date` supports both top-level date props and legacy `DateConfiguration` payloads.',
            },
            {
              kind: 'callout',
              title: 'Compatibility Rule',
              text: 'Both `dateConfiguration` and `DateConfiguration` are accepted. If both are present, `dateConfiguration` is preferred.',
            },
          ],
        },
        {
          id: 'top-level-props',
          title: 'Top-Level Date Props',
          blocks: [
            {
              kind: 'table',
              columns: ['Property', 'Meaning', 'Notes'],
              rows: [
                ['value', 'Current selected date.', 'Accepts `string | Date | null`.'],
                ['minDate / maxDate', 'Absolute selectable boundaries.', 'Can be Date or parseable string.'],
                ['language / locale', 'Locale used for labels/weekday/month formatting.', '`language` is preferred over `locale` when both are set.'],
                ['dateFormat', 'Display/parse pattern for both CUSTOM and MATERIAL modes.', 'Examples: `yyyy-MM-dd`, `dd-MM-yyyy`, `MM/dd/yyyy`.'],
                ['disabled', 'Disable the control.', 'Blocks user interactions.'],
                ['required', 'Mark as required.', 'Validation responsibility remains in consumer forms.'],
              ],
            },
          ],
        },
        {
          id: 'advanced-node',
          title: 'DateConfiguration Fields',
          blocks: [
            {
              kind: 'table',
              columns: ['Field', 'Purpose', 'Current behavior'],
              rows: [
                ['Disabledaysofweek', 'Disable weekdays by index.', 'Accepts 0-6; string numbers allowed; empty strings are ignored.'],
                ['Firstdayofweek', 'First day of calendar week.', 'Accepts 0-6. If missing, locale week start is used.'],
                ['Defaulttodaysdate', 'Auto-default value to today when value is empty.', 'Applied only when `value` is empty.'],
                ['Mindate / Maxdate', 'Relative or absolute bound definitions.', 'Supports absolute dates and relative tokens like `0d`, `-1m`, `+2y`.'],
                ['Currentdate / Customdate', 'Unit hint for relative tokens.', 'Used to infer days/weeks/months/years when token suffix is omitted.'],
                ['includeToday / IncludeToday / Includetoday', 'Whether today is allowed at edge conditions.', 'All three casings supported.'],
                ['Datedisplay', 'Legacy display hint.', 'Currently kept for compatibility; no active rendering branch uses it.'],
                ['Minslidervalue / Maxslidervalue', 'Legacy slider metadata.', 'Currently retained for compatibility; not used in runtime selection logic.'],
              ],
            },
          ],
        },
        {
          id: 'relative-bounds',
          title: 'Relative Bounds Logic',
          blocks: [
            {
              kind: 'list',
              items: [
                'Relative tokens support units `d`, `w`, `m`, `y` and signed values (example: `-10d`, `0d`, `+2m`).',
                'If token unit is omitted, unit is inferred from `Customdate` / `Currentdate` (year/month/week), else defaults to days.',
                'If min and max tokens are identical, or either token is zero (`0*`), adapter anchors to full unit range (day/week/month/year).',
                'If `includeToday` is false and only one side bound equals today, adapter shifts that edge by one day.',
              ],
            },
            {
              kind: 'code',
              language: 'json',
              code: `{\n  \"DateConfiguration\": {\n    \"Disabledaysofweek\": [\"\", \"\", \"\", 3, \"\", \"\", \"\"],\n    \"Firstdayofweek\": \"3\",\n    \"Defaulttodaysdate\": true,\n    \"Mindate\": \"0d\",\n    \"Maxdate\": \"\",\n    \"Currentdate\": \"year\",\n    \"Customdate\": \"year\",\n    \"includeToday\": false\n  }\n}`,
            },
          ],
        },
        {
          id: 'format-locale',
          title: 'Supported dateFormat and Locale Notes',
          blocks: [
            {
              kind: 'text',
              text: 'Current CUSTOM and MATERIAL parsing/formatting both support slash and hyphen variants with yyyy or yy.',
            },
            {
              kind: 'list',
              items: [
                '`yyyy-MM-dd`',
                '`MM/dd/yyyy`, `M/d/yyyy`, `dd/MM/yyyy`, `d/M/yyyy`',
                '`MM-dd-yyyy`, `M-d-yyyy`, `dd-MM-yyyy`, `d-M-yyyy`',
                'Two-digit year variants: `MM/dd/yy`, `dd-MM-yy`, etc.',
              ],
            },
            {
              kind: 'callout',
              title: 'Open Behavior',
              text: 'If a value exists, calendar opens at that month/year. If value is empty, it opens at current month/year.',
            },
          ],
        },
        {
          id: 'consumer-examples',
          title: 'Consumer Examples',
          blocks: [
            {
              kind: 'code',
              language: 'typescript',
              code: `dateConfig: BrDateConfig = {\n  id: 'start-date',\n  label: 'Start Date',\n  value: '',\n  locale: 'fr-FR',\n  dateFormat: 'dd-MM-yyyy',\n  dateConfiguration: {\n    Disabledaysofweek: [0, 6],\n    Firstdayofweek: 1,\n    Defaulttodaysdate: true,\n    Mindate: '-1m',\n    Maxdate: '+3m',\n    includeToday: true\n  }\n};`,
            },
            {
              kind: 'code',
              language: 'html',
              code: `<br-date\n  [config]=\"dateConfig\"\n  (dateChange)=\"onDateChange($event)\"\n  (controlEvent)=\"onDateEvent($event)\">\n</br-date>`,
            },
            {
              kind: 'date-preview',
            },
          ],
        },
      ],
    },
    this.controlPage('br-single-select', 'Single Select', 'any', true, false, true),
    this.controlPage('br-multi-select', 'Multi Select', 'any[]', true, false, true),
    this.controlPage('br-checkbox', 'Checkbox', 'boolean', true, false, false),
    this.controlPage('br-radio', 'Radio', 'any', true, false, true),
    this.controlPage('br-autocomplete', 'Autocomplete', 'string', true, true, true),
    {
      slug: 'br-grid',
      title: 'br-grid',
      summary: 'Grid container wrapper with plain columns, rich cells, actions, paging, and controlled template overrides.',
      group: 'containers',
      order: 1,
      sections: [
        {
          id: 'when-to-use',
          title: 'When to Use',
          blocks: [
            {
              kind: 'list',
              items: [
                'Need rich tabular UI with common interaction model.',
                'Need ability to switch rendering library without screen rewrite.',
                'Need action events for toolbar, rows, selection, pagination.',
                'Need simple text columns for most fields but richer cells only where required.',
              ],
            },
          ],
        },
        {
          id: 'key-terms',
          title: 'Key Terms for br-grid',
          blocks: [
            {
              kind: 'table',
              columns: ['Term', 'Simple meaning'],
              rows: [
                ['config', 'Grid structure and behavior object passed from consumer.'],
                ['action event', 'User intent signal emitted from grid wrapper.'],
                ['plain column', 'A normal text column. You usually pass only field, header, sortable, filterable.'],
                ['rich cell', 'A column that renders as link, badge, icon, button, dropdown, route link, or button group.'],
                ['rowMeta', 'Consumer-controlled UI feedback state for rows/cells such as saving, success, or error.'],
                ['template override', 'Optional Angular template for one specific cell/field when config is not enough.'],
                ['selection action', 'Action on selected rows.'],
                ['toolbar action', 'Action triggered from top controls (search/sort/filter/etc.).'],
              ],
            },
          ],
        },
        {
          id: 'import-and-setup',
          title: 'Import and Setup',
          blocks: [
            {
              kind: 'code',
              language: 'typescript',
              code: `import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BrGridComponent, BrGridActionEvent, BrGridConfig } from '@sriharshavarada/br-ui-wrapper';

@Component({
  standalone: true,
  imports: [CommonModule, BrGridComponent],
  templateUrl: './your-screen.component.html',
})
export class YourScreenComponent {
  gridConfig: BrGridConfig = {
    columns: [],
    data: [],
  };

  onGridAction(event: BrGridActionEvent): void {
    console.log(event);
  }
}`,
            },
          ],
        },
        {
          id: 'plain-columns-first',
          title: 'Start With Plain Columns',
          blocks: [
            {
              kind: 'callout',
              title: 'Default rule',
              text: 'Do not specify `type` for simple text columns. Plain text is the default. Only use `type` and `cellConfig` when a cell is richer than normal text.',
            },
            {
              kind: 'code',
              language: 'typescript',
              code: `gridConfig: BrGridConfig = {
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
};`,
            },
            {
              kind: 'code',
              language: 'html',
              code: `<br-grid [config]="gridConfig" (action)="onGridAction($event)"></br-grid>`,
            },
            {
              kind: 'grid-preview',
              preview: 'plain',
            },
          ],
        },
        {
          id: 'rich-cell-types',
          title: 'Rich Cell Types (Use Only Where Needed)',
          blocks: [
            {
              kind: 'table',
              columns: ['Cell type', 'Typical use'],
              rows: [
                ['link', 'Clickable text that emits an action event.'],
                ['badge', 'Status pill such as Active, Pending, Inactive.'],
                ['icon', 'Pin, delete, star, or lightweight icon action.'],
                ['button', 'Single inline button in a cell.'],
                ['button-group', 'Multiple inline actions like Edit/Delete/Remind.'],
                ['dropdown', 'Editable select-only cell.'],
                ['dropdown-action', 'Editable select plus an explicit Update button.'],
                ['route-link', 'Text that emits navigation intent.'],
                ['custom-template', 'Use only when config-driven cell types are not enough.'],
              ],
            },
            {
              kind: 'code',
              language: 'typescript',
              code: `gridConfig: BrGridConfig = {
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
      field: 'pin',
      header: 'Pin',
      type: 'icon',
      cellConfig: {
        icon: 'pin',
        actions: [{ id: 'toggle-pin', label: 'Toggle Pin', icon: 'pin', variant: 'ghost' }]
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
    },
    {
      field: 'team',
      header: 'Team',
      type: 'route-link',
      cellConfig: {
        route: '/users'
      }
    },
    {
      field: 'actions',
      header: 'Actions',
      type: 'button-group',
      cellConfig: {
        actions: [
          { id: 'edit-user', label: 'Edit', variant: 'secondary' },
          { id: 'delete-user', label: 'Delete', variant: 'danger' }
        ]
      }
    }
  ],
  data: [
    {
      id: 'C-1001',
      candidateName: 'Anya Ross',
      status: 'Active',
      pin: 'pin',
      hrStatus: 'First Interview',
      team: 'Platform',
      actions: ''
    }
  ]
};`,
            },
            {
              kind: 'grid-preview',
              preview: 'rich',
            },
            {
              kind: 'callout',
              title: 'What you will see',
              text: 'Candidate name renders as clickable text, status renders as a badge, pin renders as an icon action, HR status renders as dropdown plus Update button, and Actions renders as multiple inline buttons.',
            },
            {
              kind: 'callout',
              title: 'What event comes out',
              text: 'The grid still emits one standard `BrGridActionEvent`. For example: link/icon/button clicks emit `cell-action`, dropdown changes emit `cell-value-change`, and dropdown-action submit emits `inline-submit`.',
            },
          ],
        },
        {
          id: 'single-handler-pattern',
          title: 'Use One Grid Handler in the Consumer',
          blocks: [
            {
              kind: 'code',
              language: 'typescript',
              code: `onGridAction(event: BrGridActionEvent): void {
  switch (event.actionId) {
    case 'open-profile':
      this.openProfile(event.row);
      break;
    case 'toggle-pin':
      this.togglePin(event.row);
      break;
    case 'update-stage':
      this.updateCandidateStage(event.rowId, event.value, event.previousValue);
      break;
    case 'edit-user':
      this.editUser(event.row);
      break;
    case 'delete-user':
      this.deleteUser(event.rowId);
      break;
    default:
      console.log('Grid action:', event);
  }
}`,
            },
            {
              kind: 'callout',
              title: 'Keep logic in the consumer',
              text: 'Do not pass real method references through grid JSON. Put stable action ids in config, let the grid emit intent, and let the consumer switch on `actionId` and call services or router methods.',
            },
          ],
        },
        {
          id: 'feedback-back-into-grid',
          title: 'Send Feedback Back Into the Grid With rowMeta',
          blocks: [
            {
              kind: 'text',
              text: 'After an inline action succeeds or fails, the consumer should update grid input state. Business data goes in `data`. Temporary UI feedback such as saving/success/error goes in `rowMeta`.',
            },
            {
              kind: 'code',
              language: 'typescript',
              code: `gridConfig = {
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
};`,
            },
            {
              kind: 'callout',
              title: 'Data vs meta',
              text: '`data` is the real business row value. `rowMeta` is temporary UI state such as saving, success, error, disabled, or helper message.',
            },
            {
              kind: 'grid-preview',
              preview: 'meta',
            },
            {
              kind: 'callout',
              title: 'What you will see',
              text: 'The cell keeps its real value from `data`, but the UI can additionally show helper text, success state, warning state, or error message based on `rowMeta`.',
            },
            {
              kind: 'callout',
              title: 'What event comes out',
              text: 'The grid does not emit a special “meta updated” event. The consumer updates `rowMeta`, and the grid re-renders from the new input state.',
            },
          ],
        },
        {
          id: 'server-side-grid-model',
          title: 'Server-Side Sorting, Filtering, and Paging',
          blocks: [
            {
              kind: 'text',
              text: 'Keep server calls outside the grid. The grid should emit query intent; the consumer should call the backend and then pass updated rows/total count back into `BrGridConfig`.',
            },
            {
              kind: 'code',
              language: 'typescript',
              code: `onGridAction(event: BrGridActionEvent): void {
  if (event.source === 'query-change' && event.query) {
    this.loadUsers(event.query);
  }
}

loadUsers(query: BrGridQueryState): void {
  // call backend here, then update gridConfig.result or gridConfig.data
}`,
            },
          ],
        },
        {
          id: 'frozen-columns-horizontal-scroll',
          title: 'Frozen Columns + Horizontal Scroll',
          blocks: [
            {
              kind: 'text',
              text: 'Use frozen columns when the grid has many fields and you want key identifiers like ID or Name to stay visible while the rest of the table scrolls horizontally.',
            },
            {
              kind: 'callout',
              title: 'Expected behavior',
              text: 'Only the inner grid column area should scroll horizontally. Frozen columns and their headers stay pinned on the left. Toolbar, sort, filter, and pagination should not slide as one large block.',
            },
            {
              kind: 'code',
              language: 'typescript',
              code: "gridConfig: BrGridConfig = {\n  title: 'Employees',\n  columns: [\n    { field: 'id', header: 'ID', frozen: true, width: '96px', sortable: true },\n    { field: 'name', header: 'Name', frozen: true, width: '220px', sortable: true },\n    { field: 'team', header: 'Team', width: '180px', sortable: true, filterable: true },\n    { field: 'role', header: 'Role', width: '180px', sortable: true, filterable: true },\n    { field: 'location', header: 'Location', width: '180px' },\n    { field: 'status', header: 'Status', width: '160px' },\n    { field: 'manager', header: 'Manager', width: '200px' },\n    { field: 'project', header: 'Project', width: '200px' },\n    { field: 'costCenter', header: 'Cost Center', width: '180px' }\n  ],\n  data: rows,\n  showColumnSettings: true,\n  pagination: true,\n  pageSize: 10\n};",
            },
            {
              kind: 'list',
              items: [
                'Set frozen: true on the columns that must stay pinned.',
                'Always give frozen columns an explicit width so sticky offsets stay predictable.',
                'Add enough total column width to create real horizontal overflow inside the table area.',
                'Use showColumnSettings: true if you want users to pin or unpin columns from the Columns panel.',
              ],
            },
            {
              kind: 'callout',
              title: 'User pin and unpin support',
              text: 'The Columns panel now supports Pin and Unpin actions. Pinned columns show a Frozen badge and remain grouped on the left side of the grid.',
            },
            {
              kind: 'list',
              items: [
                'Open Playground -> Grid Playground.',
                'Choose the preset Frozen Columns + Horizontal Scroll.',
                'Scroll horizontally inside the grid table area.',
                'Verify ID and Name stay fixed while only unpinned columns move.',
                'Open Columns and try Pin or Unpin to verify the layout updates correctly.',
                'Repeat the same check in CUSTOM, MATERIAL, PRIMENG, and CANVAS modes.',
              ],
            },
          ],
        },
        {
          id: 'template-override',
          title: 'Template Override (Only When Config Is Not Enough)',
          blocks: [
            {
              kind: 'callout',
              title: 'Use this sparingly',
              text: 'First try built-in cell types. Use template override only for a very custom cell. The grid still renders from config; the template only overrides one field/cell.',
            },
            {
              kind: 'code',
              language: 'html',
              code: `<br-grid [config]="gridConfig" (action)="onGridAction($event)">
  <ng-template brGridCell="hrStatus" let-row let-value="value" let-column="column" let-meta="meta">
    <div class="custom-stage-cell">
      <select [ngModel]="value" (ngModelChange)="onStageDraftChange(row, $event)">
        <option>Applied</option>
        <option>First Interview</option>
        <option>Second Interview</option>
      </select>
      <br-button label="Update" variant="primary" size="sm" (buttonClick)="saveStage(row)"></br-button>
      <small *ngIf="meta?.message">{{ meta?.message }}</small>
    </div>
  </ng-template>
</br-grid>`,
            },
            {
              kind: 'text',
              text: 'In that template, `row` is the full row object, `value` is the current cell value, `column` is the column definition, and `meta` is the optional row/cell feedback state for that cell.',
            },
            {
              kind: 'grid-preview',
              preview: 'template',
            },
            {
              kind: 'callout',
              title: 'What you will see',
              text: 'The grid still renders normally, but the `hrStatus` cell uses your custom Angular template instead of the built-in cell renderer.',
            },
            {
              kind: 'callout',
              title: 'What event comes out',
              text: 'Anything inside the template is your consumer code. You can still call your own handlers there, and the surrounding grid continues to emit its normal standardized action events.',
            },
          ],
        },
        {
          id: 'consumer-example',
          title: 'Minimal Consumer Example',
          blocks: [
            {
              kind: 'code',
              language: 'html',
              code: `<br-grid [config]="gridConfig" (action)="onGridAction($event)"></br-grid>`,
            },
          ],
        },
        {
          id: 'production-notes',
          title: 'Production Notes',
          blocks: [
            {
              kind: 'list',
              items: [
                'Keep simple text columns simple. Do not add `type` unless the cell is richer than text.',
                'Treat emitted actions as user intent; map intent to consumer service/API/router calls.',
                'Use `rowMeta` for temporary UI feedback after inline actions.',
                'Keep server-side query logic outside the wrapper.',
                'Use template override only for specific cells, not as the default grid approach.',
              ],
            },
          ],
        },
      ],
    },
    {
      slug: 'br-modal',
      title: 'br-modal',
      summary: 'Modal container wrapper (action/close-driven).',
      group: 'containers',
      order: 2,
      sections: [
        {
          id: 'when-to-use',
          title: 'When to Use',
          blocks: [
            {
              kind: 'list',
              items: [
                'Confirm destructive actions.',
                'Show lightweight form in dialog context.',
                'Display user decisions as explicit modal actions.',
              ],
            },
          ],
        },
        {
          id: 'key-terms',
          title: 'Key Terms for br-modal',
          blocks: [
            {
              kind: 'table',
              columns: ['Term', 'Simple meaning'],
              rows: [
                ['config', 'Modal state/content/actions passed from consumer.'],
                ['action event', 'User action button decision from modal.'],
                ['close event', 'Signal that modal close was requested.'],
                ['isOpen', 'Controls whether modal is visible.'],
              ],
            },
          ],
        },
        {
          id: 'consumer-example',
          title: 'Consumer Example',
          blocks: [
            {
              kind: 'code',
              language: 'typescript',
              code: `import { BrModalActionEvent, BrModalConfig } from '@sriharshavarada/br-ui-wrapper';

modalConfig: BrModalConfig = {
  isOpen: true,
  title: 'Delete user',
  content: '<p>This action cannot be undone.</p>',
  actions: [
    { id: 'cancel', label: 'Cancel', type: 'secondary' },
    { id: 'confirm', label: 'Delete', type: 'danger' }
  ]
};

onModalAction(event: BrModalActionEvent): void {
  if (event.actionId === 'confirm') {
    // call delete API
  }
}

onModalClose(): void {
  this.modalConfig = { ...this.modalConfig, isOpen: false };
}`,
            },
            {
              kind: 'code',
              language: 'html',
              code: `<br-modal
  [config]="modalConfig"
  (action)="onModalAction($event)"
  (close)="onModalClose()">
</br-modal>`,
            },
          ],
        },
      ],
    },
  ];

  activeSlug = 'getting-started';

  get groupedPages(): Array<{ group: DocGroup; pages: NavPageNode[] }> {
    const term = this.navSearch.trim().toLowerCase();

    return this.groups
      .map((group) => this.buildNavGroup(group, term))
      .filter((entry) => entry.pages.length > 0);
  }

  get activePage(): DocPage {
    return this.pages.find((p) => p.slug === this.activeSlug) || this.pages[0];
  }

  get hasNavResults(): boolean {
    return this.groupedPages.some((entry) => entry.pages.length > 0);
  }

  selectPage(slug: string): void {
    this.activeSlug = slug;
    setTimeout(() => {
      const panel = document.querySelector('.doc-content') as HTMLElement | null;
      panel?.scrollTo({ top: 0, behavior: 'smooth' });
    }, 0);
  }

  sectionAnchor(sectionId: string): string {
    return `${this.activePage.slug}-${sectionId}`;
  }

  scrollToSection(sectionId: string): void {
    const target = document.getElementById(this.sectionAnchor(sectionId));
    target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  trackByPage(_: number, page: DocPage): string {
    return page.slug;
  }

  trackByNavNode(_: number, node: NavPageNode): string {
    return node.page.slug;
  }

  trackBySection(_: number, section: DocSection): string {
    return section.id;
  }

  clearNavSearch(): void {
    this.navSearch = '';
  }

  getDocGridConfig(preview: 'plain' | 'rich' | 'meta' | 'template'): BrGridConfig {
    switch (preview) {
      case 'plain':
        return this.cloneGridConfig(this.plainGridPreviewConfig);
      case 'rich':
        return this.cloneGridConfig(this.richGridPreviewConfig);
      case 'meta':
        return this.cloneGridConfig(this.metaGridPreviewConfig);
      default:
        return this.cloneGridConfig(this.templateGridPreviewConfig);
    }
  }

  onDocGridAction(preview: 'plain' | 'rich' | 'meta' | 'template', event: BrGridActionEvent): void {
    this.docGridEventText[preview] = `${event.source} -> ${event.actionId}${event.field ? ` (${event.field})` : ''}`;
  }

  onDocDateChange(value: string | Date | null): void {
    this.docDateValueText = value ? String(value) : 'No date selected.';
  }

  onDocButtonClick(_: MouseEvent): void {
    this.docButtonEventText = 'buttonClick emitted for docs-save-button';
  }

  onDocButtonControlEvent(event: any): void {
    this.docButtonEventText = `controlEvent -> ${JSON.stringify(event)}`;
  }

  onDocTemplateStageDraftChange(rowId: string, value: string): void {
    this.docTemplateDraftByRow = {
      ...this.docTemplateDraftByRow,
      [rowId]: value,
    };
  }

  saveDocTemplateStage(row: any): void {
    const rowId = String(row.id);
    const nextValue = this.docTemplateDraftByRow[rowId] || row.hrStatus;
    this.templateGridPreviewConfig.data = this.templateGridPreviewConfig.data.map((candidate) =>
      String(candidate.id) === rowId ? { ...candidate, hrStatus: nextValue } : candidate,
    );
    this.templateGridPreviewConfig.rowMeta = {
      ...(this.templateGridPreviewConfig.rowMeta || {}),
      [rowId]: {
        ...((this.templateGridPreviewConfig.rowMeta || {})[rowId] || {}),
        cells: {
          ...(((this.templateGridPreviewConfig.rowMeta || {})[rowId] || {}).cells || {}),
          hrStatus: {
            state: 'success',
            tone: 'success',
            message: `Template saved: ${nextValue}`,
          },
        },
      },
    };
    this.docGridEventText.template = `template-save -> hrStatus (${rowId})`;
  }

  private cloneGridConfig(config: BrGridConfig): BrGridConfig {
    return JSON.parse(JSON.stringify(config)) as BrGridConfig;
  }

  private controlPage(
    slug: string,
    label: string,
    valueType: string,
    hasLabel: boolean,
    hasPlaceholder: boolean,
    hasOptions: boolean,
    includeDateChange = false,
    isTextArea = false,
  ): DocPage {
    const inputRows = this.controlDirectInputsRows(slug, valueType);

    const outputRows: string[][] = [
      ['valueChange', `Emits typed value (${valueType}).`],
      ['blur', 'Focus leaves control.'],
      ['focus', 'Focus enters control.'],
      ['input', 'Native/implementation input signal.'],
      ['change', 'Committed change signal.'],
      ['keydown', 'Keyboard key down.'],
      ['keyup', 'Keyboard key up.'],
      ['click', 'Mouse click signal.'],
      ['controlEvent', 'Normalized event payload for generic handling.'],
    ];

    if (includeDateChange) {
      outputRows.splice(1, 0, ['dateChange', 'Date-specific normalized output.']);
    }

    const optionsSnippet = hasOptions ? "\n  [options]=\"options\"" : '';
    const placeholderSnippet = hasPlaceholder ? "\n  [placeholder]=\"'Enter value'\"" : '';
    const textAreaSnippet = isTextArea ? "\n  [rows]=\"4\"\n  [maxLength]=\"500\"" : '';
    const optionInitSnippet = hasOptions
      ? `\n  options = [\n    { label: 'Option A', value: 'a' },\n    { label: 'Option B', value: 'b' }\n  ];`
      : '';
    const textAreaInitSnippet = isTextArea ? `,\n    rows: 4,\n    maxLength: 500` : '';

    return {
      slug,
      title: slug,
      summary: `${label} wrapper API with production usage patterns.`,
      group: 'controls',
      order: this.controlOrder(slug),
      sections: [
        {
          id: 'preface',
          title: `Preface: Why ${slug}`,
          blocks: [
            {
              kind: 'text',
              text: `${slug} gives a stable consumer API for ${label} behavior while allowing implementation mode changes under the hood.`,
            },
            {
              kind: 'table',
              columns: ['Key term', 'Simple meaning'],
              rows: this.controlKeyTerms(hasOptions, includeDateChange, isTextArea),
            },
          ],
        },
        {
          id: 'when-to-use',
          title: 'When to Use',
          blocks: [
            {
              kind: 'list',
              items: [
                `Use ${slug} when you want consistent wrapper behavior across CUSTOM and MATERIAL modes.`,
                'Use config-based style for metadata-heavy screens and generated forms.',
                'Use direct inputs + ngModel for simple screens and rapid prototypes.',
              ],
            },
          ],
        },
        {
          id: 'import-and-setup',
          title: 'Import and Setup',
          blocks: [
            {
              kind: 'text',
              text: `Import ${this.controlComponentName(slug)} and ${this.controlConfigType(slug)} from \`@sriharshavarada/br-ui-wrapper\`. In a standalone Angular screen, add ${this.controlComponentName(slug)} to the component \`imports\` array.`,
            },
            {
              kind: 'code',
              language: 'typescript',
              code: `import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ${this.controlComponentName(slug)}, ${this.controlConfigType(slug)} } from '@sriharshavarada/br-ui-wrapper';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, ${this.controlComponentName(slug)}],
  templateUrl: './your-screen.component.html',
})
export class YourScreenComponent {
  ${this.controlConfigVar(slug)}: ${this.controlConfigType(slug)} = {
    id: 'sample-${slug}',
    label: '${label}',
    value: ${this.defaultValueForType(valueType)}${textAreaInitSnippet}${optionInitSnippet}
  };
}`,
            },
          ],
        },
        {
          id: 'quick-start-config-style',
          title: 'Quick Start: Config Style',
          blocks: [
            {
              kind: 'code',
              language: 'typescript',
              code: `config = {
  id: 'sample-${slug}',
  name: 'sampleControl',
  className: 'profile-field',
  meta: { source: 'docs' },
  label: '${label}',
  value: ${this.defaultValueForType(valueType)}${textAreaInitSnippet}${optionInitSnippet}
};`,
            },
            {
              kind: 'code',
              language: 'html',
              code: `<${slug}
  [config]="config"
  (valueChange)="onValueChange($event)"
  (controlEvent)="onControlEvent($event)">
</${slug}>`,
            },
          ],
        },
        {
          id: 'quick-start-no-config',
          title: 'Quick Start: Direct Inputs + ngModel',
          blocks: [
            {
              kind: 'code',
              language: 'typescript',
              code: `value: ${valueType} = ${this.defaultValueForType(valueType)};${optionInitSnippet}`,
            },
            {
              kind: 'code',
              language: 'html',
              code: `<${slug}
  [id]="'sample-${slug}'"
  [name]="'sampleControl'"
  [className]="'profile-field'"
  [label]="'${label}'"${placeholderSnippet}${textAreaSnippet}${optionsSnippet}
  [(ngModel)]="value"
  (controlEvent)="onControlEvent($event)">
</${slug}>`,
            },
          ],
        },
        {
          id: 'reactive-forms-example',
          title: 'Reactive Forms Example',
          blocks: [
            {
              kind: 'code',
              language: 'typescript',
              code: `form = this.fb.group({
  sample: [${this.defaultValueForType(valueType)}]
});`,
            },
            {
              kind: 'code',
              language: 'html',
              code: `<form [formGroup]="form">
  <${slug} formControlName="sample"${textAreaSnippet}${optionsSnippet}></${slug}>
</form>`,
            },
          ],
        },
        {
          id: 'inputs',
          title: 'Inputs',
          blocks: [{ kind: 'table', columns: ['Input', 'Meaning'], rows: inputRows }],
        },
        {
          id: 'outputs',
          title: 'Outputs',
          blocks: [{ kind: 'table', columns: ['Output', 'Meaning'], rows: outputRows }],
        },
        {
          id: 'production-guidance',
          title: 'Production Guidance',
          blocks: [
            {
              kind: 'list',
              items: [
                'Prefer stable `id` and `name` values so registry lookups stay deterministic.',
                'Use `controlEvent` for standardized telemetry and keep event-specific handlers for user UX only.',
                'If using both config and direct inputs, direct inputs are intended as explicit overrides; keep this consistent in team conventions.',
              ],
            },
          ],
        },
      ],
    };
  }

  private buttonPage(): DocPage {
    return {
      slug: 'br-button',
      title: 'br-button',
      summary: 'Button wrapper with consistent variants across CUSTOM, MATERIAL, and PRIMENG modes.',
      group: 'controls',
      order: this.controlOrder('br-button'),
      sections: [
        {
          id: 'preface',
          title: 'Preface: Why br-button',
          blocks: [
            {
              kind: 'text',
              text: 'Use br-button when you want one stable button API while allowing runtime mode changes under the hood.',
            },
            {
              kind: 'table',
              columns: ['Key term', 'Simple meaning'],
              rows: [
                ['variant', 'Visual intent such as primary, secondary, outline, danger, text, or icon.'],
                ['size', 'Button size: sm, md, lg.'],
                ['buttonClick', 'Primary click output from the wrapper.'],
                ['controlEvent', 'Normalized wrapper event payload for logging or generic handlers.'],
                ['ariaLabel', 'Recommended label for icon-only buttons.'],
              ],
            },
          ],
        },
        {
          id: 'import-and-setup',
          title: 'Import and Setup',
          blocks: [
            {
              kind: 'code',
              language: 'typescript',
              code: `import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BrButtonComponent, BrButtonConfig } from '@sriharshavarada/br-ui-wrapper';

@Component({
  standalone: true,
  imports: [CommonModule, BrButtonComponent],
  templateUrl: './your-screen.component.html',
})
export class YourScreenComponent {
  buttonConfig: BrButtonConfig = {
    id: 'save-button',
    label: 'Save Changes',
    variant: 'primary',
    size: 'md',
    type: 'button'
  };

  onButtonClick(event: MouseEvent): void {
    console.log('button-click', event);
  }

  onButtonControlEvent(event: unknown): void {
    console.log('button-control-event', event);
  }
}`,
            },
          ],
        },
        {
          id: 'quick-start-config-style',
          title: 'Quick Start: Config Style',
          blocks: [
            {
              kind: 'code',
              language: 'typescript',
              code: `buttonConfig: BrButtonConfig = {
  id: 'save-button',
  label: 'Save Changes',
  variant: 'primary',
  size: 'md',
  type: 'button',
  leftIcon: '↓',
  rightIcon: '→'
};`,
            },
            {
              kind: 'code',
              language: 'html',
              code: `<br-button
  [config]="buttonConfig"
  (buttonClick)="onButtonClick($event)"
  (controlEvent)="onButtonControlEvent($event)">
</br-button>`,
            },
          ],
        },
        {
          id: 'direct-input-style',
          title: 'Quick Start: Direct Inputs',
          blocks: [
            {
              kind: 'code',
              language: 'html',
              code: `<br-button
  [id]="'save-button'"
  [label]="'Save Changes'"
  [variant]="'primary'"
  [size]="'md'"
  [type]="'button'"
  [leftIcon]="'↓'"
  [rightIcon]="'→'"
  (buttonClick)="onButtonClick($event)"
  (controlEvent)="onButtonControlEvent($event)">
</br-button>`,
            },
          ],
        },
        {
          id: 'variants-and-sizes',
          title: 'Variants and Sizes',
          blocks: [
            {
              kind: 'table',
              columns: ['Property', 'Supported values'],
              rows: [
                ['variant', 'primary, secondary, outline, danger, text, icon'],
                ['size', 'sm, md, lg'],
                ['type', 'button, submit, reset'],
              ],
            },
          ],
        },
        {
          id: 'inputs',
          title: 'Supported Direct Inputs',
          blocks: [
            {
              kind: 'table',
              columns: ['Input', 'Meaning'],
              rows: [
                ['config', 'Typed config object for config-based usage.'],
                ['id', 'Button id for DOM identity and registry lookup.'],
                ['controlId', 'Legacy alias for id.'],
                ['name', 'Grouping name for registry lookups.'],
                ['className', 'CSS class string applied through the wrapper.'],
                ['meta', 'Consumer payload forwarded in controlEvent.'],
                ['label', 'Visible button label.'],
                ['variant', 'Visual intent: primary, secondary, outline, danger, text, icon.'],
                ['size', 'Button size: sm, md, lg.'],
                ['type', 'Native button type: button, submit, reset.'],
                ['disabled', 'Prevents clicks and interaction.'],
                ['loading', 'Shows loading state and disables action.'],
                ['fullWidth', 'Expands button to full container width.'],
                ['leftIcon', 'Leading icon text/symbol.'],
                ['rightIcon', 'Trailing icon text/symbol.'],
                ['ariaLabel', 'Accessibility label, especially for icon-only buttons.'],
              ],
            },
          ],
        },
        {
          id: 'outputs',
          title: 'Outputs',
          blocks: [
            {
              kind: 'table',
              columns: ['Output', 'Meaning'],
              rows: [
                ['buttonClick', 'Primary click output from the button wrapper.'],
                ['controlEvent', 'Standardized wrapper event payload.'],
              ],
            },
          ],
        },
        {
          id: 'accessibility-note',
          title: 'Accessibility Note',
          blocks: [
            {
              kind: 'callout',
              title: 'Icon-only buttons',
              text: 'If you use variant `icon` or leave the visible label empty, provide `ariaLabel` so the button is still understandable to assistive technologies.',
            },
          ],
        },
        {
          id: 'live-preview',
          title: 'Live Preview',
          blocks: [
            {
              kind: 'button-preview',
            },
          ],
        },
      ],
    };
  }

  private runtimeBrandingPage(): DocPage {
    return {
      slug: 'runtime-branding',
      title: 'runtime branding',
      summary: 'App-level branding, light/dark mode, and team adapter flow for the library.',
      group: 'runtime',
      order: 0.9,
      sections: [
        {
          id: 'overview',
          title: 'Overview',
          blocks: [
            {
              kind: 'text',
              text: 'Branding is a runtime library concern, not a per-control config. You set branding once through BrandingRuntimeService, and branded controls such as text, text area, grid, modal, and future controls read that runtime state automatically.',
            },
            {
              kind: 'callout',
              title: 'Recommended flow',
              text: 'Raw team branding -> optional library adapter -> BrBrandingConfig -> BrandingRuntimeService.setBranding(...) -> BrandingRuntimeService.setMode(light/dark).',
            },
            {
              kind: 'callout',
              title: 'Important scope',
              text: 'Do not pass branding through individual control config objects. Branding and light/dark mode are app-level runtime settings.',
            },
          ],
        },
        {
          id: 'imports',
          title: 'Imports You Need',
          blocks: [
            {
              kind: 'code',
              language: 'typescript',
              code: `import {
  BrandingRuntimeService,
  EnterpriseBrandingAdapter,
  EnterpriseBrandingPayload,
  TalentGatewayBrandingAdapter,
  TalentGatewayBrandingPayload,
  BrBrandingConfig,
  BrBrandingMode
} from '@sriharshavarada/br-ui-wrapper';`,
            },
          ],
        },
        {
          id: 'enterprise-example',
          title: 'Enterprise Branding Example',
          blocks: [
            {
              kind: 'code',
              language: 'typescript',
              code: `enterpriseBranding: EnterpriseBrandingPayload = {
  baseFontColor: '#1f2937',
  baseFontSize: '14px',
  titleFontColor: '#0f172a',
  fontFamily: 'Tahoma',
  primaryButtonColor: '#0f62fe',
  primaryButtonHoverColor: '#0b4acc',
  secondaryButtonColor: '#393939',
  secondaryButtonHoverColor: '#4c4c4c',
  primaryButtonTextColor: '#ffffff',
  secondaryButtonTextColor: '#ffffff',
  linkColor: '#0f62fe',
  labelFontColor: '#334155',
  foreGroundColor: '#008571',
  backgroundColor: '#ffffff',
  sectionBackgroundColor: '#f0f2f4'
};

brandingMode: BrBrandingMode = 'light';

constructor(private readonly brandingRuntimeService: BrandingRuntimeService) {}

applyEnterpriseBranding(): void {
  this.brandingRuntimeService.setBranding(
    EnterpriseBrandingAdapter.toBrBrandingConfig(this.enterpriseBranding)
  );
  this.brandingRuntimeService.setMode(this.brandingMode);
}`,
            },
            {
              kind: 'callout',
              title: 'What you will see',
              text: 'Branded controls switch to the Enterprise palette without changing individual control configs.',
            },
          ],
        },
        {
          id: 'talent-gateway-example',
          title: 'Talent Gateway Branding Example',
          blocks: [
            {
              kind: 'code',
              language: 'typescript',
              code: `talentGatewayBranding: TalentGatewayBrandingPayload = {
  Responsive_BackgroundColor: '#ffffff',
  Responsive_BackgroundImage: 'https://sstagingjobs.brassring.com/img/26679/Thompson-External-careersite.png',
  Responsive_BaseFontColor: '#000000',
  Responsive_BaseFontFamily: "'Lato',sans-serif",
  Responsive_BaseFontSize: '16px',
  Responsive_ButtonBackgroundColor: '#FDBF77'
};

applyTalentGatewayBranding(): void {
  this.brandingRuntimeService.setBranding(
    TalentGatewayBrandingAdapter.toBrBrandingConfig(this.talentGatewayBranding)
  );
  this.brandingRuntimeService.setMode(this.brandingMode);
}`,
            },
          ],
        },
        {
          id: 'direct-library-branding',
          title: 'Direct Library Branding',
          blocks: [
            {
              kind: 'code',
              language: 'typescript',
              code: `libraryBranding: BrBrandingConfig = {
  fontFamily: 'Lato, sans-serif',
  light: {
    baseFontColor: '#111827',
    labelFontColor: '#334155',
    focusColor: '#2563eb',
    primaryButtonColor: '#2563eb',
    primaryButtonTextColor: '#ffffff'
  },
  dark: {
    baseFontColor: '#f8fafc',
    labelFontColor: '#cbd5e1',
    focusColor: '#5eead4',
    primaryButtonColor: '#0f766e',
    primaryButtonTextColor: '#ffffff'
  }
};

applyLibraryBranding(): void {
  this.brandingRuntimeService.setBranding(this.libraryBranding);
  this.brandingRuntimeService.setMode(this.brandingMode);
}`,
            },
          ],
        },
        {
          id: 'consumer-usage',
          title: 'Recommended Consumer Usage',
          blocks: [
            {
              kind: 'code',
              language: 'typescript',
              code: `constructor(private readonly brandingRuntimeService: BrandingRuntimeService) {}

ngOnInit(): void {
  this.brandingRuntimeService.setBranding(
    EnterpriseBrandingAdapter.toBrBrandingConfig(this.enterpriseBranding)
  );
  this.brandingRuntimeService.setMode('light');
}`,
            },
            {
              kind: 'callout',
              title: 'Typical real usage',
              text: 'Apply branding when the page, shell, or app initializes. This is the normal production path. End users should not usually click buttons to switch branding sources.',
            },
            {
              kind: 'code',
              language: 'html',
              code: `<!-- Demo-only pattern for docs or playground -->
<br-button label="Enterprise" variant="secondary" size="sm" (buttonClick)="applyEnterpriseBranding()"></br-button>
<br-button label="Talent Gateway" variant="secondary" size="sm" (buttonClick)="applyTalentGatewayBranding()"></br-button>
<br-button label="Library Branding" variant="secondary" size="sm" (buttonClick)="applyLibraryBranding()"></br-button>
<br-button label="Light" variant="secondary" size="sm" (buttonClick)="brandingRuntimeService.setMode('light')"></br-button>
<br-button label="Dark" variant="secondary" size="sm" (buttonClick)="brandingRuntimeService.setMode('dark')"></br-button>`,
            },
          ],
        },
        {
          id: 'notes',
          title: 'Important Notes',
          blocks: [
            {
              kind: 'list',
              items: [
                'If no branding is provided, library defaults are used.',
                'Team adapters map only what the team payload actually means. Missing values fall back to normalized library defaults.',
                'Use direct library branding only when you already have or want to build the normalized BrBrandingConfig yourself.',
              ],
            },
          ],
        },
      ],
    };
  }

  private controlOrder(slug: string): number {
    const ordered = [
      'br-text',
      'br-text-area',
      'br-date',
      'br-single-select',
      'br-multi-select',
      'br-checkbox',
      'br-radio',
      'br-autocomplete',
    ];
    return ordered.indexOf(slug) + 1;
  }

  private controlDirectInputsRows(slug: string, valueType: string): string[][] {
    const shared: string[][] = [
      ['config', 'Typed config object for config-based usage.'],
      ['id', 'Control id used for DOM identity and registry lookup.'],
      ['controlId', 'Legacy alias for id.'],
      ['name', 'Grouping name used by registry valuesByName.'],
      ['className', 'CSS class string passed through the wrapper.'],
      ['disabled', 'Disables the control.'],
      ['required', 'Marks the control required.'],
      ['label', 'Display label.'],
      ['meta', 'Consumer-defined payload forwarded in controlEvent.'],
      ['showLibraryTag', 'Optional demo/migration badge flag.'],
    ];

    const bySlug: Record<string, string[][]> = {
      'br-text': [
        ['value', `Direct value input (${valueType}).`],
        ['placeholder', 'Placeholder text.'],
      ],
      'br-text-area': [
        ['value', `Direct value input (${valueType}).`],
        ['placeholder', 'Placeholder text.'],
        ['rows', 'Visible row count for the textarea.'],
        ['maxLength', 'Optional maximum character length.'],
      ],
      'br-date': [
        ['value', 'Direct value input (`string | Date | null`).'],
        ['placeholder', 'Placeholder text.'],
      ],
      'br-single-select': [
        ['value', `Direct value input (${valueType}).`],
        ['options', 'Selectable options list.'],
      ],
      'br-multi-select': [
        ['value', `Direct value input (${valueType}).`],
        ['options', 'Selectable options list.'],
      ],
      'br-checkbox': [
        ['value', `Direct value input (${valueType}).`],
      ],
      'br-radio': [
        ['value', `Direct value input (${valueType}).`],
        ['options', 'Selectable options list.'],
      ],
      'br-autocomplete': [
        ['value', `Direct value input (${valueType}).`],
        ['placeholder', 'Placeholder text.'],
        ['options', 'Selectable options list.'],
      ],
    };

    return [...shared.slice(0, 5), ...(bySlug[slug] || []), ...shared.slice(5)];
  }

  private controlKeyTerms(hasOptions: boolean, includeDateChange: boolean, isTextArea = false): string[][] {
    const rows: string[][] = [
      ['config', 'Single object configuration style.'],
      ['valueChange', 'Primary output when control value changes.'],
      ['controlEvent', 'Normalized event payload for analytics/generic handlers.'],
      ['meta', 'Consumer-defined context object forwarded in events.'],
      ['controlId', 'Alias for id to support legacy payloads.'],
    ];
    if (hasOptions) {
      rows.push(['options', 'Selectable values used by the control.']);
    }
    if (isTextArea) {
      rows.push(['rows', 'Visible line count for the textarea.']);
      rows.push(['maxLength', 'Optional maximum allowed characters.']);
    }
    if (includeDateChange) {
      rows.push(['dateChange', 'Date-specific output emitted by br-date.']);
      rows.push(['DateConfiguration', 'Advanced date rules node (bounds, weekdays, include today, etc.).']);
    }
    return rows;
  }

  private defaultValueForType(type: string): string {
    if (type.includes('any[]')) return '[]';
    if (type.includes('boolean')) return 'false';
    if (type.includes('Date')) return "''";
    if (type.includes('string')) return "''";
    return 'null';
  }

  private controlComponentName(slug: string): string {
    const map: Record<string, string> = {
      'br-text': 'BrTextComponent',
      'br-text-area': 'BrTextAreaComponent',
      'br-date': 'BrDateComponent',
      'br-single-select': 'BrSingleSelectComponent',
      'br-multi-select': 'BrMultiSelectComponent',
      'br-checkbox': 'BrCheckboxComponent',
      'br-radio': 'BrRadioComponent',
      'br-autocomplete': 'BrAutocompleteComponent',
    };
    return map[slug] || 'UnknownComponent';
  }

  private controlConfigType(slug: string): string {
    const map: Record<string, string> = {
      'br-text': 'BrTextConfig',
      'br-text-area': 'BrTextAreaConfig',
      'br-date': 'BrDateConfig',
      'br-single-select': 'BrSingleSelectConfig',
      'br-multi-select': 'BrMultiSelectConfig',
      'br-checkbox': 'BrCheckboxConfig',
      'br-radio': 'BrRadioConfig',
      'br-autocomplete': 'BrAutocompleteConfig',
    };
    return map[slug] || 'unknown';
  }

  private controlConfigVar(slug: string): string {
    const map: Record<string, string> = {
      'br-text': 'textConfig',
      'br-text-area': 'textAreaConfig',
      'br-date': 'dateConfig',
      'br-single-select': 'singleSelectConfig',
      'br-multi-select': 'multiSelectConfig',
      'br-checkbox': 'checkboxConfig',
      'br-radio': 'radioConfig',
      'br-autocomplete': 'autocompleteConfig',
    };
    return map[slug] || 'config';
  }

  private matchesSearch(page: DocPage, term: string): boolean {
    if (!term) return true;
    if (page.title.toLowerCase().includes(term)) return true;
    if (page.slug.toLowerCase().includes(term)) return true;
    if (page.summary.toLowerCase().includes(term)) return true;
    return page.sections.some((section) => section.title.toLowerCase().includes(term));
  }

  private buildNavGroup(group: DocGroup, term: string): { group: DocGroup; pages: NavPageNode[] } {
    const inGroup = this.pages.filter((page) => page.group === group.id);
    const topLevel = inGroup.filter((page) => !page.parentSlug).sort((a, b) => a.order - b.order);

    const nodes: NavPageNode[] = [];
    for (const parent of topLevel) {
      const children = inGroup
        .filter((page) => page.parentSlug === parent.slug)
        .sort((a, b) => a.order - b.order);

      const matchingChildren = children.filter((child) => this.matchesSearch(child, term));
      const parentMatch = this.matchesSearch(parent, term);

      if (!term || parentMatch || matchingChildren.length > 0) {
        nodes.push({
          page: parent,
          children: term ? matchingChildren : children,
        });
      }
    }

    return { group, pages: nodes };
  }
}

