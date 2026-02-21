import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import {
  BrDateComponent,
  BrDateConfig,
  BrGridActionEvent,
  BrGridComponent,
  BrGridConfig,
  BrModalActionEvent,
  BrModalComponent,
  BrModalConfig,
  DateUiMode,
  ModalUiMode,
  RuntimeUiConfigService,
  UiMode,
} from '../../common';
import { JsonWorkbenchComponent } from './components/json-workbench/json-workbench.component';
import { CodeEditorComponent, CodeLanguage } from './components/code-editor/code-editor.component';

type PlaygroundTab = 'grid' | 'date' | 'modal';
type CodeFile = 'ts' | 'html' | 'scss';

type GridPreset = 'complex' | 'moderate' | 'simple';
type DatePreset = 'default' | 'compact' | 'disabled';
type ModalPreset = 'custom' | 'info' | 'confirm' | 'delete' | 'form';

interface DemoCodeState {
  ts: string;
  html: string;
  scss: string;
  appliedScss: string;
  activeFile: CodeFile;
  collapsed: boolean;
  htmlBefore: string;
  htmlAfter: string;
}

@Component({
  selector: 'app-playground',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, BrGridComponent, BrDateComponent, BrModalComponent, JsonWorkbenchComponent, CodeEditorComponent],
  templateUrl: './playground.component.html',
  styleUrls: ['./playground.component.scss'],
})
export class PlaygroundComponent {
  activeTab: PlaygroundTab = 'grid';

  readonly gridModes: UiMode[] = ['CUSTOM', 'MATERIAL', 'CANVAS'];
  readonly dateModes: DateUiMode[] = ['CUSTOM', 'MATERIAL'];
  readonly modalModes: ModalUiMode[] = ['CUSTOM', 'MATERIAL'];

  readonly gridPresetLabels: Record<GridPreset, string> = {
    complex: 'Complex Grid',
    moderate: 'Moderate Grid',
    simple: 'Simple Grid',
  };

  readonly datePresetLabels: Record<DatePreset, string> = {
    default: 'Default Date',
    compact: 'Compact Date',
    disabled: 'Disabled Date',
  };

  readonly modalPresetLabels: Record<ModalPreset, string> = {
    custom: 'Editable JSON Modal',
    info: 'Info Modal',
    confirm: 'Confirm Modal',
    delete: 'Delete Modal',
    form: 'Form Modal',
  };

  readonly codeFiles: CodeFile[] = ['ts', 'html', 'scss'];

  activeGridPreset: GridPreset = 'complex';
  activeDatePreset: DatePreset = 'default';
  activeModalPreset: ModalPreset = 'custom';

  gridConfigCollapsed = false;
  dateConfigCollapsed = false;
  modalConfigCollapsed = false;

  gridConfig: BrGridConfig = this.complexGridConfig();
  dateConfig: BrDateConfig = this.defaultDateConfig();
  modalConfig: BrModalConfig = this.defaultModalConfig();

  gridCode: DemoCodeState = this.createEmptyCodeState();
  dateCode: DemoCodeState = this.createEmptyCodeState();
  modalCode: DemoCodeState = this.createEmptyCodeState();

  codeError = {
    grid: '',
    date: '',
    modal: '',
  };

  eventLog: string[] = [];

  constructor(public readonly runtimeUiConfig: RuntimeUiConfigService) {
    this.resetGridCodeFromConfig();
    this.resetDateCodeFromConfig();
    this.resetModalCodeFromConfig();
  }

  get modes() {
    return this.runtimeUiConfig.getModesSnapshot();
  }

  get gridPresets(): GridPreset[] {
    return ['complex', 'moderate', 'simple'];
  }

  get datePresets(): DatePreset[] {
    return ['default', 'compact', 'disabled'];
  }

  get modalPresets(): ModalPreset[] {
    return ['custom', 'info', 'confirm', 'delete', 'form'];
  }

  setGridMode(mode: UiMode): void {
    this.runtimeUiConfig.setMode('grid', mode);
    this.pushLog(`Grid mode changed to ${mode}`);
  }

  setDateMode(mode: DateUiMode): void {
    this.runtimeUiConfig.setMode('date', mode);
    this.pushLog(`Date mode changed to ${mode}`);
  }

