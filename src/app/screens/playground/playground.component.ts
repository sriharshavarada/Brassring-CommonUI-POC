import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import {
  BrAdvancedDateConfiguration,
  BrBrandingConfig,
  BrBrandingMode,
  BrandingRuntimeService,
  EnterpriseBrandingAdapter,
  EnterpriseBrandingPayload,
  BrGridActionEvent,
  BrGridComponent,
  BrGridConfig,
  BrGridDataResult,
  BrGridQueryState,
  BrGridRowMetaMap,
  BrModalActionEvent,
  BrModalComponent,
  BrModalConfig,
  BrAutocompleteComponent,
  BrAutocompleteConfig,
  BrButtonComponent,
  BrButtonConfig,
  BrCheckboxComponent,
  BrCheckboxConfig,
  BrControlActionEvent as BrFormActionEvent,
  BrControlActionSource as BrFormActionSource,
  BrControlField as BrFormField,
  BrControlsConfig as BrFormConfig,
  BrDateConfig,
  BrDateComponent,
  BrMultiSelectConfig,
  BrMultiSelectComponent,
  BrRadioConfig,
  BrRadioComponent,
  BrSingleSelectConfig,
  BrSingleSelectComponent,
  BrTextConfig,
  BrTextComponent,
  BrTextAreaConfig,
  BrTextAreaComponent,
  TalentGatewayBrandingAdapter,
  TalentGatewayBrandingPayload,
  ControlRegistryService,
  ControlUiMode,
  DateUiMode,
  ModalUiMode,
  RuntimeUiConfigService,
  UiMode,
} from '@sriharshavarada/br-ui-wrapper';
import { JsonWorkbenchComponent } from './components/json-workbench/json-workbench.component';
import { CodeEditorComponent, CodeLanguage } from './components/code-editor/code-editor.component';

type PlaygroundTab = 'grid' | 'date' | 'modal' | 'form' | 'button';
type CodeFile = 'ts' | 'html' | 'scss';

type GridPreset = 'complex' | 'moderate' | 'rich' | 'simple' | 'remote';
type DatePreset = 'default' | 'compact' | 'disabled';
type ModalPreset = 'custom' | 'info' | 'confirm' | 'delete' | 'form';
type FormPreset = 'all-controls' | 'simple';
type ButtonPreset = 'primary' | 'secondary' | 'outline' | 'danger' | 'text' | 'icon' | 'loading' | 'full-width' | 'with-icons';
type ControlPlayground = 'all' | 'date' | 'text' | 'text-area' | 'single-select' | 'multi-select' | 'checkbox' | 'radio' | 'autocomplete';
type ControlConfig =
  | BrTextConfig
  | BrTextAreaConfig
  | BrButtonConfig
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

type BrandingDemoKind = 'enterprise' | 'talent-gateway' | 'library';

interface PlaygroundBrandingDemoConfig {
  kind: BrandingDemoKind;
  mode: BrBrandingMode;
  payload: EnterpriseBrandingPayload | TalentGatewayBrandingPayload | BrBrandingConfig;
}

type BrandingStudioTab = 'config' | 'code';

const PLAYGROUND_DATE_CONFIGURATION: BrAdvancedDateConfiguration = {
  Disabledaysofweek: ['', '', '', 3, '', '', ''],
  Firstdayofweek: '3',
  Defaulttodaysdate: true,
  Datedisplay: '1',
  Currentdate: 'year',
  Customdate: 'year',
  Minslidervalue: '-10',
  Maxslidervalue: '10',
  Mindate: '-1m',
  Maxdate: '+3m',
  includeToday: true,
};

const ENTERPRISE_BRANDING_SAMPLE: EnterpriseBrandingPayload = {
  baseFontColor: '#1f2937',
  baseFontSize: '14px',
  titleFontColor: '#0f172a',
  fontFamily: 'Tahoma',
  primaryButtonColor: '#0f62fe',
  primaryButtonHoverColor: '#393939',
  secondaryButtonColor: '#393939',
  secondaryButtonHoverColor: '#4c4c4c',
  primaryButtonTextColor: '#fff',
  secondaryButtonTextColor: '#fff',
  primaryButtonTextHoverColor: '#fff',
  secondaryButtonTextHoverColor: '#fff',
  linkColor: '#0f62fe',
  labelFontColor: '#334155',
  foreGroundColor: '#008571',
  welcomeTextFontSize: '24px',
  welcomeTextFontColor: '#ffffff',
  backgroundImage: '/mobile/img/welcomebackground.jpg',
  backgroundColor: '#fff',
  heroImage: '/mobile/img/herospace.jpg',
  headerBackgroundColor: '#008571',
  headerTextColor: '#fff',
  sectionBackgroundColor: '#f0f2f4',
  tableHeaderBackgroundColor: '#ffffff',
  tableHeaderFontColor: '#121212',
  tableAltColor: 'transparent',
};

const TALENT_GATEWAY_BRANDING_SAMPLE: TalentGatewayBrandingPayload = {
  Responsive_BackgroundColor: '#ffffff',
  Responsive_BackgroundImage: 'https://sstagingjobs.brassring.com/img/26679/Thompson-External-careersite.png',
  Responsive_BaseFontColor: '#000000',
  Responsive_BaseFontFamily: "'Lato',sans-serif",
  Responsive_BaseFontSize: '16px',
  Responsive_ButtonBackgroundColor: '#FDBF77',
};

