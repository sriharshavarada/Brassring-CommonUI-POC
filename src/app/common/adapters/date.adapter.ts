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

import { BrDateConfig, BrDateUiConfig } from '../models/date-config.model';

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
    uiConfig: Required<Omit<BrDateUiConfig, 'tokens' | 'className'>> & {
        className: string;
        tokens: Record<string, string | number>;
    };
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
    uiConfig: Required<Omit<BrDateUiConfig, 'tokens' | 'className'>> & {
        className: string;
        tokens: Record<string, string | number>;
    };
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
            uiConfig: {
                density: config.uiConfig?.density ?? 'comfortable',
                size: config.uiConfig?.size ?? 'md',
                variant: config.uiConfig?.variant ?? 'outline',
                showBadge: config.uiConfig?.showBadge ?? true,
                showIcon: config.uiConfig?.showIcon ?? true,
                className: config.uiConfig?.className ?? '',
                tokens: config.uiConfig?.tokens ?? {},
            },
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
            uiConfig: {
                density: config.uiConfig?.density ?? 'comfortable',
                size: config.uiConfig?.size ?? 'md',
                variant: config.uiConfig?.variant ?? 'outline',
                showBadge: config.uiConfig?.showBadge ?? true,
                showIcon: config.uiConfig?.showIcon ?? true,
                className: config.uiConfig?.className ?? '',
                tokens: config.uiConfig?.tokens ?? {},
            },
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