  setModalMode(mode: ModalUiMode): void {
    this.runtimeUiConfig.setMode('modal', mode);
    this.pushLog(`Modal mode changed to ${mode}`);
  }

  resetModes(): void {
    this.runtimeUiConfig.resetToDefaults();
    this.pushLog('Modes reset to defaults from ui-mode.config.ts');
  }

  selectGridPreset(preset: GridPreset): void {
    this.activeGridPreset = preset;
    if (preset === 'simple') {
      this.gridConfig = this.clone(this.simpleGridConfig());
    } else if (preset === 'moderate') {
      this.gridConfig = this.clone(this.moderateGridConfig());
    } else {
      this.gridConfig = this.clone(this.complexGridConfig());
    }
    this.resetGridCodeFromConfig();
    this.pushLog(`Loaded ${this.gridPresetLabels[preset]}`);
  }

  selectDatePreset(preset: DatePreset): void {
    this.activeDatePreset = preset;
    if (preset === 'compact') {
      this.dateConfig = this.clone(this.compactDateConfig());
    } else if (preset === 'disabled') {
      this.dateConfig = this.clone(this.disabledDateConfig());
    } else {
      this.dateConfig = this.clone(this.defaultDateConfig());
    }
    this.resetDateCodeFromConfig();
    this.pushLog(`Loaded ${this.datePresetLabels[preset]}`);
  }

  selectModalPreset(preset: ModalPreset): void {
    this.activeModalPreset = preset;

    if (preset === 'custom') {
      this.modalConfig = this.clone(this.defaultModalConfig());
      this.resetModalCodeFromConfig();
      this.pushLog('Loaded editable JSON modal');
      return;
    }

    const presetConfig = this.modalPresetConfig(preset);
    this.modalConfig = { ...this.clone(presetConfig), isOpen: true };
    this.resetModalCodeFromConfig();
    this.pushLog(`Opened ${this.modalPresetLabels[preset]}`);
  }

  toggleConfigPanel(tab: PlaygroundTab): void {
    if (tab === 'grid') {
      this.gridConfigCollapsed = !this.gridConfigCollapsed;
      return;
    }

    if (tab === 'date') {
      this.dateConfigCollapsed = !this.dateConfigCollapsed;
      return;
    }

    this.modalConfigCollapsed = !this.modalConfigCollapsed;
  }

  toggleCodePanel(tab: PlaygroundTab): void {
    if (tab === 'grid') {
      this.gridCode.collapsed = !this.gridCode.collapsed;
      return;
    }

    if (tab === 'date') {
      this.dateCode.collapsed = !this.dateCode.collapsed;
      return;
    }

    this.modalCode.collapsed = !this.modalCode.collapsed;
  }

  setCodeFile(tab: PlaygroundTab, file: CodeFile): void {
    this.getCodeState(tab).activeFile = file;
  }

  applyCode(tab: PlaygroundTab): void {
    if (tab === 'grid') {
      this.applyGridCode();
      return;
    }

    if (tab === 'date') {
      this.applyDateCode();
      return;
    }

    this.applyModalCode();
  }

  resetCode(tab: PlaygroundTab): void {
    if (tab === 'grid') {
      this.resetGridCodeFromConfig();
      this.codeError.grid = '';
      return;
    }

    if (tab === 'date') {
      this.resetDateCodeFromConfig();
      this.codeError.date = '';
      return;
    }

    this.resetModalCodeFromConfig();
    this.codeError.modal = '';
  }

  onGridConfigChange(config: BrGridConfig): void {
    this.gridConfig = config;
    this.activeGridPreset = 'complex';
    this.syncGridTsCode();
    this.pushLog('Grid JSON applied');
  }

  onDateConfigChange(config: BrDateConfig): void {
    this.dateConfig = config;
    this.activeDatePreset = 'default';
    this.syncDateTsCode();
    this.pushLog('Date JSON applied');
  }

  onModalConfigChange(config: BrModalConfig): void {
    this.modalConfig = config;
    this.activeModalPreset = 'custom';
    this.syncModalTsCode();
    this.pushLog('Modal JSON applied');
  }

  openModalPreview(): void {
    this.modalConfig = { ...this.modalConfig, isOpen: true };
    this.syncModalTsCode();
  }

  closeModalPreview(): void {
    this.modalConfig = { ...this.modalConfig, isOpen: false };
    this.syncModalTsCode();
  }

