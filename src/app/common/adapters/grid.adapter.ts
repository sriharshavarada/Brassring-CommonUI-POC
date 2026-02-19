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

import { BrGridConfig, BrGridColumn } from '../models/grid-config.model';

// ─── Custom Grid adapted output ──────────────────────────────
export interface CustomGridInput {
    columns: BrGridColumn[];
    data: any[];
    pagination: boolean;
    pageSize: number;
    sorting: boolean;
    striped: boolean;
    title: string;
    emptyMessage: string;
}

// ─── Material Grid adapted output ────────────────────────────
export interface MaterialGridInput {
    columns: BrGridColumn[];
    displayedColumns: string[];  // mat-table needs a string[] of column keys
    data: any[];
    pagination: boolean;
    pageSize: number;
    sorting: boolean;
    title: string;
    emptyMessage: string;
}

export class GridAdapter {

    /**
     * Transform generic config → Custom grid inputs
     */
    static toCustom(config: BrGridConfig): CustomGridInput {
        return {
            columns: config.columns || [],
            data: config.data || [],
            pagination: config.pagination ?? false,
            pageSize: config.pageSize ?? 10,
            sorting: config.sorting ?? false,
            striped: config.striped ?? true,
            title: config.title ?? '',
            emptyMessage: config.emptyMessage ?? 'No data available',
        };
    }

    /**
     * Transform generic config → Angular Material grid inputs
     * Key difference: mat-table requires a flat string[] of column fields
     */
    static toMaterial(config: BrGridConfig): MaterialGridInput {
        return {
            columns: config.columns || [],
            displayedColumns: (config.columns || []).map(c => c.field),
            data: config.data || [],
            pagination: config.pagination ?? false,
            pageSize: config.pageSize ?? 10,
            sorting: config.sorting ?? false,
            title: config.title ?? '',
            emptyMessage: config.emptyMessage ?? 'No data available',
        };
    }
}
