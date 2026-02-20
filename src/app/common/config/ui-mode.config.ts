/**
 * ============================================================
 * UI MODE CONFIGURATION — PER-CONTROL SWITCH POINT
 * ============================================================
 *
 * This is the place where you control which UI library is used
 * per control type (grid/date) under the hood.
 *
 * Change UI_MODE_BY_CONTROL to switch control implementations
 * across every screen — without touching any consumer code.
 *
 * Options:
 *   'CUSTOM'   → Uses enterprise shell with custom styling + native date input
 *   'MATERIAL' → Uses enterprise shell with material styling + mat-datepicker
 *   'CANVAS'   → Uses canvas-style enterprise shell + mat-datepicker
 *
 * To add a new library (e.g., PrimeNG, AG Grid), simply:
 *   1. Add a new value to the UiMode type
 *   2. Create new implementation components
 *   3. Update the adapter/factories — that's it!
 * ============================================================
 */

export type UiMode = 'CUSTOM' | 'MATERIAL' | 'CANVAS';
export type DateUiMode = 'CUSTOM' | 'MATERIAL';
export interface UiModeByControl {
    grid: UiMode;
    date: DateUiMode;
}

// ▼▼▼ CHANGE THESE VALUES TO SWITCH CONTROL LIBRARIES ▼▼▼
export const UI_MODE_BY_CONTROL: UiModeByControl = {
    grid: 'CUSTOM',
    date: 'MATERIAL',
};
// ▲▲▲ CHANGE THESE VALUES TO SWITCH CONTROL LIBRARIES ▲▲▲

// Backward-compat alias used by existing screen labels/debug displays.
export const UI_MODE: UiMode = UI_MODE_BY_CONTROL.grid;

/**
 * Injection token so that UI mode config can be injected via Angular DI
 * if needed in future (for runtime switching, etc.)
 */
import { InjectionToken } from '@angular/core';
export const UI_MODE_TOKEN = new InjectionToken<UiMode>('UI_MODE', {
    providedIn: 'root',
    factory: () => UI_MODE,
});
export const UI_MODE_BY_CONTROL_TOKEN = new InjectionToken<UiModeByControl>('UI_MODE_BY_CONTROL', {
    providedIn: 'root',
    factory: () => UI_MODE_BY_CONTROL,
});