  onGridAction(event: BrGridActionEvent): void {
    this.pushLog(`Grid action: ${event.source} -> ${event.actionId}`);
  }

  onDateChange(value: string): void {
    this.pushLog(`Date changed: ${value || '(empty)'}`);
  }

  onModalAction(event: BrModalActionEvent): void {
    this.pushLog(`Modal action: ${event.actionId}`);
    this.closeModalPreview();
  }

  clearEventLog(): void {
    this.eventLog = [];
  }

  codeLanguage(file: CodeFile): CodeLanguage {
    if (file === 'html') return 'html';
    if (file === 'scss') return 'scss';
    return 'typescript';
  }

  onCodeEditorChange(tab: PlaygroundTab, value: string): void {
    const state = this.getCodeState(tab);
    const file = state.activeFile;
    if (file === 'ts') {
      state.ts = value;
      return;
    }
    if (file === 'html') {
      state.html = value;
      return;
    }
    state.scss = value;
  }

  private applyGridCode(): void {
    try {
      const parsed = this.parseConfigFromTs<BrGridConfig>(this.gridCode.ts, 'gridConfig');
      const htmlSegments = this.extractHtmlSegments(this.gridCode.html, 'br-grid');
      this.validateScss(this.gridCode.scss);

      this.gridConfig = parsed;
      this.gridCode.htmlBefore = htmlSegments.before;
      this.gridCode.htmlAfter = htmlSegments.after;
      this.gridCode.appliedScss = this.gridCode.scss;
      this.codeError.grid = '';
      this.pushLog('Applied Grid TS/HTML/SCSS code');
    } catch (error) {
      this.codeError.grid = error instanceof Error ? error.message : 'Invalid grid TS config block';
    }
  }

  private applyDateCode(): void {
    try {
      const parsed = this.parseConfigFromTs<BrDateConfig>(this.dateCode.ts, 'dateConfig');
      const htmlSegments = this.extractHtmlSegments(this.dateCode.html, 'br-date');
      this.validateScss(this.dateCode.scss);

      this.dateConfig = parsed;
      this.dateCode.htmlBefore = htmlSegments.before;
      this.dateCode.htmlAfter = htmlSegments.after;
      this.dateCode.appliedScss = this.dateCode.scss;
      this.codeError.date = '';
      this.pushLog('Applied Date TS/HTML/SCSS code');
    } catch (error) {
      this.codeError.date = error instanceof Error ? error.message : 'Invalid date TS config block';
    }
  }

  private applyModalCode(): void {
    try {
      const parsed = this.parseConfigFromTs<BrModalConfig>(this.modalCode.ts, 'modalConfig');
      const htmlSegments = this.extractHtmlSegments(this.modalCode.html, 'br-modal');
      this.validateScss(this.modalCode.scss);

      this.modalConfig = parsed;
      this.modalCode.htmlBefore = htmlSegments.before;
      this.modalCode.htmlAfter = htmlSegments.after;
      this.modalCode.appliedScss = this.modalCode.scss;
      this.codeError.modal = '';
      this.pushLog('Applied Modal TS/HTML/SCSS code');
    } catch (error) {
      this.codeError.modal = error instanceof Error ? error.message : 'Invalid modal TS config block';
    }
  }

  private resetGridCodeFromConfig(): void {
    this.gridCode.ts = this.buildGridTsCode(this.gridConfig);
    this.gridCode.html = this.defaultGridHtmlCode();
    this.gridCode.scss = this.defaultGridScssCode();
    this.applyHtmlSegments('grid', 'br-grid');
    this.gridCode.appliedScss = this.gridCode.scss;
  }

  private resetDateCodeFromConfig(): void {
    this.dateCode.ts = this.buildDateTsCode(this.dateConfig);
    this.dateCode.html = this.defaultDateHtmlCode();
    this.dateCode.scss = this.defaultDateScssCode();
    this.applyHtmlSegments('date', 'br-date');
    this.dateCode.appliedScss = this.dateCode.scss;
  }

  private resetModalCodeFromConfig(): void {
    this.modalCode.ts = this.buildModalTsCode(this.modalConfig);
    this.modalCode.html = this.defaultModalHtmlCode();
    this.modalCode.scss = this.defaultModalScssCode();
    this.applyHtmlSegments('modal', 'br-modal');
    this.modalCode.appliedScss = this.modalCode.scss;
  }

