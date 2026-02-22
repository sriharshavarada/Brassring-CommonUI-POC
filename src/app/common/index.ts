/**
 * ============================================================
 * COMMON LIBRARY — PUBLIC API (Barrel Export)
 * ============================================================
 *
 * This is the ONLY file that consumer screens should import from.
 * It exports:
 *   - Wrapper components: BrGridComponent, BrDateComponent
 *   - Configuration models: BrGridConfig, BrDateConfig, etc.
 *   - UI_MODE config (for display/debug purposes only)
 *
 * Consumer screens should NEVER import from:
 *   - implementations/
 *   - adapters/
 *
 * Those are internal implementation details of the bracing layer.
 * ============================================================
 */

// ─── Wrapper Components (Façades) ────────────────────────────
export { BrGridComponent } from './components/br-grid/br-grid.component';
export { BrDateComponent } from './components/br-date/br-date.component';
export { BrModalComponent } from './components/br-modal/br-modal.component';
export { BrTextComponent } from './components/br-text/br-text.component';
export { BrSingleSelectComponent } from './components/br-single-select/br-single-select.component';
export { BrMultiSelectComponent } from './components/br-multi-select/br-multi-select.component';
export { BrCheckboxComponent } from './components/br-checkbox/br-checkbox.component';
export { BrRadioComponent } from './components/br-radio/br-radio.component';
export { BrAutocompleteComponent } from './components/br-autocomplete/br-autocomplete.component';

// ─── Configuration Models (JSON Schemas) ─────────────────────
export type {
    BrGridConfig,
    BrGridColumn,
    BrGridAction,
    BrGridActionEvent,
    BrGridActionSource,
    BrGridColumnOption,
    BrGridToolbarConfig,
    BrGridPersonalizationConfig,
    BrGridFeatureConfig,
    BrGridUiConfig,
    BrGridSortRule,
    BrGridFilterRule,
} from './models/grid-config.model';
export type { BrDateConfig, BrDateUiConfig } from './models/date-config.model';
export type { BrModalConfig, BrModalUiConfig, BrModalAction, BrModalActionEvent } from './models/modal-config.model';
export type { BrFormConfig, BrFormField, BrFormFieldType, BrFormOption, BrFormUiConfig, BrFormActionEvent, BrFormActionSource } from './models/form-config.model';
export type {
    BrFormConfig as BrControlsConfig,
    BrFormField as BrControlField,
    BrFormFieldType as BrControlFieldType,
    BrFormOption as BrControlOption,
    BrFormUiConfig as BrControlsUiConfig,
    BrFormActionEvent as BrControlActionEvent,
    BrFormActionSource as BrControlActionSource,
} from './models/form-config.model';
export type {
    BrOption,
    BrTextConfig,
    BrSingleSelectConfig,
    BrMultiSelectConfig,
    BrCheckboxConfig,
    BrRadioConfig,
    BrAutocompleteConfig,
} from './models/controls-config.model';

// ─── UI Mode Config (for display/debug purposes) ────────────
export { UI_MODE_BY_CONTROL } from './config/ui-mode.config';
export { UI_MODE } from './config/ui-mode.config';
export type { UiMode, DateUiMode, ModalUiMode, ControlUiMode, FormUiMode, UiModeByControl } from './config/ui-mode.config';

// ─── Runtime Mode Service ──────────────────────────────────
export { RuntimeUiConfigService } from './services/runtime-ui-config.service';

// ─── Adapters (internal mapping contracts, exported for documentation/testing) ──
export {
    TextAdapter,
    type CustomTextInput,
    type MaterialTextInput,
} from './adapters/text.adapter';
export {
    SingleSelectAdapter,
    type CustomSingleSelectInput,
    type MaterialSingleSelectInput,
} from './adapters/single-select.adapter';
export {
    MultiSelectAdapter,
    type CustomMultiSelectInput,
    type MaterialMultiSelectInput,
} from './adapters/multi-select.adapter';
export {
    CheckboxAdapter,
    type CustomCheckboxInput,
    type MaterialCheckboxInput,
} from './adapters/checkbox.adapter';
export {
    RadioAdapter,
    type CustomRadioInput,
    type MaterialRadioInput,
} from './adapters/radio.adapter';
export {
    AutocompleteAdapter,
    type CustomAutocompleteInput,
    type MaterialAutocompleteInput,
} from './adapters/autocomplete.adapter';
