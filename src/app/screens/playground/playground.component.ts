import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import {
  BrDateComponent,
  BrDateConfig,
  BrFormActionEvent,
  BrFormActionSource,
  BrFormConfig,
  BrFormField,
  BrTextComponent,
  BrSingleSelectComponent,
  BrMultiSelectComponent,
  BrCheckboxComponent,
  BrRadioComponent,
  BrAutocompleteComponent,
  BrTextConfig,
  BrSingleSelectConfig,
  BrMultiSelectConfig,
  BrCheckboxConfig,
  BrRadioConfig,
  BrAutocompleteConfig,
  BrGridActionEvent,
  BrGridComponent,
  BrGridConfig,
  BrModalActionEvent,
  BrModalComponent,
  BrModalConfig,
  ControlUiMode,
  DateUiMode,
  ModalUiMode,
  RuntimeUiConfigService,
  UiMode,
} from '../../common';
import { JsonWorkbenchComponent } from './components/json-workbench/json-workbench.component';
import { CodeEditorComponent, CodeLanguage } from './components/code-editor/code-editor.component';

type PlaygroundTab = 'grid' | 'date' | 'modal' | 'form';
type CodeFile = 'ts' | 'html' | 'scss';

type GridPreset = 'complex' | 'moderate' | 'simple';
type DatePreset = 'default' | 'compact' | 'disabled';
type ModalPreset = 'custom' | 'info' | 'confirm' | 'delete' | 'form';
type FormPreset = 'all-controls' | 'simple';
type ControlPlayground = 'all' | 'date' | 'text' | 'single-select' | 'multi-select' | 'checkbox' | 'radio' | 'autocomplete';
type ControlConfig =
  | BrTextConfig
  | BrSingleSelectConfig
  | BrMultiSelectConfig
  | BrCheckboxConfig
  | BrRadioConfig
  | BrAutocompleteConfig
  | BrDateConfig;

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
  imports: [
    CommonModule,
    FormsModule,
    BrGridComponent,
    BrDateComponent,
    BrModalComponent,
    BrTextComponent,
    BrSingleSelectComponent,
    BrMultiSelectComponent,
    BrCheckboxComponent,
    BrRadioComponent,
    BrAutocompleteComponent,
    JsonWorkbenchComponent,
    CodeEditorComponent,
  ],
  templateUrl: './playground.component.html',
  styleUrls: ['./playground.component.scss'],
})
export class PlaygroundComponent {
  activeTab: PlaygroundTab = 'grid';

  readonly gridModes: UiMode[] = ['CUSTOM', 'MATERIAL', 'CANVAS'];
  readonly dateModes: DateUiMode[] = ['CUSTOM', 'MATERIAL'];
  readonly modalModes: ModalUiMode[] = ['CUSTOM', 'MATERIAL'];
  readonly controlModes: ControlUiMode[] = ['CUSTOM', 'MATERIAL'];

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

  readonly formPresetLabels: Record<FormPreset, string> = {
    'all-controls': 'All Controls',
    simple: 'Simple Controls',
  };
  readonly controlPlaygroundLabels: Record<ControlPlayground, string> = {
    all: 'All Controls',
    date: 'Date',
    text: 'Text Box',
    'single-select': 'Single Select',
    'multi-select': 'Multi Select',
    checkbox: 'Checkbox',
    radio: 'Radio',
    autocomplete: 'Autocomplete',
  };

  readonly codeFiles: CodeFile[] = ['ts', 'html', 'scss'];

  activeGridPreset: GridPreset = 'complex';
  activeDatePreset: DatePreset = 'default';
  activeModalPreset: ModalPreset = 'custom';
  activeFormPreset: FormPreset = 'all-controls';
  activeControlPlayground: ControlPlayground = 'all';
  activeControlVariant = 'default';

  gridConfigCollapsed = true;
  dateConfigCollapsed = false;
  modalConfigCollapsed = true;
  formConfigCollapsed = true;

  gridConfig: BrGridConfig = this.complexGridConfig();
  dateConfig: BrDateConfig = this.defaultDateConfig();
  modalConfig: BrModalConfig = this.defaultModalConfig();
  formConfig: BrFormConfig = this.allControlsFormConfig();
  modalPresetConfigs!: Record<ModalPreset, BrModalConfig>;

  gridCode: DemoCodeState = this.createEmptyCodeState();
  dateCode: DemoCodeState = this.createEmptyCodeState();
  modalCode: DemoCodeState = this.createEmptyCodeState();
  formCode: DemoCodeState = this.createEmptyCodeState();
  private formControlConfigMap: Record<string, ControlConfig> = {};

  codeError = {
    grid: '',
    date: '',
    modal: '',
    form: '',
  };

  eventLog: string[] = [];
  private autoApplyTimers: Partial<Record<PlaygroundTab, ReturnType<typeof setTimeout>>> = {};
  private runtimeHandlers: {
    gridAction?: (event: BrGridActionEvent, runtimeConsole: Console) => void;
    dateChange?: (value: string, runtimeConsole: Console) => void;
    modalAction?: (event: BrModalActionEvent, runtimeConsole: Console) => void;
    formAction?: (event: BrFormActionEvent, runtimeConsole: Console) => void;
  } = {};