  private syncGridTsCode(): void {
    this.gridCode.ts = this.buildGridTsCode(this.gridConfig);
  }

  private syncDateTsCode(): void {
    this.dateCode.ts = this.buildDateTsCode(this.dateConfig);
  }

  private syncModalTsCode(): void {
    this.modalCode.ts = this.buildModalTsCode(this.modalConfig);
  }

  private applyHtmlSegments(tab: PlaygroundTab, controlTag: 'br-grid' | 'br-date' | 'br-modal'): void {
    const code = this.getCodeState(tab);
    const segments = this.extractHtmlSegments(code.html, controlTag);
    code.htmlBefore = segments.before;
    code.htmlAfter = segments.after;
  }

  private extractHtmlSegments(html: string, controlTag: 'br-grid' | 'br-date' | 'br-modal'): { before: string; after: string } {
    const pattern = new RegExp(`<${controlTag}[\\s\\S]*?<\\/${controlTag}>`, 'i');
    const match = html.match(pattern);

    if (!match || match.index === undefined) {
      throw new Error(`HTML must include <${controlTag}>...</${controlTag}> to render live preview.`);
    }

    // Basic structural validation for obvious malformed markup.
    const parser = new DOMParser();
    const parsed = parser.parseFromString(html, 'text/html');
    const parseError = parsed.querySelector('parsererror');
    if (parseError) {
      throw new Error(`Invalid HTML: ${parseError.textContent || 'parsererror'}`);
    }

    const start = match.index;
    const end = start + match[0].length;
    return {
      before: html.slice(0, start),
      after: html.slice(end),
    };
  }

  private validateScss(scss: string): void {
    let balance = 0;
    for (const ch of scss) {
      if (ch === '{') balance += 1;
      if (ch === '}') balance -= 1;
      if (balance < 0) {
        throw new Error('Invalid SCSS: unmatched closing brace "}".');
      }
    }
    if (balance !== 0) {
      throw new Error('Invalid SCSS: unbalanced braces.');
    }
  }

  private parseConfigFromTs<T>(tsCode: string, variableName: string): T {
    const startToken = '// CONFIG_JSON_START';
    const endToken = '// CONFIG_JSON_END';
    const start = tsCode.indexOf(startToken);
    const end = tsCode.indexOf(endToken);

    if (start < 0 || end < 0 || end <= start) {
      throw new Error(`Missing ${startToken}/${endToken} block in ${variableName}.`);
    }

    const jsonText = tsCode.slice(start + startToken.length, end).trim();
    return JSON.parse(jsonText) as T;
  }

  private buildGridTsCode(config: BrGridConfig): string {
    return `import { BrGridConfig, BrGridActionEvent } from '../../common';

export class YourFeatureComponent {
  // CONFIG_JSON_START
${JSON.stringify(config, null, 2)}
  // CONFIG_JSON_END

  onGridAction(event: BrGridActionEvent): void {
    console.log('Grid action:', event);
    // hook to service/API calls here.
  }
}`;
  }

  private buildDateTsCode(config: BrDateConfig): string {
    return `import { BrDateConfig } from '../../common';

export class YourFeatureComponent {
  // CONFIG_JSON_START
${JSON.stringify(config, null, 2)}
  // CONFIG_JSON_END

  onDateChange(value: string): void {
    console.log('Date changed:', value);
  }
}`;
  }

  private buildModalTsCode(config: BrModalConfig): string {
    return `import { BrModalConfig, BrModalActionEvent } from '../../common';

export class YourFeatureComponent {
  // CONFIG_JSON_START
${JSON.stringify(config, null, 2)}
  // CONFIG_JSON_END

  onModalAction(event: BrModalActionEvent): void {
    console.log('Modal action:', event);
  }
}`;
  }

  private defaultGridHtmlCode(): string {
    return `<section class="grid-demo-shell">
  <h3>Grid Consumer Demo</h3>
  <p>This is the same consumer HTML you can use in your feature.</p>
  <br-grid [config]="gridConfig" (action)="onGridAction($event)"></br-grid>
</section>`;
  }

  private defaultDateHtmlCode(): string {
    return `<section class="date-demo-shell">
  <h3>Date Consumer Demo</h3>
  <p>This is the same consumer HTML you can use in your feature.</p>
  <br-date [config]="dateConfig" (dateChange)="onDateChange($event)"></br-date>
</section>`;
  }

