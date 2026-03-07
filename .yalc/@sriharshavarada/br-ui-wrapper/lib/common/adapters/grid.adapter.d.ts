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
import { BrGridConfig, BrGridColumn, BrGridAction, BrGridColumnOption, BrGridSortRule, BrGridFilterRule, BrGridUiConfig } from '../models/grid-config.model';
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
export interface CustomGridInput extends GridShellInput {
}
export interface MaterialGridInput extends GridShellInput {
    displayedColumns: string[];
}
export interface CanvasGridInput extends GridShellInput {
}
export declare class GridAdapter {
    private static readonly DEFAULT_SELECTION_ACTIONS;
    private static readonly DEFAULT_CONTEXT_ACTIONS;
    private static toShellInput;
    /**
     * Transform generic config → Custom grid inputs
     */
    static toCustom(config: BrGridConfig): CustomGridInput;
    /**
     * Transform generic config → Angular Material grid inputs
     * Key difference: mat-table requires a flat string[] of column fields
     */
    static toMaterial(config: BrGridConfig): MaterialGridInput;
    /**
     * Transform generic config → Canvas grid inputs
     */
    static toCanvas(config: BrGridConfig): CanvasGridInput;
    /**
     * Transform generic config → PrimeNG grid inputs
     */
    static toPrime(config: BrGridConfig): GridShellInput;
}