  constructor(public readonly runtimeUiConfig: RuntimeUiConfigService) {
    this.modalPresetConfigs = this.createModalPresetConfigs();
    this.modalConfig = this.clone(this.modalPresetConfigs[this.activeModalPreset]);
    this.resetGridCodeFromConfig();
    this.resetDateCodeFromConfig();
    this.resetModalCodeFromConfig();
    this.resetFormCodeFromConfig();
    this.rebuildFormControlConfigs();
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

  get formPresets(): FormPreset[] {
    return ['all-controls', 'simple'];
  }

  get controlPlaygrounds(): ControlPlayground[] {
    return ['all', 'date', 'text', 'single-select', 'multi-select', 'checkbox', 'radio', 'autocomplete'];
  }

  get controlVariants(): string[] {
    switch (this.activeControlPlayground) {
      case 'date':
        return ['default', 'bounded', 'disabled'];
      case 'text':
        return ['default', 'required', 'disabled'];
      case 'single-select':
        return ['default', 'required', 'disabled'];
      case 'multi-select':
        return ['default', 'preselected', 'disabled'];
      case 'checkbox':
        return ['unchecked', 'checked', 'disabled'];
      case 'radio':
        return ['default', 'preselected', 'disabled'];
      case 'autocomplete':
        return ['default', 'prefilled', 'disabled'];
      default:
        return ['default'];
    }
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

  setControlMode(
    control: 'text' | 'singleSelect' | 'multiSelect' | 'checkbox' | 'radio' | 'autocomplete',
    mode: ControlUiMode,
  ): void {
    this.runtimeUiConfig.setMode(control, mode);
    this.pushLog(`${control} mode changed to ${mode}`);
  }

  setAllControlModes(mode: ControlUiMode): void {
    this.setDateMode(mode as DateUiMode);
    const controls: Array<'text' | 'singleSelect' | 'multiSelect' | 'checkbox' | 'radio' | 'autocomplete'> = [
      'text',
      'singleSelect',
      'multiSelect',
      'checkbox',
      'radio',
      'autocomplete',
    ];
    for (const control of controls) {
      this.runtimeUiConfig.setMode(control, mode);
    }
    this.pushLog(`All form control modes (including date) changed to ${mode}`);
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
    this.modalConfig = this.clone(this.modalPresetConfigs[preset]);
    this.resetModalCodeFromConfig();
    this.pushLog(`Loaded ${this.modalPresetLabels[preset]} for editing`);
  }

  selectFormPreset(preset: FormPreset): void {
    this.activeFormPreset = preset;
    this.activeControlPlayground = 'all';
    this.activeControlVariant = 'default';
    this.formConfig = this.clone(preset === 'all-controls' ? this.allControlsFormConfig() : this.simpleFormConfig());
    this.rebuildFormControlConfigs();
    this.resetFormCodeFromConfig();
    this.pushLog(`Loaded ${this.formPresetLabels[preset]} preset`);
  }

  selectControlPlayground(control: ControlPlayground): void {
    this.activeControlPlayground = control;
    this.activeControlVariant = this.controlVariants[0];

    if (control === 'all') {
      this.formConfig = this.clone(this.activeFormPreset === 'simple' ? this.simpleFormConfig() : this.allControlsFormConfig());
    } else {
      this.formConfig = this.buildSingleControlVariantConfig(control, this.activeControlVariant);
    }

    this.rebuildFormControlConfigs();
    this.resetFormCodeFromConfig();
    this.pushLog(`Loaded ${this.controlPlaygroundLabels[control]} playground`);
  }

  selectControlVariant(variant: string): void {
    this.activeControlVariant = variant;
    if (this.activeControlPlayground === 'all') {
      return;
    }
    this.formConfig = this.buildSingleControlVariantConfig(this.activeControlPlayground, variant);
    this.rebuildFormControlConfigs();
    this.resetFormCodeFromConfig();
    this.pushLog(`Applied variant: ${this.controlVariantLabel(variant)}`);
  }

  controlVariantLabel(variant: string): string {
    return variant.replace(/-/g, ' ').replace(/\b\w/g, (x) => x.toUpperCase());
  }

  activeControlModeValue(): string | null {
    if (this.activeControlPlayground === 'all') {
      return null;
    }
    if (this.activeControlPlayground === 'date') {
      return this.modes.date;
    }

    const keyMap: Record<Exclude<ControlPlayground, 'all' | 'date'>, 'text' | 'singleSelect' | 'multiSelect' | 'checkbox' | 'radio' | 'autocomplete'> = {
      text: 'text',
      'single-select': 'singleSelect',
      'multi-select': 'multiSelect',
      checkbox: 'checkbox',
      radio: 'radio',
      autocomplete: 'autocomplete',
    };

    return this.modes[keyMap[this.activeControlPlayground]];
  }

  setActiveControlPlaygroundMode(mode: string): void {
    if (this.activeControlPlayground === 'all') {
      this.setAllControlModes(mode as ControlUiMode);
      return;
    }

    if (this.activeControlPlayground === 'date') {
      this.setDateMode(mode as DateUiMode);
      return;
    }

    const keyMap: Record<Exclude<ControlPlayground, 'all' | 'date'>, 'text' | 'singleSelect' | 'multiSelect' | 'checkbox' | 'radio' | 'autocomplete'> = {
      text: 'text',
      'single-select': 'singleSelect',
      'multi-select': 'multiSelect',
      checkbox: 'checkbox',
      radio: 'radio',
      autocomplete: 'autocomplete',
    };

    this.setControlMode(keyMap[this.activeControlPlayground], mode as ControlUiMode);
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

    if (tab === 'form') {
      this.formConfigCollapsed = !this.formConfigCollapsed;
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

    if (tab === 'form') {
      this.formCode.collapsed = !this.formCode.collapsed;
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

    if (tab === 'form') {
      this.applyFormCode();
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

    if (tab === 'form') {
      this.resetFormCodeFromConfig();
      this.codeError.form = '';
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
    this.modalPresetConfigs[this.activeModalPreset] = this.clone(config);
    this.syncModalTsCode();
    this.pushLog('Modal JSON applied');
  }

  onFormConfigChange(config: BrFormConfig): void {
    this.formConfig = config;
    this.activeControlPlayground = 'all';
    this.activeControlVariant = 'default';
    this.activeFormPreset = 'all-controls';
    this.rebuildFormControlConfigs();
    this.syncFormTsCode();
    this.syncFormHtmlCode();
    this.pushLog('Controls JSON applied');
  }

  openModalPreview(): void {
    this.modalConfig = { ...this.modalConfig, isOpen: true };
    this.modalPresetConfigs[this.activeModalPreset] = this.clone(this.modalConfig);
    this.syncModalTsCode();
  }

  closeModalPreview(): void {
    this.modalConfig = { ...this.modalConfig, isOpen: false };
    this.modalPresetConfigs[this.activeModalPreset] = this.clone(this.modalConfig);
    this.syncModalTsCode();
  }

  onGridAction(event: BrGridActionEvent): void {
    if (this.runtimeHandlers.gridAction) {
      this.runtimeHandlers.gridAction(event, this.createRuntimeConsole('grid'));
    }
    this.pushLog(`Grid action: ${event.source} -> ${event.actionId}`);
  }

  onDateChange(value: string): void {
    if (this.runtimeHandlers.dateChange) {
      this.runtimeHandlers.dateChange(value, this.createRuntimeConsole('date'));
    }
    this.pushLog(`Date changed: ${value || '(empty)'}`);
  }

  onModalAction(event: BrModalActionEvent): void {
    if (this.runtimeHandlers.modalAction) {
      this.runtimeHandlers.modalAction(event, this.createRuntimeConsole('modal'));
    }
    this.pushLog(`Modal action: ${event.actionId}`);
    this.closeModalPreview();
  }

  onFormAction(event: BrFormActionEvent): void {
    if (this.runtimeHandlers.formAction) {
      this.runtimeHandlers.formAction(event, this.createRuntimeConsole('form'));
    }
    this.pushLog(`Control action: ${event.source}${event.fieldId ? ' -> ' + event.fieldId : ''}`);
  }

  onControlsAction(source: BrFormActionSource): void {
    if (source === 'reset') {
      const resetValues: Record<string, any> = {};
      for (const field of this.formConfig.fields) {
        if (field.type === 'checkbox') {
          resetValues[field.id] = false;
        } else if (field.type === 'multi-select') {
          resetValues[field.id] = [];
        } else {
          resetValues[field.id] = '';
        }
      }
      this.formConfig = { ...this.formConfig, value: resetValues };
      this.rebuildFormControlConfigs();
    }

    this.onFormAction({
      source,
      values: { ...(this.formConfig.value || {}) },
    });
  }

  controlValue(field: BrFormField): any {
    return (this.formConfig.value || {})[field.id];
  }

  updateControlValue(fieldId: string, value: any): void {
    this.formConfig = {
      ...this.formConfig,
      value: { ...(this.formConfig.value || {}), [fieldId]: value },
    };
    this.rebuildFormControlConfigs();
    this.onFormAction({
      source: 'change',
      fieldId,
      value,
      values: { ...(this.formConfig.value || {}) },
    });
  }

  asTextConfig(field: BrFormField): BrTextConfig {
    return {
      label: field.label,
      value: String(this.controlValue(field) ?? ''),
      placeholder: field.placeholder,
      disabled: field.disabled,
      required: field.required,
    };
  }

  asSingleSelectConfig(field: BrFormField): BrSingleSelectConfig {
    return {
      label: field.label,
      value: this.controlValue(field),
      options: field.options || [],
      disabled: field.disabled,
      required: field.required,
    };
  }

  asMultiSelectConfig(field: BrFormField): BrMultiSelectConfig {
    return {
      label: field.label,
      value: Array.isArray(this.controlValue(field)) ? this.controlValue(field) : [],
      options: field.options || [],
      disabled: field.disabled,
    };
  }

  asCheckboxConfig(field: BrFormField): BrCheckboxConfig {
    return {
      label: field.label,
      checked: !!this.controlValue(field),
      disabled: field.disabled,
    };
  }

  asRadioConfig(field: BrFormField): BrRadioConfig {
    return {
      label: field.label,
      value: this.controlValue(field),
      options: field.options || [],
      disabled: field.disabled,
    };
  }

  asAutocompleteConfig(field: BrFormField): BrAutocompleteConfig {
    return {
      label: field.label,
      value: String(this.controlValue(field) ?? ''),
      options: field.options || [],
      placeholder: field.placeholder,
      disabled: field.disabled,
    };
  }

  asDateConfig(field: BrFormField): BrDateConfig {
    return {
      label: field.label,
      value: this.controlValue(field) || '',
      disabled: field.disabled,
      placeholder: field.placeholder || 'Select date',
      required: field.required,
    };
  }

  controlConfig(field: BrFormField): ControlConfig | null {
    return this.formControlConfigMap[field.id] || null;
  }

  trackByFieldId(_: number, field: BrFormField): string {
    return field.id;
  }

  getTextConfig(field: BrFormField): BrTextConfig {
    return this.formControlConfigMap[field.id] as BrTextConfig;
  }

  getSingleSelectConfig(field: BrFormField): BrSingleSelectConfig {
    return this.formControlConfigMap[field.id] as BrSingleSelectConfig;
  }

  getMultiSelectConfig(field: BrFormField): BrMultiSelectConfig {
    return this.formControlConfigMap[field.id] as BrMultiSelectConfig;
  }

  getCheckboxConfig(field: BrFormField): BrCheckboxConfig {
    return this.formControlConfigMap[field.id] as BrCheckboxConfig;
  }

  getRadioConfig(field: BrFormField): BrRadioConfig {
    return this.formControlConfigMap[field.id] as BrRadioConfig;
  }

  getAutocompleteConfig(field: BrFormField): BrAutocompleteConfig {
    return this.formControlConfigMap[field.id] as BrAutocompleteConfig;
  }

  getDateConfig(field: BrFormField): BrDateConfig {
    return this.formControlConfigMap[field.id] as BrDateConfig;
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
    } else if (file === 'html') {
      state.html = value;
    } else {
      state.scss = value;
    }
    this.scheduleAutoApply(tab);
  }

  private applyGridCode(): void {
    try {
      this.validateTsShape('grid', this.gridCode.ts);
      const parsed = this.parseConfigFromTs<BrGridConfig>(this.gridCode.ts, 'gridConfig');
      const htmlSegments = this.extractHtmlSegments(this.gridCode.html, 'br-grid');
      this.validateScss(this.gridCode.scss);
      this.runtimeHandlers.gridAction = this.parseGridActionHandler(this.gridCode.ts);

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
      this.validateTsShape('date', this.dateCode.ts);
      const parsed = this.parseConfigFromTs<BrDateConfig>(this.dateCode.ts, 'dateConfig');
      const htmlSegments = this.extractHtmlSegments(this.dateCode.html, 'br-date');
      this.validateScss(this.dateCode.scss);
      this.runtimeHandlers.dateChange = this.parseDateChangeHandler(this.dateCode.ts);

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
      this.validateTsShape('modal', this.modalCode.ts);
      const parsed = this.parseConfigFromTs<BrModalConfig>(this.modalCode.ts, 'modalConfig');
      const htmlSegments = this.extractHtmlSegments(this.modalCode.html, 'br-modal');
      this.validateScss(this.modalCode.scss);
      this.runtimeHandlers.modalAction = this.parseModalActionHandler(this.modalCode.ts);

      this.modalConfig = parsed;
      this.modalPresetConfigs[this.activeModalPreset] = this.clone(parsed);
      this.modalCode.htmlBefore = htmlSegments.before;
      this.modalCode.htmlAfter = htmlSegments.after;
      this.modalCode.appliedScss = this.modalCode.scss;
      this.codeError.modal = '';
      this.pushLog('Applied Modal TS/HTML/SCSS code');
    } catch (error) {
      this.codeError.modal = error instanceof Error ? error.message : 'Invalid modal TS config block';
    }
  }

  private applyFormCode(): void {
    try {
      this.validateTsShape('form', this.formCode.ts);
      const parsed = this.parseConfigFromTs<BrFormConfig>(this.formCode.ts, 'controlsConfig', ['formConfig']);
      const htmlSegments = this.extractControlsHtmlSegments(this.formCode.html);
      this.validateScss(this.formCode.scss);
      this.runtimeHandlers.formAction = this.parseFormActionHandler(this.formCode.ts);

      this.formConfig = parsed;
      this.rebuildFormControlConfigs();
      this.formCode.htmlBefore = htmlSegments.before;
      this.formCode.htmlAfter = htmlSegments.after;
      this.formCode.appliedScss = this.formCode.scss;
      this.codeError.form = '';
      this.pushLog('Applied Controls TS/HTML/SCSS code');
    } catch (error) {
      this.codeError.form = error instanceof Error ? error.message : 'Invalid form TS config block';
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

  private resetFormCodeFromConfig(): void {
    this.formCode.ts = this.buildFormTsCode(this.formConfig);
    this.formCode.html = this.buildFormHtmlCode(this.formConfig);
    this.formCode.scss = this.defaultFormScssCode();
    const htmlSegments = this.extractControlsHtmlSegments(this.formCode.html);
    this.formCode.htmlBefore = htmlSegments.before;
    this.formCode.htmlAfter = htmlSegments.after;
    this.formCode.appliedScss = this.formCode.scss;
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

  private syncFormTsCode(): void {
    this.formCode.ts = this.buildFormTsCode(this.formConfig);
  }

  private syncFormHtmlCode(): void {
    this.formCode.html = this.buildFormHtmlCode(this.formConfig);
    const htmlSegments = this.extractControlsHtmlSegments(this.formCode.html);
    this.formCode.htmlBefore = htmlSegments.before;
    this.formCode.htmlAfter = htmlSegments.after;
  }

  private rebuildFormControlConfigs(): void {
    const next: Record<string, ControlConfig> = {};
    for (const field of this.formConfig.fields || []) {
      if (field.type === 'text') {
        next[field.id] = this.asTextConfig(field);
      } else if (field.type === 'single-select') {
        next[field.id] = this.asSingleSelectConfig(field);
      } else if (field.type === 'multi-select') {
        next[field.id] = this.asMultiSelectConfig(field);
      } else if (field.type === 'checkbox') {
        next[field.id] = this.asCheckboxConfig(field);
      } else if (field.type === 'radio') {
        next[field.id] = this.asRadioConfig(field);
      } else if (field.type === 'autocomplete') {
        next[field.id] = this.asAutocompleteConfig(field);
      } else if (field.type === 'date') {
        next[field.id] = this.asDateConfig(field);
      }
    }
    this.formControlConfigMap = next;
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

  private validateHtml(html: string): void {
    const parser = new DOMParser();
    const parsed = parser.parseFromString(html, 'text/html');
    const parseError = parsed.querySelector('parsererror');
    if (parseError) {
      throw new Error(`Invalid HTML: ${parseError.textContent || 'parsererror'}`);
    }
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

    // This studio applies styles directly in-browser (CSS engine).
    // Reject obvious SCSS-only syntax that browser CSS cannot execute.
    if (/\$[a-zA-Z_-][\w-]*/.test(scss) || /@mixin|@include|@extend/.test(scss)) {
      throw new Error('SCSS preprocessor syntax is not supported here. Use plain CSS syntax in this editor.');
    }

    try {
      const sheet = new CSSStyleSheet();
      sheet.replaceSync(scss);
    } catch (error) {
      throw new Error(`Invalid CSS/SCSS for browser execution: ${error instanceof Error ? error.message : 'parse error'}`);
    }
  }

  private parseConfigFromTs<T>(tsCode: string, variableName: string, fallbacks: string[] = []): T {
    const names = [variableName, ...fallbacks];
    for (const name of names) {
      const value = this.extractVariableObjectLiteral(tsCode, name);
      if (value) {
        return JSON.parse(value) as T;
      }
    }
    throw new Error(`Missing object assignment for ${names.join(' / ')} in TS code.`);
  }

  private extractVariableObjectLiteral(tsCode: string, variableName: string): string | null {
    const index = tsCode.indexOf(variableName);
    if (index < 0) return null;

    const equalsIndex = tsCode.indexOf('=', index);
    if (equalsIndex < 0) return null;

    const firstBrace = tsCode.indexOf('{', equalsIndex);
    if (firstBrace < 0) return null;

    let depth = 0;
    let inString = false;
    let quote = '';
    let escaped = false;

    for (let i = firstBrace; i < tsCode.length; i++) {
      const ch = tsCode[i];
      if (inString) {
        if (escaped) {
          escaped = false;
          continue;
        }
        if (ch === '\\') {
          escaped = true;
          continue;
        }
        if (ch === quote) {
          inString = false;
          quote = '';
        }
        continue;
      }

      if (ch === '"' || ch === '\'' || ch === '`') {
        inString = true;
        quote = ch;
        continue;
      }

      if (ch === '{') depth += 1;
      if (ch === '}') {
        depth -= 1;
        if (depth === 0) {
          return tsCode.slice(firstBrace, i + 1);
        }
      }
    }

    return null;
  }

  private buildGridTsCode(config: BrGridConfig): string {
    return `import { BrGridConfig, BrGridActionEvent } from '../../common';

export class YourFeatureComponent {
  gridConfig: BrGridConfig = ${JSON.stringify(config, null, 2)};

  onGridAction(event: BrGridActionEvent): void {
    console.log('Grid action:', event);
    // hook to service/API calls here.
  }
}`;
  }

  private buildDateTsCode(config: BrDateConfig): string {
    return `import { BrDateConfig } from '../../common';

export class YourFeatureComponent {
  dateConfig: BrDateConfig = ${JSON.stringify(config, null, 2)};

  onDateChange(value: string): void {
    console.log('Date changed:', value);
  }
}`;
  }

  private buildModalTsCode(config: BrModalConfig): string {
    return `import { BrModalConfig, BrModalActionEvent } from '../../common';

export class YourFeatureComponent {
  modalConfig: BrModalConfig = ${JSON.stringify(config, null, 2)};

  onModalAction(event: BrModalActionEvent): void {
    console.log('Modal action:', event);
  }
}`;
  }

  private buildFormTsCode(config: BrFormConfig): string {
    const fieldTypes = new Set((config.fields || []).map((f) => f.type));

    const typeImports: string[] = ['BrControlsConfig', 'BrControlActionEvent'];
    if (fieldTypes.size > 0) {
      typeImports.push('BrControlField');
    }
    if (fieldTypes.has('text')) typeImports.push('BrTextConfig');
    if (fieldTypes.has('single-select')) typeImports.push('BrSingleSelectConfig');
    if (fieldTypes.has('multi-select')) typeImports.push('BrMultiSelectConfig');
    if (fieldTypes.has('checkbox')) typeImports.push('BrCheckboxConfig');
    if (fieldTypes.has('radio')) typeImports.push('BrRadioConfig');
    if (fieldTypes.has('autocomplete')) typeImports.push('BrAutocompleteConfig');
    if (fieldTypes.has('date')) typeImports.push('BrDateConfig');

    const helperMethods: string[] = [];
    if (fieldTypes.size > 0) {
      helperMethods.push(`  private controlValue(field: BrControlField): any {
    return (this.controlsConfig.value || {})[field.id];
  }`);
    }

    if (fieldTypes.has('text')) {
      helperMethods.push(`  asTextConfig(field: BrControlField): BrTextConfig {
    return {
      label: field.label,
      value: String(this.controlValue(field) ?? ''),
      placeholder: field.placeholder,
      disabled: field.disabled,
      required: field.required,
    };
  }`);
    }

    if (fieldTypes.has('single-select')) {
      helperMethods.push(`  asSingleSelectConfig(field: BrControlField): BrSingleSelectConfig {
    return {
      label: field.label,
      value: this.controlValue(field),
      options: field.options || [],
      disabled: field.disabled,
      required: field.required,
    };
  }`);
    }

    if (fieldTypes.has('multi-select')) {
      helperMethods.push(`  asMultiSelectConfig(field: BrControlField): BrMultiSelectConfig {
    return {
      label: field.label,
      value: Array.isArray(this.controlValue(field)) ? this.controlValue(field) : [],
      options: field.options || [],
      disabled: field.disabled,
    };
  }`);
    }

    if (fieldTypes.has('checkbox')) {
      helperMethods.push(`  asCheckboxConfig(field: BrControlField): BrCheckboxConfig {
    return {
      label: field.label,
      checked: !!this.controlValue(field),
      disabled: field.disabled,
    };
  }`);
    }

    if (fieldTypes.has('radio')) {
      helperMethods.push(`  asRadioConfig(field: BrControlField): BrRadioConfig {
    return {
      label: field.label,
      value: this.controlValue(field),
      options: field.options || [],
      disabled: field.disabled,
    };
  }`);
    }

    if (fieldTypes.has('autocomplete')) {
      helperMethods.push(`  asAutocompleteConfig(field: BrControlField): BrAutocompleteConfig {
    return {
      label: field.label,
      value: String(this.controlValue(field) ?? ''),
      options: field.options || [],
      placeholder: field.placeholder,
      disabled: field.disabled,
    };
  }`);
    }

    if (fieldTypes.has('date')) {
      helperMethods.push(`  asDateConfig(field: BrControlField): BrDateConfig {
    return {
      label: field.label,
      value: this.controlValue(field) || '',
      disabled: field.disabled,
      placeholder: field.placeholder || 'Select date',
      required: field.required,
    };
  }`);
    }

    const helperBlock = helperMethods.length > 0 ? `\n${helperMethods.join('\n\n')}\n` : '';

    return `import { ${typeImports.join(', ')} } from '../../common';

export class YourFeatureComponent {
  controlsConfig: BrControlsConfig = ${JSON.stringify(config, null, 2)};

  updateControlValue(fieldId: string, value: any): void {
    this.controlsConfig = {
      ...this.controlsConfig,
      value: { ...(this.controlsConfig.value || {}), [fieldId]: value },
    };
    this.onControlsAction({
      source: 'change',
      fieldId,
      value,
      values: { ...(this.controlsConfig.value || {}) },
    });
  }
${helperBlock}

  onControlsAction(event: BrControlActionEvent): void {
    console.log('Control action:', event);
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
  <h3>Modal Popup Consumer Demo</h3>
  <p>Click the button below to test the popup and handle emitted actions.</p>
  <br-modal [config]="modalConfig" (action)="onModalAction($event)" (close)="closeModalPreview()"></br-modal>
</section>`;
  }

  private buildFormHtmlCode(config: BrFormConfig): string {
    const controls = (config.fields || []).map((field) => this.controlHtmlSnippet(field)).join('\n    ');
    const actions = config.showActions === false
      ? ''
      : `
  <div class="controls-actions">
    <button type="button" class="btn ghost" (click)="onControlsAction('reset')">${config.resetLabel || 'Reset'}</button>
    <button type="button" class="btn secondary" (click)="onControlsAction('submit')">${config.submitLabel || 'Submit'}</button>
  </div>`;

    return `<section class="controls-demo-shell">
  <h3>Controls Consumer Demo</h3>
  <p>Use each wrapper independently and compose your own form layout.</p>
  <div class="controls-host">
    ${controls}
  </div>
  ${actions}
</section>`;
  }

  private controlHtmlSnippet(field: BrFormField): string {
    if (field.type === 'text') {
      return `<br-text [config]="asTextConfig(${this.fieldRef(field.id)})" (valueChange)="updateControlValue('${field.id}', $event)"></br-text>`;
    }
    if (field.type === 'single-select') {
      return `<br-single-select [config]="asSingleSelectConfig(${this.fieldRef(field.id)})" (valueChange)="updateControlValue('${field.id}', $event)"></br-single-select>`;
    }
    if (field.type === 'multi-select') {
      return `<br-multi-select [config]="asMultiSelectConfig(${this.fieldRef(field.id)})" (valueChange)="updateControlValue('${field.id}', $event)"></br-multi-select>`;
    }
    if (field.type === 'checkbox') {
      return `<br-checkbox [config]="asCheckboxConfig(${this.fieldRef(field.id)})" (valueChange)="updateControlValue('${field.id}', $event)"></br-checkbox>`;
    }
    if (field.type === 'radio') {
      return `<br-radio [config]="asRadioConfig(${this.fieldRef(field.id)})" (valueChange)="updateControlValue('${field.id}', $event)"></br-radio>`;
    }
    if (field.type === 'date') {
      return `<br-date [config]="asDateConfig(${this.fieldRef(field.id)})" (dateChange)="updateControlValue('${field.id}', $event)"></br-date>`;
    }
    return `<br-autocomplete [config]="asAutocompleteConfig(${this.fieldRef(field.id)})" (valueChange)="updateControlValue('${field.id}', $event)"></br-autocomplete>`;
  }

  private fieldRef(fieldId: string): string {
    return `controlsConfig.fields.find(f => f.id === '${fieldId}')!`;
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

  private defaultFormScssCode(): string {
    return `.form-live-preview .controls-demo-shell {
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 14px;
  background: #fff;
}

.form-live-preview .controls-demo-shell h3 {
  margin: 0 0 6px;
}

.form-live-preview .controls-demo-shell p {
  margin: 0 0 12px;
  color: #4a5568;
}

.form-live-preview .controls-host {
  display: block;
}`;
  }

  private getCodeState(tab: PlaygroundTab): DemoCodeState {
    if (tab === 'grid') return this.gridCode;
    if (tab === 'date') return this.dateCode;
    if (tab === 'form') return this.formCode;
    return this.modalCode;
  }

  private createEmptyCodeState(): DemoCodeState {
    return {
      ts: '',
      html: '',
      scss: '',
      appliedScss: '',
      activeFile: 'ts',
      collapsed: true,
      htmlBefore: '',
      htmlAfter: '',
    };
  }

  private createModalPresetConfigs(): Record<ModalPreset, BrModalConfig> {
    return {
      custom: this.defaultModalConfig(),
      info: this.modalPresetConfig('info'),
      confirm: this.modalPresetConfig('confirm'),
      delete: this.modalPresetConfig('delete'),
      form: this.modalPresetConfig('form'),
    };
  }

  private scheduleAutoApply(tab: PlaygroundTab): void {
    if (this.autoApplyTimers[tab]) {
      clearTimeout(this.autoApplyTimers[tab]);
    }
    this.autoApplyTimers[tab] = setTimeout(() => this.applyCode(tab), 350);
  }

  private parseGridActionHandler(tsCode: string): (event: BrGridActionEvent, runtimeConsole: Console) => void {
    const body = this.extractMethodBody(tsCode, 'onGridAction');
    return new Function('event', 'console', body) as (event: BrGridActionEvent, runtimeConsole: Console) => void;
  }

  private parseDateChangeHandler(tsCode: string): (value: string, runtimeConsole: Console) => void {
    const body = this.extractMethodBody(tsCode, 'onDateChange');
    return new Function('value', 'console', body) as (value: string, runtimeConsole: Console) => void;
  }

  private parseModalActionHandler(tsCode: string): (event: BrModalActionEvent, runtimeConsole: Console) => void {
    const body = this.extractMethodBody(tsCode, 'onModalAction');
    return new Function('event', 'console', body) as (event: BrModalActionEvent, runtimeConsole: Console) => void;
  }

  private parseFormActionHandler(tsCode: string): (event: BrFormActionEvent, runtimeConsole: Console) => void {
    const body = this.extractMethodBody(tsCode, 'onControlsAction')
      || this.extractMethodBody(tsCode, 'onFormAction');
    return new Function('event', 'console', body) as (event: BrFormActionEvent, runtimeConsole: Console) => void;
  }

  private extractMethodBody(tsCode: string, methodName: 'onGridAction' | 'onDateChange' | 'onModalAction' | 'onFormAction' | 'onControlsAction'): string {
    const regex = new RegExp(`${methodName}\\s*\\([^)]*\\)\\s*:\\s*void\\s*\\{([\\s\\S]*?)\\n\\s*\\}`, 'm');
    const match = tsCode.match(regex);
    if (!match || !match[1]) {
      if (methodName === 'onControlsAction') {
        return '';
      }
      throw new Error(`Missing method body for ${methodName} in TS code.`);
    }
    return match[1];
  }

  private validateTsShape(tab: PlaygroundTab, tsCode: string): void {
    const hasClass = /export\s+class\s+\w+/.test(tsCode);
    if (!hasClass) {
      throw new Error('TS validation failed: missing `export class ...` declaration.');
    }

    const importRegexByTab: Record<PlaygroundTab, RegExp> = {
      grid: /import\s*\{[^}]*BrGridConfig[^}]*\}\s*from\s*['"]\.\.\/\.\.\/common['"]/,
      date: /import\s*\{[^}]*BrDateConfig[^}]*\}\s*from\s*['"]\.\.\/\.\.\/common['"]/,
      modal: /import\s*\{[^}]*BrModalConfig[^}]*\}\s*from\s*['"]\.\.\/\.\.\/common['"]/,
      form: /import\s*\{[^}]*Br(ControlsConfig|FormConfig)[^}]*\}\s*from\s*['"]\.\.\/\.\.\/common['"]/,
    };

    if (!importRegexByTab[tab].test(tsCode)) {
      throw new Error('TS validation failed: required import from ../../common is missing.');
    }
  }

  private createRuntimeConsole(scope: 'grid' | 'date' | 'modal' | 'form'): Console {
    const logLike = (level: 'log' | 'warn' | 'error') => (...args: any[]) => {
      const message = args.map((x) => this.stringifyArg(x)).join(' ');
      this.pushLog(`[${scope}] console.${level}: ${message}`);
      // Keep browser console behavior too.
      (console[level] as (...vals: any[]) => void)(...args);
    };

    return {
      ...console,
      log: logLike('log'),
      warn: logLike('warn'),
      error: logLike('error'),
    } as Console;
  }

  private stringifyArg(value: any): string {
    if (typeof value === 'string') return value;
    try {
      return JSON.stringify(value);
    } catch {
      return String(value);
    }
  }

  private pushLog(message: string): void {
    const stamp = new Date().toLocaleTimeString();
    this.eventLog = [`[${stamp}] ${message}`, ...this.eventLog].slice(0, 40);
  }

  private extractControlsHtmlSegments(html: string): { before: string; after: string } {
    this.validateHtml(html);
    const openMatch = html.match(/<br-(text|single-select|multi-select|checkbox|radio|date|autocomplete)\b/i);
    if (!openMatch || openMatch.index === undefined) {
      throw new Error('HTML must include at least one control wrapper tag (for example <br-text ...></br-text>).');
    }

    let closeEnd = -1;
    const closeRegex = /<\/br-(text|single-select|multi-select|checkbox|radio|date|autocomplete)\s*>/gi;
    let m: RegExpExecArray | null = null;
    while ((m = closeRegex.exec(html)) !== null) {
      closeEnd = closeRegex.lastIndex;
    }
    if (closeEnd < 0) {
      throw new Error('HTML must include closing tags for control wrappers (for example </br-text>).');
    }

    return {
      before: html.slice(0, openMatch.index),
      after: html.slice(closeEnd),
    };
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
      pageSize: 5,
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
      pageSize: 5,
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
      pageSize: 5,
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

  private allControlsFormConfig(): BrFormConfig {
    return {
      title: 'All Form Controls',
      description: 'Custom/Material abstraction for textbox, selects, checkbox, radio, date and autocomplete.',
      fields: [
        { id: 'fullName', type: 'text', label: 'Full Name', placeholder: 'Enter name', required: true },
        {
          id: 'department',
          type: 'single-select',
          label: 'Department',
          options: [
            { label: 'Engineering', value: 'eng' },
            { label: 'Finance', value: 'fin' },
            { label: 'HR', value: 'hr' },
          ],
        },
        {
          id: 'skills',
          type: 'multi-select',
          label: 'Skills',
          options: [
            { label: 'Angular', value: 'angular' },
            { label: 'Java', value: 'java' },
            { label: 'SQL', value: 'sql' },
            { label: 'AWS', value: 'aws' },
          ],
        },
        { id: 'isActive', type: 'checkbox', label: 'Active User', placeholder: 'Is Active' },
        {
          id: 'employmentType',
          type: 'radio',
          label: 'Employment Type',
          options: [
            { label: 'Full Time', value: 'ft' },
            { label: 'Contract', value: 'ct' },
          ],
        },
        { id: 'startDate', type: 'date', label: 'Start Date' },
        {
          id: 'location',
          type: 'autocomplete',
          label: 'Location',
          placeholder: 'Type location',
          options: [
            { label: 'Austin', value: 'Austin' },
            { label: 'Seattle', value: 'Seattle' },
            { label: 'New York', value: 'New York' },
            { label: 'Chicago', value: 'Chicago' },
          ],
        },
      ],
      value: {
        fullName: 'Alex Cooper',
        department: 'eng',
        skills: ['angular', 'aws'],
        isActive: true,
        employmentType: 'ft',
        startDate: '2026-02-10',
        location: 'Austin',
      },
      showActions: true,
      submitLabel: 'Save Form',
      resetLabel: 'Reset Form',
    };
  }

  private simpleFormConfig(): BrFormConfig {
    return {
      title: 'Simple Form',
      fields: [
        { id: 'name', type: 'text', label: 'Name', required: true },
        { id: 'agree', type: 'checkbox', label: 'I Agree' },
        { id: 'when', type: 'date', label: 'Date' },
      ],
      value: { name: '', agree: false, when: '' },
      showActions: true,
      submitLabel: 'Submit',
      resetLabel: 'Reset',
    };
  }

  private buildSingleControlVariantConfig(control: Exclude<ControlPlayground, 'all'>, variant: string): BrFormConfig {
    if (control === 'date') {
      return this.singleControlConfig(
        { id: 'dateControl', type: 'date', label: 'Start Date', placeholder: 'Select start date', required: variant === 'bounded' },
        variant === 'disabled' ? '2026-03-10' : '2026-02-10',
        `${this.controlPlaygroundLabels[control]} Playground`,
        `Variant: ${this.controlVariantLabel(variant)}`,
        variant === 'disabled',
      );
    }

    if (control === 'text') {
      return this.singleControlConfig(
        { id: 'textControl', type: 'text', label: 'Employee Name', placeholder: 'Type full name', required: variant === 'required', disabled: variant === 'disabled' },
        variant === 'disabled' ? 'Read-only value' : '',
        `${this.controlPlaygroundLabels[control]} Playground`,
        `Variant: ${this.controlVariantLabel(variant)}`,
      );
    }

    if (control === 'single-select') {
      return this.singleControlConfig(
        {
          id: 'singleSelectControl',
          type: 'single-select',
          label: 'Department',
          required: variant === 'required',
          disabled: variant === 'disabled',
          options: [
            { label: 'Engineering', value: 'eng' },
            { label: 'Finance', value: 'fin' },
            { label: 'HR', value: 'hr' },
            { label: 'Operations', value: 'ops' },
          ],
        },
        variant === 'disabled' ? 'fin' : '',
        `${this.controlPlaygroundLabels[control]} Playground`,
        `Variant: ${this.controlVariantLabel(variant)}`,
      );
    }

    if (control === 'multi-select') {
      return this.singleControlConfig(
        {
          id: 'multiSelectControl',
          type: 'multi-select',
          label: 'Skills',
          disabled: variant === 'disabled',
          options: [
            { label: 'Angular', value: 'angular' },
            { label: 'Java', value: 'java' },
            { label: 'SQL', value: 'sql' },
            { label: 'AWS', value: 'aws' },
          ],
        },
        variant === 'preselected' ? ['angular', 'aws'] : [],
        `${this.controlPlaygroundLabels[control]} Playground`,
        `Variant: ${this.controlVariantLabel(variant)}`,
      );
    }

    if (control === 'checkbox') {
      return this.singleControlConfig(
        { id: 'checkboxControl', type: 'checkbox', label: 'Enable notifications', disabled: variant === 'disabled' },
        variant === 'checked' || variant === 'disabled',
        `${this.controlPlaygroundLabels[control]} Playground`,
        `Variant: ${this.controlVariantLabel(variant)}`,
      );
    }

    if (control === 'radio') {
      return this.singleControlConfig(
        {
          id: 'radioControl',
          type: 'radio',
          label: 'Employment Type',
          disabled: variant === 'disabled',
          options: [
            { label: 'Full Time', value: 'ft' },
            { label: 'Contract', value: 'ct' },
            { label: 'Intern', value: 'in' },
          ],
        },
        variant === 'preselected' ? 'ct' : '',
        `${this.controlPlaygroundLabels[control]} Playground`,
        `Variant: ${this.controlVariantLabel(variant)}`,
      );
    }

    return this.singleControlConfig(
      {
        id: 'autocompleteControl',
        type: 'autocomplete',
        label: 'Location',
        placeholder: 'Search location',
        disabled: variant === 'disabled',
        options: [
          { label: 'Austin', value: 'Austin' },
          { label: 'Seattle', value: 'Seattle' },
          { label: 'New York', value: 'New York' },
          { label: 'Chicago', value: 'Chicago' },
          { label: 'Denver', value: 'Denver' },
        ],
      },
      variant === 'prefilled' ? 'Seattle' : '',
      `${this.controlPlaygroundLabels[control]} Playground`,
      `Variant: ${this.controlVariantLabel(variant)}`,
    );
  }

  private singleControlConfig(field: BrFormField, value: any, title: string, description: string, disabled = false): BrFormConfig {
    const fieldWithState: BrFormField = disabled ? { ...field, disabled: true } : field;
    return {
      title,
      description,
      fields: [fieldWithState],
      value: { [field.id]: value },
      showActions: true,
      submitLabel: 'Apply',
      resetLabel: 'Clear',
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
