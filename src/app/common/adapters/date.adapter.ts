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

import { BrAdvancedDateConfiguration, BrDateConfig, BrDateUiConfig } from '../models/date-config.model';

// ─── Custom Date adapted output ──────────────────────────────
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

// ─── Material Date adapted output ────────────────────────────
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

type RelativeUnit = 'days' | 'weeks' | 'months' | 'years';

interface RelativeToken {
    amount: number;
    unit: RelativeUnit;
}

interface ResolvedDateConfig {
    locale: string;
    value: Date | null;
    minDate: Date | null;
    maxDate: Date | null;
    disabledDaysOfWeek: number[];
    firstDayOfWeek: number;
}

export class DateAdapter {

    /**
     * Transform generic config → Custom date input
     * Native HTML date input uses string format (YYYY-MM-DD)
     */
    static toCustom(config: BrDateConfig): CustomDateInput {
        const resolved = DateAdapter.resolveConfig(config);

        return {
            id: config.id || config.controlId,
            name: config.name,
            className: config.className,
            label: config.label || '',
            locale: resolved.locale,
            dateFormat: config.dateFormat || 'yyyy-MM-dd',
            value: resolved.value ? DateAdapter.toISOString(resolved.value) : '',
            minDate: resolved.minDate ? DateAdapter.toISOString(resolved.minDate) : null,
            maxDate: resolved.maxDate ? DateAdapter.toISOString(resolved.maxDate) : null,
            disabledDaysOfWeek: resolved.disabledDaysOfWeek,
            firstDayOfWeek: resolved.firstDayOfWeek,
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
        const resolved = DateAdapter.resolveConfig(config);

        return {
            id: config.id || config.controlId,
            name: config.name,
            className: config.className,
            label: config.label || '',
            locale: resolved.locale,
            dateFormat: config.dateFormat || 'yyyy-MM-dd',
            value: resolved.value,
            minDate: resolved.minDate,
            maxDate: resolved.maxDate,
            disabledDaysOfWeek: resolved.disabledDaysOfWeek,
            firstDayOfWeek: resolved.firstDayOfWeek,
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

    private static resolveConfig(config: BrDateConfig): ResolvedDateConfig {
        const advanced = DateAdapter.readAdvancedConfig(config);
        const today = DateAdapter.startOfDay(new Date());
        const locale = DateAdapter.readLocale(config);

        let value = DateAdapter.toDate(config.value);
        let minDate = DateAdapter.toDate(config.minDate ?? null);
        let maxDate = DateAdapter.toDate(config.maxDate ?? null);
        let disabledDaysOfWeek: number[] = [];
        let firstDayOfWeek = 0;

        if (!advanced) {
            return {
                locale,
                value,
                minDate,
                maxDate,
                disabledDaysOfWeek,
                firstDayOfWeek: DateAdapter.getLocaleFirstDayOfWeek(locale),
            };
        }

        const includeToday = DateAdapter.readIncludeToday(advanced);
        disabledDaysOfWeek = DateAdapter.normalizeDisabledDays(advanced.Disabledaysofweek);
        firstDayOfWeek = DateAdapter.normalizeFirstDayOfWeek(advanced.Firstdayofweek, locale);

        const inferredUnit = DateAdapter.getConfiguredUnit(advanced);
        const minToken = DateAdapter.parseRelativeToken(advanced.Mindate, inferredUnit);
        const maxToken = DateAdapter.parseRelativeToken(advanced.Maxdate, inferredUnit);
        const hasMatchingToken = minToken && maxToken && DateAdapter.rawToken(advanced.Mindate) === DateAdapter.rawToken(advanced.Maxdate);

        if (DateAdapter.readDefaultToday(advanced) && !value) {
            value = today;
        }

        const parsedMinDate = DateAdapter.toDate(advanced.Mindate ?? null);
        const parsedMaxDate = DateAdapter.toDate(advanced.Maxdate ?? null);

        minDate = parsedMinDate ?? minDate;
        maxDate = parsedMaxDate ?? maxDate;

        const zeroToken = (token: RelativeToken | null): boolean => !!token && token.amount === 0;
        const needsAnchoring = hasMatchingToken || zeroToken(minToken) || zeroToken(maxToken);

        if (needsAnchoring) {
            const anchorToken = hasMatchingToken ? minToken : (zeroToken(minToken) ? minToken : maxToken);
            const anchorDate = hasMatchingToken && minToken
                ? DateAdapter.shiftDate(today, minToken.amount, minToken.unit)
                : today;
            const anchored = DateAdapter.expandToUnitRange(anchorDate, anchorToken?.unit ?? inferredUnit, firstDayOfWeek);

            if (hasMatchingToken || zeroToken(minToken)) {
                minDate = anchored.minDate;
            }
            if (hasMatchingToken || zeroToken(maxToken)) {
                maxDate = anchored.maxDate;
            }
        }

        if (minToken && (!needsAnchoring || (!hasMatchingToken && !zeroToken(minToken)))) {
            minDate = DateAdapter.shiftDate(today, minToken.amount, minToken.unit);
        }
        if (maxToken && (!needsAnchoring || (!hasMatchingToken && !zeroToken(maxToken)))) {
            maxDate = DateAdapter.shiftDate(today, maxToken.amount, maxToken.unit);
        }

        if (!includeToday) {
            const hasMin = DateAdapter.hasMeaningfulBound(advanced.Mindate);
            const hasMax = DateAdapter.hasMeaningfulBound(advanced.Maxdate);

            if (hasMin && !hasMax && minDate && DateAdapter.isSameDay(minDate, today)) {
                minDate = DateAdapter.shiftDate(today, 1, 'days');
            }
            if (!hasMin && hasMax && maxDate && DateAdapter.isSameDay(maxDate, today)) {
                maxDate = DateAdapter.shiftDate(today, -1, 'days');
            }
        }

        return {
            locale,
            value,
            minDate,
            maxDate,
            disabledDaysOfWeek,
            firstDayOfWeek,
        };
    }

    private static readAdvancedConfig(config: BrDateConfig): BrAdvancedDateConfiguration | null {
        const raw = config.dateConfiguration ?? config.DateConfiguration;
        if (!raw) return null;

        if (typeof raw === 'string') {
            const text = raw.trim();
            if (!text) return null;
            try {
                const parsed = JSON.parse(text) as BrAdvancedDateConfiguration;
                return Object.keys(parsed || {}).length ? parsed : null;
            } catch {
                return null;
            }
        }

        return Object.keys(raw).length ? raw : null;
    }

    private static readLocale(config: BrDateConfig): string {
        const raw = (config.language || config.locale || '').trim();
        return raw || 'en-US';
    }

    private static readIncludeToday(config: BrAdvancedDateConfiguration): boolean {
        if (typeof config.includeToday === 'boolean') return config.includeToday;
        if (typeof config.IncludeToday === 'boolean') return config.IncludeToday;
        if (typeof config.Includetoday === 'boolean') return config.Includetoday;
        return true;
    }

    private static readDefaultToday(config: BrAdvancedDateConfiguration): boolean {
        return !!config.Defaulttodaysdate;
    }

    private static rawToken(value: string | Date | null | undefined): string {
        return typeof value === 'string' ? value.trim() : '';
    }

    private static hasMeaningfulBound(value: string | Date | null | undefined): boolean {
        if (value instanceof Date) return !Number.isNaN(value.getTime());
        return typeof value === 'string' ? value.trim().length > 0 : false;
    }

    private static getConfiguredUnit(config: BrAdvancedDateConfiguration): RelativeUnit {
        const explicitMode = (config.Customdate || config.Currentdate || '').toString().toLowerCase();
        if (explicitMode.includes('year')) return 'years';
        if (explicitMode.includes('month')) return 'months';
        if (explicitMode.includes('week')) return 'weeks';

        const first = DateAdapter.rawToken(config.Mindate) || DateAdapter.rawToken(config.Maxdate);
        const suffix = first.slice(-1).toLowerCase();
        if (suffix === 'y') return 'years';
        if (suffix === 'm') return 'months';
        if (suffix === 'w') return 'weeks';
        return 'days';
    }

    private static parseRelativeToken(value: string | Date | null | undefined, defaultUnit: RelativeUnit): RelativeToken | null {
        if (value instanceof Date || value == null) return null;
        const text = value.toString().trim().toLowerCase();
        if (!text) return null;

        const match = text.match(/^(-?\d+)\s*([dwmy])?$/i);
        if (!match) return null;

        const amount = Number(match[1]);
        if (Number.isNaN(amount)) return null;

        const unitCode = match[2];
        let unit: RelativeUnit = defaultUnit;
        if (unitCode === 'd') unit = 'days';
        if (unitCode === 'w') unit = 'weeks';
        if (unitCode === 'm') unit = 'months';
        if (unitCode === 'y') unit = 'years';

        return { amount, unit };
    }

    private static normalizeDisabledDays(values: Array<number | string> | undefined): number[] {
        if (!Array.isArray(values)) return [];

        const normalized = values
            .map((value) => (typeof value === 'string' && value.trim() === '' ? Number.NaN : Number(value)))
            .filter((value) => Number.isInteger(value) && value >= 0 && value <= 6);

        return Array.from(new Set(normalized));
    }

    private static normalizeFirstDayOfWeek(value: number | string | undefined, locale: string): number {
        if (value === undefined || value === null || value === '') return DateAdapter.getLocaleFirstDayOfWeek(locale);
        const parsed = Number(value);
        if (!Number.isInteger(parsed)) return DateAdapter.getLocaleFirstDayOfWeek(locale);
        return Math.min(Math.max(parsed, 0), 6);
    }

    private static getLocaleFirstDayOfWeek(locale: string): number {
        try {
            const IntlAny = Intl as unknown as { Locale?: new (tag: string) => { weekInfo?: { firstDay?: number } } };
            if (IntlAny.Locale) {
                const info = new IntlAny.Locale(locale).weekInfo;
                const firstDay = info?.firstDay;
                if (typeof firstDay === 'number') {
                    return firstDay === 7 ? 0 : Math.min(Math.max(firstDay, 0), 6);
                }
            }
        } catch {
            // ignore
        }

        const normalized = locale.toLowerCase();
        if (normalized.startsWith('en-us') || normalized.startsWith('ar-sa')) {
            return 0;
        }
        return 1;
    }

    private static shiftDate(baseDate: Date, amount: number, unit: RelativeUnit): Date {
        const date = new Date(baseDate);

        if (unit === 'days') date.setDate(date.getDate() + amount);
        if (unit === 'weeks') date.setDate(date.getDate() + (amount * 7));
        if (unit === 'months') date.setMonth(date.getMonth() + amount);
        if (unit === 'years') date.setFullYear(date.getFullYear() + amount);

        return DateAdapter.startOfDay(date);
    }

    private static expandToUnitRange(anchorDate: Date, unit: RelativeUnit, firstDayOfWeek: number): { minDate: Date; maxDate: Date } {
        if (unit === 'years') {
            const minDate = new Date(anchorDate.getFullYear(), 0, 1);
            const maxDate = new Date(anchorDate.getFullYear(), 11, 31);
            return { minDate: DateAdapter.startOfDay(minDate), maxDate: DateAdapter.startOfDay(maxDate) };
        }

        if (unit === 'months') {
            const minDate = new Date(anchorDate.getFullYear(), anchorDate.getMonth(), 1);
            const maxDate = new Date(anchorDate.getFullYear(), anchorDate.getMonth() + 1, 0);
            return { minDate: DateAdapter.startOfDay(minDate), maxDate: DateAdapter.startOfDay(maxDate) };
        }

        if (unit === 'weeks') {
            const safeFirstDay = Number.isInteger(firstDayOfWeek) ? Math.min(Math.max(firstDayOfWeek, 0), 6) : 0;
            const day = anchorDate.getDay();
            const diff = (day - safeFirstDay + 7) % 7;
            const minDate = DateAdapter.startOfDay(new Date(anchorDate));
            minDate.setDate(minDate.getDate() - diff);
            const maxDate = DateAdapter.startOfDay(new Date(minDate));
            maxDate.setDate(maxDate.getDate() + 6);
            return { minDate, maxDate };
        }

        const day = DateAdapter.startOfDay(anchorDate);
        return { minDate: day, maxDate: day };
    }

    private static isSameDay(a: Date, b: Date): boolean {
        return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
    }

    private static startOfDay(date: Date): Date {
        const copy = new Date(date);
        copy.setHours(0, 0, 0, 0);
        return copy;
    }

    // ─── Utility Helpers ────────────────────────────────────────
    private static toISOString(value: string | Date): string {
        if (value instanceof Date) {
            return DateAdapter.toLocalIsoDate(value);
        }

        const localIso = DateAdapter.tryParseLocalIso(value);
        if (localIso) {
            return DateAdapter.toLocalIsoDate(localIso);
        }

        const parsed = new Date(value);
        if (!Number.isNaN(parsed.getTime())) {
            return DateAdapter.toLocalIsoDate(parsed);
        }

        return value;
    }

    private static toDate(value: string | Date | null | undefined): Date | null {
        if (!value) return null;
        if (value instanceof Date) return Number.isNaN(value.getTime()) ? null : DateAdapter.startOfDay(value);

        const localIso = DateAdapter.tryParseLocalIso(value);
        if (localIso) return DateAdapter.startOfDay(localIso);

        const parsed = new Date(value);
        return Number.isNaN(parsed.getTime()) ? null : DateAdapter.startOfDay(parsed);
    }

    private static tryParseLocalIso(value: string): Date | null {
        const match = value.trim().match(/^(\d{4})-(\d{2})-(\d{2})$/);
        if (!match) return null;

        const year = Number(match[1]);
        const monthIndex = Number(match[2]) - 1;
        const day = Number(match[3]);

        if (!Number.isInteger(year) || !Number.isInteger(monthIndex) || !Number.isInteger(day)) return null;

        const parsed = new Date(year, monthIndex, day);
        if (parsed.getFullYear() !== year || parsed.getMonth() !== monthIndex || parsed.getDate() !== day) return null;

        return parsed;
    }

    private static toLocalIsoDate(value: Date): string {
        const year = value.getFullYear();
        const month = String(value.getMonth() + 1).padStart(2, '0');
        const day = String(value.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
}
