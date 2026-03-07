import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

type DocGroupId = 'overview' | 'forms' | 'controls' | 'containers';

type DocBlock =
  | { kind: 'text'; text: string }
  | { kind: 'list'; items: string[] }
  | { kind: 'code'; language: 'html' | 'typescript' | 'json'; code: string }
  | { kind: 'table'; columns: string[]; rows: string[][] }
  | { kind: 'callout'; title: string; text: string };

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
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './docs.component.html',
  styleUrls: ['./docs.component.scss'],
})
export class DocsComponent {
  readonly repoPath = '/Users/sriharshavinfinite.com/Desktop/CommonUIForBRPOC/docs';
  navSearch = '';

  readonly groups: DocGroup[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'forms', label: 'Forms and Events' },
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
    this.controlPage('br-text', 'Text Box', 'string', true, true, false),
    this.brandingReferencePage('br-text', 'Text Box', false, 1.1),
    this.controlPage('br-text-area', 'Text Area', 'string', true, true, false, false, true),
    this.brandingReferencePage('br-text-area', 'Text Area', true, 1.2),
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
      summary: 'Grid container wrapper (action-driven).',
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
                ['selection action', 'Action on selected rows.'],
                ['toolbar action', 'Action triggered from top controls (search/sort/filter/etc.).'],
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
              code: `import { BrGridActionEvent, BrGridConfig } from '@sriharshavarada/br-ui-wrapper';

gridConfig: BrGridConfig = {
  title: 'Users',
  columns: [
    { field: 'id', header: 'ID' },
    { field: 'name', header: 'Name' }
  ],
  data: [{ id: 1, name: 'Alex' }],
  pagination: true,
  pageSize: 10
};

onGridAction(event: BrGridActionEvent): void {
  console.log(event.source, event.actionId, event.selectedRows);
}`,
            },
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
                'Treat emitted actions as user intent; map intent to screen service calls.',
                'Keep server-side query/pagination/filter logic outside wrapper.',
                'Use one canonical config builder per screen for maintainability.',
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
    const inputRows: string[][] = [
      ['config', 'Typed config object for config-based usage.'],
      ['id', 'Control id (used for registry + DOM identity).'],
      ['controlId', 'Alias for id (normalized internally).'],
      ['name', 'Grouping name (used by registry valuesByName).'],
      ['className', 'CSS class + registry class grouping.'],
      ['value', `Direct value input (${valueType}) for no-config usage.`],
      ['disabled', 'Disables the control.'],
      ['required', 'Marks control required.'],
      ['meta', 'Arbitrary payload forwarded in controlEvent.'],
    ];

    if (hasLabel) inputRows.splice(8, 0, ['label', 'Display label.']);
    if (hasPlaceholder) inputRows.splice(9, 0, ['placeholder', 'Placeholder text.']);
    if (isTextArea) {
      inputRows.splice(10, 0, ['rows', 'Visible row count for the textarea.']);
      inputRows.splice(11, 0, ['maxLength', 'Optional maximum character length.']);
    }
    if (hasOptions) inputRows.splice(9, 0, ['options', 'Selectable options list.']);

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
          title: 'Quick Start: No Config (ngModel)',
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

  private brandingReferencePage(parentSlug: 'br-text' | 'br-text-area', label: string, isTextArea: boolean, order: number): DocPage {
    const wrapper = parentSlug === 'br-text' ? 'BrTextComponent' : 'BrTextAreaComponent';
    const configType = parentSlug === 'br-text' ? 'BrTextConfig' : 'BrTextAreaConfig';
    const controlTag = parentSlug;
    const textAreaConfig = isTextArea ? `\n  rows: 5,\n  maxLength: 500,` : '';
    const textAreaInputs = isTextArea ? `\n  [rows]="5"\n  [maxLength]="500"` : '';

    return {
      slug: `${parentSlug}-branding-reference`,
      title: `${parentSlug} branding reference`,
      summary: `${label} branding integration using Enterprise or Talent Gateway adapters and the runtime branding service.`,
      group: 'controls',
      order,
      parentSlug,
      sections: [
        {
          id: 'overview',
          title: 'Overview',
          blocks: [
            {
              kind: 'text',
              text: `${parentSlug} supports runtime branding through @sriharshavarada/br-ui-wrapper. Consumers normalize team-specific branding payloads through an adapter, then set the result on BrandingRuntimeService.`,
            },
            {
              kind: 'callout',
              title: 'Recommended flow',
              text: 'Raw team branding -> library adapter -> BrBrandingConfig -> BrandingRuntimeService.setBranding(...) -> setMode(light/dark).',
            },
            {
              kind: 'callout',
              title: 'Important scope',
              text: 'Branding and light/dark mode are not passed through individual control configs. They are app-level runtime settings. Once you update BrandingRuntimeService, all branded controls in the current runtime instance use the latest values.',
            },
          ],
        },
        {
          id: 'api-pieces',
          title: 'Imports You Need',
          blocks: [
            {
              kind: 'code',
              language: 'typescript',
              code: `import {
  ${wrapper},
  ${configType},
  BrandingRuntimeService,
  EnterpriseBrandingAdapter,
  EnterpriseBrandingPayload,
  TalentGatewayBrandingAdapter,
  TalentGatewayBrandingPayload,
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
              code: `${parentSlug === 'br-text' ? 'textConfig' : 'textAreaConfig'}: ${configType} = {
  id: 'branding-demo',
  label: '${label}',
  value: ''${textAreaConfig}
};

enterpriseBranding: EnterpriseBrandingPayload = {
  baseFontColor: '#f4f4f4',
  baseFontSize: '14px',
  titleFontColor: '#f4f4f4',
  fontFamily: 'Tahoma',
  primaryButtonColor: '#0f62fe',
  primaryButtonHoverColor: '#393939',
  secondaryButtonColor: '#393939',
  secondaryButtonHoverColor: '#4c4c4c',
  primaryButtonTextColor: '#fff',
  secondaryButtonTextColor: '#fff',
  linkColor: '#f4f4f4',
  labelFontColor: '#f4f4f4',
  foreGroundColor: '#008571',
  backgroundColor: '#fff',
  sectionBackgroundColor: '#f0f2f4'
};

brandingMode: BrBrandingMode = 'light';

constructor(private readonly brandingRuntimeService: BrandingRuntimeService) {}

applyEnterpriseBranding(): void {
  this.brandingRuntimeService.setBranding(
    EnterpriseBrandingAdapter.toBrBrandingConfig(this.enterpriseBranding)
  );
  this.brandingRuntimeService.setMode(this.brandingMode);
}

onValueChange(value: string): void {
  ${parentSlug === 'br-text' ? 'this.textConfig' : 'this.textAreaConfig'} = {
    ...${parentSlug === 'br-text' ? 'this.textConfig' : 'this.textAreaConfig'},
    value,
  };
}`,
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
              code: `${parentSlug === 'br-text' ? 'textConfig' : 'textAreaConfig'}: ${configType} = {
  id: 'branding-demo',
  label: '${label}',
  value: ''${textAreaConfig}
};

talentGatewayBranding: TalentGatewayBrandingPayload = {
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
}

setBrandingMode(mode: BrBrandingMode): void {
  this.brandingMode = mode;
  this.brandingRuntimeService.setMode(mode);
}

onValueChange(value: string): void {
  ${parentSlug === 'br-text' ? 'this.textConfig' : 'this.textAreaConfig'} = {
    ...${parentSlug === 'br-text' ? 'this.textConfig' : 'this.textAreaConfig'},
    value,
  };
}`,
            },
          ],
        },
        {
          id: 'consumer-usage',
          title: 'Consumer Usage',
          blocks: [
            {
              kind: 'code',
              language: 'html',
              code: `<${controlTag}
  [config]="${parentSlug === 'br-text' ? 'textConfig' : 'textAreaConfig'}"${textAreaInputs}
  (valueChange)="onValueChange($event)">
</${controlTag}>

<button type="button" (click)="applyEnterpriseBranding()">Enterprise</button>
<button type="button" (click)="applyTalentGatewayBranding()">Talent Gateway</button>
<button type="button" (click)="setBrandingMode('light')">Light</button>
<button type="button" (click)="setBrandingMode('dark')">Dark</button>`,
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
                'Light mode respects team branding more directly; dark mode uses the normalized dark palette path in the runtime service.',
                'Current branded consumers in the library are br-text and br-text-area.',
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
