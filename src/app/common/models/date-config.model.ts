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

    /** Whether the field is disabled */
    disabled?: boolean;

    /** Placeholder text */
    placeholder?: string;

    /** Whether the field is required */
    required?: boolean;

    /** Error message to display */
    errorMessage?: string;
}
