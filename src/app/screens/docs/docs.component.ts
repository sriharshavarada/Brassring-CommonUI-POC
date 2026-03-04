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
              text: 'Import only from `../../common`. Do not import adapters or implementation components directly.',
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
import { BrTextComponent, BrTextConfig } from '../../common';

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
              code: `gridConfig: BrGridConfig = {
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
              code: `modalConfig: BrModalConfig = {
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
    const optionInitSnippet = hasOptions
      ? `\n  options = [\n    { label: 'Option A', value: 'a' },\n    { label: 'Option B', value: 'b' }\n  ];`
      : '';

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
              rows: this.controlKeyTerms(hasOptions, includeDateChange),
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
  value: ${this.defaultValueForType(valueType)}${optionInitSnippet}
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
  [label]="'${label}'"${placeholderSnippet}${optionsSnippet}
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
  <${slug} formControlName="sample"${optionsSnippet}></${slug}>
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

  private controlOrder(slug: string): number {
    const ordered = [
      'br-text',
      'br-date',
      'br-single-select',
      'br-multi-select',
      'br-checkbox',
      'br-radio',
      'br-autocomplete',
    ];
    return ordered.indexOf(slug) + 1;
  }

  private controlKeyTerms(hasOptions: boolean, includeDateChange: boolean): string[][] {
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