  private defaultModalHtmlCode(): string {
    return `<section class="modal-demo-shell">
  <h3>Modal Consumer Demo</h3>
  <p>Open modal from action buttons and handle emitted actions.</p>
  <br-modal [config]="modalConfig" (action)="onModalAction($event)" (close)="closeModalPreview()"></br-modal>
</section>`;
  }

  private defaultGridScssCode(): string {
    return `.grid-live-preview .grid-demo-shell {
  border: 1px solid #cbd5e0;
  border-radius: 8px;
  padding: 12px;
  background: #ffffff;
}

.grid-live-preview h3 {
  margin: 0 0 6px;
  font-size: 18px;
}

.grid-live-preview p {
  margin: 0 0 10px;
  color: #4a5568;
  font-size: 13px;
}`;
  }

  private defaultDateScssCode(): string {
    return `.date-live-preview .date-demo-shell {
  border: 1px dashed #a0aec0;
  border-radius: 8px;
  padding: 12px;
  background: #fff;
}

.date-live-preview h3 {
  margin: 0 0 8px;
}`;
  }

  private defaultModalScssCode(): string {
    return `.modal-live-preview .modal-demo-shell {
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 12px;
  background: #fff;
}

.modal-live-preview h3 {
  margin: 0 0 8px;
}`;
  }

  private getCodeState(tab: PlaygroundTab): DemoCodeState {
    if (tab === 'grid') return this.gridCode;
    if (tab === 'date') return this.dateCode;
    return this.modalCode;
  }

  private createEmptyCodeState(): DemoCodeState {
    return {
      ts: '',
      html: '',
      scss: '',
      appliedScss: '',
      activeFile: 'ts',
      collapsed: false,
      htmlBefore: '',
      htmlAfter: '',
    };
  }

  private pushLog(message: string): void {
    const stamp = new Date().toLocaleTimeString();
    this.eventLog = [`[${stamp}] ${message}`, ...this.eventLog].slice(0, 40);
  }

