/**
 * ============================================================
 * GRID ADAPTER — Transforms generic JSON → implementation inputs
 * ============================================================
 *
 * The adapter sits between the façade (br-grid) and the actual
 * implementation components. It transforms the library-agnostic
 * BrGridConfig into whatever format each implementation needs.
 *
 * For CUSTOM grids, the config maps almost 1:1.
 * For MATERIAL grids, we need to extract displayedColumns,
 * create MatTableDataSource, configure MatSort/MatPaginator, etc.
 * ============================================================
 */

import {
    BrGridConfig,
    BrGridColumn,
    BrGridAction,
    BrGridColumnOption,
    BrGridSortRule,
    BrGridFilterRule,
    BrGridUiConfig,
} from '../models/grid-config.model';

export interface GridShellInput {
    columns: BrGridColumn[];
    data: any[];
    pagination: boolean;
    pageSize: number;
    sorting: boolean;
    striped: boolean;
    title: string;
    emptyMessage: string;
    toolbar: {
        showSort: boolean;
        showFilter: boolean;
        showSearch: boolean;
        showRefresh: boolean;
        showColumnSettings: boolean;
        showShare: boolean;
        showViewMode: boolean;
        primaryActionLabel: string;
        primaryActions: BrGridAction[];
    };
    contextMenuActions: BrGridAction[];
    selectionActions: BrGridAction[];
    personalization: {
        availableColumns: BrGridColumnOption[];
        selectedColumns: string[];
        maxSelectedColumns: number;
        searchPlaceholder: string;
    };
    defaultSort: BrGridSortRule[];
    defaultFilters: BrGridFilterRule[];
    features: {
        enableTopBar: boolean;
        enableRowSelection: boolean;
        enableSelectionActions: boolean;
        enableContextMenu: boolean;
        enableRowActionButton: boolean;
        enableColumnPersonalization: boolean;
        enableColumnVisibilityToggle: boolean;
        enableColumnReorder: boolean;
        enableSorting: boolean;
        sortLevels: number;
        enableFiltering: boolean;
        filterLevels: number;
        enableSearch: boolean;
        enableRefresh: boolean;
        enableShare: boolean;
        enableViewMode: boolean;
        enablePrimaryAction: boolean;
        enablePrimaryActionMenu: boolean;
        showPaginationSizeSelector: boolean;
        showPaginationSummary: boolean;
        showPaginationNavigation: boolean;
    };
    uiConfig: Required<Omit<BrGridUiConfig, 'tokens' | 'className'>> & {
        className: string;
        tokens: Record<string, string | number>;
    };
}

// ─── Custom Grid adapted output ──────────────────────────────
export interface CustomGridInput extends GridShellInput {}

// ─── Material Grid adapted output ────────────────────────────
export interface MaterialGridInput extends GridShellInput {
    displayedColumns: string[];  // mat-table needs a string[] of column keys
}

// ─── Canvas Grid adapted output ─────────────────────────────
export interface CanvasGridInput extends GridShellInput {}

export class GridAdapter {
    private static readonly DEFAULT_SELECTION_ACTIONS: BrGridAction[] = [
        { id: 'more-actions', label: 'More Actions' },
        { id: 'edit', label: 'Edit' },
        { id: 'save-as-new', label: 'Save As New' },
        { id: 'status', label: 'Status' },
        { id: 'posting', label: 'Posting' },
    ];

    private static readonly DEFAULT_CONTEXT_ACTIONS: BrGridAction[] = [
        { id: 'more-actions', label: 'More Actions' },
        { id: 'edit', label: 'Edit' },
        { id: 'save-as-new', label: 'Save As New' },
        { id: 'status', label: 'Status' },
        { id: 'posting', label: 'Posting' },
    ];

