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

// ─── UI Mode Config (for display/debug purposes) ────────────
export { UI_MODE_BY_CONTROL } from './config/ui-mode.config';
export { UI_MODE } from './config/ui-mode.config';
export type { UiMode, DateUiMode, UiModeByControl } from './config/ui-mode.config';
