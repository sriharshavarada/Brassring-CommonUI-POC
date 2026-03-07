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
export type UiMode = 'CUSTOM' | 'MATERIAL' | 'CANVAS' | 'PRIMENG';
export type DateUiMode = 'CUSTOM' | 'MATERIAL' | 'PRIMENG';
export type ModalUiMode = 'CUSTOM' | 'MATERIAL' | 'PRIMENG';
export type ControlUiMode = 'CUSTOM' | 'MATERIAL' | 'PRIMENG';
export type FormUiMode = ControlUiMode;
export interface UiModeByControl {
    grid: UiMode;
    date: DateUiMode;
    modal: ModalUiMode;
    text: ControlUiMode;
    singleSelect: ControlUiMode;
    multiSelect: ControlUiMode;
    checkbox: ControlUiMode;
    radio: ControlUiMode;
    autocomplete: ControlUiMode;
}
export declare const UI_MODE_BY_CONTROL: UiModeByControl;
export declare const UI_MODE: UiMode;
/**
 * Injection token so that UI mode config can be injected via Angular DI
 * if needed in future (for runtime switching, etc.)
 */
import { InjectionToken } from '@angular/core';
export declare const UI_MODE_TOKEN: InjectionToken<UiMode>;
export declare const UI_MODE_BY_CONTROL_TOKEN: InjectionToken<UiModeByControl>;
