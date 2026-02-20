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

export interface BrGridAction {
    id: string;
    label: string;
    icon?: string;
    children?: BrGridAction[];
}

export type BrGridActionSource =
    | 'toolbar-primary'
    | 'toolbar-primary-menu'
    | 'selection-action'
    | 'context-menu'
    | 'sort-apply'
    | 'sort-clear'
    | 'filter-apply'
    | 'filter-clear'
    | 'columns-save'
    | 'columns-cancel'
    | 'refresh'
    | 'search-toggle'
    | 'view-mode-toggle'
    | 'page-change'
    | 'page-size-change'
    | 'selection-change';

export interface BrGridActionEvent {
    source: BrGridActionSource;
    actionId: string;
    label?: string;
    row?: any;
    selectedRows?: any[];
    sortCriteria?: BrGridSortRule[];
    filterCriteria?: BrGridFilterRule[];
    visibleColumns?: string[];
    page?: number;
    pageSize?: number;
}

export interface BrGridColumnOption {
    field: string;
    label?: string;
    group?: string;
}

export interface BrGridToolbarConfig {
    showSort?: boolean;
    showFilter?: boolean;
    showSearch?: boolean;
    showRefresh?: boolean;
    showColumnSettings?: boolean;
    showShare?: boolean;
    showViewMode?: boolean;
    primaryActionLabel?: string;
    primaryActions?: BrGridAction[];
}

export interface BrGridPersonalizationConfig {
    availableColumns?: BrGridColumnOption[];
    selectedColumns?: string[];
    maxSelectedColumns?: number;
    searchPlaceholder?: string;
}

export interface BrGridFeatureConfig {
    enableTopBar?: boolean;
    enableRowSelection?: boolean;
    enableSelectionActions?: boolean;
    enableContextMenu?: boolean;
    enableRowActionButton?: boolean;
    enableColumnPersonalization?: boolean;
    enableColumnVisibilityToggle?: boolean;
    enableColumnReorder?: boolean;
    enableSorting?: boolean;
    sortLevels?: number;
    enableFiltering?: boolean;
    filterLevels?: number;
    enableSearch?: boolean;
    enableRefresh?: boolean;
    enableShare?: boolean;
    enableViewMode?: boolean;
    enablePrimaryAction?: boolean;
    enablePrimaryActionMenu?: boolean;
    showPaginationSizeSelector?: boolean;
    showPaginationSummary?: boolean;
    showPaginationNavigation?: boolean;
}

export interface BrGridUiConfig {
    density?: 'compact' | 'comfortable' | 'spacious';
    size?: 'sm' | 'md' | 'lg';
    borderStyle?: 'soft' | 'sharp' | 'none';
    showBadge?: boolean;
    stickyHeader?: boolean;
    className?: string;
    tokens?: Record<string, string | number>;
}

export interface BrGridSortRule {
    field: string;
    direction: 'asc' | 'desc';
}

export interface BrGridFilterRule {
    field: string;
    operator: 'contains' | 'equals' | 'startsWith' | 'endsWith';
    value: string;
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

    /** Grid toolbar behavior and actions */
    toolbar?: BrGridToolbarConfig;

    /** Row context menu items */
    contextMenuActions?: BrGridAction[];

    /** Actions shown when one or more rows are selected */
    selectionActions?: BrGridAction[];

    /** Column personalization source + default selected fields */
    personalization?: BrGridPersonalizationConfig;

    /** Default sort criteria */
    defaultSort?: BrGridSortRule[];

    /** Default filter criteria */
    defaultFilters?: BrGridFilterRule[];

    /** Master feature toggles for this grid instance */
    features?: BrGridFeatureConfig;

    /** Visual configuration for the grid renderer */
    uiConfig?: BrGridUiConfig;
}