  private simpleGridConfig(): BrGridConfig {
    return {
      title: 'Simple Grid Demo',
      columns: [
        { field: 'id', header: 'ID', sortable: true },
        { field: 'name', header: 'Name', sortable: true },
        { field: 'status', header: 'Status', sortable: true },
      ],
      data: this.sampleUsers(18).map((x) => ({ id: x.id, name: x.name, status: x.status })),
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
        showPaginationSizeSelector: true,
        showPaginationSummary: true,
        showPaginationNavigation: true,
      },
    };
  }

  private moderateGridConfig(): BrGridConfig {
    return {
      title: 'Moderate Grid Demo',
      columns: [
        { field: 'id', header: 'ID', sortable: true },
        { field: 'name', header: 'Name', sortable: true },
        { field: 'team', header: 'Team', sortable: true },
        { field: 'role', header: 'Role', sortable: true },
        { field: 'status', header: 'Status', sortable: true },
      ],
      data: this.sampleUsers(32),
      pagination: true,
      pageSize: 10,
      sorting: true,
      toolbar: {
        showSort: true,
        showFilter: true,
        showSearch: true,
        showRefresh: true,
        showColumnSettings: true,
        showShare: false,
        showViewMode: false,
        primaryActionLabel: 'Add User',
      },
      personalization: {
        availableColumns: [
          { field: 'id', label: 'Employee ID', group: 'Core' },
          { field: 'name', label: 'Full Name', group: 'Core' },
          { field: 'team', label: 'Team', group: 'Org' },
          { field: 'role', label: 'Role', group: 'Org' },
          { field: 'status', label: 'Status', group: 'Org' },
        ],
        selectedColumns: ['id', 'name', 'team', 'role', 'status'],
      },
      features: {
        enableTopBar: true,
        enableRowSelection: true,
        enableSelectionActions: true,
        enableContextMenu: false,
        enableRowActionButton: false,
        enableColumnPersonalization: true,
        enableColumnVisibilityToggle: true,
        enableColumnReorder: false,
        enableSorting: true,
        sortLevels: 2,
        enableFiltering: true,
        filterLevels: 2,
        enableSearch: true,
        enableRefresh: true,
        enableShare: false,
        enableViewMode: false,
        enablePrimaryAction: true,
        enablePrimaryActionMenu: false,
        showPaginationSizeSelector: true,
        showPaginationSummary: true,
        showPaginationNavigation: true,
      },
      selectionActions: [
        { id: 'activate', label: 'Activate' },
        { id: 'deactivate', label: 'Deactivate' },
      ],
    };
  }

  private complexGridConfig(): BrGridConfig {
    return {
      title: 'Complex Grid Demo (All Features)',
      columns: [
        { field: 'id', header: 'ID', sortable: true },
        { field: 'name', header: 'Name', sortable: true },
        { field: 'team', header: 'Team', sortable: true },
        { field: 'role', header: 'Role', sortable: true },
        { field: 'location', header: 'Location', sortable: true },
        { field: 'status', header: 'Status', sortable: true },
      ],
      data: this.sampleUsers(60),
      pagination: true,
      pageSize: 25,
      sorting: true,
      toolbar: {
        showSort: true,
        showFilter: true,
        showSearch: true,
        showRefresh: true,
        showColumnSettings: true,
        showShare: true,
        showViewMode: true,
        primaryActionLabel: 'Create User',
        primaryActions: [
          { id: 'create-single', label: 'Create User' },
          { id: 'import-users', label: 'Import Users' },
        ],
      },
      contextMenuActions: [
        { id: 'view', label: 'View Profile' },
        { id: 'edit', label: 'Edit User' },
        { id: 'reset-password', label: 'Reset Password' },
        { id: 'archive', label: 'Archive' },
      ],
      selectionActions: [
        { id: 'activate', label: 'Activate' },
        { id: 'deactivate', label: 'Deactivate' },
        { id: 'export', label: 'Export' },
        { id: 'notify', label: 'Send Notification' },
      ],
      personalization: {
        availableColumns: [
          { field: 'id', label: 'Employee ID', group: 'Core' },
          { field: 'name', label: 'Full Name', group: 'Core' },
          { field: 'team', label: 'Team', group: 'Org' },
          { field: 'role', label: 'Role', group: 'Org' },
          { field: 'location', label: 'Location', group: 'Org' },
          { field: 'status', label: 'Status', group: 'State' },
        ],
        selectedColumns: ['id', 'name', 'team', 'role', 'location', 'status'],
        maxSelectedColumns: 10,
        searchPlaceholder: 'Search fields',
      },
      defaultSort: [{ field: 'name', direction: 'asc' }],
      defaultFilters: [{ field: 'status', operator: 'contains', value: 'Active' }],
      features: {
        enableTopBar: true,
        enableRowSelection: true,
        enableSelectionActions: true,
        enableContextMenu: true,
        enableRowActionButton: true,
        enableColumnPersonalization: true,
        enableColumnVisibilityToggle: true,
        enableColumnReorder: true,
        enableSorting: true,
        sortLevels: 3,
        enableFiltering: true,
        filterLevels: 3,
        enableSearch: true,
        enableRefresh: true,
        enableShare: true,
        enableViewMode: true,
        enablePrimaryAction: true,
        enablePrimaryActionMenu: true,
        showPaginationSizeSelector: true,
        showPaginationSummary: true,
        showPaginationNavigation: true,
      },
    };
  }

  private defaultDateConfig(): BrDateConfig {
    return {
      label: 'Start Date',
      value: '2026-01-15',
      minDate: new Date('2025-01-01'),
      maxDate: new Date('2026-12-31'),
      disabled: false,
      placeholder: 'Pick a date',
      required: false,
      uiConfig: {
        density: 'comfortable',
        size: 'md',
        variant: 'outline',
      },
    };
  }

  private compactDateConfig(): BrDateConfig {
    return {
      label: 'Compact Date',
      value: '2026-02-01',
      minDate: new Date('2026-01-01'),
      maxDate: new Date('2026-12-31'),
      disabled: false,
      placeholder: 'Compact mode',
      required: true,
      uiConfig: {
        density: 'compact',
        size: 'sm',
        variant: 'filled',
      },
    };
  }

  private disabledDateConfig(): BrDateConfig {
    return {
      label: 'Disabled Date',
      value: '2026-03-10',
      minDate: null,
      maxDate: null,
      disabled: true,
      placeholder: 'Disabled',
      required: false,
      uiConfig: {
        density: 'comfortable',
        size: 'md',
        variant: 'outline',
      },
    };
  }

  private defaultModalConfig(): BrModalConfig {
    return {
      isOpen: false,
      title: 'Playground Modal',
      subtitle: 'Edit JSON and open preview',
      content: '<p>This modal is rendered via <strong>br-modal</strong> wrapper.</p>',
      actions: [
        { id: 'cancel', label: 'Cancel', type: 'secondary' },
        { id: 'save', label: 'Save', type: 'primary' },
      ],
      uiConfig: {
        size: 'md',
        isDismissible: true,
        showCloseButton: true,
      },
    };
  }

  private modalPresetConfig(preset: Exclude<ModalPreset, 'custom'>): BrModalConfig {
    if (preset === 'info') {
      return {
        isOpen: false,
        title: 'System Information',
        subtitle: 'Basic details about current application state.',
        content: '<p>This is a generic information modal.</p><p>Use it for non-blocking user notifications.</p>',
        actions: [{ id: 'ok', label: 'Understood', type: 'primary' }],
        uiConfig: { size: 'md', showCloseButton: true },
      };
    }

    if (preset === 'confirm') {
      return {
        isOpen: false,
        title: 'Confirm Action',
        subtitle: 'Please confirm to continue.',
        content: '<p>Are you sure you want to proceed with this operation?</p>',
        actions: [
          { id: 'cancel', label: 'Cancel', type: 'secondary' },
          { id: 'confirm', label: 'Confirm', type: 'primary' },
        ],
        uiConfig: { size: 'sm', showCloseButton: true },
      };
    }

    if (preset === 'delete') {
      return {
        isOpen: false,
        title: 'Delete Record',
        subtitle: 'This action cannot be undone.',
        content: '<p>You are about to permanently delete this record and all related mappings.</p>',
        actions: [
          { id: 'cancel', label: 'Keep Record', type: 'ghost' },
          { id: 'delete', label: 'Delete Permanently', type: 'danger' },
        ],
        uiConfig: { size: 'md', isDismissible: false, showCloseButton: true },
      };
    }

    return {
      isOpen: false,
      title: 'Edit User Profile',
      subtitle: 'Update and save the profile fields below.',
      content: '<p>Fill all required fields before saving.</p>',
      fields: [
        { id: 'firstName', type: 'text', label: 'First Name', required: true, colSpan: 1 },
        { id: 'lastName', type: 'text', label: 'Last Name', required: true, colSpan: 1 },
        { id: 'email', type: 'text', label: 'Email', colSpan: 2 },
        {
          id: 'role',
          type: 'select',
          label: 'Role',
          colSpan: 1,
          options: [
            { label: 'Admin', value: 'admin' },
            { label: 'Manager', value: 'manager' },
            { label: 'Viewer', value: 'viewer' },
          ],
        },
        { id: 'subscribe', type: 'checkbox', label: 'Subscribe to updates', colSpan: 1 },
      ],
      actions: [
        { id: 'cancel', label: 'Cancel', type: 'secondary' },
        { id: 'save', label: 'Save Changes', type: 'primary' },
      ],
      uiConfig: { size: 'lg', showCloseButton: true },
    };
  }

  private sampleUsers(count: number): any[] {
    const names = ['Anya Ross', 'Ravi Singh', 'Mia Chen', 'Noah Lee', 'Liam Patel', 'Emma Brown', 'Olivia Clark', 'Ethan Davis', 'Ava Nguyen', 'Lucas Walker'];
    const teams = ['Platform', 'Data', 'Security', 'Mobile', 'Cloud', 'Payments'];
    const roles = ['Engineer', 'Senior Engineer', 'Lead', 'Manager', 'Architect'];
    const locations = ['Austin', 'Seattle', 'New York', 'Chicago', 'San Jose'];
    const statuses = ['Active', 'Pending', 'Inactive', 'On Leave'];

    return Array.from({ length: count }).map((_, i) => ({
      id: `U-${(101 + i).toString().padStart(3, '0')}`,
      name: names[i % names.length],
      team: teams[i % teams.length],
      role: roles[i % roles.length],
      location: locations[i % locations.length],
      status: statuses[i % statuses.length],
    }));
  }

  private clone<T>(value: T): T {
    return JSON.parse(JSON.stringify(value)) as T;
  }
}