    private static toShellInput(config: BrGridConfig): GridShellInput {
        const columns = config.columns || [];
        const selectedColumns = config.personalization?.selectedColumns?.length
            ? config.personalization.selectedColumns.filter((field) => columns.some((c) => c.field === field))
            : columns.map((col) => col.field);

        const rawAvailableColumns: BrGridColumnOption[] = (config.personalization?.availableColumns?.length
            ? config.personalization.availableColumns
            : columns.map((col) => ({ field: col.field, label: col.header })));

        const availableColumns = rawAvailableColumns.map((option) => ({
                field: option.field,
                label: option.label ?? columns.find((col) => col.field === option.field)?.header ?? option.field,
                group: option.group,
        }));

        return {
            columns,
            data: config.data || [],
            pagination: config.pagination ?? false,
            pageSize: config.pageSize ?? 5,
            sorting: config.sorting ?? false,
            striped: config.striped ?? true,
            title: config.title ?? '',
            emptyMessage: config.emptyMessage ?? 'No data available',
            toolbar: {
                showSort: config.toolbar?.showSort ?? true,
                showFilter: config.toolbar?.showFilter ?? true,
                showSearch: config.toolbar?.showSearch ?? true,
                showRefresh: config.toolbar?.showRefresh ?? true,
                showColumnSettings: config.toolbar?.showColumnSettings ?? true,
                showShare: config.toolbar?.showShare ?? true,
                showViewMode: config.toolbar?.showViewMode ?? true,
                primaryActionLabel: config.toolbar?.primaryActionLabel ?? 'Add Req',
                primaryActions: config.toolbar?.primaryActions ?? [],
            },
            contextMenuActions: config.contextMenuActions?.length
                ? config.contextMenuActions
                : [...GridAdapter.DEFAULT_CONTEXT_ACTIONS],
            selectionActions: config.selectionActions?.length
                ? config.selectionActions
                : [...GridAdapter.DEFAULT_SELECTION_ACTIONS],
            personalization: {
                availableColumns,
                selectedColumns,
                maxSelectedColumns: config.personalization?.maxSelectedColumns ?? 20,
                searchPlaceholder: config.personalization?.searchPlaceholder ?? 'Search for available columns',
            },
            defaultSort: config.defaultSort ?? [],
            defaultFilters: config.defaultFilters ?? [],
            features: {
                enableTopBar: config.features?.enableTopBar ?? true,
                enableRowSelection: config.features?.enableRowSelection ?? true,
                enableSelectionActions: config.features?.enableSelectionActions ?? true,
                enableContextMenu: config.features?.enableContextMenu ?? true,
                enableRowActionButton: config.features?.enableRowActionButton ?? true,
                enableColumnPersonalization: config.features?.enableColumnPersonalization ?? true,
                enableColumnVisibilityToggle: config.features?.enableColumnVisibilityToggle ?? true,
                enableColumnReorder: config.features?.enableColumnReorder ?? true,
                enableSorting: config.features?.enableSorting ?? (config.sorting ?? false),
                sortLevels: Math.max(1, Math.min(6, config.features?.sortLevels ?? 3)),
                enableFiltering: config.features?.enableFiltering ?? true,
                filterLevels: Math.max(1, Math.min(6, config.features?.filterLevels ?? 3)),
                enableSearch: config.features?.enableSearch ?? true,
                enableRefresh: config.features?.enableRefresh ?? true,
                enableShare: config.features?.enableShare ?? true,
                enableViewMode: config.features?.enableViewMode ?? true,
                enablePrimaryAction: config.features?.enablePrimaryAction ?? true,
                enablePrimaryActionMenu: config.features?.enablePrimaryActionMenu ?? true,
                showPaginationSizeSelector: config.features?.showPaginationSizeSelector ?? true,
                showPaginationSummary: config.features?.showPaginationSummary ?? true,
                showPaginationNavigation: config.features?.showPaginationNavigation ?? true,
            },
            uiConfig: {
                density: config.uiConfig?.density ?? 'comfortable',
                size: config.uiConfig?.size ?? 'md',
                borderStyle: config.uiConfig?.borderStyle ?? 'soft',
                showBadge: config.uiConfig?.showBadge ?? true,
                stickyHeader: config.uiConfig?.stickyHeader ?? false,
                className: config.uiConfig?.className ?? '',
                tokens: config.uiConfig?.tokens ?? {},
            },
        };
    }

    /**
     * Transform generic config → Custom grid inputs
     */
    static toCustom(config: BrGridConfig): CustomGridInput {
        return GridAdapter.toShellInput(config);
    }

    /**
     * Transform generic config → Angular Material grid inputs
     * Key difference: mat-table requires a flat string[] of column fields
     */
    static toMaterial(config: BrGridConfig): MaterialGridInput {
        const shell = GridAdapter.toShellInput(config);
        return {
            ...shell,
            displayedColumns: shell.columns.map(c => c.field),
        };
    }

    /**
     * Transform generic config → Canvas grid inputs
     */
    static toCanvas(config: BrGridConfig): CanvasGridInput {
        return GridAdapter.toShellInput(config);
    }
}
