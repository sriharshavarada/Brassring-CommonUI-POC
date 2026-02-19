/**
 * ============================================================
 * GRID CONFIGURATION MODEL — Library-Agnostic JSON Schema
 * ============================================================
 *
 * This interface defines the shape of the JSON configuration
 * that consuming screens pass to <br-grid>.
 *
 * CRITICAL: This schema MUST NOT contain any Angular Material
 * or library-specific properties. It is the public contract.
 * ============================================================
 */

export interface BrGridColumn {
    /** The property name in the data object */
    field: string;

    /** Display header text */
    header: string;

    /** Whether this column is sortable */
    sortable?: boolean;

    /** Column width (e.g., '100px', '20%') */
    width?: string;

    /** Optional cell formatter function */
    formatter?: (value: any, row: any) => string;
}

export interface BrGridConfig {
    /** Column definitions */
    columns: BrGridColumn[];

    /** Row data array */
    data: any[];

    /** Enable pagination */
    pagination?: boolean;

    /** Page size (rows per page) */
    pageSize?: number;

    /** Enable sorting */
    sorting?: boolean;

    /** Enable row striping */
    striped?: boolean;

    /** Optional title displayed above the grid */
    title?: string;

    /** Optional empty-state message */
    emptyMessage?: string;
}
