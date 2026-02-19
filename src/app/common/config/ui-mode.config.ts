/**
 * ============================================================
 * UI MODE CONFIGURATION — THE SINGLE SWITCH POINT
 * ============================================================
 *
 * This is the ONLY place in the entire application where you
 * control which UI library is used under the hood.
 *
 * Change UI_MODE to switch ALL br-grid and br-date components
 * across every screen — without touching any consumer code.
 *
 * Options:
 *   'CUSTOM'   → Uses simple HTML table + native date input
 *   'MATERIAL' → Uses Angular Material mat-table + mat-datepicker
 *
 * To add a new library (e.g., PrimeNG, AG Grid), simply:
 *   1. Add a new value to the UiMode type
 *   2. Create new implementation components
 *   3. Update the adapter/factories — that's it!
 * ============================================================
 */

export type UiMode = 'CUSTOM' | 'MATERIAL';

// ▼▼▼ CHANGE THIS VALUE TO SWITCH UI LIBRARIES EVERYWHERE ▼▼▼
export const UI_MODE: UiMode = 'CUSTOM';
// ▲▲▲ CHANGE THIS VALUE TO SWITCH UI LIBRARIES EVERYWHERE ▲▲▲

/**
 * Injection token so that UI_MODE can be injected via Angular DI
 * if needed in future (for runtime switching, etc.)
 */
import { InjectionToken } from '@angular/core';
export const UI_MODE_TOKEN = new InjectionToken<UiMode>('UI_MODE', {
    providedIn: 'root',
    factory: () => UI_MODE,
});
