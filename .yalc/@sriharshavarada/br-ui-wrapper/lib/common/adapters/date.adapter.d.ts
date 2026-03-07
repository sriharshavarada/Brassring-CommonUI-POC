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
export interface CustomDateInput {
    id?: string;
    name?: string;
    className?: string;
    label: string;
    locale: string;
    dateFormat: string;
    value: string;
    minDate: string | null;
    maxDate: string | null;
    disabledDaysOfWeek: number[];
    firstDayOfWeek: number;
    disabled: boolean;
    placeholder: string;
    required: boolean;
    errorMessage: string;
    uiConfig: Required<Omit<BrDateUiConfig, 'tokens' | 'className'>> & {
        className: string;
        tokens: Record<string, string | number>;
    };
}
export interface MaterialDateInput {
    id?: string;
    name?: string;
    className?: string;
    label: string;
    locale: string;
    dateFormat: string;
    value: Date | null;
    minDate: Date | null;
    maxDate: Date | null;
    disabledDaysOfWeek: number[];
    firstDayOfWeek: number;
    disabled: boolean;
    placeholder: string;
    required: boolean;
    errorMessage: string;
    uiConfig: Required<Omit<BrDateUiConfig, 'tokens' | 'className'>> & {
        className: string;
        tokens: Record<string, string | number>;
    };
}
export interface PrimeDateInput extends MaterialDateInput {
}
export declare class DateAdapter {
    /**
     * Transform generic config → Custom date input
     * Native HTML date input uses string format (YYYY-MM-DD)
     */
    static toCustom(config: BrDateConfig): CustomDateInput;
    /**
     * Transform generic config → Material date picker inputs
     * MatDatepicker uses Date objects natively
     */
    static toMaterial(config: BrDateConfig): MaterialDateInput;
    /**
     * Transform generic config → PrimeNG date picker inputs
     */
    static toPrime(config: BrDateConfig): PrimeDateInput;
    private static resolveConfig;
    private static readAdvancedConfig;
    private static readLocale;
    private static readIncludeToday;
    private static readDefaultToday;
    private static rawToken;
    private static hasMeaningfulBound;
    private static getConfiguredUnit;
    private static parseRelativeToken;
    private static normalizeDisabledDays;
    private static normalizeFirstDayOfWeek;
    private static getLocaleFirstDayOfWeek;
    private static shiftDate;
    private static expandToUnitRange;
    private static isSameDay;
    private static startOfDay;
    private static toISOString;
    private static toDate;
    private static tryParseLocalIso;
    private static toLocalIsoDate;
}
