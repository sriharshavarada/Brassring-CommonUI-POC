/**
 * ============================================================
 * DATE ADAPTER — Transforms generic JSON → implementation inputs
 * ============================================================
 *
 * Transforms the library-agnostic BrDateConfig into whatever
 * format each implementation component needs.
 *
 * For CUSTOM date, maps almost 1:1 to native <input type="date">.
 * For MATERIAL date, prepares MatDatepicker-compatible inputs.
 * ============================================================
 */

import { BrDateConfig } from '../models/date-config.model';

// ─── Custom Date adapted output ──────────────────────────────
export interface CustomDateInput {
    label: string;
    value: string;
    minDate: string | null;
    maxDate: string | null;
    disabled: boolean;
    placeholder: string;
    required: boolean;
    errorMessage: string;
}

// ─── Material Date adapted output ────────────────────────────
export interface MaterialDateInput {
    label: string;
    value: Date | null;
    minDate: Date | null;
    maxDate: Date | null;
    disabled: boolean;
    placeholder: string;
    required: boolean;
    errorMessage: string;
}

export class DateAdapter {

    /**
     * Transform generic config → Custom date input
     * Native HTML date input uses string format (YYYY-MM-DD)
     */
    static toCustom(config: BrDateConfig): CustomDateInput {
        return {
            label: config.label || '',
            value: config.value ? DateAdapter.toISOString(config.value) : '',
            minDate: config.minDate ? DateAdapter.toISOString(config.minDate) : null,
            maxDate: config.maxDate ? DateAdapter.toISOString(config.maxDate) : null,
            disabled: config.disabled ?? false,
            placeholder: config.placeholder ?? 'Select a date',
            required: config.required ?? false,
            errorMessage: config.errorMessage ?? '',
        };
    }

    /**
     * Transform generic config → Material date picker inputs
     * MatDatepicker uses Date objects natively
     */
    static toMaterial(config: BrDateConfig): MaterialDateInput {
        return {
            label: config.label || '',
            value: config.value ? DateAdapter.toDate(config.value) : null,
            minDate: config.minDate ? DateAdapter.toDate(config.minDate) : null,
            maxDate: config.maxDate ? DateAdapter.toDate(config.maxDate) : null,
            disabled: config.disabled ?? false,
            placeholder: config.placeholder ?? 'Select a date',
            required: config.required ?? false,
            errorMessage: config.errorMessage ?? '',
        };
    }

    // ─── Utility Helpers ────────────────────────────────────────
    private static toISOString(value: string | Date): string {
        if (value instanceof Date) {
            return value.toISOString().split('T')[0];
        }
        return value;
    }

    private static toDate(value: string | Date | null): Date | null {
        if (!value) return null;
        if (value instanceof Date) return value;
        return new Date(value);
    }
}