const LIBRARY_BRANDING_SAMPLE: BrBrandingConfig = {
  fontFamily: 'Georgia, serif',
  baseFontSize: '15px',
  welcomeTextFontSize: '24px',
  light: {
    baseFontColor: '#1f2937',
    titleFontColor: '#0f172a',
    labelFontColor: '#334155',
    foregroundColor: '#0f766e',
    accentColor: '#0f766e',
    focusColor: '#ea580c',
    focusRingColor: 'color-mix(in srgb, #ea580c 24%, transparent)',
    badgeBackgroundColor: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
    badgeTextColor: '#92400e',
    badgeDotColor: '#d97706',
    dangerColor: '#dc2626',
    overlayColor: 'rgba(15, 23, 42, 0.22)',
    shadowColor: 'rgba(15, 23, 42, 0.18)',
    backgroundColor: '#ffffff',
    sectionBackgroundColor: '#f8fafc',
    sectionBorderColor: '#dbe4ee',
    inputBackgroundColor: '#ffffff',
    inputBorderColor: '#cbd5e1',
    inputTextColor: '#1f2937',
    inputPlaceholderColor: '#94a3b8',
    inputDisabledBackgroundColor: '#e2e8f0',
    inputDisabledTextColor: '#64748b',
    primaryButtonColor: '#0f766e',
    primaryButtonHoverColor: '#115e59',
    primaryButtonTextColor: '#ffffff',
    primaryButtonTextHoverColor: '#ffffff',
    secondaryButtonColor: '#e2e8f0',
    secondaryButtonHoverColor: '#cbd5e1',
    secondaryButtonTextColor: '#0f172a',
    secondaryButtonTextHoverColor: '#0f172a',
    linkColor: '#0f766e',
    welcomeTextFontColor: '#ffffff',
    headerBackgroundColor: '#0f766e',
    headerTextColor: '#ffffff',
    tableHeaderBackgroundColor: '#f8fafc',
    tableHeaderFontColor: '#0f172a',
    tableAltColor: '#f8fafc',
  },
  dark: {
    baseFontColor: '#e2e8f0',
    titleFontColor: '#f8fafc',
    labelFontColor: '#cbd5e1',
    foregroundColor: '#5eead4',
    accentColor: '#5eead4',
    focusColor: '#f59e0b',
    focusRingColor: 'color-mix(in srgb, #f59e0b 28%, transparent)',
    badgeBackgroundColor: 'linear-gradient(135deg, #1f2937 0%, #334155 100%)',
    badgeTextColor: '#fde68a',
    badgeDotColor: '#f59e0b',
    dangerColor: '#f87171',
    overlayColor: 'rgba(2, 6, 23, 0.58)',
    shadowColor: 'rgba(2, 6, 23, 0.42)',
    backgroundColor: '#0f172a',
    sectionBackgroundColor: '#111827',
    sectionBorderColor: '#334155',
    inputBackgroundColor: '#111827',
    inputBorderColor: '#334155',
    inputTextColor: '#e2e8f0',
    inputPlaceholderColor: '#94a3b8',
    inputDisabledBackgroundColor: '#1f2937',
    inputDisabledTextColor: '#64748b',
    primaryButtonColor: '#14b8a6',
    primaryButtonHoverColor: '#0d9488',
    primaryButtonTextColor: '#042f2e',
    primaryButtonTextHoverColor: '#042f2e',
    secondaryButtonColor: '#334155',
    secondaryButtonHoverColor: '#475569',
    secondaryButtonTextColor: '#f8fafc',
    secondaryButtonTextHoverColor: '#f8fafc',
    linkColor: '#5eead4',
    welcomeTextFontColor: '#f8fafc',
    headerBackgroundColor: '#111827',
    headerTextColor: '#f8fafc',
    tableHeaderBackgroundColor: '#1e293b',
    tableHeaderFontColor: '#f8fafc',
    tableAltColor: '#111827',
  },
};

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
    BrTextAreaComponent,
    BrButtonComponent,
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

  readonly gridModes: UiMode[] = ['CUSTOM', 'MATERIAL', 'CANVAS', 'PRIMENG'];
  readonly dateModes: DateUiMode[] = ['CUSTOM', 'MATERIAL', 'PRIMENG'];
  readonly modalModes: ModalUiMode[] = ['CUSTOM', 'MATERIAL', 'PRIMENG'];
  readonly controlModes: ControlUiMode[] = ['CUSTOM', 'MATERIAL', 'PRIMENG'];

  readonly gridPresetLabels: Record<GridPreset, string> = {
    complex: 'Complex Grid',
    moderate: 'Moderate Grid',
    rich: 'Rich Cells Grid',
    simple: 'Simple Grid',
    remote: 'Remote Grid',
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
  readonly buttonPresetLabels: Record<ButtonPreset, string> = {
    primary: 'Primary',
    secondary: 'Secondary',
    outline: 'Outline',
    danger: 'Danger',
    text: 'Text',
    icon: 'Icon Only',
    loading: 'Loading',
    'full-width': 'Full Width',
    'with-icons': 'With Icons',
  };
  readonly controlPlaygroundLabels: Record<ControlPlayground, string> = {
    all: 'All Controls',
    date: 'Date',
    text: 'Text Box',
    'text-area': 'Text Area',
    'single-select': 'Single Select',
    'multi-select': 'Multi Select',
    checkbox: 'Checkbox',
    radio: 'Radio',
    autocomplete: 'Autocomplete',
  };

  readonly codeFiles: CodeFile[] = ['ts', 'html', 'scss'];
  readonly brandingModes: BrBrandingMode[] = ['light', 'dark'];

  activeGridPreset: GridPreset = 'complex';
  activeDatePreset: DatePreset = 'default';
  activeModalPreset: ModalPreset = 'custom';
  activeFormPreset: FormPreset = 'all-controls';
  activeButtonPreset: ButtonPreset = 'primary';
  remoteDemoDelayMs = 3000;
  remoteDemoForceError = false;
  remoteDemoReturnEmpty = false;
  activeControlPlayground: ControlPlayground = 'all';
  activeControlVariant = 'default';

  gridConfigCollapsed = true;
  dateConfigCollapsed = false;
  modalConfigCollapsed = true;
  formConfigCollapsed = true;
  buttonConfigCollapsed = true;

  gridConfig: BrGridConfig = this.complexGridConfig();
  dateConfig: BrDateConfig = this.defaultDateConfig();
  modalConfig: BrModalConfig = this.defaultModalConfig();
  formConfig: BrFormConfig = this.allControlsFormConfig();
  buttonConfig: BrButtonConfig = this.primaryButtonConfig();
  brandingDemoConfig: PlaygroundBrandingDemoConfig | null = null;
  brandingStudioDraft: PlaygroundBrandingDemoConfig | null = null;
  brandingStudioOpen = false;
  brandingStudioTab: BrandingStudioTab = 'config';
  modalPresetConfigs!: Record<ModalPreset, BrModalConfig>;

  gridCode: DemoCodeState = this.createEmptyCodeState();
  dateCode: DemoCodeState = this.createEmptyCodeState();
  modalCode: DemoCodeState = this.createEmptyCodeState();
  formCode: DemoCodeState = this.createEmptyCodeState();
  buttonCode: DemoCodeState = this.createEmptyCodeState();
  private formControlConfigMap: Record<string, ControlConfig> = {};

  codeError = {
    grid: '',
    date: '',
    modal: '',
    form: '',
    button: '',
  };

  eventLog: string[] = [];
  private autoApplyTimers: Partial<Record<PlaygroundTab, ReturnType<typeof setTimeout>>> = {};
  private runtimeHandlers: {
    gridAction?: (event: BrGridActionEvent, runtimeConsole: Console) => void;
    dateChange?: (value: string, runtimeConsole: Console) => void;
    modalAction?: (event: BrModalActionEvent, runtimeConsole: Console) => void;
    formAction?: (event: BrFormActionEvent, runtimeConsole: Console) => void;
    buttonClick?: (event: MouseEvent, runtimeConsole: Console) => void;
    buttonControlEvent?: (event: any, runtimeConsole: Console) => void;
  } = {};

  constructor(
    public readonly runtimeUiConfig: RuntimeUiConfigService,
    public readonly brandingRuntime: BrandingRuntimeService,
    private readonly controlRegistry: ControlRegistryService,
  ) {
    this.modalPresetConfigs = this.createModalPresetConfigs();
    this.modalConfig = this.clone(this.modalPresetConfigs[this.activeModalPreset]);
    this.resetGridCodeFromConfig();
    this.resetDateCodeFromConfig();
    this.resetModalCodeFromConfig();
    this.resetFormCodeFromConfig();
    this.resetButtonCodeFromConfig();
    this.rebuildFormControlConfigs();
  }

  get modes() {
    return this.runtimeUiConfig.getModesSnapshot();
  }

  get brandingMode(): BrBrandingMode {
    return this.brandingRuntime.getModeSnapshot();
  }

  get gridPresets(): GridPreset[] {
    return ['complex', 'moderate', 'rich', 'simple', 'remote'];
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

  get buttonPresets(): ButtonPreset[] {
    return ['primary', 'secondary', 'outline', 'danger', 'text', 'icon', 'loading', 'full-width', 'with-icons'];
  }

  get controlPlaygrounds(): ControlPlayground[] {
    return ['all', 'date', 'text', 'text-area', 'single-select', 'multi-select', 'checkbox', 'radio', 'autocomplete'];
  }

  get controlVariants(): string[] {
    switch (this.activeControlPlayground) {
      case 'date':
        return ['default-config', 'bounded-config', 'disabled-config', 'events-demo', 'registry-demo', 'ngmodel-simple'];
      case 'text':
        return ['default-config', 'required-config', 'disabled-config', 'events-demo', 'registry-demo', 'direct-input', 'ngmodel-simple'];
      case 'text-area':
        return ['default-config', 'required-config', 'disabled-config', 'events-demo', 'registry-demo', 'ngmodel-simple'];
      case 'single-select':
        return ['default-config', 'required-config', 'disabled-config', 'events-demo', 'registry-demo', 'ngmodel-simple'];
      case 'multi-select':
        return ['default-config', 'preselected-config', 'disabled-config', 'events-demo', 'registry-demo', 'ngmodel-simple'];
      case 'checkbox':
        return ['unchecked-config', 'checked-config', 'disabled-config', 'events-demo', 'registry-demo', 'ngmodel-simple'];
      case 'radio':
        return ['default-config', 'preselected-config', 'disabled-config', 'events-demo', 'registry-demo', 'ngmodel-simple'];
      case 'autocomplete':
        return ['default-config', 'prefilled-config', 'disabled-config', 'events-demo', 'registry-demo', 'ngmodel-simple'];
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

  setButtonMode(mode: ControlUiMode): void {
    this.runtimeUiConfig.setMode('button' as any, mode);
    this.pushLog(`Button mode changed to ${mode}`);
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
    } else if (preset === 'remote') {
      this.gridConfig = this.clone(this.remoteGridConfig());
    } else if (preset === 'rich') {
      this.gridConfig = this.clone(this.richGridConfig());
    } else if (preset === 'moderate') {
      this.gridConfig = this.clone(this.moderateGridConfig());
    } else {
      this.gridConfig = this.clone(this.complexGridConfig());
    }
    this.resetGridCodeFromConfig();
    this.pushLog(`Loaded ${this.gridPresetLabels[preset]}`);
    if (preset === 'remote') {
      this.loadRemoteGridData(this.gridConfig.queryState || { pageIndex: 0, pageSize: this.gridConfig.pageSize || 5 });
    }
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

  selectButtonPreset(preset: ButtonPreset): void {
    this.activeButtonPreset = preset;
    this.buttonConfig = this.buildButtonPresetConfig(preset);
    this.resetButtonCodeFromConfig();
    this.pushLog(`Loaded ${this.buttonPresetLabels[preset]} button`);
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

  setBrandingMode(mode: BrBrandingMode): void {
    if (!this.brandingStudioDraft) {
      return;
    }
    this.brandingStudioDraft = {
      ...this.brandingStudioDraft,
      mode,
    };
  }

  setBrandingStudioTab(tab: BrandingStudioTab): void {
    this.brandingStudioTab = tab;
  }

  get brandingStudioSourceLabel(): string {
    if (!this.brandingDemoConfig) {
      return 'Default Branding';
    }
    return this.brandingDemoConfig.kind === 'enterprise'
      ? 'Enterprise Branding'
      : this.brandingDemoConfig.kind === 'talent-gateway'
        ? 'Talent Gateway Branding'
        : 'Library Branding';
  }

  get brandingStudioActiveMode(): BrBrandingMode {
    return this.brandingDemoConfig?.mode ?? 'light';
  }

  brandingStudioCode(): string {
    return this.buildBrandingDemoTsBlock(this.brandingStudioDraft ?? this.defaultBrandingDemoConfig('enterprise'));
  }

  controlVariantLabel(variant: string): string {
    return variant.replace(/-/g, ' ').replace(/\b\w/g, (x) => x.toUpperCase());
  }

  controlsConfigEditorTitle(): string {
    if (this.activeControlPlayground === 'all') {
      return 'Controls Config Editor';
    }
    if (this.isDirectInputVariant()) {
      return `${this.controlPlaygroundLabels[this.activeControlPlayground]} - ${this.controlVariantLabel(this.activeControlVariant)} - Direct Input Notes`;
    }
    return `${this.controlPlaygroundLabels[this.activeControlPlayground]} - ${this.controlVariantLabel(this.activeControlVariant)} - Config Editor`;
  }

  controlsConfigWorkbenchTitle(): string {
    if (this.activeControlPlayground === 'all') {
      return 'Controls Config';
    }
    return `${this.controlPlaygroundLabels[this.activeControlPlayground]} Config`;
  }

  brandingConfigWorkbenchTitle(): string {
    if (!this.brandingStudioDraft) {
      return 'Branding Config';
    }
    if (this.brandingStudioDraft.kind === 'enterprise') {
      return 'Enterprise Branding Config';
    }
    if (this.brandingStudioDraft.kind === 'talent-gateway') {
      return 'Talent Gateway Branding Config';
    }
    return 'Library Branding Config';
  }

  controlsCodeStudioTitle(): string {
    if (this.activeControlPlayground === 'all') {
      return 'Controls Code Studio';
    }
    return `${this.controlPlaygroundLabels[this.activeControlPlayground]} - ${this.controlVariantLabel(this.activeControlVariant)} - Code Studio`;
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
      'text-area': 'text',
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
      'text-area': 'text',
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

    if (tab === 'button') {
      this.buttonConfigCollapsed = !this.buttonConfigCollapsed;
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

    if (tab === 'button') {
      this.buttonCode.collapsed = !this.buttonCode.collapsed;
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

    if (tab === 'button') {
      this.applyButtonCode();
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

    if (tab === 'button') {
      this.resetButtonCodeFromConfig();
      this.codeError.button = '';
      return;
    }

    this.resetModalCodeFromConfig();
    this.codeError.modal = '';
  }

  onGridConfigChange(config: BrGridConfig): void {
    this.gridConfig = config;
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
    if (this.activeControlPlayground === 'all') {
      this.activeFormPreset = 'all-controls';
    }
    this.rebuildFormControlConfigs();
    this.syncFormTsCode();
    this.syncFormHtmlCode();
    this.pushLog('Controls JSON applied');
  }

  onButtonConfigChange(config: BrButtonConfig): void {
    this.buttonConfig = config;
    this.buttonCode.ts = this.buildButtonTsCode(this.buttonConfig);
    this.scheduleAutoApply('button');
    this.pushLog('Button JSON applied');
  }

  onBrandingConfigChange(config: EnterpriseBrandingPayload | TalentGatewayBrandingPayload | BrBrandingConfig): void {
    if (!this.brandingStudioDraft) {
      return;
    }

    this.brandingStudioDraft = {
      ...this.brandingStudioDraft,
      payload: config,
    };
  }

  openBrandingStudio(): void {
    this.brandingStudioDraft = this.clone(this.brandingDemoConfig ?? this.defaultBrandingDemoConfig('enterprise'));
    this.brandingStudioTab = 'config';
    this.brandingStudioOpen = true;
  }

  closeBrandingStudio(): void {
    this.brandingStudioOpen = false;
  }

  selectBrandingSource(kind: BrandingDemoKind): void {
    const currentMode = this.brandingStudioDraft?.mode ?? this.brandingDemoConfig?.mode ?? 'light';
    this.brandingStudioDraft = this.defaultBrandingDemoConfig(kind, currentMode);
  }

  applyBrandingStudio(): void {
    if (!this.brandingStudioDraft) {
      return;
    }

    this.brandingDemoConfig = this.clone(this.brandingStudioDraft);
    this.applyBrandingDemo(this.brandingDemoConfig);
    this.brandingStudioOpen = false;
  }

  resetBrandingStudioToDefaults(): void {
    if (!this.brandingStudioDraft) {
      this.brandingStudioDraft = this.defaultBrandingDemoConfig('enterprise');
      return;
    }

    this.brandingStudioDraft = this.defaultBrandingDemoConfig(this.brandingStudioDraft.kind, this.brandingStudioDraft.mode);
  }

  clearAppliedBranding(): void {
    this.resetBrandingDemo();
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
    if (this.activeGridPreset === 'remote' && event.source === 'query-change' && event.query) {
      this.loadRemoteGridData(event.query);
    }
    this.applyRichGridDemoFeedback(event);
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

  onWrapperControlEvent(fieldId: string, event: { type?: string; value?: unknown }): void {
    const valueText = JSON.stringify(event?.value ?? '');
    this.pushLog(`Control event [${fieldId}]: ${event?.type || 'unknown'} -> ${valueText}`);
  }

  runRegistryLookupDemo(): void {
    const firstField = this.formConfig.fields[0];
    if (!firstField) return;

    const sampleId = firstField.id;
    const sampleName = firstField.name || 'registry-group';
    const sampleClass = (firstField.className || 'registry-shared').split(/\s+/)[0];

    const byId = this.controlRegistry.valueById(sampleId);
    const byName = this.controlRegistry.valuesByName(sampleName);
    const byClass = this.controlRegistry.valuesByClass(sampleClass);

    this.pushLog(`Registry valueById('${sampleId}') => ${JSON.stringify(byId)}`);
    this.pushLog(`Registry valuesByName('${sampleName}') => ${JSON.stringify(byName)}`);
    this.pushLog(`Registry valuesByClass('${sampleClass}') => ${JSON.stringify(byClass)}`);
  }

  asTextConfig(field: BrFormField): BrTextConfig {
    return {
      id: field.id,
      controlId: field.controlId,
      name: field.name,
      className: field.className,
      meta: field.meta,
      label: field.label,
      value: String(this.controlValue(field) ?? ''),
      placeholder: field.placeholder,
      disabled: field.disabled,
      required: field.required,
    };
  }

  asTextAreaConfig(field: BrFormField): BrTextAreaConfig {
    return {
      id: field.id,
      controlId: field.controlId,
      name: field.name,
      className: field.className,
      meta: field.meta,
      label: field.label,
      value: String(this.controlValue(field) ?? ''),
      placeholder: field.placeholder,
      rows: field.rows,
      maxLength: field.maxLength,
      disabled: field.disabled,
      required: field.required,
    };
  }

  asSingleSelectConfig(field: BrFormField): BrSingleSelectConfig {
    return {
      id: field.id,
      controlId: field.controlId,
      name: field.name,
      className: field.className,
      meta: field.meta,
      label: field.label,
      value: this.controlValue(field),
      options: field.options || [],
      disabled: field.disabled,
      required: field.required,
    };
  }

  asMultiSelectConfig(field: BrFormField): BrMultiSelectConfig {
    return {
      id: field.id,
      controlId: field.controlId,
      name: field.name,
      className: field.className,
      meta: field.meta,
      label: field.label,
      value: Array.isArray(this.controlValue(field)) ? this.controlValue(field) : [],
      options: field.options || [],
      disabled: field.disabled,
      required: field.required,
    };
  }

  asCheckboxConfig(field: BrFormField): BrCheckboxConfig {
    return {
      id: field.id,
      controlId: field.controlId,
      name: field.name,
      className: field.className,
      meta: field.meta,
      label: field.label,
      value: !!this.controlValue(field),
      checked: !!this.controlValue(field),
      disabled: field.disabled,
      required: field.required,
    };
  }

  asRadioConfig(field: BrFormField): BrRadioConfig {
    return {
      id: field.id,
      controlId: field.controlId,
      name: field.name,
      className: field.className,
      meta: field.meta,
      label: field.label,
      value: this.controlValue(field),
      options: field.options || [],
      disabled: field.disabled,
      required: field.required,
    };
  }

  asAutocompleteConfig(field: BrFormField): BrAutocompleteConfig {
    return {
      id: field.id,
      controlId: field.controlId,
      name: field.name,
      className: field.className,
      meta: field.meta,
      label: field.label,
      value: String(this.controlValue(field) ?? ''),
      options: field.options || [],
      placeholder: field.placeholder,
      disabled: field.disabled,
      required: field.required,
    };
  }

  asDateConfig(field: BrFormField): BrDateConfig {
    return {
      id: field.id,
      controlId: field.controlId,
      name: field.name,
      className: field.className,
      meta: field.meta,
      label: field.label,
      value: this.controlValue(field) || '',
      minDate: field.minDate ? new Date(field.minDate) : null,
      maxDate: field.maxDate ? new Date(field.maxDate) : null,
      language: field.language,
      locale: field.locale,
      dateFormat: field.dateFormat,
      dateConfiguration: field.dateConfiguration ?? field.DateConfiguration ?? null,
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

  getTextAreaConfig(field: BrFormField): BrTextAreaConfig {
    return this.formControlConfigMap[field.id] as BrTextAreaConfig;
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

  isNgModelOnlyVariant(): boolean {
    return this.activeControlPlayground !== 'all' && this.activeControlVariant === 'ngmodel-simple';
  }

  isDirectInputVariant(): boolean {
    return this.activeControlPlayground === 'text' && this.activeControlVariant === 'direct-input';
  }

  isNgModelOnlyField(field: BrFormField): boolean {
    return this.isNgModelOnlyVariant() && this.formConfig.fields.length === 1 && this.formConfig.fields[0].id === field.id;
  }

  isDirectInputField(field: BrFormField): boolean {
    return this.isDirectInputVariant() && this.formConfig.fields.length === 1 && this.formConfig.fields[0].id === field.id;
  }

  isRegistryDemoVariant(): boolean {
    return this.activeControlPlayground !== 'all' && this.activeControlVariant === 'registry-demo';
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
      if (this.isDirectInputVariant() && this.activeControlPlayground === 'text') {
        this.applyDirectInputTextFormCode();
        return;
      }
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

  private applyButtonCode(): void {
    try {
      this.validateTsShape('button', this.buttonCode.ts);
      const parsed = this.parseConfigFromTs<BrButtonConfig>(this.buttonCode.ts, 'buttonConfig');
      const htmlSegments = this.extractHtmlSegments(this.buttonCode.html, 'br-button');
      this.validateScss(this.buttonCode.scss);
      this.runtimeHandlers.buttonClick = this.parseButtonClickHandler(this.buttonCode.ts);
      this.runtimeHandlers.buttonControlEvent = this.parseButtonControlEventHandler(this.buttonCode.ts);

      this.buttonConfig = parsed;
      this.buttonCode.htmlBefore = htmlSegments.before;
      this.buttonCode.htmlAfter = htmlSegments.after;
      this.buttonCode.appliedScss = this.buttonCode.scss;
      this.codeError.button = '';
      this.pushLog('Applied Button TS/HTML/SCSS code');
    } catch (error) {
      this.codeError.button = error instanceof Error ? error.message : 'Invalid button TS config block';
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

  private resetButtonCodeFromConfig(): void {
    this.buttonCode.ts = this.buildButtonTsCode(this.buttonConfig);
    this.buttonCode.html = this.defaultButtonHtmlCode();
    this.buttonCode.scss = this.defaultButtonScssCode();
    const htmlSegments = this.extractHtmlSegments(this.buttonCode.html, 'br-button');
    this.buttonCode.htmlBefore = htmlSegments.before;
    this.buttonCode.htmlAfter = htmlSegments.after;
    this.buttonCode.appliedScss = this.buttonCode.scss;
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

  onButtonClick(event: MouseEvent): void {
    const runtimeConsole = this.createRuntimeConsole('button');
    if (this.runtimeHandlers.buttonClick) {
      this.runtimeHandlers.buttonClick(event, runtimeConsole);
    } else {
      this.pushLog(`[button] click ${this.buttonConfig.id || this.buttonConfig.label || 'button'}`);
    }
  }

  onButtonControlEvent(event: any): void {
    const runtimeConsole = this.createRuntimeConsole('button');
    if (this.runtimeHandlers.buttonControlEvent) {
      this.runtimeHandlers.buttonControlEvent(event, runtimeConsole);
    } else {
      this.pushLog(`[button] controlEvent ${this.stringifyArg(event)}`);
    }
  }

  private rebuildFormControlConfigs(): void {
    const next: Record<string, ControlConfig> = {};
    for (const field of this.formConfig.fields || []) {
      if (field.type === 'text') {
        next[field.id] = this.asTextConfig(field);
      } else if (field.type === 'text-area') {
        next[field.id] = this.asTextAreaConfig(field);
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

  private applyHtmlSegments(tab: PlaygroundTab, controlTag: 'br-grid' | 'br-date' | 'br-modal' | 'br-button'): void {
    const code = this.getCodeState(tab);
    const segments = this.extractHtmlSegments(code.html, controlTag);
    code.htmlBefore = segments.before;
    code.htmlAfter = segments.after;
  }

  private extractHtmlSegments(html: string, controlTag: 'br-grid' | 'br-date' | 'br-modal' | 'br-button'): { before: string; after: string } {
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
    if (config.dataMode === 'remote') {
      const remoteConfig = {
        ...config,
        result: {
          rows: [],
          totalCount: 0,
          loading: false,
        },
      };

      return `import { BrGridConfig, BrGridActionEvent, BrGridQueryState, BrGridDataResult } from '@sriharshavarada/br-ui-wrapper';

export class YourFeatureComponent {
  gridConfig: BrGridConfig = ${JSON.stringify(remoteConfig, null, 2)};

  onGridAction(event: BrGridActionEvent): void {
    if (event.source === 'query-change' && event.query) {
      this.loadGridPage(event.query);
      return;
    }

    console.log('Grid action:', event);
  }

  loadGridPage(query: BrGridQueryState): void {
    this.gridConfig = {
      ...this.gridConfig,
      queryState: query,
      result: {
        ...(this.gridConfig.result || { rows: [], totalCount: 0 }),
        loading: true,
        errorMessage: undefined,
      },
    };

    // Replace this with your real AJAX / HttpClient call.
    // Example:
    // this.userService.getUsers(query).subscribe((result) => { ... });
    this.fetchGridPage(query).then((result) => {
      this.gridConfig = {
        ...this.gridConfig,
        queryState: query,
        result,
      };
    });
  }

  async fetchGridPage(query: BrGridQueryState): Promise<BrGridDataResult> {
    console.log('Call server with query:', query);

    // Temporary demo-only mock.
    // In a real feature, move this logic to your API/service layer
    // and return the backend result.
    return this.mockServerQuery(query);
  }

  private async mockServerQuery(query: BrGridQueryState): Promise<BrGridDataResult> {
    const allRows = this.getAllRowsFromServer();
    const searchedRows = this.applyServerSearch(allRows, query);
    const filteredRows = this.applyServerFilters(searchedRows, query);
    const sortedRows = this.applyServerSorting(filteredRows, query);
    const pagedRows = this.applyServerPagination(sortedRows, query);

    return {
      rows: pagedRows,
      totalCount: filteredRows.length,
      query,
    };
  }

  private getAllRowsFromServer(): any[] {
    // Replace with real API data.
    return [];
  }

  private applyServerSearch(rows: any[], query: BrGridQueryState): any[] {
    const searchText = (query.searchText || '').trim().toLowerCase();
    if (!searchText) {
      return rows;
    }

    return rows.filter((row) =>
      Object.values(row).some((value) =>
        String(value ?? '').toLowerCase().includes(searchText),
      ),
    );
  }

  private applyServerFilters(rows: any[], query: BrGridQueryState): any[] {
    const filters = query.filters || [];
    if (!filters.length) {
      return rows;
    }

    return rows.filter((row) =>
      filters.every((filter) => {
        const left = row[filter.field];
        const right = filter.value;
        switch (filter.operator) {
          case 'equals':
            return String(left ?? '') === String(right ?? '');
          case 'startsWith':
            return String(left ?? '').startsWith(String(right ?? ''));
          case 'endsWith':
            return String(left ?? '').endsWith(String(right ?? ''));
          case 'contains':
          default:
            return String(left ?? '').toLowerCase().includes(String(right ?? '').toLowerCase());
        }
      }),
    );
  }

  private applyServerSorting(rows: any[], query: BrGridQueryState): any[] {
    const [primarySort] = query.sort || [];
    if (!primarySort?.field) {
      return rows;
    }

    return [...rows].sort((left, right) => {
      const a = String(left[primarySort.field] ?? '');
      const b = String(right[primarySort.field] ?? '');
      const comparison = a.localeCompare(b, undefined, { sensitivity: 'base', numeric: true });
      return primarySort.direction === 'desc' ? -comparison : comparison;
    });
  }

  private applyServerPagination(rows: any[], query: BrGridQueryState): any[] {
    const pageIndex = Math.max(0, query.pageIndex || 0);
    const pageSize = Math.max(1, query.pageSize || 5);
    const start = pageIndex * pageSize;
    return rows.slice(start, start + pageSize);
  }
}`;
    }

    const hasRichCells = (config.columns || []).some((col) => !!col.type && col.type !== 'text');
    const richHandler = hasRichCells
      ? `
  onGridAction(event: BrGridActionEvent): void {
    switch (event.actionId) {
      case 'open-profile':
        console.log('Open profile for row', event.rowId);
        break;
      case 'toggle-pin':
        console.log('Toggle pin for row', event.rowId);
        break;
      case 'cell-value-change':
        console.log('Cell value changed', event.field, event.previousValue, '->', event.value);
        break;
      case 'update-stage':
        console.log('Persist stage change for row', event.rowId, 'new value:', event.value);
        break;
      case 'edit-user':
      case 'delete-user':
      case 'send-reminder':
        console.log('Row action:', event.actionId, event.row);
        break;
      default:
        console.log('Grid action:', event);
    }
  }`
      : `
  onGridAction(event: BrGridActionEvent): void {
    console.log('Grid action:', event);
    // hook to service/API calls here.
  }`;

    return `import { BrGridConfig, BrGridActionEvent } from '@sriharshavarada/br-ui-wrapper';

export class YourFeatureComponent {
  gridConfig: BrGridConfig = ${JSON.stringify(config, null, 2)};
${richHandler}
}`;
  }

  private buildDateTsCode(config: BrDateConfig): string {
    return `import { BrDateConfig } from '@sriharshavarada/br-ui-wrapper';

export class YourFeatureComponent {
  dateConfig: BrDateConfig = ${JSON.stringify(config, null, 2)};

  onDateChange(value: string): void {
    console.log('Date changed:', value);
  }
}`;
  }

  private buildModalTsCode(config: BrModalConfig): string {
    return `import { BrModalConfig, BrModalActionEvent } from '@sriharshavarada/br-ui-wrapper';

export class YourFeatureComponent {
  modalConfig: BrModalConfig = ${JSON.stringify(config, null, 2)};

  onModalAction(event: BrModalActionEvent): void {
    console.log('Modal action:', event);
  }
}`;
  }

  private buildFormTsCode(config: BrFormConfig): string {
    if (this.isDirectInputVariant() && this.activeControlPlayground === 'text' && config.fields?.length === 1) {
      const field = config.fields[0];
      const value = String((config.value || {})[field.id] ?? '');
      return `import { BrTextComponent } from '@sriharshavarada/br-ui-wrapper';

export class YourFeatureComponent {
  employeeName = ${JSON.stringify(value)};

  updateEmployeeName(value: string): void {
    this.employeeName = value;
    console.log('valueChange', value);
  }

  onControlEvent(event: any): void {
    console.log('controlEvent', event);
  }
}`;
    }

    const fieldTypes = new Set((config.fields || []).map((f: BrFormField) => f.type));
    const isRegistryDemo = this.isRegistryDemoConfig(config);
    const commonTypeImports: string[] = ['BrControlsConfig', 'BrControlActionEvent'];
    const libraryTypeImports: string[] = [];
    if (fieldTypes.size > 0) {
      commonTypeImports.push('BrControlField');
    }
    if (isRegistryDemo) commonTypeImports.push('ControlRegistryService');
    if (fieldTypes.has('text')) libraryTypeImports.push('BrTextConfig');
    if (fieldTypes.has('text-area')) libraryTypeImports.push('BrTextAreaConfig');
    if (fieldTypes.has('single-select')) libraryTypeImports.push('BrSingleSelectConfig');
    if (fieldTypes.has('multi-select')) libraryTypeImports.push('BrMultiSelectConfig');
    if (fieldTypes.has('checkbox')) libraryTypeImports.push('BrCheckboxConfig');
    if (fieldTypes.has('radio')) libraryTypeImports.push('BrRadioConfig');
    if (fieldTypes.has('autocomplete')) libraryTypeImports.push('BrAutocompleteConfig');
    if (fieldTypes.has('date')) libraryTypeImports.push('BrDateConfig');

    const helperMethods: string[] = [];
    if (fieldTypes.size > 0) {
      helperMethods.push(`  private controlValue(field: BrControlField): any {
    return (this.controlsConfig.value || {})[field.id];
  }`);
    }

    if (fieldTypes.has('text')) {
      helperMethods.push(`  asTextConfig(field: BrControlField): BrTextConfig {
    return {
      id: field.id,
      controlId: field.controlId,
      name: field.name,
      className: field.className,
      meta: field.meta,
      label: field.label,
      value: String(this.controlValue(field) ?? ''),
      placeholder: field.placeholder,
      disabled: field.disabled,
      required: field.required,
    };
  }`);
    }

    if (fieldTypes.has('text-area')) {
      helperMethods.push(`  asTextAreaConfig(field: BrControlField): BrTextAreaConfig {
    return {
      id: field.id,
      controlId: field.controlId,
      name: field.name,
      className: field.className,
      meta: field.meta,
      label: field.label,
      value: String(this.controlValue(field) ?? ''),
      placeholder: field.placeholder,
      rows: field.rows,
      maxLength: field.maxLength,
      disabled: field.disabled,
      required: field.required,
    };
  }`);
    }

    if (fieldTypes.has('single-select')) {
      helperMethods.push(`  asSingleSelectConfig(field: BrControlField): BrSingleSelectConfig {
    return {
      id: field.id,
      controlId: field.controlId,
      name: field.name,
      className: field.className,
      meta: field.meta,
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
      id: field.id,
      controlId: field.controlId,
      name: field.name,
      className: field.className,
      meta: field.meta,
      label: field.label,
      value: Array.isArray(this.controlValue(field)) ? this.controlValue(field) : [],
      options: field.options || [],
      disabled: field.disabled,
      required: field.required,
    };
  }`);
    }

    if (fieldTypes.has('checkbox')) {
      helperMethods.push(`  asCheckboxConfig(field: BrControlField): BrCheckboxConfig {
    return {
      id: field.id,
      controlId: field.controlId,
      name: field.name,
      className: field.className,
      meta: field.meta,
      label: field.label,
      value: !!this.controlValue(field),
      checked: !!this.controlValue(field),
      disabled: field.disabled,
      required: field.required,
    };
  }`);
    }

    if (fieldTypes.has('radio')) {
      helperMethods.push(`  asRadioConfig(field: BrControlField): BrRadioConfig {
    return {
      id: field.id,
      controlId: field.controlId,
      name: field.name,
      className: field.className,
      meta: field.meta,
      label: field.label,
      value: this.controlValue(field),
      options: field.options || [],
      disabled: field.disabled,
      required: field.required,
    };
  }`);
    }

    if (fieldTypes.has('autocomplete')) {
      helperMethods.push(`  asAutocompleteConfig(field: BrControlField): BrAutocompleteConfig {
    return {
      id: field.id,
      controlId: field.controlId,
      name: field.name,
      className: field.className,
      meta: field.meta,
      label: field.label,
      value: String(this.controlValue(field) ?? ''),
      options: field.options || [],
      placeholder: field.placeholder,
      disabled: field.disabled,
      required: field.required,
    };
  }`);
    }

    if (fieldTypes.has('date')) {
      helperMethods.push(`  asDateConfig(field: BrControlField): BrDateConfig {
    return {
      id: field.id,
      controlId: field.controlId,
      name: field.name,
      className: field.className,
      meta: field.meta,
      label: field.label,
      value: this.controlValue(field) || '',
      disabled: field.disabled,
      placeholder: field.placeholder || 'Select date',
      required: field.required,
    };
  }`);
    }

    const helperBlock = helperMethods.length > 0 ? `\n${helperMethods.join('\n\n')}\n` : '';
    const registryMembers = isRegistryDemo
      ? `
  constructor(private readonly controlRegistry: ControlRegistryService) {}

  readRegistryValues(): void {
    const sampleId = this.controlsConfig.fields[0]?.id || '';
    const sampleName = this.controlsConfig.fields[0]?.name || 'registry-group';
    const sampleClass = (this.controlsConfig.fields[0]?.className || 'registry-shared').split(/\\s+/)[0];

    console.log('valueById', sampleId, this.controlRegistry.valueById(sampleId));
    console.log('valuesByName', sampleName, this.controlRegistry.valuesByName(sampleName));
    console.log('valuesByClass', sampleClass, this.controlRegistry.valuesByClass(sampleClass));
  }
`
      : '';
    const allTypeImports = [...commonTypeImports, ...libraryTypeImports];
    const libraryImportLine = `import { ${allTypeImports.join(', ')} } from '@sriharshavarada/br-ui-wrapper';`;

    return `${libraryImportLine}

export class YourFeatureComponent {
  controlsConfig: BrControlsConfig = ${JSON.stringify(config, null, 2)};
${registryMembers}

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
    const controls = (config.fields || []).map((field: BrFormField) => this.controlHtmlSnippet(field)).join('\n    ');
    const registryButton = this.isRegistryDemoConfig(config)
      ? `
  <div class="controls-actions">
    <br-button label="Read Registry Values" variant="secondary" size="md" (buttonClick)="readRegistryValues()"></br-button>
  </div>`
      : '';
    const actions = config.showActions === false
      ? ''
      : `
  <div class="controls-actions">
    <br-button label="${config.resetLabel || 'Reset'}" variant="secondary" size="md" (buttonClick)="onControlsAction('reset')"></br-button>
    <br-button label="${config.submitLabel || 'Submit'}" variant="primary" size="md" (buttonClick)="onControlsAction('submit')"></br-button>
  </div>`;

    return `<section class="controls-demo-shell">
  <h3>Controls Consumer Demo</h3>
  <p>Use each wrapper independently and compose your own form layout.</p>
  <div class="controls-host">
    ${controls}
  </div>
  ${registryButton}
  ${actions}
</section>`;
  }

  private isRegistryDemoConfig(config: BrFormConfig): boolean {
    return (config.description || '').toLowerCase().includes('registry demo');
  }

  private applyBrandingDemo(demo: PlaygroundBrandingDemoConfig): void {
    if (demo.kind === 'enterprise') {
      this.brandingRuntime.setBranding(
        EnterpriseBrandingAdapter.toBrBrandingConfig(demo.payload as EnterpriseBrandingPayload)
      );
      this.brandingRuntime.setMode(demo.mode);
      this.pushLog('Applied Enterprise branding');
      return;
    }

    if (demo.kind === 'library') {
      this.brandingRuntime.setBranding(demo.payload as BrBrandingConfig);
      this.brandingRuntime.setMode(demo.mode);
      this.pushLog('Applied Library branding');
      return;
    }

    this.brandingRuntime.setBranding(
      TalentGatewayBrandingAdapter.toBrBrandingConfig(demo.payload as TalentGatewayBrandingPayload)
    );
    this.brandingRuntime.setMode(demo.mode);
    this.pushLog('Applied Talent Gateway branding');
  }

  private resetBrandingDemo(): void {
    this.brandingDemoConfig = null;
    this.brandingStudioDraft = null;
    this.brandingRuntime.reset();
  }

  private buildBrandingDemoTsBlock(demo: PlaygroundBrandingDemoConfig): string {
    const payloadType = demo.kind === 'enterprise'
      ? 'EnterpriseBrandingPayload'
      : demo.kind === 'talent-gateway'
        ? 'TalentGatewayBrandingPayload'
        : 'BrBrandingConfig';
    const applyExpression = demo.kind === 'enterprise'
      ? 'EnterpriseBrandingAdapter.toBrBrandingConfig(this.rawBranding)'
      : demo.kind === 'talent-gateway'
        ? 'TalentGatewayBrandingAdapter.toBrBrandingConfig(this.rawBranding)'
        : 'this.rawBranding';
    const payload = JSON.stringify(demo.payload, null, 2);
    const mode = demo.mode;

    return `
  constructor(private readonly brandingRuntimeService: BrandingRuntimeService) {}

  rawBranding: ${payloadType} = ${payload};
  brandingMode: BrBrandingMode = '${mode}';

  applyBranding(): void {
    this.brandingRuntimeService.setBranding(
      ${applyExpression}
    );
    this.brandingRuntimeService.setMode(this.brandingMode);
  }

  setBrandingMode(mode: BrBrandingMode): void {
    this.brandingMode = mode;
    this.brandingRuntimeService.setMode(mode);
  }`;
  }

  private controlHtmlSnippet(field: BrFormField): string {
    if (this.isNgModelOnlyField(field)) {
      if (field.type === 'text') {
        return `<br-text [id]="'${field.id}'" [label]="'${field.label}'" [placeholder]="'${field.placeholder || ''}'" [required]="${!!field.required}" [disabled]="${!!field.disabled}" [ngModel]="controlValue(${this.fieldRef(field.id)})" (ngModelChange)="updateControlValue('${field.id}', $event)"></br-text>`;
      }
      if (field.type === 'text-area') {
        return `<br-text-area [id]="'${field.id}'" [label]="'${field.label}'" [placeholder]="'${field.placeholder || ''}'" [rows]="${field.rows ?? 4}" [maxLength]="${field.maxLength ?? 'null'}" [required]="${!!field.required}" [disabled]="${!!field.disabled}" [ngModel]="controlValue(${this.fieldRef(field.id)})" (ngModelChange)="updateControlValue('${field.id}', $event)"></br-text-area>`;
      }
      if (field.type === 'single-select') {
        return `<br-single-select [id]="'${field.id}'" [label]="'${field.label}'" [options]="${JSON.stringify(field.options || [])}" [required]="${!!field.required}" [disabled]="${!!field.disabled}" [ngModel]="controlValue(${this.fieldRef(field.id)})" (ngModelChange)="updateControlValue('${field.id}', $event)"></br-single-select>`;
      }
      if (field.type === 'multi-select') {
        return `<br-multi-select [id]="'${field.id}'" [label]="'${field.label}'" [options]="${JSON.stringify(field.options || [])}" [required]="${!!field.required}" [disabled]="${!!field.disabled}" [ngModel]="controlValue(${this.fieldRef(field.id)})" (ngModelChange)="updateControlValue('${field.id}', $event)"></br-multi-select>`;
      }
      if (field.type === 'checkbox') {
        return `<br-checkbox [id]="'${field.id}'" [label]="'${field.label}'" [required]="${!!field.required}" [disabled]="${!!field.disabled}" [ngModel]="controlValue(${this.fieldRef(field.id)})" (ngModelChange)="updateControlValue('${field.id}', $event)"></br-checkbox>`;
      }
      if (field.type === 'radio') {
        return `<br-radio [id]="'${field.id}'" [label]="'${field.label}'" [options]="${JSON.stringify(field.options || [])}" [required]="${!!field.required}" [disabled]="${!!field.disabled}" [ngModel]="controlValue(${this.fieldRef(field.id)})" (ngModelChange)="updateControlValue('${field.id}', $event)"></br-radio>`;
      }
      if (field.type === 'date') {
        return `<br-date [id]="'${field.id}'" [label]="'${field.label}'" [placeholder]="'${field.placeholder || 'Select date'}'" [required]="${!!field.required}" [disabled]="${!!field.disabled}" [ngModel]="controlValue(${this.fieldRef(field.id)})" (ngModelChange)="updateControlValue('${field.id}', $event)"></br-date>`;
      }
      return `<br-autocomplete [id]="'${field.id}'" [label]="'${field.label}'" [placeholder]="'${field.placeholder || ''}'" [options]="${JSON.stringify(field.options || [])}" [required]="${!!field.required}" [disabled]="${!!field.disabled}" [ngModel]="controlValue(${this.fieldRef(field.id)})" (ngModelChange)="updateControlValue('${field.id}', $event)"></br-autocomplete>`;
    }

    if (this.isDirectInputField(field) && field.type === 'text') {
      return `<br-text [id]="'${field.id}'" [name]="'${field.name || ''}'" [className]="'${field.className || ''}'" [label]="'${field.label}'" [placeholder]="'${field.placeholder || ''}'" [required]="${!!field.required}" [disabled]="${!!field.disabled}" [value]="controlValue(${this.fieldRef(field.id)})" (valueChange)="updateControlValue('${field.id}', $event)" (controlEvent)="onControlEvent($event)"></br-text>`;
    }

    if (field.type === 'text') {
      return `<br-text [config]="asTextConfig(${this.fieldRef(field.id)})" (valueChange)="updateControlValue('${field.id}', $event)"></br-text>`;
    }
    if (field.type === 'text-area') {
      return `<br-text-area [config]="asTextAreaConfig(${this.fieldRef(field.id)})" (valueChange)="updateControlValue('${field.id}', $event)"></br-text-area>`;
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

  private applyDirectInputTextFormCode(): void {
    this.validateTsShape('form', this.formCode.ts);
    this.validateScss(this.formCode.scss);
    const htmlSegments = this.extractControlsHtmlSegments(this.formCode.html);
    const field = this.formConfig.fields[0];
    if (!field || field.type !== 'text') {
      throw new Error('Direct input text variant requires exactly one text field.');
    }

    const nextField = this.parseDirectInputTextField(this.formCode.html, field);
    const nextValue = this.parseStringAssignmentFromTs(this.formCode.ts, 'employeeName') ?? String((this.formConfig.value || {})[field.id] ?? '');

    this.formConfig = {
      ...this.formConfig,
      fields: [nextField],
      value: { ...(this.formConfig.value || {}), [field.id]: nextValue },
    };
    this.rebuildFormControlConfigs();
    this.formCode.htmlBefore = htmlSegments.before;
    this.formCode.htmlAfter = htmlSegments.after;
    this.formCode.appliedScss = this.formCode.scss;
    this.codeError.form = '';
    this.pushLog('Applied Controls TS/HTML/SCSS code');
  }

  private parseDirectInputTextField(html: string, fallback: BrFormField): BrFormField {
    const match = html.match(/<br-text\b([\s\S]*?)><\/br-text>/i);
    if (!match) {
      throw new Error('HTML must include <br-text>...</br-text> for the direct input variant.');
    }

    const attrs = match[1];
    const stringBinding = (name: string): string | undefined => {
      const patterns = [
        new RegExp(`\\[${name}\\]="['"]([^'"]*)['"]`, 'i'),
        new RegExp(`${name}="([^"]*)"`, 'i'),
      ];
      for (const pattern of patterns) {
        const result = attrs.match(pattern);
        if (result?.[1] !== undefined) {
          return result[1];
        }
      }
      return undefined;
    };

    const booleanBinding = (name: string, current: boolean | undefined): boolean | undefined => {
      const pattern = new RegExp(`\\[${name}\\]="(true|false)"`, 'i');
      const result = attrs.match(pattern);
      if (result?.[1] !== undefined) {
        return result[1].toLowerCase() === 'true';
      }
      return current;
    };

    return {
      ...fallback,
      id: stringBinding('id') || fallback.id,
      name: stringBinding('name') || fallback.name,
      className: stringBinding('className') || fallback.className,
      label: stringBinding('label') || fallback.label,
      placeholder: stringBinding('placeholder') || fallback.placeholder,
      required: booleanBinding('required', fallback.required),
      disabled: booleanBinding('disabled', fallback.disabled),
    };
  }

  private parseStringAssignmentFromTs(tsCode: string, variableName: string): string | null {
    const patterns = [
      new RegExp(`${variableName}\\s*=\\s*'([^']*)'`),
      new RegExp(`${variableName}\\s*=\\s*"([^"]*)"`),
      new RegExp(variableName + '\\s*=\\s*`([^`]*)`'),
    ];

    for (const pattern of patterns) {
      const match = tsCode.match(pattern);
      if (match?.[1] !== undefined) {
        return match[1];
      }
    }

    return null;
  }

  private defaultGridScssCode(): string {
    return this.optionalScssComment('Grid');
  }

  private defaultDateScssCode(): string {
    return this.optionalScssComment('Date');
  }

  private defaultModalScssCode(): string {
    return this.optionalScssComment('Modal');
  }

  private defaultFormScssCode(): string {
    return this.optionalScssComment('Control');
  }

  private buildButtonTsCode(config: BrButtonConfig): string {
    return `import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BrButtonComponent, BrButtonConfig } from '@sriharshavarada/br-ui-wrapper';

@Component({
  standalone: true,
  imports: [CommonModule, BrButtonComponent],
  templateUrl: './button-demo.component.html',
})
export class YourFeatureComponent {
  buttonConfig: BrButtonConfig = ${JSON.stringify(config, null, 2)};

  onButtonClick(event: MouseEvent): void {
    console.log('button-click', {
      id: this.buttonConfig.id,
      label: this.buttonConfig.label,
      variant: this.buttonConfig.variant,
    });
  }

  onButtonControlEvent(event: any): void {
    console.log('button-control-event', event);
  }
}`;
  }

  private defaultButtonHtmlCode(): string {
    return `<section class="button-demo-shell">
  <h3>Button Consumer Demo</h3>
  <p>This is the same consumer HTML you can use in your feature.</p>
  <br-button
    [config]="buttonConfig"
    (buttonClick)="onButtonClick($event)"
    (controlEvent)="onButtonControlEvent($event)"></br-button>
</section>`;
  }

  private defaultButtonScssCode(): string {
    return this.optionalScssComment('Button');
  }

  private optionalScssComment(controlName: string): string {
    return `/* Optional: add host/page layout styles for this ${controlName.toLowerCase()} usage here.
   The library already styles the ${controlName.toLowerCase()} control itself. */`;
  }

  private primaryButtonConfig(): BrButtonConfig {
    return this.buildButtonPresetConfig('primary');
  }

  private buildButtonPresetConfig(preset: ButtonPreset): BrButtonConfig {
    switch (preset) {
      case 'secondary':
        return {
          id: 'secondaryButton',
          label: 'Cancel',
          variant: 'secondary',
          size: 'md',
          type: 'button',
        };
      case 'outline':
        return {
          id: 'outlineButton',
          label: 'Preview',
          variant: 'outline',
          size: 'md',
          type: 'button',
        };
      case 'danger':
        return {
          id: 'dangerButton',
          label: 'Delete User',
          variant: 'danger',
          size: 'md',
          type: 'button',
        };
      case 'text':
        return {
          id: 'textButton',
          label: 'Learn More',
          variant: 'text',
          size: 'md',
          type: 'button',
        };
      case 'icon':
        return {
          id: 'iconButton',
          label: '',
          ariaLabel: 'Refresh data',
          variant: 'icon',
          size: 'md',
          type: 'button',
          leftIcon: '↻',
        };
      case 'loading':
        return {
          id: 'loadingButton',
          label: 'Submitting',
          variant: 'primary',
          size: 'md',
          type: 'button',
          loading: true,
          disabled: true,
        };
      case 'full-width':
        return {
          id: 'fullWidthButton',
          label: 'Continue',
          variant: 'primary',
          size: 'lg',
          type: 'button',
          fullWidth: true,
        };
      case 'with-icons':
        return {
          id: 'withIconsButton',
          label: 'Download Report',
          variant: 'secondary',
          size: 'md',
          type: 'button',
          leftIcon: '↓',
          rightIcon: '→',
        };
      case 'primary':
      default:
        return {
          id: 'primaryButton',
          label: 'Save Changes',
          variant: 'primary',
          size: 'md',
          type: 'button',
        };
    }
  }

  private getCodeState(tab: PlaygroundTab): DemoCodeState {
    if (tab === 'grid') return this.gridCode;
    if (tab === 'date') return this.dateCode;
    if (tab === 'form') return this.formCode;
    if (tab === 'button') return this.buttonCode;
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

  private parseButtonClickHandler(tsCode: string): (event: MouseEvent, runtimeConsole: Console) => void {
    const body = this.extractMethodBody(tsCode, 'onButtonClick');
    return new Function('event', 'console', body) as (event: MouseEvent, runtimeConsole: Console) => void;
  }

  private parseButtonControlEventHandler(tsCode: string): (event: any, runtimeConsole: Console) => void {
    const body = this.extractMethodBody(tsCode, 'onButtonControlEvent');
    return new Function('event', 'console', body) as (event: any, runtimeConsole: Console) => void;
  }

  private extractMethodBody(tsCode: string, methodName: 'onGridAction' | 'onDateChange' | 'onModalAction' | 'onFormAction' | 'onControlsAction' | 'onButtonClick' | 'onButtonControlEvent'): string {
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

    if (tab === 'form' && this.isDirectInputVariant() && this.activeControlPlayground === 'text') {
      const directInputImportRegex = /import\s*\{[^}]*BrTextComponent[^}]*\}\s*from\s*['"]@sriharshavarada\/br-ui-wrapper['"]/;
      if (!directInputImportRegex.test(tsCode)) {
        throw new Error('TS validation failed: required import for BrTextComponent from @sriharshavarada/br-ui-wrapper is missing.');
      }
      return;
    }

    const importRegexByTab: Record<PlaygroundTab, RegExp> = {
      grid: /import\s*\{[^}]*BrGridConfig[^}]*\}\s*from\s*['"]@sriharshavarada\/br-ui-wrapper['"]/,
      date: /import\s*\{[^}]*BrDateConfig[^}]*\}\s*from\s*['"]@sriharshavarada\/br-ui-wrapper['"]/,
      modal: /import\s*\{[^}]*BrModalConfig[^}]*\}\s*from\s*['"]@sriharshavarada\/br-ui-wrapper['"]/,
      form: /import\s*\{[^}]*Br(ControlsConfig|FormConfig)[^}]*\}\s*from\s*['"]@sriharshavarada\/br-ui-wrapper['"]/,
      button: /import\s*\{[^}]*BrButtonConfig[^}]*\}\s*from\s*['"]@sriharshavarada\/br-ui-wrapper['"]/,
    };

    if (!importRegexByTab[tab].test(tsCode)) {
      throw new Error('TS validation failed: required import from @sriharshavarada/br-ui-wrapper is missing.');
    }
  }

  private createRuntimeConsole(scope: 'grid' | 'date' | 'modal' | 'form' | 'button'): Console {
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
      uiConfig: {
        maxHeight: '500px',
      },
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

  private remoteGridConfig(): BrGridConfig {
    const query: BrGridQueryState = {
      pageIndex: 0,
      pageSize: 5,
      searchText: '',
      sort: [{ field: 'name', direction: 'asc' }],
      filters: [],
    };

    return {
      title: 'Remote Grid Demo',
      dataMode: 'remote',
      columns: [
        { field: 'id', header: 'ID', sortable: true },
        { field: 'name', header: 'Name', sortable: true },
        { field: 'team', header: 'Team', sortable: true },
        { field: 'role', header: 'Role', sortable: true },
        { field: 'status', header: 'Status', sortable: true },
      ],
      data: [],
      result: {
        rows: [],
        totalCount: 0,
        loading: false,
        query,
      },
      queryState: query,
      pagination: true,
      pageSize: 5,
      sorting: true,
      uiConfig: {
        maxHeight: '500px',
      },
      toolbar: {
        showSort: true,
        showFilter: false,
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
          { field: 'status', label: 'Status', group: 'State' },
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
        sortLevels: 1,
        enableFiltering: false,
        filterLevels: 1,
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
        { id: 'activate-selected', label: 'Activate' },
        { id: 'deactivate-selected', label: 'Deactivate' },
      ],
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
      uiConfig: {
        maxHeight: '500px',
      },
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

  private richGridConfig(): BrGridConfig {
    return {
      title: 'Rich Cells Grid Demo',
      columns: [
        { field: 'id', header: 'ID', sortable: true },
        {
          field: 'candidateName',
          header: 'Candidate',
          sortable: true,
          type: 'link',
          cellConfig: {
            actions: [{ id: 'open-profile', label: 'Open Profile', variant: 'link' }],
          },
        },
        {
          field: 'status',
          header: 'Status',
          sortable: true,
          type: 'badge',
          cellConfig: {
            badgeVariant: 'neutral',
          },
        },
        {
          field: 'pin',
          header: 'Pin',
          align: 'center',
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
              { label: 'Phone Screen', value: 'Phone Screen' },
              { label: 'First Interview', value: 'First Interview' },
              { label: 'Second Interview', value: 'Second Interview' },
              { label: 'Offer', value: 'Offer' },
            ],
          },
        },
        {
          field: 'team',
          header: 'Team',
          sortable: true,
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
              { id: 'send-reminder', label: 'Remind', variant: 'ghost' },
              { id: 'delete-user', label: 'Delete', variant: 'danger' },
            ],
          },
        },
      ],
      data: this.sampleCandidates(),
      rowMeta: {
        'C-1003': {
          cells: {
            hrStatus: {
              state: 'saving',
              message: 'Waiting to persist',
              tone: 'warning',
            },
          },
        },
      },
      pagination: true,
      pageSize: 5,
      sorting: true,
      uiConfig: {
        maxHeight: '500px',
      },
      toolbar: {
        showSort: true,
        showFilter: true,
        showSearch: true,
        showRefresh: true,
        showColumnSettings: true,
        showShare: false,
        showViewMode: false,
        primaryActionLabel: 'Add Candidate',
      },
      contextMenuActions: [
        { id: 'view-candidate', label: 'View Candidate' },
        { id: 'move-stage', label: 'Move Stage' },
        { id: 'delete-user', label: 'Delete Candidate' },
      ],
      selectionActions: [
        { id: 'activate-selected', label: 'Activate' },
        { id: 'deactivate-selected', label: 'Deactivate' },
      ],
      personalization: {
        availableColumns: [
          { field: 'id', label: 'Candidate ID', group: 'Core' },
          { field: 'candidateName', label: 'Candidate', group: 'Core' },
          { field: 'status', label: 'Status', group: 'Status' },
          { field: 'pin', label: 'Pin', group: 'Status' },
          { field: 'hrStatus', label: 'HR Status', group: 'Workflow' },
          { field: 'team', label: 'Team', group: 'Org' },
          { field: 'actions', label: 'Actions', group: 'Workflow' },
        ],
        selectedColumns: ['id', 'candidateName', 'status', 'pin', 'hrStatus', 'team', 'actions'],
      },
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
      uiConfig: {
        maxHeight: '500px',
      },
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
      minDate: null,
      maxDate: null,
      language: 'en-US',
      locale: 'en-US',
      dateFormat: 'MM/dd/yyyy',
      DateConfiguration: this.clone(PLAYGROUND_DATE_CONFIGURATION),
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
      minDate: null,
      maxDate: null,
      language: 'fr-FR',
      locale: 'fr-FR',
      dateFormat: 'dd/MM/yyyy',
      DateConfiguration: this.clone(PLAYGROUND_DATE_CONFIGURATION),
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
      language: 'ar-SA',
      locale: 'ar-SA',
      dateFormat: 'yyyy-MM-dd',
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
        {
          id: 'startDate',
          type: 'date',
          label: 'Start Date',
          language: 'en-US',
          locale: 'en-US',
          dateFormat: 'MM/dd/yyyy',
          DateConfiguration: this.clone(PLAYGROUND_DATE_CONFIGURATION),
        },
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
        { id: 'summary', type: 'text-area', label: 'Summary', placeholder: 'Add a short summary', rows: 4, maxLength: 280 },
        { id: 'agree', type: 'checkbox', label: 'I Agree' },
        {
          id: 'when',
          type: 'date',
          label: 'Date',
          language: 'fr-FR',
          locale: 'fr-FR',
          dateFormat: 'dd/MM/yyyy',
          DateConfiguration: this.clone(PLAYGROUND_DATE_CONFIGURATION),
        },
      ],
      value: { name: '', summary: '', agree: false, when: '' },
      showActions: true,
      submitLabel: 'Submit',
      resetLabel: 'Reset',
    };
  }

  private buildSingleControlVariantConfig(control: Exclude<ControlPlayground, 'all'>, variant: string): BrFormConfig {
    const variantKey = variant.replace(/-config$/, '');
    const ngModelOnly = variantKey === 'ngmodel-simple';
    const directInputOnly = variantKey === 'direct-input';
    this.brandingDemoConfig = null;
    if (variantKey === 'events-demo') {
      return this.buildControlEventsDemoVariantConfig(control);
    }
    if (variantKey === 'registry-demo') {
      return this.buildControlRegistryDemoVariantConfig(control);
    }

    if (control === 'date') {
      return this.singleControlConfig(
        {
          id: 'dateControl',
          type: 'date',
          label: 'Start Date',
          placeholder: 'Select start date',
          required: variantKey === 'bounded',
          language: 'en-US',
          locale: 'en-US',
          dateFormat: 'MM/dd/yyyy',
          DateConfiguration: this.clone(PLAYGROUND_DATE_CONFIGURATION),
        },
        variantKey === 'disabled' ? '2026-03-10' : '2026-02-10',
        `${this.controlPlaygroundLabels[control]} Playground`,
        `Variant: ${this.controlVariantLabel(variant)}${ngModelOnly ? ' (No Config)' : ''}`,
        variantKey === 'disabled',
      );
    }

    if (control === 'text') {
      return this.singleControlConfig(
        {
          id: 'textControl',
          type: 'text',
          label: 'Employee Name',
          placeholder: 'Type full name',
          required: variantKey === 'required',
          disabled: variantKey === 'disabled',
          name: directInputOnly ? 'employeeName' : undefined,
          className: directInputOnly ? 'employee-name-field' : undefined,
        },
        variantKey === 'disabled' ? 'Read-only value' : '',
        `${this.controlPlaygroundLabels[control]} Playground`,
        `Variant: ${this.controlVariantLabel(variant)}${ngModelOnly ? ' (No Config)' : directInputOnly ? ' (Direct Inputs)' : ''}`,
      );
    }

    if (control === 'text-area') {
      return this.singleControlConfig(
        {
          id: 'textAreaControl',
          type: 'text-area',
          label: 'Manager Notes',
          placeholder: 'Capture a longer note',
          rows: 5,
          maxLength: 500,
          required: variantKey === 'required',
          disabled: variantKey === 'disabled',
        },
        variantKey === 'disabled' ? 'Read-only note content.' : '',
        `${this.controlPlaygroundLabels[control]} Playground`,
        `Variant: ${this.controlVariantLabel(variant)}${ngModelOnly ? ' (No Config)' : ''}`,
      );
    }

    if (control === 'single-select') {
      return this.singleControlConfig(
        {
          id: 'singleSelectControl',
          type: 'single-select',
          label: 'Department',
          required: variantKey === 'required',
          disabled: variantKey === 'disabled',
          options: [
            { label: 'Engineering', value: 'eng' },
            { label: 'Finance', value: 'fin' },
            { label: 'HR', value: 'hr' },
            { label: 'Operations', value: 'ops' },
          ],
        },
        variantKey === 'disabled' ? 'fin' : '',
        `${this.controlPlaygroundLabels[control]} Playground`,
        `Variant: ${this.controlVariantLabel(variant)}${ngModelOnly ? ' (No Config)' : ''}`,
      );
    }

    if (control === 'multi-select') {
      return this.singleControlConfig(
        {
          id: 'multiSelectControl',
          type: 'multi-select',
          label: 'Skills',
          disabled: variantKey === 'disabled',
          options: [
            { label: 'Angular', value: 'angular' },
            { label: 'Java', value: 'java' },
            { label: 'SQL', value: 'sql' },
            { label: 'AWS', value: 'aws' },
          ],
        },
        variantKey === 'preselected' ? ['angular', 'aws'] : [],
        `${this.controlPlaygroundLabels[control]} Playground`,
        `Variant: ${this.controlVariantLabel(variant)}${ngModelOnly ? ' (No Config)' : ''}`,
      );
    }

    if (control === 'checkbox') {
      return this.singleControlConfig(
        { id: 'checkboxControl', type: 'checkbox', label: 'Enable notifications', disabled: variantKey === 'disabled' },
        variantKey === 'checked' || variantKey === 'disabled',
        `${this.controlPlaygroundLabels[control]} Playground`,
        `Variant: ${this.controlVariantLabel(variant)}${ngModelOnly ? ' (No Config)' : ''}`,
      );
    }

    if (control === 'radio') {
      return this.singleControlConfig(
        {
          id: 'radioControl',
          type: 'radio',
          label: 'Employment Type',
          disabled: variantKey === 'disabled',
          options: [
            { label: 'Full Time', value: 'ft' },
            { label: 'Contract', value: 'ct' },
            { label: 'Intern', value: 'in' },
          ],
        },
        variantKey === 'preselected' ? 'ct' : '',
        `${this.controlPlaygroundLabels[control]} Playground`,
        `Variant: ${this.controlVariantLabel(variant)}${ngModelOnly ? ' (No Config)' : ''}`,
      );
    }

    return this.singleControlConfig(
      {
        id: 'autocompleteControl',
        type: 'autocomplete',
        label: 'Location',
        placeholder: 'Search location',
        disabled: variantKey === 'disabled',
        options: [
          { label: 'Austin', value: 'Austin' },
          { label: 'Seattle', value: 'Seattle' },
          { label: 'New York', value: 'New York' },
          { label: 'Chicago', value: 'Chicago' },
          { label: 'Denver', value: 'Denver' },
        ],
      },
      variantKey === 'prefilled' ? 'Seattle' : '',
      `${this.controlPlaygroundLabels[control]} Playground`,
      `Variant: ${this.controlVariantLabel(variant)}${ngModelOnly ? ' (No Config)' : ''}`,
    );
  }

  private buildControlEventsDemoVariantConfig(control: Exclude<ControlPlayground, 'all'>): BrFormConfig {
    if (control === 'text') {
      return {
        title: 'Text Box Playground',
        description: 'Events Demo: type in first box and tab/click to second to trigger keyup/focus/blur/click events.',
        fields: [
          { id: 'textControlA', type: 'text', label: 'Text A', placeholder: 'Type here' },
          { id: 'textControlB', type: 'text', label: 'Text B', placeholder: 'Click here after A' },
        ],
        value: { textControlA: '', textControlB: '' },
        showActions: false,
      };
    }

    if (control === 'text-area') {
      return {
        title: 'Text Area Playground',
        description: 'Events Demo: type in the first text area, tab to the second, and click back to trigger input, keyup, focus, blur, and click.',
        fields: [
          { id: 'textAreaControlA', type: 'text-area', label: 'Notes A', placeholder: 'Type detailed notes', rows: 4, maxLength: 400 },
          { id: 'textAreaControlB', type: 'text-area', label: 'Notes B', placeholder: 'Click here after A', rows: 5, maxLength: 400 },
        ],
        value: { textAreaControlA: '', textAreaControlB: '' },
        showActions: false,
      };
    }

    if (control === 'date') {
      return {
        title: 'Date Playground',
        description: 'Events Demo: open date picker, pick a date, then move focus to second date control.',
        fields: [
          { id: 'dateControlA', type: 'date', label: 'Date A', placeholder: 'Pick date', language: 'en-US', locale: 'en-US', dateFormat: 'MM/dd/yyyy' },
          { id: 'dateControlB', type: 'date', label: 'Date B', placeholder: 'Pick date', language: 'en-US', locale: 'en-US', dateFormat: 'MM/dd/yyyy' },
        ],
        value: { dateControlA: '', dateControlB: '' },
        showActions: false,
      };
    }

    if (control === 'single-select') {
      return {
        title: 'Single Select Playground',
        description: 'Events Demo: click/select in first dropdown, then move to second to see change/focus/blur.',
        fields: [
          {
            id: 'singleSelectControlA',
            type: 'single-select',
            label: 'Department A',
            options: [
              { label: 'Engineering', value: 'eng' },
              { label: 'Finance', value: 'fin' },
              { label: 'HR', value: 'hr' },
            ],
          },
          {
            id: 'singleSelectControlB',
            type: 'single-select',
            label: 'Department B',
            options: [
              { label: 'Engineering', value: 'eng' },
              { label: 'Finance', value: 'fin' },
              { label: 'HR', value: 'hr' },
            ],
          },
        ],
        value: { singleSelectControlA: '', singleSelectControlB: '' },
        showActions: false,
      };
    }

    if (control === 'multi-select') {
      return {
        title: 'Multi Select Playground',
        description: 'Events Demo: click options/chips and then click outside to trigger interactions.',
        fields: [
          {
            id: 'multiSelectControlA',
            type: 'multi-select',
            label: 'Skills A',
            options: [
              { label: 'Angular', value: 'angular' },
              { label: 'Java', value: 'java' },
              { label: 'SQL', value: 'sql' },
            ],
          },
          {
            id: 'multiSelectControlB',
            type: 'multi-select',
            label: 'Skills B',
            options: [
              { label: 'Angular', value: 'angular' },
              { label: 'Java', value: 'java' },
              { label: 'SQL', value: 'sql' },
            ],
          },
        ],
        value: { multiSelectControlA: [], multiSelectControlB: [] },
        showActions: false,
      };
    }

    if (control === 'checkbox') {
      return {
        title: 'Checkbox Playground',
        description: 'Events Demo: click/toggle both checkboxes to see click/change/value events.',
        fields: [
          { id: 'checkboxControlA', type: 'checkbox', label: 'Enable alerts' },
          { id: 'checkboxControlB', type: 'checkbox', label: 'Enable notifications' },
        ],
        value: { checkboxControlA: false, checkboxControlB: true },
        showActions: false,
      };
    }

    if (control === 'radio') {
      return {
        title: 'Radio Playground',
        description: 'Events Demo: switch radio options and move focus between the two groups.',
        fields: [
          {
            id: 'radioControlA',
            type: 'radio',
            label: 'Type A',
            options: [
              { label: 'Full Time', value: 'ft' },
              { label: 'Contract', value: 'ct' },
            ],
          },
          {
            id: 'radioControlB',
            type: 'radio',
            label: 'Type B',
            options: [
              { label: 'Full Time', value: 'ft' },
              { label: 'Contract', value: 'ct' },
            ],
          },
        ],
        value: { radioControlA: 'ft', radioControlB: 'ct' },
        showActions: false,
      };
    }

    return {
      title: 'Autocomplete Playground',
      description: 'Events Demo: type in first input, arrow/enter to select, then move to second input.',
      fields: [
        {
          id: 'autocompleteControlA',
          type: 'autocomplete',
          label: 'Location A',
          placeholder: 'Type location',
          options: [
            { label: 'Austin', value: 'Austin' },
            { label: 'Seattle', value: 'Seattle' },
            { label: 'New York', value: 'New York' },
          ],
        },
        {
          id: 'autocompleteControlB',
          type: 'autocomplete',
          label: 'Location B',
          placeholder: 'Type location',
          options: [
            { label: 'Austin', value: 'Austin' },
            { label: 'Seattle', value: 'Seattle' },
            { label: 'New York', value: 'New York' },
          ],
        },
      ],
      value: { autocompleteControlA: '', autocompleteControlB: '' },
      showActions: false,
    };
  }

  private buildControlRegistryDemoVariantConfig(control: Exclude<ControlPlayground, 'all'>): BrFormConfig {
    const sharedName = 'registry-group';
    const sharedClass = 'registry-shared';
    const metaA = { sample: 'A', scenario: 'registry-demo' };
    const metaB = { sample: 'B', scenario: 'registry-demo' };

    if (control === 'text') {
      return {
        title: 'Text Box Playground',
        description: 'Registry Demo: Read values using valueById, valuesByName, valuesByClass.',
        fields: [
          { id: 'textRegistryA', type: 'text', label: 'Text A', name: sharedName, className: sharedClass, meta: metaA, placeholder: 'Type A' },
          { id: 'textRegistryB', type: 'text', label: 'Text B', name: sharedName, className: sharedClass, meta: metaB, placeholder: 'Type B' },
        ],
        value: { textRegistryA: 'Alpha', textRegistryB: 'Beta' },
        showActions: false,
      };
    }

    if (control === 'text-area') {
      return {
        title: 'Text Area Playground',
        description: 'Registry Demo: Read text area values using valueById, valuesByName, valuesByClass.',
        fields: [
          { id: 'textAreaRegistryA', type: 'text-area', label: 'Notes A', name: sharedName, className: sharedClass, meta: metaA, placeholder: 'Type note A', rows: 4, maxLength: 400 },
          { id: 'textAreaRegistryB', type: 'text-area', label: 'Notes B', name: sharedName, className: sharedClass, meta: metaB, placeholder: 'Type note B', rows: 5, maxLength: 400 },
        ],
        value: { textAreaRegistryA: 'Alpha note', textAreaRegistryB: 'Beta note' },
        showActions: false,
      };
    }

    if (control === 'date') {
      return {
        title: 'Date Playground',
        description: 'Registry Demo: Read values using valueById, valuesByName, valuesByClass.',
        fields: [
          { id: 'dateRegistryA', type: 'date', label: 'Date A', name: sharedName, className: sharedClass, meta: metaA, language: 'en-US', locale: 'en-US', dateFormat: 'MM/dd/yyyy' },
          { id: 'dateRegistryB', type: 'date', label: 'Date B', name: sharedName, className: sharedClass, meta: metaB, language: 'en-US', locale: 'en-US', dateFormat: 'MM/dd/yyyy' },
        ],
        value: { dateRegistryA: '2026-03-10', dateRegistryB: '2026-03-20' },
        showActions: false,
      };
    }

    if (control === 'single-select') {
      const options = [
        { label: 'Engineering', value: 'eng' },
        { label: 'Finance', value: 'fin' },
        { label: 'HR', value: 'hr' },
      ];
      return {
        title: 'Single Select Playground',
        description: 'Registry Demo: Read values using valueById, valuesByName, valuesByClass.',
        fields: [
          { id: 'singleRegistryA', type: 'single-select', label: 'Department A', name: sharedName, className: sharedClass, meta: metaA, options },
          { id: 'singleRegistryB', type: 'single-select', label: 'Department B', name: sharedName, className: sharedClass, meta: metaB, options },
        ],
        value: { singleRegistryA: 'eng', singleRegistryB: 'fin' },
        showActions: false,
      };
    }

    if (control === 'multi-select') {
      const options = [
        { label: 'Angular', value: 'angular' },
        { label: 'Java', value: 'java' },
        { label: 'SQL', value: 'sql' },
      ];
      return {
        title: 'Multi Select Playground',
        description: 'Registry Demo: Read values using valueById, valuesByName, valuesByClass.',
        fields: [
          { id: 'multiRegistryA', type: 'multi-select', label: 'Skills A', name: sharedName, className: sharedClass, meta: metaA, options },
          { id: 'multiRegistryB', type: 'multi-select', label: 'Skills B', name: sharedName, className: sharedClass, meta: metaB, options },
        ],
        value: { multiRegistryA: ['angular'], multiRegistryB: ['java', 'sql'] },
        showActions: false,
      };
    }

    if (control === 'checkbox') {
      return {
        title: 'Checkbox Playground',
        description: 'Registry Demo: Read values using valueById, valuesByName, valuesByClass.',
        fields: [
          { id: 'checkboxRegistryA', type: 'checkbox', label: 'Alerts', name: sharedName, className: sharedClass, meta: metaA },
          { id: 'checkboxRegistryB', type: 'checkbox', label: 'Notifications', name: sharedName, className: sharedClass, meta: metaB },
        ],
        value: { checkboxRegistryA: true, checkboxRegistryB: false },
        showActions: false,
      };
    }

    if (control === 'radio') {
      const options = [
        { label: 'Full Time', value: 'ft' },
        { label: 'Contract', value: 'ct' },
      ];
      return {
        title: 'Radio Playground',
        description: 'Registry Demo: Read values using valueById, valuesByName, valuesByClass.',
        fields: [
          { id: 'radioRegistryA', type: 'radio', label: 'Type A', name: sharedName, className: sharedClass, meta: metaA, options },
          { id: 'radioRegistryB', type: 'radio', label: 'Type B', name: sharedName, className: sharedClass, meta: metaB, options },
        ],
        value: { radioRegistryA: 'ft', radioRegistryB: 'ct' },
        showActions: false,
      };
    }

    return {
      title: 'Autocomplete Playground',
      description: 'Registry Demo: Read values using valueById, valuesByName, valuesByClass.',
      fields: [
        {
          id: 'autocompleteRegistryA',
          type: 'autocomplete',
          label: 'Location A',
          name: sharedName,
          className: sharedClass,
          meta: metaA,
          placeholder: 'Type location',
          options: [
            { label: 'Austin', value: 'Austin' },
            { label: 'Seattle', value: 'Seattle' },
            { label: 'New York', value: 'New York' },
          ],
        },
        {
          id: 'autocompleteRegistryB',
          type: 'autocomplete',
          label: 'Location B',
          name: sharedName,
          className: sharedClass,
          meta: metaB,
          placeholder: 'Type location',
          options: [
            { label: 'Austin', value: 'Austin' },
            { label: 'Seattle', value: 'Seattle' },
            { label: 'New York', value: 'New York' },
          ],
        },
      ],
      value: { autocompleteRegistryA: 'Austin', autocompleteRegistryB: 'Seattle' },
      showActions: false,
    };
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

  private defaultBrandingDemoConfig(kind: BrandingDemoKind, mode: BrBrandingMode = 'light'): PlaygroundBrandingDemoConfig {
    if (kind === 'enterprise') {
      return { kind, mode, payload: this.clone(ENTERPRISE_BRANDING_SAMPLE) };
    }
    if (kind === 'talent-gateway') {
      return { kind, mode, payload: this.clone(TALENT_GATEWAY_BRANDING_SAMPLE) };
    }
    return { kind, mode, payload: this.clone(LIBRARY_BRANDING_SAMPLE) };
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

  private sampleCandidates(): any[] {
    return [
      { id: 'C-1001', candidateName: 'Anya Ross', status: 'Active', pin: 'pin', hrStatus: 'First Interview', team: 'Platform', actions: '' },
      { id: 'C-1002', candidateName: 'Ravi Singh', status: 'Pending', pin: 'pin', hrStatus: 'Phone Screen', team: 'Cloud', actions: '' },
      { id: 'C-1003', candidateName: 'Mia Chen', status: 'Inactive', pin: 'pin', hrStatus: 'Second Interview', team: 'Security', actions: '' },
      { id: 'C-1004', candidateName: 'Noah Lee', status: 'Active', pin: 'pin', hrStatus: 'Offer', team: 'Data', actions: '' },
      { id: 'C-1005', candidateName: 'Emma Brown', status: 'Pending', pin: 'pin', hrStatus: 'Applied', team: 'Mobile', actions: '' },
      { id: 'C-1006', candidateName: 'Ava Nguyen', status: 'Active', pin: 'pin', hrStatus: 'First Interview', team: 'Payments', actions: '' },
    ];
  }

  private applyRichGridDemoFeedback(event: BrGridActionEvent): void {
    if (this.activeGridPreset !== 'rich') {
      return;
    }

    const rowId = event.rowId ? String(event.rowId) : '';
    if (!rowId) {
      return;
    }

    if (event.actionId === 'update-stage') {
      const nextData = (this.gridConfig.data || []).map((row) =>
        String(row.id) === rowId ? { ...row, hrStatus: event.value } : row,
      );
      const nextMeta: BrGridRowMetaMap = {
        ...(this.gridConfig.rowMeta || {}),
        [rowId]: {
          ...((this.gridConfig.rowMeta || {})[rowId] || {}),
          cells: {
            ...(((this.gridConfig.rowMeta || {})[rowId] || {}).cells || {}),
            hrStatus: {
              state: 'success' as const,
              tone: 'success' as const,
              message: `Updated to ${String(event.value || '')}`,
            },
          },
        },
      };
      this.gridConfig = {
        ...this.gridConfig,
        data: nextData,
        rowMeta: nextMeta,
      };
      this.syncGridTsCode();
      return;
    }

    if (event.actionId === 'toggle-pin') {
      const nextMeta: BrGridRowMetaMap = {
        ...(this.gridConfig.rowMeta || {}),
        [rowId]: {
          ...((this.gridConfig.rowMeta || {})[rowId] || {}),
          cells: {
            ...(((this.gridConfig.rowMeta || {})[rowId] || {}).cells || {}),
            pin: {
              state: 'success' as const,
              tone: 'primary' as const,
              message: 'Pin toggled',
            },
          },
        },
      };
      this.gridConfig = {
        ...this.gridConfig,
        rowMeta: nextMeta,
      };
      this.syncGridTsCode();
      return;
    }

    if (event.actionId === 'delete-user' || event.actionId === 'edit-user' || event.actionId === 'send-reminder') {
      const field = event.field || 'actions';
      const nextMeta: BrGridRowMetaMap = {
        ...(this.gridConfig.rowMeta || {}),
        [rowId]: {
          ...((this.gridConfig.rowMeta || {})[rowId] || {}),
          cells: {
            ...(((this.gridConfig.rowMeta || {})[rowId] || {}).cells || {}),
            [field]: {
              state: 'success' as const,
              tone: (event.actionId === 'delete-user' ? 'danger' : 'primary') as 'danger' | 'primary',
              message: `${event.label || event.actionId} fired`,
            },
          },
        },
      };
      this.gridConfig = {
        ...this.gridConfig,
        rowMeta: nextMeta,
      };
      this.syncGridTsCode();
    }
  }

  private loadRemoteGridData(query: BrGridQueryState): void {
    const loadingResult: BrGridDataResult = {
      ...(this.gridConfig.result || { rows: [], totalCount: 0 }),
      loading: true,
      errorMessage: undefined,
      query,
    };

    this.gridConfig = {
      ...this.gridConfig,
      queryState: query,
      result: loadingResult,
    };

    const requestId = JSON.stringify(query);
    this.pushLog(`Remote grid query: ${requestId}`);

    setTimeout(() => {
      if (this.activeGridPreset !== 'remote') {
        return;
      }

      if (this.remoteDemoForceError) {
        const errorResult: BrGridDataResult = {
          ...(this.gridConfig.result || { rows: [], totalCount: 0 }),
          rows: this.remoteDemoReturnEmpty ? [] : (this.gridConfig.result?.rows || []),
          totalCount: this.remoteDemoReturnEmpty ? 0 : (this.gridConfig.result?.totalCount || 0),
          loading: false,
          errorMessage: 'Demo remote error: request failed while loading grid data.',
          query,
        };

        this.gridConfig = {
          ...this.gridConfig,
          queryState: query,
          result: errorResult,
        };
        this.pushLog('Remote grid demo forced an error state');
        return;
      }

      const result = this.mockRemoteUsersQuery(query);
      this.gridConfig = {
        ...this.gridConfig,
        queryState: query,
        result,
      };
      this.pushLog(`Remote grid loaded ${result.rows.length} rows (total ${result.totalCount})`);
    }, this.remoteDemoDelayMs);
  }

  private mockRemoteUsersQuery(query: BrGridQueryState): BrGridDataResult {
    const allRows = this.getRemoteUsersSeed();
    const searchedRows = this.applyRemoteSearch(allRows, query);
    const filteredRows = this.applyRemoteFilters(searchedRows, query);
    const sortedRows = this.applyRemoteSorting(filteredRows, query);
    const pagedRows = this.applyRemotePagination(sortedRows, query);
    const finalRows = this.remoteDemoReturnEmpty ? [] : pagedRows;
    const finalTotal = this.remoteDemoReturnEmpty ? 0 : filteredRows.length;

    return {
      rows: finalRows,
      totalCount: finalTotal,
      loading: false,
      query,
    };
  }

  triggerRemoteGridReload(): void {
    if (this.activeGridPreset !== 'remote') {
      return;
    }

    this.loadRemoteGridData(this.gridConfig.queryState || { pageIndex: 0, pageSize: this.gridConfig.pageSize || 5 });
  }

  private getRemoteUsersSeed(): any[] {
    // Demo-only fake backend dataset.
    // In a real app, replace this entire remote pipeline with an API call.
    return this.sampleUsers(120);
  }

  private applyRemoteSearch(rows: any[], query: BrGridQueryState): any[] {
    const search = (query.searchText || '').trim().toLowerCase();
    if (!search) {
      return rows;
    }

    return rows.filter((row) =>
      [row.id, row.name, row.team, row.role, row.location, row.status]
        .some((value) => String(value ?? '').toLowerCase().includes(search))
    );
  }

  private applyRemoteFilters(rows: any[], query: BrGridQueryState): any[] {
    const filters = query.filters || [];
    if (!filters.length) {
      return rows;
    }

    return rows.filter((row) =>
      filters.every((filter) => {
        const left = row[filter.field];
        const right = filter.value;

        switch (filter.operator) {
          case 'equals':
            return String(left ?? '') === String(right ?? '');
          case 'startsWith':
            return String(left ?? '').toLowerCase().startsWith(String(right ?? '').toLowerCase());
          case 'endsWith':
            return String(left ?? '').toLowerCase().endsWith(String(right ?? '').toLowerCase());
          case 'contains':
          default:
            return String(left ?? '').toLowerCase().includes(String(right ?? '').toLowerCase());
        }
      })
    );
  }

  private applyRemoteSorting(rows: any[], query: BrGridQueryState): any[] {
    const [primarySort] = query.sort || [];
    if (!primarySort?.field) {
      return rows;
    }

    return [...rows].sort((left, right) => {
      const a = String(left[primarySort.field] ?? '');
      const b = String(right[primarySort.field] ?? '');
      const comparison = a.localeCompare(b, undefined, { sensitivity: 'base', numeric: true });
      return primarySort.direction === 'desc' ? -comparison : comparison;
    });
  }

  private applyRemotePagination(rows: any[], query: BrGridQueryState): any[] {
    const pageIndex = Math.max(0, query.pageIndex || 0);
    const pageSize = Math.max(1, query.pageSize || 5);
    const start = pageIndex * pageSize;
    return rows.slice(start, start + pageSize);
  }

  private clone<T>(value: T): T {
    return JSON.parse(JSON.stringify(value)) as T;
  }
}
