/**
 * ============================================================
 * DATE CONFIGURATION MODEL — Library-Agnostic JSON Schema
 * ============================================================
 *
 * This interface defines the shape of the JSON configuration
 * that consuming screens pass to <br-date>.
 *
 * CRITICAL: This schema MUST NOT contain any Angular Material
 * or library-specific properties. It is the public contract.
 * ============================================================
 */

export interface BrDateConfig {
    /** Label text for the date field */
    label: string;

    /** Current date value (ISO string or Date object) */
    value: string | Date | null;

    /** Minimum selectable date */
    minDate?: Date | null;

    /** Maximum selectable date */
    maxDate?: Date | null;

    /** Locale/language for date presentation, e.g. en-US, ar-SA, fr-FR */
    language?: string;
    locale?: string;

    /** Display/parse format passed directly on date control (sibling to DateConfiguration) */
    dateFormat?: string;

    /**
     * Optional advanced/legacy configuration node.
     * Supports relative min/max windows, disabled weekdays,
     * include-today behavior, and defaulting value to today.
     */
    dateConfiguration?: BrAdvancedDateConfiguration | string | null;

    /**
     * Legacy casing compatibility for payloads coming as DateConfiguration.
     */
    DateConfiguration?: BrAdvancedDateConfiguration | string | null;

    /** Whether the field is disabled */
    disabled?: boolean;

    /** Placeholder text */
    placeholder?: string;

    /** Whether the field is required */
    required?: boolean;

    /** Error message to display */
    errorMessage?: string;

    /** Visual configuration for the date control renderer */
    uiConfig?: BrDateUiConfig;
}

export interface BrAdvancedDateConfiguration {
    Disabledaysofweek?: Array<number | string>;
    Firstdayofweek?: number | string;
    Defaulttodaysdate?: boolean;
    Datedisplay?: string | number;
    IncludeToday?: boolean;
    Includetoday?: boolean;
    includeToday?: boolean;
    Currentdate?: string;
    Customdate?: string;
    Minslidervalue?: number | string;
    Maxslidervalue?: number | string;
    Mindate?: string | Date | null;
    Maxdate?: string | Date | null;
}

export interface BrDateUiConfig {
    density?: 'compact' | 'comfortable' | 'spacious';
    size?: 'sm' | 'md' | 'lg';
    variant?: 'outline' | 'filled' | 'plain';
    showBadge?: boolean;
    showIcon?: boolean;
    className?: string;
    tokens?: Record<string, string | number>;
}
