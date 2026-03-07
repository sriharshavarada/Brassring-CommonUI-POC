import * as i0 from '@angular/core';
import { Injectable, Component, EventEmitter, HostListener, Output, Input, InjectionToken, forwardRef, inject, ChangeDetectionStrategy, Inject } from '@angular/core';
import * as i1 from '@angular/common';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import * as i2 from '@angular/forms';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import * as i2$1 from 'primeng/table';
import { TableModule } from 'primeng/table';
import * as i3 from 'primeng/api';
import * as i3$1 from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import * as i4 from '@angular/material/button';
import { MatButtonModule } from '@angular/material/button';
import * as i5 from '@angular/material/icon';
import { MatIconModule } from '@angular/material/icon';
import * as i3$2 from '@angular/material/input';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import * as i7 from '@angular/material/radio';
import { MatRadioModule } from '@angular/material/radio';
import * as i3$3 from '@angular/material/checkbox';
import { MatCheckboxModule } from '@angular/material/checkbox';
import * as i5$1 from '@angular/material/select';
import { MatSelectModule } from '@angular/material/select';
import * as i3$4 from 'primeng/dialog';
import { DialogModule } from 'primeng/dialog';
import * as i5$2 from 'primeng/button';
import { ButtonModule } from 'primeng/button';
import * as i6 from 'primeng/inputtext';
import { InputTextModule } from 'primeng/inputtext';
import * as i7$1 from 'primeng/textarea';
import { TextareaModule } from 'primeng/textarea';
import * as i8 from 'primeng/select';
import { SelectModule } from 'primeng/select';
import * as i9 from 'primeng/radiobutton';
import { RadioButtonModule } from 'primeng/radiobutton';
import * as i10 from 'primeng/checkbox';
import { CheckboxModule } from 'primeng/checkbox';
import * as i11 from 'primeng/datepicker';
import { DatePickerModule } from 'primeng/datepicker';
import * as i12 from 'primeng/multiselect';
import { MultiSelectModule } from 'primeng/multiselect';
import * as i13 from 'primeng/autocomplete';
import { AutoCompleteModule } from 'primeng/autocomplete';
import * as i4$1 from 'primeng/floatlabel';
import { FloatLabelModule } from 'primeng/floatlabel';
import * as i5$3 from '@angular/material/datepicker';
import { MatCalendar, MatDatepickerModule } from '@angular/material/datepicker';
import * as i1$1 from '@angular/material/core';
import { DateAdapter as DateAdapter$1, NativeDateAdapter, MatNativeDateModule } from '@angular/material/core';
import * as i3$5 from '@angular/material/autocomplete';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

class BrUiWrapperService {
    constructor() { }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.19", ngImport: i0, type: BrUiWrapperService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "19.2.19", ngImport: i0, type: BrUiWrapperService, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.19", ngImport: i0, type: BrUiWrapperService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: () => [] });

class BrUiWrapperComponent {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.19", ngImport: i0, type: BrUiWrapperComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.19", type: BrUiWrapperComponent, isStandalone: true, selector: "br-br-ui-wrapper", ngImport: i0, template: `
    <p>
      br-ui-wrapper works!
    </p>
  `, isInline: true, styles: [""] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.19", ngImport: i0, type: BrUiWrapperComponent, decorators: [{
            type: Component,
            args: [{ selector: 'br-br-ui-wrapper', imports: [], template: `
    <p>
      br-ui-wrapper works!
    </p>
  ` }]
        }] });

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
class GridAdapter {
    static DEFAULT_SELECTION_ACTIONS = [
        { id: 'more-actions', label: 'More Actions' },
        { id: 'edit', label: 'Edit' },
        { id: 'save-as-new', label: 'Save As New' },
        { id: 'status', label: 'Status' },
        { id: 'posting', label: 'Posting' },
    ];
    static DEFAULT_CONTEXT_ACTIONS = [
        { id: 'more-actions', label: 'More Actions' },
        { id: 'edit', label: 'Edit' },
        { id: 'save-as-new', label: 'Save As New' },
        { id: 'status', label: 'Status' },
        { id: 'posting', label: 'Posting' },
    ];
    static toShellInput(config) {
        const columns = config.columns || [];
        const selectedColumns = config.personalization?.selectedColumns?.length
            ? config.personalization.selectedColumns.filter((field) => columns.some((c) => c.field === field))
            : columns.map((col) => col.field);
        const rawAvailableColumns = (config.personalization?.availableColumns?.length
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
    static toCustom(config) {
        return GridAdapter.toShellInput(config);
    }
    /**
     * Transform generic config → Angular Material grid inputs
     * Key difference: mat-table requires a flat string[] of column fields
     */
    static toMaterial(config) {
        const shell = GridAdapter.toShellInput(config);
        return {
            ...shell,
            displayedColumns: shell.columns.map(c => c.field),
        };
    }
    /**
     * Transform generic config → Canvas grid inputs
     */
    static toCanvas(config) {
        return GridAdapter.toShellInput(config);
    }
    /**
     * Transform generic config → PrimeNG grid inputs
     */
    static toPrime(config) {
        return GridAdapter.toShellInput(config);
    }
}

class GridShellComponent {
    config;
    variant = 'custom';
    action = new EventEmitter();
    allColumns = [];
    availableColumns = [];
    visibleColumnFields = [];
    rows = [];
    pageRows = [];
    selectedRowIds = new Set();
    searchOpen = false;
    searchTerm = '';
    zoomMode = false;
    showSortModal = false;
    showFilterModal = false;
    sortCriteria = [];
    filterCriteria = [];
    showColumnsPanel = false;
    showPrimaryActionMenu = false;
    columnSearch = '';
    showContextMenu = false;
    contextX = 0;
    contextY = 0;
    contextRowId = null;
    currentPage = 1;
    pageSize = 5;
    totalPages = 1;
    totalRows = 0;
    pageSizeOptions = [5, 10, 15];
    get rootClasses() {
        const classes = [
            `density-${this.config.uiConfig.density}`,
            `size-${this.config.uiConfig.size}`,
            `border-${this.config.uiConfig.borderStyle}`,
        ];
        if (this.config.uiConfig.stickyHeader) {
            classes.push('sticky-header');
        }
        if (this.config.uiConfig.className) {
            classes.push(this.config.uiConfig.className);
        }
        return classes;
    }
    get rootStyles() {
        const styles = {};
        const tokens = this.config.uiConfig.tokens || {};
        Object.entries(tokens).forEach(([key, value]) => {
            styles[`--grid-${key}`] = String(value);
        });
        return styles;
    }
    get isCustomVariant() {
        return this.variant === 'custom';
    }
    get isMaterialVariant() {
        return this.variant === 'material';
    }
    get isCanvasVariant() {
        return this.variant === 'canvas';
    }
    get activeSortCount() {
        return this.sortCriteria.filter((x) => !!x.field).length;
    }
    get activeFilterCount() {
        return this.filterCriteria.filter((x) => !!x.field && !!x.value.trim()).length;
    }
    get activeColumns() {
        return this.visibleColumnFields
            .map((field) => this.allColumns.find((col) => col.field === field))
            .filter((col) => !!col);
    }
    get filteredColumnOptions() {
        const term = this.columnSearch.toLowerCase().trim();
        if (!term) {
            return this.availableColumns;
        }
        return this.availableColumns.filter((col) => `${col.label || ''} ${col.field} ${col.group || ''}`.toLowerCase().includes(term));
    }
    get selectionCount() {
        return this.selectedRowIds.size;
    }
    get isAllPageSelected() {
        return this.pageRows.length > 0 && this.pageRows.every((row) => this.selectedRowIds.has(row.__rowId));
    }
    get isSomePageSelected() {
        return this.pageRows.some((row) => this.selectedRowIds.has(row.__rowId));
    }
    get startItem() {
        return this.totalRows === 0 ? 0 : (this.currentPage - 1) * this.pageSize + 1;
    }
    get endItem() {
        return Math.min(this.currentPage * this.pageSize, this.totalRows);
    }
    ngOnChanges(changes) {
        if (!changes['config'] || !this.config) {
            return;
        }
        this.allColumns = [...(this.config.columns || [])];
        this.availableColumns = [...(this.config.personalization?.availableColumns || [])];
        this.visibleColumnFields = [...(this.config.personalization?.selectedColumns || this.allColumns.map((col) => col.field))];
        this.rows = (this.config.data || []).map((raw, index) => ({ __rowId: index, __raw: raw }));
        this.sortCriteria = this.seedSortCriteria(this.config.defaultSort || []);
        this.filterCriteria = this.seedFilterCriteria(this.config.defaultFilters || []);
        this.pageSize = this.config.pageSize || 5;
        if (!this.pageSizeOptions.includes(this.pageSize)) {
            this.pageSizeOptions = [...this.pageSizeOptions, this.pageSize].sort((a, b) => a - b);
        }
        this.currentPage = 1;
        this.searchTerm = '';
        this.searchOpen = false;
        this.showPrimaryActionMenu = false;
        this.selectedRowIds.clear();
        this.contextRowId = null;
        this.applyView();
    }
    onDocumentClick() {
        this.showContextMenu = false;
        this.showPrimaryActionMenu = false;
    }
    openSortModal(event) {
        if (!this.config.features.enableSorting) {
            return;
        }
        event.stopPropagation();
        this.showSortModal = true;
    }
    closeSortModal() {
        this.showSortModal = false;
    }
    openFilterModal(event) {
        if (!this.config.features.enableFiltering) {
            return;
        }
        event.stopPropagation();
        this.showFilterModal = true;
    }
    closeFilterModal() {
        this.showFilterModal = false;
    }
    applySortCriteria() {
        this.currentPage = 1;
        this.applyView();
        this.showSortModal = false;
        this.emitAction({
            source: 'sort-apply',
            actionId: 'sort-apply',
            sortCriteria: this.sortCriteria.filter((x) => x.field),
        });
    }
    clearSortCriteria() {
        this.sortCriteria = this.seedSortCriteria([]);
        this.applyView();
        this.emitAction({ source: 'sort-clear', actionId: 'sort-clear' });
    }
    applyFilterCriteria() {
        this.currentPage = 1;
        this.applyView();
        this.showFilterModal = false;
        this.emitAction({
            source: 'filter-apply',
            actionId: 'filter-apply',
            filterCriteria: this.filterCriteria.filter((x) => x.field && x.value.trim()),
        });
    }
    clearFilterCriteria() {
        this.filterCriteria = this.seedFilterCriteria([]);
        this.applyView();
        this.emitAction({ source: 'filter-clear', actionId: 'filter-clear' });
    }
    toggleSearch() {
        if (!this.config.features.enableSearch) {
            return;
        }
        this.searchOpen = !this.searchOpen;
        this.emitAction({ source: 'search-toggle', actionId: this.searchOpen ? 'search-open' : 'search-close' });
        if (!this.searchOpen) {
            this.searchTerm = '';
            this.applyView();
        }
    }
    toggleZoomMode() {
        if (!this.config.features.enableViewMode) {
            return;
        }
        this.zoomMode = !this.zoomMode;
        this.emitAction({ source: 'view-mode-toggle', actionId: this.zoomMode ? 'view-mode-on' : 'view-mode-off' });
    }
    onSearchChange() {
        this.currentPage = 1;
        this.applyView();
    }
    refreshGrid() {
        this.searchTerm = '';
        this.searchOpen = false;
        this.sortCriteria = this.seedSortCriteria(this.config.defaultSort || []);
        this.filterCriteria = this.seedFilterCriteria(this.config.defaultFilters || []);
        this.currentPage = 1;
        this.selectedRowIds.clear();
        this.applyView();
        this.emitAction({ source: 'refresh', actionId: 'refresh' });
    }
    openColumnsPanel(event) {
        if (!this.config.features.enableColumnPersonalization) {
            return;
        }
        event.stopPropagation();
        this.showColumnsPanel = true;
    }
    closeColumnsPanel() {
        this.showColumnsPanel = false;
        this.columnSearch = '';
        this.emitAction({
            source: 'columns-cancel',
            actionId: 'columns-cancel',
            visibleColumns: [...this.visibleColumnFields],
        });
    }
    togglePrimaryActionMenu(event) {
        if (!this.config.features.enablePrimaryActionMenu) {
            return;
        }
        event.stopPropagation();
        this.showPrimaryActionMenu = !this.showPrimaryActionMenu;
    }
    toggleColumn(field) {
        if (!this.config.features.enableColumnVisibilityToggle) {
            return;
        }
        const exists = this.visibleColumnFields.includes(field);
        if (exists) {
            if (this.visibleColumnFields.length === 1) {
                return;
            }
            this.visibleColumnFields = this.visibleColumnFields.filter((f) => f !== field);
        }
        else {
            if (this.visibleColumnFields.length >= this.config.personalization.maxSelectedColumns) {
                return;
            }
            this.visibleColumnFields = [...this.visibleColumnFields, field];
        }
        this.applyView();
    }
    removeColumn(field) {
        if (this.visibleColumnFields.length === 1) {
            return;
        }
        this.visibleColumnFields = this.visibleColumnFields.filter((f) => f !== field);
        this.applyView();
    }
    moveColumn(field, direction) {
        if (!this.config.features.enableColumnReorder) {
            return;
        }
        const idx = this.visibleColumnFields.indexOf(field);
        if (idx < 0) {
            return;
        }
        const target = idx + direction;
        if (target < 0 || target >= this.visibleColumnFields.length) {
            return;
        }
        const clone = [...this.visibleColumnFields];
        [clone[idx], clone[target]] = [clone[target], clone[idx]];
        this.visibleColumnFields = clone;
        this.applyView();
    }
    toggleSelectAllOnPage(checked) {
        if (!this.config.features.enableRowSelection) {
            return;
        }
        if (checked) {
            this.pageRows.forEach((row) => this.selectedRowIds.add(row.__rowId));
        }
        else {
            this.pageRows.forEach((row) => this.selectedRowIds.delete(row.__rowId));
        }
        this.emitSelectionChange();
    }
    toggleRowSelection(rowId, checked) {
        if (!this.config.features.enableRowSelection) {
            return;
        }
        if (checked) {
            this.selectedRowIds.add(rowId);
        }
        else {
            this.selectedRowIds.delete(rowId);
        }
        this.emitSelectionChange();
    }
    clearSelection() {
        this.selectedRowIds.clear();
        this.emitSelectionChange();
    }
    onRowContextMenu(event, rowId) {
        if (!this.config.features.enableContextMenu) {
            return;
        }
        event.preventDefault();
        event.stopPropagation();
        this.contextX = event.clientX;
        this.contextY = event.clientY;
        this.contextRowId = rowId;
        this.showContextMenu = true;
    }
    openContextMenuFromButton(event, rowId) {
        if (!this.config.features.enableContextMenu) {
            return;
        }
        event.preventDefault();
        event.stopPropagation();
        const target = event.target;
        const rect = target.getBoundingClientRect();
        this.contextX = rect.right - 220;
        this.contextY = rect.bottom + 8;
        this.contextRowId = rowId;
        this.showContextMenu = true;
    }
    closeContextMenu(event) {
        event.stopPropagation();
        this.showContextMenu = false;
        this.contextRowId = null;
    }
    getCellValue(row, field) {
        const rawValue = row.__raw[field];
        const col = this.allColumns.find((x) => x.field === field);
        if (col?.formatter) {
            return col.formatter(rawValue, row.__raw);
        }
        return rawValue ?? '';
    }
    getColumnHeader(field) {
        return this.allColumns.find((col) => col.field === field)?.header ?? field;
    }
    getColumnGroup(field) {
        return this.availableColumns.find((col) => col.field === field)?.group ?? '';
    }
    trackByRow(_, row) {
        return row.__rowId;
    }
    trackByField(_, field) {
        return field;
    }
    trackByAction(_, action) {
        return action.id;
    }
    setPageSize(value) {
        this.pageSize = value;
        this.currentPage = 1;
        this.applyView();
        this.emitAction({
            source: 'page-size-change',
            actionId: 'page-size-change',
            page: this.currentPage,
            pageSize: this.pageSize,
        });
    }
    nextPage() {
        if (this.currentPage < this.totalPages) {
            this.currentPage += 1;
            this.applyView();
            this.emitAction({ source: 'page-change', actionId: 'page-change', page: this.currentPage, pageSize: this.pageSize });
        }
    }
    prevPage() {
        if (this.currentPage > 1) {
            this.currentPage -= 1;
            this.applyView();
            this.emitAction({ source: 'page-change', actionId: 'page-change', page: this.currentPage, pageSize: this.pageSize });
        }
    }
    firstPage() {
        if (this.currentPage !== 1) {
            this.currentPage = 1;
            this.applyView();
            this.emitAction({ source: 'page-change', actionId: 'page-change', page: this.currentPage, pageSize: this.pageSize });
        }
    }
    lastPage() {
        if (this.currentPage !== this.totalPages) {
            this.currentPage = this.totalPages;
            this.applyView();
            this.emitAction({ source: 'page-change', actionId: 'page-change', page: this.currentPage, pageSize: this.pageSize });
        }
    }
    onToolbarPrimaryClick() {
        this.emitAction({ source: 'toolbar-primary', actionId: 'toolbar-primary', label: this.config.toolbar.primaryActionLabel });
    }
    onToolbarPrimaryMenuAction(action) {
        this.showPrimaryActionMenu = false;
        this.emitAction({ source: 'toolbar-primary-menu', actionId: action.id, label: action.label });
    }
    onSelectionActionClick(action) {
        this.emitAction({
            source: 'selection-action',
            actionId: action.id,
            label: action.label,
            selectedRows: this.getSelectedRows(),
        });
    }
    onContextActionClick(action) {
        const row = this.contextRowId === null ? undefined : this.rows.find((r) => r.__rowId === this.contextRowId)?.__raw;
        this.showContextMenu = false;
        this.emitAction({
            source: 'context-menu',
            actionId: action.id,
            label: action.label,
            row,
            selectedRows: this.getSelectedRows(),
        });
    }
    saveColumns() {
        this.showColumnsPanel = false;
        this.columnSearch = '';
        this.emitAction({
            source: 'columns-save',
            actionId: 'columns-save',
            visibleColumns: [...this.visibleColumnFields],
        });
    }
    emitSelectionChange() {
        this.emitAction({
            source: 'selection-change',
            actionId: 'selection-change',
            selectedRows: this.getSelectedRows(),
        });
    }
    getSelectedRows() {
        return this.rows.filter((row) => this.selectedRowIds.has(row.__rowId)).map((row) => row.__raw);
    }
    emitAction(event) {
        this.action.emit(event);
    }
    seedSortCriteria(seed) {
        const levels = this.config?.features?.sortLevels ?? 3;
        const clone = seed
            .filter((x) => x.field)
            .slice(0, levels)
            .map((x) => ({ field: x.field, direction: x.direction || 'asc' }));
        while (clone.length < levels) {
            clone.push({ field: '', direction: 'asc' });
        }
        return clone;
    }
    seedFilterCriteria(seed) {
        const levels = this.config?.features?.filterLevels ?? 3;
        const clone = seed
            .filter((x) => x.field)
            .slice(0, levels)
            .map((x) => ({ field: x.field, operator: x.operator || 'contains', value: x.value || '' }));
        while (clone.length < levels) {
            clone.push({ field: '', operator: 'contains', value: '' });
        }
        return clone;
    }
    applyView() {
        let working = [...this.rows];
        const searchText = this.searchTerm.trim().toLowerCase();
        if (searchText) {
            const fields = this.activeColumns.map((col) => col.field);
            working = working.filter((row) => fields.some((field) => String(row.__raw[field] ?? '').toLowerCase().includes(searchText)));
        }
        const activeFilters = this.filterCriteria.filter((criterion) => criterion.field && criterion.value.trim());
        if (activeFilters.length > 0 && this.config.features.enableFiltering) {
            working = working.filter((row) => activeFilters.every((criterion) => {
                const left = String(row.__raw[criterion.field] ?? '').toLowerCase();
                const right = criterion.value.toLowerCase();
                if (criterion.operator === 'equals') {
                    return left === right;
                }
                if (criterion.operator === 'startsWith') {
                    return left.startsWith(right);
                }
                if (criterion.operator === 'endsWith') {
                    return left.endsWith(right);
                }
                return left.includes(right);
            }));
        }
        const activeSorts = this.sortCriteria.filter((criterion) => !!criterion.field);
        if (activeSorts.length > 0 && this.config.sorting && this.config.features.enableSorting) {
            working.sort((a, b) => {
                for (const criterion of activeSorts) {
                    const left = a.__raw[criterion.field];
                    const right = b.__raw[criterion.field];
                    if (left === right) {
                        continue;
                    }
                    const compare = left > right ? 1 : -1;
                    return criterion.direction === 'asc' ? compare : -compare;
                }
                return 0;
            });
        }
        this.totalRows = working.length;
        if (this.config.pagination) {
            this.totalPages = Math.max(1, Math.ceil(this.totalRows / this.pageSize));
            if (this.currentPage > this.totalPages) {
                this.currentPage = this.totalPages;
            }
            const start = (this.currentPage - 1) * this.pageSize;
            this.pageRows = working.slice(start, start + this.pageSize);
        }
        else {
            this.totalPages = 1;
            this.currentPage = 1;
            this.pageRows = working;
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.19", ngImport: i0, type: GridShellComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.19", type: GridShellComponent, isStandalone: true, selector: "br-grid-shell", inputs: { config: "config", variant: "variant" }, outputs: { action: "action" }, host: { listeners: { "document:click": "onDocumentClick()" } }, usesOnChanges: true, ngImport: i0, template: "<div class=\"grid-shell\" [class.material-variant]=\"variant === 'material'\" [class.canvas-variant]=\"variant === 'canvas'\" [class.custom-variant]=\"variant === 'custom'\" [class.zoom-mode]=\"zoomMode\" [ngClass]=\"rootClasses\" [ngStyle]=\"rootStyles\">\r\n  <div class=\"grid-title\" *ngIf=\"config.title\">\r\n    <h3>{{ config.title }}</h3>\r\n    <span class=\"badge\" *ngIf=\"config.uiConfig.showBadge\">{{ variant }}</span>\r\n  </div>\r\n\r\n  <div class=\"top-toolbar custom-toolbar\" *ngIf=\"config.features.enableTopBar && selectionCount === 0 && isCustomVariant\" [class.search-mode]=\"searchOpen\">\r\n    <div class=\"custom-toolbar-main\">\r\n      <div class=\"custom-pill-actions\" *ngIf=\"!searchOpen && !zoomMode\">\r\n        <button class=\"pill-btn\" type=\"button\" *ngIf=\"config.toolbar.showSort && config.features.enableSorting\" (click)=\"openSortModal($event)\">\r\n          Sort <span class=\"badge-count\" *ngIf=\"activeSortCount > 0\">{{ activeSortCount }}</span>\r\n        </button>\r\n        <button class=\"pill-btn\" type=\"button\" *ngIf=\"config.toolbar.showFilter && config.features.enableFiltering\" (click)=\"openFilterModal($event)\">\r\n          Filter <span class=\"badge-count\" *ngIf=\"activeFilterCount > 0\">{{ activeFilterCount }}</span>\r\n        </button>\r\n        <button class=\"pill-btn\" type=\"button\" *ngIf=\"config.toolbar.showColumnSettings && config.features.enableColumnPersonalization\" (click)=\"openColumnsPanel($event)\">Columns</button>\r\n      </div>\r\n\r\n      <div class=\"search-wrap custom-search\" *ngIf=\"searchOpen\">\r\n        <span class=\"search-icon\">\u2315</span>\r\n        <input type=\"text\" [(ngModel)]=\"searchTerm\" (ngModelChange)=\"onSearchChange()\" placeholder=\"Type to search rows...\" />\r\n        <button class=\"icon-btn\" type=\"button\" (click)=\"toggleSearch()\">\u2715</button>\r\n      </div>\r\n    </div>\r\n\r\n    <div class=\"right-actions\">\r\n      <button class=\"icon-btn\" *ngIf=\"config.toolbar.showSearch && config.features.enableSearch\" type=\"button\" title=\"Search\" (click)=\"toggleSearch()\">\u2315</button>\r\n      <button class=\"icon-btn\" *ngIf=\"config.toolbar.showRefresh && config.features.enableRefresh\" type=\"button\" title=\"Refresh\" (click)=\"refreshGrid()\">\u21BB</button>\r\n      <button class=\"icon-btn\" *ngIf=\"config.toolbar.showShare && config.features.enableShare\" type=\"button\" title=\"Share\">\u21EA</button>\r\n      <button class=\"icon-btn\" *ngIf=\"config.toolbar.showViewMode && config.features.enableViewMode\" type=\"button\" title=\"Big Text Mode\" (click)=\"toggleZoomMode()\">\u2317</button>\r\n      <button class=\"add-btn\" *ngIf=\"config.features.enablePrimaryAction\" type=\"button\" (click)=\"onToolbarPrimaryClick()\">{{ config.toolbar.primaryActionLabel }}</button>\r\n      <button class=\"add-dropdown\" *ngIf=\"config.features.enablePrimaryActionMenu\" type=\"button\" (click)=\"togglePrimaryActionMenu($event)\">\u2304</button>\r\n      <div class=\"primary-action-menu\" *ngIf=\"showPrimaryActionMenu && config.features.enablePrimaryActionMenu\" (click)=\"$event.stopPropagation()\">\r\n        <button *ngFor=\"let action of config.toolbar.primaryActions; trackBy: trackByAction\" type=\"button\" (click)=\"onToolbarPrimaryMenuAction(action)\">{{ action.label }}</button>\r\n      </div>\r\n    </div>\r\n  </div>\r\n\r\n  <div class=\"top-toolbar material-toolbar\" *ngIf=\"config.features.enableTopBar && selectionCount === 0 && isMaterialVariant\" [class.search-mode]=\"searchOpen\">\r\n    <div class=\"material-left\" *ngIf=\"!searchOpen\">\r\n      <button class=\"seg-btn\" type=\"button\" *ngIf=\"config.toolbar.showSort && config.features.enableSorting\" (click)=\"openSortModal($event)\">Sort</button>\r\n      <button class=\"seg-btn\" type=\"button\" *ngIf=\"config.toolbar.showFilter && config.features.enableFiltering\" (click)=\"openFilterModal($event)\">Filter</button>\r\n      <button class=\"seg-btn\" type=\"button\" *ngIf=\"config.toolbar.showColumnSettings && config.features.enableColumnPersonalization\" (click)=\"openColumnsPanel($event)\">Personalize</button>\r\n    </div>\r\n\r\n    <div class=\"search-wrap material-search\" *ngIf=\"searchOpen\">\r\n      <span class=\"search-icon\">\u2315</span>\r\n      <input type=\"text\" [(ngModel)]=\"searchTerm\" (ngModelChange)=\"onSearchChange()\" placeholder=\"Search records\" />\r\n      <button class=\"icon-btn\" type=\"button\" (click)=\"toggleSearch()\">\u2715</button>\r\n    </div>\r\n\r\n    <div class=\"right-actions\">\r\n      <button class=\"icon-btn\" *ngIf=\"config.toolbar.showSearch && config.features.enableSearch\" type=\"button\" title=\"Search\" (click)=\"toggleSearch()\">\u2315</button>\r\n      <button class=\"icon-btn\" *ngIf=\"config.toolbar.showRefresh && config.features.enableRefresh\" type=\"button\" title=\"Refresh\" (click)=\"refreshGrid()\">\u21BB</button>\r\n      <button class=\"icon-btn\" *ngIf=\"config.toolbar.showShare && config.features.enableShare\" type=\"button\" title=\"Share\">\u21EA</button>\r\n      <button class=\"icon-btn\" *ngIf=\"config.toolbar.showViewMode && config.features.enableViewMode\" type=\"button\" title=\"Big Text Mode\" (click)=\"toggleZoomMode()\">\u2317</button>\r\n      <button class=\"add-btn\" *ngIf=\"config.features.enablePrimaryAction\" type=\"button\" (click)=\"onToolbarPrimaryClick()\">{{ config.toolbar.primaryActionLabel }}</button>\r\n      <button class=\"add-dropdown\" *ngIf=\"config.features.enablePrimaryActionMenu\" type=\"button\" (click)=\"togglePrimaryActionMenu($event)\">\u2304</button>\r\n      <div class=\"primary-action-menu\" *ngIf=\"showPrimaryActionMenu && config.features.enablePrimaryActionMenu\" (click)=\"$event.stopPropagation()\">\r\n        <button *ngFor=\"let action of config.toolbar.primaryActions; trackBy: trackByAction\" type=\"button\" (click)=\"onToolbarPrimaryMenuAction(action)\">{{ action.label }}</button>\r\n      </div>\r\n    </div>\r\n  </div>\r\n\r\n  <div class=\"top-toolbar canvas-toolbar\" *ngIf=\"config.features.enableTopBar && selectionCount === 0 && isCanvasVariant\" [class.search-mode]=\"searchOpen\">\r\n    <div class=\"left-actions\" *ngIf=\"!searchOpen && !zoomMode\">\r\n      <button class=\"toolbar-btn text-btn\" type=\"button\" *ngIf=\"config.toolbar.showSort && config.features.enableSorting\" (click)=\"openSortModal($event)\">\r\n        <span>Sort</span>\r\n        <span class=\"icon\">\u21C5</span>\r\n      </button>\r\n      <button class=\"toolbar-btn text-btn\" type=\"button\" *ngIf=\"config.toolbar.showFilter && config.features.enableFiltering\" (click)=\"openFilterModal($event)\">\r\n        <span>Filter</span>\r\n        <span class=\"icon\">\u26B2</span>\r\n      </button>\r\n    </div>\r\n    <div class=\"search-wrap\" *ngIf=\"searchOpen\">\r\n      <span class=\"search-icon\">\u2315</span>\r\n      <input type=\"text\" [(ngModel)]=\"searchTerm\" (ngModelChange)=\"onSearchChange()\" placeholder=\"Search\" />\r\n      <button class=\"icon-btn\" type=\"button\" (click)=\"toggleSearch()\">\u2715</button>\r\n    </div>\r\n    <div class=\"right-actions\">\r\n      <button class=\"icon-btn\" *ngIf=\"config.toolbar.showSearch && config.features.enableSearch\" type=\"button\" title=\"Search\" (click)=\"toggleSearch()\">\u2315</button>\r\n      <button class=\"icon-btn\" *ngIf=\"config.toolbar.showRefresh && config.features.enableRefresh\" type=\"button\" title=\"Refresh\" (click)=\"refreshGrid()\">\u21BB</button>\r\n      <button class=\"icon-btn\" *ngIf=\"config.toolbar.showColumnSettings && config.features.enableColumnPersonalization\" type=\"button\" title=\"Columns\" (click)=\"openColumnsPanel($event)\">\u2699</button>\r\n      <button class=\"icon-btn\" *ngIf=\"config.toolbar.showShare && config.features.enableShare\" type=\"button\" title=\"Share\">\u21EA</button>\r\n      <button class=\"icon-btn\" *ngIf=\"config.toolbar.showViewMode && config.features.enableViewMode\" type=\"button\" title=\"Big Text Mode\" (click)=\"toggleZoomMode()\">\u2317</button>\r\n      <button class=\"add-btn\" *ngIf=\"config.features.enablePrimaryAction\" type=\"button\" (click)=\"onToolbarPrimaryClick()\">{{ config.toolbar.primaryActionLabel }}</button>\r\n      <button class=\"add-dropdown\" *ngIf=\"config.features.enablePrimaryActionMenu\" type=\"button\" (click)=\"togglePrimaryActionMenu($event)\">\u2304</button>\r\n      <div class=\"primary-action-menu\" *ngIf=\"showPrimaryActionMenu && config.features.enablePrimaryActionMenu\" (click)=\"$event.stopPropagation()\">\r\n        <button *ngFor=\"let action of config.toolbar.primaryActions; trackBy: trackByAction\" type=\"button\" (click)=\"onToolbarPrimaryMenuAction(action)\">{{ action.label }}</button>\r\n      </div>\r\n    </div>\r\n  </div>\r\n\r\n  <div class=\"selection-bar\" *ngIf=\"config.features.enableTopBar && selectionCount > 0 && config.features.enableRowSelection && config.features.enableSelectionActions\">\r\n    <div class=\"selection-actions\">\r\n      <button class=\"selection-btn\" type=\"button\" *ngFor=\"let action of config.selectionActions; trackBy: trackByAction\" (click)=\"onSelectionActionClick(action)\">\r\n        {{ action.label }}\r\n      </button>\r\n    </div>\r\n    <div class=\"selection-meta\">{{ selectionCount }} req selected</div>\r\n  </div>\r\n\r\n  <div class=\"table-wrap\">\r\n    <table class=\"grid-table\">\r\n      <thead>\r\n        <tr>\r\n          <th class=\"checkbox-col\" *ngIf=\"config.features.enableRowSelection\">\r\n            <input type=\"checkbox\" [checked]=\"isAllPageSelected\" [indeterminate]=\"isSomePageSelected && !isAllPageSelected\" (change)=\"toggleSelectAllOnPage($any($event.target).checked)\" />\r\n          </th>\r\n          <th *ngFor=\"let field of visibleColumnFields; trackBy: trackByField\">\r\n            <div class=\"header-cell\">\r\n              <span>{{ getColumnHeader(field) }}</span>\r\n              <span class=\"header-arrow\">\u2304</span>\r\n            </div>\r\n          </th>\r\n          <th class=\"menu-col\" *ngIf=\"config.features.enableRowActionButton\"></th>\r\n        </tr>\r\n      </thead>\r\n      <tbody>\r\n        <tr *ngFor=\"let row of pageRows; trackBy: trackByRow\" [class.selected]=\"selectedRowIds.has(row.__rowId)\" (contextmenu)=\"onRowContextMenu($event, row.__rowId)\">\r\n          <td class=\"checkbox-col\" *ngIf=\"config.features.enableRowSelection\">\r\n            <input type=\"checkbox\" [checked]=\"selectedRowIds.has(row.__rowId)\" (change)=\"toggleRowSelection(row.__rowId, $any($event.target).checked)\" />\r\n          </td>\r\n          <td *ngFor=\"let field of visibleColumnFields; trackBy: trackByField\">\r\n            {{ getCellValue(row, field) }}\r\n          </td>\r\n          <td class=\"menu-col\" *ngIf=\"config.features.enableRowActionButton\">\r\n            <button class=\"row-menu-btn\" type=\"button\" (click)=\"openContextMenuFromButton($event, row.__rowId)\">\u22EE</button>\r\n          </td>\r\n        </tr>\r\n        <tr *ngIf=\"pageRows.length === 0\">\r\n          <td class=\"empty-cell\" [attr.colspan]=\"visibleColumnFields.length + (config.features.enableRowSelection ? 1 : 0) + (config.features.enableRowActionButton ? 1 : 0)\">\r\n            {{ config.emptyMessage || 'No data available' }}\r\n          </td>\r\n        </tr>\r\n      </tbody>\r\n    </table>\r\n  </div>\r\n\r\n  <div class=\"pagination custom-pagination\" *ngIf=\"config.pagination && isCustomVariant\">\r\n    <div class=\"custom-page-left\" *ngIf=\"config.features.showPaginationNavigation\">\r\n      <button type=\"button\" class=\"nav-pill\" [disabled]=\"currentPage === 1\" (click)=\"prevPage()\">Prev</button>\r\n      <button type=\"button\" class=\"nav-pill\" [disabled]=\"currentPage === totalPages\" (click)=\"nextPage()\">Next</button>\r\n    </div>\r\n    <div class=\"custom-page-middle\" *ngIf=\"config.features.showPaginationSummary\">\r\n      <span>Page {{ currentPage }} of {{ totalPages }}</span>\r\n      <span class=\"dot\">\u2022</span>\r\n      <span>{{ startItem }}-{{ endItem }} / {{ totalRows }}</span>\r\n    </div>\r\n    <div class=\"custom-page-right\" *ngIf=\"config.features.showPaginationSizeSelector\">\r\n      <label for=\"customPageSize\">Rows</label>\r\n      <select id=\"customPageSize\" [ngModel]=\"pageSize\" (ngModelChange)=\"setPageSize($event)\">\r\n        <option *ngFor=\"let size of pageSizeOptions\" [ngValue]=\"size\">{{ size }}</option>\r\n      </select>\r\n    </div>\r\n  </div>\r\n\r\n  <div class=\"pagination material-pagination\" *ngIf=\"config.pagination && isMaterialVariant\">\r\n    <div class=\"page-summary\" *ngIf=\"config.features.showPaginationSummary\">Rows {{ startItem }}-{{ endItem }} of {{ totalRows }}</div>\r\n    <div class=\"material-page-right\">\r\n      <label for=\"materialPageSize\" *ngIf=\"config.features.showPaginationSizeSelector\">Rows per page</label>\r\n      <select id=\"materialPageSize\" *ngIf=\"config.features.showPaginationSizeSelector\" [ngModel]=\"pageSize\" (ngModelChange)=\"setPageSize($event)\">\r\n        <option *ngFor=\"let size of pageSizeOptions\" [ngValue]=\"size\">{{ size }}</option>\r\n      </select>\r\n      <ng-container *ngIf=\"config.features.showPaginationNavigation\">\r\n        <button type=\"button\" class=\"nav-btn\" [disabled]=\"currentPage === 1\" (click)=\"firstPage()\">\u23EE</button>\r\n        <button type=\"button\" class=\"nav-btn\" [disabled]=\"currentPage === 1\" (click)=\"prevPage()\">\u25C0</button>\r\n        <span>{{ currentPage }} / {{ totalPages }}</span>\r\n        <button type=\"button\" class=\"nav-btn\" [disabled]=\"currentPage === totalPages\" (click)=\"nextPage()\">\u25B6</button>\r\n        <button type=\"button\" class=\"nav-btn\" [disabled]=\"currentPage === totalPages\" (click)=\"lastPage()\">\u23ED</button>\r\n      </ng-container>\r\n    </div>\r\n  </div>\r\n\r\n  <div class=\"pagination canvas-pagination\" *ngIf=\"config.pagination && isCanvasVariant\">\r\n    <div class=\"page-control\" *ngIf=\"config.features.showPaginationSizeSelector\">\r\n      <label for=\"pageSize\">Items per page:</label>\r\n      <select id=\"pageSize\" [ngModel]=\"pageSize\" (ngModelChange)=\"setPageSize($event)\">\r\n        <option *ngFor=\"let size of pageSizeOptions\" [ngValue]=\"size\">{{ size }}</option>\r\n      </select>\r\n    </div>\r\n\r\n    <div class=\"page-summary\" *ngIf=\"config.features.showPaginationSummary\">Showing {{ startItem }} to {{ endItem }} of {{ totalRows }}</div>\r\n\r\n    <div class=\"page-nav\" *ngIf=\"config.features.showPaginationNavigation\">\r\n      <button type=\"button\" class=\"nav-btn\" [disabled]=\"currentPage === 1\" (click)=\"prevPage()\">\u25C0</button>\r\n      <span>{{ currentPage }} of {{ totalPages }} pages</span>\r\n      <button type=\"button\" class=\"nav-btn\" [disabled]=\"currentPage === totalPages\" (click)=\"nextPage()\">\u25B6</button>\r\n    </div>\r\n  </div>\r\n\r\n  <div class=\"context-menu\" *ngIf=\"showContextMenu && config.features.enableContextMenu\" [style.left.px]=\"contextX\" [style.top.px]=\"contextY\" (click)=\"$event.stopPropagation()\">\r\n    <button type=\"button\" *ngFor=\"let action of config.contextMenuActions; trackBy: trackByAction\" (click)=\"onContextActionClick(action)\">{{ action.label }}</button>\r\n    <button type=\"button\" class=\"close-btn\" (click)=\"closeContextMenu($event)\">Close</button>\r\n  </div>\r\n\r\n  <div class=\"overlay\" *ngIf=\"showSortModal && config.features.enableSorting\" (click)=\"closeSortModal()\">\r\n    <div class=\"sort-modal\" (click)=\"$event.stopPropagation()\">\r\n      <div class=\"modal-header\">\r\n        <h2>Sort Options</h2>\r\n        <button type=\"button\" class=\"close-icon\" (click)=\"closeSortModal()\">\u2715</button>\r\n      </div>\r\n\r\n      <div class=\"sort-group\" *ngFor=\"let criterion of sortCriteria; let i = index\">\r\n        <label>{{ i === 0 ? 'Sort by:' : 'Then by:' }}</label>\r\n        <select [(ngModel)]=\"criterion.field\">\r\n          <option value=\"\">Select column</option>\r\n          <option *ngFor=\"let col of allColumns\" [value]=\"col.field\">{{ col.header }}</option>\r\n        </select>\r\n\r\n        <div class=\"sort-direction\">\r\n          <label><input type=\"radio\" [name]=\"'direction-' + i\" value=\"asc\" [(ngModel)]=\"criterion.direction\" />Ascending</label>\r\n          <label><input type=\"radio\" [name]=\"'direction-' + i\" value=\"desc\" [(ngModel)]=\"criterion.direction\" />Descending</label>\r\n        </div>\r\n      </div>\r\n\r\n      <div class=\"modal-actions\">\r\n        <button type=\"button\" class=\"apply-btn\" (click)=\"applySortCriteria()\">Apply Sort</button>\r\n        <button type=\"button\" class=\"ghost-btn\" (click)=\"clearSortCriteria()\">Clear</button>\r\n      </div>\r\n    </div>\r\n  </div>\r\n\r\n  <div class=\"overlay\" *ngIf=\"showFilterModal && config.features.enableFiltering\" (click)=\"closeFilterModal()\">\r\n    <div class=\"sort-modal\" (click)=\"$event.stopPropagation()\">\r\n      <div class=\"modal-header\">\r\n        <h2>Filter Options</h2>\r\n        <button type=\"button\" class=\"close-icon\" (click)=\"closeFilterModal()\">\u2715</button>\r\n      </div>\r\n\r\n      <div class=\"sort-group\" *ngFor=\"let criterion of filterCriteria; let i = index\">\r\n        <label>{{ i === 0 ? 'Filter by:' : 'Then by:' }}</label>\r\n        <div class=\"filter-row\">\r\n          <select [(ngModel)]=\"criterion.field\">\r\n            <option value=\"\">Select column</option>\r\n            <option *ngFor=\"let col of allColumns\" [value]=\"col.field\">{{ col.header }}</option>\r\n          </select>\r\n          <select [(ngModel)]=\"criterion.operator\" class=\"operator-select\">\r\n            <option value=\"contains\">Contains</option>\r\n            <option value=\"equals\">Equals</option>\r\n            <option value=\"startsWith\">Starts With</option>\r\n            <option value=\"endsWith\">Ends With</option>\r\n          </select>\r\n          <input type=\"text\" [(ngModel)]=\"criterion.value\" placeholder=\"Value\" />\r\n        </div>\r\n      </div>\r\n\r\n      <div class=\"modal-actions\">\r\n        <button type=\"button\" class=\"apply-btn\" (click)=\"applyFilterCriteria()\">Apply Filter</button>\r\n        <button type=\"button\" class=\"ghost-btn\" (click)=\"clearFilterCriteria()\">Clear</button>\r\n      </div>\r\n    </div>\r\n  </div>\r\n\r\n  <div class=\"overlay\" *ngIf=\"showColumnsPanel && config.features.enableColumnPersonalization\" (click)=\"closeColumnsPanel()\">\r\n    <div class=\"columns-panel\" (click)=\"$event.stopPropagation()\">\r\n      <div class=\"panel-header\">\r\n        <h2>Personalize Columns</h2>\r\n        <button type=\"button\" class=\"close-icon\" (click)=\"closeColumnsPanel()\">\u2715</button>\r\n      </div>\r\n\r\n      <div class=\"panel-content\">\r\n        <div class=\"panel-left\">\r\n          <h3>Select Columns</h3>\r\n          <input type=\"text\" [placeholder]=\"config.personalization.searchPlaceholder\" [(ngModel)]=\"columnSearch\" />\r\n\r\n          <div class=\"column-list\">\r\n            <label *ngFor=\"let col of filteredColumnOptions\">\r\n              <input type=\"checkbox\" [disabled]=\"!config.features.enableColumnVisibilityToggle\" [checked]=\"visibleColumnFields.includes(col.field)\" (change)=\"toggleColumn(col.field)\" />\r\n              {{ col.group ? '[' + col.group + '] ' : '' }}{{ col.label || col.field }}\r\n            </label>\r\n          </div>\r\n        </div>\r\n\r\n        <div class=\"panel-right\">\r\n          <h3>Order Columns</h3>\r\n          <p>You may have up to {{ config.personalization.maxSelectedColumns }} fields for this display.</p>\r\n\r\n          <div class=\"selected-columns\">\r\n            <div class=\"selected-item\" *ngFor=\"let field of visibleColumnFields; let i = index\">\r\n              <span>{{ getColumnGroup(field) ? '[' + getColumnGroup(field) + '] ' : '' }}{{ getColumnHeader(field) }}</span>\r\n              <div class=\"order-actions\">\r\n                <button type=\"button\" [disabled]=\"i === 0 || !config.features.enableColumnReorder\" (click)=\"moveColumn(field, -1)\">\u2191</button>\r\n                <button type=\"button\" [disabled]=\"i === visibleColumnFields.length - 1 || !config.features.enableColumnReorder\" (click)=\"moveColumn(field, 1)\">\u2193</button>\r\n                <button type=\"button\" [disabled]=\"!config.features.enableColumnVisibilityToggle\" (click)=\"removeColumn(field)\">\u2715</button>\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n\r\n      <div class=\"panel-actions\">\r\n        <button type=\"button\" class=\"ghost-btn\" (click)=\"closeColumnsPanel()\">Cancel</button>\r\n        <button type=\"button\" class=\"apply-btn\" (click)=\"saveColumns()\">Save</button>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n", styles: [":host{display:block}.grid-shell{--bg: var(--br-background-color, #f5f7fb);--surface: var(--br-background-color, #ffffff);--surface-alt: var(--br-section-background-color, #f1f3f8);--header-bg: var(--br-table-header-background-color, #ecf0f8);--line: var(--br-section-border-color, #d9deea);--text: var(--br-base-font-color, #1b2233);--muted: var(--br-label-font-color, #5d6780);--primary: var(--br-focus-color, #2b6ef3);--primary-strong: var(--br-accent-color, var(--br-focus-color, #1a57d4));--selection: color-mix(in srgb, var(--br-focus-color, #2563eb) 16%, var(--br-section-background-color, #ffffff));--badge: var(--br-primary-button-color, #3f6be8);--cta: var(--br-primary-button-color, #1ca37f);--cta-text: var(--br-primary-button-text-color, #ffffff);border:1px solid var(--line);background:var(--bg);position:relative;overflow:hidden;border-radius:var(--grid-borderRadius, 10px)}.border-sharp{border-radius:0}.border-none{border-width:0}.border-soft{border-radius:var(--grid-borderRadius, 10px)}.grid-title{display:flex;align-items:center;justify-content:space-between;padding:12px 16px;background:var(--surface);border-bottom:1px solid var(--line)}.grid-title h3{margin:0;font-size:17px;font-weight:700;color:var(--text)}.grid-title .badge{padding:3px 10px;background:var(--badge);color:#fff;border-radius:999px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.4px}.top-toolbar{min-height:var(--grid-toolbarHeight, 62px);display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid var(--line);background:var(--surface-alt)}.custom-toolbar{background:linear-gradient(90deg,color-mix(in srgb,var(--surface-alt) 75%,#fff),color-mix(in srgb,var(--surface-alt) 90%,#dde7ff))}.material-toolbar{background:color-mix(in srgb,var(--surface-alt) 92%,#f4f8f4)}.canvas-toolbar{background:var(--surface-alt)}.custom-toolbar-main{display:flex;align-items:center;gap:10px;padding-left:12px}.custom-pill-actions{display:flex;align-items:center;gap:8px}.pill-btn{border:1px solid color-mix(in srgb,var(--primary) 30%,#d2d9ef);background:var(--surface, #fff);color:var(--text);border-radius:999px;min-height:34px;padding:0 12px;font-size:12px;font-weight:700;cursor:pointer}.pill-btn .badge-count{background:var(--primary);color:#fff;padding:0 6px;border-radius:999px;margin-left:6px;font-size:11px}.material-left{display:flex;align-items:center;gap:6px;padding-left:12px}.seg-btn{border:1px solid #d2dfd2;background:var(--surface, #fff);color:color-mix(in srgb,var(--primary) 85%,#000);min-height:34px;padding:0 12px;border-radius:8px;font-size:12px;font-weight:700;cursor:pointer}.left-actions{display:flex;align-items:center;gap:8px;padding:0 12px}.toolbar-btn{height:38px;border:0;background:transparent;color:var(--text);cursor:pointer}.text-btn{display:inline-flex;align-items:center;gap:7px;font-size:14px;font-weight:600}.text-btn .icon{color:var(--primary);font-size:15px}.search-wrap{margin-left:12px;border:2px solid var(--primary);display:flex;align-items:center;background:var(--surface, #fff);flex:1;max-width:68%;min-height:46px}.search-wrap .search-icon{width:42px;text-align:center;font-size:18px;color:var(--primary)}.search-wrap input{border:0;outline:none;flex:1;height:100%;font-size:14px;color:var(--text);background:transparent}.custom-search{max-width:620px;border-radius:999px;border-width:1px}.material-search{max-width:560px;border-radius:10px;border-width:1px}.right-actions{display:flex;align-items:stretch;margin-left:auto;min-height:var(--grid-toolbarHeight, 62px);position:relative}.right-actions .icon-btn{width:46px;border:0;border-left:1px solid var(--line);background:color-mix(in srgb,var(--surface-alt) 90%,#ffffff);color:var(--primary);font-size:17px;cursor:pointer}.right-actions .add-btn,.right-actions .add-dropdown{border:0;border-left:1px solid color-mix(in srgb,var(--cta) 70%,#000);background:var(--cta);color:var(--cta-text);font-size:14px;font-weight:700;cursor:pointer}.right-actions .add-btn{padding:0 20px}.right-actions .add-dropdown{min-width:42px;font-size:16px}.right-actions .primary-action-menu{position:absolute;right:8px;top:calc(100% + 6px);width:220px;background:var(--surface, #fff);border:1px solid var(--line);box-shadow:0 8px 24px #0000001f;z-index:16}.right-actions .primary-action-menu button{width:100%;text-align:left;border:0;border-bottom:1px solid var(--line, #eef1f8);background:var(--surface, #fff);height:40px;padding:0 12px;font-size:13px;cursor:pointer}.right-actions .primary-action-menu button:hover{background:color-mix(in srgb,var(--primary) 8%,var(--surface, #ffffff))}.selection-bar{min-height:58px;background:var(--primary);color:#fff;display:flex;align-items:center;justify-content:space-between;padding:0 14px}.selection-bar .selection-actions{display:flex;gap:10px;flex-wrap:wrap}.selection-bar .selection-btn{border:0;background:color-mix(in srgb,var(--primary) 88%,#fff);color:#fff;border-radius:16px;padding:6px 12px;font-size:12px;font-weight:600;cursor:pointer}.selection-bar .selection-meta{font-size:13px;font-weight:600}.table-wrap{overflow-x:auto;border-bottom:1px solid var(--line)}.grid-table{width:100%;min-width:920px;border-collapse:collapse;table-layout:fixed}.grid-table th,.grid-table td{border-bottom:1px solid var(--line);padding:var(--grid-cellPaddingY, 11px) var(--grid-cellPaddingX, 14px);text-align:left;color:var(--text);font-size:var(--grid-fontSize, 13px)}.grid-table th{background:var(--header-bg);font-weight:700}.grid-table tbody tr{background:color-mix(in srgb,var(--bg) 90%,#fff)}.grid-table tbody tr:hover{background:color-mix(in srgb,var(--selection) 65%,#fff)}.grid-table tbody tr.selected{background:var(--selection);outline:2px solid var(--primary);outline-offset:-2px}.grid-table .checkbox-col{width:42px;text-align:center;padding:0 6px}.grid-table .checkbox-col input[type=checkbox]{width:16px;height:16px;accent-color:var(--primary-strong)}.grid-table .menu-col{width:42px;text-align:center}.grid-table .header-cell{display:flex;justify-content:space-between;align-items:center}.grid-table .header-cell .header-arrow{color:var(--muted)}.grid-table .row-menu-btn{width:28px;height:28px;border:0;background:transparent;font-size:18px;cursor:pointer;color:var(--muted)}.grid-table .empty-cell{text-align:center;font-style:italic;color:var(--muted);padding:24px}.density-compact{--grid-cellPaddingY: 8px;--grid-cellPaddingX: 10px;--grid-fontSize: 12px}.density-comfortable{--grid-cellPaddingY: 11px;--grid-cellPaddingX: 14px;--grid-fontSize: 13px}.density-spacious{--grid-cellPaddingY: 14px;--grid-cellPaddingX: 18px;--grid-fontSize: 14px}.size-sm{--grid-toolbarHeight: 52px}.size-md{--grid-toolbarHeight: 62px}.size-lg{--grid-toolbarHeight: 72px}.sticky-header .table-wrap{max-height:var(--grid-tableMaxHeight, 480px)}.sticky-header .grid-table thead th{position:sticky;top:0;z-index:3}.pagination{min-height:58px;background:var(--surface-alt);display:grid;grid-template-columns:240px 1fr 290px;align-items:center;border-top:1px solid var(--line)}.pagination>div{min-height:58px;display:flex;align-items:center;padding:0 14px;border-right:1px solid var(--line)}.pagination .page-control{gap:8px}.pagination .page-control label,.pagination .page-control select{font-size:13px;color:var(--text)}.pagination .page-control select{border:0;background:transparent;outline:none;cursor:pointer}.pagination .page-summary{font-size:13px;color:var(--text)}.pagination .page-nav{justify-content:space-between;gap:10px;border-right:0}.pagination .page-nav span{font-size:13px}.pagination .page-nav .nav-btn{border:0;background:transparent;font-size:16px;cursor:pointer;color:var(--text)}.pagination .page-nav .nav-btn:disabled{color:var(--muted, #9ea8bf);cursor:not-allowed}.custom-pagination{grid-template-columns:180px 1fr 150px}.custom-pagination .custom-page-left{display:flex;gap:6px}.custom-pagination .nav-pill{border:1px solid var(--line);background:var(--surface, #fff);color:var(--text);border-radius:999px;min-height:32px;padding:0 12px;font-size:12px;font-weight:700;cursor:pointer}.custom-pagination .nav-pill:disabled{opacity:.45;cursor:not-allowed}.custom-pagination .custom-page-middle{gap:8px;font-size:13px;color:var(--text);display:flex;align-items:center}.custom-pagination .dot{color:var(--muted, #94a0be)}.custom-pagination .custom-page-right{display:flex;align-items:center;gap:8px;border-right:0}.custom-pagination .custom-page-right label,.custom-pagination .custom-page-right select{font-size:12px;color:var(--text)}.custom-pagination .custom-page-right select{border:1px solid var(--line);border-radius:8px;min-height:30px;padding:0 6px;background:var(--surface, #fff)}.material-pagination{grid-template-columns:1fr 420px}.material-pagination .page-summary{border-right:1px solid var(--line)}.material-pagination .material-page-right{display:flex;align-items:center;gap:8px;border-right:0}.material-pagination .material-page-right label,.material-pagination .material-page-right select,.material-pagination .material-page-right span{font-size:12px;color:var(--text)}.material-pagination .material-page-right select{border:1px solid var(--line);border-radius:8px;min-height:30px;padding:0 6px;background:var(--surface, #fff)}.context-menu{position:fixed;width:220px;background:var(--surface, #fff);border:1px solid var(--line);box-shadow:0 8px 24px #00000024;z-index:25}.context-menu button{width:100%;text-align:left;border:0;border-bottom:1px solid #edf1fb;background:var(--surface, #fff);height:40px;padding:0 12px;font-size:13px;color:var(--text);cursor:pointer}.context-menu button:hover{background:#f4f7ff}.context-menu .close-btn{color:var(--primary);border-bottom:0}.overlay{position:fixed;inset:0;background:#07102833;z-index:24;display:flex;justify-content:center;align-items:center}.sort-modal{width:min(920px,94vw);max-height:92vh;background:var(--surface);overflow:auto;padding:20px 24px;border:1px solid var(--line)}.modal-header{display:flex;justify-content:space-between;align-items:center}.modal-header h2{margin:0;font-size:28px;color:var(--text);font-weight:700}.close-icon{border:0;background:transparent;font-size:28px;color:#9aa5c2;cursor:pointer}.sort-group{margin-top:16px}.sort-group label{display:block;margin-bottom:6px;font-size:15px;color:var(--text);font-weight:600}.sort-group select,.sort-group input{width:100%;min-height:40px;background:var(--surface-alt, #f8faff);border:1px solid var(--line, #d8e1f5);font-size:13px;padding:0 10px;outline:none;border-radius:8px;color:var(--text)}.filter-row{display:grid;grid-template-columns:1fr 160px 1fr;gap:8px}.filter-row .operator-select{width:100%}.sort-direction{display:flex;gap:18px;margin-top:10px}.sort-direction label{display:flex;gap:6px;align-items:center;font-size:13px;margin:0;font-weight:500}.sort-direction label input[type=radio]{width:15px;height:15px}.modal-actions{margin-top:20px;display:flex;gap:12px}.apply-btn,.ghost-btn{min-height:40px;border:0;padding:0 16px;border-radius:8px;font-size:13px;font-weight:700;cursor:pointer}.apply-btn{background:var(--cta);color:#fff}.ghost-btn{background:transparent;color:var(--primary)}.columns-panel{width:min(1240px,96vw);max-height:96vh;background:var(--surface);display:flex;flex-direction:column;border:1px solid var(--line)}.panel-header{display:flex;justify-content:space-between;align-items:center;padding:16px 20px}.panel-header h2{margin:0;font-size:24px;color:var(--text)}.panel-content{flex:1;padding:0 20px 16px;display:grid;grid-template-columns:1fr 1fr;gap:16px;min-height:0}.panel-content h3{margin:8px 0 12px;font-size:18px;color:var(--text)}.panel-content p{font-size:13px;margin:0 0 10px;color:var(--muted)}.panel-left,.panel-right{background:var(--surface-alt, #f8fbff);border:1px solid var(--line, #dbe4f5);border-radius:10px;padding:14px;min-height:0;overflow:hidden;display:flex;flex-direction:column}.panel-left input{min-height:40px;border:1px solid var(--line, #c7d6f6);background:var(--surface, #fff);border-radius:8px;padding:0 10px;font-size:13px;outline:none;margin-bottom:10px}.column-list,.selected-columns{overflow:auto;padding-right:4px}.column-list label{display:flex;align-items:center;gap:8px;font-size:13px;color:var(--text);margin-bottom:7px}.column-list label input[type=checkbox]{width:14px;height:14px}.selected-item{background:#fff;border:1px solid var(--line, #dfe7f8);border-radius:8px;min-height:44px;display:flex;justify-content:space-between;align-items:center;padding:0 10px;margin-bottom:7px}.selected-item span{font-size:13px;color:var(--text)}.selected-item .order-actions{display:flex;gap:4px}.selected-item .order-actions button{border:1px solid var(--line, #d4ddf2);background:var(--surface, #fff);width:26px;height:26px;border-radius:6px;cursor:pointer}.selected-item .order-actions button:disabled{color:var(--muted, #9da7c2);cursor:not-allowed}.panel-actions{border-top:1px solid var(--line);min-height:58px;display:flex;justify-content:flex-end;align-items:center;gap:10px;padding:8px 16px}.zoom-mode .grid-table th,.zoom-mode .grid-table td{font-size:16px;line-height:1.45}.zoom-mode .top-toolbar .left-actions{display:none}@media (max-width: 1100px){.top-toolbar{min-height:auto;flex-wrap:wrap}.search-wrap{max-width:none;margin:10px}.pagination{grid-template-columns:1fr}.pagination>div{border-right:0;border-bottom:1px solid var(--line)}.panel-content,.filter-row{grid-template-columns:1fr}}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "ngmodule", type: FormsModule }, { kind: "directive", type: i2.NgSelectOption, selector: "option", inputs: ["ngValue", "value"] }, { kind: "directive", type: i2.ɵNgSelectMultipleOption, selector: "option", inputs: ["ngValue", "value"] }, { kind: "directive", type: i2.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i2.SelectControlValueAccessor, selector: "select:not([multiple])[formControlName],select:not([multiple])[formControl],select:not([multiple])[ngModel]", inputs: ["compareWith"] }, { kind: "directive", type: i2.RadioControlValueAccessor, selector: "input[type=radio][formControlName],input[type=radio][formControl],input[type=radio][ngModel]", inputs: ["name", "formControlName", "value"] }, { kind: "directive", type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i2.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.19", ngImport: i0, type: GridShellComponent, decorators: [{
            type: Component,
            args: [{ selector: 'br-grid-shell', standalone: true, imports: [CommonModule, FormsModule], template: "<div class=\"grid-shell\" [class.material-variant]=\"variant === 'material'\" [class.canvas-variant]=\"variant === 'canvas'\" [class.custom-variant]=\"variant === 'custom'\" [class.zoom-mode]=\"zoomMode\" [ngClass]=\"rootClasses\" [ngStyle]=\"rootStyles\">\r\n  <div class=\"grid-title\" *ngIf=\"config.title\">\r\n    <h3>{{ config.title }}</h3>\r\n    <span class=\"badge\" *ngIf=\"config.uiConfig.showBadge\">{{ variant }}</span>\r\n  </div>\r\n\r\n  <div class=\"top-toolbar custom-toolbar\" *ngIf=\"config.features.enableTopBar && selectionCount === 0 && isCustomVariant\" [class.search-mode]=\"searchOpen\">\r\n    <div class=\"custom-toolbar-main\">\r\n      <div class=\"custom-pill-actions\" *ngIf=\"!searchOpen && !zoomMode\">\r\n        <button class=\"pill-btn\" type=\"button\" *ngIf=\"config.toolbar.showSort && config.features.enableSorting\" (click)=\"openSortModal($event)\">\r\n          Sort <span class=\"badge-count\" *ngIf=\"activeSortCount > 0\">{{ activeSortCount }}</span>\r\n        </button>\r\n        <button class=\"pill-btn\" type=\"button\" *ngIf=\"config.toolbar.showFilter && config.features.enableFiltering\" (click)=\"openFilterModal($event)\">\r\n          Filter <span class=\"badge-count\" *ngIf=\"activeFilterCount > 0\">{{ activeFilterCount }}</span>\r\n        </button>\r\n        <button class=\"pill-btn\" type=\"button\" *ngIf=\"config.toolbar.showColumnSettings && config.features.enableColumnPersonalization\" (click)=\"openColumnsPanel($event)\">Columns</button>\r\n      </div>\r\n\r\n      <div class=\"search-wrap custom-search\" *ngIf=\"searchOpen\">\r\n        <span class=\"search-icon\">\u2315</span>\r\n        <input type=\"text\" [(ngModel)]=\"searchTerm\" (ngModelChange)=\"onSearchChange()\" placeholder=\"Type to search rows...\" />\r\n        <button class=\"icon-btn\" type=\"button\" (click)=\"toggleSearch()\">\u2715</button>\r\n      </div>\r\n    </div>\r\n\r\n    <div class=\"right-actions\">\r\n      <button class=\"icon-btn\" *ngIf=\"config.toolbar.showSearch && config.features.enableSearch\" type=\"button\" title=\"Search\" (click)=\"toggleSearch()\">\u2315</button>\r\n      <button class=\"icon-btn\" *ngIf=\"config.toolbar.showRefresh && config.features.enableRefresh\" type=\"button\" title=\"Refresh\" (click)=\"refreshGrid()\">\u21BB</button>\r\n      <button class=\"icon-btn\" *ngIf=\"config.toolbar.showShare && config.features.enableShare\" type=\"button\" title=\"Share\">\u21EA</button>\r\n      <button class=\"icon-btn\" *ngIf=\"config.toolbar.showViewMode && config.features.enableViewMode\" type=\"button\" title=\"Big Text Mode\" (click)=\"toggleZoomMode()\">\u2317</button>\r\n      <button class=\"add-btn\" *ngIf=\"config.features.enablePrimaryAction\" type=\"button\" (click)=\"onToolbarPrimaryClick()\">{{ config.toolbar.primaryActionLabel }}</button>\r\n      <button class=\"add-dropdown\" *ngIf=\"config.features.enablePrimaryActionMenu\" type=\"button\" (click)=\"togglePrimaryActionMenu($event)\">\u2304</button>\r\n      <div class=\"primary-action-menu\" *ngIf=\"showPrimaryActionMenu && config.features.enablePrimaryActionMenu\" (click)=\"$event.stopPropagation()\">\r\n        <button *ngFor=\"let action of config.toolbar.primaryActions; trackBy: trackByAction\" type=\"button\" (click)=\"onToolbarPrimaryMenuAction(action)\">{{ action.label }}</button>\r\n      </div>\r\n    </div>\r\n  </div>\r\n\r\n  <div class=\"top-toolbar material-toolbar\" *ngIf=\"config.features.enableTopBar && selectionCount === 0 && isMaterialVariant\" [class.search-mode]=\"searchOpen\">\r\n    <div class=\"material-left\" *ngIf=\"!searchOpen\">\r\n      <button class=\"seg-btn\" type=\"button\" *ngIf=\"config.toolbar.showSort && config.features.enableSorting\" (click)=\"openSortModal($event)\">Sort</button>\r\n      <button class=\"seg-btn\" type=\"button\" *ngIf=\"config.toolbar.showFilter && config.features.enableFiltering\" (click)=\"openFilterModal($event)\">Filter</button>\r\n      <button class=\"seg-btn\" type=\"button\" *ngIf=\"config.toolbar.showColumnSettings && config.features.enableColumnPersonalization\" (click)=\"openColumnsPanel($event)\">Personalize</button>\r\n    </div>\r\n\r\n    <div class=\"search-wrap material-search\" *ngIf=\"searchOpen\">\r\n      <span class=\"search-icon\">\u2315</span>\r\n      <input type=\"text\" [(ngModel)]=\"searchTerm\" (ngModelChange)=\"onSearchChange()\" placeholder=\"Search records\" />\r\n      <button class=\"icon-btn\" type=\"button\" (click)=\"toggleSearch()\">\u2715</button>\r\n    </div>\r\n\r\n    <div class=\"right-actions\">\r\n      <button class=\"icon-btn\" *ngIf=\"config.toolbar.showSearch && config.features.enableSearch\" type=\"button\" title=\"Search\" (click)=\"toggleSearch()\">\u2315</button>\r\n      <button class=\"icon-btn\" *ngIf=\"config.toolbar.showRefresh && config.features.enableRefresh\" type=\"button\" title=\"Refresh\" (click)=\"refreshGrid()\">\u21BB</button>\r\n      <button class=\"icon-btn\" *ngIf=\"config.toolbar.showShare && config.features.enableShare\" type=\"button\" title=\"Share\">\u21EA</button>\r\n      <button class=\"icon-btn\" *ngIf=\"config.toolbar.showViewMode && config.features.enableViewMode\" type=\"button\" title=\"Big Text Mode\" (click)=\"toggleZoomMode()\">\u2317</button>\r\n      <button class=\"add-btn\" *ngIf=\"config.features.enablePrimaryAction\" type=\"button\" (click)=\"onToolbarPrimaryClick()\">{{ config.toolbar.primaryActionLabel }}</button>\r\n      <button class=\"add-dropdown\" *ngIf=\"config.features.enablePrimaryActionMenu\" type=\"button\" (click)=\"togglePrimaryActionMenu($event)\">\u2304</button>\r\n      <div class=\"primary-action-menu\" *ngIf=\"showPrimaryActionMenu && config.features.enablePrimaryActionMenu\" (click)=\"$event.stopPropagation()\">\r\n        <button *ngFor=\"let action of config.toolbar.primaryActions; trackBy: trackByAction\" type=\"button\" (click)=\"onToolbarPrimaryMenuAction(action)\">{{ action.label }}</button>\r\n      </div>\r\n    </div>\r\n  </div>\r\n\r\n  <div class=\"top-toolbar canvas-toolbar\" *ngIf=\"config.features.enableTopBar && selectionCount === 0 && isCanvasVariant\" [class.search-mode]=\"searchOpen\">\r\n    <div class=\"left-actions\" *ngIf=\"!searchOpen && !zoomMode\">\r\n      <button class=\"toolbar-btn text-btn\" type=\"button\" *ngIf=\"config.toolbar.showSort && config.features.enableSorting\" (click)=\"openSortModal($event)\">\r\n        <span>Sort</span>\r\n        <span class=\"icon\">\u21C5</span>\r\n      </button>\r\n      <button class=\"toolbar-btn text-btn\" type=\"button\" *ngIf=\"config.toolbar.showFilter && config.features.enableFiltering\" (click)=\"openFilterModal($event)\">\r\n        <span>Filter</span>\r\n        <span class=\"icon\">\u26B2</span>\r\n      </button>\r\n    </div>\r\n    <div class=\"search-wrap\" *ngIf=\"searchOpen\">\r\n      <span class=\"search-icon\">\u2315</span>\r\n      <input type=\"text\" [(ngModel)]=\"searchTerm\" (ngModelChange)=\"onSearchChange()\" placeholder=\"Search\" />\r\n      <button class=\"icon-btn\" type=\"button\" (click)=\"toggleSearch()\">\u2715</button>\r\n    </div>\r\n    <div class=\"right-actions\">\r\n      <button class=\"icon-btn\" *ngIf=\"config.toolbar.showSearch && config.features.enableSearch\" type=\"button\" title=\"Search\" (click)=\"toggleSearch()\">\u2315</button>\r\n      <button class=\"icon-btn\" *ngIf=\"config.toolbar.showRefresh && config.features.enableRefresh\" type=\"button\" title=\"Refresh\" (click)=\"refreshGrid()\">\u21BB</button>\r\n      <button class=\"icon-btn\" *ngIf=\"config.toolbar.showColumnSettings && config.features.enableColumnPersonalization\" type=\"button\" title=\"Columns\" (click)=\"openColumnsPanel($event)\">\u2699</button>\r\n      <button class=\"icon-btn\" *ngIf=\"config.toolbar.showShare && config.features.enableShare\" type=\"button\" title=\"Share\">\u21EA</button>\r\n      <button class=\"icon-btn\" *ngIf=\"config.toolbar.showViewMode && config.features.enableViewMode\" type=\"button\" title=\"Big Text Mode\" (click)=\"toggleZoomMode()\">\u2317</button>\r\n      <button class=\"add-btn\" *ngIf=\"config.features.enablePrimaryAction\" type=\"button\" (click)=\"onToolbarPrimaryClick()\">{{ config.toolbar.primaryActionLabel }}</button>\r\n      <button class=\"add-dropdown\" *ngIf=\"config.features.enablePrimaryActionMenu\" type=\"button\" (click)=\"togglePrimaryActionMenu($event)\">\u2304</button>\r\n      <div class=\"primary-action-menu\" *ngIf=\"showPrimaryActionMenu && config.features.enablePrimaryActionMenu\" (click)=\"$event.stopPropagation()\">\r\n        <button *ngFor=\"let action of config.toolbar.primaryActions; trackBy: trackByAction\" type=\"button\" (click)=\"onToolbarPrimaryMenuAction(action)\">{{ action.label }}</button>\r\n      </div>\r\n    </div>\r\n  </div>\r\n\r\n  <div class=\"selection-bar\" *ngIf=\"config.features.enableTopBar && selectionCount > 0 && config.features.enableRowSelection && config.features.enableSelectionActions\">\r\n    <div class=\"selection-actions\">\r\n      <button class=\"selection-btn\" type=\"button\" *ngFor=\"let action of config.selectionActions; trackBy: trackByAction\" (click)=\"onSelectionActionClick(action)\">\r\n        {{ action.label }}\r\n      </button>\r\n    </div>\r\n    <div class=\"selection-meta\">{{ selectionCount }} req selected</div>\r\n  </div>\r\n\r\n  <div class=\"table-wrap\">\r\n    <table class=\"grid-table\">\r\n      <thead>\r\n        <tr>\r\n          <th class=\"checkbox-col\" *ngIf=\"config.features.enableRowSelection\">\r\n            <input type=\"checkbox\" [checked]=\"isAllPageSelected\" [indeterminate]=\"isSomePageSelected && !isAllPageSelected\" (change)=\"toggleSelectAllOnPage($any($event.target).checked)\" />\r\n          </th>\r\n          <th *ngFor=\"let field of visibleColumnFields; trackBy: trackByField\">\r\n            <div class=\"header-cell\">\r\n              <span>{{ getColumnHeader(field) }}</span>\r\n              <span class=\"header-arrow\">\u2304</span>\r\n            </div>\r\n          </th>\r\n          <th class=\"menu-col\" *ngIf=\"config.features.enableRowActionButton\"></th>\r\n        </tr>\r\n      </thead>\r\n      <tbody>\r\n        <tr *ngFor=\"let row of pageRows; trackBy: trackByRow\" [class.selected]=\"selectedRowIds.has(row.__rowId)\" (contextmenu)=\"onRowContextMenu($event, row.__rowId)\">\r\n          <td class=\"checkbox-col\" *ngIf=\"config.features.enableRowSelection\">\r\n            <input type=\"checkbox\" [checked]=\"selectedRowIds.has(row.__rowId)\" (change)=\"toggleRowSelection(row.__rowId, $any($event.target).checked)\" />\r\n          </td>\r\n          <td *ngFor=\"let field of visibleColumnFields; trackBy: trackByField\">\r\n            {{ getCellValue(row, field) }}\r\n          </td>\r\n          <td class=\"menu-col\" *ngIf=\"config.features.enableRowActionButton\">\r\n            <button class=\"row-menu-btn\" type=\"button\" (click)=\"openContextMenuFromButton($event, row.__rowId)\">\u22EE</button>\r\n          </td>\r\n        </tr>\r\n        <tr *ngIf=\"pageRows.length === 0\">\r\n          <td class=\"empty-cell\" [attr.colspan]=\"visibleColumnFields.length + (config.features.enableRowSelection ? 1 : 0) + (config.features.enableRowActionButton ? 1 : 0)\">\r\n            {{ config.emptyMessage || 'No data available' }}\r\n          </td>\r\n        </tr>\r\n      </tbody>\r\n    </table>\r\n  </div>\r\n\r\n  <div class=\"pagination custom-pagination\" *ngIf=\"config.pagination && isCustomVariant\">\r\n    <div class=\"custom-page-left\" *ngIf=\"config.features.showPaginationNavigation\">\r\n      <button type=\"button\" class=\"nav-pill\" [disabled]=\"currentPage === 1\" (click)=\"prevPage()\">Prev</button>\r\n      <button type=\"button\" class=\"nav-pill\" [disabled]=\"currentPage === totalPages\" (click)=\"nextPage()\">Next</button>\r\n    </div>\r\n    <div class=\"custom-page-middle\" *ngIf=\"config.features.showPaginationSummary\">\r\n      <span>Page {{ currentPage }} of {{ totalPages }}</span>\r\n      <span class=\"dot\">\u2022</span>\r\n      <span>{{ startItem }}-{{ endItem }} / {{ totalRows }}</span>\r\n    </div>\r\n    <div class=\"custom-page-right\" *ngIf=\"config.features.showPaginationSizeSelector\">\r\n      <label for=\"customPageSize\">Rows</label>\r\n      <select id=\"customPageSize\" [ngModel]=\"pageSize\" (ngModelChange)=\"setPageSize($event)\">\r\n        <option *ngFor=\"let size of pageSizeOptions\" [ngValue]=\"size\">{{ size }}</option>\r\n      </select>\r\n    </div>\r\n  </div>\r\n\r\n  <div class=\"pagination material-pagination\" *ngIf=\"config.pagination && isMaterialVariant\">\r\n    <div class=\"page-summary\" *ngIf=\"config.features.showPaginationSummary\">Rows {{ startItem }}-{{ endItem }} of {{ totalRows }}</div>\r\n    <div class=\"material-page-right\">\r\n      <label for=\"materialPageSize\" *ngIf=\"config.features.showPaginationSizeSelector\">Rows per page</label>\r\n      <select id=\"materialPageSize\" *ngIf=\"config.features.showPaginationSizeSelector\" [ngModel]=\"pageSize\" (ngModelChange)=\"setPageSize($event)\">\r\n        <option *ngFor=\"let size of pageSizeOptions\" [ngValue]=\"size\">{{ size }}</option>\r\n      </select>\r\n      <ng-container *ngIf=\"config.features.showPaginationNavigation\">\r\n        <button type=\"button\" class=\"nav-btn\" [disabled]=\"currentPage === 1\" (click)=\"firstPage()\">\u23EE</button>\r\n        <button type=\"button\" class=\"nav-btn\" [disabled]=\"currentPage === 1\" (click)=\"prevPage()\">\u25C0</button>\r\n        <span>{{ currentPage }} / {{ totalPages }}</span>\r\n        <button type=\"button\" class=\"nav-btn\" [disabled]=\"currentPage === totalPages\" (click)=\"nextPage()\">\u25B6</button>\r\n        <button type=\"button\" class=\"nav-btn\" [disabled]=\"currentPage === totalPages\" (click)=\"lastPage()\">\u23ED</button>\r\n      </ng-container>\r\n    </div>\r\n  </div>\r\n\r\n  <div class=\"pagination canvas-pagination\" *ngIf=\"config.pagination && isCanvasVariant\">\r\n    <div class=\"page-control\" *ngIf=\"config.features.showPaginationSizeSelector\">\r\n      <label for=\"pageSize\">Items per page:</label>\r\n      <select id=\"pageSize\" [ngModel]=\"pageSize\" (ngModelChange)=\"setPageSize($event)\">\r\n        <option *ngFor=\"let size of pageSizeOptions\" [ngValue]=\"size\">{{ size }}</option>\r\n      </select>\r\n    </div>\r\n\r\n    <div class=\"page-summary\" *ngIf=\"config.features.showPaginationSummary\">Showing {{ startItem }} to {{ endItem }} of {{ totalRows }}</div>\r\n\r\n    <div class=\"page-nav\" *ngIf=\"config.features.showPaginationNavigation\">\r\n      <button type=\"button\" class=\"nav-btn\" [disabled]=\"currentPage === 1\" (click)=\"prevPage()\">\u25C0</button>\r\n      <span>{{ currentPage }} of {{ totalPages }} pages</span>\r\n      <button type=\"button\" class=\"nav-btn\" [disabled]=\"currentPage === totalPages\" (click)=\"nextPage()\">\u25B6</button>\r\n    </div>\r\n  </div>\r\n\r\n  <div class=\"context-menu\" *ngIf=\"showContextMenu && config.features.enableContextMenu\" [style.left.px]=\"contextX\" [style.top.px]=\"contextY\" (click)=\"$event.stopPropagation()\">\r\n    <button type=\"button\" *ngFor=\"let action of config.contextMenuActions; trackBy: trackByAction\" (click)=\"onContextActionClick(action)\">{{ action.label }}</button>\r\n    <button type=\"button\" class=\"close-btn\" (click)=\"closeContextMenu($event)\">Close</button>\r\n  </div>\r\n\r\n  <div class=\"overlay\" *ngIf=\"showSortModal && config.features.enableSorting\" (click)=\"closeSortModal()\">\r\n    <div class=\"sort-modal\" (click)=\"$event.stopPropagation()\">\r\n      <div class=\"modal-header\">\r\n        <h2>Sort Options</h2>\r\n        <button type=\"button\" class=\"close-icon\" (click)=\"closeSortModal()\">\u2715</button>\r\n      </div>\r\n\r\n      <div class=\"sort-group\" *ngFor=\"let criterion of sortCriteria; let i = index\">\r\n        <label>{{ i === 0 ? 'Sort by:' : 'Then by:' }}</label>\r\n        <select [(ngModel)]=\"criterion.field\">\r\n          <option value=\"\">Select column</option>\r\n          <option *ngFor=\"let col of allColumns\" [value]=\"col.field\">{{ col.header }}</option>\r\n        </select>\r\n\r\n        <div class=\"sort-direction\">\r\n          <label><input type=\"radio\" [name]=\"'direction-' + i\" value=\"asc\" [(ngModel)]=\"criterion.direction\" />Ascending</label>\r\n          <label><input type=\"radio\" [name]=\"'direction-' + i\" value=\"desc\" [(ngModel)]=\"criterion.direction\" />Descending</label>\r\n        </div>\r\n      </div>\r\n\r\n      <div class=\"modal-actions\">\r\n        <button type=\"button\" class=\"apply-btn\" (click)=\"applySortCriteria()\">Apply Sort</button>\r\n        <button type=\"button\" class=\"ghost-btn\" (click)=\"clearSortCriteria()\">Clear</button>\r\n      </div>\r\n    </div>\r\n  </div>\r\n\r\n  <div class=\"overlay\" *ngIf=\"showFilterModal && config.features.enableFiltering\" (click)=\"closeFilterModal()\">\r\n    <div class=\"sort-modal\" (click)=\"$event.stopPropagation()\">\r\n      <div class=\"modal-header\">\r\n        <h2>Filter Options</h2>\r\n        <button type=\"button\" class=\"close-icon\" (click)=\"closeFilterModal()\">\u2715</button>\r\n      </div>\r\n\r\n      <div class=\"sort-group\" *ngFor=\"let criterion of filterCriteria; let i = index\">\r\n        <label>{{ i === 0 ? 'Filter by:' : 'Then by:' }}</label>\r\n        <div class=\"filter-row\">\r\n          <select [(ngModel)]=\"criterion.field\">\r\n            <option value=\"\">Select column</option>\r\n            <option *ngFor=\"let col of allColumns\" [value]=\"col.field\">{{ col.header }}</option>\r\n          </select>\r\n          <select [(ngModel)]=\"criterion.operator\" class=\"operator-select\">\r\n            <option value=\"contains\">Contains</option>\r\n            <option value=\"equals\">Equals</option>\r\n            <option value=\"startsWith\">Starts With</option>\r\n            <option value=\"endsWith\">Ends With</option>\r\n          </select>\r\n          <input type=\"text\" [(ngModel)]=\"criterion.value\" placeholder=\"Value\" />\r\n        </div>\r\n      </div>\r\n\r\n      <div class=\"modal-actions\">\r\n        <button type=\"button\" class=\"apply-btn\" (click)=\"applyFilterCriteria()\">Apply Filter</button>\r\n        <button type=\"button\" class=\"ghost-btn\" (click)=\"clearFilterCriteria()\">Clear</button>\r\n      </div>\r\n    </div>\r\n  </div>\r\n\r\n  <div class=\"overlay\" *ngIf=\"showColumnsPanel && config.features.enableColumnPersonalization\" (click)=\"closeColumnsPanel()\">\r\n    <div class=\"columns-panel\" (click)=\"$event.stopPropagation()\">\r\n      <div class=\"panel-header\">\r\n        <h2>Personalize Columns</h2>\r\n        <button type=\"button\" class=\"close-icon\" (click)=\"closeColumnsPanel()\">\u2715</button>\r\n      </div>\r\n\r\n      <div class=\"panel-content\">\r\n        <div class=\"panel-left\">\r\n          <h3>Select Columns</h3>\r\n          <input type=\"text\" [placeholder]=\"config.personalization.searchPlaceholder\" [(ngModel)]=\"columnSearch\" />\r\n\r\n          <div class=\"column-list\">\r\n            <label *ngFor=\"let col of filteredColumnOptions\">\r\n              <input type=\"checkbox\" [disabled]=\"!config.features.enableColumnVisibilityToggle\" [checked]=\"visibleColumnFields.includes(col.field)\" (change)=\"toggleColumn(col.field)\" />\r\n              {{ col.group ? '[' + col.group + '] ' : '' }}{{ col.label || col.field }}\r\n            </label>\r\n          </div>\r\n        </div>\r\n\r\n        <div class=\"panel-right\">\r\n          <h3>Order Columns</h3>\r\n          <p>You may have up to {{ config.personalization.maxSelectedColumns }} fields for this display.</p>\r\n\r\n          <div class=\"selected-columns\">\r\n            <div class=\"selected-item\" *ngFor=\"let field of visibleColumnFields; let i = index\">\r\n              <span>{{ getColumnGroup(field) ? '[' + getColumnGroup(field) + '] ' : '' }}{{ getColumnHeader(field) }}</span>\r\n              <div class=\"order-actions\">\r\n                <button type=\"button\" [disabled]=\"i === 0 || !config.features.enableColumnReorder\" (click)=\"moveColumn(field, -1)\">\u2191</button>\r\n                <button type=\"button\" [disabled]=\"i === visibleColumnFields.length - 1 || !config.features.enableColumnReorder\" (click)=\"moveColumn(field, 1)\">\u2193</button>\r\n                <button type=\"button\" [disabled]=\"!config.features.enableColumnVisibilityToggle\" (click)=\"removeColumn(field)\">\u2715</button>\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n\r\n      <div class=\"panel-actions\">\r\n        <button type=\"button\" class=\"ghost-btn\" (click)=\"closeColumnsPanel()\">Cancel</button>\r\n        <button type=\"button\" class=\"apply-btn\" (click)=\"saveColumns()\">Save</button>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n", styles: [":host{display:block}.grid-shell{--bg: var(--br-background-color, #f5f7fb);--surface: var(--br-background-color, #ffffff);--surface-alt: var(--br-section-background-color, #f1f3f8);--header-bg: var(--br-table-header-background-color, #ecf0f8);--line: var(--br-section-border-color, #d9deea);--text: var(--br-base-font-color, #1b2233);--muted: var(--br-label-font-color, #5d6780);--primary: var(--br-focus-color, #2b6ef3);--primary-strong: var(--br-accent-color, var(--br-focus-color, #1a57d4));--selection: color-mix(in srgb, var(--br-focus-color, #2563eb) 16%, var(--br-section-background-color, #ffffff));--badge: var(--br-primary-button-color, #3f6be8);--cta: var(--br-primary-button-color, #1ca37f);--cta-text: var(--br-primary-button-text-color, #ffffff);border:1px solid var(--line);background:var(--bg);position:relative;overflow:hidden;border-radius:var(--grid-borderRadius, 10px)}.border-sharp{border-radius:0}.border-none{border-width:0}.border-soft{border-radius:var(--grid-borderRadius, 10px)}.grid-title{display:flex;align-items:center;justify-content:space-between;padding:12px 16px;background:var(--surface);border-bottom:1px solid var(--line)}.grid-title h3{margin:0;font-size:17px;font-weight:700;color:var(--text)}.grid-title .badge{padding:3px 10px;background:var(--badge);color:#fff;border-radius:999px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.4px}.top-toolbar{min-height:var(--grid-toolbarHeight, 62px);display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid var(--line);background:var(--surface-alt)}.custom-toolbar{background:linear-gradient(90deg,color-mix(in srgb,var(--surface-alt) 75%,#fff),color-mix(in srgb,var(--surface-alt) 90%,#dde7ff))}.material-toolbar{background:color-mix(in srgb,var(--surface-alt) 92%,#f4f8f4)}.canvas-toolbar{background:var(--surface-alt)}.custom-toolbar-main{display:flex;align-items:center;gap:10px;padding-left:12px}.custom-pill-actions{display:flex;align-items:center;gap:8px}.pill-btn{border:1px solid color-mix(in srgb,var(--primary) 30%,#d2d9ef);background:var(--surface, #fff);color:var(--text);border-radius:999px;min-height:34px;padding:0 12px;font-size:12px;font-weight:700;cursor:pointer}.pill-btn .badge-count{background:var(--primary);color:#fff;padding:0 6px;border-radius:999px;margin-left:6px;font-size:11px}.material-left{display:flex;align-items:center;gap:6px;padding-left:12px}.seg-btn{border:1px solid #d2dfd2;background:var(--surface, #fff);color:color-mix(in srgb,var(--primary) 85%,#000);min-height:34px;padding:0 12px;border-radius:8px;font-size:12px;font-weight:700;cursor:pointer}.left-actions{display:flex;align-items:center;gap:8px;padding:0 12px}.toolbar-btn{height:38px;border:0;background:transparent;color:var(--text);cursor:pointer}.text-btn{display:inline-flex;align-items:center;gap:7px;font-size:14px;font-weight:600}.text-btn .icon{color:var(--primary);font-size:15px}.search-wrap{margin-left:12px;border:2px solid var(--primary);display:flex;align-items:center;background:var(--surface, #fff);flex:1;max-width:68%;min-height:46px}.search-wrap .search-icon{width:42px;text-align:center;font-size:18px;color:var(--primary)}.search-wrap input{border:0;outline:none;flex:1;height:100%;font-size:14px;color:var(--text);background:transparent}.custom-search{max-width:620px;border-radius:999px;border-width:1px}.material-search{max-width:560px;border-radius:10px;border-width:1px}.right-actions{display:flex;align-items:stretch;margin-left:auto;min-height:var(--grid-toolbarHeight, 62px);position:relative}.right-actions .icon-btn{width:46px;border:0;border-left:1px solid var(--line);background:color-mix(in srgb,var(--surface-alt) 90%,#ffffff);color:var(--primary);font-size:17px;cursor:pointer}.right-actions .add-btn,.right-actions .add-dropdown{border:0;border-left:1px solid color-mix(in srgb,var(--cta) 70%,#000);background:var(--cta);color:var(--cta-text);font-size:14px;font-weight:700;cursor:pointer}.right-actions .add-btn{padding:0 20px}.right-actions .add-dropdown{min-width:42px;font-size:16px}.right-actions .primary-action-menu{position:absolute;right:8px;top:calc(100% + 6px);width:220px;background:var(--surface, #fff);border:1px solid var(--line);box-shadow:0 8px 24px #0000001f;z-index:16}.right-actions .primary-action-menu button{width:100%;text-align:left;border:0;border-bottom:1px solid var(--line, #eef1f8);background:var(--surface, #fff);height:40px;padding:0 12px;font-size:13px;cursor:pointer}.right-actions .primary-action-menu button:hover{background:color-mix(in srgb,var(--primary) 8%,var(--surface, #ffffff))}.selection-bar{min-height:58px;background:var(--primary);color:#fff;display:flex;align-items:center;justify-content:space-between;padding:0 14px}.selection-bar .selection-actions{display:flex;gap:10px;flex-wrap:wrap}.selection-bar .selection-btn{border:0;background:color-mix(in srgb,var(--primary) 88%,#fff);color:#fff;border-radius:16px;padding:6px 12px;font-size:12px;font-weight:600;cursor:pointer}.selection-bar .selection-meta{font-size:13px;font-weight:600}.table-wrap{overflow-x:auto;border-bottom:1px solid var(--line)}.grid-table{width:100%;min-width:920px;border-collapse:collapse;table-layout:fixed}.grid-table th,.grid-table td{border-bottom:1px solid var(--line);padding:var(--grid-cellPaddingY, 11px) var(--grid-cellPaddingX, 14px);text-align:left;color:var(--text);font-size:var(--grid-fontSize, 13px)}.grid-table th{background:var(--header-bg);font-weight:700}.grid-table tbody tr{background:color-mix(in srgb,var(--bg) 90%,#fff)}.grid-table tbody tr:hover{background:color-mix(in srgb,var(--selection) 65%,#fff)}.grid-table tbody tr.selected{background:var(--selection);outline:2px solid var(--primary);outline-offset:-2px}.grid-table .checkbox-col{width:42px;text-align:center;padding:0 6px}.grid-table .checkbox-col input[type=checkbox]{width:16px;height:16px;accent-color:var(--primary-strong)}.grid-table .menu-col{width:42px;text-align:center}.grid-table .header-cell{display:flex;justify-content:space-between;align-items:center}.grid-table .header-cell .header-arrow{color:var(--muted)}.grid-table .row-menu-btn{width:28px;height:28px;border:0;background:transparent;font-size:18px;cursor:pointer;color:var(--muted)}.grid-table .empty-cell{text-align:center;font-style:italic;color:var(--muted);padding:24px}.density-compact{--grid-cellPaddingY: 8px;--grid-cellPaddingX: 10px;--grid-fontSize: 12px}.density-comfortable{--grid-cellPaddingY: 11px;--grid-cellPaddingX: 14px;--grid-fontSize: 13px}.density-spacious{--grid-cellPaddingY: 14px;--grid-cellPaddingX: 18px;--grid-fontSize: 14px}.size-sm{--grid-toolbarHeight: 52px}.size-md{--grid-toolbarHeight: 62px}.size-lg{--grid-toolbarHeight: 72px}.sticky-header .table-wrap{max-height:var(--grid-tableMaxHeight, 480px)}.sticky-header .grid-table thead th{position:sticky;top:0;z-index:3}.pagination{min-height:58px;background:var(--surface-alt);display:grid;grid-template-columns:240px 1fr 290px;align-items:center;border-top:1px solid var(--line)}.pagination>div{min-height:58px;display:flex;align-items:center;padding:0 14px;border-right:1px solid var(--line)}.pagination .page-control{gap:8px}.pagination .page-control label,.pagination .page-control select{font-size:13px;color:var(--text)}.pagination .page-control select{border:0;background:transparent;outline:none;cursor:pointer}.pagination .page-summary{font-size:13px;color:var(--text)}.pagination .page-nav{justify-content:space-between;gap:10px;border-right:0}.pagination .page-nav span{font-size:13px}.pagination .page-nav .nav-btn{border:0;background:transparent;font-size:16px;cursor:pointer;color:var(--text)}.pagination .page-nav .nav-btn:disabled{color:var(--muted, #9ea8bf);cursor:not-allowed}.custom-pagination{grid-template-columns:180px 1fr 150px}.custom-pagination .custom-page-left{display:flex;gap:6px}.custom-pagination .nav-pill{border:1px solid var(--line);background:var(--surface, #fff);color:var(--text);border-radius:999px;min-height:32px;padding:0 12px;font-size:12px;font-weight:700;cursor:pointer}.custom-pagination .nav-pill:disabled{opacity:.45;cursor:not-allowed}.custom-pagination .custom-page-middle{gap:8px;font-size:13px;color:var(--text);display:flex;align-items:center}.custom-pagination .dot{color:var(--muted, #94a0be)}.custom-pagination .custom-page-right{display:flex;align-items:center;gap:8px;border-right:0}.custom-pagination .custom-page-right label,.custom-pagination .custom-page-right select{font-size:12px;color:var(--text)}.custom-pagination .custom-page-right select{border:1px solid var(--line);border-radius:8px;min-height:30px;padding:0 6px;background:var(--surface, #fff)}.material-pagination{grid-template-columns:1fr 420px}.material-pagination .page-summary{border-right:1px solid var(--line)}.material-pagination .material-page-right{display:flex;align-items:center;gap:8px;border-right:0}.material-pagination .material-page-right label,.material-pagination .material-page-right select,.material-pagination .material-page-right span{font-size:12px;color:var(--text)}.material-pagination .material-page-right select{border:1px solid var(--line);border-radius:8px;min-height:30px;padding:0 6px;background:var(--surface, #fff)}.context-menu{position:fixed;width:220px;background:var(--surface, #fff);border:1px solid var(--line);box-shadow:0 8px 24px #00000024;z-index:25}.context-menu button{width:100%;text-align:left;border:0;border-bottom:1px solid #edf1fb;background:var(--surface, #fff);height:40px;padding:0 12px;font-size:13px;color:var(--text);cursor:pointer}.context-menu button:hover{background:#f4f7ff}.context-menu .close-btn{color:var(--primary);border-bottom:0}.overlay{position:fixed;inset:0;background:#07102833;z-index:24;display:flex;justify-content:center;align-items:center}.sort-modal{width:min(920px,94vw);max-height:92vh;background:var(--surface);overflow:auto;padding:20px 24px;border:1px solid var(--line)}.modal-header{display:flex;justify-content:space-between;align-items:center}.modal-header h2{margin:0;font-size:28px;color:var(--text);font-weight:700}.close-icon{border:0;background:transparent;font-size:28px;color:#9aa5c2;cursor:pointer}.sort-group{margin-top:16px}.sort-group label{display:block;margin-bottom:6px;font-size:15px;color:var(--text);font-weight:600}.sort-group select,.sort-group input{width:100%;min-height:40px;background:var(--surface-alt, #f8faff);border:1px solid var(--line, #d8e1f5);font-size:13px;padding:0 10px;outline:none;border-radius:8px;color:var(--text)}.filter-row{display:grid;grid-template-columns:1fr 160px 1fr;gap:8px}.filter-row .operator-select{width:100%}.sort-direction{display:flex;gap:18px;margin-top:10px}.sort-direction label{display:flex;gap:6px;align-items:center;font-size:13px;margin:0;font-weight:500}.sort-direction label input[type=radio]{width:15px;height:15px}.modal-actions{margin-top:20px;display:flex;gap:12px}.apply-btn,.ghost-btn{min-height:40px;border:0;padding:0 16px;border-radius:8px;font-size:13px;font-weight:700;cursor:pointer}.apply-btn{background:var(--cta);color:#fff}.ghost-btn{background:transparent;color:var(--primary)}.columns-panel{width:min(1240px,96vw);max-height:96vh;background:var(--surface);display:flex;flex-direction:column;border:1px solid var(--line)}.panel-header{display:flex;justify-content:space-between;align-items:center;padding:16px 20px}.panel-header h2{margin:0;font-size:24px;color:var(--text)}.panel-content{flex:1;padding:0 20px 16px;display:grid;grid-template-columns:1fr 1fr;gap:16px;min-height:0}.panel-content h3{margin:8px 0 12px;font-size:18px;color:var(--text)}.panel-content p{font-size:13px;margin:0 0 10px;color:var(--muted)}.panel-left,.panel-right{background:var(--surface-alt, #f8fbff);border:1px solid var(--line, #dbe4f5);border-radius:10px;padding:14px;min-height:0;overflow:hidden;display:flex;flex-direction:column}.panel-left input{min-height:40px;border:1px solid var(--line, #c7d6f6);background:var(--surface, #fff);border-radius:8px;padding:0 10px;font-size:13px;outline:none;margin-bottom:10px}.column-list,.selected-columns{overflow:auto;padding-right:4px}.column-list label{display:flex;align-items:center;gap:8px;font-size:13px;color:var(--text);margin-bottom:7px}.column-list label input[type=checkbox]{width:14px;height:14px}.selected-item{background:#fff;border:1px solid var(--line, #dfe7f8);border-radius:8px;min-height:44px;display:flex;justify-content:space-between;align-items:center;padding:0 10px;margin-bottom:7px}.selected-item span{font-size:13px;color:var(--text)}.selected-item .order-actions{display:flex;gap:4px}.selected-item .order-actions button{border:1px solid var(--line, #d4ddf2);background:var(--surface, #fff);width:26px;height:26px;border-radius:6px;cursor:pointer}.selected-item .order-actions button:disabled{color:var(--muted, #9da7c2);cursor:not-allowed}.panel-actions{border-top:1px solid var(--line);min-height:58px;display:flex;justify-content:flex-end;align-items:center;gap:10px;padding:8px 16px}.zoom-mode .grid-table th,.zoom-mode .grid-table td{font-size:16px;line-height:1.45}.zoom-mode .top-toolbar .left-actions{display:none}@media (max-width: 1100px){.top-toolbar{min-height:auto;flex-wrap:wrap}.search-wrap{max-width:none;margin:10px}.pagination{grid-template-columns:1fr}.pagination>div{border-right:0;border-bottom:1px solid var(--line)}.panel-content,.filter-row{grid-template-columns:1fr}}\n"] }]
        }], propDecorators: { config: [{
                type: Input
            }], variant: [{
                type: Input
            }], action: [{
                type: Output
            }], onDocumentClick: [{
                type: HostListener,
                args: ['document:click']
            }] } });

class CustomGridComponent {
    config;
    action = new EventEmitter();
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.19", ngImport: i0, type: CustomGridComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.19", type: CustomGridComponent, isStandalone: true, selector: "br-custom-grid", inputs: { config: "config" }, outputs: { action: "action" }, ngImport: i0, template: "<br-grid-shell [config]=\"config\" variant=\"custom\" (action)=\"action.emit($event)\"></br-grid-shell>\r\n", styles: [":host{display:block}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "component", type: GridShellComponent, selector: "br-grid-shell", inputs: ["config", "variant"], outputs: ["action"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.19", ngImport: i0, type: CustomGridComponent, decorators: [{
            type: Component,
            args: [{ selector: 'br-custom-grid', standalone: true, imports: [CommonModule, GridShellComponent], template: "<br-grid-shell [config]=\"config\" variant=\"custom\" (action)=\"action.emit($event)\"></br-grid-shell>\r\n", styles: [":host{display:block}\n"] }]
        }], propDecorators: { config: [{
                type: Input
            }], action: [{
                type: Output
            }] } });

class MaterialGridComponent {
    config;
    action = new EventEmitter();
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.19", ngImport: i0, type: MaterialGridComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.19", type: MaterialGridComponent, isStandalone: true, selector: "br-material-grid", inputs: { config: "config" }, outputs: { action: "action" }, ngImport: i0, template: "<br-grid-shell [config]=\"config\" variant=\"material\" (action)=\"action.emit($event)\"></br-grid-shell>\r\n", styles: [":host{display:block}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "component", type: GridShellComponent, selector: "br-grid-shell", inputs: ["config", "variant"], outputs: ["action"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.19", ngImport: i0, type: MaterialGridComponent, decorators: [{
            type: Component,
            args: [{ selector: 'br-material-grid', standalone: true, imports: [CommonModule, GridShellComponent], template: "<br-grid-shell [config]=\"config\" variant=\"material\" (action)=\"action.emit($event)\"></br-grid-shell>\r\n", styles: [":host{display:block}\n"] }]
        }], propDecorators: { config: [{
                type: Input
            }], action: [{
                type: Output
            }] } });

class CanvasGridComponent {
    config;
    action = new EventEmitter();
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.19", ngImport: i0, type: CanvasGridComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.19", type: CanvasGridComponent, isStandalone: true, selector: "br-canvas-grid", inputs: { config: "config" }, outputs: { action: "action" }, ngImport: i0, template: "<br-grid-shell [config]=\"config\" variant=\"canvas\" (action)=\"action.emit($event)\"></br-grid-shell>\r\n", styles: [":host{display:block}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "component", type: GridShellComponent, selector: "br-grid-shell", inputs: ["config", "variant"], outputs: ["action"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.19", ngImport: i0, type: CanvasGridComponent, decorators: [{
            type: Component,
            args: [{ selector: 'br-canvas-grid', standalone: true, imports: [CommonModule, GridShellComponent], template: "<br-grid-shell [config]=\"config\" variant=\"canvas\" (action)=\"action.emit($event)\"></br-grid-shell>\r\n", styles: [":host{display:block}\n"] }]
        }], propDecorators: { config: [{
                type: Input
            }], action: [{
                type: Output
            }] } });

class PrimeGridComponent {
    config;
    action = new EventEmitter();
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.19", ngImport: i0, type: PrimeGridComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.19", type: PrimeGridComponent, isStandalone: true, selector: "br-prime-grid", inputs: { config: "config" }, outputs: { action: "action" }, ngImport: i0, template: `
    <div class="prime-grid">
      <p-table [value]="config.data" [columns]="config.columns" [paginator]="config.pagination" [rows]="config.pageSize">
        <ng-template pTemplate="header" let-columns>
          <tr>
            <th *ngFor="let col of columns">
              {{ col.header }}
            </th>
          </tr>
        </ng-template>
        <ng-template pTemplate="body" let-rowData let-columns="columns">
          <tr>
            <td *ngFor="let col of columns">
              {{ rowData[col.field] }}
            </td>
          </tr>
        </ng-template>
      </p-table>
    </div>
  `, isInline: true, styles: [".prime-grid{padding:1rem}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "ngmodule", type: TableModule }, { kind: "component", type: i2$1.Table, selector: "p-table", inputs: ["frozenColumns", "frozenValue", "styleClass", "tableStyle", "tableStyleClass", "paginator", "pageLinks", "rowsPerPageOptions", "alwaysShowPaginator", "paginatorPosition", "paginatorStyleClass", "paginatorDropdownAppendTo", "paginatorDropdownScrollHeight", "currentPageReportTemplate", "showCurrentPageReport", "showJumpToPageDropdown", "showJumpToPageInput", "showFirstLastIcon", "showPageLinks", "defaultSortOrder", "sortMode", "resetPageOnSort", "selectionMode", "selectionPageOnly", "contextMenuSelection", "contextMenuSelectionMode", "dataKey", "metaKeySelection", "rowSelectable", "rowTrackBy", "lazy", "lazyLoadOnInit", "compareSelectionBy", "csvSeparator", "exportFilename", "filters", "globalFilterFields", "filterDelay", "filterLocale", "expandedRowKeys", "editingRowKeys", "rowExpandMode", "scrollable", "rowGroupMode", "scrollHeight", "virtualScroll", "virtualScrollItemSize", "virtualScrollOptions", "virtualScrollDelay", "frozenWidth", "contextMenu", "resizableColumns", "columnResizeMode", "reorderableColumns", "loading", "loadingIcon", "showLoader", "rowHover", "customSort", "showInitialSortBadge", "exportFunction", "exportHeader", "stateKey", "stateStorage", "editMode", "groupRowsBy", "size", "showGridlines", "stripedRows", "groupRowsByOrder", "responsiveLayout", "breakpoint", "paginatorLocale", "value", "columns", "first", "rows", "totalRecords", "sortField", "sortOrder", "multiSortMeta", "selection", "selectAll"], outputs: ["contextMenuSelectionChange", "selectAllChange", "selectionChange", "onRowSelect", "onRowUnselect", "onPage", "onSort", "onFilter", "onLazyLoad", "onRowExpand", "onRowCollapse", "onContextMenuSelect", "onColResize", "onColReorder", "onRowReorder", "onEditInit", "onEditComplete", "onEditCancel", "onHeaderCheckboxToggle", "sortFunction", "firstChange", "rowsChange", "onStateSave", "onStateRestore"] }, { kind: "directive", type: i3.PrimeTemplate, selector: "[pTemplate]", inputs: ["type", "pTemplate"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.19", ngImport: i0, type: PrimeGridComponent, decorators: [{
            type: Component,
            args: [{ selector: 'br-prime-grid', standalone: true, imports: [CommonModule, TableModule], template: `
    <div class="prime-grid">
      <p-table [value]="config.data" [columns]="config.columns" [paginator]="config.pagination" [rows]="config.pageSize">
        <ng-template pTemplate="header" let-columns>
          <tr>
            <th *ngFor="let col of columns">
              {{ col.header }}
            </th>
          </tr>
        </ng-template>
        <ng-template pTemplate="body" let-rowData let-columns="columns">
          <tr>
            <td *ngFor="let col of columns">
              {{ rowData[col.field] }}
            </td>
          </tr>
        </ng-template>
      </p-table>
    </div>
  `, styles: [".prime-grid{padding:1rem}\n"] }]
        }], propDecorators: { config: [{
                type: Input
            }], action: [{
                type: Output
            }] } });

/**
 * ============================================================
 * UI MODE CONFIGURATION — PER-CONTROL SWITCH POINT
 * ============================================================
 *
 * This is the place where you control which UI library is used
 * per control type (grid/date) under the hood.
 *
 * Change UI_MODE_BY_CONTROL to switch control implementations
 * across every screen — without touching any consumer code.
 *
 * Options:
 *   'CUSTOM'   → Uses enterprise shell with custom styling + native date input
 *   'MATERIAL' → Uses enterprise shell with material styling + mat-datepicker
 *   'CANVAS'   → Uses canvas-style enterprise shell + mat-datepicker
 *
 * To add a new library (e.g., PrimeNG, AG Grid), simply:
 *   1. Add a new value to the UiMode type
 *   2. Create new implementation components
 *   3. Update the adapter/factories — that's it!
 * ============================================================
 */
// ▼▼▼ CHANGE THESE VALUES TO SWITCH CONTROL LIBRARIES ▼▼▼
const UI_MODE_BY_CONTROL = {
    grid: 'CUSTOM',
    date: 'MATERIAL',
    modal: 'CUSTOM',
    text: 'CUSTOM',
    singleSelect: 'CUSTOM',
    multiSelect: 'CUSTOM',
    checkbox: 'CUSTOM',
    radio: 'CUSTOM',
    autocomplete: 'CUSTOM',
};
// ▲▲▲ CHANGE THESE VALUES TO SWITCH CONTROL LIBRARIES ▲▲▲
// Backward-compat alias used by existing screen labels/debug displays.
const UI_MODE = UI_MODE_BY_CONTROL.grid;
const UI_MODE_TOKEN = new InjectionToken('UI_MODE', {
    providedIn: 'root',
    factory: () => UI_MODE,
});
const UI_MODE_BY_CONTROL_TOKEN = new InjectionToken('UI_MODE_BY_CONTROL', {
    providedIn: 'root',
    factory: () => UI_MODE_BY_CONTROL,
});

const STORAGE_KEY = 'br-runtime-ui-modes';
const MODES_CHANGED_EVENT = 'br-runtime-ui-modes-changed';
class RuntimeUiConfigService {
    modesSubject = new BehaviorSubject(this.loadInitialModes());
    modes$ = this.modesSubject.asObservable();
    hasWindow = typeof window !== 'undefined';
    getModesSnapshot() {
        return this.modesSubject.value;
    }
    constructor() {
        if (this.hasWindow) {
            window.addEventListener(MODES_CHANGED_EVENT, this.onModesChanged);
        }
    }
    setModes(next) {
        this.modesSubject.next(next);
        this.persist(next);
        this.broadcast(next);
    }
    setMode(control, mode) {
        const updated = { ...this.modesSubject.value, [control]: mode };
        this.setModes(updated);
    }
    resetToDefaults() {
        this.setModes({ ...UI_MODE_BY_CONTROL });
    }
    loadInitialModes() {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (!raw) {
                return { ...UI_MODE_BY_CONTROL };
            }
            const parsed = JSON.parse(raw);
            const legacyFormMode = parsed.form;
            return {
                grid: parsed.grid ?? UI_MODE_BY_CONTROL.grid,
                date: parsed.date ?? UI_MODE_BY_CONTROL.date,
                modal: parsed.modal ?? UI_MODE_BY_CONTROL.modal,
                text: parsed.text ?? legacyFormMode ?? UI_MODE_BY_CONTROL.text,
                singleSelect: parsed.singleSelect ?? legacyFormMode ?? UI_MODE_BY_CONTROL.singleSelect,
                multiSelect: parsed.multiSelect ?? legacyFormMode ?? UI_MODE_BY_CONTROL.multiSelect,
                checkbox: parsed.checkbox ?? legacyFormMode ?? UI_MODE_BY_CONTROL.checkbox,
                radio: parsed.radio ?? legacyFormMode ?? UI_MODE_BY_CONTROL.radio,
                autocomplete: parsed.autocomplete ?? legacyFormMode ?? UI_MODE_BY_CONTROL.autocomplete,
            };
        }
        catch {
            return { ...UI_MODE_BY_CONTROL };
        }
    }
    persist(modes) {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(modes));
        }
        catch {
            // Ignore storage issues in restricted environments.
        }
    }
    broadcast(modes) {
        if (!this.hasWindow) {
            return;
        }
        try {
            window.dispatchEvent(new CustomEvent(MODES_CHANGED_EVENT, { detail: modes }));
        }
        catch {
            // Ignore event dispatch failures in restricted environments.
        }
    }
    onModesChanged = (event) => {
        const detail = event.detail;
        if (!detail) {
            return;
        }
        const current = this.modesSubject.value;
        if (JSON.stringify(current) === JSON.stringify(detail)) {
            return;
        }
        this.modesSubject.next(detail);
    };
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.19", ngImport: i0, type: RuntimeUiConfigService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "19.2.19", ngImport: i0, type: RuntimeUiConfigService, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.19", ngImport: i0, type: RuntimeUiConfigService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: () => [] });

/**
 * ============================================================
 * BR-GRID — THE FAÇADE WRAPPER COMPONENT
 * ============================================================
 *
 * This is the ONLY grid component that consuming screens use.
 * Internally it:
 *   1. Reads UI_MODE from the config
 *   2. Uses the GridAdapter to transform the generic config
 *   3. Renders the correct implementation component
 *
 * Consumer screens NEVER import CustomGrid or MaterialGrid
 * directly — they only use <br-grid [config]="gridConfig">.
 *
 * PATTERN: Façade + Strategy
 * ============================================================
 */
class BrGridComponent {
    runtimeUiConfig;
    /**
     * The ONLY input — a library-agnostic JSON config.
     * Consumer screens pass this and nothing else.
     */
    config;
    action = new EventEmitter();
    /** Resolved at runtime from config service */
    uiMode = 'CUSTOM';
    /** Adapted configs for each implementation */
    customConfig;
    materialConfig;
    canvasConfig;
    primeConfig;
    destroy$ = new Subject();
    constructor(runtimeUiConfig) {
        this.runtimeUiConfig = runtimeUiConfig;
    }
    ngOnInit() {
        this.uiMode = this.runtimeUiConfig.getModesSnapshot().grid;
        this.runtimeUiConfig.modes$
            .pipe(takeUntil(this.destroy$))
            .subscribe((modes) => {
            this.uiMode = modes.grid;
            this.adaptConfig();
        });
    }
    ngOnChanges(changes) {
        if (changes['config'] && this.config) {
            this.adaptConfig();
        }
    }
    onGridAction(event) {
        this.action.emit(event);
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
    adaptConfig() {
        if (!this.config)
            return;
        if (this.uiMode === 'CUSTOM') {
            this.customConfig = GridAdapter.toCustom(this.config);
        }
        else if (this.uiMode === 'MATERIAL') {
            this.materialConfig = GridAdapter.toMaterial(this.config);
        }
        else if (this.uiMode === 'CANVAS') {
            this.canvasConfig = GridAdapter.toCanvas(this.config);
        }
        else {
            this.primeConfig = GridAdapter.toPrime(this.config);
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.19", ngImport: i0, type: BrGridComponent, deps: [{ token: RuntimeUiConfigService }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.19", type: BrGridComponent, isStandalone: true, selector: "br-grid", inputs: { config: "config" }, outputs: { action: "action" }, usesOnChanges: true, ngImport: i0, template: "<!--\r\n  BR-GRID FA\u00C7ADE TEMPLATE\r\n  \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\r\n  Conditionally renders the correct implementation based on UI_MODE.\r\n  Consumer code NEVER sees this switch \u2014 they only write <br-grid>.\r\n-->\r\n\r\n<!-- CUSTOM implementation -->\r\n<br-custom-grid *ngIf=\"uiMode === 'CUSTOM'\" [config]=\"customConfig\" (action)=\"onGridAction($event)\">\r\n</br-custom-grid>\r\n\r\n<!-- MATERIAL implementation -->\r\n<br-material-grid *ngIf=\"uiMode === 'MATERIAL'\" [config]=\"materialConfig\" (action)=\"onGridAction($event)\">\r\n</br-material-grid>\r\n\r\n<!-- CANVAS implementation -->\r\n<br-canvas-grid *ngIf=\"uiMode === 'CANVAS'\" [config]=\"canvasConfig\" (action)=\"onGridAction($event)\">\r\n</br-canvas-grid>\r\n\r\n<!-- PRIMENG implementation -->\r\n<br-prime-grid *ngIf=\"uiMode === 'PRIMENG'\" [config]=\"primeConfig\" (action)=\"onGridAction($event)\">\r\n</br-prime-grid>\r\n", styles: ["@charset \"UTF-8\";:host{display:block}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: CustomGridComponent, selector: "br-custom-grid", inputs: ["config"], outputs: ["action"] }, { kind: "component", type: MaterialGridComponent, selector: "br-material-grid", inputs: ["config"], outputs: ["action"] }, { kind: "component", type: CanvasGridComponent, selector: "br-canvas-grid", inputs: ["config"], outputs: ["action"] }, { kind: "component", type: PrimeGridComponent, selector: "br-prime-grid", inputs: ["config"], outputs: ["action"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.19", ngImport: i0, type: BrGridComponent, decorators: [{
            type: Component,
            args: [{ selector: 'br-grid', standalone: true, imports: [CommonModule, CustomGridComponent, MaterialGridComponent, CanvasGridComponent, PrimeGridComponent], template: "<!--\r\n  BR-GRID FA\u00C7ADE TEMPLATE\r\n  \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\r\n  Conditionally renders the correct implementation based on UI_MODE.\r\n  Consumer code NEVER sees this switch \u2014 they only write <br-grid>.\r\n-->\r\n\r\n<!-- CUSTOM implementation -->\r\n<br-custom-grid *ngIf=\"uiMode === 'CUSTOM'\" [config]=\"customConfig\" (action)=\"onGridAction($event)\">\r\n</br-custom-grid>\r\n\r\n<!-- MATERIAL implementation -->\r\n<br-material-grid *ngIf=\"uiMode === 'MATERIAL'\" [config]=\"materialConfig\" (action)=\"onGridAction($event)\">\r\n</br-material-grid>\r\n\r\n<!-- CANVAS implementation -->\r\n<br-canvas-grid *ngIf=\"uiMode === 'CANVAS'\" [config]=\"canvasConfig\" (action)=\"onGridAction($event)\">\r\n</br-canvas-grid>\r\n\r\n<!-- PRIMENG implementation -->\r\n<br-prime-grid *ngIf=\"uiMode === 'PRIMENG'\" [config]=\"primeConfig\" (action)=\"onGridAction($event)\">\r\n</br-prime-grid>\r\n", styles: ["@charset \"UTF-8\";:host{display:block}\n"] }]
        }], ctorParameters: () => [{ type: RuntimeUiConfigService }], propDecorators: { config: [{
                type: Input
            }], action: [{
                type: Output
            }] } });

/**
 * ============================================================
 * MODAL ADAPTER — Transforms generic JSON → implementation inputs
 * ============================================================
 *
 * Transforms the library-agnostic BrModalConfig into whatever
 * format each implementation component needs.
 * ============================================================
 */
class ModalAdapter {
    /**
     * Transform generic config → Custom modal input
     */
    static toCustom(config) {
        return {
            isOpen: config.isOpen ?? false,
            title: config.title || '',
            subtitle: config.subtitle || '',
            content: config.content || '',
            fields: config.fields || [],
            actions: config.actions || [],
            uiConfig: {
                size: config.uiConfig?.size ?? 'md',
                showCloseButton: config.uiConfig?.showCloseButton ?? true,
                isDismissible: config.uiConfig?.isDismissible ?? true,
                className: config.uiConfig?.className ?? '',
                tokens: config.uiConfig?.tokens ?? {},
            },
        };
    }
    /**
     * Transform generic config → Material modal input
     */
    static toMaterial(config) {
        // MatDialog usually needs a slightly different structure if using MatDialogConfig,
        // but since we are wrapping it in a component, we can keep it similar.
        return {
            isOpen: config.isOpen ?? false,
            title: config.title || '',
            subtitle: config.subtitle || '',
            content: config.content || '',
            fields: config.fields || [],
            actions: config.actions || [],
            uiConfig: {
                size: config.uiConfig?.size ?? 'md',
                showCloseButton: config.uiConfig?.showCloseButton ?? true,
                isDismissible: config.uiConfig?.isDismissible ?? true,
                className: config.uiConfig?.className ?? '',
                tokens: config.uiConfig?.tokens ?? {},
            },
        };
    }
    /**
     * Transform generic config → PrimeNG modal input
     */
    static toPrime(config) {
        return {
            isOpen: config.isOpen ?? false,
            title: config.title || '',
            subtitle: config.subtitle || '',
            content: config.content || '',
            fields: config.fields || [],
            actions: config.actions || [],
            uiConfig: {
                size: config.uiConfig?.size ?? 'md',
                showCloseButton: config.uiConfig?.showCloseButton ?? true,
                isDismissible: config.uiConfig?.isDismissible ?? true,
                className: config.uiConfig?.className ?? '',
                tokens: config.uiConfig?.tokens ?? {},
            },
        };
    }
}

/**
 * ============================================================
 * CUSTOM MODAL IMPLEMENTATION
 * ============================================================
 * A native HTML/CSS based modal.
 * No external library dependency.
 * ============================================================
 */
class CustomModalComponent {
    config;
    action = new EventEmitter();
    close = new EventEmitter();
    /** Local state for form field values */
    fieldValues = {};
    ngOnChanges(changes) {
        if (changes['config'] && this.config?.fields) {
            // Initialize or update field values from config
            this.config.fields.forEach(field => {
                if (this.fieldValues[field.id] === undefined) {
                    this.fieldValues[field.id] = field.value ?? (field.type === 'checkbox' ? false : '');
                }
            });
        }
    }
    get overlayClasses() {
        const classes = [];
        if (this.config.uiConfig.className) {
            classes.push(this.config.uiConfig.className);
        }
        return classes;
    }
    get modalClasses() {
        return [
            `size-${this.config.uiConfig.size}`
        ];
    }
    get overlayStyles() {
        const styles = {};
        Object.entries(this.config.uiConfig.tokens || {}).forEach(([key, value]) => {
            styles[`--modal-${key}`] = String(value);
        });
        return styles;
    }
    onActionClick(actionId, label) {
        this.action.emit({
            actionId,
            label,
            fieldValues: { ...this.fieldValues }
        });
    }
    onBackdropClick() {
        if (this.config.uiConfig.isDismissible) {
            this.close.emit();
        }
    }
    onCloseClick() {
        this.close.emit();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.19", ngImport: i0, type: CustomModalComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.19", type: CustomModalComponent, isStandalone: true, selector: "br-custom-modal", inputs: { config: "config" }, outputs: { action: "action", close: "close" }, usesOnChanges: true, ngImport: i0, template: "<div class=\"modal-overlay\" *ngIf=\"config.isOpen\" (click)=\"onBackdropClick()\" [ngClass]=\"overlayClasses\"\r\n    [ngStyle]=\"overlayStyles\">\r\n\r\n    <div class=\"modal-container\" (click)=\"$event.stopPropagation()\" [ngClass]=\"modalClasses\">\r\n\r\n        <!-- Header -->\r\n        <div class=\"modal-header\">\r\n            <div class=\"header-content\">\r\n                <h2 class=\"modal-title\" *ngIf=\"config.title\">{{ config.title }}</h2>\r\n                <p class=\"modal-subtitle\" *ngIf=\"config.subtitle\">{{ config.subtitle }}</p>\r\n            </div>\r\n            <button type=\"button\" class=\"close-button\" *ngIf=\"config.uiConfig.showCloseButton\" (click)=\"onCloseClick()\">\r\n                \u2715\r\n            </button>\r\n        </div>\r\n\r\n        <!-- Body -->\r\n        <div class=\"modal-body\">\r\n            <!-- Allow HTML content via [innerHTML] or simple projection if we were using ng-content -->\r\n            <div [innerHTML]=\"config.content\" *ngIf=\"config.content\"></div>\r\n\r\n            <div class=\"modal-fields-container\" *ngIf=\"config.fields && config.fields.length > 0\">\r\n                <div *ngFor=\"let field of config.fields\" [class]=\"'field-wrapper col-' + (field.colSpan || 1)\">\r\n\r\n                    <label [for]=\"field.id\" class=\"field-label\">{{ field.label }}</label>\r\n\r\n                    <!-- Text / Number / Date Input -->\r\n                    <input *ngIf=\"['text', 'number', 'date'].includes(field.type)\" [id]=\"field.id\" [type]=\"field.type\"\r\n                        class=\"form-control\" [placeholder]=\"field.placeholder || ''\" [(ngModel)]=\"fieldValues[field.id]\"\r\n                        [required]=\"field.required || false\" [disabled]=\"field.disabled || false\">\r\n\r\n                    <!-- Textarea -->\r\n                    <textarea *ngIf=\"field.type === 'textarea'\" [id]=\"field.id\" class=\"form-control\"\r\n                        [placeholder]=\"field.placeholder || ''\" [(ngModel)]=\"fieldValues[field.id]\"\r\n                        [required]=\"field.required || false\" [disabled]=\"field.disabled || false\"></textarea>\r\n\r\n                    <!-- Select -->\r\n                    <select *ngIf=\"field.type === 'select'\" [id]=\"field.id\" class=\"form-control\"\r\n                        [(ngModel)]=\"fieldValues[field.id]\" [required]=\"field.required || false\"\r\n                        [disabled]=\"field.disabled || false\">\r\n                        <option *ngFor=\"let opt of field.options\" [value]=\"opt.value\">\r\n                            {{ opt.label }}\r\n                        </option>\r\n                    </select>\r\n\r\n                    <!-- Radio -->\r\n                    <div *ngIf=\"field.type === 'radio'\" class=\"radio-group\">\r\n                        <div *ngFor=\"let opt of field.options\" class=\"radio-item\">\r\n                            <input type=\"radio\" [id]=\"field.id + '_' + opt.value\" [name]=\"field.id\" [value]=\"opt.value\"\r\n                                [(ngModel)]=\"fieldValues[field.id]\" [disabled]=\"field.disabled || false\">\r\n                            <label [for]=\"field.id + '_' + opt.value\">{{ opt.label }}</label>\r\n                        </div>\r\n                    </div>\r\n\r\n                    <!-- Checkbox -->\r\n                    <div *ngIf=\"field.type === 'checkbox'\" class=\"checkbox-item\">\r\n                        <input type=\"checkbox\" [id]=\"field.id\" [(ngModel)]=\"fieldValues[field.id]\"\r\n                            [disabled]=\"field.disabled || false\">\r\n                        <label [for]=\"field.id\">{{ field.label }}</label>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n\r\n\r\n        <!-- Footer -->\r\n        <div class=\"modal-footer\" *ngIf=\"config.actions && config.actions.length > 0\">\r\n            <button *ngFor=\"let action of config.actions\" type=\"button\" class=\"action-button\"\r\n                [class]=\"'btn-' + (action.type || 'secondary')\" [disabled]=\"action.disabled\"\r\n                (click)=\"onActionClick(action.id, action.label)\">\r\n                <span class=\"icon\" *ngIf=\"action.icon\">{{ action.icon }}</span>\r\n                {{ action.label }}\r\n            </button>\r\n        </div>\r\n    </div>\r\n</div>", styles: [".modal-overlay{position:fixed;top:0;left:0;width:100vw;height:100vh;background:#00000073;backdrop-filter:blur(4px);display:flex;align-items:center;justify-content:center;z-index:9999}.modal-container{background:var(--br-background-color, #ffffff);border-radius:12px;box-shadow:0 10px 40px #0003;display:flex;flex-direction:column;max-height:90vh;width:90%;overflow:hidden;animation:modal-slide-in .3s ease-out}.modal-container.size-sm{max-width:400px}.modal-container.size-md{max-width:600px}.modal-container.size-lg{max-width:900px}.modal-container.size-xl{max-width:1200px}.modal-container.size-full{max-width:98%;height:98vh}.modal-header{padding:20px 24px;border-bottom:1px solid var(--br-section-border-color, #f0f0f0);display:flex;align-items:flex-start;justify-content:space-between}.modal-header .header-content .modal-title{margin:0;font-size:20px;font-weight:600;color:var(--br-title-font-color, #1a1a1a)}.modal-header .header-content .modal-subtitle{margin:4px 0 0;font-size:14px;color:var(--br-label-font-color, #666)}.modal-header .close-button{background:none;border:none;font-size:20px;color:var(--br-input-placeholder-color, #999);cursor:pointer;padding:4px;line-height:1;transition:color .2s}.modal-header .close-button:hover{color:var(--br-base-font-color, #333)}.modal-body{padding:24px;overflow-y:auto;font-size:15px;line-height:1.6;color:var(--br-base-font-color, #333)}.modal-body .modal-fields-container{display:grid;grid-template-columns:repeat(2,1fr);gap:20px;margin-top:20px}.modal-body .modal-fields-container .field-wrapper{display:flex;flex-direction:column;gap:6px}.modal-body .modal-fields-container .field-wrapper.col-1{grid-column:span 1}.modal-body .modal-fields-container .field-wrapper.col-2{grid-column:span 2}.modal-body .modal-fields-container .field-label{font-size:14px;font-weight:500;color:var(--br-label-font-color, #374151)}.modal-body .modal-fields-container .form-control{padding:8px 12px;border:1px solid var(--br-input-border-color, #d1d5db);border-radius:6px;font-size:14px;color:var(--br-input-text-color, #111827);transition:border-color .2s,box-shadow .2s}.modal-body .modal-fields-container .form-control:focus{outline:none;border-color:var(--br-focus-color, #2563eb);box-shadow:0 0 0 3px var(--br-focus-ring-color, color-mix(in srgb, #2563eb 10%, transparent))}.modal-body .modal-fields-container .form-control:disabled{background:var(--br-input-disabled-background-color, #f9fafb);cursor:not-allowed}.modal-body .modal-fields-container textarea.form-control{min-height:100px;resize:vertical}.modal-body .modal-fields-container .radio-group{display:flex;flex-wrap:wrap;gap:16px;padding:8px 0}.modal-body .modal-fields-container .radio-group .radio-item{display:flex;align-items:center;gap:8px;cursor:pointer}.modal-body .modal-fields-container .radio-group .radio-item input[type=radio]{margin:0;cursor:pointer}.modal-body .modal-fields-container .radio-group .radio-item label{font-size:14px;color:var(--br-base-font-color, #4b5563);cursor:pointer}.modal-body .modal-fields-container .checkbox-item{display:flex;align-items:center;gap:8px;padding:8px 0}.modal-body .modal-fields-container .checkbox-item input[type=checkbox]{margin:0;width:16px;height:16px;cursor:pointer}.modal-body .modal-fields-container .checkbox-item label{font-size:14px;color:var(--br-base-font-color, #4b5563);cursor:pointer}.modal-footer{padding:16px 24px;border-top:1px solid var(--br-section-border-color, #f0f0f0);display:flex;justify-content:flex-end;gap:12px;background:var(--br-section-background-color, #fafafa)}.modal-footer .action-button{padding:8px 16px;border-radius:6px;font-size:14px;font-weight:500;cursor:pointer;transition:all .2s;display:flex;align-items:center;gap:8px}.modal-footer .action-button:disabled{opacity:.5;cursor:not-allowed}.modal-footer .action-button.btn-primary{background:var(--br-primary-button-color, #2563eb);color:var(--br-primary-button-text-color, white);border:1px solid var(--br-primary-button-color, #2563eb)}.modal-footer .action-button.btn-primary:hover:not(:disabled){background:var(--br-primary-button-hover-color, #1d4ed8)}.modal-footer .action-button.btn-secondary{background:var(--br-background-color, white);color:var(--br-label-font-color, #374151);border:1px solid var(--br-input-border-color, #d1d5db)}.modal-footer .action-button.btn-secondary:hover:not(:disabled){background:var(--br-input-disabled-background-color, #f9fafb)}.modal-footer .action-button.btn-ghost{background:transparent;color:var(--br-label-font-color, #6b7280);border:1px solid transparent}.modal-footer .action-button.btn-ghost:hover:not(:disabled){background:var(--br-section-background-color, #f3f4f6);color:var(--br-label-font-color, #374151)}.modal-footer .action-button.btn-danger{background:var(--br-primary-button-hover-color, #ef4444);color:var(--br-primary-button-text-color, white);border:1px solid var(--br-primary-button-hover-color, #ef4444)}.modal-footer .action-button.btn-danger:hover:not(:disabled){background:var(--br-primary-button-hover-color, #dc2626)}@keyframes modal-slide-in{0%{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "ngmodule", type: FormsModule }, { kind: "directive", type: i2.NgSelectOption, selector: "option", inputs: ["ngValue", "value"] }, { kind: "directive", type: i2.ɵNgSelectMultipleOption, selector: "option", inputs: ["ngValue", "value"] }, { kind: "directive", type: i2.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i2.CheckboxControlValueAccessor, selector: "input[type=checkbox][formControlName],input[type=checkbox][formControl],input[type=checkbox][ngModel]" }, { kind: "directive", type: i2.SelectControlValueAccessor, selector: "select:not([multiple])[formControlName],select:not([multiple])[formControl],select:not([multiple])[ngModel]", inputs: ["compareWith"] }, { kind: "directive", type: i2.RadioControlValueAccessor, selector: "input[type=radio][formControlName],input[type=radio][formControl],input[type=radio][ngModel]", inputs: ["name", "formControlName", "value"] }, { kind: "directive", type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i2.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }, { kind: "directive", type: i2.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.19", ngImport: i0, type: CustomModalComponent, decorators: [{
            type: Component,
            args: [{ selector: 'br-custom-modal', standalone: true, imports: [CommonModule, FormsModule], template: "<div class=\"modal-overlay\" *ngIf=\"config.isOpen\" (click)=\"onBackdropClick()\" [ngClass]=\"overlayClasses\"\r\n    [ngStyle]=\"overlayStyles\">\r\n\r\n    <div class=\"modal-container\" (click)=\"$event.stopPropagation()\" [ngClass]=\"modalClasses\">\r\n\r\n        <!-- Header -->\r\n        <div class=\"modal-header\">\r\n            <div class=\"header-content\">\r\n                <h2 class=\"modal-title\" *ngIf=\"config.title\">{{ config.title }}</h2>\r\n                <p class=\"modal-subtitle\" *ngIf=\"config.subtitle\">{{ config.subtitle }}</p>\r\n            </div>\r\n            <button type=\"button\" class=\"close-button\" *ngIf=\"config.uiConfig.showCloseButton\" (click)=\"onCloseClick()\">\r\n                \u2715\r\n            </button>\r\n        </div>\r\n\r\n        <!-- Body -->\r\n        <div class=\"modal-body\">\r\n            <!-- Allow HTML content via [innerHTML] or simple projection if we were using ng-content -->\r\n            <div [innerHTML]=\"config.content\" *ngIf=\"config.content\"></div>\r\n\r\n            <div class=\"modal-fields-container\" *ngIf=\"config.fields && config.fields.length > 0\">\r\n                <div *ngFor=\"let field of config.fields\" [class]=\"'field-wrapper col-' + (field.colSpan || 1)\">\r\n\r\n                    <label [for]=\"field.id\" class=\"field-label\">{{ field.label }}</label>\r\n\r\n                    <!-- Text / Number / Date Input -->\r\n                    <input *ngIf=\"['text', 'number', 'date'].includes(field.type)\" [id]=\"field.id\" [type]=\"field.type\"\r\n                        class=\"form-control\" [placeholder]=\"field.placeholder || ''\" [(ngModel)]=\"fieldValues[field.id]\"\r\n                        [required]=\"field.required || false\" [disabled]=\"field.disabled || false\">\r\n\r\n                    <!-- Textarea -->\r\n                    <textarea *ngIf=\"field.type === 'textarea'\" [id]=\"field.id\" class=\"form-control\"\r\n                        [placeholder]=\"field.placeholder || ''\" [(ngModel)]=\"fieldValues[field.id]\"\r\n                        [required]=\"field.required || false\" [disabled]=\"field.disabled || false\"></textarea>\r\n\r\n                    <!-- Select -->\r\n                    <select *ngIf=\"field.type === 'select'\" [id]=\"field.id\" class=\"form-control\"\r\n                        [(ngModel)]=\"fieldValues[field.id]\" [required]=\"field.required || false\"\r\n                        [disabled]=\"field.disabled || false\">\r\n                        <option *ngFor=\"let opt of field.options\" [value]=\"opt.value\">\r\n                            {{ opt.label }}\r\n                        </option>\r\n                    </select>\r\n\r\n                    <!-- Radio -->\r\n                    <div *ngIf=\"field.type === 'radio'\" class=\"radio-group\">\r\n                        <div *ngFor=\"let opt of field.options\" class=\"radio-item\">\r\n                            <input type=\"radio\" [id]=\"field.id + '_' + opt.value\" [name]=\"field.id\" [value]=\"opt.value\"\r\n                                [(ngModel)]=\"fieldValues[field.id]\" [disabled]=\"field.disabled || false\">\r\n                            <label [for]=\"field.id + '_' + opt.value\">{{ opt.label }}</label>\r\n                        </div>\r\n                    </div>\r\n\r\n                    <!-- Checkbox -->\r\n                    <div *ngIf=\"field.type === 'checkbox'\" class=\"checkbox-item\">\r\n                        <input type=\"checkbox\" [id]=\"field.id\" [(ngModel)]=\"fieldValues[field.id]\"\r\n                            [disabled]=\"field.disabled || false\">\r\n                        <label [for]=\"field.id\">{{ field.label }}</label>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n\r\n\r\n        <!-- Footer -->\r\n        <div class=\"modal-footer\" *ngIf=\"config.actions && config.actions.length > 0\">\r\n            <button *ngFor=\"let action of config.actions\" type=\"button\" class=\"action-button\"\r\n                [class]=\"'btn-' + (action.type || 'secondary')\" [disabled]=\"action.disabled\"\r\n                (click)=\"onActionClick(action.id, action.label)\">\r\n                <span class=\"icon\" *ngIf=\"action.icon\">{{ action.icon }}</span>\r\n                {{ action.label }}\r\n            </button>\r\n        </div>\r\n    </div>\r\n</div>", styles: [".modal-overlay{position:fixed;top:0;left:0;width:100vw;height:100vh;background:#00000073;backdrop-filter:blur(4px);display:flex;align-items:center;justify-content:center;z-index:9999}.modal-container{background:var(--br-background-color, #ffffff);border-radius:12px;box-shadow:0 10px 40px #0003;display:flex;flex-direction:column;max-height:90vh;width:90%;overflow:hidden;animation:modal-slide-in .3s ease-out}.modal-container.size-sm{max-width:400px}.modal-container.size-md{max-width:600px}.modal-container.size-lg{max-width:900px}.modal-container.size-xl{max-width:1200px}.modal-container.size-full{max-width:98%;height:98vh}.modal-header{padding:20px 24px;border-bottom:1px solid var(--br-section-border-color, #f0f0f0);display:flex;align-items:flex-start;justify-content:space-between}.modal-header .header-content .modal-title{margin:0;font-size:20px;font-weight:600;color:var(--br-title-font-color, #1a1a1a)}.modal-header .header-content .modal-subtitle{margin:4px 0 0;font-size:14px;color:var(--br-label-font-color, #666)}.modal-header .close-button{background:none;border:none;font-size:20px;color:var(--br-input-placeholder-color, #999);cursor:pointer;padding:4px;line-height:1;transition:color .2s}.modal-header .close-button:hover{color:var(--br-base-font-color, #333)}.modal-body{padding:24px;overflow-y:auto;font-size:15px;line-height:1.6;color:var(--br-base-font-color, #333)}.modal-body .modal-fields-container{display:grid;grid-template-columns:repeat(2,1fr);gap:20px;margin-top:20px}.modal-body .modal-fields-container .field-wrapper{display:flex;flex-direction:column;gap:6px}.modal-body .modal-fields-container .field-wrapper.col-1{grid-column:span 1}.modal-body .modal-fields-container .field-wrapper.col-2{grid-column:span 2}.modal-body .modal-fields-container .field-label{font-size:14px;font-weight:500;color:var(--br-label-font-color, #374151)}.modal-body .modal-fields-container .form-control{padding:8px 12px;border:1px solid var(--br-input-border-color, #d1d5db);border-radius:6px;font-size:14px;color:var(--br-input-text-color, #111827);transition:border-color .2s,box-shadow .2s}.modal-body .modal-fields-container .form-control:focus{outline:none;border-color:var(--br-focus-color, #2563eb);box-shadow:0 0 0 3px var(--br-focus-ring-color, color-mix(in srgb, #2563eb 10%, transparent))}.modal-body .modal-fields-container .form-control:disabled{background:var(--br-input-disabled-background-color, #f9fafb);cursor:not-allowed}.modal-body .modal-fields-container textarea.form-control{min-height:100px;resize:vertical}.modal-body .modal-fields-container .radio-group{display:flex;flex-wrap:wrap;gap:16px;padding:8px 0}.modal-body .modal-fields-container .radio-group .radio-item{display:flex;align-items:center;gap:8px;cursor:pointer}.modal-body .modal-fields-container .radio-group .radio-item input[type=radio]{margin:0;cursor:pointer}.modal-body .modal-fields-container .radio-group .radio-item label{font-size:14px;color:var(--br-base-font-color, #4b5563);cursor:pointer}.modal-body .modal-fields-container .checkbox-item{display:flex;align-items:center;gap:8px;padding:8px 0}.modal-body .modal-fields-container .checkbox-item input[type=checkbox]{margin:0;width:16px;height:16px;cursor:pointer}.modal-body .modal-fields-container .checkbox-item label{font-size:14px;color:var(--br-base-font-color, #4b5563);cursor:pointer}.modal-footer{padding:16px 24px;border-top:1px solid var(--br-section-border-color, #f0f0f0);display:flex;justify-content:flex-end;gap:12px;background:var(--br-section-background-color, #fafafa)}.modal-footer .action-button{padding:8px 16px;border-radius:6px;font-size:14px;font-weight:500;cursor:pointer;transition:all .2s;display:flex;align-items:center;gap:8px}.modal-footer .action-button:disabled{opacity:.5;cursor:not-allowed}.modal-footer .action-button.btn-primary{background:var(--br-primary-button-color, #2563eb);color:var(--br-primary-button-text-color, white);border:1px solid var(--br-primary-button-color, #2563eb)}.modal-footer .action-button.btn-primary:hover:not(:disabled){background:var(--br-primary-button-hover-color, #1d4ed8)}.modal-footer .action-button.btn-secondary{background:var(--br-background-color, white);color:var(--br-label-font-color, #374151);border:1px solid var(--br-input-border-color, #d1d5db)}.modal-footer .action-button.btn-secondary:hover:not(:disabled){background:var(--br-input-disabled-background-color, #f9fafb)}.modal-footer .action-button.btn-ghost{background:transparent;color:var(--br-label-font-color, #6b7280);border:1px solid transparent}.modal-footer .action-button.btn-ghost:hover:not(:disabled){background:var(--br-section-background-color, #f3f4f6);color:var(--br-label-font-color, #374151)}.modal-footer .action-button.btn-danger{background:var(--br-primary-button-hover-color, #ef4444);color:var(--br-primary-button-text-color, white);border:1px solid var(--br-primary-button-hover-color, #ef4444)}.modal-footer .action-button.btn-danger:hover:not(:disabled){background:var(--br-primary-button-hover-color, #dc2626)}@keyframes modal-slide-in{0%{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}\n"] }]
        }], propDecorators: { config: [{
                type: Input
            }], action: [{
                type: Output
            }], close: [{
                type: Output
            }] } });

/**
 * ============================================================
 * MATERIAL MODAL IMPLEMENTATION
 * ============================================================
 * Uses Angular Material's Dialog components for styling.
 * ============================================================
 */
class MaterialModalComponent {
    config;
    action = new EventEmitter();
    close = new EventEmitter();
    /** Local state for form field values */
    fieldValues = {};
    ngOnChanges(changes) {
        if (changes['config'] && this.config?.fields) {
            // Initialize or update field values from config
            this.config.fields.forEach(field => {
                if (this.fieldValues[field.id] === undefined) {
                    this.fieldValues[field.id] = field.value ?? (field.type === 'checkbox' ? false : '');
                }
            });
        }
    }
    get overlayClasses() {
        const classes = ['mat-modal-overlay'];
        if (this.config.uiConfig.className) {
            classes.push(this.config.uiConfig.className);
        }
        return classes;
    }
    get modalClasses() {
        return [
            'mat-modal-container',
            `size-${this.config.uiConfig.size}`
        ];
    }
    onActionClick(actionId, label) {
        this.action.emit({
            actionId,
            label,
            fieldValues: { ...this.fieldValues }
        });
    }
    onBackdropClick() {
        if (this.config.uiConfig.isDismissible) {
            this.close.emit();
        }
    }
    onCloseClick() {
        this.close.emit();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.19", ngImport: i0, type: MaterialModalComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.19", type: MaterialModalComponent, isStandalone: true, selector: "br-material-modal", inputs: { config: "config" }, outputs: { action: "action", close: "close" }, usesOnChanges: true, ngImport: i0, template: "<div class=\"mat-modal-backdrop\" *ngIf=\"config.isOpen\" (click)=\"onBackdropClick()\">\r\n    <div class=\"mat-elevation-z8\" [ngClass]=\"modalClasses\" (click)=\"$event.stopPropagation()\">\r\n\r\n        <div class=\"modal-header\">\r\n            <h2 mat-dialog-title *ngIf=\"config.title\">{{ config.title }}</h2>\r\n            <button mat-icon-button *ngIf=\"config.uiConfig.showCloseButton\" (click)=\"onCloseClick()\" class=\"close-btn\">\r\n                <mat-icon>close</mat-icon>\r\n            </button>\r\n        </div>\r\n\r\n        <div mat-dialog-content>\r\n            <p *ngIf=\"config.subtitle\" class=\"subtitle text-secondary\">{{ config.subtitle }}</p>\r\n            <div [innerHTML]=\"config.content\" *ngIf=\"config.content\"></div>\r\n\r\n            <div class=\"modal-fields-container\" *ngIf=\"config.fields && config.fields.length > 0\">\r\n                <div *ngFor=\"let field of config.fields\" [class]=\"'field-wrapper col-' + (field.colSpan || 1)\">\r\n\r\n                    <!-- Text / Number / Date Input -->\r\n                    <mat-form-field appearance=\"outline\" class=\"full-width\"\r\n                        *ngIf=\"['text', 'number', 'date'].includes(field.type)\">\r\n                        <mat-label>{{ field.label }}</mat-label>\r\n                        <input matInput [type]=\"field.type === 'date' ? 'date' : field.type\"\r\n                            [placeholder]=\"field.placeholder || ''\" [(ngModel)]=\"fieldValues[field.id]\"\r\n                            [name]=\"field.id\" [required]=\"field.required || false\" [disabled]=\"field.disabled || false\">\r\n                    </mat-form-field>\r\n\r\n                    <!-- Textarea -->\r\n                    <mat-form-field appearance=\"outline\" class=\"full-width\" *ngIf=\"field.type === 'textarea'\">\r\n                        <mat-label>{{ field.label }}</mat-label>\r\n                        <textarea matInput [placeholder]=\"field.placeholder || ''\" [(ngModel)]=\"fieldValues[field.id]\"\r\n                            [name]=\"field.id\" [required]=\"field.required || false\"\r\n                            [disabled]=\"field.disabled || false\"></textarea>\r\n                    </mat-form-field>\r\n\r\n                    <!-- Select -->\r\n                    <mat-form-field appearance=\"outline\" class=\"full-width\" *ngIf=\"field.type === 'select'\">\r\n                        <mat-label>{{ field.label }}</mat-label>\r\n                        <mat-select [(ngModel)]=\"fieldValues[field.id]\" [name]=\"field.id\"\r\n                            [required]=\"field.required || false\" [disabled]=\"field.disabled || false\">\r\n                            <mat-option *ngFor=\"let opt of field.options\" [value]=\"opt.value\">\r\n                                {{ opt.label }}\r\n                            </mat-option>\r\n                        </mat-select>\r\n                    </mat-form-field>\r\n\r\n                    <!-- Radio -->\r\n                    <div *ngIf=\"field.type === 'radio'\" class=\"radio-group-container\">\r\n                        <label class=\"field-label\">{{ field.label }}</label>\r\n                        <mat-radio-group [(ngModel)]=\"fieldValues[field.id]\" [name]=\"field.id\"\r\n                            [disabled]=\"field.disabled || false\">\r\n                            <mat-radio-button *ngFor=\"let opt of field.options\" [value]=\"opt.value\">\r\n                                {{ opt.label }}\r\n                            </mat-radio-button>\r\n                        </mat-radio-group>\r\n                    </div>\r\n\r\n                    <!-- Checkbox -->\r\n                    <div *ngIf=\"field.type === 'checkbox'\" class=\"checkbox-container\">\r\n                        <mat-checkbox [(ngModel)]=\"fieldValues[field.id]\" [name]=\"field.id\"\r\n                            [disabled]=\"field.disabled || false\">\r\n                            {{ field.label }}\r\n                        </mat-checkbox>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n\r\n\r\n        <div mat-dialog-actions align=\"end\" *ngIf=\"config.actions && config.actions.length > 0\">\r\n            <button *ngFor=\"let action of config.actions\" mat-button\r\n                [color]=\"action.type === 'primary' ? 'primary' : (action.type === 'danger' ? 'warn' : '')\"\r\n                [disabled]=\"action.disabled\" (click)=\"onActionClick(action.id, action.label)\">\r\n                {{ action.label }}\r\n            </button>\r\n        </div>\r\n    </div>\r\n</div>", styles: [".mat-modal-backdrop{position:fixed;top:0;left:0;width:100vw;height:100vh;background:#00000052;display:flex;align-items:center;justify-content:center;z-index:1000}.mat-modal-container{background:var(--br-background-color, white);border-radius:4px;width:90%;max-height:90vh;display:flex;flex-direction:column;overflow:hidden;font-family:var(--br-font-family, Tahoma, Arial, sans-serif)}.mat-modal-container.size-sm{max-width:400px}.mat-modal-container.size-md{max-width:600px}.mat-modal-container.size-lg{max-width:900px}.mat-modal-container.size-xl{max-width:1200px}.modal-header{display:flex;justify-content:space-between;align-items:center;padding:0 16px}.modal-header h2{margin:0;padding:16px 0;color:var(--br-title-font-color, #0f172a)}[mat-dialog-content]{padding:0 24px 24px;color:var(--br-base-font-color, #1f2937)}[mat-dialog-content] .subtitle{font-size:14px;margin-bottom:24px;display:block;color:var(--br-label-font-color, rgba(0, 0, 0, .6))}[mat-dialog-content] .modal-fields-container{display:grid;grid-template-columns:repeat(2,1fr);gap:16px;margin-top:16px}[mat-dialog-content] .modal-fields-container .field-wrapper.col-1{grid-column:span 1}[mat-dialog-content] .modal-fields-container .field-wrapper.col-2{grid-column:span 2}[mat-dialog-content] .modal-fields-container .full-width{width:100%}[mat-dialog-content] .modal-fields-container .radio-group-container,[mat-dialog-content] .modal-fields-container .checkbox-container{display:flex;flex-direction:column;gap:8px;margin-bottom:16px}[mat-dialog-content] .modal-fields-container .radio-group-container .field-label,[mat-dialog-content] .modal-fields-container .checkbox-container .field-label{font-size:12px;color:var(--br-label-font-color, rgba(0, 0, 0, .6))}[mat-dialog-content] .modal-fields-container .radio-group-container mat-radio-group,[mat-dialog-content] .modal-fields-container .checkbox-container mat-radio-group{display:flex;flex-wrap:wrap;gap:16px}:host ::ng-deep mat-form-field .mdc-text-field--outlined{background:var(--br-input-background-color, #ffffff)}:host ::ng-deep mat-form-field .mdc-notched-outline__leading,:host ::ng-deep mat-form-field .mdc-notched-outline__notch,:host ::ng-deep mat-form-field .mdc-notched-outline__trailing{border-color:var(--br-input-border-color, #c8d5e6)}:host ::ng-deep mat-form-field.mat-focused .mdc-notched-outline__leading,:host ::ng-deep mat-form-field.mat-focused .mdc-notched-outline__notch,:host ::ng-deep mat-form-field.mat-focused .mdc-notched-outline__trailing{border-color:var(--br-focus-color, #2563eb)}:host ::ng-deep mat-form-field .mdc-text-field__input,:host ::ng-deep mat-form-field .mat-mdc-select-value-text,:host ::ng-deep mat-form-field .mat-mdc-select-min-line{color:var(--br-input-text-color, #1f2937);font-family:var(--br-font-family, Tahoma, Arial, sans-serif)}:host ::ng-deep mat-form-field .mdc-floating-label,:host ::ng-deep .checkbox-container .mdc-label,:host ::ng-deep .radio-group-container .mdc-label{color:var(--br-label-font-color, #475569)}:host ::ng-deep .checkbox-container .mdc-checkbox__background{border-color:var(--br-input-border-color, #c8d5e6)!important}:host ::ng-deep .checkbox-container .mdc-checkbox__native-control:enabled:checked~.mdc-checkbox__background,:host ::ng-deep .checkbox-container .mat-mdc-checkbox-checked .mdc-checkbox__background,:host ::ng-deep .radio-group-container .mdc-radio__native-control:enabled:checked+.mdc-radio__background .mdc-radio__outer-circle,:host ::ng-deep .radio-group-container .mdc-radio__native-control:enabled:checked+.mdc-radio__background .mdc-radio__inner-circle{border-color:var(--br-accent-color, var(--br-focus-color, #2563eb))!important;background-color:var(--br-accent-color, var(--br-focus-color, #2563eb))!important}[mat-dialog-actions]{padding:12px 16px;border-top:1px solid var(--br-section-border-color, rgba(0, 0, 0, .12));background:var(--br-section-background-color, #f8fafc)}:host ::ng-deep [mat-dialog-actions] .mdc-button{color:var(--br-primary-button-color, #2563eb)}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "ngmodule", type: FormsModule }, { kind: "directive", type: i2.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i2.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }, { kind: "directive", type: i2.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { kind: "ngmodule", type: MatDialogModule }, { kind: "directive", type: i3$1.MatDialogTitle, selector: "[mat-dialog-title], [matDialogTitle]", inputs: ["id"], exportAs: ["matDialogTitle"] }, { kind: "directive", type: i3$1.MatDialogActions, selector: "[mat-dialog-actions], mat-dialog-actions, [matDialogActions]", inputs: ["align"] }, { kind: "directive", type: i3$1.MatDialogContent, selector: "[mat-dialog-content], mat-dialog-content, [matDialogContent]" }, { kind: "ngmodule", type: MatButtonModule }, { kind: "component", type: i4.MatButton, selector: "    button[mat-button], button[mat-raised-button], button[mat-flat-button],    button[mat-stroked-button]  ", exportAs: ["matButton"] }, { kind: "component", type: i4.MatIconButton, selector: "button[mat-icon-button]", exportAs: ["matButton"] }, { kind: "ngmodule", type: MatIconModule }, { kind: "component", type: i5.MatIcon, selector: "mat-icon", inputs: ["color", "inline", "svgIcon", "fontSet", "fontIcon"], exportAs: ["matIcon"] }, { kind: "ngmodule", type: MatInputModule }, { kind: "directive", type: i3$2.MatInput, selector: "input[matInput], textarea[matInput], select[matNativeControl],      input[matNativeControl], textarea[matNativeControl]", inputs: ["disabled", "id", "placeholder", "name", "required", "type", "errorStateMatcher", "aria-describedby", "value", "readonly", "disabledInteractive"], exportAs: ["matInput"] }, { kind: "component", type: i3$2.MatFormField, selector: "mat-form-field", inputs: ["hideRequiredMarker", "color", "floatLabel", "appearance", "subscriptSizing", "hintLabel"], exportAs: ["matFormField"] }, { kind: "directive", type: i3$2.MatLabel, selector: "mat-label" }, { kind: "ngmodule", type: MatFormFieldModule }, { kind: "ngmodule", type: MatRadioModule }, { kind: "directive", type: i7.MatRadioGroup, selector: "mat-radio-group", inputs: ["color", "name", "labelPosition", "value", "selected", "disabled", "required", "disabledInteractive"], outputs: ["change"], exportAs: ["matRadioGroup"] }, { kind: "component", type: i7.MatRadioButton, selector: "mat-radio-button", inputs: ["id", "name", "aria-label", "aria-labelledby", "aria-describedby", "disableRipple", "tabIndex", "checked", "value", "labelPosition", "disabled", "required", "color", "disabledInteractive"], outputs: ["change"], exportAs: ["matRadioButton"] }, { kind: "ngmodule", type: MatCheckboxModule }, { kind: "component", type: i3$3.MatCheckbox, selector: "mat-checkbox", inputs: ["aria-label", "aria-labelledby", "aria-describedby", "aria-expanded", "aria-controls", "aria-owns", "id", "required", "labelPosition", "name", "value", "disableRipple", "tabIndex", "color", "disabledInteractive", "checked", "disabled", "indeterminate"], outputs: ["change", "indeterminateChange"], exportAs: ["matCheckbox"] }, { kind: "ngmodule", type: MatSelectModule }, { kind: "component", type: i5$1.MatSelect, selector: "mat-select", inputs: ["aria-describedby", "panelClass", "disabled", "disableRipple", "tabIndex", "hideSingleSelectionIndicator", "placeholder", "required", "multiple", "disableOptionCentering", "compareWith", "value", "aria-label", "aria-labelledby", "errorStateMatcher", "typeaheadDebounceInterval", "sortComparator", "id", "panelWidth", "canSelectNullableOptions"], outputs: ["openedChange", "opened", "closed", "selectionChange", "valueChange"], exportAs: ["matSelect"] }, { kind: "component", type: i5$1.MatOption, selector: "mat-option", inputs: ["value", "id", "disabled"], outputs: ["onSelectionChange"], exportAs: ["matOption"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.19", ngImport: i0, type: MaterialModalComponent, decorators: [{
            type: Component,
            args: [{ selector: 'br-material-modal', standalone: true, imports: [
                        CommonModule,
                        FormsModule,
                        MatDialogModule,
                        MatButtonModule,
                        MatIconModule,
                        MatInputModule,
                        MatFormFieldModule,
                        MatRadioModule,
                        MatCheckboxModule,
                        MatSelectModule
                    ], template: "<div class=\"mat-modal-backdrop\" *ngIf=\"config.isOpen\" (click)=\"onBackdropClick()\">\r\n    <div class=\"mat-elevation-z8\" [ngClass]=\"modalClasses\" (click)=\"$event.stopPropagation()\">\r\n\r\n        <div class=\"modal-header\">\r\n            <h2 mat-dialog-title *ngIf=\"config.title\">{{ config.title }}</h2>\r\n            <button mat-icon-button *ngIf=\"config.uiConfig.showCloseButton\" (click)=\"onCloseClick()\" class=\"close-btn\">\r\n                <mat-icon>close</mat-icon>\r\n            </button>\r\n        </div>\r\n\r\n        <div mat-dialog-content>\r\n            <p *ngIf=\"config.subtitle\" class=\"subtitle text-secondary\">{{ config.subtitle }}</p>\r\n            <div [innerHTML]=\"config.content\" *ngIf=\"config.content\"></div>\r\n\r\n            <div class=\"modal-fields-container\" *ngIf=\"config.fields && config.fields.length > 0\">\r\n                <div *ngFor=\"let field of config.fields\" [class]=\"'field-wrapper col-' + (field.colSpan || 1)\">\r\n\r\n                    <!-- Text / Number / Date Input -->\r\n                    <mat-form-field appearance=\"outline\" class=\"full-width\"\r\n                        *ngIf=\"['text', 'number', 'date'].includes(field.type)\">\r\n                        <mat-label>{{ field.label }}</mat-label>\r\n                        <input matInput [type]=\"field.type === 'date' ? 'date' : field.type\"\r\n                            [placeholder]=\"field.placeholder || ''\" [(ngModel)]=\"fieldValues[field.id]\"\r\n                            [name]=\"field.id\" [required]=\"field.required || false\" [disabled]=\"field.disabled || false\">\r\n                    </mat-form-field>\r\n\r\n                    <!-- Textarea -->\r\n                    <mat-form-field appearance=\"outline\" class=\"full-width\" *ngIf=\"field.type === 'textarea'\">\r\n                        <mat-label>{{ field.label }}</mat-label>\r\n                        <textarea matInput [placeholder]=\"field.placeholder || ''\" [(ngModel)]=\"fieldValues[field.id]\"\r\n                            [name]=\"field.id\" [required]=\"field.required || false\"\r\n                            [disabled]=\"field.disabled || false\"></textarea>\r\n                    </mat-form-field>\r\n\r\n                    <!-- Select -->\r\n                    <mat-form-field appearance=\"outline\" class=\"full-width\" *ngIf=\"field.type === 'select'\">\r\n                        <mat-label>{{ field.label }}</mat-label>\r\n                        <mat-select [(ngModel)]=\"fieldValues[field.id]\" [name]=\"field.id\"\r\n                            [required]=\"field.required || false\" [disabled]=\"field.disabled || false\">\r\n                            <mat-option *ngFor=\"let opt of field.options\" [value]=\"opt.value\">\r\n                                {{ opt.label }}\r\n                            </mat-option>\r\n                        </mat-select>\r\n                    </mat-form-field>\r\n\r\n                    <!-- Radio -->\r\n                    <div *ngIf=\"field.type === 'radio'\" class=\"radio-group-container\">\r\n                        <label class=\"field-label\">{{ field.label }}</label>\r\n                        <mat-radio-group [(ngModel)]=\"fieldValues[field.id]\" [name]=\"field.id\"\r\n                            [disabled]=\"field.disabled || false\">\r\n                            <mat-radio-button *ngFor=\"let opt of field.options\" [value]=\"opt.value\">\r\n                                {{ opt.label }}\r\n                            </mat-radio-button>\r\n                        </mat-radio-group>\r\n                    </div>\r\n\r\n                    <!-- Checkbox -->\r\n                    <div *ngIf=\"field.type === 'checkbox'\" class=\"checkbox-container\">\r\n                        <mat-checkbox [(ngModel)]=\"fieldValues[field.id]\" [name]=\"field.id\"\r\n                            [disabled]=\"field.disabled || false\">\r\n                            {{ field.label }}\r\n                        </mat-checkbox>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n\r\n\r\n        <div mat-dialog-actions align=\"end\" *ngIf=\"config.actions && config.actions.length > 0\">\r\n            <button *ngFor=\"let action of config.actions\" mat-button\r\n                [color]=\"action.type === 'primary' ? 'primary' : (action.type === 'danger' ? 'warn' : '')\"\r\n                [disabled]=\"action.disabled\" (click)=\"onActionClick(action.id, action.label)\">\r\n                {{ action.label }}\r\n            </button>\r\n        </div>\r\n    </div>\r\n</div>", styles: [".mat-modal-backdrop{position:fixed;top:0;left:0;width:100vw;height:100vh;background:#00000052;display:flex;align-items:center;justify-content:center;z-index:1000}.mat-modal-container{background:var(--br-background-color, white);border-radius:4px;width:90%;max-height:90vh;display:flex;flex-direction:column;overflow:hidden;font-family:var(--br-font-family, Tahoma, Arial, sans-serif)}.mat-modal-container.size-sm{max-width:400px}.mat-modal-container.size-md{max-width:600px}.mat-modal-container.size-lg{max-width:900px}.mat-modal-container.size-xl{max-width:1200px}.modal-header{display:flex;justify-content:space-between;align-items:center;padding:0 16px}.modal-header h2{margin:0;padding:16px 0;color:var(--br-title-font-color, #0f172a)}[mat-dialog-content]{padding:0 24px 24px;color:var(--br-base-font-color, #1f2937)}[mat-dialog-content] .subtitle{font-size:14px;margin-bottom:24px;display:block;color:var(--br-label-font-color, rgba(0, 0, 0, .6))}[mat-dialog-content] .modal-fields-container{display:grid;grid-template-columns:repeat(2,1fr);gap:16px;margin-top:16px}[mat-dialog-content] .modal-fields-container .field-wrapper.col-1{grid-column:span 1}[mat-dialog-content] .modal-fields-container .field-wrapper.col-2{grid-column:span 2}[mat-dialog-content] .modal-fields-container .full-width{width:100%}[mat-dialog-content] .modal-fields-container .radio-group-container,[mat-dialog-content] .modal-fields-container .checkbox-container{display:flex;flex-direction:column;gap:8px;margin-bottom:16px}[mat-dialog-content] .modal-fields-container .radio-group-container .field-label,[mat-dialog-content] .modal-fields-container .checkbox-container .field-label{font-size:12px;color:var(--br-label-font-color, rgba(0, 0, 0, .6))}[mat-dialog-content] .modal-fields-container .radio-group-container mat-radio-group,[mat-dialog-content] .modal-fields-container .checkbox-container mat-radio-group{display:flex;flex-wrap:wrap;gap:16px}:host ::ng-deep mat-form-field .mdc-text-field--outlined{background:var(--br-input-background-color, #ffffff)}:host ::ng-deep mat-form-field .mdc-notched-outline__leading,:host ::ng-deep mat-form-field .mdc-notched-outline__notch,:host ::ng-deep mat-form-field .mdc-notched-outline__trailing{border-color:var(--br-input-border-color, #c8d5e6)}:host ::ng-deep mat-form-field.mat-focused .mdc-notched-outline__leading,:host ::ng-deep mat-form-field.mat-focused .mdc-notched-outline__notch,:host ::ng-deep mat-form-field.mat-focused .mdc-notched-outline__trailing{border-color:var(--br-focus-color, #2563eb)}:host ::ng-deep mat-form-field .mdc-text-field__input,:host ::ng-deep mat-form-field .mat-mdc-select-value-text,:host ::ng-deep mat-form-field .mat-mdc-select-min-line{color:var(--br-input-text-color, #1f2937);font-family:var(--br-font-family, Tahoma, Arial, sans-serif)}:host ::ng-deep mat-form-field .mdc-floating-label,:host ::ng-deep .checkbox-container .mdc-label,:host ::ng-deep .radio-group-container .mdc-label{color:var(--br-label-font-color, #475569)}:host ::ng-deep .checkbox-container .mdc-checkbox__background{border-color:var(--br-input-border-color, #c8d5e6)!important}:host ::ng-deep .checkbox-container .mdc-checkbox__native-control:enabled:checked~.mdc-checkbox__background,:host ::ng-deep .checkbox-container .mat-mdc-checkbox-checked .mdc-checkbox__background,:host ::ng-deep .radio-group-container .mdc-radio__native-control:enabled:checked+.mdc-radio__background .mdc-radio__outer-circle,:host ::ng-deep .radio-group-container .mdc-radio__native-control:enabled:checked+.mdc-radio__background .mdc-radio__inner-circle{border-color:var(--br-accent-color, var(--br-focus-color, #2563eb))!important;background-color:var(--br-accent-color, var(--br-focus-color, #2563eb))!important}[mat-dialog-actions]{padding:12px 16px;border-top:1px solid var(--br-section-border-color, rgba(0, 0, 0, .12));background:var(--br-section-background-color, #f8fafc)}:host ::ng-deep [mat-dialog-actions] .mdc-button{color:var(--br-primary-button-color, #2563eb)}\n"] }]
        }], propDecorators: { config: [{
                type: Input
            }], action: [{
                type: Output
            }], close: [{
                type: Output
            }] } });

class PrimeModalComponent {
    config;
    action = new EventEmitter();
    close = new EventEmitter();
    fieldValues = {};
    filteredOptionsMap = {};
    getAutocompleteValue(field) {
        const val = this.fieldValues[field.id];
        if (val !== undefined && val !== null && val !== '') {
            const found = field.options?.find((o) => o.value === val);
            return found || { label: val, value: val };
        }
        return null;
    }
    onAutocompleteChange(event, fieldId) {
        if (event && typeof event === 'object') {
            this.fieldValues[fieldId] = event.value !== undefined ? event.value : event;
        }
        else {
            this.fieldValues[fieldId] = event || '';
        }
    }
    onAutocompleteClear(fieldId) {
        this.fieldValues[fieldId] = null;
    }
    filterAutocomplete(event, field) {
        const query = (event.query || '').toString().toLowerCase();
        const opts = field.options || [];
        this.filteredOptionsMap[field.id] = opts.filter((opt) => {
            const lbl = (opt.label ?? opt.value ?? '').toString().toLowerCase();
            return lbl.includes(query);
        });
    }
    ngOnChanges(changes) {
        if (changes['config'] && this.config?.fields) {
            this.config.fields.forEach((field) => {
                if (this.fieldValues[field.id] === undefined) {
                    this.fieldValues[field.id] = field.value ?? (field.type === 'checkbox' ? false : '');
                }
            });
        }
    }
    getSizeStyle() {
        switch (this.config?.uiConfig?.size) {
            case 'sm': return '400px';
            case 'lg': return '800px';
            case 'xl': return '1140px';
            case 'full': return '100vw';
            default: return '600px';
        }
    }
    getSeverity(type) {
        if (type === 'danger')
            return 'danger';
        if (type === 'secondary')
            return 'secondary';
        return 'primary';
    }
    onActionClick(actionId, label) {
        this.action.emit({
            actionId,
            label,
            fieldValues: { ...this.fieldValues }
        });
    }
    onCloseClick() {
        this.close.emit();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.19", ngImport: i0, type: PrimeModalComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.19", type: PrimeModalComponent, isStandalone: true, selector: "br-prime-modal", inputs: { config: "config" }, outputs: { action: "action", close: "close" }, usesOnChanges: true, ngImport: i0, template: `
    <p-dialog 
      [(visible)]="config.isOpen" 
      [modal]="true" 
      [closable]="config.uiConfig.showCloseButton" 
      [dismissableMask]="config.uiConfig.isDismissible"
      (onHide)="onCloseClick()"
      [header]="config.title"
      [style]="{ width: getSizeStyle() }"
      [styleClass]="config.uiConfig.className">
      
      <p *ngIf="config.subtitle" class="br-prime-modal-subtitle">{{ config.subtitle }}</p>
      <div [innerHTML]="config.content" *ngIf="config.content" class="br-prime-modal-content-html"></div>

      <div class="br-prime-modal-fields-container" *ngIf="config.fields && config.fields.length > 0">
        <div *ngFor="let field of config.fields" class="field-wrapper">
          
          <label [for]="field.id" class="field-label">{{ field.label }}<span *ngIf="field.required" class="required-mark">*</span></label>
          
          <!-- Text / Number -->
          <input *ngIf="['text', 'number'].includes(field.type)" 
            pInputText 
            [type]="field.type" 
            [id]="field.id"
            [placeholder]="field.placeholder || ''" 
            [(ngModel)]="fieldValues[field.id]"
            [name]="field.id" 
            [required]="field.required || false" 
            [disabled]="field.disabled || false"
            class="w-full" />
            
          <!-- Date -->
          <p-datepicker *ngIf="field.type === 'date'"
            [id]="field.id"
            [placeholder]="field.placeholder || ''"
            [(ngModel)]="fieldValues[field.id]"
            [name]="field.id"
            [required]="field.required || false"
            [disabled]="field.disabled || false"
            styleClass="w-full"
            dateFormat="yy-mm-dd"></p-datepicker>

          <!-- Textarea -->
          <textarea *ngIf="field.type === 'textarea'"
            pTextarea 
            [id]="field.id"
            [placeholder]="field.placeholder || ''" 
            [(ngModel)]="fieldValues[field.id]"
            [name]="field.id" 
            [required]="field.required || false"
            [disabled]="field.disabled || false"
            class="w-full"
            rows="3"></textarea>

          <!-- Select -->
          <p-select *ngIf="field.type === 'select'"
            [options]="field.options || []"
            [id]="field.id"
            [(ngModel)]="fieldValues[field.id]" 
            [name]="field.id"
            [required]="field.required || false" 
            [disabled]="field.disabled || false"
            optionLabel="label"
            optionValue="value"
            styleClass="w-full"
            [placeholder]="field.placeholder || 'Select'"
          ></p-select>

          <!-- MultiSelect -->
          <p-multiSelect *ngIf="field.type === 'multiselect'"
            [options]="field.options || []"
            [id]="field.id"
            [(ngModel)]="fieldValues[field.id]" 
            [name]="field.id"
            [required]="field.required || false" 
            [disabled]="field.disabled || false"
            optionLabel="label"
            optionValue="value"
            styleClass="w-full"
            display="chip"
            [placeholder]="field.placeholder || 'Select multiple'"
          ></p-multiSelect>

          <!-- Autocomplete -->
          <p-autoComplete *ngIf="field.type === 'autocomplete'"
            [ngModel]="getAutocompleteValue(field)"
            (ngModelChange)="onAutocompleteChange($event, field.id)"
            [suggestions]="filteredOptionsMap[field.id] || []"
            (completeMethod)="filterAutocomplete($event, field)"
            (onClear)="onAutocompleteClear(field.id)"
            [disabled]="field.disabled || false"
            [inputId]="field.id"
            [name]="field.id"
            optionLabel="label"
            [required]="field.required || false"
            [placeholder]="field.placeholder || ''"
            styleClass="w-full"
            [dropdown]="true"
          ></p-autoComplete>


          <!-- Radio -->
          <div *ngIf="field.type === 'radio'" class="radio-group-container">
            <div *ngFor="let opt of field.options" class="radio-item">
              <p-radiobutton 
                [name]="field.id" 
                [value]="opt.value" 
                [(ngModel)]="fieldValues[field.id]" 
                [inputId]="field.id + '_' + opt.value"
                [disabled]="field.disabled || false"></p-radiobutton>
              <label [for]="field.id + '_' + opt.value" class="ml-2">{{ opt.label }}</label>
            </div>
          </div>

          <!-- Checkbox -->
          <div *ngIf="field.type === 'checkbox'" class="checkbox-container flex align-items-center">
            <p-checkbox 
              [(ngModel)]="fieldValues[field.id]" 
              [binary]="true"
              [name]="field.id"
              [inputId]="field.id"
              [disabled]="field.disabled || false"></p-checkbox>
            <label [for]="field.id" class="ml-2">{{ field.placeholder || 'Yes' }}</label>
          </div>

        </div>
      </div>

      <ng-template pTemplate="footer">
        <div class="br-prime-modal-actions" *ngIf="config.actions && config.actions.length > 0">
          <p-button *ngFor="let action of config.actions" 
            [label]="action.label" 
            [severity]="getSeverity(action.type)"
            [disabled]="action.disabled || false" 
            (onClick)="onActionClick(action.id, action.label)">
          </p-button>
        </div>
      </ng-template>
    </p-dialog>
  `, isInline: true, styles: [".br-prime-modal-subtitle{color:var(--text-color-secondary, #6c757d);margin-bottom:1rem}.br-prime-modal-content-html{margin-bottom:1.5rem}.br-prime-modal-fields-container{display:flex;flex-direction:column;gap:1.5rem;margin-bottom:1rem}.field-wrapper{display:flex;flex-direction:column;gap:.5rem}.field-label{font-weight:500}.required-mark{color:#e53e3e;margin-left:.25rem}.w-full{width:100%}::ng-deep .p-datepicker{width:100%}.radio-group-container{display:flex;gap:1rem;flex-wrap:wrap}.radio-item{display:flex;align-items:center}.ml-2{margin-left:.5rem}.br-prime-modal-actions{display:flex;justify-content:flex-end;gap:.5rem}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "ngmodule", type: FormsModule }, { kind: "directive", type: i2.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i2.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }, { kind: "directive", type: i2.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { kind: "ngmodule", type: DialogModule }, { kind: "component", type: i3$4.Dialog, selector: "p-dialog", inputs: ["hostName", "header", "draggable", "resizable", "contentStyle", "contentStyleClass", "modal", "closeOnEscape", "dismissableMask", "rtl", "closable", "breakpoints", "styleClass", "maskStyleClass", "maskStyle", "showHeader", "blockScroll", "autoZIndex", "baseZIndex", "minX", "minY", "focusOnShow", "maximizable", "keepInViewport", "focusTrap", "transitionOptions", "maskMotionOptions", "motionOptions", "closeIcon", "closeAriaLabel", "closeTabindex", "minimizeIcon", "maximizeIcon", "closeButtonProps", "maximizeButtonProps", "visible", "style", "position", "role", "appendTo", "content", "contentTemplate", "footerTemplate", "closeIconTemplate", "maximizeIconTemplate", "minimizeIconTemplate", "headlessTemplate"], outputs: ["onShow", "onHide", "visibleChange", "onResizeInit", "onResizeEnd", "onDragEnd", "onMaximize"] }, { kind: "directive", type: i3.PrimeTemplate, selector: "[pTemplate]", inputs: ["type", "pTemplate"] }, { kind: "ngmodule", type: ButtonModule }, { kind: "component", type: i5$2.Button, selector: "p-button", inputs: ["hostName", "type", "badge", "disabled", "raised", "rounded", "text", "plain", "outlined", "link", "tabindex", "size", "variant", "style", "styleClass", "badgeClass", "badgeSeverity", "ariaLabel", "autofocus", "iconPos", "icon", "label", "loading", "loadingIcon", "severity", "buttonProps", "fluid"], outputs: ["onClick", "onFocus", "onBlur"] }, { kind: "ngmodule", type: InputTextModule }, { kind: "directive", type: i6.InputText, selector: "[pInputText]", inputs: ["hostName", "ptInputText", "pInputTextPT", "pInputTextUnstyled", "pSize", "variant", "fluid", "invalid"] }, { kind: "ngmodule", type: TextareaModule }, { kind: "directive", type: i7$1.Textarea, selector: "[pTextarea], [pInputTextarea]", inputs: ["pTextareaPT", "pTextareaUnstyled", "autoResize", "pSize", "variant", "fluid", "invalid"], outputs: ["onResize"] }, { kind: "ngmodule", type: SelectModule }, { kind: "component", type: i8.Select, selector: "p-select", inputs: ["id", "scrollHeight", "filter", "panelStyle", "styleClass", "panelStyleClass", "readonly", "editable", "tabindex", "placeholder", "loadingIcon", "filterPlaceholder", "filterLocale", "inputId", "dataKey", "filterBy", "filterFields", "autofocus", "resetFilterOnHide", "checkmark", "dropdownIcon", "loading", "optionLabel", "optionValue", "optionDisabled", "optionGroupLabel", "optionGroupChildren", "group", "showClear", "emptyFilterMessage", "emptyMessage", "lazy", "virtualScroll", "virtualScrollItemSize", "virtualScrollOptions", "overlayOptions", "ariaFilterLabel", "ariaLabel", "ariaLabelledBy", "filterMatchMode", "tooltip", "tooltipPosition", "tooltipPositionStyle", "tooltipStyleClass", "focusOnHover", "selectOnFocus", "autoOptionFocus", "autofocusFilter", "filterValue", "options", "appendTo", "motionOptions"], outputs: ["onChange", "onFilter", "onFocus", "onBlur", "onClick", "onShow", "onHide", "onClear", "onLazyLoad"] }, { kind: "ngmodule", type: RadioButtonModule }, { kind: "component", type: i9.RadioButton, selector: "p-radioButton, p-radiobutton, p-radio-button", inputs: ["value", "tabindex", "inputId", "ariaLabelledBy", "ariaLabel", "styleClass", "autofocus", "binary", "variant", "size"], outputs: ["onClick", "onFocus", "onBlur"] }, { kind: "ngmodule", type: CheckboxModule }, { kind: "component", type: i10.Checkbox, selector: "p-checkbox, p-checkBox, p-check-box", inputs: ["hostName", "value", "binary", "ariaLabelledBy", "ariaLabel", "tabindex", "inputId", "inputStyle", "styleClass", "inputClass", "indeterminate", "formControl", "checkboxIcon", "readonly", "autofocus", "trueValue", "falseValue", "variant", "size"], outputs: ["onChange", "onFocus", "onBlur"] }, { kind: "ngmodule", type: DatePickerModule }, { kind: "component", type: i11.DatePicker, selector: "p-datePicker, p-datepicker, p-date-picker", inputs: ["iconDisplay", "styleClass", "inputStyle", "inputId", "inputStyleClass", "placeholder", "ariaLabelledBy", "ariaLabel", "iconAriaLabel", "dateFormat", "multipleSeparator", "rangeSeparator", "inline", "showOtherMonths", "selectOtherMonths", "showIcon", "icon", "readonlyInput", "shortYearCutoff", "hourFormat", "timeOnly", "stepHour", "stepMinute", "stepSecond", "showSeconds", "showOnFocus", "showWeek", "startWeekFromFirstDayOfYear", "showClear", "dataType", "selectionMode", "maxDateCount", "showButtonBar", "todayButtonStyleClass", "clearButtonStyleClass", "autofocus", "autoZIndex", "baseZIndex", "panelStyleClass", "panelStyle", "keepInvalid", "hideOnDateTimeSelect", "touchUI", "timeSeparator", "focusTrap", "showTransitionOptions", "hideTransitionOptions", "tabindex", "minDate", "maxDate", "disabledDates", "disabledDays", "showTime", "responsiveOptions", "numberOfMonths", "firstDayOfWeek", "view", "defaultDate", "appendTo", "motionOptions"], outputs: ["onFocus", "onBlur", "onClose", "onSelect", "onClear", "onInput", "onTodayClick", "onClearClick", "onMonthChange", "onYearChange", "onClickOutside", "onShow"] }, { kind: "ngmodule", type: MultiSelectModule }, { kind: "component", type: i12.MultiSelect, selector: "p-multiSelect, p-multiselect, p-multi-select", inputs: ["id", "ariaLabel", "styleClass", "panelStyle", "panelStyleClass", "inputId", "readonly", "group", "filter", "filterPlaceHolder", "filterLocale", "overlayVisible", "tabindex", "dataKey", "ariaLabelledBy", "displaySelectedLabel", "maxSelectedLabels", "selectionLimit", "selectedItemsLabel", "showToggleAll", "emptyFilterMessage", "emptyMessage", "resetFilterOnHide", "dropdownIcon", "chipIcon", "optionLabel", "optionValue", "optionDisabled", "optionGroupLabel", "optionGroupChildren", "showHeader", "filterBy", "scrollHeight", "lazy", "virtualScroll", "loading", "virtualScrollItemSize", "loadingIcon", "virtualScrollOptions", "overlayOptions", "ariaFilterLabel", "filterMatchMode", "tooltip", "tooltipPosition", "tooltipPositionStyle", "tooltipStyleClass", "autofocusFilter", "display", "autocomplete", "showClear", "autofocus", "placeholder", "options", "filterValue", "selectAll", "focusOnHover", "filterFields", "selectOnFocus", "autoOptionFocus", "highlightOnSelect", "size", "variant", "fluid", "appendTo", "motionOptions"], outputs: ["onChange", "onFilter", "onFocus", "onBlur", "onClick", "onClear", "onPanelShow", "onPanelHide", "onLazyLoad", "onRemove", "onSelectAllChange"] }, { kind: "ngmodule", type: AutoCompleteModule }, { kind: "component", type: i13.AutoComplete, selector: "p-autoComplete, p-autocomplete, p-auto-complete", inputs: ["minLength", "minQueryLength", "delay", "panelStyle", "styleClass", "panelStyleClass", "inputStyle", "inputId", "inputStyleClass", "placeholder", "readonly", "scrollHeight", "lazy", "virtualScroll", "virtualScrollItemSize", "virtualScrollOptions", "autoHighlight", "forceSelection", "type", "autoZIndex", "baseZIndex", "ariaLabel", "dropdownAriaLabel", "ariaLabelledBy", "dropdownIcon", "unique", "group", "completeOnFocus", "showClear", "dropdown", "showEmptyMessage", "dropdownMode", "multiple", "addOnTab", "tabindex", "dataKey", "emptyMessage", "showTransitionOptions", "hideTransitionOptions", "autofocus", "autocomplete", "optionGroupChildren", "optionGroupLabel", "overlayOptions", "suggestions", "optionLabel", "optionValue", "id", "searchMessage", "emptySelectionMessage", "selectionMessage", "autoOptionFocus", "selectOnFocus", "searchLocale", "optionDisabled", "focusOnHover", "typeahead", "addOnBlur", "separator", "appendTo", "motionOptions"], outputs: ["completeMethod", "onSelect", "onUnselect", "onAdd", "onFocus", "onBlur", "onDropdownClick", "onClear", "onInputKeydown", "onKeyUp", "onShow", "onHide", "onLazyLoad"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.19", ngImport: i0, type: PrimeModalComponent, decorators: [{
            type: Component,
            args: [{ selector: 'br-prime-modal', standalone: true, imports: [
                        CommonModule,
                        FormsModule,
                        DialogModule,
                        ButtonModule,
                        InputTextModule,
                        TextareaModule,
                        SelectModule,
                        RadioButtonModule,
                        CheckboxModule,
                        DatePickerModule,
                        MultiSelectModule,
                        AutoCompleteModule
                    ], template: `
    <p-dialog 
      [(visible)]="config.isOpen" 
      [modal]="true" 
      [closable]="config.uiConfig.showCloseButton" 
      [dismissableMask]="config.uiConfig.isDismissible"
      (onHide)="onCloseClick()"
      [header]="config.title"
      [style]="{ width: getSizeStyle() }"
      [styleClass]="config.uiConfig.className">
      
      <p *ngIf="config.subtitle" class="br-prime-modal-subtitle">{{ config.subtitle }}</p>
      <div [innerHTML]="config.content" *ngIf="config.content" class="br-prime-modal-content-html"></div>

      <div class="br-prime-modal-fields-container" *ngIf="config.fields && config.fields.length > 0">
        <div *ngFor="let field of config.fields" class="field-wrapper">
          
          <label [for]="field.id" class="field-label">{{ field.label }}<span *ngIf="field.required" class="required-mark">*</span></label>
          
          <!-- Text / Number -->
          <input *ngIf="['text', 'number'].includes(field.type)" 
            pInputText 
            [type]="field.type" 
            [id]="field.id"
            [placeholder]="field.placeholder || ''" 
            [(ngModel)]="fieldValues[field.id]"
            [name]="field.id" 
            [required]="field.required || false" 
            [disabled]="field.disabled || false"
            class="w-full" />
            
          <!-- Date -->
          <p-datepicker *ngIf="field.type === 'date'"
            [id]="field.id"
            [placeholder]="field.placeholder || ''"
            [(ngModel)]="fieldValues[field.id]"
            [name]="field.id"
            [required]="field.required || false"
            [disabled]="field.disabled || false"
            styleClass="w-full"
            dateFormat="yy-mm-dd"></p-datepicker>

          <!-- Textarea -->
          <textarea *ngIf="field.type === 'textarea'"
            pTextarea 
            [id]="field.id"
            [placeholder]="field.placeholder || ''" 
            [(ngModel)]="fieldValues[field.id]"
            [name]="field.id" 
            [required]="field.required || false"
            [disabled]="field.disabled || false"
            class="w-full"
            rows="3"></textarea>

          <!-- Select -->
          <p-select *ngIf="field.type === 'select'"
            [options]="field.options || []"
            [id]="field.id"
            [(ngModel)]="fieldValues[field.id]" 
            [name]="field.id"
            [required]="field.required || false" 
            [disabled]="field.disabled || false"
            optionLabel="label"
            optionValue="value"
            styleClass="w-full"
            [placeholder]="field.placeholder || 'Select'"
          ></p-select>

          <!-- MultiSelect -->
          <p-multiSelect *ngIf="field.type === 'multiselect'"
            [options]="field.options || []"
            [id]="field.id"
            [(ngModel)]="fieldValues[field.id]" 
            [name]="field.id"
            [required]="field.required || false" 
            [disabled]="field.disabled || false"
            optionLabel="label"
            optionValue="value"
            styleClass="w-full"
            display="chip"
            [placeholder]="field.placeholder || 'Select multiple'"
          ></p-multiSelect>

          <!-- Autocomplete -->
          <p-autoComplete *ngIf="field.type === 'autocomplete'"
            [ngModel]="getAutocompleteValue(field)"
            (ngModelChange)="onAutocompleteChange($event, field.id)"
            [suggestions]="filteredOptionsMap[field.id] || []"
            (completeMethod)="filterAutocomplete($event, field)"
            (onClear)="onAutocompleteClear(field.id)"
            [disabled]="field.disabled || false"
            [inputId]="field.id"
            [name]="field.id"
            optionLabel="label"
            [required]="field.required || false"
            [placeholder]="field.placeholder || ''"
            styleClass="w-full"
            [dropdown]="true"
          ></p-autoComplete>


          <!-- Radio -->
          <div *ngIf="field.type === 'radio'" class="radio-group-container">
            <div *ngFor="let opt of field.options" class="radio-item">
              <p-radiobutton 
                [name]="field.id" 
                [value]="opt.value" 
                [(ngModel)]="fieldValues[field.id]" 
                [inputId]="field.id + '_' + opt.value"
                [disabled]="field.disabled || false"></p-radiobutton>
              <label [for]="field.id + '_' + opt.value" class="ml-2">{{ opt.label }}</label>
            </div>
          </div>

          <!-- Checkbox -->
          <div *ngIf="field.type === 'checkbox'" class="checkbox-container flex align-items-center">
            <p-checkbox 
              [(ngModel)]="fieldValues[field.id]" 
              [binary]="true"
              [name]="field.id"
              [inputId]="field.id"
              [disabled]="field.disabled || false"></p-checkbox>
            <label [for]="field.id" class="ml-2">{{ field.placeholder || 'Yes' }}</label>
          </div>

        </div>
      </div>

      <ng-template pTemplate="footer">
        <div class="br-prime-modal-actions" *ngIf="config.actions && config.actions.length > 0">
          <p-button *ngFor="let action of config.actions" 
            [label]="action.label" 
            [severity]="getSeverity(action.type)"
            [disabled]="action.disabled || false" 
            (onClick)="onActionClick(action.id, action.label)">
          </p-button>
        </div>
      </ng-template>
    </p-dialog>
  `, styles: [".br-prime-modal-subtitle{color:var(--text-color-secondary, #6c757d);margin-bottom:1rem}.br-prime-modal-content-html{margin-bottom:1.5rem}.br-prime-modal-fields-container{display:flex;flex-direction:column;gap:1.5rem;margin-bottom:1rem}.field-wrapper{display:flex;flex-direction:column;gap:.5rem}.field-label{font-weight:500}.required-mark{color:#e53e3e;margin-left:.25rem}.w-full{width:100%}::ng-deep .p-datepicker{width:100%}.radio-group-container{display:flex;gap:1rem;flex-wrap:wrap}.radio-item{display:flex;align-items:center}.ml-2{margin-left:.5rem}.br-prime-modal-actions{display:flex;justify-content:flex-end;gap:.5rem}\n"] }]
        }], propDecorators: { config: [{
                type: Input
            }], action: [{
                type: Output
            }], close: [{
                type: Output
            }] } });

/**
 * ============================================================
 * BR-MODAL — THE FAÇADE WRAPPER COMPONENT
 * ============================================================
 *
 * This is the ONLY modal component that consuming screens use.
 * Internally it:
 *   1. Reads UI_MODE from the config
 *   2. Uses the ModalAdapter to transform the generic config
 *   3. Renders the correct implementation component
 *
 * Consumer screens NEVER import CustomModal or MaterialModal
 * directly — they only use <br-modal [config]="modalConfig">.
 * ============================================================
 */
class BrModalComponent {
    runtimeUiConfig;
    /**
     * The ONLY input — a library-agnostic JSON config.
     */
    config;
    /**
     * Emits when an action button is clicked.
     */
    action = new EventEmitter();
    /**
     * Emits when the modal is closed (via backdrop or close button).
     */
    close = new EventEmitter();
    /** Resolved at runtime from config service */
    uiMode = 'CUSTOM';
    /** Adapted configs for each implementation */
    customConfig;
    materialConfig;
    primeConfig;
    destroy$ = new Subject();
    constructor(runtimeUiConfig) {
        this.runtimeUiConfig = runtimeUiConfig;
    }
    ngOnInit() {
        this.uiMode = this.runtimeUiConfig.getModesSnapshot().modal;
        this.runtimeUiConfig.modes$
            .pipe(takeUntil(this.destroy$))
            .subscribe((modes) => {
            this.uiMode = modes.modal;
            this.adaptConfig();
        });
    }
    ngOnChanges(changes) {
        if (changes['config'] && this.config) {
            this.adaptConfig();
        }
    }
    onModalAction(event) {
        this.action.emit(event);
    }
    onModalClose() {
        this.close.emit();
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
    adaptConfig() {
        if (!this.config)
            return;
        if (this.uiMode === 'CUSTOM') {
            this.customConfig = ModalAdapter.toCustom(this.config);
        }
        else if (this.uiMode === 'MATERIAL') {
            this.materialConfig = ModalAdapter.toMaterial(this.config);
        }
        else if (this.uiMode === 'PRIMENG') {
            this.primeConfig = ModalAdapter.toPrime(this.config);
        }
        else {
            // Fallback
            this.materialConfig = ModalAdapter.toMaterial(this.config);
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.19", ngImport: i0, type: BrModalComponent, deps: [{ token: RuntimeUiConfigService }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.19", type: BrModalComponent, isStandalone: true, selector: "br-modal", inputs: { config: "config" }, outputs: { action: "action", close: "close" }, usesOnChanges: true, ngImport: i0, template: "<!-- CUSTOM implementation -->\r\n<br-custom-modal *ngIf=\"uiMode === 'CUSTOM'\" [config]=\"customConfig\" (action)=\"onModalAction($event)\"\r\n    (close)=\"onModalClose()\">\r\n</br-custom-modal>\r\n\r\n<!-- MATERIAL implementation -->\r\n<br-material-modal *ngIf=\"uiMode === 'MATERIAL'\" [config]=\"materialConfig\" (action)=\"onModalAction($event)\"\r\n    (close)=\"onModalClose()\">\r\n</br-material-modal>\r\n\r\n<br-prime-modal *ngIf=\"uiMode === 'PRIMENG' && primeConfig as cfg\" [config]=\"cfg\" (action)=\"onModalAction($event)\"\r\n    (close)=\"onModalClose()\">\r\n</br-prime-modal>", styles: [":host{display:block}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: CustomModalComponent, selector: "br-custom-modal", inputs: ["config"], outputs: ["action", "close"] }, { kind: "component", type: MaterialModalComponent, selector: "br-material-modal", inputs: ["config"], outputs: ["action", "close"] }, { kind: "component", type: PrimeModalComponent, selector: "br-prime-modal", inputs: ["config"], outputs: ["action", "close"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.19", ngImport: i0, type: BrModalComponent, decorators: [{
            type: Component,
            args: [{ selector: 'br-modal', standalone: true, imports: [CommonModule, CustomModalComponent, MaterialModalComponent, PrimeModalComponent], template: "<!-- CUSTOM implementation -->\r\n<br-custom-modal *ngIf=\"uiMode === 'CUSTOM'\" [config]=\"customConfig\" (action)=\"onModalAction($event)\"\r\n    (close)=\"onModalClose()\">\r\n</br-custom-modal>\r\n\r\n<!-- MATERIAL implementation -->\r\n<br-material-modal *ngIf=\"uiMode === 'MATERIAL'\" [config]=\"materialConfig\" (action)=\"onModalAction($event)\"\r\n    (close)=\"onModalClose()\">\r\n</br-material-modal>\r\n\r\n<br-prime-modal *ngIf=\"uiMode === 'PRIMENG' && primeConfig as cfg\" [config]=\"cfg\" (action)=\"onModalAction($event)\"\r\n    (close)=\"onModalClose()\">\r\n</br-prime-modal>", styles: [":host{display:block}\n"] }]
        }], ctorParameters: () => [{ type: RuntimeUiConfigService }], propDecorators: { config: [{
                type: Input
            }], action: [{
                type: Output
            }], close: [{
                type: Output
            }] } });

class TextAdapter {
    static toCustom(config) {
        return {
            id: config.id || config.controlId,
            name: config.name,
            className: config.className,
            label: config.label || '',
            value: config.value || '',
            placeholder: config.placeholder || '',
            disabled: config.disabled ?? false,
            required: config.required ?? false,
        };
    }
    static toMaterial(config) {
        return {
            id: config.id || config.controlId,
            name: config.name,
            className: config.className,
            label: config.label || '',
            value: config.value || '',
            placeholder: config.placeholder || '',
            disabled: config.disabled ?? false,
            required: config.required ?? false,
        };
    }
    static toPrime(config) {
        return {
            id: config.id || config.controlId,
            name: config.name,
            className: config.className,
            label: config.label || '',
            value: config.value || '',
            placeholder: config.placeholder || '',
            disabled: config.disabled ?? false,
            required: config.required ?? false,
        };
    }
}

class BaseValueAccessor {
    onChangeCallback = () => { };
    onTouchedCallback = () => { };
    currentValue;
    currentDisabled = false;
    writeValue(value) {
        this.currentValue = this.normalizeValue(value);
        this.afterWriteValue(this.currentValue);
    }
    registerOnChange(fn) {
        this.onChangeCallback = fn;
    }
    registerOnTouched(fn) {
        this.onTouchedCallback = fn;
    }
    setDisabledState(isDisabled) {
        this.currentDisabled = !!isDisabled;
        this.afterDisabledStateChange(this.currentDisabled);
    }
    emitValueChange(value) {
        this.currentValue = this.normalizeValue(value);
        this.onChangeCallback(this.currentValue);
    }
    markTouched() {
        this.onTouchedCallback();
    }
    afterWriteValue(_) {
        // optional override
    }
    afterDisabledStateChange(_) {
        // optional override
    }
}

class CustomTextControlComponent {
    config;
    showLibraryTag = false;
    valueChange = new EventEmitter();
    blurEvent = new EventEmitter();
    focusEvent = new EventEmitter();
    inputEvent = new EventEmitter();
    changeEvent = new EventEmitter();
    keydownEvent = new EventEmitter();
    keyupEvent = new EventEmitter();
    clickEvent = new EventEmitter();
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.19", ngImport: i0, type: CustomTextControlComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.19", type: CustomTextControlComponent, isStandalone: true, selector: "br-custom-text-control", inputs: { config: "config", showLibraryTag: "showLibraryTag" }, outputs: { valueChange: "valueChange", blurEvent: "blurEvent", focusEvent: "focusEvent", inputEvent: "inputEvent", changeEvent: "changeEvent", keydownEvent: "keydownEvent", keyupEvent: "keyupEvent", clickEvent: "clickEvent" }, ngImport: i0, template: "<div class=\"br-control br-text-control\">\r\n  <label class=\"br-label\">\r\n    {{ config.label }}\r\n    <span *ngIf=\"showLibraryTag\" class=\"br-lib-tag\" aria-label=\"Library package control\">LIB</span>\r\n  </label>\r\n  <input class=\"br-input\" [ngClass]=\"config.className\" [attr.id]=\"config.id\" [attr.name]=\"config.name\" type=\"text\"\r\n    [placeholder]=\"config.placeholder\" [disabled]=\"config.disabled\" [required]=\"config.required\" [ngModel]=\"config.value\"\r\n    (ngModelChange)=\"valueChange.emit($event)\" (blur)=\"blurEvent.emit($event)\" (focus)=\"focusEvent.emit($event)\"\r\n    (input)=\"inputEvent.emit($event)\" (change)=\"changeEvent.emit($event)\" (keydown)=\"keydownEvent.emit($event)\"\r\n    (keyup)=\"keyupEvent.emit($event)\" (click)=\"clickEvent.emit($event)\" />\r\n</div>\r\n", styles: [".br-control{display:flex;flex-direction:column;gap:8px;font-family:var(--br-font-family, Tahoma, Arial, sans-serif)}.br-label{display:inline-flex;align-items:center;gap:8px;font-size:var(--br-base-font-size, 14px);font-weight:700;color:var(--br-label-font-color, #1f2a3d)}.br-lib-tag{display:inline-flex;align-items:center;gap:5px;padding:2px 8px;border-radius:999px;background:linear-gradient(135deg,#e8f0fe,#d2e3fc);color:#174ea6;font-size:10px;font-weight:800;letter-spacing:.4px}.br-lib-tag:before{content:\"\";width:6px;height:6px;border-radius:50%;background:#174ea6}.br-input{height:40px;border-radius:10px;border:1px solid var(--br-input-border-color, #c8d5e6);padding:0 12px;font-size:var(--br-base-font-size, 14px);font-family:inherit;color:var(--br-input-text-color, #1f2a3d);background:var(--br-input-background-color, #fff);transition:border-color .12s ease,box-shadow .12s ease}.br-input::placeholder{color:var(--br-input-placeholder-color, #94a3b8)}.br-input:focus{outline:none;border-color:var(--br-focus-color, #2563eb);box-shadow:0 0 0 3px var(--br-focus-ring-color, color-mix(in srgb, #2563eb 18%, transparent))}.br-input:disabled{background:var(--br-input-disabled-background-color, #f1f5f9);color:var(--br-input-disabled-text-color, #94a3b8)}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "ngmodule", type: FormsModule }, { kind: "directive", type: i2.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i2.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }, { kind: "directive", type: i2.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.19", ngImport: i0, type: CustomTextControlComponent, decorators: [{
            type: Component,
            args: [{ selector: 'br-custom-text-control', standalone: true, imports: [CommonModule, FormsModule], template: "<div class=\"br-control br-text-control\">\r\n  <label class=\"br-label\">\r\n    {{ config.label }}\r\n    <span *ngIf=\"showLibraryTag\" class=\"br-lib-tag\" aria-label=\"Library package control\">LIB</span>\r\n  </label>\r\n  <input class=\"br-input\" [ngClass]=\"config.className\" [attr.id]=\"config.id\" [attr.name]=\"config.name\" type=\"text\"\r\n    [placeholder]=\"config.placeholder\" [disabled]=\"config.disabled\" [required]=\"config.required\" [ngModel]=\"config.value\"\r\n    (ngModelChange)=\"valueChange.emit($event)\" (blur)=\"blurEvent.emit($event)\" (focus)=\"focusEvent.emit($event)\"\r\n    (input)=\"inputEvent.emit($event)\" (change)=\"changeEvent.emit($event)\" (keydown)=\"keydownEvent.emit($event)\"\r\n    (keyup)=\"keyupEvent.emit($event)\" (click)=\"clickEvent.emit($event)\" />\r\n</div>\r\n", styles: [".br-control{display:flex;flex-direction:column;gap:8px;font-family:var(--br-font-family, Tahoma, Arial, sans-serif)}.br-label{display:inline-flex;align-items:center;gap:8px;font-size:var(--br-base-font-size, 14px);font-weight:700;color:var(--br-label-font-color, #1f2a3d)}.br-lib-tag{display:inline-flex;align-items:center;gap:5px;padding:2px 8px;border-radius:999px;background:linear-gradient(135deg,#e8f0fe,#d2e3fc);color:#174ea6;font-size:10px;font-weight:800;letter-spacing:.4px}.br-lib-tag:before{content:\"\";width:6px;height:6px;border-radius:50%;background:#174ea6}.br-input{height:40px;border-radius:10px;border:1px solid var(--br-input-border-color, #c8d5e6);padding:0 12px;font-size:var(--br-base-font-size, 14px);font-family:inherit;color:var(--br-input-text-color, #1f2a3d);background:var(--br-input-background-color, #fff);transition:border-color .12s ease,box-shadow .12s ease}.br-input::placeholder{color:var(--br-input-placeholder-color, #94a3b8)}.br-input:focus{outline:none;border-color:var(--br-focus-color, #2563eb);box-shadow:0 0 0 3px var(--br-focus-ring-color, color-mix(in srgb, #2563eb 18%, transparent))}.br-input:disabled{background:var(--br-input-disabled-background-color, #f1f5f9);color:var(--br-input-disabled-text-color, #94a3b8)}\n"] }]
        }], propDecorators: { config: [{
                type: Input
            }], showLibraryTag: [{
                type: Input
            }], valueChange: [{
                type: Output
            }], blurEvent: [{
                type: Output
            }], focusEvent: [{
                type: Output
            }], inputEvent: [{
                type: Output
            }], changeEvent: [{
                type: Output
            }], keydownEvent: [{
                type: Output
            }], keyupEvent: [{
                type: Output
            }], clickEvent: [{
                type: Output
            }] } });

class MaterialTextControlComponent {
    config;
    showLibraryTag = false;
    valueChange = new EventEmitter();
    blurEvent = new EventEmitter();
    focusEvent = new EventEmitter();
    inputEvent = new EventEmitter();
    changeEvent = new EventEmitter();
    keydownEvent = new EventEmitter();
    keyupEvent = new EventEmitter();
    clickEvent = new EventEmitter();
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.19", ngImport: i0, type: MaterialTextControlComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.19", type: MaterialTextControlComponent, isStandalone: true, selector: "br-material-text-control", inputs: { config: "config", showLibraryTag: "showLibraryTag" }, outputs: { valueChange: "valueChange", blurEvent: "blurEvent", focusEvent: "focusEvent", inputEvent: "inputEvent", changeEvent: "changeEvent", keydownEvent: "keydownEvent", keyupEvent: "keyupEvent", clickEvent: "clickEvent" }, ngImport: i0, template: "<mat-form-field appearance=\"outline\" class=\"br-material-field\">\r\n  <mat-label class=\"br-material-label\">\r\n    {{ config.label }}\r\n    <span *ngIf=\"showLibraryTag\" class=\"br-lib-tag\" aria-label=\"Library package control\">LIB</span>\r\n  </mat-label>\r\n  <input matInput [ngClass]=\"config.className\" [attr.id]=\"config.id\" [attr.name]=\"config.name\"\r\n    [placeholder]=\"config.placeholder\" [disabled]=\"config.disabled\" [required]=\"config.required\" [ngModel]=\"config.value\"\r\n    (ngModelChange)=\"valueChange.emit($event)\" (blur)=\"blurEvent.emit($event)\" (focus)=\"focusEvent.emit($event)\"\r\n    (input)=\"inputEvent.emit($event)\" (change)=\"changeEvent.emit($event)\" (keydown)=\"keydownEvent.emit($event)\"\r\n    (keyup)=\"keyupEvent.emit($event)\" (click)=\"clickEvent.emit($event)\" />\r\n</mat-form-field>\r\n", styles: [".br-material-field{width:100%;font-family:var(--br-font-family, Tahoma, Arial, sans-serif)}.br-material-label{display:inline-flex;align-items:center;gap:8px;color:var(--br-label-font-color, #1f2a3d)}.br-lib-tag{display:inline-flex;align-items:center;gap:5px;padding:2px 8px;border-radius:999px;background:linear-gradient(135deg,#e8f0fe,#d2e3fc);color:#174ea6;font-size:10px;font-weight:800;letter-spacing:.4px}.br-lib-tag:before{content:\"\";width:6px;height:6px;border-radius:50%;background:#174ea6}:host ::ng-deep .br-material-field .mat-mdc-form-field-subscript-wrapper{display:none}:host ::ng-deep .br-material-field .mdc-text-field--outlined{background:var(--br-input-background-color, #ffffff)}:host ::ng-deep .br-material-field .mdc-text-field--outlined .mdc-notched-outline__leading,:host ::ng-deep .br-material-field .mdc-text-field--outlined .mdc-notched-outline__notch,:host ::ng-deep .br-material-field .mdc-text-field--outlined .mdc-notched-outline__trailing{border-color:var(--br-input-border-color, #c8d5e6)}:host ::ng-deep .br-material-field.mat-focused .mdc-text-field--outlined .mdc-notched-outline__leading,:host ::ng-deep .br-material-field.mat-focused .mdc-text-field--outlined .mdc-notched-outline__notch,:host ::ng-deep .br-material-field.mat-focused .mdc-text-field--outlined .mdc-notched-outline__trailing{border-color:var(--br-focus-color, #2563eb)}:host ::ng-deep .br-material-field .mdc-text-field__input{color:var(--br-input-text-color, #1f2a3d);caret-color:var(--br-focus-color, #2563eb);font-family:var(--br-font-family, Tahoma, Arial, sans-serif);font-size:var(--br-base-font-size, 14px)}:host ::ng-deep .br-material-field .mdc-text-field__input::placeholder{color:var(--br-input-placeholder-color, #94a3b8)}:host ::ng-deep .br-material-field .mdc-floating-label,:host ::ng-deep .br-material-field .mat-mdc-form-field-label{color:var(--br-label-font-color, #1f2a3d)}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "ngmodule", type: FormsModule }, { kind: "directive", type: i2.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i2.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }, { kind: "directive", type: i2.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { kind: "ngmodule", type: MatFormFieldModule }, { kind: "component", type: i3$2.MatFormField, selector: "mat-form-field", inputs: ["hideRequiredMarker", "color", "floatLabel", "appearance", "subscriptSizing", "hintLabel"], exportAs: ["matFormField"] }, { kind: "directive", type: i3$2.MatLabel, selector: "mat-label" }, { kind: "ngmodule", type: MatInputModule }, { kind: "directive", type: i3$2.MatInput, selector: "input[matInput], textarea[matInput], select[matNativeControl],      input[matNativeControl], textarea[matNativeControl]", inputs: ["disabled", "id", "placeholder", "name", "required", "type", "errorStateMatcher", "aria-describedby", "value", "readonly", "disabledInteractive"], exportAs: ["matInput"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.19", ngImport: i0, type: MaterialTextControlComponent, decorators: [{
            type: Component,
            args: [{ selector: 'br-material-text-control', standalone: true, imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule], template: "<mat-form-field appearance=\"outline\" class=\"br-material-field\">\r\n  <mat-label class=\"br-material-label\">\r\n    {{ config.label }}\r\n    <span *ngIf=\"showLibraryTag\" class=\"br-lib-tag\" aria-label=\"Library package control\">LIB</span>\r\n  </mat-label>\r\n  <input matInput [ngClass]=\"config.className\" [attr.id]=\"config.id\" [attr.name]=\"config.name\"\r\n    [placeholder]=\"config.placeholder\" [disabled]=\"config.disabled\" [required]=\"config.required\" [ngModel]=\"config.value\"\r\n    (ngModelChange)=\"valueChange.emit($event)\" (blur)=\"blurEvent.emit($event)\" (focus)=\"focusEvent.emit($event)\"\r\n    (input)=\"inputEvent.emit($event)\" (change)=\"changeEvent.emit($event)\" (keydown)=\"keydownEvent.emit($event)\"\r\n    (keyup)=\"keyupEvent.emit($event)\" (click)=\"clickEvent.emit($event)\" />\r\n</mat-form-field>\r\n", styles: [".br-material-field{width:100%;font-family:var(--br-font-family, Tahoma, Arial, sans-serif)}.br-material-label{display:inline-flex;align-items:center;gap:8px;color:var(--br-label-font-color, #1f2a3d)}.br-lib-tag{display:inline-flex;align-items:center;gap:5px;padding:2px 8px;border-radius:999px;background:linear-gradient(135deg,#e8f0fe,#d2e3fc);color:#174ea6;font-size:10px;font-weight:800;letter-spacing:.4px}.br-lib-tag:before{content:\"\";width:6px;height:6px;border-radius:50%;background:#174ea6}:host ::ng-deep .br-material-field .mat-mdc-form-field-subscript-wrapper{display:none}:host ::ng-deep .br-material-field .mdc-text-field--outlined{background:var(--br-input-background-color, #ffffff)}:host ::ng-deep .br-material-field .mdc-text-field--outlined .mdc-notched-outline__leading,:host ::ng-deep .br-material-field .mdc-text-field--outlined .mdc-notched-outline__notch,:host ::ng-deep .br-material-field .mdc-text-field--outlined .mdc-notched-outline__trailing{border-color:var(--br-input-border-color, #c8d5e6)}:host ::ng-deep .br-material-field.mat-focused .mdc-text-field--outlined .mdc-notched-outline__leading,:host ::ng-deep .br-material-field.mat-focused .mdc-text-field--outlined .mdc-notched-outline__notch,:host ::ng-deep .br-material-field.mat-focused .mdc-text-field--outlined .mdc-notched-outline__trailing{border-color:var(--br-focus-color, #2563eb)}:host ::ng-deep .br-material-field .mdc-text-field__input{color:var(--br-input-text-color, #1f2a3d);caret-color:var(--br-focus-color, #2563eb);font-family:var(--br-font-family, Tahoma, Arial, sans-serif);font-size:var(--br-base-font-size, 14px)}:host ::ng-deep .br-material-field .mdc-text-field__input::placeholder{color:var(--br-input-placeholder-color, #94a3b8)}:host ::ng-deep .br-material-field .mdc-floating-label,:host ::ng-deep .br-material-field .mat-mdc-form-field-label{color:var(--br-label-font-color, #1f2a3d)}\n"] }]
        }], propDecorators: { config: [{
                type: Input
            }], showLibraryTag: [{
                type: Input
            }], valueChange: [{
                type: Output
            }], blurEvent: [{
                type: Output
            }], focusEvent: [{
                type: Output
            }], inputEvent: [{
                type: Output
            }], changeEvent: [{
                type: Output
            }], keydownEvent: [{
                type: Output
            }], keyupEvent: [{
                type: Output
            }], clickEvent: [{
                type: Output
            }] } });

class PrimeTextControlComponent {
    config;
    showLibraryTag = false;
    valueChange = new EventEmitter();
    blurEvent = new EventEmitter();
    focusEvent = new EventEmitter();
    inputEvent = new EventEmitter();
    changeEvent = new EventEmitter();
    keydownEvent = new EventEmitter();
    keyupEvent = new EventEmitter();
    clickEvent = new EventEmitter();
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.19", ngImport: i0, type: PrimeTextControlComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.19", type: PrimeTextControlComponent, isStandalone: true, selector: "br-prime-text-control", inputs: { config: "config", showLibraryTag: "showLibraryTag" }, outputs: { valueChange: "valueChange", blurEvent: "blurEvent", focusEvent: "focusEvent", inputEvent: "inputEvent", changeEvent: "changeEvent", keydownEvent: "keydownEvent", keyupEvent: "keyupEvent", clickEvent: "clickEvent" }, ngImport: i0, template: `
    <div class="prime-text-control">
      <p-floatLabel>
        <input pInputText 
               [attr.id]="config.id" 
               [attr.name]="config.name" 
               [ngClass]="config.className || ''"
               [placeholder]="config.placeholder || ''" 
               [disabled]="config.disabled"
               [required]="config.required" 
               [ngModel]="config.value"
               (ngModelChange)="valueChange.emit($event)" 
               (blur)="blurEvent.emit($event)"
               (focus)="focusEvent.emit($event)" 
               (input)="inputEvent.emit($event)"
               (change)="changeEvent.emit($event)" 
               (keydown)="keydownEvent.emit($event)"
               (keyup)="keyupEvent.emit($event)" 
               (click)="clickEvent.emit($event)" />
        <label *ngIf="config.id" [attr.for]="config.id">{{ config.label }}</label>
        <label *ngIf="!config.id">{{ config.label }}</label>
        <span *ngIf="showLibraryTag" class="br-lib-tag" 
              style="position: absolute; right: 0.5rem; top: 0.5rem; background: #eee; padding: 2px 4px; font-size: 10px; border-radius: 4px;">LIB</span>
      </p-floatLabel>
    </div>
  `, isInline: true, styles: [".prime-text-control{margin-top:1.5rem;position:relative}input{width:100%}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "ngmodule", type: FormsModule }, { kind: "directive", type: i2.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i2.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }, { kind: "directive", type: i2.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { kind: "ngmodule", type: InputTextModule }, { kind: "directive", type: i6.InputText, selector: "[pInputText]", inputs: ["hostName", "ptInputText", "pInputTextPT", "pInputTextUnstyled", "pSize", "variant", "fluid", "invalid"] }, { kind: "ngmodule", type: FloatLabelModule }, { kind: "component", type: i4$1.FloatLabel, selector: "p-floatlabel, p-floatLabel, p-float-label", inputs: ["variant"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.19", ngImport: i0, type: PrimeTextControlComponent, decorators: [{
            type: Component,
            args: [{ selector: 'br-prime-text-control', standalone: true, imports: [CommonModule, FormsModule, InputTextModule, FloatLabelModule], template: `
    <div class="prime-text-control">
      <p-floatLabel>
        <input pInputText 
               [attr.id]="config.id" 
               [attr.name]="config.name" 
               [ngClass]="config.className || ''"
               [placeholder]="config.placeholder || ''" 
               [disabled]="config.disabled"
               [required]="config.required" 
               [ngModel]="config.value"
               (ngModelChange)="valueChange.emit($event)" 
               (blur)="blurEvent.emit($event)"
               (focus)="focusEvent.emit($event)" 
               (input)="inputEvent.emit($event)"
               (change)="changeEvent.emit($event)" 
               (keydown)="keydownEvent.emit($event)"
               (keyup)="keyupEvent.emit($event)" 
               (click)="clickEvent.emit($event)" />
        <label *ngIf="config.id" [attr.for]="config.id">{{ config.label }}</label>
        <label *ngIf="!config.id">{{ config.label }}</label>
        <span *ngIf="showLibraryTag" class="br-lib-tag" 
              style="position: absolute; right: 0.5rem; top: 0.5rem; background: #eee; padding: 2px 4px; font-size: 10px; border-radius: 4px;">LIB</span>
      </p-floatLabel>
    </div>
  `, styles: [".prime-text-control{margin-top:1.5rem;position:relative}input{width:100%}\n"] }]
        }], propDecorators: { config: [{
                type: Input
            }], showLibraryTag: [{
                type: Input
            }], valueChange: [{
                type: Output
            }], blurEvent: [{
                type: Output
            }], focusEvent: [{
                type: Output
            }], inputEvent: [{
                type: Output
            }], changeEvent: [{
                type: Output
            }], keydownEvent: [{
                type: Output
            }], keyupEvent: [{
                type: Output
            }], clickEvent: [{
                type: Output
            }] } });

class ControlRegistryService {
    byId = new Map();
    byName = new Map();
    byClass = new Map();
    register(handle) {
        this.unregister(handle);
        if (handle.id) {
            this.byId.set(handle.id, handle);
        }
        if (handle.name) {
            this.addToSetMap(this.byName, handle.name, handle);
        }
        (handle.classes || []).forEach((className) => {
            if (className) {
                this.addToSetMap(this.byClass, className, handle);
            }
        });
    }
    unregister(handle) {
        if (handle.id && this.byId.get(handle.id) === handle) {
            this.byId.delete(handle.id);
        }
        if (handle.name) {
            this.removeFromSetMap(this.byName, handle.name, handle);
        }
        (handle.classes || []).forEach((className) => {
            if (className) {
                this.removeFromSetMap(this.byClass, className, handle);
            }
        });
    }
    valueById(id) {
        return this.byId.get(id)?.getValue();
    }
    valuesByName(name) {
        return [...(this.byName.get(name) || [])].map((entry) => entry.getValue());
    }
    valuesByClass(className) {
        return [...(this.byClass.get(className) || [])].map((entry) => entry.getValue());
    }
    addToSetMap(map, key, handle) {
        const set = map.get(key) || new Set();
        set.add(handle);
        map.set(key, set);
    }
    removeFromSetMap(map, key, handle) {
        const set = map.get(key);
        if (!set)
            return;
        set.delete(handle);
        if (set.size === 0) {
            map.delete(key);
        }
        else {
            map.set(key, set);
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.19", ngImport: i0, type: ControlRegistryService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "19.2.19", ngImport: i0, type: ControlRegistryService, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.19", ngImport: i0, type: ControlRegistryService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }] });

class BrTextComponent extends BaseValueAccessor {
    runtimeUiConfig;
    controlRegistry;
    config;
    id;
    controlId;
    name;
    className;
    value;
    disabled;
    required;
    label;
    placeholder;
    meta;
    showLibraryTag = true;
    valueChange = new EventEmitter();
    blur = new EventEmitter();
    focus = new EventEmitter();
    input = new EventEmitter();
    change = new EventEmitter();
    keydown = new EventEmitter();
    keyup = new EventEmitter();
    click = new EventEmitter();
    controlEvent = new EventEmitter();
    mode = 'CUSTOM';
    customConfig;
    materialConfig;
    primeConfig;
    destroy$ = new Subject();
    registryHandle;
    constructor(runtimeUiConfig, controlRegistry) {
        super();
        this.runtimeUiConfig = runtimeUiConfig;
        this.controlRegistry = controlRegistry;
    }
    ngOnInit() {
        this.mode = this.runtimeUiConfig.getModesSnapshot().text;
        this.runtimeUiConfig.modes$.pipe(takeUntil(this.destroy$)).subscribe((m) => {
            this.mode = m.text;
            this.adaptConfig();
        });
        this.refreshRegistryRegistration();
    }
    ngOnChanges(_) {
        this.adaptConfig();
        this.refreshRegistryRegistration();
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
        if (this.registryHandle) {
            this.controlRegistry.unregister(this.registryHandle);
        }
    }
    onImplementationValueChange(value) {
        this.value = value ?? '';
        this.valueChange.emit(this.value);
        this.emitValueChange(this.value);
        this.emitControlEvent('valueChange', this.value);
        this.refreshRegistryRegistration();
    }
    onImplementationBlur(event) {
        this.blur.emit(event);
        this.emitControlEvent('blur', this.value ?? '', event);
        this.markTouched();
    }
    onImplementationFocus(event) {
        this.focus.emit(event);
        this.emitControlEvent('focus', this.value ?? '', event);
    }
    onImplementationInput(event) {
        this.input.emit(event);
        this.emitControlEvent('input', this.value ?? '', event);
    }
    onImplementationChange(event) {
        this.change.emit(event);
        this.emitControlEvent('change', this.value ?? '', event);
    }
    onImplementationKeydown(event) {
        this.keydown.emit(event);
        this.emitControlEvent('keydown', this.value ?? '', event);
    }
    onImplementationKeyup(event) {
        this.keyup.emit(event);
        this.emitControlEvent('keyup', this.value ?? '', event);
    }
    onImplementationClick(event) {
        this.click.emit(event);
        this.emitControlEvent('click', this.value ?? '', event);
    }
    normalizeValue(value) {
        return value ?? '';
    }
    afterWriteValue(value) {
        this.value = value;
        this.adaptConfig();
        this.refreshRegistryRegistration();
    }
    afterDisabledStateChange(isDisabled) {
        this.disabled = isDisabled;
        this.adaptConfig();
    }
    adaptConfig() {
        const resolved = this.resolveConfig();
        if (this.mode === 'CUSTOM') {
            this.customConfig = TextAdapter.toCustom(resolved);
        }
        else if (this.mode === 'MATERIAL') {
            this.materialConfig = TextAdapter.toMaterial(resolved);
        }
        else {
            this.primeConfig = TextAdapter.toPrime(resolved);
        }
    }
    resolveConfig() {
        const source = this.config
            ? { ...this.config }
            : {
                label: '',
                value: '',
                placeholder: '',
            };
        return {
            ...source,
            id: this.effectiveId,
            controlId: this.controlId,
            name: this.name ?? source.name,
            className: this.className ?? source.className,
            meta: this.meta ?? source.meta,
            label: this.label ?? source.label,
            value: this.value !== undefined ? this.value : (source.value ?? ''),
            placeholder: this.placeholder ?? source.placeholder,
            disabled: this.disabled ?? source.disabled ?? this.currentDisabled,
            required: this.required ?? source.required ?? false,
        };
    }
    get effectiveId() {
        return this.id || this.controlId || this.config?.id || this.config?.controlId;
    }
    refreshRegistryRegistration() {
        if (this.registryHandle) {
            this.controlRegistry.unregister(this.registryHandle);
        }
        this.registryHandle = {
            id: this.effectiveId,
            name: this.name || this.config?.name,
            classes: this.extractClasses(this.className || this.config?.className),
            type: 'text',
            getValue: () => this.value ?? this.config?.value ?? '',
        };
        this.controlRegistry.register(this.registryHandle);
    }
    extractClasses(classNames) {
        return (classNames || '')
            .split(/\s+/)
            .map((part) => part.trim())
            .filter((part) => !!part);
    }
    emitControlEvent(type, value, originalEvent) {
        this.controlEvent.emit({
            type,
            id: this.effectiveId,
            name: this.name || this.config?.name,
            className: this.className || this.config?.className,
            value,
            meta: this.meta || this.config?.meta,
            originalEvent,
        });
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.19", ngImport: i0, type: BrTextComponent, deps: [{ token: RuntimeUiConfigService }, { token: ControlRegistryService }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.19", type: BrTextComponent, isStandalone: true, selector: "br-text", inputs: { config: "config", id: "id", controlId: "controlId", name: "name", className: "className", value: "value", disabled: "disabled", required: "required", label: "label", placeholder: "placeholder", meta: "meta", showLibraryTag: "showLibraryTag" }, outputs: { valueChange: "valueChange", blur: "blur", focus: "focus", input: "input", change: "change", keydown: "keydown", keyup: "keyup", click: "click", controlEvent: "controlEvent" }, providers: [
            {
                provide: NG_VALUE_ACCESSOR,
                useExisting: forwardRef(() => BrTextComponent),
                multi: true,
            },
        ], usesInheritance: true, usesOnChanges: true, ngImport: i0, template: "<br-custom-text-control *ngIf=\"mode === 'CUSTOM' && customConfig as cfg\" [config]=\"cfg\"\r\n  [showLibraryTag]=\"showLibraryTag\" (valueChange)=\"onImplementationValueChange($event)\"\r\n  (blurEvent)=\"onImplementationBlur($event)\" (focusEvent)=\"onImplementationFocus($event)\"\r\n  (inputEvent)=\"onImplementationInput($event)\" (changeEvent)=\"onImplementationChange($event)\"\r\n  (keydownEvent)=\"onImplementationKeydown($event)\" (keyupEvent)=\"onImplementationKeyup($event)\"\r\n  (clickEvent)=\"onImplementationClick($event)\">\r\n</br-custom-text-control>\r\n\r\n<br-material-text-control *ngIf=\"mode === 'MATERIAL' && materialConfig as cfg\" [config]=\"cfg\"\r\n  [showLibraryTag]=\"showLibraryTag\" (valueChange)=\"onImplementationValueChange($event)\"\r\n  (blurEvent)=\"onImplementationBlur($event)\" (focusEvent)=\"onImplementationFocus($event)\"\r\n  (inputEvent)=\"onImplementationInput($event)\" (changeEvent)=\"onImplementationChange($event)\"\r\n  (keydownEvent)=\"onImplementationKeydown($event)\" (keyupEvent)=\"onImplementationKeyup($event)\"\r\n  (clickEvent)=\"onImplementationClick($event)\">\r\n</br-material-text-control>\r\n\r\n<br-prime-text-control *ngIf=\"mode === 'PRIMENG' && primeConfig as cfg\" [config]=\"cfg\" [showLibraryTag]=\"showLibraryTag\"\r\n  (valueChange)=\"onImplementationValueChange($event)\" (blurEvent)=\"onImplementationBlur($event)\"\r\n  (focusEvent)=\"onImplementationFocus($event)\" (inputEvent)=\"onImplementationInput($event)\"\r\n  (changeEvent)=\"onImplementationChange($event)\" (keydownEvent)=\"onImplementationKeydown($event)\"\r\n  (keyupEvent)=\"onImplementationKeyup($event)\" (clickEvent)=\"onImplementationClick($event)\">\r\n</br-prime-text-control>", dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: CustomTextControlComponent, selector: "br-custom-text-control", inputs: ["config", "showLibraryTag"], outputs: ["valueChange", "blurEvent", "focusEvent", "inputEvent", "changeEvent", "keydownEvent", "keyupEvent", "clickEvent"] }, { kind: "component", type: MaterialTextControlComponent, selector: "br-material-text-control", inputs: ["config", "showLibraryTag"], outputs: ["valueChange", "blurEvent", "focusEvent", "inputEvent", "changeEvent", "keydownEvent", "keyupEvent", "clickEvent"] }, { kind: "component", type: PrimeTextControlComponent, selector: "br-prime-text-control", inputs: ["config", "showLibraryTag"], outputs: ["valueChange", "blurEvent", "focusEvent", "inputEvent", "changeEvent", "keydownEvent", "keyupEvent", "clickEvent"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.19", ngImport: i0, type: BrTextComponent, decorators: [{
            type: Component,
            args: [{ selector: 'br-text', standalone: true, imports: [CommonModule, CustomTextControlComponent, MaterialTextControlComponent, PrimeTextControlComponent], providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(() => BrTextComponent),
                            multi: true,
                        },
                    ], template: "<br-custom-text-control *ngIf=\"mode === 'CUSTOM' && customConfig as cfg\" [config]=\"cfg\"\r\n  [showLibraryTag]=\"showLibraryTag\" (valueChange)=\"onImplementationValueChange($event)\"\r\n  (blurEvent)=\"onImplementationBlur($event)\" (focusEvent)=\"onImplementationFocus($event)\"\r\n  (inputEvent)=\"onImplementationInput($event)\" (changeEvent)=\"onImplementationChange($event)\"\r\n  (keydownEvent)=\"onImplementationKeydown($event)\" (keyupEvent)=\"onImplementationKeyup($event)\"\r\n  (clickEvent)=\"onImplementationClick($event)\">\r\n</br-custom-text-control>\r\n\r\n<br-material-text-control *ngIf=\"mode === 'MATERIAL' && materialConfig as cfg\" [config]=\"cfg\"\r\n  [showLibraryTag]=\"showLibraryTag\" (valueChange)=\"onImplementationValueChange($event)\"\r\n  (blurEvent)=\"onImplementationBlur($event)\" (focusEvent)=\"onImplementationFocus($event)\"\r\n  (inputEvent)=\"onImplementationInput($event)\" (changeEvent)=\"onImplementationChange($event)\"\r\n  (keydownEvent)=\"onImplementationKeydown($event)\" (keyupEvent)=\"onImplementationKeyup($event)\"\r\n  (clickEvent)=\"onImplementationClick($event)\">\r\n</br-material-text-control>\r\n\r\n<br-prime-text-control *ngIf=\"mode === 'PRIMENG' && primeConfig as cfg\" [config]=\"cfg\" [showLibraryTag]=\"showLibraryTag\"\r\n  (valueChange)=\"onImplementationValueChange($event)\" (blurEvent)=\"onImplementationBlur($event)\"\r\n  (focusEvent)=\"onImplementationFocus($event)\" (inputEvent)=\"onImplementationInput($event)\"\r\n  (changeEvent)=\"onImplementationChange($event)\" (keydownEvent)=\"onImplementationKeydown($event)\"\r\n  (keyupEvent)=\"onImplementationKeyup($event)\" (clickEvent)=\"onImplementationClick($event)\">\r\n</br-prime-text-control>" }]
        }], ctorParameters: () => [{ type: RuntimeUiConfigService }, { type: ControlRegistryService }], propDecorators: { config: [{
                type: Input
            }], id: [{
                type: Input
            }], controlId: [{
                type: Input
            }], name: [{
                type: Input
            }], className: [{
                type: Input
            }], value: [{
                type: Input
            }], disabled: [{
                type: Input
            }], required: [{
                type: Input
            }], label: [{
                type: Input
            }], placeholder: [{
                type: Input
            }], meta: [{
                type: Input
            }], showLibraryTag: [{
                type: Input
            }], valueChange: [{
                type: Output
            }], blur: [{
                type: Output
            }], focus: [{
                type: Output
            }], input: [{
                type: Output
            }], change: [{
                type: Output
            }], keydown: [{
                type: Output
            }], keyup: [{
                type: Output
            }], click: [{
                type: Output
            }], controlEvent: [{
                type: Output
            }] } });

class TextAreaAdapter {
    static toCustom(config) {
        return {
            id: config.id || config.controlId,
            name: config.name,
            className: config.className,
            label: config.label || '',
            value: config.value || '',
            placeholder: config.placeholder || '',
            disabled: config.disabled ?? false,
            required: config.required ?? false,
            rows: config.rows ?? 4,
            maxLength: config.maxLength,
        };
    }
    static toMaterial(config) {
        return {
            id: config.id || config.controlId,
            name: config.name,
            className: config.className,
            label: config.label || '',
            value: config.value || '',
            placeholder: config.placeholder || '',
            disabled: config.disabled ?? false,
            required: config.required ?? false,
            rows: config.rows ?? 4,
            maxLength: config.maxLength,
        };
    }
    static toPrime(config) {
        return {
            id: config.id || config.controlId,
            name: config.name,
            className: config.className,
            label: config.label || '',
            value: config.value || '',
            placeholder: config.placeholder || '',
            disabled: config.disabled ?? false,
            required: config.required ?? false,
            rows: config.rows ?? 4,
            maxLength: config.maxLength,
        };
    }
}

class CustomTextAreaControlComponent {
    config;
    showLibraryTag = false;
    valueChange = new EventEmitter();
    blurEvent = new EventEmitter();
    focusEvent = new EventEmitter();
    inputEvent = new EventEmitter();
    changeEvent = new EventEmitter();
    keydownEvent = new EventEmitter();
    keyupEvent = new EventEmitter();
    clickEvent = new EventEmitter();
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.19", ngImport: i0, type: CustomTextAreaControlComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.19", type: CustomTextAreaControlComponent, isStandalone: true, selector: "br-custom-text-area-control", inputs: { config: "config", showLibraryTag: "showLibraryTag" }, outputs: { valueChange: "valueChange", blurEvent: "blurEvent", focusEvent: "focusEvent", inputEvent: "inputEvent", changeEvent: "changeEvent", keydownEvent: "keydownEvent", keyupEvent: "keyupEvent", clickEvent: "clickEvent" }, ngImport: i0, template: "<div class=\"br-control br-text-area-control\">\r\n  <label class=\"br-label\">\r\n    {{ config.label }}\r\n    <span *ngIf=\"showLibraryTag\" class=\"br-lib-tag\" aria-label=\"Library package control\">LIB</span>\r\n  </label>\r\n  <textarea class=\"br-input br-textarea\" [ngClass]=\"config.className\" [attr.id]=\"config.id\" [attr.name]=\"config.name\"\r\n    [attr.rows]=\"config.rows\" [attr.maxlength]=\"config.maxLength ?? null\" [placeholder]=\"config.placeholder\"\r\n    [disabled]=\"config.disabled\" [required]=\"config.required\" [ngModel]=\"config.value\"\r\n    (ngModelChange)=\"valueChange.emit($event)\" (blur)=\"blurEvent.emit($event)\" (focus)=\"focusEvent.emit($event)\"\r\n    (input)=\"inputEvent.emit($event)\" (change)=\"changeEvent.emit($event)\" (keydown)=\"keydownEvent.emit($event)\"\r\n    (keyup)=\"keyupEvent.emit($event)\" (click)=\"clickEvent.emit($event)\"></textarea>\r\n</div>\r\n", styles: [".br-control{display:flex;flex-direction:column;gap:8px;font-family:var(--br-font-family, Tahoma, Arial, sans-serif)}.br-label{display:inline-flex;align-items:center;gap:8px;font-size:var(--br-base-font-size, 14px);font-weight:700;color:var(--br-label-font-color, #1f2a3d)}.br-lib-tag{display:inline-flex;align-items:center;gap:5px;padding:2px 8px;border-radius:999px;background:linear-gradient(135deg,#e8f0fe,#d2e3fc);color:#174ea6;font-size:10px;font-weight:800;letter-spacing:.4px}.br-lib-tag:before{content:\"\";width:6px;height:6px;border-radius:50%;background:#174ea6}.br-input{height:40px;border-radius:10px;border:1px solid var(--br-input-border-color, #c8d5e6);padding:0 12px;font-size:var(--br-base-font-size, 14px);font-family:inherit;color:var(--br-input-text-color, #1f2a3d);background:var(--br-input-background-color, #fff);transition:border-color .12s ease,box-shadow .12s ease}.br-input::placeholder{color:var(--br-input-placeholder-color, #94a3b8)}.br-input:focus{outline:none;border-color:var(--br-focus-color, #2563eb);box-shadow:0 0 0 3px var(--br-focus-ring-color, color-mix(in srgb, #2563eb 18%, transparent))}.br-input:disabled{background:var(--br-input-disabled-background-color, #f1f5f9);color:var(--br-input-disabled-text-color, #94a3b8)}.br-textarea{min-height:112px;padding:10px 12px;resize:vertical;line-height:1.45}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "ngmodule", type: FormsModule }, { kind: "directive", type: i2.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i2.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }, { kind: "directive", type: i2.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.19", ngImport: i0, type: CustomTextAreaControlComponent, decorators: [{
            type: Component,
            args: [{ selector: 'br-custom-text-area-control', standalone: true, imports: [CommonModule, FormsModule], template: "<div class=\"br-control br-text-area-control\">\r\n  <label class=\"br-label\">\r\n    {{ config.label }}\r\n    <span *ngIf=\"showLibraryTag\" class=\"br-lib-tag\" aria-label=\"Library package control\">LIB</span>\r\n  </label>\r\n  <textarea class=\"br-input br-textarea\" [ngClass]=\"config.className\" [attr.id]=\"config.id\" [attr.name]=\"config.name\"\r\n    [attr.rows]=\"config.rows\" [attr.maxlength]=\"config.maxLength ?? null\" [placeholder]=\"config.placeholder\"\r\n    [disabled]=\"config.disabled\" [required]=\"config.required\" [ngModel]=\"config.value\"\r\n    (ngModelChange)=\"valueChange.emit($event)\" (blur)=\"blurEvent.emit($event)\" (focus)=\"focusEvent.emit($event)\"\r\n    (input)=\"inputEvent.emit($event)\" (change)=\"changeEvent.emit($event)\" (keydown)=\"keydownEvent.emit($event)\"\r\n    (keyup)=\"keyupEvent.emit($event)\" (click)=\"clickEvent.emit($event)\"></textarea>\r\n</div>\r\n", styles: [".br-control{display:flex;flex-direction:column;gap:8px;font-family:var(--br-font-family, Tahoma, Arial, sans-serif)}.br-label{display:inline-flex;align-items:center;gap:8px;font-size:var(--br-base-font-size, 14px);font-weight:700;color:var(--br-label-font-color, #1f2a3d)}.br-lib-tag{display:inline-flex;align-items:center;gap:5px;padding:2px 8px;border-radius:999px;background:linear-gradient(135deg,#e8f0fe,#d2e3fc);color:#174ea6;font-size:10px;font-weight:800;letter-spacing:.4px}.br-lib-tag:before{content:\"\";width:6px;height:6px;border-radius:50%;background:#174ea6}.br-input{height:40px;border-radius:10px;border:1px solid var(--br-input-border-color, #c8d5e6);padding:0 12px;font-size:var(--br-base-font-size, 14px);font-family:inherit;color:var(--br-input-text-color, #1f2a3d);background:var(--br-input-background-color, #fff);transition:border-color .12s ease,box-shadow .12s ease}.br-input::placeholder{color:var(--br-input-placeholder-color, #94a3b8)}.br-input:focus{outline:none;border-color:var(--br-focus-color, #2563eb);box-shadow:0 0 0 3px var(--br-focus-ring-color, color-mix(in srgb, #2563eb 18%, transparent))}.br-input:disabled{background:var(--br-input-disabled-background-color, #f1f5f9);color:var(--br-input-disabled-text-color, #94a3b8)}.br-textarea{min-height:112px;padding:10px 12px;resize:vertical;line-height:1.45}\n"] }]
        }], propDecorators: { config: [{
                type: Input
            }], showLibraryTag: [{
                type: Input
            }], valueChange: [{
                type: Output
            }], blurEvent: [{
                type: Output
            }], focusEvent: [{
                type: Output
            }], inputEvent: [{
                type: Output
            }], changeEvent: [{
                type: Output
            }], keydownEvent: [{
                type: Output
            }], keyupEvent: [{
                type: Output
            }], clickEvent: [{
                type: Output
            }] } });

class MaterialTextAreaControlComponent {
    config;
    showLibraryTag = false;
    valueChange = new EventEmitter();
    blurEvent = new EventEmitter();
    focusEvent = new EventEmitter();
    inputEvent = new EventEmitter();
    changeEvent = new EventEmitter();
    keydownEvent = new EventEmitter();
    keyupEvent = new EventEmitter();
    clickEvent = new EventEmitter();
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.19", ngImport: i0, type: MaterialTextAreaControlComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.19", type: MaterialTextAreaControlComponent, isStandalone: true, selector: "br-material-text-area-control", inputs: { config: "config", showLibraryTag: "showLibraryTag" }, outputs: { valueChange: "valueChange", blurEvent: "blurEvent", focusEvent: "focusEvent", inputEvent: "inputEvent", changeEvent: "changeEvent", keydownEvent: "keydownEvent", keyupEvent: "keyupEvent", clickEvent: "clickEvent" }, ngImport: i0, template: "<mat-form-field appearance=\"outline\" class=\"br-material-field br-material-text-area-field\">\r\n  <mat-label class=\"br-material-label\">\r\n    {{ config.label }}\r\n    <span *ngIf=\"showLibraryTag\" class=\"br-lib-tag\" aria-label=\"Library package control\">LIB</span>\r\n  </mat-label>\r\n  <textarea matInput [ngClass]=\"config.className\" [attr.id]=\"config.id\" [attr.name]=\"config.name\"\r\n    [attr.rows]=\"config.rows\" [attr.maxlength]=\"config.maxLength ?? null\" [placeholder]=\"config.placeholder\"\r\n    [disabled]=\"config.disabled\" [required]=\"config.required\" [ngModel]=\"config.value\"\r\n    (ngModelChange)=\"valueChange.emit($event)\" (blur)=\"blurEvent.emit($event)\" (focus)=\"focusEvent.emit($event)\"\r\n    (input)=\"inputEvent.emit($event)\" (change)=\"changeEvent.emit($event)\" (keydown)=\"keydownEvent.emit($event)\"\r\n    (keyup)=\"keyupEvent.emit($event)\" (click)=\"clickEvent.emit($event)\"></textarea>\r\n</mat-form-field>\r\n", styles: [".br-material-field{width:100%;font-family:var(--br-font-family, Tahoma, Arial, sans-serif)}.br-material-label{display:inline-flex;align-items:center;gap:8px;color:var(--br-label-font-color, #1f2a3d)}.br-lib-tag{display:inline-flex;align-items:center;gap:5px;padding:2px 8px;border-radius:999px;background:linear-gradient(135deg,#e8f0fe,#d2e3fc);color:#174ea6;font-size:10px;font-weight:800;letter-spacing:.4px}.br-lib-tag:before{content:\"\";width:6px;height:6px;border-radius:50%;background:#174ea6}:host ::ng-deep .br-material-field .mat-mdc-form-field-subscript-wrapper{display:none}:host ::ng-deep .br-material-field .mdc-text-field--outlined{background:var(--br-input-background-color, #ffffff)}:host ::ng-deep .br-material-field .mdc-text-field--outlined .mdc-notched-outline__leading,:host ::ng-deep .br-material-field .mdc-text-field--outlined .mdc-notched-outline__notch,:host ::ng-deep .br-material-field .mdc-text-field--outlined .mdc-notched-outline__trailing{border-color:var(--br-input-border-color, #c8d5e6)}:host ::ng-deep .br-material-field.mat-focused .mdc-text-field--outlined .mdc-notched-outline__leading,:host ::ng-deep .br-material-field.mat-focused .mdc-text-field--outlined .mdc-notched-outline__notch,:host ::ng-deep .br-material-field.mat-focused .mdc-text-field--outlined .mdc-notched-outline__trailing{border-color:var(--br-focus-color, #2563eb)}:host ::ng-deep .br-material-field .mdc-text-field__input{color:var(--br-input-text-color, #1f2a3d);caret-color:var(--br-focus-color, #2563eb);font-family:var(--br-font-family, Tahoma, Arial, sans-serif);font-size:var(--br-base-font-size, 14px)}:host ::ng-deep .br-material-field .mdc-text-field__input::placeholder{color:var(--br-input-placeholder-color, #94a3b8)}:host ::ng-deep .br-material-field .mdc-floating-label,:host ::ng-deep .br-material-field .mat-mdc-form-field-label{color:var(--br-label-font-color, #1f2a3d)}.br-material-text-area-field textarea{min-height:112px;line-height:1.45;resize:vertical}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "ngmodule", type: FormsModule }, { kind: "directive", type: i2.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i2.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }, { kind: "directive", type: i2.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { kind: "ngmodule", type: MatFormFieldModule }, { kind: "component", type: i3$2.MatFormField, selector: "mat-form-field", inputs: ["hideRequiredMarker", "color", "floatLabel", "appearance", "subscriptSizing", "hintLabel"], exportAs: ["matFormField"] }, { kind: "directive", type: i3$2.MatLabel, selector: "mat-label" }, { kind: "ngmodule", type: MatInputModule }, { kind: "directive", type: i3$2.MatInput, selector: "input[matInput], textarea[matInput], select[matNativeControl],      input[matNativeControl], textarea[matNativeControl]", inputs: ["disabled", "id", "placeholder", "name", "required", "type", "errorStateMatcher", "aria-describedby", "value", "readonly", "disabledInteractive"], exportAs: ["matInput"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.19", ngImport: i0, type: MaterialTextAreaControlComponent, decorators: [{
            type: Component,
            args: [{ selector: 'br-material-text-area-control', standalone: true, imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule], template: "<mat-form-field appearance=\"outline\" class=\"br-material-field br-material-text-area-field\">\r\n  <mat-label class=\"br-material-label\">\r\n    {{ config.label }}\r\n    <span *ngIf=\"showLibraryTag\" class=\"br-lib-tag\" aria-label=\"Library package control\">LIB</span>\r\n  </mat-label>\r\n  <textarea matInput [ngClass]=\"config.className\" [attr.id]=\"config.id\" [attr.name]=\"config.name\"\r\n    [attr.rows]=\"config.rows\" [attr.maxlength]=\"config.maxLength ?? null\" [placeholder]=\"config.placeholder\"\r\n    [disabled]=\"config.disabled\" [required]=\"config.required\" [ngModel]=\"config.value\"\r\n    (ngModelChange)=\"valueChange.emit($event)\" (blur)=\"blurEvent.emit($event)\" (focus)=\"focusEvent.emit($event)\"\r\n    (input)=\"inputEvent.emit($event)\" (change)=\"changeEvent.emit($event)\" (keydown)=\"keydownEvent.emit($event)\"\r\n    (keyup)=\"keyupEvent.emit($event)\" (click)=\"clickEvent.emit($event)\"></textarea>\r\n</mat-form-field>\r\n", styles: [".br-material-field{width:100%;font-family:var(--br-font-family, Tahoma, Arial, sans-serif)}.br-material-label{display:inline-flex;align-items:center;gap:8px;color:var(--br-label-font-color, #1f2a3d)}.br-lib-tag{display:inline-flex;align-items:center;gap:5px;padding:2px 8px;border-radius:999px;background:linear-gradient(135deg,#e8f0fe,#d2e3fc);color:#174ea6;font-size:10px;font-weight:800;letter-spacing:.4px}.br-lib-tag:before{content:\"\";width:6px;height:6px;border-radius:50%;background:#174ea6}:host ::ng-deep .br-material-field .mat-mdc-form-field-subscript-wrapper{display:none}:host ::ng-deep .br-material-field .mdc-text-field--outlined{background:var(--br-input-background-color, #ffffff)}:host ::ng-deep .br-material-field .mdc-text-field--outlined .mdc-notched-outline__leading,:host ::ng-deep .br-material-field .mdc-text-field--outlined .mdc-notched-outline__notch,:host ::ng-deep .br-material-field .mdc-text-field--outlined .mdc-notched-outline__trailing{border-color:var(--br-input-border-color, #c8d5e6)}:host ::ng-deep .br-material-field.mat-focused .mdc-text-field--outlined .mdc-notched-outline__leading,:host ::ng-deep .br-material-field.mat-focused .mdc-text-field--outlined .mdc-notched-outline__notch,:host ::ng-deep .br-material-field.mat-focused .mdc-text-field--outlined .mdc-notched-outline__trailing{border-color:var(--br-focus-color, #2563eb)}:host ::ng-deep .br-material-field .mdc-text-field__input{color:var(--br-input-text-color, #1f2a3d);caret-color:var(--br-focus-color, #2563eb);font-family:var(--br-font-family, Tahoma, Arial, sans-serif);font-size:var(--br-base-font-size, 14px)}:host ::ng-deep .br-material-field .mdc-text-field__input::placeholder{color:var(--br-input-placeholder-color, #94a3b8)}:host ::ng-deep .br-material-field .mdc-floating-label,:host ::ng-deep .br-material-field .mat-mdc-form-field-label{color:var(--br-label-font-color, #1f2a3d)}.br-material-text-area-field textarea{min-height:112px;line-height:1.45;resize:vertical}\n"] }]
        }], propDecorators: { config: [{
                type: Input
            }], showLibraryTag: [{
                type: Input
            }], valueChange: [{
                type: Output
            }], blurEvent: [{
                type: Output
            }], focusEvent: [{
                type: Output
            }], inputEvent: [{
                type: Output
            }], changeEvent: [{
                type: Output
            }], keydownEvent: [{
                type: Output
            }], keyupEvent: [{
                type: Output
            }], clickEvent: [{
                type: Output
            }] } });

class PrimeTextAreaControlComponent {
    config;
    showLibraryTag = false;
    valueChange = new EventEmitter();
    blurEvent = new EventEmitter();
    focusEvent = new EventEmitter();
    inputEvent = new EventEmitter();
    changeEvent = new EventEmitter();
    keydownEvent = new EventEmitter();
    keyupEvent = new EventEmitter();
    clickEvent = new EventEmitter();
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.19", ngImport: i0, type: PrimeTextAreaControlComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.19", type: PrimeTextAreaControlComponent, isStandalone: true, selector: "br-prime-text-area-control", inputs: { config: "config", showLibraryTag: "showLibraryTag" }, outputs: { valueChange: "valueChange", blurEvent: "blurEvent", focusEvent: "focusEvent", inputEvent: "inputEvent", changeEvent: "changeEvent", keydownEvent: "keydownEvent", keyupEvent: "keyupEvent", clickEvent: "clickEvent" }, ngImport: i0, template: `
    <div class="prime-text-area-control">
      <p-floatLabel>
        <textarea pInputTextarea 
                  [attr.id]="config.id" 
                  [attr.name]="config.name" 
                  [ngClass]="config.className || ''"
                  [placeholder]="config.placeholder || ''" 
                  [disabled]="config.disabled"
                  [required]="config.required" 
                  [rows]="config.rows"
                  [maxlength]="config.maxLength ?? null"
                  [ngModel]="config.value"
                  (ngModelChange)="valueChange.emit($event)" 
                  (blur)="blurEvent.emit($event)"
                  (focus)="focusEvent.emit($event)" 
                  (input)="inputEvent.emit($event)"
                  (change)="changeEvent.emit($event)" 
                  (keydown)="keydownEvent.emit($event)"
                  (keyup)="keyupEvent.emit($event)" 
                  (click)="clickEvent.emit($event)"></textarea>
        <label *ngIf="config.id" [attr.for]="config.id">{{ config.label }}</label>
        <label *ngIf="!config.id">{{ config.label }}</label>
        <span *ngIf="showLibraryTag" class="br-lib-tag" 
              style="position: absolute; right: 0.5rem; top: 0.5rem; background: #eee; padding: 2px 4px; font-size: 10px; border-radius: 4px;">LIB</span>
      </p-floatLabel>
    </div>
  `, isInline: true, styles: [".prime-text-area-control{margin-top:1.5rem;position:relative}textarea{width:100%}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "ngmodule", type: FormsModule }, { kind: "directive", type: i2.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i2.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }, { kind: "directive", type: i2.MaxLengthValidator, selector: "[maxlength][formControlName],[maxlength][formControl],[maxlength][ngModel]", inputs: ["maxlength"] }, { kind: "directive", type: i2.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { kind: "ngmodule", type: TextareaModule }, { kind: "directive", type: i7$1.Textarea, selector: "[pTextarea], [pInputTextarea]", inputs: ["pTextareaPT", "pTextareaUnstyled", "autoResize", "pSize", "variant", "fluid", "invalid"], outputs: ["onResize"] }, { kind: "ngmodule", type: FloatLabelModule }, { kind: "component", type: i4$1.FloatLabel, selector: "p-floatlabel, p-floatLabel, p-float-label", inputs: ["variant"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.19", ngImport: i0, type: PrimeTextAreaControlComponent, decorators: [{
            type: Component,
            args: [{ selector: 'br-prime-text-area-control', standalone: true, imports: [CommonModule, FormsModule, TextareaModule, FloatLabelModule], template: `
    <div class="prime-text-area-control">
      <p-floatLabel>
        <textarea pInputTextarea 
                  [attr.id]="config.id" 
                  [attr.name]="config.name" 
                  [ngClass]="config.className || ''"
                  [placeholder]="config.placeholder || ''" 
                  [disabled]="config.disabled"
                  [required]="config.required" 
                  [rows]="config.rows"
                  [maxlength]="config.maxLength ?? null"
                  [ngModel]="config.value"
                  (ngModelChange)="valueChange.emit($event)" 
                  (blur)="blurEvent.emit($event)"
                  (focus)="focusEvent.emit($event)" 
                  (input)="inputEvent.emit($event)"
                  (change)="changeEvent.emit($event)" 
                  (keydown)="keydownEvent.emit($event)"
                  (keyup)="keyupEvent.emit($event)" 
                  (click)="clickEvent.emit($event)"></textarea>
        <label *ngIf="config.id" [attr.for]="config.id">{{ config.label }}</label>
        <label *ngIf="!config.id">{{ config.label }}</label>
        <span *ngIf="showLibraryTag" class="br-lib-tag" 
              style="position: absolute; right: 0.5rem; top: 0.5rem; background: #eee; padding: 2px 4px; font-size: 10px; border-radius: 4px;">LIB</span>
      </p-floatLabel>
    </div>
  `, styles: [".prime-text-area-control{margin-top:1.5rem;position:relative}textarea{width:100%}\n"] }]
        }], propDecorators: { config: [{
                type: Input
            }], showLibraryTag: [{
                type: Input
            }], valueChange: [{
                type: Output
            }], blurEvent: [{
                type: Output
            }], focusEvent: [{
                type: Output
            }], inputEvent: [{
                type: Output
            }], changeEvent: [{
                type: Output
            }], keydownEvent: [{
                type: Output
            }], keyupEvent: [{
                type: Output
            }], clickEvent: [{
                type: Output
            }] } });

class BrTextAreaComponent extends BaseValueAccessor {
    runtimeUiConfig;
    controlRegistry;
    config;
    id;
    controlId;
    name;
    className;
    value;
    disabled;
    required;
    label;
    placeholder;
    rows;
    maxLength;
    meta;
    showLibraryTag = true;
    valueChange = new EventEmitter();
    blur = new EventEmitter();
    focus = new EventEmitter();
    input = new EventEmitter();
    change = new EventEmitter();
    keydown = new EventEmitter();
    keyup = new EventEmitter();
    click = new EventEmitter();
    controlEvent = new EventEmitter();
    mode = 'CUSTOM';
    customConfig;
    materialConfig;
    primeConfig;
    destroy$ = new Subject();
    registryHandle;
    constructor(runtimeUiConfig, controlRegistry) {
        super();
        this.runtimeUiConfig = runtimeUiConfig;
        this.controlRegistry = controlRegistry;
    }
    ngOnInit() {
        this.mode = this.runtimeUiConfig.getModesSnapshot().text;
        this.runtimeUiConfig.modes$.pipe(takeUntil(this.destroy$)).subscribe((m) => {
            this.mode = m.text;
            this.adaptConfig();
        });
        this.refreshRegistryRegistration();
    }
    ngOnChanges(_) {
        this.adaptConfig();
        this.refreshRegistryRegistration();
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
        if (this.registryHandle) {
            this.controlRegistry.unregister(this.registryHandle);
        }
    }
    onImplementationValueChange(value) {
        this.value = value ?? '';
        this.valueChange.emit(this.value);
        this.emitValueChange(this.value);
        this.emitControlEvent('valueChange', this.value);
        this.refreshRegistryRegistration();
    }
    onImplementationBlur(event) {
        this.blur.emit(event);
        this.emitControlEvent('blur', this.value ?? '', event);
        this.markTouched();
    }
    onImplementationFocus(event) {
        this.focus.emit(event);
        this.emitControlEvent('focus', this.value ?? '', event);
    }
    onImplementationInput(event) {
        this.input.emit(event);
        this.emitControlEvent('input', this.value ?? '', event);
    }
    onImplementationChange(event) {
        this.change.emit(event);
        this.emitControlEvent('change', this.value ?? '', event);
    }
    onImplementationKeydown(event) {
        this.keydown.emit(event);
        this.emitControlEvent('keydown', this.value ?? '', event);
    }
    onImplementationKeyup(event) {
        this.keyup.emit(event);
        this.emitControlEvent('keyup', this.value ?? '', event);
    }
    onImplementationClick(event) {
        this.click.emit(event);
        this.emitControlEvent('click', this.value ?? '', event);
    }
    normalizeValue(value) {
        return value ?? '';
    }
    afterWriteValue(value) {
        this.value = value;
        this.adaptConfig();
        this.refreshRegistryRegistration();
    }
    afterDisabledStateChange(isDisabled) {
        this.disabled = isDisabled;
        this.adaptConfig();
    }
    adaptConfig() {
        const resolved = this.resolveConfig();
        if (this.mode === 'CUSTOM') {
            this.customConfig = TextAreaAdapter.toCustom(resolved);
        }
        else if (this.mode === 'MATERIAL') {
            this.materialConfig = TextAreaAdapter.toMaterial(resolved);
        }
        else {
            this.primeConfig = TextAreaAdapter.toPrime(resolved);
        }
    }
    resolveConfig() {
        const source = this.config
            ? { ...this.config }
            : {
                label: '',
                value: '',
                placeholder: '',
                rows: 4,
            };
        return {
            ...source,
            id: this.effectiveId,
            controlId: this.controlId,
            name: this.name ?? source.name,
            className: this.className ?? source.className,
            meta: this.meta ?? source.meta,
            label: this.label ?? source.label,
            value: this.value !== undefined ? this.value : (source.value ?? ''),
            placeholder: this.placeholder ?? source.placeholder,
            rows: this.rows ?? source.rows ?? 4,
            maxLength: this.maxLength ?? source.maxLength,
            disabled: this.disabled ?? source.disabled ?? this.currentDisabled,
            required: this.required ?? source.required ?? false,
        };
    }
    get effectiveId() {
        return this.id || this.controlId || this.config?.id || this.config?.controlId;
    }
    refreshRegistryRegistration() {
        if (this.registryHandle) {
            this.controlRegistry.unregister(this.registryHandle);
        }
        this.registryHandle = {
            id: this.effectiveId,
            name: this.name || this.config?.name,
            classes: this.extractClasses(this.className || this.config?.className),
            type: 'textArea',
            getValue: () => this.value ?? this.config?.value ?? '',
        };
        this.controlRegistry.register(this.registryHandle);
    }
    extractClasses(classNames) {
        return (classNames || '')
            .split(/\s+/)
            .map((part) => part.trim())
            .filter((part) => !!part);
    }
    emitControlEvent(type, value, originalEvent) {
        this.controlEvent.emit({
            type,
            id: this.effectiveId,
            name: this.name || this.config?.name,
            className: this.className || this.config?.className,
            value,
            meta: this.meta || this.config?.meta,
            originalEvent,
        });
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.19", ngImport: i0, type: BrTextAreaComponent, deps: [{ token: RuntimeUiConfigService }, { token: ControlRegistryService }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.19", type: BrTextAreaComponent, isStandalone: true, selector: "br-text-area", inputs: { config: "config", id: "id", controlId: "controlId", name: "name", className: "className", value: "value", disabled: "disabled", required: "required", label: "label", placeholder: "placeholder", rows: "rows", maxLength: "maxLength", meta: "meta", showLibraryTag: "showLibraryTag" }, outputs: { valueChange: "valueChange", blur: "blur", focus: "focus", input: "input", change: "change", keydown: "keydown", keyup: "keyup", click: "click", controlEvent: "controlEvent" }, providers: [
            {
                provide: NG_VALUE_ACCESSOR,
                useExisting: forwardRef(() => BrTextAreaComponent),
                multi: true,
            },
        ], usesInheritance: true, usesOnChanges: true, ngImport: i0, template: "<br-custom-text-area-control *ngIf=\"mode === 'CUSTOM' && customConfig as cfg\" [config]=\"cfg\"\r\n  [showLibraryTag]=\"showLibraryTag\" (valueChange)=\"onImplementationValueChange($event)\"\r\n  (blurEvent)=\"onImplementationBlur($event)\" (focusEvent)=\"onImplementationFocus($event)\"\r\n  (inputEvent)=\"onImplementationInput($event)\" (changeEvent)=\"onImplementationChange($event)\"\r\n  (keydownEvent)=\"onImplementationKeydown($event)\" (keyupEvent)=\"onImplementationKeyup($event)\"\r\n  (clickEvent)=\"onImplementationClick($event)\">\r\n</br-custom-text-area-control>\r\n\r\n<br-material-text-area-control *ngIf=\"mode === 'MATERIAL' && materialConfig as cfg\" [config]=\"cfg\"\r\n  [showLibraryTag]=\"showLibraryTag\" (valueChange)=\"onImplementationValueChange($event)\"\r\n  (blurEvent)=\"onImplementationBlur($event)\" (focusEvent)=\"onImplementationFocus($event)\"\r\n  (inputEvent)=\"onImplementationInput($event)\" (changeEvent)=\"onImplementationChange($event)\"\r\n  (keydownEvent)=\"onImplementationKeydown($event)\" (keyupEvent)=\"onImplementationKeyup($event)\"\r\n  (clickEvent)=\"onImplementationClick($event)\">\r\n</br-material-text-area-control>\r\n\r\n<br-prime-text-area-control *ngIf=\"mode === 'PRIMENG' && primeConfig as cfg\" [config]=\"cfg\"\r\n  [showLibraryTag]=\"showLibraryTag\" (valueChange)=\"onImplementationValueChange($event)\"\r\n  (blurEvent)=\"onImplementationBlur($event)\" (focusEvent)=\"onImplementationFocus($event)\"\r\n  (inputEvent)=\"onImplementationInput($event)\" (changeEvent)=\"onImplementationChange($event)\"\r\n  (keydownEvent)=\"onImplementationKeydown($event)\" (keyupEvent)=\"onImplementationKeyup($event)\"\r\n  (clickEvent)=\"onImplementationClick($event)\">\r\n</br-prime-text-area-control>", dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: CustomTextAreaControlComponent, selector: "br-custom-text-area-control", inputs: ["config", "showLibraryTag"], outputs: ["valueChange", "blurEvent", "focusEvent", "inputEvent", "changeEvent", "keydownEvent", "keyupEvent", "clickEvent"] }, { kind: "component", type: MaterialTextAreaControlComponent, selector: "br-material-text-area-control", inputs: ["config", "showLibraryTag"], outputs: ["valueChange", "blurEvent", "focusEvent", "inputEvent", "changeEvent", "keydownEvent", "keyupEvent", "clickEvent"] }, { kind: "component", type: PrimeTextAreaControlComponent, selector: "br-prime-text-area-control", inputs: ["config", "showLibraryTag"], outputs: ["valueChange", "blurEvent", "focusEvent", "inputEvent", "changeEvent", "keydownEvent", "keyupEvent", "clickEvent"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.19", ngImport: i0, type: BrTextAreaComponent, decorators: [{
            type: Component,
            args: [{ selector: 'br-text-area', standalone: true, imports: [CommonModule, CustomTextAreaControlComponent, MaterialTextAreaControlComponent, PrimeTextAreaControlComponent], providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(() => BrTextAreaComponent),
                            multi: true,
                        },
                    ], template: "<br-custom-text-area-control *ngIf=\"mode === 'CUSTOM' && customConfig as cfg\" [config]=\"cfg\"\r\n  [showLibraryTag]=\"showLibraryTag\" (valueChange)=\"onImplementationValueChange($event)\"\r\n  (blurEvent)=\"onImplementationBlur($event)\" (focusEvent)=\"onImplementationFocus($event)\"\r\n  (inputEvent)=\"onImplementationInput($event)\" (changeEvent)=\"onImplementationChange($event)\"\r\n  (keydownEvent)=\"onImplementationKeydown($event)\" (keyupEvent)=\"onImplementationKeyup($event)\"\r\n  (clickEvent)=\"onImplementationClick($event)\">\r\n</br-custom-text-area-control>\r\n\r\n<br-material-text-area-control *ngIf=\"mode === 'MATERIAL' && materialConfig as cfg\" [config]=\"cfg\"\r\n  [showLibraryTag]=\"showLibraryTag\" (valueChange)=\"onImplementationValueChange($event)\"\r\n  (blurEvent)=\"onImplementationBlur($event)\" (focusEvent)=\"onImplementationFocus($event)\"\r\n  (inputEvent)=\"onImplementationInput($event)\" (changeEvent)=\"onImplementationChange($event)\"\r\n  (keydownEvent)=\"onImplementationKeydown($event)\" (keyupEvent)=\"onImplementationKeyup($event)\"\r\n  (clickEvent)=\"onImplementationClick($event)\">\r\n</br-material-text-area-control>\r\n\r\n<br-prime-text-area-control *ngIf=\"mode === 'PRIMENG' && primeConfig as cfg\" [config]=\"cfg\"\r\n  [showLibraryTag]=\"showLibraryTag\" (valueChange)=\"onImplementationValueChange($event)\"\r\n  (blurEvent)=\"onImplementationBlur($event)\" (focusEvent)=\"onImplementationFocus($event)\"\r\n  (inputEvent)=\"onImplementationInput($event)\" (changeEvent)=\"onImplementationChange($event)\"\r\n  (keydownEvent)=\"onImplementationKeydown($event)\" (keyupEvent)=\"onImplementationKeyup($event)\"\r\n  (clickEvent)=\"onImplementationClick($event)\">\r\n</br-prime-text-area-control>" }]
        }], ctorParameters: () => [{ type: RuntimeUiConfigService }, { type: ControlRegistryService }], propDecorators: { config: [{
                type: Input
            }], id: [{
                type: Input
            }], controlId: [{
                type: Input
            }], name: [{
                type: Input
            }], className: [{
                type: Input
            }], value: [{
                type: Input
            }], disabled: [{
                type: Input
            }], required: [{
                type: Input
            }], label: [{
                type: Input
            }], placeholder: [{
                type: Input
            }], rows: [{
                type: Input
            }], maxLength: [{
                type: Input
            }], meta: [{
                type: Input
            }], showLibraryTag: [{
                type: Input
            }], valueChange: [{
                type: Output
            }], blur: [{
                type: Output
            }], focus: [{
                type: Output
            }], input: [{
                type: Output
            }], change: [{
                type: Output
            }], keydown: [{
                type: Output
            }], keyup: [{
                type: Output
            }], click: [{
                type: Output
            }], controlEvent: [{
                type: Output
            }] } });

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
class DateAdapter {
    /**
     * Transform generic config → Custom date input
     * Native HTML date input uses string format (YYYY-MM-DD)
     */
    static toCustom(config) {
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
    static toMaterial(config) {
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
    /**
     * Transform generic config → PrimeNG date picker inputs
     */
    static toPrime(config) {
        return DateAdapter.toMaterial(config);
    }
    static resolveConfig(config) {
        const advanced = DateAdapter.readAdvancedConfig(config);
        const today = DateAdapter.startOfDay(new Date());
        const locale = DateAdapter.readLocale(config);
        let value = DateAdapter.toDate(config.value);
        let minDate = DateAdapter.toDate(config.minDate ?? null);
        let maxDate = DateAdapter.toDate(config.maxDate ?? null);
        let disabledDaysOfWeek = [];
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
        const zeroToken = (token) => !!token && token.amount === 0;
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
    static readAdvancedConfig(config) {
        const raw = config.dateConfiguration ?? config.DateConfiguration;
        if (!raw)
            return null;
        if (typeof raw === 'string') {
            const text = raw.trim();
            if (!text)
                return null;
            try {
                const parsed = JSON.parse(text);
                return Object.keys(parsed || {}).length ? parsed : null;
            }
            catch {
                return null;
            }
        }
        return Object.keys(raw).length ? raw : null;
    }
    static readLocale(config) {
        const raw = (config.language || config.locale || '').trim();
        return raw || 'en-US';
    }
    static readIncludeToday(config) {
        if (typeof config.includeToday === 'boolean')
            return config.includeToday;
        if (typeof config.IncludeToday === 'boolean')
            return config.IncludeToday;
        if (typeof config.Includetoday === 'boolean')
            return config.Includetoday;
        return true;
    }
    static readDefaultToday(config) {
        return !!config.Defaulttodaysdate;
    }
    static rawToken(value) {
        return typeof value === 'string' ? value.trim() : '';
    }
    static hasMeaningfulBound(value) {
        if (value instanceof Date)
            return !Number.isNaN(value.getTime());
        return typeof value === 'string' ? value.trim().length > 0 : false;
    }
    static getConfiguredUnit(config) {
        const explicitMode = (config.Customdate || config.Currentdate || '').toString().toLowerCase();
        if (explicitMode.includes('year'))
            return 'years';
        if (explicitMode.includes('month'))
            return 'months';
        if (explicitMode.includes('week'))
            return 'weeks';
        const first = DateAdapter.rawToken(config.Mindate) || DateAdapter.rawToken(config.Maxdate);
        const suffix = first.slice(-1).toLowerCase();
        if (suffix === 'y')
            return 'years';
        if (suffix === 'm')
            return 'months';
        if (suffix === 'w')
            return 'weeks';
        return 'days';
    }
    static parseRelativeToken(value, defaultUnit) {
        if (value instanceof Date || value == null)
            return null;
        const text = value.toString().trim().toLowerCase();
        if (!text)
            return null;
        const match = text.match(/^(-?\d+)\s*([dwmy])?$/i);
        if (!match)
            return null;
        const amount = Number(match[1]);
        if (Number.isNaN(amount))
            return null;
        const unitCode = match[2];
        let unit = defaultUnit;
        if (unitCode === 'd')
            unit = 'days';
        if (unitCode === 'w')
            unit = 'weeks';
        if (unitCode === 'm')
            unit = 'months';
        if (unitCode === 'y')
            unit = 'years';
        return { amount, unit };
    }
    static normalizeDisabledDays(values) {
        if (!Array.isArray(values))
            return [];
        const normalized = values
            .map((value) => (typeof value === 'string' && value.trim() === '' ? Number.NaN : Number(value)))
            .filter((value) => Number.isInteger(value) && value >= 0 && value <= 6);
        return Array.from(new Set(normalized));
    }
    static normalizeFirstDayOfWeek(value, locale) {
        if (value === undefined || value === null || value === '')
            return DateAdapter.getLocaleFirstDayOfWeek(locale);
        const parsed = Number(value);
        if (!Number.isInteger(parsed))
            return DateAdapter.getLocaleFirstDayOfWeek(locale);
        return Math.min(Math.max(parsed, 0), 6);
    }
    static getLocaleFirstDayOfWeek(locale) {
        try {
            const IntlAny = Intl;
            if (IntlAny.Locale) {
                const info = new IntlAny.Locale(locale).weekInfo;
                const firstDay = info?.firstDay;
                if (typeof firstDay === 'number') {
                    return firstDay === 7 ? 0 : Math.min(Math.max(firstDay, 0), 6);
                }
            }
        }
        catch {
            // ignore
        }
        const normalized = locale.toLowerCase();
        if (normalized.startsWith('en-us') || normalized.startsWith('ar-sa')) {
            return 0;
        }
        return 1;
    }
    static shiftDate(baseDate, amount, unit) {
        const date = new Date(baseDate);
        if (unit === 'days')
            date.setDate(date.getDate() + amount);
        if (unit === 'weeks')
            date.setDate(date.getDate() + (amount * 7));
        if (unit === 'months')
            date.setMonth(date.getMonth() + amount);
        if (unit === 'years')
            date.setFullYear(date.getFullYear() + amount);
        return DateAdapter.startOfDay(date);
    }
    static expandToUnitRange(anchorDate, unit, firstDayOfWeek) {
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
    static isSameDay(a, b) {
        return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
    }
    static startOfDay(date) {
        const copy = new Date(date);
        copy.setHours(0, 0, 0, 0);
        return copy;
    }
    // ─── Utility Helpers ────────────────────────────────────────
    static toISOString(value) {
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
    static toDate(value) {
        if (!value)
            return null;
        if (value instanceof Date)
            return Number.isNaN(value.getTime()) ? null : DateAdapter.startOfDay(value);
        const localIso = DateAdapter.tryParseLocalIso(value);
        if (localIso)
            return DateAdapter.startOfDay(localIso);
        const parsed = new Date(value);
        return Number.isNaN(parsed.getTime()) ? null : DateAdapter.startOfDay(parsed);
    }
    static tryParseLocalIso(value) {
        const match = value.trim().match(/^(\d{4})-(\d{2})-(\d{2})$/);
        if (!match)
            return null;
        const year = Number(match[1]);
        const monthIndex = Number(match[2]) - 1;
        const day = Number(match[3]);
        if (!Number.isInteger(year) || !Number.isInteger(monthIndex) || !Number.isInteger(day))
            return null;
        const parsed = new Date(year, monthIndex, day);
        if (parsed.getFullYear() !== year || parsed.getMonth() !== monthIndex || parsed.getDate() !== day)
            return null;
        return parsed;
    }
    static toLocalIsoDate(value) {
        const year = value.getFullYear();
        const month = String(value.getMonth() + 1).padStart(2, '0');
        const day = String(value.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
}

/**
 * ============================================================
 * CUSTOM DATE IMPLEMENTATION
 * ============================================================
 * Custom-rendered date picker (no native input calendar) so we can
 * fully control first day of week and disabled weekdays.
 * ============================================================
 */
class CustomDateComponent {
    host;
    config;
    showLibraryTag = false;
    dateChange = new EventEmitter();
    blurEvent = new EventEmitter();
    focusEvent = new EventEmitter();
    inputEvent = new EventEmitter();
    changeEvent = new EventEmitter();
    keydownEvent = new EventEmitter();
    keyupEvent = new EventEmitter();
    clickEvent = new EventEmitter();
    isOpen = false;
    visibleMonth = new Date();
    selectedDate = null;
    dayHeaders = [];
    calendarWeeks = [];
    monthModel = '0';
    yearModel = '';
    constructor(host) {
        this.host = host;
    }
    ngOnChanges(changes) {
        if (!changes['config'] || !this.config)
            return;
        this.selectedDate = this.parseDate(this.config.value);
        const base = this.selectedDate ?? new Date();
        this.visibleMonth = new Date(base.getFullYear(), base.getMonth(), 1);
        this.dayHeaders = this.getOrderedDayHeaders();
        this.rebuildCalendar();
    }
    get wrapperClasses() {
        const classes = [
            `density-${this.config.uiConfig.density}`,
            `size-${this.config.uiConfig.size}`,
            `variant-${this.config.uiConfig.variant}`,
        ];
        if (this.config.uiConfig.className) {
            classes.push(this.config.uiConfig.className);
        }
        return classes;
    }
    get wrapperStyles() {
        const styles = {};
        Object.entries(this.config.uiConfig.tokens || {}).forEach(([key, value]) => {
            styles[`--date-${key}`] = String(value);
        });
        return styles;
    }
    get displayValue() {
        return this.selectedDate ? this.formatDate(this.selectedDate, this.config.dateFormat) : '';
    }
    get monthLabel() {
        return this.visibleMonth.toLocaleDateString(this.locale, {
            month: 'long',
            year: 'numeric',
        });
    }
    get monthOptions() {
        return Array.from({ length: 12 }, (_, value) => ({
            value,
            label: new Date(2024, value, 1).toLocaleDateString(this.locale, { month: 'long' }),
        }));
    }
    get yearOptions() {
        const minDate = this.parseDate(this.config?.minDate);
        const maxDate = this.parseDate(this.config?.maxDate);
        const fallbackStart = this.visibleMonth.getFullYear() - 100;
        const fallbackEnd = this.visibleMonth.getFullYear() + 100;
        const start = minDate ? minDate.getFullYear() : fallbackStart;
        const end = maxDate ? maxDate.getFullYear() : fallbackEnd;
        const safeStart = Math.min(start, end);
        const safeEnd = Math.max(start, end);
        const years = [];
        for (let year = safeStart; year <= safeEnd; year += 1) {
            years.push(year);
        }
        return years;
    }
    openCalendar(event) {
        if (event)
            event.stopPropagation();
        if (this.config.disabled)
            return;
        this.isOpen = true;
        this.rebuildCalendar();
    }
    toggleCalendar(event) {
        event.stopPropagation();
        if (this.config.disabled)
            return;
        this.isOpen = !this.isOpen;
        if (this.isOpen) {
            this.rebuildCalendar();
        }
    }
    closeCalendar() {
        this.isOpen = false;
    }
    goToPreviousMonth(event) {
        event.stopPropagation();
        this.visibleMonth = new Date(this.visibleMonth.getFullYear(), this.visibleMonth.getMonth() - 1, 1);
        this.rebuildCalendar();
    }
    goToNextMonth(event) {
        event.stopPropagation();
        this.visibleMonth = new Date(this.visibleMonth.getFullYear(), this.visibleMonth.getMonth() + 1, 1);
        this.rebuildCalendar();
    }
    onMonthModelChange(value) {
        const month = Number(value);
        if (!Number.isInteger(month) || month < 0 || month > 11)
            return;
        this.visibleMonth = new Date(this.visibleMonth.getFullYear(), month, 1);
        this.rebuildCalendar();
    }
    onYearModelChange(value) {
        const year = Number(value);
        if (!Number.isInteger(year))
            return;
        this.visibleMonth = new Date(year, this.visibleMonth.getMonth(), 1);
        this.rebuildCalendar();
    }
    onCellClick(cell, event) {
        event.stopPropagation();
        if (cell.disabled)
            return;
        this.selectedDate = new Date(cell.date.getFullYear(), cell.date.getMonth(), cell.date.getDate());
        this.dateChange.emit(this.toIsoDate(this.selectedDate));
        this.isOpen = false;
        this.rebuildCalendar();
    }
    trackByWeek(index) {
        return index;
    }
    trackByCell(_, cell) {
        return `${cell.date.getFullYear()}-${cell.date.getMonth()}-${cell.date.getDate()}`;
    }
    onDocumentClick(event) {
        if (!this.isOpen)
            return;
        const target = event.target;
        if (!target)
            return;
        if (!this.host.nativeElement.contains(target)) {
            this.closeCalendar();
        }
    }
    onEscape() {
        this.closeCalendar();
    }
    rebuildCalendar() {
        const firstDayOfWeek = this.normalizeFirstDayOfWeek(this.config.firstDayOfWeek);
        const monthStart = new Date(this.visibleMonth.getFullYear(), this.visibleMonth.getMonth(), 1);
        const offset = (monthStart.getDay() - firstDayOfWeek + 7) % 7;
        const calendarStart = new Date(monthStart);
        calendarStart.setDate(calendarStart.getDate() - offset);
        const cells = [];
        for (let i = 0; i < 42; i += 1) {
            const date = new Date(calendarStart);
            date.setDate(calendarStart.getDate() + i);
            const disabled = this.isDateDisabled(date);
            cells.push({
                date,
                day: date.getDate(),
                inMonth: date.getMonth() === this.visibleMonth.getMonth(),
                disabled,
                selected: !!this.selectedDate && this.isSameDay(date, this.selectedDate),
                today: this.isSameDay(date, new Date()),
            });
        }
        this.calendarWeeks = [];
        for (let i = 0; i < cells.length; i += 7) {
            this.calendarWeeks.push(cells.slice(i, i + 7));
        }
        this.monthModel = String(this.visibleMonth.getMonth());
        this.yearModel = String(this.visibleMonth.getFullYear());
    }
    isDateDisabled(date) {
        const normalized = this.startOfDay(date);
        const minDate = this.parseDate(this.config.minDate);
        const maxDate = this.parseDate(this.config.maxDate);
        if (minDate && normalized < minDate)
            return true;
        if (maxDate && normalized > maxDate)
            return true;
        if (this.config.disabledDaysOfWeek?.includes(normalized.getDay()))
            return true;
        return false;
    }
    parseDate(value) {
        if (!value)
            return null;
        const byFormat = this.tryParseByFormat(value, this.config?.dateFormat);
        if (byFormat)
            return this.startOfDay(byFormat);
        const localIso = value.trim().match(/^(\d{4})-(\d{2})-(\d{2})$/);
        if (localIso) {
            const year = Number(localIso[1]);
            const monthIndex = Number(localIso[2]) - 1;
            const day = Number(localIso[3]);
            const parsedLocal = new Date(year, monthIndex, day);
            if (parsedLocal.getFullYear() === year
                && parsedLocal.getMonth() === monthIndex
                && parsedLocal.getDate() === day) {
                return this.startOfDay(parsedLocal);
            }
        }
        const parsed = new Date(value);
        if (Number.isNaN(parsed.getTime()))
            return null;
        return this.startOfDay(parsed);
    }
    tryParseByFormat(value, format) {
        if (!format)
            return null;
        const normalized = format.toLowerCase();
        const text = value.trim();
        const parseThreePart = (a, b, c, yFirst = false) => {
            const year = yFirst ? a : (c < 100 ? 2000 + c : c);
            const monthIndex = (yFirst ? b : a) - 1;
            const day = yFirst ? c : b;
            const parsed = new Date(year, monthIndex, day);
            if (parsed.getFullYear() !== year || parsed.getMonth() !== monthIndex || parsed.getDate() !== day)
                return null;
            return parsed;
        };
        let match = null;
        if (normalized === 'mm/dd/yyyy' || normalized === 'm/d/yyyy') {
            match = text.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
            if (match)
                return parseThreePart(Number(match[1]), Number(match[2]), Number(match[3]));
        }
        if (normalized === 'mm-dd-yyyy' || normalized === 'm-d-yyyy') {
            match = text.match(/^(\d{1,2})-(\d{1,2})-(\d{4})$/);
            if (match)
                return parseThreePart(Number(match[1]), Number(match[2]), Number(match[3]));
        }
        if (normalized === 'dd/mm/yyyy' || normalized === 'd/m/yyyy') {
            match = text.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
            if (match)
                return parseThreePart(Number(match[2]), Number(match[1]), Number(match[3]));
        }
        if (normalized === 'dd-mm-yyyy' || normalized === 'd-m-yyyy') {
            match = text.match(/^(\d{1,2})-(\d{1,2})-(\d{4})$/);
            if (match)
                return parseThreePart(Number(match[2]), Number(match[1]), Number(match[3]));
        }
        if (normalized === 'm/d/yy' || normalized === 'mm/dd/yy') {
            match = text.match(/^(\d{1,2})\/(\d{1,2})\/(\d{2})$/);
            if (match)
                return parseThreePart(Number(match[1]), Number(match[2]), Number(match[3]));
        }
        if (normalized === 'm-d-yy' || normalized === 'mm-dd-yy') {
            match = text.match(/^(\d{1,2})-(\d{1,2})-(\d{2})$/);
            if (match)
                return parseThreePart(Number(match[1]), Number(match[2]), Number(match[3]));
        }
        if (normalized === 'd/m/yy' || normalized === 'dd/mm/yy') {
            match = text.match(/^(\d{1,2})\/(\d{1,2})\/(\d{2})$/);
            if (match)
                return parseThreePart(Number(match[2]), Number(match[1]), Number(match[3]));
        }
        if (normalized === 'd-m-yy' || normalized === 'dd-mm-yy') {
            match = text.match(/^(\d{1,2})-(\d{1,2})-(\d{2})$/);
            if (match)
                return parseThreePart(Number(match[2]), Number(match[1]), Number(match[3]));
        }
        if (normalized === 'yyyy-mm-dd') {
            match = text.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
            if (match)
                return parseThreePart(Number(match[1]), Number(match[2]), Number(match[3]), true);
        }
        return null;
    }
    toIsoDate(value) {
        const year = value.getFullYear();
        const month = String(value.getMonth() + 1).padStart(2, '0');
        const day = String(value.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
    formatDate(value, format) {
        const year = value.getFullYear();
        const month = value.getMonth() + 1;
        const day = value.getDate();
        const mm = String(month).padStart(2, '0');
        const dd = String(day).padStart(2, '0');
        const yy = String(year).slice(-2);
        const normalized = (format || 'yyyy-MM-dd').toLowerCase();
        if (normalized === 'mm/dd/yyyy')
            return `${mm}/${dd}/${year}`;
        if (normalized === 'm/d/yyyy')
            return `${month}/${day}/${year}`;
        if (normalized === 'mm-dd-yyyy')
            return `${mm}-${dd}-${year}`;
        if (normalized === 'm-d-yyyy')
            return `${month}-${day}-${year}`;
        if (normalized === 'dd/mm/yyyy')
            return `${dd}/${mm}/${year}`;
        if (normalized === 'd/m/yyyy')
            return `${day}/${month}/${year}`;
        if (normalized === 'dd-mm-yyyy')
            return `${dd}-${mm}-${year}`;
        if (normalized === 'd-m-yyyy')
            return `${day}-${month}-${year}`;
        if (normalized === 'm/d/yy')
            return `${month}/${day}/${yy}`;
        if (normalized === 'mm/dd/yy')
            return `${mm}/${dd}/${yy}`;
        if (normalized === 'm-d-yy')
            return `${month}-${day}-${yy}`;
        if (normalized === 'mm-dd-yy')
            return `${mm}-${dd}-${yy}`;
        if (normalized === 'd/m/yy')
            return `${day}/${month}/${yy}`;
        if (normalized === 'dd/mm/yy')
            return `${dd}/${mm}/${yy}`;
        if (normalized === 'd-m-yy')
            return `${day}-${month}-${yy}`;
        if (normalized === 'dd-mm-yy')
            return `${dd}-${mm}-${yy}`;
        return `${year}-${mm}-${dd}`;
    }
    startOfDay(value) {
        const date = new Date(value);
        date.setHours(0, 0, 0, 0);
        return date;
    }
    isSameDay(a, b) {
        return a.getFullYear() === b.getFullYear()
            && a.getMonth() === b.getMonth()
            && a.getDate() === b.getDate();
    }
    normalizeFirstDayOfWeek(day) {
        if (!Number.isInteger(day))
            return 0;
        return Math.min(Math.max(day, 0), 6);
    }
    get locale() {
        return this.config?.locale || 'en-US';
    }
    getOrderedDayHeaders() {
        const firstDay = this.normalizeFirstDayOfWeek(this.config?.firstDayOfWeek);
        return Array.from({ length: 7 }, (_, index) => {
            const dayIndex = (firstDay + index) % 7;
            const date = new Date(2024, 0, 7 + dayIndex);
            return date.toLocaleDateString(this.locale, { weekday: 'short' });
        });
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.19", ngImport: i0, type: CustomDateComponent, deps: [{ token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.19", type: CustomDateComponent, isStandalone: true, selector: "br-custom-date", inputs: { config: "config", showLibraryTag: "showLibraryTag" }, outputs: { dateChange: "dateChange", blurEvent: "blurEvent", focusEvent: "focusEvent", inputEvent: "inputEvent", changeEvent: "changeEvent", keydownEvent: "keydownEvent", keyupEvent: "keyupEvent", clickEvent: "clickEvent" }, host: { listeners: { "document:click": "onDocumentClick($event)", "keydown.escape": "onEscape()" } }, usesOnChanges: true, ngImport: i0, template: "<!-- Custom Date: Custom calendar implementation (non-native) -->\r\n<div class=\"custom-date-wrapper\" [ngClass]=\"wrapperClasses\" [ngStyle]=\"wrapperStyles\">\r\n    <label class=\"date-label\" *ngIf=\"config.label\">\r\n        {{ config.label }}\r\n        <span *ngIf=\"showLibraryTag\" class=\"br-lib-tag\" aria-label=\"Library package control\">LIB</span>\r\n        <span class=\"required-marker\" *ngIf=\"config.required\">*</span>\r\n    </label>\r\n\r\n    <div class=\"input-container\" [class.disabled]=\"config.disabled\" (click)=\"openCalendar($event)\">\r\n        <span class=\"input-icon\" *ngIf=\"config.uiConfig.showIcon\">\uD83D\uDCC5</span>\r\n\r\n        <input\r\n            type=\"text\"\r\n            class=\"date-input\"\r\n            [ngClass]=\"config.className\"\r\n            [attr.id]=\"config.id\"\r\n            [attr.name]=\"config.name\"\r\n            [value]=\"displayValue\"\r\n            [disabled]=\"config.disabled\"\r\n            [required]=\"config.required\"\r\n            [placeholder]=\"config.placeholder\"\r\n            readonly\r\n            (click)=\"openCalendar($event); clickEvent.emit($event)\"\r\n            (blur)=\"blurEvent.emit($event)\"\r\n            (focus)=\"focusEvent.emit($event)\"\r\n            (input)=\"inputEvent.emit($event)\"\r\n            (change)=\"changeEvent.emit($event)\"\r\n            (keydown)=\"keydownEvent.emit($event)\"\r\n            (keyup)=\"keyupEvent.emit($event)\"\r\n        />\r\n\r\n        <button\r\n            type=\"button\"\r\n            class=\"toggle-btn\"\r\n            [disabled]=\"config.disabled\"\r\n            (click)=\"toggleCalendar($event)\"\r\n            aria-label=\"Toggle calendar\"\r\n        >\r\n            \u25BE\r\n        </button>\r\n\r\n    </div>\r\n\r\n    <div class=\"calendar-popover\" *ngIf=\"isOpen\" (click)=\"$event.stopPropagation()\">\r\n        <div class=\"calendar-header\">\r\n            <button type=\"button\" class=\"nav-btn\" (click)=\"goToPreviousMonth($event)\" aria-label=\"Previous month\">\u2039</button>\r\n            <div class=\"month-year-switchers\">\r\n                <select class=\"month-select\" [(ngModel)]=\"monthModel\" (ngModelChange)=\"onMonthModelChange($event)\" (click)=\"$event.stopPropagation()\">\r\n                    <option *ngFor=\"let month of monthOptions\" [value]=\"month.value.toString()\">{{ month.label }}</option>\r\n                </select>\r\n                <select class=\"year-select\" [(ngModel)]=\"yearModel\" (ngModelChange)=\"onYearModelChange($event)\" (click)=\"$event.stopPropagation()\">\r\n                    <option *ngFor=\"let year of yearOptions\" [value]=\"year.toString()\">{{ year }}</option>\r\n                </select>\r\n            </div>\r\n            <button type=\"button\" class=\"nav-btn\" (click)=\"goToNextMonth($event)\" aria-label=\"Next month\">\u203A</button>\r\n        </div>\r\n\r\n        <div class=\"week-row week-head\">\r\n            <div class=\"week-cell\" *ngFor=\"let header of dayHeaders\">{{ header }}</div>\r\n        </div>\r\n\r\n        <div class=\"week-row\" *ngFor=\"let week of calendarWeeks; trackBy: trackByWeek\">\r\n            <button\r\n                type=\"button\"\r\n                class=\"day-cell\"\r\n                *ngFor=\"let cell of week; trackBy: trackByCell\"\r\n                [class.outside]=\"!cell.inMonth\"\r\n                [class.today]=\"cell.today\"\r\n                [class.selected]=\"cell.selected\"\r\n                [disabled]=\"cell.disabled\"\r\n                (click)=\"onCellClick(cell, $event)\"\r\n            >\r\n                {{ cell.day }}\r\n            </button>\r\n        </div>\r\n    </div>\r\n\r\n    <span class=\"error-text\" *ngIf=\"config.errorMessage\">\r\n        {{ config.errorMessage }}\r\n    </span>\r\n</div>\r\n", styles: ["@charset \"UTF-8\";.custom-date-wrapper{display:flex;flex-direction:column;gap:6px;max-width:320px;position:relative;--date-fontSize: 14px;--date-inputPaddingY: 8px;--date-inputPaddingX: 14px;--date-radius: 10px}.date-label{display:inline-flex;align-items:center;gap:8px;font-size:13px;font-weight:600;color:var(--br-label-font-color, #4a5568);letter-spacing:.3px}.date-label .required-marker{color:#e53e3e;margin-left:2px}.br-lib-tag{display:inline-flex;align-items:center;gap:5px;padding:2px 8px;border-radius:999px;background:linear-gradient(135deg,#e8f0fe,#d2e3fc);color:#174ea6;font-size:10px;font-weight:800;letter-spacing:.4px}.br-lib-tag:before{content:\"\";width:6px;height:6px;border-radius:50%;background:#174ea6}.input-container{display:flex;align-items:center;gap:8px;background:var(--br-input-background-color, #fff);border:2px solid var(--br-input-border-color, #e2e8f0);border-radius:var(--date-radius);padding:var(--date-inputPaddingY) var(--date-inputPaddingX);transition:all .2s;cursor:pointer}.input-container:focus-within{border-color:var(--br-focus-color, #667eea);box-shadow:0 0 0 3px var(--br-focus-ring-color, color-mix(in srgb, #667eea 15%, transparent))}.input-container.disabled{opacity:.6;cursor:not-allowed}.input-container .input-icon{font-size:16px}.input-container .date-input{flex:1;border:none;outline:none;font-size:var(--date-fontSize);color:var(--br-input-text-color, #2d3748);background:transparent;font-family:inherit;cursor:pointer}.input-container .date-input:disabled{cursor:not-allowed}.input-container .toggle-btn{border:none;background:transparent;font-size:12px;cursor:pointer;color:var(--br-label-font-color, #4a5568);padding:0 4px}.input-container .toggle-btn:disabled{cursor:not-allowed}.input-container .badge{background:linear-gradient(135deg,var(--br-primary-button-color, #667eea),var(--br-primary-button-hover-color, #764ba2));color:var(--br-primary-button-text-color, #fff);padding:2px 8px;border-radius:8px;font-size:10px;font-weight:600;letter-spacing:.5px;text-transform:uppercase;white-space:nowrap}.calendar-popover{position:absolute;top:calc(100% + 6px);left:0;width:min(320px,100%);background:var(--br-input-background-color, #fff);border:1px solid var(--br-section-border-color, #d6deee);border-radius:12px;box-shadow:0 12px 30px #0f172a29;padding:10px;z-index:10}.calendar-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:8px}.calendar-header .month-year-switchers{display:flex;align-items:center;gap:6px}.calendar-header .month-select,.calendar-header .year-select{border:1px solid var(--br-section-border-color, #d6deee);border-radius:8px;background:var(--br-input-background-color, #fff);color:var(--br-input-text-color, #243042);font-size:12px;font-weight:600;height:28px;padding:0 8px}.calendar-header .nav-btn{width:28px;height:28px;border-radius:8px;border:1px solid var(--br-section-border-color, #d6deee);background:color-mix(in srgb,var(--br-section-background-color, #f8faff) 88%,#fff);cursor:pointer;color:var(--br-input-text-color, #2d3748)}.calendar-header .nav-btn:hover{background:color-mix(in srgb,var(--br-focus-color, #2563eb) 10%,var(--br-section-background-color, #ffffff))}.week-row{display:grid;grid-template-columns:repeat(7,1fr);gap:4px;margin-bottom:4px}.week-head{margin-bottom:8px}.week-cell{text-align:center;font-size:11px;font-weight:700;color:var(--br-label-font-color, #5a6578)}.day-cell{border:1px solid transparent;border-radius:8px;background:transparent;height:32px;cursor:pointer;font-size:13px;color:var(--br-base-font-color, #223046)}.day-cell:hover:not(:disabled){background:color-mix(in srgb,var(--br-focus-color, #2563eb) 10%,var(--br-section-background-color, #ffffff));border-color:color-mix(in srgb,var(--br-focus-color, #2563eb) 35%,var(--br-section-border-color, #d4e0ff))}.day-cell.selected{background:var(--br-accent-color, var(--br-focus-color, #2563eb));color:var(--br-primary-button-text-color, #fff);border-color:var(--br-accent-color, var(--br-focus-color, #1d4ed8))}.day-cell.today:not(.selected){border-color:color-mix(in srgb,var(--br-focus-color, #2563eb) 45%,var(--br-section-border-color, #93c5fd));background:color-mix(in srgb,var(--br-focus-color, #2563eb) 12%,var(--br-section-background-color, #ffffff))}.day-cell.outside{color:var(--br-input-placeholder-color, #9aa4b5)}.day-cell:disabled{color:var(--br-input-disabled-text-color, #b6becd);background:var(--br-input-disabled-background-color, #f8fafc);cursor:not-allowed}.density-compact{--date-fontSize: 12px;--date-inputPaddingY: 6px;--date-inputPaddingX: 10px}.density-comfortable{--date-fontSize: 14px;--date-inputPaddingY: 8px;--date-inputPaddingX: 14px}.density-spacious{--date-fontSize: 16px;--date-inputPaddingY: 10px;--date-inputPaddingX: 16px}.size-sm{max-width:260px}.size-md{max-width:320px}.size-lg{max-width:420px}.variant-filled .input-container{background:var(--br-section-background-color, #f4f6fb)}.variant-plain .input-container{border-color:transparent;box-shadow:inset 0 -1px 0 var(--br-section-border-color, #d5dceb);border-radius:0}.error-text{font-size:12px;color:#e53e3e;padding-left:4px}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "ngmodule", type: FormsModule }, { kind: "directive", type: i2.NgSelectOption, selector: "option", inputs: ["ngValue", "value"] }, { kind: "directive", type: i2.ɵNgSelectMultipleOption, selector: "option", inputs: ["ngValue", "value"] }, { kind: "directive", type: i2.SelectControlValueAccessor, selector: "select:not([multiple])[formControlName],select:not([multiple])[formControl],select:not([multiple])[ngModel]", inputs: ["compareWith"] }, { kind: "directive", type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i2.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.19", ngImport: i0, type: CustomDateComponent, decorators: [{
            type: Component,
            args: [{ selector: 'br-custom-date', standalone: true, imports: [CommonModule, FormsModule], template: "<!-- Custom Date: Custom calendar implementation (non-native) -->\r\n<div class=\"custom-date-wrapper\" [ngClass]=\"wrapperClasses\" [ngStyle]=\"wrapperStyles\">\r\n    <label class=\"date-label\" *ngIf=\"config.label\">\r\n        {{ config.label }}\r\n        <span *ngIf=\"showLibraryTag\" class=\"br-lib-tag\" aria-label=\"Library package control\">LIB</span>\r\n        <span class=\"required-marker\" *ngIf=\"config.required\">*</span>\r\n    </label>\r\n\r\n    <div class=\"input-container\" [class.disabled]=\"config.disabled\" (click)=\"openCalendar($event)\">\r\n        <span class=\"input-icon\" *ngIf=\"config.uiConfig.showIcon\">\uD83D\uDCC5</span>\r\n\r\n        <input\r\n            type=\"text\"\r\n            class=\"date-input\"\r\n            [ngClass]=\"config.className\"\r\n            [attr.id]=\"config.id\"\r\n            [attr.name]=\"config.name\"\r\n            [value]=\"displayValue\"\r\n            [disabled]=\"config.disabled\"\r\n            [required]=\"config.required\"\r\n            [placeholder]=\"config.placeholder\"\r\n            readonly\r\n            (click)=\"openCalendar($event); clickEvent.emit($event)\"\r\n            (blur)=\"blurEvent.emit($event)\"\r\n            (focus)=\"focusEvent.emit($event)\"\r\n            (input)=\"inputEvent.emit($event)\"\r\n            (change)=\"changeEvent.emit($event)\"\r\n            (keydown)=\"keydownEvent.emit($event)\"\r\n            (keyup)=\"keyupEvent.emit($event)\"\r\n        />\r\n\r\n        <button\r\n            type=\"button\"\r\n            class=\"toggle-btn\"\r\n            [disabled]=\"config.disabled\"\r\n            (click)=\"toggleCalendar($event)\"\r\n            aria-label=\"Toggle calendar\"\r\n        >\r\n            \u25BE\r\n        </button>\r\n\r\n    </div>\r\n\r\n    <div class=\"calendar-popover\" *ngIf=\"isOpen\" (click)=\"$event.stopPropagation()\">\r\n        <div class=\"calendar-header\">\r\n            <button type=\"button\" class=\"nav-btn\" (click)=\"goToPreviousMonth($event)\" aria-label=\"Previous month\">\u2039</button>\r\n            <div class=\"month-year-switchers\">\r\n                <select class=\"month-select\" [(ngModel)]=\"monthModel\" (ngModelChange)=\"onMonthModelChange($event)\" (click)=\"$event.stopPropagation()\">\r\n                    <option *ngFor=\"let month of monthOptions\" [value]=\"month.value.toString()\">{{ month.label }}</option>\r\n                </select>\r\n                <select class=\"year-select\" [(ngModel)]=\"yearModel\" (ngModelChange)=\"onYearModelChange($event)\" (click)=\"$event.stopPropagation()\">\r\n                    <option *ngFor=\"let year of yearOptions\" [value]=\"year.toString()\">{{ year }}</option>\r\n                </select>\r\n            </div>\r\n            <button type=\"button\" class=\"nav-btn\" (click)=\"goToNextMonth($event)\" aria-label=\"Next month\">\u203A</button>\r\n        </div>\r\n\r\n        <div class=\"week-row week-head\">\r\n            <div class=\"week-cell\" *ngFor=\"let header of dayHeaders\">{{ header }}</div>\r\n        </div>\r\n\r\n        <div class=\"week-row\" *ngFor=\"let week of calendarWeeks; trackBy: trackByWeek\">\r\n            <button\r\n                type=\"button\"\r\n                class=\"day-cell\"\r\n                *ngFor=\"let cell of week; trackBy: trackByCell\"\r\n                [class.outside]=\"!cell.inMonth\"\r\n                [class.today]=\"cell.today\"\r\n                [class.selected]=\"cell.selected\"\r\n                [disabled]=\"cell.disabled\"\r\n                (click)=\"onCellClick(cell, $event)\"\r\n            >\r\n                {{ cell.day }}\r\n            </button>\r\n        </div>\r\n    </div>\r\n\r\n    <span class=\"error-text\" *ngIf=\"config.errorMessage\">\r\n        {{ config.errorMessage }}\r\n    </span>\r\n</div>\r\n", styles: ["@charset \"UTF-8\";.custom-date-wrapper{display:flex;flex-direction:column;gap:6px;max-width:320px;position:relative;--date-fontSize: 14px;--date-inputPaddingY: 8px;--date-inputPaddingX: 14px;--date-radius: 10px}.date-label{display:inline-flex;align-items:center;gap:8px;font-size:13px;font-weight:600;color:var(--br-label-font-color, #4a5568);letter-spacing:.3px}.date-label .required-marker{color:#e53e3e;margin-left:2px}.br-lib-tag{display:inline-flex;align-items:center;gap:5px;padding:2px 8px;border-radius:999px;background:linear-gradient(135deg,#e8f0fe,#d2e3fc);color:#174ea6;font-size:10px;font-weight:800;letter-spacing:.4px}.br-lib-tag:before{content:\"\";width:6px;height:6px;border-radius:50%;background:#174ea6}.input-container{display:flex;align-items:center;gap:8px;background:var(--br-input-background-color, #fff);border:2px solid var(--br-input-border-color, #e2e8f0);border-radius:var(--date-radius);padding:var(--date-inputPaddingY) var(--date-inputPaddingX);transition:all .2s;cursor:pointer}.input-container:focus-within{border-color:var(--br-focus-color, #667eea);box-shadow:0 0 0 3px var(--br-focus-ring-color, color-mix(in srgb, #667eea 15%, transparent))}.input-container.disabled{opacity:.6;cursor:not-allowed}.input-container .input-icon{font-size:16px}.input-container .date-input{flex:1;border:none;outline:none;font-size:var(--date-fontSize);color:var(--br-input-text-color, #2d3748);background:transparent;font-family:inherit;cursor:pointer}.input-container .date-input:disabled{cursor:not-allowed}.input-container .toggle-btn{border:none;background:transparent;font-size:12px;cursor:pointer;color:var(--br-label-font-color, #4a5568);padding:0 4px}.input-container .toggle-btn:disabled{cursor:not-allowed}.input-container .badge{background:linear-gradient(135deg,var(--br-primary-button-color, #667eea),var(--br-primary-button-hover-color, #764ba2));color:var(--br-primary-button-text-color, #fff);padding:2px 8px;border-radius:8px;font-size:10px;font-weight:600;letter-spacing:.5px;text-transform:uppercase;white-space:nowrap}.calendar-popover{position:absolute;top:calc(100% + 6px);left:0;width:min(320px,100%);background:var(--br-input-background-color, #fff);border:1px solid var(--br-section-border-color, #d6deee);border-radius:12px;box-shadow:0 12px 30px #0f172a29;padding:10px;z-index:10}.calendar-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:8px}.calendar-header .month-year-switchers{display:flex;align-items:center;gap:6px}.calendar-header .month-select,.calendar-header .year-select{border:1px solid var(--br-section-border-color, #d6deee);border-radius:8px;background:var(--br-input-background-color, #fff);color:var(--br-input-text-color, #243042);font-size:12px;font-weight:600;height:28px;padding:0 8px}.calendar-header .nav-btn{width:28px;height:28px;border-radius:8px;border:1px solid var(--br-section-border-color, #d6deee);background:color-mix(in srgb,var(--br-section-background-color, #f8faff) 88%,#fff);cursor:pointer;color:var(--br-input-text-color, #2d3748)}.calendar-header .nav-btn:hover{background:color-mix(in srgb,var(--br-focus-color, #2563eb) 10%,var(--br-section-background-color, #ffffff))}.week-row{display:grid;grid-template-columns:repeat(7,1fr);gap:4px;margin-bottom:4px}.week-head{margin-bottom:8px}.week-cell{text-align:center;font-size:11px;font-weight:700;color:var(--br-label-font-color, #5a6578)}.day-cell{border:1px solid transparent;border-radius:8px;background:transparent;height:32px;cursor:pointer;font-size:13px;color:var(--br-base-font-color, #223046)}.day-cell:hover:not(:disabled){background:color-mix(in srgb,var(--br-focus-color, #2563eb) 10%,var(--br-section-background-color, #ffffff));border-color:color-mix(in srgb,var(--br-focus-color, #2563eb) 35%,var(--br-section-border-color, #d4e0ff))}.day-cell.selected{background:var(--br-accent-color, var(--br-focus-color, #2563eb));color:var(--br-primary-button-text-color, #fff);border-color:var(--br-accent-color, var(--br-focus-color, #1d4ed8))}.day-cell.today:not(.selected){border-color:color-mix(in srgb,var(--br-focus-color, #2563eb) 45%,var(--br-section-border-color, #93c5fd));background:color-mix(in srgb,var(--br-focus-color, #2563eb) 12%,var(--br-section-background-color, #ffffff))}.day-cell.outside{color:var(--br-input-placeholder-color, #9aa4b5)}.day-cell:disabled{color:var(--br-input-disabled-text-color, #b6becd);background:var(--br-input-disabled-background-color, #f8fafc);cursor:not-allowed}.density-compact{--date-fontSize: 12px;--date-inputPaddingY: 6px;--date-inputPaddingX: 10px}.density-comfortable{--date-fontSize: 14px;--date-inputPaddingY: 8px;--date-inputPaddingX: 14px}.density-spacious{--date-fontSize: 16px;--date-inputPaddingY: 10px;--date-inputPaddingX: 16px}.size-sm{max-width:260px}.size-md{max-width:320px}.size-lg{max-width:420px}.variant-filled .input-container{background:var(--br-section-background-color, #f4f6fb)}.variant-plain .input-container{border-color:transparent;box-shadow:inset 0 -1px 0 var(--br-section-border-color, #d5dceb);border-radius:0}.error-text{font-size:12px;color:#e53e3e;padding-left:4px}\n"] }]
        }], ctorParameters: () => [{ type: i0.ElementRef }], propDecorators: { config: [{
                type: Input
            }], showLibraryTag: [{
                type: Input
            }], dateChange: [{
                type: Output
            }], blurEvent: [{
                type: Output
            }], focusEvent: [{
                type: Output
            }], inputEvent: [{
                type: Output
            }], changeEvent: [{
                type: Output
            }], keydownEvent: [{
                type: Output
            }], keyupEvent: [{
                type: Output
            }], clickEvent: [{
                type: Output
            }], onDocumentClick: [{
                type: HostListener,
                args: ['document:click', ['$event']]
            }], onEscape: [{
                type: HostListener,
                args: ['keydown.escape']
            }] } });

class MaterialDateCalendarHeaderComponent {
    calendar = inject((MatCalendar));
    dateAdapter = inject((DateAdapter$1));
    subscription;
    monthModel = '0';
    yearModel = '';
    constructor() {
        this.syncModels();
        this.subscription = this.calendar.stateChanges.subscribe(() => this.syncModels());
    }
    get selectedMonth() {
        return this.calendar.activeDate.getMonth();
    }
    get selectedYear() {
        return this.calendar.activeDate.getFullYear();
    }
    get monthOptions() {
        const names = this.dateAdapter.getMonthNames('long');
        return names.map((label, value) => ({ value, label }));
    }
    get yearOptions() {
        const minYear = this.calendar.minDate?.getFullYear() ?? (this.selectedYear - 100);
        const maxYear = this.calendar.maxDate?.getFullYear() ?? (this.selectedYear + 100);
        const start = Math.min(minYear, maxYear);
        const end = Math.max(minYear, maxYear);
        const result = [];
        for (let year = start; year <= end; year += 1) {
            result.push(year);
        }
        return result;
    }
    previousClicked() {
        const prev = new Date(this.selectedYear, this.selectedMonth - 1, 1);
        this.setActiveDate(prev);
    }
    nextClicked() {
        const next = new Date(this.selectedYear, this.selectedMonth + 1, 1);
        this.setActiveDate(next);
    }
    onMonthModelChange(value) {
        const month = Number(value);
        if (!Number.isInteger(month) || month < 0 || month > 11)
            return;
        this.setActiveDate(new Date(this.selectedYear, month, 1));
    }
    onYearModelChange(value) {
        const year = Number(value);
        if (!Number.isInteger(year))
            return;
        this.setActiveDate(new Date(year, this.selectedMonth, 1));
    }
    setActiveDate(date) {
        let next = new Date(date.getFullYear(), date.getMonth(), 1);
        if (this.calendar.minDate && next < new Date(this.calendar.minDate.getFullYear(), this.calendar.minDate.getMonth(), 1)) {
            next = new Date(this.calendar.minDate.getFullYear(), this.calendar.minDate.getMonth(), 1);
        }
        if (this.calendar.maxDate && next > new Date(this.calendar.maxDate.getFullYear(), this.calendar.maxDate.getMonth(), 1)) {
            next = new Date(this.calendar.maxDate.getFullYear(), this.calendar.maxDate.getMonth(), 1);
        }
        this.calendar.activeDate = next;
        this.calendar.stateChanges.next();
        this.syncModels();
    }
    syncModels() {
        this.monthModel = String(this.calendar.activeDate.getMonth());
        this.yearModel = String(this.calendar.activeDate.getFullYear());
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.19", ngImport: i0, type: MaterialDateCalendarHeaderComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.19", type: MaterialDateCalendarHeaderComponent, isStandalone: true, selector: "br-material-date-calendar-header", ngImport: i0, template: `
    <div class="calendar-header">
      <button type="button" class="nav-btn" (click)="previousClicked()" aria-label="Previous month">‹</button>
      <div class="month-year-switchers">
        <select class="month-select" [(ngModel)]="monthModel" (ngModelChange)="onMonthModelChange($event)">
          <option *ngFor="let month of monthOptions" [value]="month.value.toString()">{{ month.label }}</option>
        </select>
        <select class="year-select" [(ngModel)]="yearModel" (ngModelChange)="onYearModelChange($event)">
          <option *ngFor="let year of yearOptions" [value]="year.toString()">{{ year }}</option>
        </select>
      </div>
      <button type="button" class="nav-btn" (click)="nextClicked()" aria-label="Next month">›</button>
    </div>
  `, isInline: true, styles: [".calendar-header{display:flex;align-items:center;justify-content:space-between;padding:6px 8px 4px;gap:8px}.month-year-switchers{display:flex;align-items:center;gap:6px;min-width:0;flex:1;justify-content:center}.month-select,.year-select{border:1px solid #d6deee;border-radius:8px;background:#fff;color:#243042;font-size:12px;font-weight:600;height:28px;padding:0 8px;max-width:120px}.year-select{max-width:86px}.nav-btn{width:28px;height:28px;border-radius:8px;border:1px solid #d6deee;background:#f8faff;cursor:pointer;color:#2d3748;line-height:1}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "ngmodule", type: FormsModule }, { kind: "directive", type: i2.NgSelectOption, selector: "option", inputs: ["ngValue", "value"] }, { kind: "directive", type: i2.ɵNgSelectMultipleOption, selector: "option", inputs: ["ngValue", "value"] }, { kind: "directive", type: i2.SelectControlValueAccessor, selector: "select:not([multiple])[formControlName],select:not([multiple])[formControl],select:not([multiple])[ngModel]", inputs: ["compareWith"] }, { kind: "directive", type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i2.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.19", ngImport: i0, type: MaterialDateCalendarHeaderComponent, decorators: [{
            type: Component,
            args: [{ selector: 'br-material-date-calendar-header', standalone: true, imports: [CommonModule, FormsModule], template: `
    <div class="calendar-header">
      <button type="button" class="nav-btn" (click)="previousClicked()" aria-label="Previous month">‹</button>
      <div class="month-year-switchers">
        <select class="month-select" [(ngModel)]="monthModel" (ngModelChange)="onMonthModelChange($event)">
          <option *ngFor="let month of monthOptions" [value]="month.value.toString()">{{ month.label }}</option>
        </select>
        <select class="year-select" [(ngModel)]="yearModel" (ngModelChange)="onYearModelChange($event)">
          <option *ngFor="let year of yearOptions" [value]="year.toString()">{{ year }}</option>
        </select>
      </div>
      <button type="button" class="nav-btn" (click)="nextClicked()" aria-label="Next month">›</button>
    </div>
  `, changeDetection: ChangeDetectionStrategy.OnPush, styles: [".calendar-header{display:flex;align-items:center;justify-content:space-between;padding:6px 8px 4px;gap:8px}.month-year-switchers{display:flex;align-items:center;gap:6px;min-width:0;flex:1;justify-content:center}.month-select,.year-select{border:1px solid #d6deee;border-radius:8px;background:#fff;color:#243042;font-size:12px;font-weight:600;height:28px;padding:0 8px;max-width:120px}.year-select{max-width:86px}.nav-btn{width:28px;height:28px;border-radius:8px;border:1px solid #d6deee;background:#f8faff;cursor:pointer;color:#2d3748;line-height:1}\n"] }]
        }], ctorParameters: () => [] });

/**
 * ============================================================
 * MATERIAL DATE IMPLEMENTATION
 * ============================================================
 * Uses Angular Material's mat-datepicker with mat-form-field.
 * Only loaded when UI_MODE === 'MATERIAL'.
 * ============================================================
 */
class DynamicFirstDayNativeDateAdapter extends NativeDateAdapter {
    firstDayOfWeek = 0;
    dateFormat = 'yyyy-MM-dd';
    getFirstDayOfWeek() {
        return this.firstDayOfWeek;
    }
    setFirstDayOfWeek(day) {
        this.firstDayOfWeek = Number.isInteger(day) ? Math.min(Math.max(day, 0), 6) : 0;
    }
    setDateFormat(format) {
        this.dateFormat = (format || 'yyyy-MM-dd').trim();
    }
    format(date) {
        if (!this.isValid(date))
            return '';
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const mm = String(month).padStart(2, '0');
        const dd = String(day).padStart(2, '0');
        const yy = String(year).slice(-2);
        const fmt = this.dateFormat.toLowerCase();
        if (fmt === 'mm/dd/yyyy')
            return `${mm}/${dd}/${year}`;
        if (fmt === 'm/d/yyyy')
            return `${month}/${day}/${year}`;
        if (fmt === 'mm-dd-yyyy')
            return `${mm}-${dd}-${year}`;
        if (fmt === 'm-d-yyyy')
            return `${month}-${day}-${year}`;
        if (fmt === 'dd/mm/yyyy')
            return `${dd}/${mm}/${year}`;
        if (fmt === 'd/m/yyyy')
            return `${day}/${month}/${year}`;
        if (fmt === 'dd-mm-yyyy')
            return `${dd}-${mm}-${year}`;
        if (fmt === 'd-m-yyyy')
            return `${day}-${month}-${year}`;
        if (fmt === 'm/d/yy')
            return `${month}/${day}/${yy}`;
        if (fmt === 'mm/dd/yy')
            return `${mm}/${dd}/${yy}`;
        if (fmt === 'm-d-yy')
            return `${month}-${day}-${yy}`;
        if (fmt === 'mm-dd-yy')
            return `${mm}-${dd}-${yy}`;
        if (fmt === 'd/m/yy')
            return `${day}/${month}/${yy}`;
        if (fmt === 'dd/mm/yy')
            return `${dd}/${mm}/${yy}`;
        if (fmt === 'd-m-yy')
            return `${day}-${month}-${yy}`;
        if (fmt === 'dd-mm-yy')
            return `${dd}-${mm}-${yy}`;
        return `${year}-${mm}-${dd}`;
    }
    parse(value) {
        if (value instanceof Date)
            return this.isValid(value) ? value : null;
        if (typeof value !== 'string')
            return null;
        const text = value.trim();
        if (!text)
            return null;
        const buildDate = (year, month, day) => {
            const monthIndex = month - 1;
            const parsed = new Date(year, monthIndex, day);
            if (parsed.getFullYear() !== year || parsed.getMonth() !== monthIndex || parsed.getDate() !== day)
                return null;
            return parsed;
        };
        const fmt = this.dateFormat.toLowerCase();
        let match = null;
        if (fmt === 'yyyy-mm-dd') {
            match = text.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
            if (match)
                return buildDate(Number(match[1]), Number(match[2]), Number(match[3]));
        }
        if (fmt === 'mm/dd/yyyy' || fmt === 'm/d/yyyy') {
            match = text.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
            if (match)
                return buildDate(Number(match[3]), Number(match[1]), Number(match[2]));
        }
        if (fmt === 'mm-dd-yyyy' || fmt === 'm-d-yyyy') {
            match = text.match(/^(\d{1,2})-(\d{1,2})-(\d{4})$/);
            if (match)
                return buildDate(Number(match[3]), Number(match[1]), Number(match[2]));
        }
        if (fmt === 'dd/mm/yyyy' || fmt === 'd/m/yyyy') {
            match = text.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
            if (match)
                return buildDate(Number(match[3]), Number(match[2]), Number(match[1]));
        }
        if (fmt === 'dd-mm-yyyy' || fmt === 'd-m-yyyy') {
            match = text.match(/^(\d{1,2})-(\d{1,2})-(\d{4})$/);
            if (match)
                return buildDate(Number(match[3]), Number(match[2]), Number(match[1]));
        }
        if (fmt === 'm/d/yy' || fmt === 'mm/dd/yy') {
            match = text.match(/^(\d{1,2})\/(\d{1,2})\/(\d{2})$/);
            if (match)
                return buildDate(2000 + Number(match[3]), Number(match[1]), Number(match[2]));
        }
        if (fmt === 'm-d-yy' || fmt === 'mm-dd-yy') {
            match = text.match(/^(\d{1,2})-(\d{1,2})-(\d{2})$/);
            if (match)
                return buildDate(2000 + Number(match[3]), Number(match[1]), Number(match[2]));
        }
        if (fmt === 'd/m/yy' || fmt === 'dd/mm/yy') {
            match = text.match(/^(\d{1,2})\/(\d{1,2})\/(\d{2})$/);
            if (match)
                return buildDate(2000 + Number(match[3]), Number(match[2]), Number(match[1]));
        }
        if (fmt === 'd-m-yy' || fmt === 'dd-mm-yy') {
            match = text.match(/^(\d{1,2})-(\d{1,2})-(\d{2})$/);
            if (match)
                return buildDate(2000 + Number(match[3]), Number(match[2]), Number(match[1]));
        }
        const fallback = new Date(text);
        return this.isValid(fallback) ? fallback : null;
    }
}
class MaterialDateComponent {
    dateAdapter;
    config;
    showLibraryTag = false;
    dateChange = new EventEmitter();
    blurEvent = new EventEmitter();
    focusEvent = new EventEmitter();
    inputEvent = new EventEmitter();
    changeEvent = new EventEmitter();
    keydownEvent = new EventEmitter();
    keyupEvent = new EventEmitter();
    clickEvent = new EventEmitter();
    calendarHeader = MaterialDateCalendarHeaderComponent;
    constructor(dateAdapter) {
        this.dateAdapter = dateAdapter;
    }
    ngOnChanges(changes) {
        if (!changes['config'] || !this.config)
            return;
        const adapter = this.dateAdapter;
        adapter.setLocale(this.config.locale || 'en-US');
        adapter.setFirstDayOfWeek(this.config.firstDayOfWeek ?? 0);
        adapter.setDateFormat(this.config.dateFormat || 'yyyy-MM-dd');
    }
    dateFilter = (date) => {
        if (!date)
            return true;
        if (this.config?.disabledDaysOfWeek?.includes(date.getDay()))
            return false;
        return true;
    };
    get wrapperClasses() {
        const classes = [
            `density-${this.config.uiConfig.density}`,
            `size-${this.config.uiConfig.size}`,
            `variant-${this.config.uiConfig.variant}`,
        ];
        if (this.config.uiConfig.className) {
            classes.push(this.config.uiConfig.className);
        }
        return classes;
    }
    get wrapperStyles() {
        const styles = {};
        Object.entries(this.config.uiConfig.tokens || {}).forEach(([key, value]) => {
            styles[`--date-${key}`] = String(value);
        });
        return styles;
    }
    get appearance() {
        return this.config.uiConfig.variant === 'filled' ? 'fill' : 'outline';
    }
    get startAt() {
        return this.config?.value ?? new Date();
    }
    onDateChange(value) {
        if (value && this.config?.disabledDaysOfWeek?.includes(value.getDay())) {
            this.dateChange.emit(null);
            return;
        }
        this.dateChange.emit(value);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.19", ngImport: i0, type: MaterialDateComponent, deps: [{ token: i1$1.DateAdapter }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.19", type: MaterialDateComponent, isStandalone: true, selector: "br-material-date", inputs: { config: "config", showLibraryTag: "showLibraryTag" }, outputs: { dateChange: "dateChange", blurEvent: "blurEvent", focusEvent: "focusEvent", inputEvent: "inputEvent", changeEvent: "changeEvent", keydownEvent: "keydownEvent", keyupEvent: "keyupEvent", clickEvent: "clickEvent" }, providers: [{ provide: DateAdapter$1, useClass: DynamicFirstDayNativeDateAdapter }], usesOnChanges: true, ngImport: i0, template: "<!-- Material Date: Angular Material Datepicker Implementation -->\r\n<div class=\"material-date-wrapper\" [ngClass]=\"wrapperClasses\" [ngStyle]=\"wrapperStyles\">\r\n    <mat-form-field [appearance]=\"appearance\" class=\"date-field\">\r\n        <mat-label class=\"br-material-label\">{{ config.label }}\r\n            <span *ngIf=\"showLibraryTag\" class=\"br-lib-tag\" aria-label=\"Library package control\">LIB</span>\r\n            <span class=\"required-marker\" *ngIf=\"config.required\"> *</span>\r\n        </mat-label>\r\n        <input matInput [ngClass]=\"config.className\" [attr.id]=\"config.id\" [attr.name]=\"config.name\" [matDatepicker]=\"picker\"\r\n            [ngModel]=\"config.value\" (ngModelChange)=\"onDateChange($event)\" [min]=\"config.minDate\" [max]=\"config.maxDate\"\r\n            [disabled]=\"config.disabled\" [required]=\"config.required\" [placeholder]=\"config.placeholder\"\r\n            [matDatepickerFilter]=\"dateFilter\" (blur)=\"blurEvent.emit($event)\" (focus)=\"focusEvent.emit($event)\"\r\n            (input)=\"inputEvent.emit($event)\" (change)=\"changeEvent.emit($event)\" (keydown)=\"keydownEvent.emit($event)\"\r\n            (keyup)=\"keyupEvent.emit($event)\" (click)=\"clickEvent.emit($event)\">\r\n        <mat-datepicker-toggle *ngIf=\"config.uiConfig.showIcon\" matIconSuffix [for]=\"picker\"></mat-datepicker-toggle>\r\n        <mat-datepicker #picker [startAt]=\"startAt\" [calendarHeaderComponent]=\"calendarHeader\"></mat-datepicker>\r\n        <mat-hint *ngIf=\"config.errorMessage\">{{ config.errorMessage }}</mat-hint>\r\n    </mat-form-field>\r\n</div>\r\n", styles: [".material-date-wrapper{display:flex;align-items:flex-start;gap:10px;max-width:360px;--date-fieldWidth: 1fr;--date-badgeMarginTop: 12px;--date-badgeSize: 10px;--date-scale: 1;font-family:var(--br-font-family, Tahoma, Arial, sans-serif)}.material-date-wrapper .date-field{flex:var(--date-fieldWidth);transform:scale(var(--date-scale));transform-origin:left center}.material-date-wrapper .badge{margin-top:var(--date-badgeMarginTop);background:linear-gradient(135deg,var(--br-primary-button-color, #43a047),var(--br-primary-button-hover-color, #1b5e20));color:var(--br-primary-button-text-color, #fff);padding:3px 10px;border-radius:8px;font-size:var(--date-badgeSize);font-weight:600;letter-spacing:.5px;text-transform:uppercase;white-space:nowrap}.material-date-wrapper .required-marker{color:#e53e3e}.br-material-label{display:inline-flex;align-items:center;gap:8px;color:var(--br-label-font-color, #1f2a3d)}.br-lib-tag{display:inline-flex;align-items:center;gap:5px;padding:2px 8px;border-radius:999px;background:linear-gradient(135deg,#e8f0fe,#d2e3fc);color:#174ea6;font-size:10px;font-weight:800;letter-spacing:.4px}.br-lib-tag:before{content:\"\";width:6px;height:6px;border-radius:50%;background:#174ea6}:host ::ng-deep .date-field .mat-mdc-form-field-subscript-wrapper{display:none}:host ::ng-deep .date-field .mdc-text-field--outlined{background:var(--br-input-background-color, #ffffff)}:host ::ng-deep .date-field .mdc-notched-outline__leading,:host ::ng-deep .date-field .mdc-notched-outline__notch,:host ::ng-deep .date-field .mdc-notched-outline__trailing{border-color:var(--br-input-border-color, #c8d5e6)}:host ::ng-deep .date-field.mat-focused .mdc-notched-outline__leading,:host ::ng-deep .date-field.mat-focused .mdc-notched-outline__notch,:host ::ng-deep .date-field.mat-focused .mdc-notched-outline__trailing{border-color:var(--br-focus-color, #2563eb)}:host ::ng-deep .date-field .mdc-text-field__input{color:var(--br-input-text-color, #1f2a3d);caret-color:var(--br-focus-color, #2563eb);font-family:var(--br-font-family, Tahoma, Arial, sans-serif);font-size:var(--br-base-font-size, 14px)}:host ::ng-deep .date-field .mdc-floating-label,:host ::ng-deep .date-field .mat-mdc-form-field-label,:host ::ng-deep .date-field .mat-datepicker-toggle{color:var(--br-label-font-color, #1f2a3d)}:host ::ng-deep .mat-calendar{background:var(--br-section-background-color, #ffffff);color:var(--br-base-font-color, #1f2a3d)}:host ::ng-deep .mat-calendar-body-selected{background-color:var(--br-accent-color, var(--br-focus-color, #2563eb))!important;color:var(--br-primary-button-text-color, #ffffff)!important}:host ::ng-deep .mat-calendar-body-today:not(.mat-calendar-body-selected){border-color:var(--br-focus-color, #2563eb)!important}:host ::ng-deep .mat-calendar-body-cell-content,:host ::ng-deep .mat-calendar-table-header th{color:var(--br-base-font-color, #1f2a3d)}.density-compact{--date-scale: .92}.density-comfortable{--date-scale: 1}.density-spacious{--date-scale: 1.06}.size-sm{max-width:280px}.size-md{max-width:360px}.size-lg{max-width:460px}.variant-plain ::ng-deep .mat-mdc-text-field-wrapper{background:transparent!important;border-bottom:1px solid var(--br-section-border-color, #d2d7e6);border-radius:0!important}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "ngmodule", type: FormsModule }, { kind: "directive", type: i2.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i2.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }, { kind: "directive", type: i2.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { kind: "ngmodule", type: MatFormFieldModule }, { kind: "component", type: i3$2.MatFormField, selector: "mat-form-field", inputs: ["hideRequiredMarker", "color", "floatLabel", "appearance", "subscriptSizing", "hintLabel"], exportAs: ["matFormField"] }, { kind: "directive", type: i3$2.MatLabel, selector: "mat-label" }, { kind: "directive", type: i3$2.MatHint, selector: "mat-hint", inputs: ["align", "id"] }, { kind: "directive", type: i3$2.MatSuffix, selector: "[matSuffix], [matIconSuffix], [matTextSuffix]", inputs: ["matTextSuffix"] }, { kind: "ngmodule", type: MatInputModule }, { kind: "directive", type: i3$2.MatInput, selector: "input[matInput], textarea[matInput], select[matNativeControl],      input[matNativeControl], textarea[matNativeControl]", inputs: ["disabled", "id", "placeholder", "name", "required", "type", "errorStateMatcher", "aria-describedby", "value", "readonly", "disabledInteractive"], exportAs: ["matInput"] }, { kind: "ngmodule", type: MatDatepickerModule }, { kind: "component", type: i5$3.MatDatepicker, selector: "mat-datepicker", exportAs: ["matDatepicker"] }, { kind: "directive", type: i5$3.MatDatepickerInput, selector: "input[matDatepicker]", inputs: ["matDatepicker", "min", "max", "matDatepickerFilter"], exportAs: ["matDatepickerInput"] }, { kind: "component", type: i5$3.MatDatepickerToggle, selector: "mat-datepicker-toggle", inputs: ["for", "tabIndex", "aria-label", "disabled", "disableRipple"], exportAs: ["matDatepickerToggle"] }, { kind: "ngmodule", type: MatNativeDateModule }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.19", ngImport: i0, type: MaterialDateComponent, decorators: [{
            type: Component,
            args: [{ selector: 'br-material-date', standalone: true, imports: [
                        CommonModule,
                        FormsModule,
                        MatFormFieldModule,
                        MatInputModule,
                        MatDatepickerModule,
                        MatNativeDateModule,
                    ], providers: [{ provide: DateAdapter$1, useClass: DynamicFirstDayNativeDateAdapter }], template: "<!-- Material Date: Angular Material Datepicker Implementation -->\r\n<div class=\"material-date-wrapper\" [ngClass]=\"wrapperClasses\" [ngStyle]=\"wrapperStyles\">\r\n    <mat-form-field [appearance]=\"appearance\" class=\"date-field\">\r\n        <mat-label class=\"br-material-label\">{{ config.label }}\r\n            <span *ngIf=\"showLibraryTag\" class=\"br-lib-tag\" aria-label=\"Library package control\">LIB</span>\r\n            <span class=\"required-marker\" *ngIf=\"config.required\"> *</span>\r\n        </mat-label>\r\n        <input matInput [ngClass]=\"config.className\" [attr.id]=\"config.id\" [attr.name]=\"config.name\" [matDatepicker]=\"picker\"\r\n            [ngModel]=\"config.value\" (ngModelChange)=\"onDateChange($event)\" [min]=\"config.minDate\" [max]=\"config.maxDate\"\r\n            [disabled]=\"config.disabled\" [required]=\"config.required\" [placeholder]=\"config.placeholder\"\r\n            [matDatepickerFilter]=\"dateFilter\" (blur)=\"blurEvent.emit($event)\" (focus)=\"focusEvent.emit($event)\"\r\n            (input)=\"inputEvent.emit($event)\" (change)=\"changeEvent.emit($event)\" (keydown)=\"keydownEvent.emit($event)\"\r\n            (keyup)=\"keyupEvent.emit($event)\" (click)=\"clickEvent.emit($event)\">\r\n        <mat-datepicker-toggle *ngIf=\"config.uiConfig.showIcon\" matIconSuffix [for]=\"picker\"></mat-datepicker-toggle>\r\n        <mat-datepicker #picker [startAt]=\"startAt\" [calendarHeaderComponent]=\"calendarHeader\"></mat-datepicker>\r\n        <mat-hint *ngIf=\"config.errorMessage\">{{ config.errorMessage }}</mat-hint>\r\n    </mat-form-field>\r\n</div>\r\n", styles: [".material-date-wrapper{display:flex;align-items:flex-start;gap:10px;max-width:360px;--date-fieldWidth: 1fr;--date-badgeMarginTop: 12px;--date-badgeSize: 10px;--date-scale: 1;font-family:var(--br-font-family, Tahoma, Arial, sans-serif)}.material-date-wrapper .date-field{flex:var(--date-fieldWidth);transform:scale(var(--date-scale));transform-origin:left center}.material-date-wrapper .badge{margin-top:var(--date-badgeMarginTop);background:linear-gradient(135deg,var(--br-primary-button-color, #43a047),var(--br-primary-button-hover-color, #1b5e20));color:var(--br-primary-button-text-color, #fff);padding:3px 10px;border-radius:8px;font-size:var(--date-badgeSize);font-weight:600;letter-spacing:.5px;text-transform:uppercase;white-space:nowrap}.material-date-wrapper .required-marker{color:#e53e3e}.br-material-label{display:inline-flex;align-items:center;gap:8px;color:var(--br-label-font-color, #1f2a3d)}.br-lib-tag{display:inline-flex;align-items:center;gap:5px;padding:2px 8px;border-radius:999px;background:linear-gradient(135deg,#e8f0fe,#d2e3fc);color:#174ea6;font-size:10px;font-weight:800;letter-spacing:.4px}.br-lib-tag:before{content:\"\";width:6px;height:6px;border-radius:50%;background:#174ea6}:host ::ng-deep .date-field .mat-mdc-form-field-subscript-wrapper{display:none}:host ::ng-deep .date-field .mdc-text-field--outlined{background:var(--br-input-background-color, #ffffff)}:host ::ng-deep .date-field .mdc-notched-outline__leading,:host ::ng-deep .date-field .mdc-notched-outline__notch,:host ::ng-deep .date-field .mdc-notched-outline__trailing{border-color:var(--br-input-border-color, #c8d5e6)}:host ::ng-deep .date-field.mat-focused .mdc-notched-outline__leading,:host ::ng-deep .date-field.mat-focused .mdc-notched-outline__notch,:host ::ng-deep .date-field.mat-focused .mdc-notched-outline__trailing{border-color:var(--br-focus-color, #2563eb)}:host ::ng-deep .date-field .mdc-text-field__input{color:var(--br-input-text-color, #1f2a3d);caret-color:var(--br-focus-color, #2563eb);font-family:var(--br-font-family, Tahoma, Arial, sans-serif);font-size:var(--br-base-font-size, 14px)}:host ::ng-deep .date-field .mdc-floating-label,:host ::ng-deep .date-field .mat-mdc-form-field-label,:host ::ng-deep .date-field .mat-datepicker-toggle{color:var(--br-label-font-color, #1f2a3d)}:host ::ng-deep .mat-calendar{background:var(--br-section-background-color, #ffffff);color:var(--br-base-font-color, #1f2a3d)}:host ::ng-deep .mat-calendar-body-selected{background-color:var(--br-accent-color, var(--br-focus-color, #2563eb))!important;color:var(--br-primary-button-text-color, #ffffff)!important}:host ::ng-deep .mat-calendar-body-today:not(.mat-calendar-body-selected){border-color:var(--br-focus-color, #2563eb)!important}:host ::ng-deep .mat-calendar-body-cell-content,:host ::ng-deep .mat-calendar-table-header th{color:var(--br-base-font-color, #1f2a3d)}.density-compact{--date-scale: .92}.density-comfortable{--date-scale: 1}.density-spacious{--date-scale: 1.06}.size-sm{max-width:280px}.size-md{max-width:360px}.size-lg{max-width:460px}.variant-plain ::ng-deep .mat-mdc-text-field-wrapper{background:transparent!important;border-bottom:1px solid var(--br-section-border-color, #d2d7e6);border-radius:0!important}\n"] }]
        }], ctorParameters: () => [{ type: i1$1.DateAdapter }], propDecorators: { config: [{
                type: Input
            }], showLibraryTag: [{
                type: Input
            }], dateChange: [{
                type: Output
            }], blurEvent: [{
                type: Output
            }], focusEvent: [{
                type: Output
            }], inputEvent: [{
                type: Output
            }], changeEvent: [{
                type: Output
            }], keydownEvent: [{
                type: Output
            }], keyupEvent: [{
                type: Output
            }], clickEvent: [{
                type: Output
            }] } });

class PrimeDateControlComponent {
    config;
    showLibraryTag = false;
    dateChange = new EventEmitter();
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.19", ngImport: i0, type: PrimeDateControlComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.19", type: PrimeDateControlComponent, isStandalone: true, selector: "br-prime-date-control", inputs: { config: "config", showLibraryTag: "showLibraryTag" }, outputs: { dateChange: "dateChange" }, ngImport: i0, template: `
    <div class="prime-date-control">
      <div class="p-field">
        <label *ngIf="config.label" [for]="config.id || ''">{{ config.label }}</label>
        <p-datepicker [id]="config.id || ''" [name]="config.name || ''"
                     [(ngModel)]="config.value" (ngModelChange)="dateChange.emit($event)"
                     [minDate]="config.minDate || undefined" [maxDate]="config.maxDate || undefined"
                     [disabledDays]="config.disabledDaysOfWeek" [firstDayOfWeek]="config.firstDayOfWeek"
                     [disabled]="config.disabled" [placeholder]="config.placeholder"
                     [showIcon]="true" [iconDisplay]="'input'">
        </p-datepicker>
      </div>
      <span *ngIf="showLibraryTag" class="br-lib-tag" 
            style="margin-left: 0.5rem; background: #eee; padding: 2px 4px; font-size: 10px; border-radius: 4px;">LIB</span>
    </div>
  `, isInline: true, styles: [".prime-date-control{margin:1rem 0}.p-field{display:flex;flex-direction:column;gap:.5rem}:host ::ng-deep .p-datepicker{width:100%}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "ngmodule", type: FormsModule }, { kind: "directive", type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i2.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { kind: "ngmodule", type: DatePickerModule }, { kind: "component", type: i11.DatePicker, selector: "p-datePicker, p-datepicker, p-date-picker", inputs: ["iconDisplay", "styleClass", "inputStyle", "inputId", "inputStyleClass", "placeholder", "ariaLabelledBy", "ariaLabel", "iconAriaLabel", "dateFormat", "multipleSeparator", "rangeSeparator", "inline", "showOtherMonths", "selectOtherMonths", "showIcon", "icon", "readonlyInput", "shortYearCutoff", "hourFormat", "timeOnly", "stepHour", "stepMinute", "stepSecond", "showSeconds", "showOnFocus", "showWeek", "startWeekFromFirstDayOfYear", "showClear", "dataType", "selectionMode", "maxDateCount", "showButtonBar", "todayButtonStyleClass", "clearButtonStyleClass", "autofocus", "autoZIndex", "baseZIndex", "panelStyleClass", "panelStyle", "keepInvalid", "hideOnDateTimeSelect", "touchUI", "timeSeparator", "focusTrap", "showTransitionOptions", "hideTransitionOptions", "tabindex", "minDate", "maxDate", "disabledDates", "disabledDays", "showTime", "responsiveOptions", "numberOfMonths", "firstDayOfWeek", "view", "defaultDate", "appendTo", "motionOptions"], outputs: ["onFocus", "onBlur", "onClose", "onSelect", "onClear", "onInput", "onTodayClick", "onClearClick", "onMonthChange", "onYearChange", "onClickOutside", "onShow"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.19", ngImport: i0, type: PrimeDateControlComponent, decorators: [{
            type: Component,
            args: [{ selector: 'br-prime-date-control', standalone: true, imports: [CommonModule, FormsModule, DatePickerModule], template: `
    <div class="prime-date-control">
      <div class="p-field">
        <label *ngIf="config.label" [for]="config.id || ''">{{ config.label }}</label>
        <p-datepicker [id]="config.id || ''" [name]="config.name || ''"
                     [(ngModel)]="config.value" (ngModelChange)="dateChange.emit($event)"
                     [minDate]="config.minDate || undefined" [maxDate]="config.maxDate || undefined"
                     [disabledDays]="config.disabledDaysOfWeek" [firstDayOfWeek]="config.firstDayOfWeek"
                     [disabled]="config.disabled" [placeholder]="config.placeholder"
                     [showIcon]="true" [iconDisplay]="'input'">
        </p-datepicker>
      </div>
      <span *ngIf="showLibraryTag" class="br-lib-tag" 
            style="margin-left: 0.5rem; background: #eee; padding: 2px 4px; font-size: 10px; border-radius: 4px;">LIB</span>
    </div>
  `, styles: [".prime-date-control{margin:1rem 0}.p-field{display:flex;flex-direction:column;gap:.5rem}:host ::ng-deep .p-datepicker{width:100%}\n"] }]
        }], propDecorators: { config: [{
                type: Input
            }], showLibraryTag: [{
                type: Input
            }], dateChange: [{
                type: Output
            }] } });

class BrDateComponent extends BaseValueAccessor {
    runtimeUiConfig;
    controlRegistry;
    config;
    id;
    controlId;
    name;
    className;
    value;
    disabled;
    required;
    label;
    placeholder;
    meta;
    showLibraryTag = true;
    valueChange = new EventEmitter();
    dateChange = new EventEmitter();
    blur = new EventEmitter();
    focus = new EventEmitter();
    input = new EventEmitter();
    change = new EventEmitter();
    keydown = new EventEmitter();
    keyup = new EventEmitter();
    click = new EventEmitter();
    controlEvent = new EventEmitter();
    uiMode = 'CUSTOM';
    customConfig;
    materialConfig;
    primeConfig;
    destroy$ = new Subject();
    registryHandle;
    constructor(runtimeUiConfig, controlRegistry) {
        super();
        this.runtimeUiConfig = runtimeUiConfig;
        this.controlRegistry = controlRegistry;
    }
    ngOnInit() {
        this.uiMode = this.runtimeUiConfig.getModesSnapshot().date;
        this.runtimeUiConfig.modes$
            .pipe(takeUntil(this.destroy$))
            .subscribe((modes) => {
            this.uiMode = modes.date;
            this.adaptConfig();
        });
        this.refreshRegistryRegistration();
    }
    ngOnChanges(_) {
        this.adaptConfig();
        this.refreshRegistryRegistration();
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
        if (this.registryHandle) {
            this.controlRegistry.unregister(this.registryHandle);
        }
    }
    onCustomDateChange(value) {
        this.emitDateValue(value);
    }
    onMaterialDateChange(value) {
        this.emitDateValue(value ? this.toLocalIsoDate(value) : '');
    }
    onPrimeDateChange(value) {
        this.emitDateValue(value ? this.toLocalIsoDate(value) : '');
    }
    onImplementationBlur(event) {
        this.blur.emit(event);
        this.emitControlEvent('blur', this.normalizedStringValue, event);
        this.markTouched();
    }
    onImplementationFocus(event) {
        this.focus.emit(event);
        this.emitControlEvent('focus', this.normalizedStringValue, event);
    }
    onImplementationInput(event) {
        this.input.emit(event);
        this.emitControlEvent('input', this.normalizedStringValue, event);
    }
    onImplementationChange(event) {
        this.change.emit(event);
        this.emitControlEvent('change', this.normalizedStringValue, event);
    }
    onImplementationKeydown(event) {
        this.keydown.emit(event);
        this.emitControlEvent('keydown', this.normalizedStringValue, event);
    }
    onImplementationKeyup(event) {
        this.keyup.emit(event);
        this.emitControlEvent('keyup', this.normalizedStringValue, event);
    }
    onImplementationClick(event) {
        this.click.emit(event);
        this.emitControlEvent('click', this.normalizedStringValue, event);
    }
    normalizeValue(value) {
        return value ?? '';
    }
    afterWriteValue(value) {
        this.value = value;
        this.adaptConfig();
        this.refreshRegistryRegistration();
    }
    afterDisabledStateChange(isDisabled) {
        this.disabled = isDisabled;
        this.adaptConfig();
    }
    adaptConfig() {
        const resolved = this.resolveConfig();
        if (this.uiMode === 'CUSTOM') {
            this.customConfig = DateAdapter.toCustom(resolved);
        }
        else if (this.uiMode === 'MATERIAL') {
            this.materialConfig = DateAdapter.toMaterial(resolved);
        }
        else {
            this.primeConfig = DateAdapter.toPrime(resolved);
        }
    }
    resolveConfig() {
        const source = this.config
            ? { ...this.config }
            : {
                label: '',
                value: null,
            };
        return {
            ...source,
            id: this.effectiveId,
            controlId: this.controlId,
            name: this.name ?? source.name,
            className: this.className ?? source.className,
            meta: this.meta ?? source.meta,
            label: this.label ?? source.label,
            value: this.value !== undefined ? this.value : source.value,
            disabled: this.disabled ?? source.disabled ?? this.currentDisabled,
            required: this.required ?? source.required ?? false,
            placeholder: this.placeholder ?? source.placeholder,
        };
    }
    emitDateValue(value) {
        this.value = value;
        this.valueChange.emit(value);
        this.dateChange.emit(value);
        this.emitValueChange(value);
        this.emitControlEvent('valueChange', value);
        this.refreshRegistryRegistration();
    }
    get effectiveId() {
        return this.id || this.controlId || this.config?.id || this.config?.controlId;
    }
    toLocalIsoDate(value) {
        const year = value.getFullYear();
        const month = String(value.getMonth() + 1).padStart(2, '0');
        const day = String(value.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
    refreshRegistryRegistration() {
        if (this.registryHandle) {
            this.controlRegistry.unregister(this.registryHandle);
        }
        this.registryHandle = {
            id: this.effectiveId,
            name: this.name || this.config?.name,
            classes: this.extractClasses(this.className || this.config?.className),
            type: 'date',
            getValue: () => this.value ?? this.config?.value ?? '',
        };
        this.controlRegistry.register(this.registryHandle);
    }
    extractClasses(classNames) {
        return (classNames || '')
            .split(/\s+/)
            .map((part) => part.trim())
            .filter((part) => !!part);
    }
    get normalizedStringValue() {
        if (typeof this.value === 'string')
            return this.value;
        if (this.value instanceof Date)
            return this.toLocalIsoDate(this.value);
        if (typeof this.config?.value === 'string')
            return this.config.value;
        if (this.config?.value instanceof Date)
            return this.toLocalIsoDate(this.config.value);
        return '';
    }
    emitControlEvent(type, value, originalEvent) {
        this.controlEvent.emit({
            type,
            id: this.effectiveId,
            name: this.name || this.config?.name,
            className: this.className || this.config?.className,
            value,
            meta: this.meta || this.config?.meta,
            originalEvent,
        });
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.19", ngImport: i0, type: BrDateComponent, deps: [{ token: RuntimeUiConfigService }, { token: ControlRegistryService }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.19", type: BrDateComponent, isStandalone: true, selector: "br-date", inputs: { config: "config", id: "id", controlId: "controlId", name: "name", className: "className", value: "value", disabled: "disabled", required: "required", label: "label", placeholder: "placeholder", meta: "meta", showLibraryTag: "showLibraryTag" }, outputs: { valueChange: "valueChange", dateChange: "dateChange", blur: "blur", focus: "focus", input: "input", change: "change", keydown: "keydown", keyup: "keyup", click: "click", controlEvent: "controlEvent" }, providers: [
            {
                provide: NG_VALUE_ACCESSOR,
                useExisting: forwardRef(() => BrDateComponent),
                multi: true,
            },
        ], usesInheritance: true, usesOnChanges: true, ngImport: i0, template: "<!--\r\n  BR-DATE FA\u00C7ADE TEMPLATE\r\n  \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\r\n  Conditionally renders the correct implementation based on UI_MODE.\r\n  Consumer code NEVER sees this switch \u2014 they only write <br-date>.\r\n-->\r\n\r\n<!-- CUSTOM implementation -->\r\n<br-custom-date *ngIf=\"uiMode === 'CUSTOM'\" [config]=\"customConfig\" [showLibraryTag]=\"showLibraryTag\"\r\n  (dateChange)=\"onCustomDateChange($event)\" (blurEvent)=\"onImplementationBlur($event)\"\r\n  (focusEvent)=\"onImplementationFocus($event)\" (inputEvent)=\"onImplementationInput($event)\"\r\n  (changeEvent)=\"onImplementationChange($event)\" (keydownEvent)=\"onImplementationKeydown($event)\"\r\n  (keyupEvent)=\"onImplementationKeyup($event)\" (clickEvent)=\"onImplementationClick($event)\">\r\n</br-custom-date>\r\n\r\n<!-- MATERIAL implementation -->\r\n<br-material-date *ngIf=\"uiMode === 'MATERIAL'\" [config]=\"materialConfig\" [showLibraryTag]=\"showLibraryTag\"\r\n  (dateChange)=\"onMaterialDateChange($event)\" (blurEvent)=\"onImplementationBlur($event)\"\r\n  (focusEvent)=\"onImplementationFocus($event)\" (inputEvent)=\"onImplementationInput($event)\"\r\n  (changeEvent)=\"onImplementationChange($event)\" (keydownEvent)=\"onImplementationKeydown($event)\"\r\n  (keyupEvent)=\"onImplementationKeyup($event)\" (clickEvent)=\"onImplementationClick($event)\">\r\n</br-material-date>\r\n\r\n<!-- PRIMENG implementation -->\r\n<br-prime-date-control *ngIf=\"uiMode === 'PRIMENG'\" [config]=\"primeConfig\" [showLibraryTag]=\"showLibraryTag\"\r\n  (dateChange)=\"onPrimeDateChange($event)\">\r\n</br-prime-date-control>", styles: ["@charset \"UTF-8\";:host{display:block}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: CustomDateComponent, selector: "br-custom-date", inputs: ["config", "showLibraryTag"], outputs: ["dateChange", "blurEvent", "focusEvent", "inputEvent", "changeEvent", "keydownEvent", "keyupEvent", "clickEvent"] }, { kind: "component", type: MaterialDateComponent, selector: "br-material-date", inputs: ["config", "showLibraryTag"], outputs: ["dateChange", "blurEvent", "focusEvent", "inputEvent", "changeEvent", "keydownEvent", "keyupEvent", "clickEvent"] }, { kind: "component", type: PrimeDateControlComponent, selector: "br-prime-date-control", inputs: ["config", "showLibraryTag"], outputs: ["dateChange"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.19", ngImport: i0, type: BrDateComponent, decorators: [{
            type: Component,
            args: [{ selector: 'br-date', standalone: true, imports: [CommonModule, CustomDateComponent, MaterialDateComponent, PrimeDateControlComponent], providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(() => BrDateComponent),
                            multi: true,
                        },
                    ], template: "<!--\r\n  BR-DATE FA\u00C7ADE TEMPLATE\r\n  \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\r\n  Conditionally renders the correct implementation based on UI_MODE.\r\n  Consumer code NEVER sees this switch \u2014 they only write <br-date>.\r\n-->\r\n\r\n<!-- CUSTOM implementation -->\r\n<br-custom-date *ngIf=\"uiMode === 'CUSTOM'\" [config]=\"customConfig\" [showLibraryTag]=\"showLibraryTag\"\r\n  (dateChange)=\"onCustomDateChange($event)\" (blurEvent)=\"onImplementationBlur($event)\"\r\n  (focusEvent)=\"onImplementationFocus($event)\" (inputEvent)=\"onImplementationInput($event)\"\r\n  (changeEvent)=\"onImplementationChange($event)\" (keydownEvent)=\"onImplementationKeydown($event)\"\r\n  (keyupEvent)=\"onImplementationKeyup($event)\" (clickEvent)=\"onImplementationClick($event)\">\r\n</br-custom-date>\r\n\r\n<!-- MATERIAL implementation -->\r\n<br-material-date *ngIf=\"uiMode === 'MATERIAL'\" [config]=\"materialConfig\" [showLibraryTag]=\"showLibraryTag\"\r\n  (dateChange)=\"onMaterialDateChange($event)\" (blurEvent)=\"onImplementationBlur($event)\"\r\n  (focusEvent)=\"onImplementationFocus($event)\" (inputEvent)=\"onImplementationInput($event)\"\r\n  (changeEvent)=\"onImplementationChange($event)\" (keydownEvent)=\"onImplementationKeydown($event)\"\r\n  (keyupEvent)=\"onImplementationKeyup($event)\" (clickEvent)=\"onImplementationClick($event)\">\r\n</br-material-date>\r\n\r\n<!-- PRIMENG implementation -->\r\n<br-prime-date-control *ngIf=\"uiMode === 'PRIMENG'\" [config]=\"primeConfig\" [showLibraryTag]=\"showLibraryTag\"\r\n  (dateChange)=\"onPrimeDateChange($event)\">\r\n</br-prime-date-control>", styles: ["@charset \"UTF-8\";:host{display:block}\n"] }]
        }], ctorParameters: () => [{ type: RuntimeUiConfigService }, { type: ControlRegistryService }], propDecorators: { config: [{
                type: Input
            }], id: [{
                type: Input
            }], controlId: [{
                type: Input
            }], name: [{
                type: Input
            }], className: [{
                type: Input
            }], value: [{
                type: Input
            }], disabled: [{
                type: Input
            }], required: [{
                type: Input
            }], label: [{
                type: Input
            }], placeholder: [{
                type: Input
            }], meta: [{
                type: Input
            }], showLibraryTag: [{
                type: Input
            }], valueChange: [{
                type: Output
            }], dateChange: [{
                type: Output
            }], blur: [{
                type: Output
            }], focus: [{
                type: Output
            }], input: [{
                type: Output
            }], change: [{
                type: Output
            }], keydown: [{
                type: Output
            }], keyup: [{
                type: Output
            }], click: [{
                type: Output
            }], controlEvent: [{
                type: Output
            }] } });

class SingleSelectAdapter {
    static toCustom(config) {
        return {
            id: config.id || config.controlId,
            name: config.name,
            className: config.className,
            label: config.label || '',
            value: config.value ?? '',
            options: [...(config.options || [])],
            disabled: config.disabled ?? false,
            required: config.required ?? false,
        };
    }
    static toMaterial(config) {
        return {
            id: config.id || config.controlId,
            name: config.name,
            className: config.className,
            label: config.label || '',
            value: config.value ?? '',
            options: [...(config.options || [])],
            disabled: config.disabled ?? false,
            required: config.required ?? false,
        };
    }
    static toPrime(config) {
        return {
            id: config.id || config.controlId,
            name: config.name,
            className: config.className,
            label: config.label || '',
            value: config.value ?? '',
            options: [...(config.options || [])],
            disabled: config.disabled ?? false,
            required: config.required ?? false,
        };
    }
}

class CustomSingleSelectControlComponent {
    config;
    showLibraryTag = false;
    valueChange = new EventEmitter();
    blurEvent = new EventEmitter();
    focusEvent = new EventEmitter();
    inputEvent = new EventEmitter();
    changeEvent = new EventEmitter();
    keydownEvent = new EventEmitter();
    keyupEvent = new EventEmitter();
    clickEvent = new EventEmitter();
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.19", ngImport: i0, type: CustomSingleSelectControlComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.19", type: CustomSingleSelectControlComponent, isStandalone: true, selector: "br-custom-single-select-control", inputs: { config: "config", showLibraryTag: "showLibraryTag" }, outputs: { valueChange: "valueChange", blurEvent: "blurEvent", focusEvent: "focusEvent", inputEvent: "inputEvent", changeEvent: "changeEvent", keydownEvent: "keydownEvent", keyupEvent: "keyupEvent", clickEvent: "clickEvent" }, ngImport: i0, template: "<div class=\"br-control br-single-select-control\">\r\n  <label class=\"br-label\">\r\n    {{ config.label }}\r\n    <span *ngIf=\"showLibraryTag\" class=\"br-lib-tag\" aria-label=\"Library package control\">LIB</span>\r\n  </label>\r\n  <select class=\"br-select\" [ngClass]=\"config.className\" [attr.id]=\"config.id\" [attr.name]=\"config.name\"\r\n    [disabled]=\"config.disabled\" [required]=\"config.required\" [ngModel]=\"config.value\" (ngModelChange)=\"valueChange.emit($event)\"\r\n    (blur)=\"blurEvent.emit($event)\" (focus)=\"focusEvent.emit($event)\" (input)=\"inputEvent.emit($event)\"\r\n    (change)=\"changeEvent.emit($event)\" (keydown)=\"keydownEvent.emit($event)\" (keyup)=\"keyupEvent.emit($event)\"\r\n    (click)=\"clickEvent.emit($event)\">\r\n    <option [ngValue]=\"''\">Select...</option>\r\n    <option *ngFor=\"let opt of config.options\" [ngValue]=\"opt.value\">{{ opt.label }}</option>\r\n  </select>\r\n</div>\r\n", styles: [".br-control{display:flex;flex-direction:column;gap:8px;font-family:var(--br-font-family, Tahoma, Arial, sans-serif)}.br-label{display:inline-flex;align-items:center;gap:8px;font-size:var(--br-base-font-size, 14px);font-weight:700;color:var(--br-label-font-color, #1f2a3d)}.br-lib-tag{display:inline-flex;align-items:center;gap:5px;padding:2px 8px;border-radius:999px;background:linear-gradient(135deg,#e8f0fe,#d2e3fc);color:#174ea6;font-size:10px;font-weight:800;letter-spacing:.4px}.br-lib-tag:before{content:\"\";width:6px;height:6px;border-radius:50%;background:#174ea6}.br-select{height:40px;border-radius:10px;border:1px solid var(--br-input-border-color, #c8d5e6);padding:0 12px;font-size:var(--br-base-font-size, 14px);font-family:inherit;color:var(--br-input-text-color, #1f2a3d);background:var(--br-input-background-color, #fff);transition:border-color .12s ease,box-shadow .12s ease}.br-select:focus{outline:none;border-color:var(--br-focus-color, #2563eb);box-shadow:0 0 0 3px var(--br-focus-ring-color, color-mix(in srgb, #2563eb 18%, transparent))}.br-select:disabled{background:var(--br-input-disabled-background-color, #f1f5f9);color:var(--br-input-disabled-text-color, #64748b)}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "ngmodule", type: FormsModule }, { kind: "directive", type: i2.NgSelectOption, selector: "option", inputs: ["ngValue", "value"] }, { kind: "directive", type: i2.ɵNgSelectMultipleOption, selector: "option", inputs: ["ngValue", "value"] }, { kind: "directive", type: i2.SelectControlValueAccessor, selector: "select:not([multiple])[formControlName],select:not([multiple])[formControl],select:not([multiple])[ngModel]", inputs: ["compareWith"] }, { kind: "directive", type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i2.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }, { kind: "directive", type: i2.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.19", ngImport: i0, type: CustomSingleSelectControlComponent, decorators: [{
            type: Component,
            args: [{ selector: 'br-custom-single-select-control', standalone: true, imports: [CommonModule, FormsModule], template: "<div class=\"br-control br-single-select-control\">\r\n  <label class=\"br-label\">\r\n    {{ config.label }}\r\n    <span *ngIf=\"showLibraryTag\" class=\"br-lib-tag\" aria-label=\"Library package control\">LIB</span>\r\n  </label>\r\n  <select class=\"br-select\" [ngClass]=\"config.className\" [attr.id]=\"config.id\" [attr.name]=\"config.name\"\r\n    [disabled]=\"config.disabled\" [required]=\"config.required\" [ngModel]=\"config.value\" (ngModelChange)=\"valueChange.emit($event)\"\r\n    (blur)=\"blurEvent.emit($event)\" (focus)=\"focusEvent.emit($event)\" (input)=\"inputEvent.emit($event)\"\r\n    (change)=\"changeEvent.emit($event)\" (keydown)=\"keydownEvent.emit($event)\" (keyup)=\"keyupEvent.emit($event)\"\r\n    (click)=\"clickEvent.emit($event)\">\r\n    <option [ngValue]=\"''\">Select...</option>\r\n    <option *ngFor=\"let opt of config.options\" [ngValue]=\"opt.value\">{{ opt.label }}</option>\r\n  </select>\r\n</div>\r\n", styles: [".br-control{display:flex;flex-direction:column;gap:8px;font-family:var(--br-font-family, Tahoma, Arial, sans-serif)}.br-label{display:inline-flex;align-items:center;gap:8px;font-size:var(--br-base-font-size, 14px);font-weight:700;color:var(--br-label-font-color, #1f2a3d)}.br-lib-tag{display:inline-flex;align-items:center;gap:5px;padding:2px 8px;border-radius:999px;background:linear-gradient(135deg,#e8f0fe,#d2e3fc);color:#174ea6;font-size:10px;font-weight:800;letter-spacing:.4px}.br-lib-tag:before{content:\"\";width:6px;height:6px;border-radius:50%;background:#174ea6}.br-select{height:40px;border-radius:10px;border:1px solid var(--br-input-border-color, #c8d5e6);padding:0 12px;font-size:var(--br-base-font-size, 14px);font-family:inherit;color:var(--br-input-text-color, #1f2a3d);background:var(--br-input-background-color, #fff);transition:border-color .12s ease,box-shadow .12s ease}.br-select:focus{outline:none;border-color:var(--br-focus-color, #2563eb);box-shadow:0 0 0 3px var(--br-focus-ring-color, color-mix(in srgb, #2563eb 18%, transparent))}.br-select:disabled{background:var(--br-input-disabled-background-color, #f1f5f9);color:var(--br-input-disabled-text-color, #64748b)}\n"] }]
        }], propDecorators: { config: [{
                type: Input
            }], showLibraryTag: [{
                type: Input
            }], valueChange: [{
                type: Output
            }], blurEvent: [{
                type: Output
            }], focusEvent: [{
                type: Output
            }], inputEvent: [{
                type: Output
            }], changeEvent: [{
                type: Output
            }], keydownEvent: [{
                type: Output
            }], keyupEvent: [{
                type: Output
            }], clickEvent: [{
                type: Output
            }] } });

class MaterialSingleSelectControlComponent {
    config;
    showLibraryTag = false;
    valueChange = new EventEmitter();
    blurEvent = new EventEmitter();
    focusEvent = new EventEmitter();
    inputEvent = new EventEmitter();
    changeEvent = new EventEmitter();
    keydownEvent = new EventEmitter();
    keyupEvent = new EventEmitter();
    clickEvent = new EventEmitter();
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.19", ngImport: i0, type: MaterialSingleSelectControlComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.19", type: MaterialSingleSelectControlComponent, isStandalone: true, selector: "br-material-single-select-control", inputs: { config: "config", showLibraryTag: "showLibraryTag" }, outputs: { valueChange: "valueChange", blurEvent: "blurEvent", focusEvent: "focusEvent", inputEvent: "inputEvent", changeEvent: "changeEvent", keydownEvent: "keydownEvent", keyupEvent: "keyupEvent", clickEvent: "clickEvent" }, ngImport: i0, template: "<mat-form-field appearance=\"outline\" class=\"br-material-field\" [ngClass]=\"config.className\" [attr.id]=\"config.id\">\r\n  <mat-label class=\"br-material-label\">\r\n    {{ config.label }}\r\n    <span *ngIf=\"showLibraryTag\" class=\"br-lib-tag\" aria-label=\"Library package control\">LIB</span>\r\n  </mat-label>\r\n  <mat-select [attr.name]=\"config.name\" [disabled]=\"config.disabled\" [required]=\"config.required\" [ngModel]=\"config.value\"\r\n    (ngModelChange)=\"valueChange.emit($event)\" (blur)=\"blurEvent.emit($event)\" (focus)=\"focusEvent.emit($event)\"\r\n    (input)=\"inputEvent.emit($event)\" (change)=\"changeEvent.emit($event)\" (keydown)=\"keydownEvent.emit($event)\"\r\n    (keyup)=\"keyupEvent.emit($event)\" (click)=\"clickEvent.emit($event)\">\r\n    <mat-option *ngFor=\"let opt of config.options\" [value]=\"opt.value\">{{ opt.label }}</mat-option>\r\n  </mat-select>\r\n</mat-form-field>\r\n", styles: [".br-material-field{width:100%;font-family:var(--br-font-family, Tahoma, Arial, sans-serif)}.br-material-label{display:inline-flex;align-items:center;gap:8px;color:var(--br-label-font-color, #1f2a3d)}.br-lib-tag{display:inline-flex;align-items:center;gap:5px;padding:2px 8px;border-radius:999px;background:linear-gradient(135deg,#e8f0fe,#d2e3fc);color:#174ea6;font-size:10px;font-weight:800;letter-spacing:.4px}.br-lib-tag:before{content:\"\";width:6px;height:6px;border-radius:50%;background:#174ea6}:host ::ng-deep .br-material-field .mat-mdc-form-field-subscript-wrapper{display:none}:host ::ng-deep .br-material-field .mdc-text-field--outlined{background:var(--br-input-background-color, #ffffff)}:host ::ng-deep .br-material-field .mdc-notched-outline__leading,:host ::ng-deep .br-material-field .mdc-notched-outline__notch,:host ::ng-deep .br-material-field .mdc-notched-outline__trailing{border-color:var(--br-input-border-color, #c8d5e6)}:host ::ng-deep .br-material-field.mat-focused .mdc-notched-outline__leading,:host ::ng-deep .br-material-field.mat-focused .mdc-notched-outline__notch,:host ::ng-deep .br-material-field.mat-focused .mdc-notched-outline__trailing{border-color:var(--br-focus-color, #2563eb)}:host ::ng-deep .br-material-field .mat-mdc-select-value-text,:host ::ng-deep .br-material-field .mat-mdc-select-min-line{color:var(--br-input-text-color, #1f2a3d);font-family:var(--br-font-family, Tahoma, Arial, sans-serif);font-size:var(--br-base-font-size, 14px)}:host ::ng-deep .br-material-field .mat-mdc-select-arrow,:host ::ng-deep .br-material-field.mat-focused .mat-mdc-select-arrow{color:var(--br-focus-color, #2563eb)}:host ::ng-deep div.mat-mdc-select-panel{background:var(--br-section-background-color, #ffffff)}:host ::ng-deep .mat-mdc-option .mdc-list-item__primary-text{color:var(--br-base-font-color, #1f2a3d)}:host ::ng-deep .mat-mdc-option.mdc-list-item--selected:not(.mdc-list-item--disabled){background:color-mix(in srgb,var(--br-focus-color, #2563eb) 12%,var(--br-section-background-color, #ffffff))}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "ngmodule", type: FormsModule }, { kind: "directive", type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i2.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }, { kind: "directive", type: i2.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { kind: "ngmodule", type: MatFormFieldModule }, { kind: "component", type: i3$2.MatFormField, selector: "mat-form-field", inputs: ["hideRequiredMarker", "color", "floatLabel", "appearance", "subscriptSizing", "hintLabel"], exportAs: ["matFormField"] }, { kind: "directive", type: i3$2.MatLabel, selector: "mat-label" }, { kind: "ngmodule", type: MatSelectModule }, { kind: "component", type: i5$1.MatSelect, selector: "mat-select", inputs: ["aria-describedby", "panelClass", "disabled", "disableRipple", "tabIndex", "hideSingleSelectionIndicator", "placeholder", "required", "multiple", "disableOptionCentering", "compareWith", "value", "aria-label", "aria-labelledby", "errorStateMatcher", "typeaheadDebounceInterval", "sortComparator", "id", "panelWidth", "canSelectNullableOptions"], outputs: ["openedChange", "opened", "closed", "selectionChange", "valueChange"], exportAs: ["matSelect"] }, { kind: "component", type: i5$1.MatOption, selector: "mat-option", inputs: ["value", "id", "disabled"], outputs: ["onSelectionChange"], exportAs: ["matOption"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.19", ngImport: i0, type: MaterialSingleSelectControlComponent, decorators: [{
            type: Component,
            args: [{ selector: 'br-material-single-select-control', standalone: true, imports: [CommonModule, FormsModule, MatFormFieldModule, MatSelectModule], template: "<mat-form-field appearance=\"outline\" class=\"br-material-field\" [ngClass]=\"config.className\" [attr.id]=\"config.id\">\r\n  <mat-label class=\"br-material-label\">\r\n    {{ config.label }}\r\n    <span *ngIf=\"showLibraryTag\" class=\"br-lib-tag\" aria-label=\"Library package control\">LIB</span>\r\n  </mat-label>\r\n  <mat-select [attr.name]=\"config.name\" [disabled]=\"config.disabled\" [required]=\"config.required\" [ngModel]=\"config.value\"\r\n    (ngModelChange)=\"valueChange.emit($event)\" (blur)=\"blurEvent.emit($event)\" (focus)=\"focusEvent.emit($event)\"\r\n    (input)=\"inputEvent.emit($event)\" (change)=\"changeEvent.emit($event)\" (keydown)=\"keydownEvent.emit($event)\"\r\n    (keyup)=\"keyupEvent.emit($event)\" (click)=\"clickEvent.emit($event)\">\r\n    <mat-option *ngFor=\"let opt of config.options\" [value]=\"opt.value\">{{ opt.label }}</mat-option>\r\n  </mat-select>\r\n</mat-form-field>\r\n", styles: [".br-material-field{width:100%;font-family:var(--br-font-family, Tahoma, Arial, sans-serif)}.br-material-label{display:inline-flex;align-items:center;gap:8px;color:var(--br-label-font-color, #1f2a3d)}.br-lib-tag{display:inline-flex;align-items:center;gap:5px;padding:2px 8px;border-radius:999px;background:linear-gradient(135deg,#e8f0fe,#d2e3fc);color:#174ea6;font-size:10px;font-weight:800;letter-spacing:.4px}.br-lib-tag:before{content:\"\";width:6px;height:6px;border-radius:50%;background:#174ea6}:host ::ng-deep .br-material-field .mat-mdc-form-field-subscript-wrapper{display:none}:host ::ng-deep .br-material-field .mdc-text-field--outlined{background:var(--br-input-background-color, #ffffff)}:host ::ng-deep .br-material-field .mdc-notched-outline__leading,:host ::ng-deep .br-material-field .mdc-notched-outline__notch,:host ::ng-deep .br-material-field .mdc-notched-outline__trailing{border-color:var(--br-input-border-color, #c8d5e6)}:host ::ng-deep .br-material-field.mat-focused .mdc-notched-outline__leading,:host ::ng-deep .br-material-field.mat-focused .mdc-notched-outline__notch,:host ::ng-deep .br-material-field.mat-focused .mdc-notched-outline__trailing{border-color:var(--br-focus-color, #2563eb)}:host ::ng-deep .br-material-field .mat-mdc-select-value-text,:host ::ng-deep .br-material-field .mat-mdc-select-min-line{color:var(--br-input-text-color, #1f2a3d);font-family:var(--br-font-family, Tahoma, Arial, sans-serif);font-size:var(--br-base-font-size, 14px)}:host ::ng-deep .br-material-field .mat-mdc-select-arrow,:host ::ng-deep .br-material-field.mat-focused .mat-mdc-select-arrow{color:var(--br-focus-color, #2563eb)}:host ::ng-deep div.mat-mdc-select-panel{background:var(--br-section-background-color, #ffffff)}:host ::ng-deep .mat-mdc-option .mdc-list-item__primary-text{color:var(--br-base-font-color, #1f2a3d)}:host ::ng-deep .mat-mdc-option.mdc-list-item--selected:not(.mdc-list-item--disabled){background:color-mix(in srgb,var(--br-focus-color, #2563eb) 12%,var(--br-section-background-color, #ffffff))}\n"] }]
        }], propDecorators: { config: [{
                type: Input
            }], showLibraryTag: [{
                type: Input
            }], valueChange: [{
                type: Output
            }], blurEvent: [{
                type: Output
            }], focusEvent: [{
                type: Output
            }], inputEvent: [{
                type: Output
            }], changeEvent: [{
                type: Output
            }], keydownEvent: [{
                type: Output
            }], keyupEvent: [{
                type: Output
            }], clickEvent: [{
                type: Output
            }] } });

class PrimeSingleSelectControlComponent {
    config;
    valueChange = new EventEmitter();
    onValueChange(newValue) {
        this.valueChange.emit(newValue);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.19", ngImport: i0, type: PrimeSingleSelectControlComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.19", type: PrimeSingleSelectControlComponent, isStandalone: true, selector: "br-prime-single-select-control", inputs: { config: "config" }, outputs: { valueChange: "valueChange" }, ngImport: i0, template: `
    <div class="br-prime-single-select-wrapper" [class]="config?.className || ''">
      <label *ngIf="config?.label" [for]="config?.id" class="br-prime-label">
        {{ config.label }}
        <span *ngIf="config.required" class="br-prime-required">*</span>
      </label>
      <div class="br-prime-control-container">
        <p-select
          [options]="config?.options || []"
          [ngModel]="config?.value"
          (ngModelChange)="onValueChange($event)"
          [disabled]="config?.disabled || false"
          [id]="config?.id"
          [name]="config?.name || ''"
          optionLabel="label"
          optionValue="value"
          [required]="config?.required || false"
          placeholder="Select an option"
          styleClass="w-full"
        ></p-select>
      </div>
    </div>
  `, isInline: true, styles: [".br-prime-single-select-wrapper{display:flex;flex-direction:column;gap:.5rem;margin-bottom:1rem}.br-prime-label{font-weight:500;color:var(--br-text-color, #333);font-size:.875rem}.br-prime-required{color:#e53e3e;margin-left:.25rem}::ng-deep .br-prime-control-container .p-select{width:100%}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "ngmodule", type: FormsModule }, { kind: "directive", type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i2.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }, { kind: "directive", type: i2.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { kind: "ngmodule", type: SelectModule }, { kind: "component", type: i8.Select, selector: "p-select", inputs: ["id", "scrollHeight", "filter", "panelStyle", "styleClass", "panelStyleClass", "readonly", "editable", "tabindex", "placeholder", "loadingIcon", "filterPlaceholder", "filterLocale", "inputId", "dataKey", "filterBy", "filterFields", "autofocus", "resetFilterOnHide", "checkmark", "dropdownIcon", "loading", "optionLabel", "optionValue", "optionDisabled", "optionGroupLabel", "optionGroupChildren", "group", "showClear", "emptyFilterMessage", "emptyMessage", "lazy", "virtualScroll", "virtualScrollItemSize", "virtualScrollOptions", "overlayOptions", "ariaFilterLabel", "ariaLabel", "ariaLabelledBy", "filterMatchMode", "tooltip", "tooltipPosition", "tooltipPositionStyle", "tooltipStyleClass", "focusOnHover", "selectOnFocus", "autoOptionFocus", "autofocusFilter", "filterValue", "options", "appendTo", "motionOptions"], outputs: ["onChange", "onFilter", "onFocus", "onBlur", "onClick", "onShow", "onHide", "onClear", "onLazyLoad"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.19", ngImport: i0, type: PrimeSingleSelectControlComponent, decorators: [{
            type: Component,
            args: [{ selector: 'br-prime-single-select-control', standalone: true, imports: [CommonModule, FormsModule, SelectModule], template: `
    <div class="br-prime-single-select-wrapper" [class]="config?.className || ''">
      <label *ngIf="config?.label" [for]="config?.id" class="br-prime-label">
        {{ config.label }}
        <span *ngIf="config.required" class="br-prime-required">*</span>
      </label>
      <div class="br-prime-control-container">
        <p-select
          [options]="config?.options || []"
          [ngModel]="config?.value"
          (ngModelChange)="onValueChange($event)"
          [disabled]="config?.disabled || false"
          [id]="config?.id"
          [name]="config?.name || ''"
          optionLabel="label"
          optionValue="value"
          [required]="config?.required || false"
          placeholder="Select an option"
          styleClass="w-full"
        ></p-select>
      </div>
    </div>
  `, styles: [".br-prime-single-select-wrapper{display:flex;flex-direction:column;gap:.5rem;margin-bottom:1rem}.br-prime-label{font-weight:500;color:var(--br-text-color, #333);font-size:.875rem}.br-prime-required{color:#e53e3e;margin-left:.25rem}::ng-deep .br-prime-control-container .p-select{width:100%}\n"] }]
        }], propDecorators: { config: [{
                type: Input
            }], valueChange: [{
                type: Output
            }] } });

class BrSingleSelectComponent extends BaseValueAccessor {
    runtimeUiConfig;
    controlRegistry;
    config;
    id;
    controlId;
    name;
    className;
    value;
    options;
    disabled;
    required;
    label;
    meta;
    showLibraryTag = true;
    valueChange = new EventEmitter();
    blur = new EventEmitter();
    focus = new EventEmitter();
    input = new EventEmitter();
    change = new EventEmitter();
    keydown = new EventEmitter();
    keyup = new EventEmitter();
    click = new EventEmitter();
    controlEvent = new EventEmitter();
    mode = 'CUSTOM';
    customConfig;
    materialConfig;
    primeConfig;
    destroy$ = new Subject();
    registryHandle;
    constructor(runtimeUiConfig, controlRegistry) {
        super();
        this.runtimeUiConfig = runtimeUiConfig;
        this.controlRegistry = controlRegistry;
    }
    ngOnInit() {
        this.mode = this.runtimeUiConfig.getModesSnapshot().singleSelect;
        this.adaptConfig();
        this.runtimeUiConfig.modes$.pipe(takeUntil(this.destroy$)).subscribe((m) => {
            this.mode = m.singleSelect;
            this.adaptConfig();
        });
        this.refreshRegistryRegistration();
    }
    ngOnChanges(_) {
        this.adaptConfig();
        this.refreshRegistryRegistration();
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
        if (this.registryHandle) {
            this.controlRegistry.unregister(this.registryHandle);
        }
    }
    onImplementationValueChange(value) {
        this.value = value;
        this.valueChange.emit(value);
        this.emitValueChange(value);
        this.emitControlEvent('valueChange', value);
        this.refreshRegistryRegistration();
    }
    onImplementationBlur(event) {
        this.blur.emit(event);
        this.emitControlEvent('blur', this.value, event);
        this.markTouched();
    }
    onImplementationFocus(event) {
        this.focus.emit(event);
        this.emitControlEvent('focus', this.value, event);
    }
    onImplementationInput(event) {
        this.input.emit(event);
        this.emitControlEvent('input', this.value, event);
    }
    onImplementationChange(event) {
        this.change.emit(event);
        this.emitControlEvent('change', this.value, event);
    }
    onImplementationKeydown(event) {
        this.keydown.emit(event);
        this.emitControlEvent('keydown', this.value, event);
    }
    onImplementationKeyup(event) {
        this.keyup.emit(event);
        this.emitControlEvent('keyup', this.value, event);
    }
    onImplementationClick(event) {
        this.click.emit(event);
        this.emitControlEvent('click', this.value, event);
    }
    normalizeValue(value) {
        return value;
    }
    afterWriteValue(value) {
        this.value = value;
        this.adaptConfig();
        this.refreshRegistryRegistration();
    }
    afterDisabledStateChange(isDisabled) {
        this.disabled = isDisabled;
        this.adaptConfig();
    }
    adaptConfig() {
        const resolved = this.resolveConfig();
        if (this.mode === 'CUSTOM') {
            this.customConfig = SingleSelectAdapter.toCustom(resolved);
        }
        else if (this.mode === 'MATERIAL') {
            this.materialConfig = SingleSelectAdapter.toMaterial(resolved);
        }
        else if (this.mode === 'PRIMENG') {
            this.primeConfig = SingleSelectAdapter.toPrime(resolved);
        }
        else {
            // Fallback
            this.materialConfig = SingleSelectAdapter.toMaterial(resolved);
        }
    }
    resolveConfig() {
        const source = this.config
            ? { ...this.config }
            : {
                label: '',
                value: '',
                options: [],
            };
        return {
            ...source,
            id: this.effectiveId,
            controlId: this.controlId,
            name: this.name ?? source.name,
            className: this.className ?? source.className,
            meta: this.meta ?? source.meta,
            label: this.label ?? source.label,
            value: this.value !== undefined ? this.value : source.value,
            options: this.options ?? source.options ?? [],
            disabled: this.disabled ?? source.disabled ?? this.currentDisabled,
            required: this.required ?? source.required ?? false,
        };
    }
    get effectiveId() {
        return this.id || this.controlId || this.config?.id || this.config?.controlId;
    }
    refreshRegistryRegistration() {
        if (this.registryHandle) {
            this.controlRegistry.unregister(this.registryHandle);
        }
        this.registryHandle = {
            id: this.effectiveId,
            name: this.name || this.config?.name,
            classes: this.extractClasses(this.className || this.config?.className),
            type: 'singleSelect',
            getValue: () => this.value ?? this.config?.value,
        };
        this.controlRegistry.register(this.registryHandle);
    }
    extractClasses(classNames) {
        return (classNames || '')
            .split(/\s+/)
            .map((part) => part.trim())
            .filter((part) => !!part);
    }
    emitControlEvent(type, value, originalEvent) {
        this.controlEvent.emit({
            type,
            id: this.effectiveId,
            name: this.name || this.config?.name,
            className: this.className || this.config?.className,
            value,
            meta: this.meta || this.config?.meta,
            originalEvent,
        });
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.19", ngImport: i0, type: BrSingleSelectComponent, deps: [{ token: RuntimeUiConfigService }, { token: ControlRegistryService }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.19", type: BrSingleSelectComponent, isStandalone: true, selector: "br-single-select", inputs: { config: "config", id: "id", controlId: "controlId", name: "name", className: "className", value: "value", options: "options", disabled: "disabled", required: "required", label: "label", meta: "meta", showLibraryTag: "showLibraryTag" }, outputs: { valueChange: "valueChange", blur: "blur", focus: "focus", input: "input", change: "change", keydown: "keydown", keyup: "keyup", click: "click", controlEvent: "controlEvent" }, providers: [
            {
                provide: NG_VALUE_ACCESSOR,
                useExisting: forwardRef(() => BrSingleSelectComponent),
                multi: true,
            },
        ], usesInheritance: true, usesOnChanges: true, ngImport: i0, template: "<br-custom-single-select-control *ngIf=\"mode === 'CUSTOM' && customConfig as cfg\" [config]=\"cfg\"\r\n  [showLibraryTag]=\"showLibraryTag\" (valueChange)=\"onImplementationValueChange($event)\"\r\n  (blurEvent)=\"onImplementationBlur($event)\" (focusEvent)=\"onImplementationFocus($event)\"\r\n  (inputEvent)=\"onImplementationInput($event)\" (changeEvent)=\"onImplementationChange($event)\"\r\n  (keydownEvent)=\"onImplementationKeydown($event)\" (keyupEvent)=\"onImplementationKeyup($event)\"\r\n  (clickEvent)=\"onImplementationClick($event)\">\r\n</br-custom-single-select-control>\r\n\r\n<br-material-single-select-control *ngIf=\"mode === 'MATERIAL' && materialConfig as cfg\" [config]=\"cfg\"\r\n  [showLibraryTag]=\"showLibraryTag\" (valueChange)=\"onImplementationValueChange($event)\"\r\n  (blurEvent)=\"onImplementationBlur($event)\" (focusEvent)=\"onImplementationFocus($event)\"\r\n  (inputEvent)=\"onImplementationInput($event)\" (changeEvent)=\"onImplementationChange($event)\"\r\n  (keydownEvent)=\"onImplementationKeydown($event)\" (keyupEvent)=\"onImplementationKeyup($event)\"\r\n  (clickEvent)=\"onImplementationClick($event)\">\r\n</br-material-single-select-control>\r\n\r\n<br-prime-single-select-control *ngIf=\"mode === 'PRIMENG' && primeConfig as cfg\" [config]=\"cfg\"\r\n  (valueChange)=\"onImplementationValueChange($event)\">\r\n</br-prime-single-select-control>", dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: CustomSingleSelectControlComponent, selector: "br-custom-single-select-control", inputs: ["config", "showLibraryTag"], outputs: ["valueChange", "blurEvent", "focusEvent", "inputEvent", "changeEvent", "keydownEvent", "keyupEvent", "clickEvent"] }, { kind: "component", type: MaterialSingleSelectControlComponent, selector: "br-material-single-select-control", inputs: ["config", "showLibraryTag"], outputs: ["valueChange", "blurEvent", "focusEvent", "inputEvent", "changeEvent", "keydownEvent", "keyupEvent", "clickEvent"] }, { kind: "component", type: PrimeSingleSelectControlComponent, selector: "br-prime-single-select-control", inputs: ["config"], outputs: ["valueChange"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.19", ngImport: i0, type: BrSingleSelectComponent, decorators: [{
            type: Component,
            args: [{ selector: 'br-single-select', standalone: true, imports: [CommonModule, CustomSingleSelectControlComponent, MaterialSingleSelectControlComponent, PrimeSingleSelectControlComponent], providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(() => BrSingleSelectComponent),
                            multi: true,
                        },
                    ], template: "<br-custom-single-select-control *ngIf=\"mode === 'CUSTOM' && customConfig as cfg\" [config]=\"cfg\"\r\n  [showLibraryTag]=\"showLibraryTag\" (valueChange)=\"onImplementationValueChange($event)\"\r\n  (blurEvent)=\"onImplementationBlur($event)\" (focusEvent)=\"onImplementationFocus($event)\"\r\n  (inputEvent)=\"onImplementationInput($event)\" (changeEvent)=\"onImplementationChange($event)\"\r\n  (keydownEvent)=\"onImplementationKeydown($event)\" (keyupEvent)=\"onImplementationKeyup($event)\"\r\n  (clickEvent)=\"onImplementationClick($event)\">\r\n</br-custom-single-select-control>\r\n\r\n<br-material-single-select-control *ngIf=\"mode === 'MATERIAL' && materialConfig as cfg\" [config]=\"cfg\"\r\n  [showLibraryTag]=\"showLibraryTag\" (valueChange)=\"onImplementationValueChange($event)\"\r\n  (blurEvent)=\"onImplementationBlur($event)\" (focusEvent)=\"onImplementationFocus($event)\"\r\n  (inputEvent)=\"onImplementationInput($event)\" (changeEvent)=\"onImplementationChange($event)\"\r\n  (keydownEvent)=\"onImplementationKeydown($event)\" (keyupEvent)=\"onImplementationKeyup($event)\"\r\n  (clickEvent)=\"onImplementationClick($event)\">\r\n</br-material-single-select-control>\r\n\r\n<br-prime-single-select-control *ngIf=\"mode === 'PRIMENG' && primeConfig as cfg\" [config]=\"cfg\"\r\n  (valueChange)=\"onImplementationValueChange($event)\">\r\n</br-prime-single-select-control>" }]
        }], ctorParameters: () => [{ type: RuntimeUiConfigService }, { type: ControlRegistryService }], propDecorators: { config: [{
                type: Input
            }], id: [{
                type: Input
            }], controlId: [{
                type: Input
            }], name: [{
                type: Input
            }], className: [{
                type: Input
            }], value: [{
                type: Input
            }], options: [{
                type: Input
            }], disabled: [{
                type: Input
            }], required: [{
                type: Input
            }], label: [{
                type: Input
            }], meta: [{
                type: Input
            }], showLibraryTag: [{
                type: Input
            }], valueChange: [{
                type: Output
            }], blur: [{
                type: Output
            }], focus: [{
                type: Output
            }], input: [{
                type: Output
            }], change: [{
                type: Output
            }], keydown: [{
                type: Output
            }], keyup: [{
                type: Output
            }], click: [{
                type: Output
            }], controlEvent: [{
                type: Output
            }] } });

class MultiSelectAdapter {
    static toCustom(config) {
        return {
            id: config.id || config.controlId,
            name: config.name,
            className: config.className,
            label: config.label || '',
            value: Array.isArray(config.value) ? [...config.value] : [],
            options: [...(config.options || [])],
            disabled: config.disabled ?? false,
            required: config.required ?? false,
        };
    }
    static toMaterial(config) {
        return {
            id: config.id || config.controlId,
            name: config.name,
            className: config.className,
            label: config.label || '',
            value: Array.isArray(config.value) ? [...config.value] : [],
            options: [...(config.options || [])],
            disabled: config.disabled ?? false,
            required: config.required ?? false,
        };
    }
    static toPrime(config) {
        return {
            id: config.id || config.controlId,
            name: config.name,
            className: config.className,
            label: config.label || '',
            value: Array.isArray(config.value) ? [...config.value] : [],
            options: [...(config.options || [])],
            disabled: config.disabled ?? false,
            required: config.required ?? false,
        };
    }
}

class CustomMultiSelectControlComponent {
    elementRef;
    config;
    showLibraryTag = false;
    valueChange = new EventEmitter();
    blurEvent = new EventEmitter();
    focusEvent = new EventEmitter();
    inputEvent = new EventEmitter();
    changeEvent = new EventEmitter();
    keydownEvent = new EventEmitter();
    keyupEvent = new EventEmitter();
    clickEvent = new EventEmitter();
    panelOpen = false;
    constructor(elementRef) {
        this.elementRef = elementRef;
    }
    get selectedValues() {
        return Array.isArray(this.config?.value) ? this.config.value : [];
    }
    get selectedLabels() {
        return this.config.options
            .filter((option) => this.selectedValues.includes(option.value))
            .map((option) => option.label);
    }
    togglePanel(event) {
        if (this.config.disabled) {
            return;
        }
        if (event) {
            this.clickEvent.emit(event);
        }
        this.panelOpen = !this.panelOpen;
    }
    toggleValue(value, event) {
        if (this.config.disabled) {
            return;
        }
        const next = [...this.selectedValues];
        const existingIdx = next.findIndex((item) => item === value);
        if (existingIdx >= 0) {
            next.splice(existingIdx, 1);
        }
        else {
            next.push(value);
        }
        if (event) {
            this.changeEvent.emit(event);
            this.inputEvent.emit(event);
        }
        this.valueChange.emit(next);
    }
    removeValue(value, event) {
        event?.stopPropagation();
        if (this.config.disabled) {
            return;
        }
        if (event) {
            this.clickEvent.emit(event);
        }
        const next = this.selectedValues.filter((item) => item !== value);
        this.valueChange.emit(next);
    }
    isSelected(value) {
        return this.selectedValues.includes(value);
    }
    onDocumentClick(event) {
        if (!this.panelOpen) {
            return;
        }
        const host = this.elementRef.nativeElement;
        if (!host.contains(event.target)) {
            this.panelOpen = false;
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.19", ngImport: i0, type: CustomMultiSelectControlComponent, deps: [{ token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.19", type: CustomMultiSelectControlComponent, isStandalone: true, selector: "br-custom-multi-select-control", inputs: { config: "config", showLibraryTag: "showLibraryTag" }, outputs: { valueChange: "valueChange", blurEvent: "blurEvent", focusEvent: "focusEvent", inputEvent: "inputEvent", changeEvent: "changeEvent", keydownEvent: "keydownEvent", keyupEvent: "keyupEvent", clickEvent: "clickEvent" }, host: { listeners: { "document:click": "onDocumentClick($event)" } }, ngImport: i0, template: "<div class=\"br-control br-multi-select-control\" [ngClass]=\"config.className\" [attr.id]=\"config.id\" [attr.name]=\"config.name\">\r\n  <label class=\"br-label\">\r\n    {{ config.label }}\r\n    <span *ngIf=\"showLibraryTag\" class=\"br-lib-tag\" aria-label=\"Library package control\">LIB</span>\r\n  </label>\r\n  <button type=\"button\" class=\"br-multi-trigger\" [disabled]=\"config.disabled\" (click)=\"togglePanel($event)\"\r\n    (blur)=\"blurEvent.emit($event)\" (focus)=\"focusEvent.emit($event)\" (keydown)=\"keydownEvent.emit($event)\"\r\n    (keyup)=\"keyupEvent.emit($event)\">\r\n    <span class=\"trigger-text\" *ngIf=\"selectedLabels.length === 0\">Select options</span>\r\n    <span class=\"trigger-text\" *ngIf=\"selectedLabels.length > 0\">{{ selectedLabels.join(', ') }}</span>\r\n    <span class=\"trigger-caret\" [class.open]=\"panelOpen\">\u25BE</span>\r\n  </button>\r\n\r\n  <div class=\"br-options-panel\" *ngIf=\"panelOpen\">\r\n    <label class=\"br-option-row\" *ngFor=\"let opt of config.options\">\r\n      <input type=\"checkbox\" [checked]=\"isSelected(opt.value)\" [disabled]=\"config.disabled\"\r\n        (change)=\"toggleValue(opt.value, $event)\" (click)=\"clickEvent.emit($event)\" />\r\n      <span>{{ opt.label }}</span>\r\n    </label>\r\n  </div>\r\n\r\n  <div class=\"br-selected-chips\" *ngIf=\"selectedValues.length > 0\">\r\n    <ng-container *ngFor=\"let opt of config.options\">\r\n      <button type=\"button\" class=\"br-chip\" *ngIf=\"isSelected(opt.value)\" (click)=\"removeValue(opt.value, $event)\"\r\n        [disabled]=\"config.disabled\">\r\n        <span>{{ opt.label }}</span>\r\n        <span class=\"chip-close\">x</span>\r\n      </button>\r\n    </ng-container>\r\n  </div>\r\n</div>\r\n", styles: [".br-control{display:flex;flex-direction:column;gap:8px;position:relative;font-family:var(--br-font-family, Tahoma, Arial, sans-serif)}.br-label{display:inline-flex;align-items:center;gap:8px;font-size:var(--br-base-font-size, 14px);font-weight:700;color:var(--br-label-font-color, #1f2a3d)}.br-lib-tag{display:inline-flex;align-items:center;gap:5px;padding:2px 8px;border-radius:999px;background:linear-gradient(135deg,#e8f0fe,#d2e3fc);color:#174ea6;font-size:10px;font-weight:800;letter-spacing:.4px}.br-lib-tag:before{content:\"\";width:6px;height:6px;border-radius:50%;background:#174ea6}.br-multi-trigger{min-height:42px;border-radius:10px;border:1px solid var(--br-input-border-color, #c8d5e6);padding:8px 12px;font-size:var(--br-base-font-size, 14px);background:var(--br-input-background-color, #fff);color:var(--br-input-text-color, #0f172a);display:flex;align-items:center;justify-content:space-between;gap:10px;text-align:left;cursor:pointer;transition:border-color .12s ease,box-shadow .12s ease}.br-multi-trigger:focus{outline:none;border-color:var(--br-focus-color, #2563eb);box-shadow:0 0 0 3px var(--br-focus-ring-color, color-mix(in srgb, #2563eb 18%, transparent))}.br-multi-trigger:disabled{background:var(--br-input-disabled-background-color, #f1f5f9);color:var(--br-input-disabled-text-color, #64748b);cursor:not-allowed}.trigger-text{overflow:hidden;white-space:nowrap;text-overflow:ellipsis}.trigger-caret{color:var(--br-input-placeholder-color, #475569);font-size:12px;transition:transform .12s ease}.trigger-caret.open{transform:rotate(180deg)}.br-options-panel{position:absolute;top:74px;left:0;right:0;z-index:4;border:1px solid var(--br-section-border-color, #bfdbfe);border-radius:10px;background:var(--br-section-background-color, #ffffff);box-shadow:0 8px 20px #0f172a26;max-height:220px;overflow:auto;padding:6px}.br-option-row{display:flex;align-items:center;gap:10px;padding:8px 10px;border-radius:8px;cursor:pointer;color:var(--br-base-font-color, #1f2937)}.br-option-row:hover{background:color-mix(in srgb,var(--br-focus-color, #2563eb) 8%,var(--br-section-background-color, #ffffff))}.br-option-row input[type=checkbox]{accent-color:var(--br-accent-color, var(--br-focus-color, #2563eb));width:16px;height:16px}.br-selected-chips{display:flex;flex-wrap:wrap;gap:8px;margin-top:2px}.br-chip{border:1px solid var(--br-section-border-color, #bfdbfe);background:color-mix(in srgb,var(--br-focus-color, #2563eb) 8%,var(--br-section-background-color, #ffffff));color:var(--br-accent-color, var(--br-focus-color, #1e3a8a));border-radius:999px;padding:3px 10px;font-size:12px;display:inline-flex;align-items:center;gap:6px;cursor:pointer}.chip-close{font-weight:700;line-height:1}.br-chip:disabled{opacity:.6;cursor:not-allowed}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "ngmodule", type: FormsModule }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.19", ngImport: i0, type: CustomMultiSelectControlComponent, decorators: [{
            type: Component,
            args: [{ selector: 'br-custom-multi-select-control', standalone: true, imports: [CommonModule, FormsModule], template: "<div class=\"br-control br-multi-select-control\" [ngClass]=\"config.className\" [attr.id]=\"config.id\" [attr.name]=\"config.name\">\r\n  <label class=\"br-label\">\r\n    {{ config.label }}\r\n    <span *ngIf=\"showLibraryTag\" class=\"br-lib-tag\" aria-label=\"Library package control\">LIB</span>\r\n  </label>\r\n  <button type=\"button\" class=\"br-multi-trigger\" [disabled]=\"config.disabled\" (click)=\"togglePanel($event)\"\r\n    (blur)=\"blurEvent.emit($event)\" (focus)=\"focusEvent.emit($event)\" (keydown)=\"keydownEvent.emit($event)\"\r\n    (keyup)=\"keyupEvent.emit($event)\">\r\n    <span class=\"trigger-text\" *ngIf=\"selectedLabels.length === 0\">Select options</span>\r\n    <span class=\"trigger-text\" *ngIf=\"selectedLabels.length > 0\">{{ selectedLabels.join(', ') }}</span>\r\n    <span class=\"trigger-caret\" [class.open]=\"panelOpen\">\u25BE</span>\r\n  </button>\r\n\r\n  <div class=\"br-options-panel\" *ngIf=\"panelOpen\">\r\n    <label class=\"br-option-row\" *ngFor=\"let opt of config.options\">\r\n      <input type=\"checkbox\" [checked]=\"isSelected(opt.value)\" [disabled]=\"config.disabled\"\r\n        (change)=\"toggleValue(opt.value, $event)\" (click)=\"clickEvent.emit($event)\" />\r\n      <span>{{ opt.label }}</span>\r\n    </label>\r\n  </div>\r\n\r\n  <div class=\"br-selected-chips\" *ngIf=\"selectedValues.length > 0\">\r\n    <ng-container *ngFor=\"let opt of config.options\">\r\n      <button type=\"button\" class=\"br-chip\" *ngIf=\"isSelected(opt.value)\" (click)=\"removeValue(opt.value, $event)\"\r\n        [disabled]=\"config.disabled\">\r\n        <span>{{ opt.label }}</span>\r\n        <span class=\"chip-close\">x</span>\r\n      </button>\r\n    </ng-container>\r\n  </div>\r\n</div>\r\n", styles: [".br-control{display:flex;flex-direction:column;gap:8px;position:relative;font-family:var(--br-font-family, Tahoma, Arial, sans-serif)}.br-label{display:inline-flex;align-items:center;gap:8px;font-size:var(--br-base-font-size, 14px);font-weight:700;color:var(--br-label-font-color, #1f2a3d)}.br-lib-tag{display:inline-flex;align-items:center;gap:5px;padding:2px 8px;border-radius:999px;background:linear-gradient(135deg,#e8f0fe,#d2e3fc);color:#174ea6;font-size:10px;font-weight:800;letter-spacing:.4px}.br-lib-tag:before{content:\"\";width:6px;height:6px;border-radius:50%;background:#174ea6}.br-multi-trigger{min-height:42px;border-radius:10px;border:1px solid var(--br-input-border-color, #c8d5e6);padding:8px 12px;font-size:var(--br-base-font-size, 14px);background:var(--br-input-background-color, #fff);color:var(--br-input-text-color, #0f172a);display:flex;align-items:center;justify-content:space-between;gap:10px;text-align:left;cursor:pointer;transition:border-color .12s ease,box-shadow .12s ease}.br-multi-trigger:focus{outline:none;border-color:var(--br-focus-color, #2563eb);box-shadow:0 0 0 3px var(--br-focus-ring-color, color-mix(in srgb, #2563eb 18%, transparent))}.br-multi-trigger:disabled{background:var(--br-input-disabled-background-color, #f1f5f9);color:var(--br-input-disabled-text-color, #64748b);cursor:not-allowed}.trigger-text{overflow:hidden;white-space:nowrap;text-overflow:ellipsis}.trigger-caret{color:var(--br-input-placeholder-color, #475569);font-size:12px;transition:transform .12s ease}.trigger-caret.open{transform:rotate(180deg)}.br-options-panel{position:absolute;top:74px;left:0;right:0;z-index:4;border:1px solid var(--br-section-border-color, #bfdbfe);border-radius:10px;background:var(--br-section-background-color, #ffffff);box-shadow:0 8px 20px #0f172a26;max-height:220px;overflow:auto;padding:6px}.br-option-row{display:flex;align-items:center;gap:10px;padding:8px 10px;border-radius:8px;cursor:pointer;color:var(--br-base-font-color, #1f2937)}.br-option-row:hover{background:color-mix(in srgb,var(--br-focus-color, #2563eb) 8%,var(--br-section-background-color, #ffffff))}.br-option-row input[type=checkbox]{accent-color:var(--br-accent-color, var(--br-focus-color, #2563eb));width:16px;height:16px}.br-selected-chips{display:flex;flex-wrap:wrap;gap:8px;margin-top:2px}.br-chip{border:1px solid var(--br-section-border-color, #bfdbfe);background:color-mix(in srgb,var(--br-focus-color, #2563eb) 8%,var(--br-section-background-color, #ffffff));color:var(--br-accent-color, var(--br-focus-color, #1e3a8a));border-radius:999px;padding:3px 10px;font-size:12px;display:inline-flex;align-items:center;gap:6px;cursor:pointer}.chip-close{font-weight:700;line-height:1}.br-chip:disabled{opacity:.6;cursor:not-allowed}\n"] }]
        }], ctorParameters: () => [{ type: i0.ElementRef }], propDecorators: { config: [{
                type: Input
            }], showLibraryTag: [{
                type: Input
            }], valueChange: [{
                type: Output
            }], blurEvent: [{
                type: Output
            }], focusEvent: [{
                type: Output
            }], inputEvent: [{
                type: Output
            }], changeEvent: [{
                type: Output
            }], keydownEvent: [{
                type: Output
            }], keyupEvent: [{
                type: Output
            }], clickEvent: [{
                type: Output
            }], onDocumentClick: [{
                type: HostListener,
                args: ['document:click', ['$event']]
            }] } });

class MaterialMultiSelectControlComponent {
    config;
    showLibraryTag = false;
    valueChange = new EventEmitter();
    blurEvent = new EventEmitter();
    focusEvent = new EventEmitter();
    inputEvent = new EventEmitter();
    changeEvent = new EventEmitter();
    keydownEvent = new EventEmitter();
    keyupEvent = new EventEmitter();
    clickEvent = new EventEmitter();
    get selectedValues() {
        return Array.isArray(this.config?.value) ? this.config.value : [];
    }
    get selectedLabels() {
        return this.config.options
            .filter((option) => this.selectedValues.includes(option.value))
            .map((option) => option.label);
    }
    isSelected(value) {
        return this.selectedValues.includes(value);
    }
    removeValue(value, event) {
        if (this.config.disabled) {
            return;
        }
        if (event) {
            this.clickEvent.emit(event);
        }
        this.valueChange.emit(this.selectedValues.filter((item) => item !== value));
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.19", ngImport: i0, type: MaterialMultiSelectControlComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.19", type: MaterialMultiSelectControlComponent, isStandalone: true, selector: "br-material-multi-select-control", inputs: { config: "config", showLibraryTag: "showLibraryTag" }, outputs: { valueChange: "valueChange", blurEvent: "blurEvent", focusEvent: "focusEvent", inputEvent: "inputEvent", changeEvent: "changeEvent", keydownEvent: "keydownEvent", keyupEvent: "keyupEvent", clickEvent: "clickEvent" }, ngImport: i0, template: "<mat-form-field appearance=\"outline\" class=\"br-material-field\" [ngClass]=\"config.className\" [attr.id]=\"config.id\">\r\n  <mat-label class=\"br-material-label\">\r\n    {{ config.label }}\r\n    <span *ngIf=\"showLibraryTag\" class=\"br-lib-tag\" aria-label=\"Library package control\">LIB</span>\r\n  </mat-label>\r\n  <mat-select multiple [attr.name]=\"config.name\" [disabled]=\"config.disabled\" [required]=\"config.required\" [ngModel]=\"config.value\"\r\n    (ngModelChange)=\"valueChange.emit($event)\" (blur)=\"blurEvent.emit($event)\" (focus)=\"focusEvent.emit($event)\"\r\n    (input)=\"inputEvent.emit($event)\" (change)=\"changeEvent.emit($event)\" (keydown)=\"keydownEvent.emit($event)\"\r\n    (keyup)=\"keyupEvent.emit($event)\" (click)=\"clickEvent.emit($event)\" panelClass=\"br-multi-select-panel\">\r\n    <mat-select-trigger>\r\n      {{ selectedLabels.length > 0 ? selectedLabels.join(', ') : 'Select options' }}\r\n    </mat-select-trigger>\r\n    <mat-option *ngFor=\"let opt of config.options\" [value]=\"opt.value\">\r\n      <mat-checkbox [checked]=\"isSelected(opt.value)\" [disableRipple]=\"true\">\r\n        {{ opt.label }}\r\n      </mat-checkbox>\r\n    </mat-option>\r\n  </mat-select>\r\n</mat-form-field>\r\n\r\n<div class=\"br-selected-chips\" *ngIf=\"selectedValues.length > 0\">\r\n  <ng-container *ngFor=\"let opt of config.options\">\r\n    <button type=\"button\" class=\"br-chip\" *ngIf=\"isSelected(opt.value)\" (click)=\"removeValue(opt.value, $event)\"\r\n      [disabled]=\"config.disabled\">\r\n      <span>{{ opt.label }}</span>\r\n      <span class=\"chip-close\">x</span>\r\n    </button>\r\n  </ng-container>\r\n</div>\r\n", styles: [".br-material-field{width:100%;font-family:var(--br-font-family, Tahoma, Arial, sans-serif)}.br-material-label{display:inline-flex;align-items:center;gap:8px;color:var(--br-label-font-color, #1f2a3d)}.br-lib-tag{display:inline-flex;align-items:center;gap:5px;padding:2px 8px;border-radius:999px;background:linear-gradient(135deg,#e8f0fe,#d2e3fc);color:#174ea6;font-size:10px;font-weight:800;letter-spacing:.4px}.br-lib-tag:before{content:\"\";width:6px;height:6px;border-radius:50%;background:#174ea6}:host ::ng-deep .br-material-field .mat-mdc-form-field-subscript-wrapper{display:none}:host ::ng-deep .br-material-field .mdc-text-field--outlined{background:var(--br-input-background-color, #ffffff)}:host ::ng-deep .br-material-field .mdc-notched-outline__leading,:host ::ng-deep .br-material-field .mdc-notched-outline__notch,:host ::ng-deep .br-material-field .mdc-notched-outline__trailing{border-color:var(--br-input-border-color, #c8d5e6)}:host ::ng-deep .br-material-field.mat-focused .mdc-notched-outline__leading,:host ::ng-deep .br-material-field.mat-focused .mdc-notched-outline__notch,:host ::ng-deep .br-material-field.mat-focused .mdc-notched-outline__trailing{border-color:var(--br-focus-color, #2563eb)}:host ::ng-deep .br-material-field .mat-mdc-select-value-text,:host ::ng-deep .br-material-field .mat-mdc-select-min-line{color:var(--br-input-text-color, #1f2a3d);font-family:var(--br-font-family, Tahoma, Arial, sans-serif);font-size:var(--br-base-font-size, 14px)}:host ::ng-deep .br-material-field .mat-mdc-select-arrow,:host ::ng-deep .br-material-field.mat-focused .mat-mdc-select-arrow{color:var(--br-focus-color, #2563eb)}:host ::ng-deep .br-material-field .mat-mdc-option .mdc-label{width:100%;color:var(--br-base-font-color, #1f2937)}:host ::ng-deep .br-material-field .mat-mdc-option .mat-mdc-checkbox{width:100%}:host ::ng-deep .br-multi-select-panel{background:var(--br-section-background-color, #ffffff)}:host ::ng-deep .br-multi-select-panel .mat-pseudo-checkbox{display:none!important}:host ::ng-deep .br-multi-select-panel .mdc-checkbox__background{border-color:var(--br-input-border-color, #c8d5e6)!important}:host ::ng-deep .br-multi-select-panel .mat-mdc-option.mdc-list-item--selected{background:color-mix(in srgb,var(--br-focus-color, #2563eb) 10%,var(--br-section-background-color, #ffffff))}.br-selected-chips{display:flex;flex-wrap:wrap;gap:8px;margin-top:2px}.br-chip{border:1px solid var(--br-section-border-color, #d1d5db);background:color-mix(in srgb,var(--br-focus-color, #2563eb) 8%,var(--br-section-background-color, #f8fafc));color:var(--br-accent-color, var(--br-focus-color, #1f2937));border-radius:999px;padding:4px 10px;font-size:12px;display:inline-flex;align-items:center;gap:6px;cursor:pointer}.chip-close{font-weight:700;line-height:1}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "ngmodule", type: FormsModule }, { kind: "directive", type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i2.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }, { kind: "directive", type: i2.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { kind: "ngmodule", type: MatCheckboxModule }, { kind: "component", type: i3$3.MatCheckbox, selector: "mat-checkbox", inputs: ["aria-label", "aria-labelledby", "aria-describedby", "aria-expanded", "aria-controls", "aria-owns", "id", "required", "labelPosition", "name", "value", "disableRipple", "tabIndex", "color", "disabledInteractive", "checked", "disabled", "indeterminate"], outputs: ["change", "indeterminateChange"], exportAs: ["matCheckbox"] }, { kind: "ngmodule", type: MatFormFieldModule }, { kind: "component", type: i3$2.MatFormField, selector: "mat-form-field", inputs: ["hideRequiredMarker", "color", "floatLabel", "appearance", "subscriptSizing", "hintLabel"], exportAs: ["matFormField"] }, { kind: "directive", type: i3$2.MatLabel, selector: "mat-label" }, { kind: "ngmodule", type: MatSelectModule }, { kind: "component", type: i5$1.MatSelect, selector: "mat-select", inputs: ["aria-describedby", "panelClass", "disabled", "disableRipple", "tabIndex", "hideSingleSelectionIndicator", "placeholder", "required", "multiple", "disableOptionCentering", "compareWith", "value", "aria-label", "aria-labelledby", "errorStateMatcher", "typeaheadDebounceInterval", "sortComparator", "id", "panelWidth", "canSelectNullableOptions"], outputs: ["openedChange", "opened", "closed", "selectionChange", "valueChange"], exportAs: ["matSelect"] }, { kind: "directive", type: i5$1.MatSelectTrigger, selector: "mat-select-trigger" }, { kind: "component", type: i5$1.MatOption, selector: "mat-option", inputs: ["value", "id", "disabled"], outputs: ["onSelectionChange"], exportAs: ["matOption"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.19", ngImport: i0, type: MaterialMultiSelectControlComponent, decorators: [{
            type: Component,
            args: [{ selector: 'br-material-multi-select-control', standalone: true, imports: [CommonModule, FormsModule, MatCheckboxModule, MatFormFieldModule, MatSelectModule], template: "<mat-form-field appearance=\"outline\" class=\"br-material-field\" [ngClass]=\"config.className\" [attr.id]=\"config.id\">\r\n  <mat-label class=\"br-material-label\">\r\n    {{ config.label }}\r\n    <span *ngIf=\"showLibraryTag\" class=\"br-lib-tag\" aria-label=\"Library package control\">LIB</span>\r\n  </mat-label>\r\n  <mat-select multiple [attr.name]=\"config.name\" [disabled]=\"config.disabled\" [required]=\"config.required\" [ngModel]=\"config.value\"\r\n    (ngModelChange)=\"valueChange.emit($event)\" (blur)=\"blurEvent.emit($event)\" (focus)=\"focusEvent.emit($event)\"\r\n    (input)=\"inputEvent.emit($event)\" (change)=\"changeEvent.emit($event)\" (keydown)=\"keydownEvent.emit($event)\"\r\n    (keyup)=\"keyupEvent.emit($event)\" (click)=\"clickEvent.emit($event)\" panelClass=\"br-multi-select-panel\">\r\n    <mat-select-trigger>\r\n      {{ selectedLabels.length > 0 ? selectedLabels.join(', ') : 'Select options' }}\r\n    </mat-select-trigger>\r\n    <mat-option *ngFor=\"let opt of config.options\" [value]=\"opt.value\">\r\n      <mat-checkbox [checked]=\"isSelected(opt.value)\" [disableRipple]=\"true\">\r\n        {{ opt.label }}\r\n      </mat-checkbox>\r\n    </mat-option>\r\n  </mat-select>\r\n</mat-form-field>\r\n\r\n<div class=\"br-selected-chips\" *ngIf=\"selectedValues.length > 0\">\r\n  <ng-container *ngFor=\"let opt of config.options\">\r\n    <button type=\"button\" class=\"br-chip\" *ngIf=\"isSelected(opt.value)\" (click)=\"removeValue(opt.value, $event)\"\r\n      [disabled]=\"config.disabled\">\r\n      <span>{{ opt.label }}</span>\r\n      <span class=\"chip-close\">x</span>\r\n    </button>\r\n  </ng-container>\r\n</div>\r\n", styles: [".br-material-field{width:100%;font-family:var(--br-font-family, Tahoma, Arial, sans-serif)}.br-material-label{display:inline-flex;align-items:center;gap:8px;color:var(--br-label-font-color, #1f2a3d)}.br-lib-tag{display:inline-flex;align-items:center;gap:5px;padding:2px 8px;border-radius:999px;background:linear-gradient(135deg,#e8f0fe,#d2e3fc);color:#174ea6;font-size:10px;font-weight:800;letter-spacing:.4px}.br-lib-tag:before{content:\"\";width:6px;height:6px;border-radius:50%;background:#174ea6}:host ::ng-deep .br-material-field .mat-mdc-form-field-subscript-wrapper{display:none}:host ::ng-deep .br-material-field .mdc-text-field--outlined{background:var(--br-input-background-color, #ffffff)}:host ::ng-deep .br-material-field .mdc-notched-outline__leading,:host ::ng-deep .br-material-field .mdc-notched-outline__notch,:host ::ng-deep .br-material-field .mdc-notched-outline__trailing{border-color:var(--br-input-border-color, #c8d5e6)}:host ::ng-deep .br-material-field.mat-focused .mdc-notched-outline__leading,:host ::ng-deep .br-material-field.mat-focused .mdc-notched-outline__notch,:host ::ng-deep .br-material-field.mat-focused .mdc-notched-outline__trailing{border-color:var(--br-focus-color, #2563eb)}:host ::ng-deep .br-material-field .mat-mdc-select-value-text,:host ::ng-deep .br-material-field .mat-mdc-select-min-line{color:var(--br-input-text-color, #1f2a3d);font-family:var(--br-font-family, Tahoma, Arial, sans-serif);font-size:var(--br-base-font-size, 14px)}:host ::ng-deep .br-material-field .mat-mdc-select-arrow,:host ::ng-deep .br-material-field.mat-focused .mat-mdc-select-arrow{color:var(--br-focus-color, #2563eb)}:host ::ng-deep .br-material-field .mat-mdc-option .mdc-label{width:100%;color:var(--br-base-font-color, #1f2937)}:host ::ng-deep .br-material-field .mat-mdc-option .mat-mdc-checkbox{width:100%}:host ::ng-deep .br-multi-select-panel{background:var(--br-section-background-color, #ffffff)}:host ::ng-deep .br-multi-select-panel .mat-pseudo-checkbox{display:none!important}:host ::ng-deep .br-multi-select-panel .mdc-checkbox__background{border-color:var(--br-input-border-color, #c8d5e6)!important}:host ::ng-deep .br-multi-select-panel .mat-mdc-option.mdc-list-item--selected{background:color-mix(in srgb,var(--br-focus-color, #2563eb) 10%,var(--br-section-background-color, #ffffff))}.br-selected-chips{display:flex;flex-wrap:wrap;gap:8px;margin-top:2px}.br-chip{border:1px solid var(--br-section-border-color, #d1d5db);background:color-mix(in srgb,var(--br-focus-color, #2563eb) 8%,var(--br-section-background-color, #f8fafc));color:var(--br-accent-color, var(--br-focus-color, #1f2937));border-radius:999px;padding:4px 10px;font-size:12px;display:inline-flex;align-items:center;gap:6px;cursor:pointer}.chip-close{font-weight:700;line-height:1}\n"] }]
        }], propDecorators: { config: [{
                type: Input
            }], showLibraryTag: [{
                type: Input
            }], valueChange: [{
                type: Output
            }], blurEvent: [{
                type: Output
            }], focusEvent: [{
                type: Output
            }], inputEvent: [{
                type: Output
            }], changeEvent: [{
                type: Output
            }], keydownEvent: [{
                type: Output
            }], keyupEvent: [{
                type: Output
            }], clickEvent: [{
                type: Output
            }] } });

class PrimeMultiSelectControlComponent {
    config;
    valueChange = new EventEmitter();
    onValueChange(newValue) {
        this.valueChange.emit(newValue);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.19", ngImport: i0, type: PrimeMultiSelectControlComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.19", type: PrimeMultiSelectControlComponent, isStandalone: true, selector: "br-prime-multi-select-control", inputs: { config: "config" }, outputs: { valueChange: "valueChange" }, ngImport: i0, template: `
    <div class="br-prime-multi-select-wrapper" [class]="config?.className || ''">
      <label *ngIf="config?.label" [for]="config?.id" class="br-prime-label">
        {{ config.label }}
        <span *ngIf="config.required" class="br-prime-required">*</span>
      </label>
      <div class="br-prime-control-container">
        <p-multiselect
          [options]="config?.options || []"
          [ngModel]="config?.value"
          (ngModelChange)="onValueChange($event)"
          [disabled]="config?.disabled || false"
          [id]="config?.id"
          [name]="config?.name || ''"
          optionLabel="label"
          optionValue="value"
          [required]="config?.required || false"
          placeholder="Select options"
          styleClass="w-full"
          display="chip"
        ></p-multiselect>
      </div>
    </div>
  `, isInline: true, styles: [".br-prime-multi-select-wrapper{display:flex;flex-direction:column;gap:.5rem;margin-bottom:1rem}.br-prime-label{font-weight:500;color:var(--br-text-color, #333);font-size:.875rem}.br-prime-required{color:#e53e3e;margin-left:.25rem}::ng-deep .br-prime-control-container .p-multiselect{width:100%}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "ngmodule", type: FormsModule }, { kind: "directive", type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i2.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }, { kind: "directive", type: i2.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { kind: "ngmodule", type: MultiSelectModule }, { kind: "component", type: i12.MultiSelect, selector: "p-multiSelect, p-multiselect, p-multi-select", inputs: ["id", "ariaLabel", "styleClass", "panelStyle", "panelStyleClass", "inputId", "readonly", "group", "filter", "filterPlaceHolder", "filterLocale", "overlayVisible", "tabindex", "dataKey", "ariaLabelledBy", "displaySelectedLabel", "maxSelectedLabels", "selectionLimit", "selectedItemsLabel", "showToggleAll", "emptyFilterMessage", "emptyMessage", "resetFilterOnHide", "dropdownIcon", "chipIcon", "optionLabel", "optionValue", "optionDisabled", "optionGroupLabel", "optionGroupChildren", "showHeader", "filterBy", "scrollHeight", "lazy", "virtualScroll", "loading", "virtualScrollItemSize", "loadingIcon", "virtualScrollOptions", "overlayOptions", "ariaFilterLabel", "filterMatchMode", "tooltip", "tooltipPosition", "tooltipPositionStyle", "tooltipStyleClass", "autofocusFilter", "display", "autocomplete", "showClear", "autofocus", "placeholder", "options", "filterValue", "selectAll", "focusOnHover", "filterFields", "selectOnFocus", "autoOptionFocus", "highlightOnSelect", "size", "variant", "fluid", "appendTo", "motionOptions"], outputs: ["onChange", "onFilter", "onFocus", "onBlur", "onClick", "onClear", "onPanelShow", "onPanelHide", "onLazyLoad", "onRemove", "onSelectAllChange"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.19", ngImport: i0, type: PrimeMultiSelectControlComponent, decorators: [{
            type: Component,
            args: [{ selector: 'br-prime-multi-select-control', standalone: true, imports: [CommonModule, FormsModule, MultiSelectModule], template: `
    <div class="br-prime-multi-select-wrapper" [class]="config?.className || ''">
      <label *ngIf="config?.label" [for]="config?.id" class="br-prime-label">
        {{ config.label }}
        <span *ngIf="config.required" class="br-prime-required">*</span>
      </label>
      <div class="br-prime-control-container">
        <p-multiselect
          [options]="config?.options || []"
          [ngModel]="config?.value"
          (ngModelChange)="onValueChange($event)"
          [disabled]="config?.disabled || false"
          [id]="config?.id"
          [name]="config?.name || ''"
          optionLabel="label"
          optionValue="value"
          [required]="config?.required || false"
          placeholder="Select options"
          styleClass="w-full"
          display="chip"
        ></p-multiselect>
      </div>
    </div>
  `, styles: [".br-prime-multi-select-wrapper{display:flex;flex-direction:column;gap:.5rem;margin-bottom:1rem}.br-prime-label{font-weight:500;color:var(--br-text-color, #333);font-size:.875rem}.br-prime-required{color:#e53e3e;margin-left:.25rem}::ng-deep .br-prime-control-container .p-multiselect{width:100%}\n"] }]
        }], propDecorators: { config: [{
                type: Input
            }], valueChange: [{
                type: Output
            }] } });

class BrMultiSelectComponent extends BaseValueAccessor {
    runtimeUiConfig;
    controlRegistry;
    config;
    id;
    controlId;
    name;
    className;
    value;
    options;
    disabled;
    required;
    label;
    meta;
    showLibraryTag = true;
    valueChange = new EventEmitter();
    blur = new EventEmitter();
    focus = new EventEmitter();
    input = new EventEmitter();
    change = new EventEmitter();
    keydown = new EventEmitter();
    keyup = new EventEmitter();
    click = new EventEmitter();
    controlEvent = new EventEmitter();
    mode = 'CUSTOM';
    customConfig;
    materialConfig;
    primeConfig;
    destroy$ = new Subject();
    registryHandle;
    constructor(runtimeUiConfig, controlRegistry) {
        super();
        this.runtimeUiConfig = runtimeUiConfig;
        this.controlRegistry = controlRegistry;
    }
    ngOnInit() {
        this.mode = this.runtimeUiConfig.getModesSnapshot().multiSelect;
        this.adaptConfig();
        this.runtimeUiConfig.modes$.pipe(takeUntil(this.destroy$)).subscribe((m) => {
            this.mode = m.multiSelect;
            this.adaptConfig();
        });
        this.refreshRegistryRegistration();
    }
    ngOnChanges(_) {
        this.adaptConfig();
        this.refreshRegistryRegistration();
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
        if (this.registryHandle) {
            this.controlRegistry.unregister(this.registryHandle);
        }
    }
    onImplementationValueChange(value) {
        this.value = Array.isArray(value) ? [...value] : [];
        this.valueChange.emit(this.value);
        this.emitValueChange(this.value);
        this.emitControlEvent('valueChange', this.value);
        this.refreshRegistryRegistration();
    }
    onImplementationBlur(event) {
        this.blur.emit(event);
        this.emitControlEvent('blur', this.value ?? [], event);
        this.markTouched();
    }
    onImplementationFocus(event) {
        this.focus.emit(event);
        this.emitControlEvent('focus', this.value ?? [], event);
    }
    onImplementationInput(event) {
        this.input.emit(event);
        this.emitControlEvent('input', this.value ?? [], event);
    }
    onImplementationChange(event) {
        this.change.emit(event);
        this.emitControlEvent('change', this.value ?? [], event);
    }
    onImplementationKeydown(event) {
        this.keydown.emit(event);
        this.emitControlEvent('keydown', this.value ?? [], event);
    }
    onImplementationKeyup(event) {
        this.keyup.emit(event);
        this.emitControlEvent('keyup', this.value ?? [], event);
    }
    onImplementationClick(event) {
        this.click.emit(event);
        this.emitControlEvent('click', this.value ?? [], event);
    }
    normalizeValue(value) {
        return Array.isArray(value) ? [...value] : [];
    }
    afterWriteValue(value) {
        this.value = value;
        this.adaptConfig();
        this.refreshRegistryRegistration();
    }
    afterDisabledStateChange(isDisabled) {
        this.disabled = isDisabled;
        this.adaptConfig();
    }
    adaptConfig() {
        const resolved = this.resolveConfig();
        if (this.mode === 'CUSTOM') {
            this.customConfig = MultiSelectAdapter.toCustom(resolved);
        }
        else if (this.mode === 'MATERIAL') {
            this.materialConfig = MultiSelectAdapter.toMaterial(resolved);
        }
        else if (this.mode === 'PRIMENG') {
            this.primeConfig = MultiSelectAdapter.toPrime(resolved);
        }
        else {
            // Fallback
            this.materialConfig = MultiSelectAdapter.toMaterial(resolved);
        }
    }
    resolveConfig() {
        const source = this.config
            ? { ...this.config }
            : {
                label: '',
                value: [],
                options: [],
            };
        return {
            ...source,
            id: this.effectiveId,
            controlId: this.controlId,
            name: this.name ?? source.name,
            className: this.className ?? source.className,
            meta: this.meta ?? source.meta,
            label: this.label ?? source.label,
            value: this.value !== undefined ? this.value : source.value,
            options: this.options ?? source.options ?? [],
            disabled: this.disabled ?? source.disabled ?? this.currentDisabled,
            required: this.required ?? source.required ?? false,
        };
    }
    get effectiveId() {
        return this.id || this.controlId || this.config?.id || this.config?.controlId;
    }
    refreshRegistryRegistration() {
        if (this.registryHandle) {
            this.controlRegistry.unregister(this.registryHandle);
        }
        this.registryHandle = {
            id: this.effectiveId,
            name: this.name || this.config?.name,
            classes: this.extractClasses(this.className || this.config?.className),
            type: 'multiSelect',
            getValue: () => this.value ?? this.config?.value ?? [],
        };
        this.controlRegistry.register(this.registryHandle);
    }
    extractClasses(classNames) {
        return (classNames || '')
            .split(/\s+/)
            .map((part) => part.trim())
            .filter((part) => !!part);
    }
    emitControlEvent(type, value, originalEvent) {
        this.controlEvent.emit({
            type,
            id: this.effectiveId,
            name: this.name || this.config?.name,
            className: this.className || this.config?.className,
            value,
            meta: this.meta || this.config?.meta,
            originalEvent,
        });
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.19", ngImport: i0, type: BrMultiSelectComponent, deps: [{ token: RuntimeUiConfigService }, { token: ControlRegistryService }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.19", type: BrMultiSelectComponent, isStandalone: true, selector: "br-multi-select", inputs: { config: "config", id: "id", controlId: "controlId", name: "name", className: "className", value: "value", options: "options", disabled: "disabled", required: "required", label: "label", meta: "meta", showLibraryTag: "showLibraryTag" }, outputs: { valueChange: "valueChange", blur: "blur", focus: "focus", input: "input", change: "change", keydown: "keydown", keyup: "keyup", click: "click", controlEvent: "controlEvent" }, providers: [
            {
                provide: NG_VALUE_ACCESSOR,
                useExisting: forwardRef(() => BrMultiSelectComponent),
                multi: true,
            },
        ], usesInheritance: true, usesOnChanges: true, ngImport: i0, template: "<br-custom-multi-select-control *ngIf=\"mode === 'CUSTOM' && customConfig as cfg\" [config]=\"cfg\"\r\n  [showLibraryTag]=\"showLibraryTag\" (valueChange)=\"onImplementationValueChange($event)\"\r\n  (blurEvent)=\"onImplementationBlur($event)\" (focusEvent)=\"onImplementationFocus($event)\"\r\n  (inputEvent)=\"onImplementationInput($event)\" (changeEvent)=\"onImplementationChange($event)\"\r\n  (keydownEvent)=\"onImplementationKeydown($event)\" (keyupEvent)=\"onImplementationKeyup($event)\"\r\n  (clickEvent)=\"onImplementationClick($event)\">\r\n</br-custom-multi-select-control>\r\n\r\n<br-material-multi-select-control *ngIf=\"mode === 'MATERIAL' && materialConfig as cfg\" [config]=\"cfg\"\r\n  [showLibraryTag]=\"showLibraryTag\" (valueChange)=\"onImplementationValueChange($event)\"\r\n  (blurEvent)=\"onImplementationBlur($event)\" (focusEvent)=\"onImplementationFocus($event)\"\r\n  (inputEvent)=\"onImplementationInput($event)\" (changeEvent)=\"onImplementationChange($event)\"\r\n  (keydownEvent)=\"onImplementationKeydown($event)\" (keyupEvent)=\"onImplementationKeyup($event)\"\r\n  (clickEvent)=\"onImplementationClick($event)\">\r\n</br-material-multi-select-control>\r\n\r\n<br-prime-multi-select-control *ngIf=\"mode === 'PRIMENG' && primeConfig as cfg\" [config]=\"cfg\"\r\n  (valueChange)=\"onImplementationValueChange($event)\">\r\n</br-prime-multi-select-control>", dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: CustomMultiSelectControlComponent, selector: "br-custom-multi-select-control", inputs: ["config", "showLibraryTag"], outputs: ["valueChange", "blurEvent", "focusEvent", "inputEvent", "changeEvent", "keydownEvent", "keyupEvent", "clickEvent"] }, { kind: "component", type: MaterialMultiSelectControlComponent, selector: "br-material-multi-select-control", inputs: ["config", "showLibraryTag"], outputs: ["valueChange", "blurEvent", "focusEvent", "inputEvent", "changeEvent", "keydownEvent", "keyupEvent", "clickEvent"] }, { kind: "component", type: PrimeMultiSelectControlComponent, selector: "br-prime-multi-select-control", inputs: ["config"], outputs: ["valueChange"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.19", ngImport: i0, type: BrMultiSelectComponent, decorators: [{
            type: Component,
            args: [{ selector: 'br-multi-select', standalone: true, imports: [CommonModule, CustomMultiSelectControlComponent, MaterialMultiSelectControlComponent, PrimeMultiSelectControlComponent], providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(() => BrMultiSelectComponent),
                            multi: true,
                        },
                    ], template: "<br-custom-multi-select-control *ngIf=\"mode === 'CUSTOM' && customConfig as cfg\" [config]=\"cfg\"\r\n  [showLibraryTag]=\"showLibraryTag\" (valueChange)=\"onImplementationValueChange($event)\"\r\n  (blurEvent)=\"onImplementationBlur($event)\" (focusEvent)=\"onImplementationFocus($event)\"\r\n  (inputEvent)=\"onImplementationInput($event)\" (changeEvent)=\"onImplementationChange($event)\"\r\n  (keydownEvent)=\"onImplementationKeydown($event)\" (keyupEvent)=\"onImplementationKeyup($event)\"\r\n  (clickEvent)=\"onImplementationClick($event)\">\r\n</br-custom-multi-select-control>\r\n\r\n<br-material-multi-select-control *ngIf=\"mode === 'MATERIAL' && materialConfig as cfg\" [config]=\"cfg\"\r\n  [showLibraryTag]=\"showLibraryTag\" (valueChange)=\"onImplementationValueChange($event)\"\r\n  (blurEvent)=\"onImplementationBlur($event)\" (focusEvent)=\"onImplementationFocus($event)\"\r\n  (inputEvent)=\"onImplementationInput($event)\" (changeEvent)=\"onImplementationChange($event)\"\r\n  (keydownEvent)=\"onImplementationKeydown($event)\" (keyupEvent)=\"onImplementationKeyup($event)\"\r\n  (clickEvent)=\"onImplementationClick($event)\">\r\n</br-material-multi-select-control>\r\n\r\n<br-prime-multi-select-control *ngIf=\"mode === 'PRIMENG' && primeConfig as cfg\" [config]=\"cfg\"\r\n  (valueChange)=\"onImplementationValueChange($event)\">\r\n</br-prime-multi-select-control>" }]
        }], ctorParameters: () => [{ type: RuntimeUiConfigService }, { type: ControlRegistryService }], propDecorators: { config: [{
                type: Input
            }], id: [{
                type: Input
            }], controlId: [{
                type: Input
            }], name: [{
                type: Input
            }], className: [{
                type: Input
            }], value: [{
                type: Input
            }], options: [{
                type: Input
            }], disabled: [{
                type: Input
            }], required: [{
                type: Input
            }], label: [{
                type: Input
            }], meta: [{
                type: Input
            }], showLibraryTag: [{
                type: Input
            }], valueChange: [{
                type: Output
            }], blur: [{
                type: Output
            }], focus: [{
                type: Output
            }], input: [{
                type: Output
            }], change: [{
                type: Output
            }], keydown: [{
                type: Output
            }], keyup: [{
                type: Output
            }], click: [{
                type: Output
            }], controlEvent: [{
                type: Output
            }] } });

class CheckboxAdapter {
    static toCustom(config) {
        return {
            id: config.id || config.controlId,
            name: config.name,
            className: config.className,
            label: config.label || '',
            checked: config.value ?? config.checked ?? false,
            required: config.required ?? false,
            disabled: config.disabled ?? false,
        };
    }
    static toMaterial(config) {
        return {
            id: config.id || config.controlId,
            name: config.name,
            className: config.className,
            label: config.label || '',
            checked: config.value ?? config.checked ?? false,
            required: config.required ?? false,
            disabled: config.disabled ?? false,
        };
    }
    static toPrime(config) {
        return {
            id: config.id || config.controlId,
            name: config.name,
            className: config.className,
            label: config.label || '',
            checked: config.value ?? config.checked ?? false,
            required: config.required ?? false,
            disabled: config.disabled ?? false,
        };
    }
}

class CustomCheckboxControlComponent {
    config;
    showLibraryTag = false;
    valueChange = new EventEmitter();
    blurEvent = new EventEmitter();
    focusEvent = new EventEmitter();
    inputEvent = new EventEmitter();
    changeEvent = new EventEmitter();
    keydownEvent = new EventEmitter();
    keyupEvent = new EventEmitter();
    clickEvent = new EventEmitter();
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.19", ngImport: i0, type: CustomCheckboxControlComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.19", type: CustomCheckboxControlComponent, isStandalone: true, selector: "br-custom-checkbox-control", inputs: { config: "config", showLibraryTag: "showLibraryTag" }, outputs: { valueChange: "valueChange", blurEvent: "blurEvent", focusEvent: "focusEvent", inputEvent: "inputEvent", changeEvent: "changeEvent", keydownEvent: "keydownEvent", keyupEvent: "keyupEvent", clickEvent: "clickEvent" }, ngImport: i0, template: "<label class=\"br-checkbox-row\" [ngClass]=\"config.className\" [attr.id]=\"config.id\">\r\n  <input class=\"br-checkbox\" [attr.name]=\"config.name\" type=\"checkbox\" [disabled]=\"config.disabled\" [required]=\"config.required\"\r\n    [ngModel]=\"config.checked\" (ngModelChange)=\"valueChange.emit($event)\" (blur)=\"blurEvent.emit($event)\"\r\n    (focus)=\"focusEvent.emit($event)\" (input)=\"inputEvent.emit($event)\" (change)=\"changeEvent.emit($event)\"\r\n    (keydown)=\"keydownEvent.emit($event)\" (keyup)=\"keyupEvent.emit($event)\" (click)=\"clickEvent.emit($event)\" />\r\n  <span class=\"br-label-text\">{{ config.label }}</span>\r\n  <span *ngIf=\"showLibraryTag\" class=\"br-lib-tag\" aria-label=\"Library package control\">LIB</span>\r\n</label>\r\n", styles: [".br-checkbox-row{display:inline-flex;align-items:center;gap:10px;font-size:var(--br-base-font-size, 14px);font-weight:600;color:var(--br-label-font-color, #1f2a3d);cursor:pointer;font-family:var(--br-font-family, Tahoma, Arial, sans-serif)}.br-label-text{display:inline-flex;align-items:center}.br-lib-tag{display:inline-flex;align-items:center;gap:5px;margin-left:2px;padding:2px 8px;border-radius:999px;background:linear-gradient(135deg,#e8f0fe,#d2e3fc);color:#174ea6;font-size:10px;font-weight:800;letter-spacing:.4px}.br-lib-tag:before{content:\"\";width:6px;height:6px;border-radius:50%;background:#174ea6}.br-checkbox{width:18px;height:18px;accent-color:var(--br-accent-color, var(--br-focus-color, #2563eb));cursor:pointer}.br-checkbox:disabled{cursor:not-allowed}.br-checkbox:disabled+.br-label-text{color:var(--br-input-disabled-text-color, #94a3b8)}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "ngmodule", type: FormsModule }, { kind: "directive", type: i2.CheckboxControlValueAccessor, selector: "input[type=checkbox][formControlName],input[type=checkbox][formControl],input[type=checkbox][ngModel]" }, { kind: "directive", type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i2.CheckboxRequiredValidator, selector: "input[type=checkbox][required][formControlName],input[type=checkbox][required][formControl],input[type=checkbox][required][ngModel]" }, { kind: "directive", type: i2.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.19", ngImport: i0, type: CustomCheckboxControlComponent, decorators: [{
            type: Component,
            args: [{ selector: 'br-custom-checkbox-control', standalone: true, imports: [CommonModule, FormsModule], template: "<label class=\"br-checkbox-row\" [ngClass]=\"config.className\" [attr.id]=\"config.id\">\r\n  <input class=\"br-checkbox\" [attr.name]=\"config.name\" type=\"checkbox\" [disabled]=\"config.disabled\" [required]=\"config.required\"\r\n    [ngModel]=\"config.checked\" (ngModelChange)=\"valueChange.emit($event)\" (blur)=\"blurEvent.emit($event)\"\r\n    (focus)=\"focusEvent.emit($event)\" (input)=\"inputEvent.emit($event)\" (change)=\"changeEvent.emit($event)\"\r\n    (keydown)=\"keydownEvent.emit($event)\" (keyup)=\"keyupEvent.emit($event)\" (click)=\"clickEvent.emit($event)\" />\r\n  <span class=\"br-label-text\">{{ config.label }}</span>\r\n  <span *ngIf=\"showLibraryTag\" class=\"br-lib-tag\" aria-label=\"Library package control\">LIB</span>\r\n</label>\r\n", styles: [".br-checkbox-row{display:inline-flex;align-items:center;gap:10px;font-size:var(--br-base-font-size, 14px);font-weight:600;color:var(--br-label-font-color, #1f2a3d);cursor:pointer;font-family:var(--br-font-family, Tahoma, Arial, sans-serif)}.br-label-text{display:inline-flex;align-items:center}.br-lib-tag{display:inline-flex;align-items:center;gap:5px;margin-left:2px;padding:2px 8px;border-radius:999px;background:linear-gradient(135deg,#e8f0fe,#d2e3fc);color:#174ea6;font-size:10px;font-weight:800;letter-spacing:.4px}.br-lib-tag:before{content:\"\";width:6px;height:6px;border-radius:50%;background:#174ea6}.br-checkbox{width:18px;height:18px;accent-color:var(--br-accent-color, var(--br-focus-color, #2563eb));cursor:pointer}.br-checkbox:disabled{cursor:not-allowed}.br-checkbox:disabled+.br-label-text{color:var(--br-input-disabled-text-color, #94a3b8)}\n"] }]
        }], propDecorators: { config: [{
                type: Input
            }], showLibraryTag: [{
                type: Input
            }], valueChange: [{
                type: Output
            }], blurEvent: [{
                type: Output
            }], focusEvent: [{
                type: Output
            }], inputEvent: [{
                type: Output
            }], changeEvent: [{
                type: Output
            }], keydownEvent: [{
                type: Output
            }], keyupEvent: [{
                type: Output
            }], clickEvent: [{
                type: Output
            }] } });

class MaterialCheckboxControlComponent {
    config;
    showLibraryTag = false;
    valueChange = new EventEmitter();
    blurEvent = new EventEmitter();
    focusEvent = new EventEmitter();
    inputEvent = new EventEmitter();
    changeEvent = new EventEmitter();
    keydownEvent = new EventEmitter();
    keyupEvent = new EventEmitter();
    clickEvent = new EventEmitter();
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.19", ngImport: i0, type: MaterialCheckboxControlComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.19", type: MaterialCheckboxControlComponent, isStandalone: true, selector: "br-material-checkbox-control", inputs: { config: "config", showLibraryTag: "showLibraryTag" }, outputs: { valueChange: "valueChange", blurEvent: "blurEvent", focusEvent: "focusEvent", inputEvent: "inputEvent", changeEvent: "changeEvent", keydownEvent: "keydownEvent", keyupEvent: "keyupEvent", clickEvent: "clickEvent" }, ngImport: i0, template: "<mat-checkbox class=\"br-material-checkbox\" [ngClass]=\"config.className\" [attr.id]=\"config.id\" [attr.name]=\"config.name\"\r\n  [disabled]=\"config.disabled\" [required]=\"config.required\" [ngModel]=\"config.checked\" (ngModelChange)=\"valueChange.emit($event)\"\r\n  (blur)=\"blurEvent.emit($event)\" (focus)=\"focusEvent.emit($event)\" (input)=\"inputEvent.emit($event)\"\r\n  (change)=\"changeEvent.emit($event)\" (keydown)=\"keydownEvent.emit($event)\" (keyup)=\"keyupEvent.emit($event)\"\r\n  (click)=\"clickEvent.emit($event)\">\r\n  <span class=\"br-label-text\">{{ config.label }}</span>\r\n  <span *ngIf=\"showLibraryTag\" class=\"br-lib-tag\" aria-label=\"Library package control\">LIB</span>\r\n</mat-checkbox>\r\n", styles: [".br-material-checkbox{display:block;font-family:var(--br-font-family, Tahoma, Arial, sans-serif)}.br-label-text{display:inline-flex;align-items:center}.br-lib-tag{display:inline-flex;align-items:center;gap:5px;margin-left:6px;padding:2px 8px;border-radius:999px;background:linear-gradient(135deg,#e8f0fe,#d2e3fc);color:#174ea6;font-size:10px;font-weight:800;letter-spacing:.4px}.br-lib-tag:before{content:\"\";width:6px;height:6px;border-radius:50%;background:#174ea6}:host ::ng-deep .br-material-checkbox .mdc-form-field,:host ::ng-deep .br-material-checkbox .mdc-label{color:var(--br-label-font-color, #1f2a3d);font-family:var(--br-font-family, Tahoma, Arial, sans-serif);font-size:var(--br-base-font-size, 14px)}:host ::ng-deep .br-material-checkbox .mdc-checkbox__background{border-color:var(--br-input-border-color, #c8d5e6)!important}:host ::ng-deep .br-material-checkbox.mat-mdc-checkbox-checked .mdc-checkbox__background,:host ::ng-deep .br-material-checkbox .mdc-checkbox__native-control:enabled:checked~.mdc-checkbox__background{background-color:var(--br-accent-color, var(--br-focus-color, #2563eb))!important;border-color:var(--br-accent-color, var(--br-focus-color, #2563eb))!important}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "ngmodule", type: FormsModule }, { kind: "directive", type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i2.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }, { kind: "directive", type: i2.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { kind: "ngmodule", type: MatCheckboxModule }, { kind: "component", type: i3$3.MatCheckbox, selector: "mat-checkbox", inputs: ["aria-label", "aria-labelledby", "aria-describedby", "aria-expanded", "aria-controls", "aria-owns", "id", "required", "labelPosition", "name", "value", "disableRipple", "tabIndex", "color", "disabledInteractive", "checked", "disabled", "indeterminate"], outputs: ["change", "indeterminateChange"], exportAs: ["matCheckbox"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.19", ngImport: i0, type: MaterialCheckboxControlComponent, decorators: [{
            type: Component,
            args: [{ selector: 'br-material-checkbox-control', standalone: true, imports: [CommonModule, FormsModule, MatCheckboxModule], template: "<mat-checkbox class=\"br-material-checkbox\" [ngClass]=\"config.className\" [attr.id]=\"config.id\" [attr.name]=\"config.name\"\r\n  [disabled]=\"config.disabled\" [required]=\"config.required\" [ngModel]=\"config.checked\" (ngModelChange)=\"valueChange.emit($event)\"\r\n  (blur)=\"blurEvent.emit($event)\" (focus)=\"focusEvent.emit($event)\" (input)=\"inputEvent.emit($event)\"\r\n  (change)=\"changeEvent.emit($event)\" (keydown)=\"keydownEvent.emit($event)\" (keyup)=\"keyupEvent.emit($event)\"\r\n  (click)=\"clickEvent.emit($event)\">\r\n  <span class=\"br-label-text\">{{ config.label }}</span>\r\n  <span *ngIf=\"showLibraryTag\" class=\"br-lib-tag\" aria-label=\"Library package control\">LIB</span>\r\n</mat-checkbox>\r\n", styles: [".br-material-checkbox{display:block;font-family:var(--br-font-family, Tahoma, Arial, sans-serif)}.br-label-text{display:inline-flex;align-items:center}.br-lib-tag{display:inline-flex;align-items:center;gap:5px;margin-left:6px;padding:2px 8px;border-radius:999px;background:linear-gradient(135deg,#e8f0fe,#d2e3fc);color:#174ea6;font-size:10px;font-weight:800;letter-spacing:.4px}.br-lib-tag:before{content:\"\";width:6px;height:6px;border-radius:50%;background:#174ea6}:host ::ng-deep .br-material-checkbox .mdc-form-field,:host ::ng-deep .br-material-checkbox .mdc-label{color:var(--br-label-font-color, #1f2a3d);font-family:var(--br-font-family, Tahoma, Arial, sans-serif);font-size:var(--br-base-font-size, 14px)}:host ::ng-deep .br-material-checkbox .mdc-checkbox__background{border-color:var(--br-input-border-color, #c8d5e6)!important}:host ::ng-deep .br-material-checkbox.mat-mdc-checkbox-checked .mdc-checkbox__background,:host ::ng-deep .br-material-checkbox .mdc-checkbox__native-control:enabled:checked~.mdc-checkbox__background{background-color:var(--br-accent-color, var(--br-focus-color, #2563eb))!important;border-color:var(--br-accent-color, var(--br-focus-color, #2563eb))!important}\n"] }]
        }], propDecorators: { config: [{
                type: Input
            }], showLibraryTag: [{
                type: Input
            }], valueChange: [{
                type: Output
            }], blurEvent: [{
                type: Output
            }], focusEvent: [{
                type: Output
            }], inputEvent: [{
                type: Output
            }], changeEvent: [{
                type: Output
            }], keydownEvent: [{
                type: Output
            }], keyupEvent: [{
                type: Output
            }], clickEvent: [{
                type: Output
            }] } });

class PrimeCheckboxControlComponent {
    config;
    showLibraryTag = false;
    valueChange = new EventEmitter();
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.19", ngImport: i0, type: PrimeCheckboxControlComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.19", type: PrimeCheckboxControlComponent, isStandalone: true, selector: "br-prime-checkbox-control", inputs: { config: "config", showLibraryTag: "showLibraryTag" }, outputs: { valueChange: "valueChange" }, ngImport: i0, template: `
    <div class="prime-checkbox-control">
      <p-checkbox [binary]="true" [inputId]="config.id || ''" [name]="config.name || ''"
                  [disabled]="config.disabled"
                  [required]="config.required" [ngModel]="config.checked"
                  (ngModelChange)="valueChange.emit($event)">
      </p-checkbox>
      <label *ngIf="config.label" [for]="config.id || ''" style="margin-left: 0.5rem; cursor: pointer;">{{ config.label }}</label>
      <span *ngIf="showLibraryTag" class="br-lib-tag" 
            style="margin-left: 0.5rem; background: #eee; padding: 2px 4px; font-size: 10px; border-radius: 4px;">LIB</span>
    </div>
  `, isInline: true, styles: [".prime-checkbox-control{display:flex;align-items:center;margin:1rem 0}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "ngmodule", type: FormsModule }, { kind: "directive", type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i2.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }, { kind: "directive", type: i2.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { kind: "ngmodule", type: CheckboxModule }, { kind: "component", type: i10.Checkbox, selector: "p-checkbox, p-checkBox, p-check-box", inputs: ["hostName", "value", "binary", "ariaLabelledBy", "ariaLabel", "tabindex", "inputId", "inputStyle", "styleClass", "inputClass", "indeterminate", "formControl", "checkboxIcon", "readonly", "autofocus", "trueValue", "falseValue", "variant", "size"], outputs: ["onChange", "onFocus", "onBlur"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.19", ngImport: i0, type: PrimeCheckboxControlComponent, decorators: [{
            type: Component,
            args: [{ selector: 'br-prime-checkbox-control', standalone: true, imports: [CommonModule, FormsModule, CheckboxModule], template: `
    <div class="prime-checkbox-control">
      <p-checkbox [binary]="true" [inputId]="config.id || ''" [name]="config.name || ''"
                  [disabled]="config.disabled"
                  [required]="config.required" [ngModel]="config.checked"
                  (ngModelChange)="valueChange.emit($event)">
      </p-checkbox>
      <label *ngIf="config.label" [for]="config.id || ''" style="margin-left: 0.5rem; cursor: pointer;">{{ config.label }}</label>
      <span *ngIf="showLibraryTag" class="br-lib-tag" 
            style="margin-left: 0.5rem; background: #eee; padding: 2px 4px; font-size: 10px; border-radius: 4px;">LIB</span>
    </div>
  `, styles: [".prime-checkbox-control{display:flex;align-items:center;margin:1rem 0}\n"] }]
        }], propDecorators: { config: [{
                type: Input
            }], showLibraryTag: [{
                type: Input
            }], valueChange: [{
                type: Output
            }] } });

class BrCheckboxComponent extends BaseValueAccessor {
    runtimeUiConfig;
    controlRegistry;
    config;
    id;
    controlId;
    name;
    className;
    value;
    disabled;
    required;
    label;
    meta;
    showLibraryTag = true;
    valueChange = new EventEmitter();
    blur = new EventEmitter();
    focus = new EventEmitter();
    input = new EventEmitter();
    change = new EventEmitter();
    keydown = new EventEmitter();
    keyup = new EventEmitter();
    click = new EventEmitter();
    controlEvent = new EventEmitter();
    mode = 'CUSTOM';
    customConfig;
    materialConfig;
    primeConfig;
    destroy$ = new Subject();
    registryHandle;
    constructor(runtimeUiConfig, controlRegistry) {
        super();
        this.runtimeUiConfig = runtimeUiConfig;
        this.controlRegistry = controlRegistry;
    }
    ngOnInit() {
        this.mode = this.runtimeUiConfig.getModesSnapshot().checkbox;
        this.adaptConfig();
        this.runtimeUiConfig.modes$.pipe(takeUntil(this.destroy$)).subscribe((m) => {
            this.mode = m.checkbox;
            this.adaptConfig();
        });
        this.refreshRegistryRegistration();
    }
    ngOnChanges(_) {
        this.adaptConfig();
        this.refreshRegistryRegistration();
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
        if (this.registryHandle) {
            this.controlRegistry.unregister(this.registryHandle);
        }
    }
    onImplementationValueChange(value) {
        this.value = !!value;
        this.valueChange.emit(this.value);
        this.emitValueChange(this.value);
        this.emitControlEvent('valueChange', this.value);
        this.refreshRegistryRegistration();
    }
    onImplementationBlur(event) {
        this.blur.emit(event);
        this.emitControlEvent('blur', this.value ?? false, event);
        this.markTouched();
    }
    onImplementationFocus(event) {
        this.focus.emit(event);
        this.emitControlEvent('focus', this.value ?? false, event);
    }
    onImplementationInput(event) {
        this.input.emit(event);
        this.emitControlEvent('input', this.value ?? false, event);
    }
    onImplementationChange(event) {
        this.change.emit(event);
        this.emitControlEvent('change', this.value ?? false, event);
    }
    onImplementationKeydown(event) {
        this.keydown.emit(event);
        this.emitControlEvent('keydown', this.value ?? false, event);
    }
    onImplementationKeyup(event) {
        this.keyup.emit(event);
        this.emitControlEvent('keyup', this.value ?? false, event);
    }
    onImplementationClick(event) {
        this.click.emit(event);
        this.emitControlEvent('click', this.value ?? false, event);
    }
    normalizeValue(value) {
        return !!value;
    }
    afterWriteValue(value) {
        this.value = value;
        this.adaptConfig();
        this.refreshRegistryRegistration();
    }
    afterDisabledStateChange(isDisabled) {
        this.disabled = isDisabled;
        this.adaptConfig();
    }
    adaptConfig() {
        const resolved = this.resolveConfig();
        if (this.mode === 'CUSTOM') {
            this.customConfig = CheckboxAdapter.toCustom(resolved);
        }
        else if (this.mode === 'MATERIAL') {
            this.materialConfig = CheckboxAdapter.toMaterial(resolved);
        }
        else {
            this.primeConfig = CheckboxAdapter.toPrime(resolved);
        }
    }
    resolveConfig() {
        const source = this.config
            ? { ...this.config }
            : {
                label: '',
                checked: false,
            };
        const resolvedValue = this.value !== undefined ? this.value : (source.value ?? source.checked ?? false);
        return {
            ...source,
            id: this.effectiveId,
            controlId: this.controlId,
            name: this.name ?? source.name,
            className: this.className ?? source.className,
            meta: this.meta ?? source.meta,
            label: this.label ?? source.label,
            value: resolvedValue,
            checked: resolvedValue,
            disabled: this.disabled ?? source.disabled ?? this.currentDisabled,
            required: this.required ?? source.required ?? false,
        };
    }
    get effectiveId() {
        return this.id || this.controlId || this.config?.id || this.config?.controlId;
    }
    refreshRegistryRegistration() {
        if (this.registryHandle) {
            this.controlRegistry.unregister(this.registryHandle);
        }
        this.registryHandle = {
            id: this.effectiveId,
            name: this.name || this.config?.name,
            classes: this.extractClasses(this.className || this.config?.className),
            type: 'checkbox',
            getValue: () => this.value ?? this.config?.value ?? this.config?.checked ?? false,
        };
        this.controlRegistry.register(this.registryHandle);
    }
    extractClasses(classNames) {
        return (classNames || '')
            .split(/\s+/)
            .map((part) => part.trim())
            .filter((part) => !!part);
    }
    emitControlEvent(type, value, originalEvent) {
        this.controlEvent.emit({
            type,
            id: this.effectiveId,
            name: this.name || this.config?.name,
            className: this.className || this.config?.className,
            value,
            meta: this.meta || this.config?.meta,
            originalEvent,
        });
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.19", ngImport: i0, type: BrCheckboxComponent, deps: [{ token: RuntimeUiConfigService }, { token: ControlRegistryService }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.19", type: BrCheckboxComponent, isStandalone: true, selector: "br-checkbox", inputs: { config: "config", id: "id", controlId: "controlId", name: "name", className: "className", value: "value", disabled: "disabled", required: "required", label: "label", meta: "meta", showLibraryTag: "showLibraryTag" }, outputs: { valueChange: "valueChange", blur: "blur", focus: "focus", input: "input", change: "change", keydown: "keydown", keyup: "keyup", click: "click", controlEvent: "controlEvent" }, providers: [
            {
                provide: NG_VALUE_ACCESSOR,
                useExisting: forwardRef(() => BrCheckboxComponent),
                multi: true,
            },
        ], usesInheritance: true, usesOnChanges: true, ngImport: i0, template: "<br-custom-checkbox-control *ngIf=\"mode === 'CUSTOM' && customConfig as cfg\" [config]=\"cfg\"\r\n  [showLibraryTag]=\"showLibraryTag\" (valueChange)=\"onImplementationValueChange($event)\"\r\n  (blurEvent)=\"onImplementationBlur($event)\" (focusEvent)=\"onImplementationFocus($event)\"\r\n  (inputEvent)=\"onImplementationInput($event)\" (changeEvent)=\"onImplementationChange($event)\"\r\n  (keydownEvent)=\"onImplementationKeydown($event)\" (keyupEvent)=\"onImplementationKeyup($event)\"\r\n  (clickEvent)=\"onImplementationClick($event)\">\r\n</br-custom-checkbox-control>\r\n\r\n<br-material-checkbox-control *ngIf=\"mode === 'MATERIAL' && materialConfig as cfg\" [config]=\"cfg\"\r\n  [showLibraryTag]=\"showLibraryTag\" (valueChange)=\"onImplementationValueChange($event)\"\r\n  (blurEvent)=\"onImplementationBlur($event)\" (focusEvent)=\"onImplementationFocus($event)\"\r\n  (inputEvent)=\"onImplementationInput($event)\" (changeEvent)=\"onImplementationChange($event)\"\r\n  (keydownEvent)=\"onImplementationKeydown($event)\" (keyupEvent)=\"onImplementationKeyup($event)\"\r\n  (clickEvent)=\"onImplementationClick($event)\">\r\n</br-material-checkbox-control>\r\n\r\n<br-prime-checkbox-control *ngIf=\"mode === 'PRIMENG' && primeConfig as cfg\" [config]=\"cfg\"\r\n  [showLibraryTag]=\"showLibraryTag\" (valueChange)=\"onImplementationValueChange($event)\">\r\n</br-prime-checkbox-control>", dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: CustomCheckboxControlComponent, selector: "br-custom-checkbox-control", inputs: ["config", "showLibraryTag"], outputs: ["valueChange", "blurEvent", "focusEvent", "inputEvent", "changeEvent", "keydownEvent", "keyupEvent", "clickEvent"] }, { kind: "component", type: MaterialCheckboxControlComponent, selector: "br-material-checkbox-control", inputs: ["config", "showLibraryTag"], outputs: ["valueChange", "blurEvent", "focusEvent", "inputEvent", "changeEvent", "keydownEvent", "keyupEvent", "clickEvent"] }, { kind: "component", type: PrimeCheckboxControlComponent, selector: "br-prime-checkbox-control", inputs: ["config", "showLibraryTag"], outputs: ["valueChange"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.19", ngImport: i0, type: BrCheckboxComponent, decorators: [{
            type: Component,
            args: [{ selector: 'br-checkbox', standalone: true, imports: [CommonModule, CustomCheckboxControlComponent, MaterialCheckboxControlComponent, PrimeCheckboxControlComponent], providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(() => BrCheckboxComponent),
                            multi: true,
                        },
                    ], template: "<br-custom-checkbox-control *ngIf=\"mode === 'CUSTOM' && customConfig as cfg\" [config]=\"cfg\"\r\n  [showLibraryTag]=\"showLibraryTag\" (valueChange)=\"onImplementationValueChange($event)\"\r\n  (blurEvent)=\"onImplementationBlur($event)\" (focusEvent)=\"onImplementationFocus($event)\"\r\n  (inputEvent)=\"onImplementationInput($event)\" (changeEvent)=\"onImplementationChange($event)\"\r\n  (keydownEvent)=\"onImplementationKeydown($event)\" (keyupEvent)=\"onImplementationKeyup($event)\"\r\n  (clickEvent)=\"onImplementationClick($event)\">\r\n</br-custom-checkbox-control>\r\n\r\n<br-material-checkbox-control *ngIf=\"mode === 'MATERIAL' && materialConfig as cfg\" [config]=\"cfg\"\r\n  [showLibraryTag]=\"showLibraryTag\" (valueChange)=\"onImplementationValueChange($event)\"\r\n  (blurEvent)=\"onImplementationBlur($event)\" (focusEvent)=\"onImplementationFocus($event)\"\r\n  (inputEvent)=\"onImplementationInput($event)\" (changeEvent)=\"onImplementationChange($event)\"\r\n  (keydownEvent)=\"onImplementationKeydown($event)\" (keyupEvent)=\"onImplementationKeyup($event)\"\r\n  (clickEvent)=\"onImplementationClick($event)\">\r\n</br-material-checkbox-control>\r\n\r\n<br-prime-checkbox-control *ngIf=\"mode === 'PRIMENG' && primeConfig as cfg\" [config]=\"cfg\"\r\n  [showLibraryTag]=\"showLibraryTag\" (valueChange)=\"onImplementationValueChange($event)\">\r\n</br-prime-checkbox-control>" }]
        }], ctorParameters: () => [{ type: RuntimeUiConfigService }, { type: ControlRegistryService }], propDecorators: { config: [{
                type: Input
            }], id: [{
                type: Input
            }], controlId: [{
                type: Input
            }], name: [{
                type: Input
            }], className: [{
                type: Input
            }], value: [{
                type: Input
            }], disabled: [{
                type: Input
            }], required: [{
                type: Input
            }], label: [{
                type: Input
            }], meta: [{
                type: Input
            }], showLibraryTag: [{
                type: Input
            }], valueChange: [{
                type: Output
            }], blur: [{
                type: Output
            }], focus: [{
                type: Output
            }], input: [{
                type: Output
            }], change: [{
                type: Output
            }], keydown: [{
                type: Output
            }], keyup: [{
                type: Output
            }], click: [{
                type: Output
            }], controlEvent: [{
                type: Output
            }] } });

class RadioAdapter {
    static toCustom(config) {
        return {
            id: config.id || config.controlId,
            name: config.name || RadioAdapter.toName(config.label),
            className: config.className,
            label: config.label || '',
            value: config.value ?? '',
            options: [...(config.options || [])],
            disabled: config.disabled ?? false,
            required: config.required ?? false,
        };
    }
    static toMaterial(config) {
        return {
            id: config.id || config.controlId,
            name: config.name || RadioAdapter.toName(config.label),
            className: config.className,
            label: config.label || '',
            value: config.value ?? '',
            options: [...(config.options || [])],
            disabled: config.disabled ?? false,
            required: config.required ?? false,
        };
    }
    static toPrime(config) {
        return {
            id: config.id || config.controlId,
            name: config.name || RadioAdapter.toName(config.label),
            className: config.className,
            label: config.label || '',
            value: config.value ?? '',
            options: [...(config.options || [])],
            disabled: config.disabled ?? false,
            required: config.required ?? false,
        };
    }
    static toName(value) {
        return (value || 'radio').trim().toLowerCase().replace(/\s+/g, '-');
    }
}

class CustomRadioControlComponent {
    config;
    showLibraryTag = false;
    valueChange = new EventEmitter();
    blurEvent = new EventEmitter();
    focusEvent = new EventEmitter();
    inputEvent = new EventEmitter();
    changeEvent = new EventEmitter();
    keydownEvent = new EventEmitter();
    keyupEvent = new EventEmitter();
    clickEvent = new EventEmitter();
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.19", ngImport: i0, type: CustomRadioControlComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.19", type: CustomRadioControlComponent, isStandalone: true, selector: "br-custom-radio-control", inputs: { config: "config", showLibraryTag: "showLibraryTag" }, outputs: { valueChange: "valueChange", blurEvent: "blurEvent", focusEvent: "focusEvent", inputEvent: "inputEvent", changeEvent: "changeEvent", keydownEvent: "keydownEvent", keyupEvent: "keyupEvent", clickEvent: "clickEvent" }, ngImport: i0, template: "<div class=\"br-radio-group\">\r\n  <label class=\"br-label\">{{ config.label }}\r\n    <span *ngIf=\"showLibraryTag\" class=\"br-lib-tag\" aria-label=\"Library package control\">LIB</span>\r\n    <span class=\"mode-pill\">CUSTOM</span>\r\n  </label>\r\n  <div class=\"br-radio-options\" [ngClass]=\"config.className\" [attr.id]=\"config.id\">\r\n    <label\r\n      class=\"br-radio-option\"\r\n      [class.is-selected]=\"config.value === opt.value\"\r\n      [class.is-disabled]=\"!!config.disabled\"\r\n      *ngFor=\"let opt of config.options\"\r\n    >\r\n      <input\r\n        class=\"br-radio-input\"\r\n        type=\"radio\"\r\n        [name]=\"config.name\"\r\n        [value]=\"opt.value\"\r\n        [disabled]=\"config.disabled\"\r\n        [required]=\"config.required\"\r\n        [checked]=\"config.value === opt.value\"\r\n        (change)=\"valueChange.emit(opt.value); changeEvent.emit($event)\"\r\n        (blur)=\"blurEvent.emit($event)\"\r\n        (focus)=\"focusEvent.emit($event)\"\r\n        (input)=\"inputEvent.emit($event)\"\r\n        (keydown)=\"keydownEvent.emit($event)\"\r\n        (keyup)=\"keyupEvent.emit($event)\"\r\n        (click)=\"clickEvent.emit($event)\"\r\n      />\r\n      <span class=\"br-radio-dot\" aria-hidden=\"true\"></span>\r\n      <span class=\"br-radio-text\">{{ opt.label }}</span>\r\n    </label>\r\n  </div>\r\n</div>\r\n", styles: [".br-radio-group{display:flex;flex-direction:column;gap:10px;border:1px solid var(--br-section-border-color, #bfdbfe);border-radius:14px;padding:12px;background:var(--br-section-background-color, #f8fafc);font-family:var(--br-font-family, Tahoma, Arial, sans-serif)}.br-label{font-size:var(--br-base-font-size, 14px);font-weight:700;color:var(--br-label-font-color, #10345c);display:flex;align-items:center;gap:8px}.mode-pill{display:inline-flex;align-items:center;height:18px;padding:0 8px;border-radius:999px;font-size:10px;font-weight:800;letter-spacing:.4px;color:var(--br-accent-color, #0f4bb7);background:color-mix(in srgb,var(--br-focus-color, #2563eb) 12%,var(--br-section-background-color, #ffffff));border:1px solid color-mix(in srgb,var(--br-focus-color, #2563eb) 35%,var(--br-section-border-color, #93c5fd))}.br-lib-tag{display:inline-flex;align-items:center;gap:5px;padding:2px 8px;border-radius:999px;background:linear-gradient(135deg,#e8f0fe,#d2e3fc);color:#174ea6;font-size:10px;font-weight:800;letter-spacing:.4px}.br-lib-tag:before{content:\"\";width:6px;height:6px;border-radius:50%;background:#174ea6}.br-radio-options{display:grid;grid-template-columns:repeat(auto-fill,minmax(170px,1fr));gap:10px}.br-radio-option{position:relative;display:inline-flex;align-items:center;gap:10px;font-size:var(--br-base-font-size, 14px);color:var(--br-base-font-color, #1e293b);padding:10px 12px;border:1px solid var(--br-input-border-color, #c7d2fe);border-radius:12px;background:var(--br-input-background-color, #ffffff);box-shadow:0 1px 2px #0f172a12;cursor:pointer;transition:border-color .2s ease,box-shadow .2s ease,transform .2s ease,background .2s ease}.br-radio-option:hover{border-color:var(--br-focus-color, #60a5fa);box-shadow:0 6px 16px color-mix(in srgb,var(--br-focus-color, #2563eb) 18%,transparent);transform:translateY(-1px)}.br-radio-input{position:absolute;opacity:0;pointer-events:none}.br-radio-dot{width:16px;height:16px;border-radius:999px;border:2px solid var(--br-input-border-color, #64748b);background:var(--br-input-background-color, #ffffff);box-sizing:border-box;transition:border-color .2s ease,box-shadow .2s ease,background .2s ease}.br-radio-text{font-weight:600}.br-radio-input:checked+.br-radio-dot{border-color:var(--br-accent-color, var(--br-focus-color, #1d4ed8));background:radial-gradient(circle at center,var(--br-accent-color, var(--br-focus-color, #1d4ed8)) 0 45%,var(--br-input-background-color, #ffffff) 50% 100%);box-shadow:0 0 0 3px var(--br-focus-ring-color, color-mix(in srgb, #2563eb 20%, transparent))}.br-radio-input:checked~.br-radio-text{color:var(--br-accent-color, var(--br-focus-color, #1d4ed8))}.br-radio-option.is-selected{border-color:var(--br-focus-color, #3b82f6);background:color-mix(in srgb,var(--br-focus-color, #2563eb) 8%,var(--br-input-background-color, #ffffff));box-shadow:0 8px 20px color-mix(in srgb,var(--br-focus-color, #2563eb) 18%,transparent)}.br-radio-option.is-disabled{opacity:.6;cursor:not-allowed;transform:none;box-shadow:none}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "ngmodule", type: FormsModule }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.19", ngImport: i0, type: CustomRadioControlComponent, decorators: [{
            type: Component,
            args: [{ selector: 'br-custom-radio-control', standalone: true, imports: [CommonModule, FormsModule], template: "<div class=\"br-radio-group\">\r\n  <label class=\"br-label\">{{ config.label }}\r\n    <span *ngIf=\"showLibraryTag\" class=\"br-lib-tag\" aria-label=\"Library package control\">LIB</span>\r\n    <span class=\"mode-pill\">CUSTOM</span>\r\n  </label>\r\n  <div class=\"br-radio-options\" [ngClass]=\"config.className\" [attr.id]=\"config.id\">\r\n    <label\r\n      class=\"br-radio-option\"\r\n      [class.is-selected]=\"config.value === opt.value\"\r\n      [class.is-disabled]=\"!!config.disabled\"\r\n      *ngFor=\"let opt of config.options\"\r\n    >\r\n      <input\r\n        class=\"br-radio-input\"\r\n        type=\"radio\"\r\n        [name]=\"config.name\"\r\n        [value]=\"opt.value\"\r\n        [disabled]=\"config.disabled\"\r\n        [required]=\"config.required\"\r\n        [checked]=\"config.value === opt.value\"\r\n        (change)=\"valueChange.emit(opt.value); changeEvent.emit($event)\"\r\n        (blur)=\"blurEvent.emit($event)\"\r\n        (focus)=\"focusEvent.emit($event)\"\r\n        (input)=\"inputEvent.emit($event)\"\r\n        (keydown)=\"keydownEvent.emit($event)\"\r\n        (keyup)=\"keyupEvent.emit($event)\"\r\n        (click)=\"clickEvent.emit($event)\"\r\n      />\r\n      <span class=\"br-radio-dot\" aria-hidden=\"true\"></span>\r\n      <span class=\"br-radio-text\">{{ opt.label }}</span>\r\n    </label>\r\n  </div>\r\n</div>\r\n", styles: [".br-radio-group{display:flex;flex-direction:column;gap:10px;border:1px solid var(--br-section-border-color, #bfdbfe);border-radius:14px;padding:12px;background:var(--br-section-background-color, #f8fafc);font-family:var(--br-font-family, Tahoma, Arial, sans-serif)}.br-label{font-size:var(--br-base-font-size, 14px);font-weight:700;color:var(--br-label-font-color, #10345c);display:flex;align-items:center;gap:8px}.mode-pill{display:inline-flex;align-items:center;height:18px;padding:0 8px;border-radius:999px;font-size:10px;font-weight:800;letter-spacing:.4px;color:var(--br-accent-color, #0f4bb7);background:color-mix(in srgb,var(--br-focus-color, #2563eb) 12%,var(--br-section-background-color, #ffffff));border:1px solid color-mix(in srgb,var(--br-focus-color, #2563eb) 35%,var(--br-section-border-color, #93c5fd))}.br-lib-tag{display:inline-flex;align-items:center;gap:5px;padding:2px 8px;border-radius:999px;background:linear-gradient(135deg,#e8f0fe,#d2e3fc);color:#174ea6;font-size:10px;font-weight:800;letter-spacing:.4px}.br-lib-tag:before{content:\"\";width:6px;height:6px;border-radius:50%;background:#174ea6}.br-radio-options{display:grid;grid-template-columns:repeat(auto-fill,minmax(170px,1fr));gap:10px}.br-radio-option{position:relative;display:inline-flex;align-items:center;gap:10px;font-size:var(--br-base-font-size, 14px);color:var(--br-base-font-color, #1e293b);padding:10px 12px;border:1px solid var(--br-input-border-color, #c7d2fe);border-radius:12px;background:var(--br-input-background-color, #ffffff);box-shadow:0 1px 2px #0f172a12;cursor:pointer;transition:border-color .2s ease,box-shadow .2s ease,transform .2s ease,background .2s ease}.br-radio-option:hover{border-color:var(--br-focus-color, #60a5fa);box-shadow:0 6px 16px color-mix(in srgb,var(--br-focus-color, #2563eb) 18%,transparent);transform:translateY(-1px)}.br-radio-input{position:absolute;opacity:0;pointer-events:none}.br-radio-dot{width:16px;height:16px;border-radius:999px;border:2px solid var(--br-input-border-color, #64748b);background:var(--br-input-background-color, #ffffff);box-sizing:border-box;transition:border-color .2s ease,box-shadow .2s ease,background .2s ease}.br-radio-text{font-weight:600}.br-radio-input:checked+.br-radio-dot{border-color:var(--br-accent-color, var(--br-focus-color, #1d4ed8));background:radial-gradient(circle at center,var(--br-accent-color, var(--br-focus-color, #1d4ed8)) 0 45%,var(--br-input-background-color, #ffffff) 50% 100%);box-shadow:0 0 0 3px var(--br-focus-ring-color, color-mix(in srgb, #2563eb 20%, transparent))}.br-radio-input:checked~.br-radio-text{color:var(--br-accent-color, var(--br-focus-color, #1d4ed8))}.br-radio-option.is-selected{border-color:var(--br-focus-color, #3b82f6);background:color-mix(in srgb,var(--br-focus-color, #2563eb) 8%,var(--br-input-background-color, #ffffff));box-shadow:0 8px 20px color-mix(in srgb,var(--br-focus-color, #2563eb) 18%,transparent)}.br-radio-option.is-disabled{opacity:.6;cursor:not-allowed;transform:none;box-shadow:none}\n"] }]
        }], propDecorators: { config: [{
                type: Input
            }], showLibraryTag: [{
                type: Input
            }], valueChange: [{
                type: Output
            }], blurEvent: [{
                type: Output
            }], focusEvent: [{
                type: Output
            }], inputEvent: [{
                type: Output
            }], changeEvent: [{
                type: Output
            }], keydownEvent: [{
                type: Output
            }], keyupEvent: [{
                type: Output
            }], clickEvent: [{
                type: Output
            }] } });

class MaterialRadioControlComponent {
    config;
    showLibraryTag = false;
    valueChange = new EventEmitter();
    blurEvent = new EventEmitter();
    focusEvent = new EventEmitter();
    inputEvent = new EventEmitter();
    changeEvent = new EventEmitter();
    keydownEvent = new EventEmitter();
    keyupEvent = new EventEmitter();
    clickEvent = new EventEmitter();
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.19", ngImport: i0, type: MaterialRadioControlComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.19", type: MaterialRadioControlComponent, isStandalone: true, selector: "br-material-radio-control", inputs: { config: "config", showLibraryTag: "showLibraryTag" }, outputs: { valueChange: "valueChange", blurEvent: "blurEvent", focusEvent: "focusEvent", inputEvent: "inputEvent", changeEvent: "changeEvent", keydownEvent: "keydownEvent", keyupEvent: "keyupEvent", clickEvent: "clickEvent" }, ngImport: i0, template: "<div class=\"br-radio-group\">\r\n  <label class=\"br-label\">{{ config.label }}\r\n    <span *ngIf=\"showLibraryTag\" class=\"br-lib-tag\" aria-label=\"Library package control\">LIB</span>\r\n    <span class=\"mode-pill\">MATERIAL</span>\r\n  </label>\r\n  <mat-radio-group\r\n    class=\"br-material-radio-group\"\r\n    [ngClass]=\"config.className\"\r\n    [attr.id]=\"config.id\"\r\n    [attr.name]=\"config.name\"\r\n    [ngModel]=\"config.value\"\r\n    (ngModelChange)=\"valueChange.emit($event)\"\r\n    (blur)=\"blurEvent.emit($event)\"\r\n    (focus)=\"focusEvent.emit($event)\"\r\n    (input)=\"inputEvent.emit($event)\"\r\n    (change)=\"changeEvent.emit($event)\"\r\n    (keydown)=\"keydownEvent.emit($event)\"\r\n    (keyup)=\"keyupEvent.emit($event)\"\r\n    (click)=\"clickEvent.emit($event)\"\r\n  >\r\n    <mat-radio-button\r\n      *ngFor=\"let opt of config.options\"\r\n      [value]=\"opt.value\"\r\n      [disabled]=\"config.disabled\"\r\n      [required]=\"config.required\"\r\n      class=\"br-material-radio\"\r\n    >\r\n      {{ opt.label }}\r\n    </mat-radio-button>\r\n  </mat-radio-group>\r\n</div>\r\n", styles: [".br-radio-group{display:flex;flex-direction:column;gap:10px;border:1px solid var(--br-section-border-color, #d1d5db);border-radius:12px;padding:12px;background:var(--br-section-background-color, #f8fafc);font-family:var(--br-font-family, Tahoma, Arial, sans-serif)}.br-label{font-size:var(--br-base-font-size, 14px);font-weight:700;color:var(--br-label-font-color, #334155);display:flex;align-items:center;gap:8px}.mode-pill{display:inline-flex;align-items:center;height:18px;padding:0 8px;border-radius:999px;font-size:10px;font-weight:800;letter-spacing:.4px;color:var(--br-accent-color, #166534);background:color-mix(in srgb,var(--br-focus-color, #2563eb) 10%,var(--br-section-background-color, #ffffff));border:1px solid color-mix(in srgb,var(--br-focus-color, #2563eb) 30%,var(--br-section-border-color, #86efac))}.br-lib-tag{display:inline-flex;align-items:center;gap:5px;padding:2px 8px;border-radius:999px;background:linear-gradient(135deg,#e8f0fe,#d2e3fc);color:#174ea6;font-size:10px;font-weight:800;letter-spacing:.4px}.br-lib-tag:before{content:\"\";width:6px;height:6px;border-radius:50%;background:#174ea6}.br-material-radio-group{display:grid;gap:8px;padding:4px;border-radius:10px;background:var(--br-input-background-color, #ffffff);border:1px solid var(--br-input-border-color, #e5e7eb)}.br-material-radio{margin-right:0;padding:8px 10px;border-radius:8px;transition:background-color .2s ease}.br-material-radio:hover{background:color-mix(in srgb,var(--br-focus-color, #2563eb) 8%,var(--br-input-background-color, #ffffff))}:host ::ng-deep .br-material-radio .mdc-form-field,:host ::ng-deep .br-material-radio .mdc-label{width:100%;color:var(--br-base-font-color, #1f2937);font-weight:500;font-family:var(--br-font-family, Tahoma, Arial, sans-serif)}:host ::ng-deep .br-material-radio .mdc-radio__outer-circle{border-color:var(--br-input-border-color, #64748b)!important}:host ::ng-deep .br-material-radio.mat-mdc-radio-checked .mdc-radio__outer-circle,:host ::ng-deep .br-material-radio.mat-mdc-radio-checked .mdc-radio__inner-circle{border-color:var(--br-accent-color, var(--br-focus-color, #2563eb))!important}:host ::ng-deep .br-material-radio .mdc-radio__native-control:enabled:checked+.mdc-radio__background .mdc-radio__outer-circle,:host ::ng-deep .br-material-radio .mdc-radio__native-control:enabled:checked+.mdc-radio__background .mdc-radio__inner-circle{border-color:var(--br-accent-color, var(--br-focus-color, #2563eb))!important}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "ngmodule", type: FormsModule }, { kind: "directive", type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i2.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { kind: "ngmodule", type: MatRadioModule }, { kind: "directive", type: i7.MatRadioGroup, selector: "mat-radio-group", inputs: ["color", "name", "labelPosition", "value", "selected", "disabled", "required", "disabledInteractive"], outputs: ["change"], exportAs: ["matRadioGroup"] }, { kind: "component", type: i7.MatRadioButton, selector: "mat-radio-button", inputs: ["id", "name", "aria-label", "aria-labelledby", "aria-describedby", "disableRipple", "tabIndex", "checked", "value", "labelPosition", "disabled", "required", "color", "disabledInteractive"], outputs: ["change"], exportAs: ["matRadioButton"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.19", ngImport: i0, type: MaterialRadioControlComponent, decorators: [{
            type: Component,
            args: [{ selector: 'br-material-radio-control', standalone: true, imports: [CommonModule, FormsModule, MatRadioModule], template: "<div class=\"br-radio-group\">\r\n  <label class=\"br-label\">{{ config.label }}\r\n    <span *ngIf=\"showLibraryTag\" class=\"br-lib-tag\" aria-label=\"Library package control\">LIB</span>\r\n    <span class=\"mode-pill\">MATERIAL</span>\r\n  </label>\r\n  <mat-radio-group\r\n    class=\"br-material-radio-group\"\r\n    [ngClass]=\"config.className\"\r\n    [attr.id]=\"config.id\"\r\n    [attr.name]=\"config.name\"\r\n    [ngModel]=\"config.value\"\r\n    (ngModelChange)=\"valueChange.emit($event)\"\r\n    (blur)=\"blurEvent.emit($event)\"\r\n    (focus)=\"focusEvent.emit($event)\"\r\n    (input)=\"inputEvent.emit($event)\"\r\n    (change)=\"changeEvent.emit($event)\"\r\n    (keydown)=\"keydownEvent.emit($event)\"\r\n    (keyup)=\"keyupEvent.emit($event)\"\r\n    (click)=\"clickEvent.emit($event)\"\r\n  >\r\n    <mat-radio-button\r\n      *ngFor=\"let opt of config.options\"\r\n      [value]=\"opt.value\"\r\n      [disabled]=\"config.disabled\"\r\n      [required]=\"config.required\"\r\n      class=\"br-material-radio\"\r\n    >\r\n      {{ opt.label }}\r\n    </mat-radio-button>\r\n  </mat-radio-group>\r\n</div>\r\n", styles: [".br-radio-group{display:flex;flex-direction:column;gap:10px;border:1px solid var(--br-section-border-color, #d1d5db);border-radius:12px;padding:12px;background:var(--br-section-background-color, #f8fafc);font-family:var(--br-font-family, Tahoma, Arial, sans-serif)}.br-label{font-size:var(--br-base-font-size, 14px);font-weight:700;color:var(--br-label-font-color, #334155);display:flex;align-items:center;gap:8px}.mode-pill{display:inline-flex;align-items:center;height:18px;padding:0 8px;border-radius:999px;font-size:10px;font-weight:800;letter-spacing:.4px;color:var(--br-accent-color, #166534);background:color-mix(in srgb,var(--br-focus-color, #2563eb) 10%,var(--br-section-background-color, #ffffff));border:1px solid color-mix(in srgb,var(--br-focus-color, #2563eb) 30%,var(--br-section-border-color, #86efac))}.br-lib-tag{display:inline-flex;align-items:center;gap:5px;padding:2px 8px;border-radius:999px;background:linear-gradient(135deg,#e8f0fe,#d2e3fc);color:#174ea6;font-size:10px;font-weight:800;letter-spacing:.4px}.br-lib-tag:before{content:\"\";width:6px;height:6px;border-radius:50%;background:#174ea6}.br-material-radio-group{display:grid;gap:8px;padding:4px;border-radius:10px;background:var(--br-input-background-color, #ffffff);border:1px solid var(--br-input-border-color, #e5e7eb)}.br-material-radio{margin-right:0;padding:8px 10px;border-radius:8px;transition:background-color .2s ease}.br-material-radio:hover{background:color-mix(in srgb,var(--br-focus-color, #2563eb) 8%,var(--br-input-background-color, #ffffff))}:host ::ng-deep .br-material-radio .mdc-form-field,:host ::ng-deep .br-material-radio .mdc-label{width:100%;color:var(--br-base-font-color, #1f2937);font-weight:500;font-family:var(--br-font-family, Tahoma, Arial, sans-serif)}:host ::ng-deep .br-material-radio .mdc-radio__outer-circle{border-color:var(--br-input-border-color, #64748b)!important}:host ::ng-deep .br-material-radio.mat-mdc-radio-checked .mdc-radio__outer-circle,:host ::ng-deep .br-material-radio.mat-mdc-radio-checked .mdc-radio__inner-circle{border-color:var(--br-accent-color, var(--br-focus-color, #2563eb))!important}:host ::ng-deep .br-material-radio .mdc-radio__native-control:enabled:checked+.mdc-radio__background .mdc-radio__outer-circle,:host ::ng-deep .br-material-radio .mdc-radio__native-control:enabled:checked+.mdc-radio__background .mdc-radio__inner-circle{border-color:var(--br-accent-color, var(--br-focus-color, #2563eb))!important}\n"] }]
        }], propDecorators: { config: [{
                type: Input
            }], showLibraryTag: [{
                type: Input
            }], valueChange: [{
                type: Output
            }], blurEvent: [{
                type: Output
            }], focusEvent: [{
                type: Output
            }], inputEvent: [{
                type: Output
            }], changeEvent: [{
                type: Output
            }], keydownEvent: [{
                type: Output
            }], keyupEvent: [{
                type: Output
            }], clickEvent: [{
                type: Output
            }] } });

class PrimeRadioControlComponent {
    config;
    showLibraryTag = false;
    valueChange = new EventEmitter();
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.19", ngImport: i0, type: PrimeRadioControlComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.19", type: PrimeRadioControlComponent, isStandalone: true, selector: "br-prime-radio-control", inputs: { config: "config", showLibraryTag: "showLibraryTag" }, outputs: { valueChange: "valueChange" }, ngImport: i0, template: `
    <div class="prime-radio-control">
      <div *ngFor="let option of config.options" class="prime-radio-field">
        <p-radioButton [name]="config.name || ''" [value]="option.value"
                       [disabled]="config.disabled"
                       [(ngModel)]="config.value" (ngModelChange)="valueChange.emit($event)"
                       [inputId]="(config.id || 'radio') + '-' + option.value">
        </p-radioButton>
        <label [for]="(config.id || 'radio') + '-' + option.value" class="prime-radio-label">{{ option.label }}</label>
      </div>
      <span *ngIf="showLibraryTag" class="br-lib-tag" 
            style="margin-left: 0.5rem; background: #eee; padding: 2px 4px; font-size: 10px; border-radius: 4px;">LIB</span>
    </div>
  `, isInline: true, styles: [".prime-radio-control{display:flex;flex-direction:column;gap:.5rem;margin:1rem 0}.prime-radio-field{display:flex;align-items:center;gap:.5rem}.prime-radio-label{cursor:pointer}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "ngmodule", type: FormsModule }, { kind: "directive", type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i2.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { kind: "ngmodule", type: RadioButtonModule }, { kind: "component", type: i9.RadioButton, selector: "p-radioButton, p-radiobutton, p-radio-button", inputs: ["value", "tabindex", "inputId", "ariaLabelledBy", "ariaLabel", "styleClass", "autofocus", "binary", "variant", "size"], outputs: ["onClick", "onFocus", "onBlur"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.19", ngImport: i0, type: PrimeRadioControlComponent, decorators: [{
            type: Component,
            args: [{ selector: 'br-prime-radio-control', standalone: true, imports: [CommonModule, FormsModule, RadioButtonModule], template: `
    <div class="prime-radio-control">
      <div *ngFor="let option of config.options" class="prime-radio-field">
        <p-radioButton [name]="config.name || ''" [value]="option.value"
                       [disabled]="config.disabled"
                       [(ngModel)]="config.value" (ngModelChange)="valueChange.emit($event)"
                       [inputId]="(config.id || 'radio') + '-' + option.value">
        </p-radioButton>
        <label [for]="(config.id || 'radio') + '-' + option.value" class="prime-radio-label">{{ option.label }}</label>
      </div>
      <span *ngIf="showLibraryTag" class="br-lib-tag" 
            style="margin-left: 0.5rem; background: #eee; padding: 2px 4px; font-size: 10px; border-radius: 4px;">LIB</span>
    </div>
  `, styles: [".prime-radio-control{display:flex;flex-direction:column;gap:.5rem;margin:1rem 0}.prime-radio-field{display:flex;align-items:center;gap:.5rem}.prime-radio-label{cursor:pointer}\n"] }]
        }], propDecorators: { config: [{
                type: Input
            }], showLibraryTag: [{
                type: Input
            }], valueChange: [{
                type: Output
            }] } });

class BrRadioComponent extends BaseValueAccessor {
    runtimeUiConfig;
    controlRegistry;
    config;
    id;
    controlId;
    name;
    className;
    value;
    options;
    disabled;
    required;
    label;
    meta;
    showLibraryTag = true;
    valueChange = new EventEmitter();
    blur = new EventEmitter();
    focus = new EventEmitter();
    input = new EventEmitter();
    change = new EventEmitter();
    keydown = new EventEmitter();
    keyup = new EventEmitter();
    click = new EventEmitter();
    controlEvent = new EventEmitter();
    mode = 'CUSTOM';
    customConfig;
    materialConfig;
    primeConfig;
    destroy$ = new Subject();
    registryHandle;
    constructor(runtimeUiConfig, controlRegistry) {
        super();
        this.runtimeUiConfig = runtimeUiConfig;
        this.controlRegistry = controlRegistry;
    }
    ngOnInit() {
        this.mode = this.runtimeUiConfig.getModesSnapshot().radio;
        this.adaptConfig();
        this.runtimeUiConfig.modes$.pipe(takeUntil(this.destroy$)).subscribe((m) => {
            this.mode = m.radio;
            this.adaptConfig();
        });
        this.refreshRegistryRegistration();
    }
    ngOnChanges(_) {
        this.adaptConfig();
        this.refreshRegistryRegistration();
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
        if (this.registryHandle) {
            this.controlRegistry.unregister(this.registryHandle);
        }
    }
    onImplementationValueChange(value) {
        this.value = value;
        this.valueChange.emit(value);
        this.emitValueChange(value);
        this.emitControlEvent('valueChange', value);
        this.refreshRegistryRegistration();
    }
    onImplementationBlur(event) {
        this.blur.emit(event);
        this.emitControlEvent('blur', this.value, event);
        this.markTouched();
    }
    onImplementationFocus(event) {
        this.focus.emit(event);
        this.emitControlEvent('focus', this.value, event);
    }
    onImplementationInput(event) {
        this.input.emit(event);
        this.emitControlEvent('input', this.value, event);
    }
    onImplementationChange(event) {
        this.change.emit(event);
        this.emitControlEvent('change', this.value, event);
    }
    onImplementationKeydown(event) {
        this.keydown.emit(event);
        this.emitControlEvent('keydown', this.value, event);
    }
    onImplementationKeyup(event) {
        this.keyup.emit(event);
        this.emitControlEvent('keyup', this.value, event);
    }
    onImplementationClick(event) {
        this.click.emit(event);
        this.emitControlEvent('click', this.value, event);
    }
    normalizeValue(value) {
        return value;
    }
    afterWriteValue(value) {
        this.value = value;
        this.adaptConfig();
        this.refreshRegistryRegistration();
    }
    afterDisabledStateChange(isDisabled) {
        this.disabled = isDisabled;
        this.adaptConfig();
    }
    adaptConfig() {
        const resolved = this.resolveConfig();
        if (this.mode === 'CUSTOM') {
            this.customConfig = RadioAdapter.toCustom(resolved);
        }
        else if (this.mode === 'MATERIAL') {
            this.materialConfig = RadioAdapter.toMaterial(resolved);
        }
        else {
            this.primeConfig = RadioAdapter.toPrime(resolved);
        }
    }
    resolveConfig() {
        const source = this.config
            ? { ...this.config }
            : {
                label: '',
                value: '',
                options: [],
            };
        return {
            ...source,
            id: this.effectiveId,
            controlId: this.controlId,
            name: this.name ?? source.name,
            className: this.className ?? source.className,
            meta: this.meta ?? source.meta,
            label: this.label ?? source.label,
            value: this.value !== undefined ? this.value : source.value,
            options: this.options ?? source.options ?? [],
            disabled: this.disabled ?? source.disabled ?? this.currentDisabled,
            required: this.required ?? source.required ?? false,
        };
    }
    get effectiveId() {
        return this.id || this.controlId || this.config?.id || this.config?.controlId;
    }
    refreshRegistryRegistration() {
        if (this.registryHandle) {
            this.controlRegistry.unregister(this.registryHandle);
        }
        this.registryHandle = {
            id: this.effectiveId,
            name: this.name || this.config?.name,
            classes: this.extractClasses(this.className || this.config?.className),
            type: 'radio',
            getValue: () => this.value ?? this.config?.value,
        };
        this.controlRegistry.register(this.registryHandle);
    }
    extractClasses(classNames) {
        return (classNames || '')
            .split(/\s+/)
            .map((part) => part.trim())
            .filter((part) => !!part);
    }
    emitControlEvent(type, value, originalEvent) {
        this.controlEvent.emit({
            type,
            id: this.effectiveId,
            name: this.name || this.config?.name,
            className: this.className || this.config?.className,
            value,
            meta: this.meta || this.config?.meta,
            originalEvent,
        });
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.19", ngImport: i0, type: BrRadioComponent, deps: [{ token: RuntimeUiConfigService }, { token: ControlRegistryService }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.19", type: BrRadioComponent, isStandalone: true, selector: "br-radio", inputs: { config: "config", id: "id", controlId: "controlId", name: "name", className: "className", value: "value", options: "options", disabled: "disabled", required: "required", label: "label", meta: "meta", showLibraryTag: "showLibraryTag" }, outputs: { valueChange: "valueChange", blur: "blur", focus: "focus", input: "input", change: "change", keydown: "keydown", keyup: "keyup", click: "click", controlEvent: "controlEvent" }, providers: [
            {
                provide: NG_VALUE_ACCESSOR,
                useExisting: forwardRef(() => BrRadioComponent),
                multi: true,
            },
        ], usesInheritance: true, usesOnChanges: true, ngImport: i0, template: "<br-custom-radio-control *ngIf=\"mode === 'CUSTOM' && customConfig as cfg\" [config]=\"cfg\"\r\n  [showLibraryTag]=\"showLibraryTag\" (valueChange)=\"onImplementationValueChange($event)\"\r\n  (blurEvent)=\"onImplementationBlur($event)\" (focusEvent)=\"onImplementationFocus($event)\"\r\n  (inputEvent)=\"onImplementationInput($event)\" (changeEvent)=\"onImplementationChange($event)\"\r\n  (keydownEvent)=\"onImplementationKeydown($event)\" (keyupEvent)=\"onImplementationKeyup($event)\"\r\n  (clickEvent)=\"onImplementationClick($event)\">\r\n</br-custom-radio-control>\r\n\r\n<br-material-radio-control *ngIf=\"mode === 'MATERIAL' && materialConfig as cfg\" [config]=\"cfg\"\r\n  [showLibraryTag]=\"showLibraryTag\" (valueChange)=\"onImplementationValueChange($event)\"\r\n  (blurEvent)=\"onImplementationBlur($event)\" (focusEvent)=\"onImplementationFocus($event)\"\r\n  (inputEvent)=\"onImplementationInput($event)\" (changeEvent)=\"onImplementationChange($event)\"\r\n  (keydownEvent)=\"onImplementationKeydown($event)\" (keyupEvent)=\"onImplementationKeyup($event)\"\r\n  (clickEvent)=\"onImplementationClick($event)\">\r\n</br-material-radio-control>\r\n\r\n<br-prime-radio-control *ngIf=\"mode === 'PRIMENG' && primeConfig as cfg\" [config]=\"cfg\"\r\n  [showLibraryTag]=\"showLibraryTag\" (valueChange)=\"onImplementationValueChange($event)\">\r\n</br-prime-radio-control>", dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: CustomRadioControlComponent, selector: "br-custom-radio-control", inputs: ["config", "showLibraryTag"], outputs: ["valueChange", "blurEvent", "focusEvent", "inputEvent", "changeEvent", "keydownEvent", "keyupEvent", "clickEvent"] }, { kind: "component", type: MaterialRadioControlComponent, selector: "br-material-radio-control", inputs: ["config", "showLibraryTag"], outputs: ["valueChange", "blurEvent", "focusEvent", "inputEvent", "changeEvent", "keydownEvent", "keyupEvent", "clickEvent"] }, { kind: "component", type: PrimeRadioControlComponent, selector: "br-prime-radio-control", inputs: ["config", "showLibraryTag"], outputs: ["valueChange"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.19", ngImport: i0, type: BrRadioComponent, decorators: [{
            type: Component,
            args: [{ selector: 'br-radio', standalone: true, imports: [CommonModule, CustomRadioControlComponent, MaterialRadioControlComponent, PrimeRadioControlComponent], providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(() => BrRadioComponent),
                            multi: true,
                        },
                    ], template: "<br-custom-radio-control *ngIf=\"mode === 'CUSTOM' && customConfig as cfg\" [config]=\"cfg\"\r\n  [showLibraryTag]=\"showLibraryTag\" (valueChange)=\"onImplementationValueChange($event)\"\r\n  (blurEvent)=\"onImplementationBlur($event)\" (focusEvent)=\"onImplementationFocus($event)\"\r\n  (inputEvent)=\"onImplementationInput($event)\" (changeEvent)=\"onImplementationChange($event)\"\r\n  (keydownEvent)=\"onImplementationKeydown($event)\" (keyupEvent)=\"onImplementationKeyup($event)\"\r\n  (clickEvent)=\"onImplementationClick($event)\">\r\n</br-custom-radio-control>\r\n\r\n<br-material-radio-control *ngIf=\"mode === 'MATERIAL' && materialConfig as cfg\" [config]=\"cfg\"\r\n  [showLibraryTag]=\"showLibraryTag\" (valueChange)=\"onImplementationValueChange($event)\"\r\n  (blurEvent)=\"onImplementationBlur($event)\" (focusEvent)=\"onImplementationFocus($event)\"\r\n  (inputEvent)=\"onImplementationInput($event)\" (changeEvent)=\"onImplementationChange($event)\"\r\n  (keydownEvent)=\"onImplementationKeydown($event)\" (keyupEvent)=\"onImplementationKeyup($event)\"\r\n  (clickEvent)=\"onImplementationClick($event)\">\r\n</br-material-radio-control>\r\n\r\n<br-prime-radio-control *ngIf=\"mode === 'PRIMENG' && primeConfig as cfg\" [config]=\"cfg\"\r\n  [showLibraryTag]=\"showLibraryTag\" (valueChange)=\"onImplementationValueChange($event)\">\r\n</br-prime-radio-control>" }]
        }], ctorParameters: () => [{ type: RuntimeUiConfigService }, { type: ControlRegistryService }], propDecorators: { config: [{
                type: Input
            }], id: [{
                type: Input
            }], controlId: [{
                type: Input
            }], name: [{
                type: Input
            }], className: [{
                type: Input
            }], value: [{
                type: Input
            }], options: [{
                type: Input
            }], disabled: [{
                type: Input
            }], required: [{
                type: Input
            }], label: [{
                type: Input
            }], meta: [{
                type: Input
            }], showLibraryTag: [{
                type: Input
            }], valueChange: [{
                type: Output
            }], blur: [{
                type: Output
            }], focus: [{
                type: Output
            }], input: [{
                type: Output
            }], change: [{
                type: Output
            }], keydown: [{
                type: Output
            }], keyup: [{
                type: Output
            }], click: [{
                type: Output
            }], controlEvent: [{
                type: Output
            }] } });

class AutocompleteAdapter {
    static toCustom(config) {
        const label = config.label || '';
        const id = config.id || config.controlId;
        return {
            id,
            name: config.name,
            className: config.className,
            listId: `${id || label || 'autocomplete'}-list`.toLowerCase().replace(/\s+/g, '-'),
            label,
            value: config.value || '',
            options: [...(config.options || [])],
            placeholder: config.placeholder || '',
            disabled: config.disabled ?? false,
            required: config.required ?? false,
        };
    }
    static toMaterial(config) {
        return {
            id: config.id || config.controlId,
            name: config.name,
            className: config.className,
            label: config.label || '',
            value: config.value || '',
            options: [...(config.options || [])],
            placeholder: config.placeholder || '',
            disabled: config.disabled ?? false,
            required: config.required ?? false,
        };
    }
    static toPrime(config) {
        return {
            id: config.id || config.controlId,
            name: config.name,
            className: config.className,
            label: config.label || '',
            value: config.value || '',
            options: [...(config.options || [])],
            placeholder: config.placeholder || '',
            disabled: config.disabled ?? false,
            required: config.required ?? false,
        };
    }
}

class CustomAutocompleteControlComponent {
    config;
    showLibraryTag = false;
    valueChange = new EventEmitter();
    blurEvent = new EventEmitter();
    focusEvent = new EventEmitter();
    inputEvent = new EventEmitter();
    changeEvent = new EventEmitter();
    keydownEvent = new EventEmitter();
    keyupEvent = new EventEmitter();
    clickEvent = new EventEmitter();
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.19", ngImport: i0, type: CustomAutocompleteControlComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.19", type: CustomAutocompleteControlComponent, isStandalone: true, selector: "br-custom-autocomplete-control", inputs: { config: "config", showLibraryTag: "showLibraryTag" }, outputs: { valueChange: "valueChange", blurEvent: "blurEvent", focusEvent: "focusEvent", inputEvent: "inputEvent", changeEvent: "changeEvent", keydownEvent: "keydownEvent", keyupEvent: "keyupEvent", clickEvent: "clickEvent" }, ngImport: i0, template: "<div class=\"br-control br-autocomplete-control\">\r\n  <label class=\"br-label\">\r\n    {{ config.label }}\r\n    <span *ngIf=\"showLibraryTag\" class=\"br-lib-tag\" aria-label=\"Library package control\">LIB</span>\r\n  </label>\r\n  <input class=\"br-input\" [ngClass]=\"config.className\" [attr.id]=\"config.id\" [attr.name]=\"config.name\"\r\n    [attr.list]=\"config.listId\" type=\"text\" [placeholder]=\"config.placeholder\" [disabled]=\"config.disabled\"\r\n    [required]=\"config.required\" [ngModel]=\"config.value\" (ngModelChange)=\"valueChange.emit($event)\"\r\n    (blur)=\"blurEvent.emit($event)\" (focus)=\"focusEvent.emit($event)\" (input)=\"inputEvent.emit($event)\"\r\n    (change)=\"changeEvent.emit($event)\" (keydown)=\"keydownEvent.emit($event)\" (keyup)=\"keyupEvent.emit($event)\"\r\n    (click)=\"clickEvent.emit($event)\" />\r\n  <datalist [id]=\"config.listId\">\r\n    <option *ngFor=\"let opt of config.options\" [value]=\"opt.label\"></option>\r\n  </datalist>\r\n</div>\r\n", styles: [".br-control{display:flex;flex-direction:column;gap:8px;font-family:var(--br-font-family, Tahoma, Arial, sans-serif)}.br-label{display:inline-flex;align-items:center;gap:8px;font-size:var(--br-base-font-size, 14px);font-weight:700;color:var(--br-label-font-color, #1f2a3d)}.br-lib-tag{display:inline-flex;align-items:center;gap:5px;padding:2px 8px;border-radius:999px;background:linear-gradient(135deg,#e8f0fe,#d2e3fc);color:#174ea6;font-size:10px;font-weight:800;letter-spacing:.4px}.br-lib-tag:before{content:\"\";width:6px;height:6px;border-radius:50%;background:#174ea6}.br-input{height:40px;border-radius:10px;border:1px solid var(--br-input-border-color, #c8d5e6);padding:0 12px;font-size:var(--br-base-font-size, 14px);font-family:inherit;color:var(--br-input-text-color, #1f2a3d);background:var(--br-input-background-color, #fff);transition:border-color .12s ease,box-shadow .12s ease}.br-input::placeholder{color:var(--br-input-placeholder-color, #94a3b8)}.br-input:focus{outline:none;border-color:var(--br-focus-color, #2563eb);box-shadow:0 0 0 3px var(--br-focus-ring-color, color-mix(in srgb, #2563eb 18%, transparent))}.br-input:disabled{background:var(--br-input-disabled-background-color, #f1f5f9);color:var(--br-input-disabled-text-color, #64748b)}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "ngmodule", type: FormsModule }, { kind: "directive", type: i2.NgSelectOption, selector: "option", inputs: ["ngValue", "value"] }, { kind: "directive", type: i2.ɵNgSelectMultipleOption, selector: "option", inputs: ["ngValue", "value"] }, { kind: "directive", type: i2.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i2.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }, { kind: "directive", type: i2.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.19", ngImport: i0, type: CustomAutocompleteControlComponent, decorators: [{
            type: Component,
            args: [{ selector: 'br-custom-autocomplete-control', standalone: true, imports: [CommonModule, FormsModule], template: "<div class=\"br-control br-autocomplete-control\">\r\n  <label class=\"br-label\">\r\n    {{ config.label }}\r\n    <span *ngIf=\"showLibraryTag\" class=\"br-lib-tag\" aria-label=\"Library package control\">LIB</span>\r\n  </label>\r\n  <input class=\"br-input\" [ngClass]=\"config.className\" [attr.id]=\"config.id\" [attr.name]=\"config.name\"\r\n    [attr.list]=\"config.listId\" type=\"text\" [placeholder]=\"config.placeholder\" [disabled]=\"config.disabled\"\r\n    [required]=\"config.required\" [ngModel]=\"config.value\" (ngModelChange)=\"valueChange.emit($event)\"\r\n    (blur)=\"blurEvent.emit($event)\" (focus)=\"focusEvent.emit($event)\" (input)=\"inputEvent.emit($event)\"\r\n    (change)=\"changeEvent.emit($event)\" (keydown)=\"keydownEvent.emit($event)\" (keyup)=\"keyupEvent.emit($event)\"\r\n    (click)=\"clickEvent.emit($event)\" />\r\n  <datalist [id]=\"config.listId\">\r\n    <option *ngFor=\"let opt of config.options\" [value]=\"opt.label\"></option>\r\n  </datalist>\r\n</div>\r\n", styles: [".br-control{display:flex;flex-direction:column;gap:8px;font-family:var(--br-font-family, Tahoma, Arial, sans-serif)}.br-label{display:inline-flex;align-items:center;gap:8px;font-size:var(--br-base-font-size, 14px);font-weight:700;color:var(--br-label-font-color, #1f2a3d)}.br-lib-tag{display:inline-flex;align-items:center;gap:5px;padding:2px 8px;border-radius:999px;background:linear-gradient(135deg,#e8f0fe,#d2e3fc);color:#174ea6;font-size:10px;font-weight:800;letter-spacing:.4px}.br-lib-tag:before{content:\"\";width:6px;height:6px;border-radius:50%;background:#174ea6}.br-input{height:40px;border-radius:10px;border:1px solid var(--br-input-border-color, #c8d5e6);padding:0 12px;font-size:var(--br-base-font-size, 14px);font-family:inherit;color:var(--br-input-text-color, #1f2a3d);background:var(--br-input-background-color, #fff);transition:border-color .12s ease,box-shadow .12s ease}.br-input::placeholder{color:var(--br-input-placeholder-color, #94a3b8)}.br-input:focus{outline:none;border-color:var(--br-focus-color, #2563eb);box-shadow:0 0 0 3px var(--br-focus-ring-color, color-mix(in srgb, #2563eb 18%, transparent))}.br-input:disabled{background:var(--br-input-disabled-background-color, #f1f5f9);color:var(--br-input-disabled-text-color, #64748b)}\n"] }]
        }], propDecorators: { config: [{
                type: Input
            }], showLibraryTag: [{
                type: Input
            }], valueChange: [{
                type: Output
            }], blurEvent: [{
                type: Output
            }], focusEvent: [{
                type: Output
            }], inputEvent: [{
                type: Output
            }], changeEvent: [{
                type: Output
            }], keydownEvent: [{
                type: Output
            }], keyupEvent: [{
                type: Output
            }], clickEvent: [{
                type: Output
            }] } });

class MaterialAutocompleteControlComponent {
    config;
    showLibraryTag = false;
    valueChange = new EventEmitter();
    blurEvent = new EventEmitter();
    focusEvent = new EventEmitter();
    inputEvent = new EventEmitter();
    changeEvent = new EventEmitter();
    keydownEvent = new EventEmitter();
    keyupEvent = new EventEmitter();
    clickEvent = new EventEmitter();
    filtered() {
        const term = (this.config?.value || '').toLowerCase();
        return (this.config?.options || []).filter((o) => o.label.toLowerCase().includes(term));
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.19", ngImport: i0, type: MaterialAutocompleteControlComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.19", type: MaterialAutocompleteControlComponent, isStandalone: true, selector: "br-material-autocomplete-control", inputs: { config: "config", showLibraryTag: "showLibraryTag" }, outputs: { valueChange: "valueChange", blurEvent: "blurEvent", focusEvent: "focusEvent", inputEvent: "inputEvent", changeEvent: "changeEvent", keydownEvent: "keydownEvent", keyupEvent: "keyupEvent", clickEvent: "clickEvent" }, ngImport: i0, template: "<mat-form-field appearance=\"outline\" class=\"br-material-field\">\r\n  <mat-label class=\"br-material-label\">\r\n    {{ config.label }}\r\n    <span *ngIf=\"showLibraryTag\" class=\"br-lib-tag\" aria-label=\"Library package control\">LIB</span>\r\n  </mat-label>\r\n  <input matInput [ngClass]=\"config.className\" [attr.id]=\"config.id\" [attr.name]=\"config.name\"\r\n    [matAutocomplete]=\"auto\" [placeholder]=\"config.placeholder\" [disabled]=\"config.disabled\"\r\n    [required]=\"config.required\" [ngModel]=\"config.value\" (ngModelChange)=\"valueChange.emit($event)\"\r\n    (blur)=\"blurEvent.emit($event)\" (focus)=\"focusEvent.emit($event)\" (input)=\"inputEvent.emit($event)\"\r\n    (change)=\"changeEvent.emit($event)\" (keydown)=\"keydownEvent.emit($event)\" (keyup)=\"keyupEvent.emit($event)\"\r\n    (click)=\"clickEvent.emit($event)\" />\r\n  <mat-autocomplete #auto=\"matAutocomplete\">\r\n    <mat-option *ngFor=\"let opt of filtered()\" [value]=\"opt.label\">{{ opt.label }}</mat-option>\r\n  </mat-autocomplete>\r\n</mat-form-field>\r\n", styles: [".br-material-field{width:100%;font-family:var(--br-font-family, Tahoma, Arial, sans-serif)}.br-material-label{display:inline-flex;align-items:center;gap:8px;color:var(--br-label-font-color, #1f2a3d)}.br-lib-tag{display:inline-flex;align-items:center;gap:5px;padding:2px 8px;border-radius:999px;background:linear-gradient(135deg,#e8f0fe,#d2e3fc);color:#174ea6;font-size:10px;font-weight:800;letter-spacing:.4px}.br-lib-tag:before{content:\"\";width:6px;height:6px;border-radius:50%;background:#174ea6}:host ::ng-deep .br-material-field .mat-mdc-form-field-subscript-wrapper{display:none}:host ::ng-deep .br-material-field .mdc-text-field--outlined{background:var(--br-input-background-color, #ffffff)}:host ::ng-deep .br-material-field .mdc-notched-outline__leading,:host ::ng-deep .br-material-field .mdc-notched-outline__notch,:host ::ng-deep .br-material-field .mdc-notched-outline__trailing{border-color:var(--br-input-border-color, #c8d5e6)}:host ::ng-deep .br-material-field.mat-focused .mdc-notched-outline__leading,:host ::ng-deep .br-material-field.mat-focused .mdc-notched-outline__notch,:host ::ng-deep .br-material-field.mat-focused .mdc-notched-outline__trailing{border-color:var(--br-focus-color, #2563eb)}:host ::ng-deep .br-material-field .mdc-text-field__input{color:var(--br-input-text-color, #1f2a3d);caret-color:var(--br-focus-color, #2563eb);font-family:var(--br-font-family, Tahoma, Arial, sans-serif);font-size:var(--br-base-font-size, 14px)}:host ::ng-deep .br-material-field .mdc-text-field__input::placeholder{color:var(--br-input-placeholder-color, #94a3b8)}:host ::ng-deep .br-material-field .mdc-floating-label,:host ::ng-deep .br-material-field .mat-mdc-form-field-label{color:var(--br-label-font-color, #1f2a3d)}:host ::ng-deep div.mat-mdc-autocomplete-panel{background:var(--br-section-background-color, #ffffff)}:host ::ng-deep .mat-mdc-autocomplete-panel .mdc-list-item__primary-text{color:var(--br-base-font-color, #1f2a3d)}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "ngmodule", type: FormsModule }, { kind: "directive", type: i2.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i2.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }, { kind: "directive", type: i2.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { kind: "ngmodule", type: MatAutocompleteModule }, { kind: "component", type: i3$5.MatAutocomplete, selector: "mat-autocomplete", inputs: ["aria-label", "aria-labelledby", "displayWith", "autoActiveFirstOption", "autoSelectActiveOption", "requireSelection", "panelWidth", "disableRipple", "class", "hideSingleSelectionIndicator"], outputs: ["optionSelected", "opened", "closed", "optionActivated"], exportAs: ["matAutocomplete"] }, { kind: "component", type: i5$1.MatOption, selector: "mat-option", inputs: ["value", "id", "disabled"], outputs: ["onSelectionChange"], exportAs: ["matOption"] }, { kind: "directive", type: i3$5.MatAutocompleteTrigger, selector: "input[matAutocomplete], textarea[matAutocomplete]", inputs: ["matAutocomplete", "matAutocompletePosition", "matAutocompleteConnectedTo", "autocomplete", "matAutocompleteDisabled"], exportAs: ["matAutocompleteTrigger"] }, { kind: "ngmodule", type: MatInputModule }, { kind: "directive", type: i3$2.MatInput, selector: "input[matInput], textarea[matInput], select[matNativeControl],      input[matNativeControl], textarea[matNativeControl]", inputs: ["disabled", "id", "placeholder", "name", "required", "type", "errorStateMatcher", "aria-describedby", "value", "readonly", "disabledInteractive"], exportAs: ["matInput"] }, { kind: "component", type: i3$2.MatFormField, selector: "mat-form-field", inputs: ["hideRequiredMarker", "color", "floatLabel", "appearance", "subscriptSizing", "hintLabel"], exportAs: ["matFormField"] }, { kind: "directive", type: i3$2.MatLabel, selector: "mat-label" }, { kind: "ngmodule", type: MatFormFieldModule }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.19", ngImport: i0, type: MaterialAutocompleteControlComponent, decorators: [{
            type: Component,
            args: [{ selector: 'br-material-autocomplete-control', standalone: true, imports: [CommonModule, FormsModule, MatAutocompleteModule, MatInputModule, MatFormFieldModule], template: "<mat-form-field appearance=\"outline\" class=\"br-material-field\">\r\n  <mat-label class=\"br-material-label\">\r\n    {{ config.label }}\r\n    <span *ngIf=\"showLibraryTag\" class=\"br-lib-tag\" aria-label=\"Library package control\">LIB</span>\r\n  </mat-label>\r\n  <input matInput [ngClass]=\"config.className\" [attr.id]=\"config.id\" [attr.name]=\"config.name\"\r\n    [matAutocomplete]=\"auto\" [placeholder]=\"config.placeholder\" [disabled]=\"config.disabled\"\r\n    [required]=\"config.required\" [ngModel]=\"config.value\" (ngModelChange)=\"valueChange.emit($event)\"\r\n    (blur)=\"blurEvent.emit($event)\" (focus)=\"focusEvent.emit($event)\" (input)=\"inputEvent.emit($event)\"\r\n    (change)=\"changeEvent.emit($event)\" (keydown)=\"keydownEvent.emit($event)\" (keyup)=\"keyupEvent.emit($event)\"\r\n    (click)=\"clickEvent.emit($event)\" />\r\n  <mat-autocomplete #auto=\"matAutocomplete\">\r\n    <mat-option *ngFor=\"let opt of filtered()\" [value]=\"opt.label\">{{ opt.label }}</mat-option>\r\n  </mat-autocomplete>\r\n</mat-form-field>\r\n", styles: [".br-material-field{width:100%;font-family:var(--br-font-family, Tahoma, Arial, sans-serif)}.br-material-label{display:inline-flex;align-items:center;gap:8px;color:var(--br-label-font-color, #1f2a3d)}.br-lib-tag{display:inline-flex;align-items:center;gap:5px;padding:2px 8px;border-radius:999px;background:linear-gradient(135deg,#e8f0fe,#d2e3fc);color:#174ea6;font-size:10px;font-weight:800;letter-spacing:.4px}.br-lib-tag:before{content:\"\";width:6px;height:6px;border-radius:50%;background:#174ea6}:host ::ng-deep .br-material-field .mat-mdc-form-field-subscript-wrapper{display:none}:host ::ng-deep .br-material-field .mdc-text-field--outlined{background:var(--br-input-background-color, #ffffff)}:host ::ng-deep .br-material-field .mdc-notched-outline__leading,:host ::ng-deep .br-material-field .mdc-notched-outline__notch,:host ::ng-deep .br-material-field .mdc-notched-outline__trailing{border-color:var(--br-input-border-color, #c8d5e6)}:host ::ng-deep .br-material-field.mat-focused .mdc-notched-outline__leading,:host ::ng-deep .br-material-field.mat-focused .mdc-notched-outline__notch,:host ::ng-deep .br-material-field.mat-focused .mdc-notched-outline__trailing{border-color:var(--br-focus-color, #2563eb)}:host ::ng-deep .br-material-field .mdc-text-field__input{color:var(--br-input-text-color, #1f2a3d);caret-color:var(--br-focus-color, #2563eb);font-family:var(--br-font-family, Tahoma, Arial, sans-serif);font-size:var(--br-base-font-size, 14px)}:host ::ng-deep .br-material-field .mdc-text-field__input::placeholder{color:var(--br-input-placeholder-color, #94a3b8)}:host ::ng-deep .br-material-field .mdc-floating-label,:host ::ng-deep .br-material-field .mat-mdc-form-field-label{color:var(--br-label-font-color, #1f2a3d)}:host ::ng-deep div.mat-mdc-autocomplete-panel{background:var(--br-section-background-color, #ffffff)}:host ::ng-deep .mat-mdc-autocomplete-panel .mdc-list-item__primary-text{color:var(--br-base-font-color, #1f2a3d)}\n"] }]
        }], propDecorators: { config: [{
                type: Input
            }], showLibraryTag: [{
                type: Input
            }], valueChange: [{
                type: Output
            }], blurEvent: [{
                type: Output
            }], focusEvent: [{
                type: Output
            }], inputEvent: [{
                type: Output
            }], changeEvent: [{
                type: Output
            }], keydownEvent: [{
                type: Output
            }], keyupEvent: [{
                type: Output
            }], clickEvent: [{
                type: Output
            }] } });

class PrimeAutocompleteControlComponent {
    config;
    valueChange = new EventEmitter();
    filteredOptions = [];
    selectedItem = null;
    ngOnChanges(changes) {
        if (changes['config'] && this.config) {
            if (this.config.value !== undefined && this.config.value !== null && this.config.value !== '') {
                const found = this.config.options?.find(o => o.value === this.config.value);
                this.selectedItem = found || { label: this.config.value, value: this.config.value };
            }
            else {
                this.selectedItem = null;
            }
        }
    }
    filter(event) {
        const query = (event.query || '').toString().toLowerCase();
        const opts = this.config?.options || [];
        this.filteredOptions = opts.filter(opt => {
            const lbl = (opt.label ?? opt.value ?? '').toString().toLowerCase();
            return lbl.includes(query);
        });
    }
    onModelChange(event) {
        this.selectedItem = event;
        if (event && typeof event === 'object') {
            this.valueChange.emit(event.value !== undefined ? event.value : event);
        }
        else {
            this.valueChange.emit(event || '');
        }
    }
    onClear() {
        this.selectedItem = null;
        this.valueChange.emit('');
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.19", ngImport: i0, type: PrimeAutocompleteControlComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.19", type: PrimeAutocompleteControlComponent, isStandalone: true, selector: "br-prime-autocomplete-control", inputs: { config: "config" }, outputs: { valueChange: "valueChange" }, usesOnChanges: true, ngImport: i0, template: `
    <div class="br-prime-autocomplete-wrapper" [class]="config?.className || ''">
      <label *ngIf="config?.label" [for]="config?.id" class="br-prime-label">
        {{ config.label }}
        <span *ngIf="config.required" class="br-prime-required">*</span>
      </label>
      <div class="br-prime-control-container">
        <p-autoComplete
          [ngModel]="selectedItem"
          (ngModelChange)="onModelChange($event)"
          [suggestions]="filteredOptions"
          (completeMethod)="filter($event)"
          (onClear)="onClear()"
          [disabled]="config?.disabled || false"
          [inputId]="config?.id || ''"
          [name]="config?.name || ''"
          optionLabel="label"
          [required]="config?.required || false"
          [placeholder]="config?.placeholder || ''"
          styleClass="w-full"
          [dropdown]="true"
        ></p-autoComplete>
      </div>
    </div>
  `, isInline: true, styles: [".br-prime-autocomplete-wrapper{display:flex;flex-direction:column;gap:.5rem;margin-bottom:1rem}.br-prime-label{font-weight:500;color:var(--br-text-color, #333);font-size:.875rem}.br-prime-required{color:#e53e3e;margin-left:.25rem}::ng-deep .br-prime-control-container .p-autocomplete{width:100%}::ng-deep .br-prime-control-container .p-autocomplete-input{width:100%}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "ngmodule", type: FormsModule }, { kind: "directive", type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i2.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }, { kind: "directive", type: i2.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { kind: "ngmodule", type: AutoCompleteModule }, { kind: "component", type: i13.AutoComplete, selector: "p-autoComplete, p-autocomplete, p-auto-complete", inputs: ["minLength", "minQueryLength", "delay", "panelStyle", "styleClass", "panelStyleClass", "inputStyle", "inputId", "inputStyleClass", "placeholder", "readonly", "scrollHeight", "lazy", "virtualScroll", "virtualScrollItemSize", "virtualScrollOptions", "autoHighlight", "forceSelection", "type", "autoZIndex", "baseZIndex", "ariaLabel", "dropdownAriaLabel", "ariaLabelledBy", "dropdownIcon", "unique", "group", "completeOnFocus", "showClear", "dropdown", "showEmptyMessage", "dropdownMode", "multiple", "addOnTab", "tabindex", "dataKey", "emptyMessage", "showTransitionOptions", "hideTransitionOptions", "autofocus", "autocomplete", "optionGroupChildren", "optionGroupLabel", "overlayOptions", "suggestions", "optionLabel", "optionValue", "id", "searchMessage", "emptySelectionMessage", "selectionMessage", "autoOptionFocus", "selectOnFocus", "searchLocale", "optionDisabled", "focusOnHover", "typeahead", "addOnBlur", "separator", "appendTo", "motionOptions"], outputs: ["completeMethod", "onSelect", "onUnselect", "onAdd", "onFocus", "onBlur", "onDropdownClick", "onClear", "onInputKeydown", "onKeyUp", "onShow", "onHide", "onLazyLoad"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.19", ngImport: i0, type: PrimeAutocompleteControlComponent, decorators: [{
            type: Component,
            args: [{ selector: 'br-prime-autocomplete-control', standalone: true, imports: [CommonModule, FormsModule, AutoCompleteModule], template: `
    <div class="br-prime-autocomplete-wrapper" [class]="config?.className || ''">
      <label *ngIf="config?.label" [for]="config?.id" class="br-prime-label">
        {{ config.label }}
        <span *ngIf="config.required" class="br-prime-required">*</span>
      </label>
      <div class="br-prime-control-container">
        <p-autoComplete
          [ngModel]="selectedItem"
          (ngModelChange)="onModelChange($event)"
          [suggestions]="filteredOptions"
          (completeMethod)="filter($event)"
          (onClear)="onClear()"
          [disabled]="config?.disabled || false"
          [inputId]="config?.id || ''"
          [name]="config?.name || ''"
          optionLabel="label"
          [required]="config?.required || false"
          [placeholder]="config?.placeholder || ''"
          styleClass="w-full"
          [dropdown]="true"
        ></p-autoComplete>
      </div>
    </div>
  `, styles: [".br-prime-autocomplete-wrapper{display:flex;flex-direction:column;gap:.5rem;margin-bottom:1rem}.br-prime-label{font-weight:500;color:var(--br-text-color, #333);font-size:.875rem}.br-prime-required{color:#e53e3e;margin-left:.25rem}::ng-deep .br-prime-control-container .p-autocomplete{width:100%}::ng-deep .br-prime-control-container .p-autocomplete-input{width:100%}\n"] }]
        }], propDecorators: { config: [{
                type: Input
            }], valueChange: [{
                type: Output
            }] } });

class BrAutocompleteComponent extends BaseValueAccessor {
    runtimeUiConfig;
    controlRegistry;
    config;
    id;
    controlId;
    name;
    className;
    value;
    disabled;
    required;
    label;
    placeholder;
    options;
    meta;
    showLibraryTag = true;
    valueChange = new EventEmitter();
    blur = new EventEmitter();
    focus = new EventEmitter();
    input = new EventEmitter();
    change = new EventEmitter();
    keydown = new EventEmitter();
    keyup = new EventEmitter();
    click = new EventEmitter();
    controlEvent = new EventEmitter();
    mode = 'CUSTOM';
    customConfig;
    materialConfig;
    primeConfig;
    destroy$ = new Subject();
    registryHandle;
    constructor(runtimeUiConfig, controlRegistry) {
        super();
        this.runtimeUiConfig = runtimeUiConfig;
        this.controlRegistry = controlRegistry;
    }
    ngOnInit() {
        this.mode = this.runtimeUiConfig.getModesSnapshot().autocomplete;
        this.adaptConfig();
        this.runtimeUiConfig.modes$.pipe(takeUntil(this.destroy$)).subscribe((m) => {
            this.mode = m.autocomplete;
            this.adaptConfig();
        });
        this.refreshRegistryRegistration();
    }
    ngOnChanges(_) {
        this.adaptConfig();
        this.refreshRegistryRegistration();
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
        if (this.registryHandle) {
            this.controlRegistry.unregister(this.registryHandle);
        }
    }
    onImplementationValueChange(value) {
        this.value = value ?? '';
        this.valueChange.emit(this.value);
        this.emitValueChange(this.value);
        this.emitControlEvent('valueChange', this.value);
        this.refreshRegistryRegistration();
    }
    onImplementationBlur(event) {
        this.blur.emit(event);
        this.emitControlEvent('blur', this.value ?? '', event);
        this.markTouched();
    }
    onImplementationFocus(event) {
        this.focus.emit(event);
        this.emitControlEvent('focus', this.value ?? '', event);
    }
    onImplementationInput(event) {
        this.input.emit(event);
        this.emitControlEvent('input', this.value ?? '', event);
    }
    onImplementationChange(event) {
        this.change.emit(event);
        this.emitControlEvent('change', this.value ?? '', event);
    }
    onImplementationKeydown(event) {
        this.keydown.emit(event);
        this.emitControlEvent('keydown', this.value ?? '', event);
    }
    onImplementationKeyup(event) {
        this.keyup.emit(event);
        this.emitControlEvent('keyup', this.value ?? '', event);
    }
    onImplementationClick(event) {
        this.click.emit(event);
        this.emitControlEvent('click', this.value ?? '', event);
    }
    normalizeValue(value) {
        return value ?? '';
    }
    afterWriteValue(value) {
        this.value = value;
        this.adaptConfig();
        this.refreshRegistryRegistration();
    }
    afterDisabledStateChange(isDisabled) {
        this.disabled = isDisabled;
        this.adaptConfig();
    }
    adaptConfig() {
        const resolved = this.resolveConfig();
        if (this.mode === 'CUSTOM') {
            this.customConfig = AutocompleteAdapter.toCustom(resolved);
        }
        else if (this.mode === 'MATERIAL') {
            this.materialConfig = AutocompleteAdapter.toMaterial(resolved);
        }
        else if (this.mode === 'PRIMENG') {
            this.primeConfig = AutocompleteAdapter.toPrime(resolved);
        }
        else {
            // Fallback for now
            this.materialConfig = AutocompleteAdapter.toMaterial(resolved);
        }
    }
    resolveConfig() {
        const source = this.config
            ? { ...this.config }
            : {
                label: '',
                value: '',
                options: [],
            };
        return {
            ...source,
            id: this.effectiveId,
            controlId: this.controlId,
            name: this.name ?? source.name,
            className: this.className ?? source.className,
            meta: this.meta ?? source.meta,
            label: this.label ?? source.label,
            value: this.value !== undefined ? this.value : (source.value ?? ''),
            options: this.options ?? source.options ?? [],
            placeholder: this.placeholder ?? source.placeholder,
            disabled: this.disabled ?? source.disabled ?? this.currentDisabled,
            required: this.required ?? source.required ?? false,
        };
    }
    get effectiveId() {
        return this.id || this.controlId || this.config?.id || this.config?.controlId;
    }
    refreshRegistryRegistration() {
        if (this.registryHandle) {
            this.controlRegistry.unregister(this.registryHandle);
        }
        this.registryHandle = {
            id: this.effectiveId,
            name: this.name || this.config?.name,
            classes: this.extractClasses(this.className || this.config?.className),
            type: 'autocomplete',
            getValue: () => this.value ?? this.config?.value ?? '',
        };
        this.controlRegistry.register(this.registryHandle);
    }
    extractClasses(classNames) {
        return (classNames || '')
            .split(/\s+/)
            .map((part) => part.trim())
            .filter((part) => !!part);
    }
    emitControlEvent(type, value, originalEvent) {
        this.controlEvent.emit({
            type,
            id: this.effectiveId,
            name: this.name || this.config?.name,
            className: this.className || this.config?.className,
            value,
            meta: this.meta || this.config?.meta,
            originalEvent,
        });
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.19", ngImport: i0, type: BrAutocompleteComponent, deps: [{ token: RuntimeUiConfigService }, { token: ControlRegistryService }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.19", type: BrAutocompleteComponent, isStandalone: true, selector: "br-autocomplete", inputs: { config: "config", id: "id", controlId: "controlId", name: "name", className: "className", value: "value", disabled: "disabled", required: "required", label: "label", placeholder: "placeholder", options: "options", meta: "meta", showLibraryTag: "showLibraryTag" }, outputs: { valueChange: "valueChange", blur: "blur", focus: "focus", input: "input", change: "change", keydown: "keydown", keyup: "keyup", click: "click", controlEvent: "controlEvent" }, providers: [
            {
                provide: NG_VALUE_ACCESSOR,
                useExisting: forwardRef(() => BrAutocompleteComponent),
                multi: true,
            },
        ], usesInheritance: true, usesOnChanges: true, ngImport: i0, template: "<br-custom-autocomplete-control *ngIf=\"mode === 'CUSTOM' && customConfig as cfg\" [config]=\"cfg\"\r\n  [showLibraryTag]=\"showLibraryTag\" (valueChange)=\"onImplementationValueChange($event)\"\r\n  (blurEvent)=\"onImplementationBlur($event)\" (focusEvent)=\"onImplementationFocus($event)\"\r\n  (inputEvent)=\"onImplementationInput($event)\" (changeEvent)=\"onImplementationChange($event)\"\r\n  (keydownEvent)=\"onImplementationKeydown($event)\" (keyupEvent)=\"onImplementationKeyup($event)\"\r\n  (clickEvent)=\"onImplementationClick($event)\">\r\n</br-custom-autocomplete-control>\r\n\r\n<br-material-autocomplete-control *ngIf=\"mode === 'MATERIAL' && materialConfig as cfg\" [config]=\"cfg\"\r\n  [showLibraryTag]=\"showLibraryTag\" (valueChange)=\"onImplementationValueChange($event)\"\r\n  (blurEvent)=\"onImplementationBlur($event)\" (focusEvent)=\"onImplementationFocus($event)\"\r\n  (inputEvent)=\"onImplementationInput($event)\" (changeEvent)=\"onImplementationChange($event)\"\r\n  (keydownEvent)=\"onImplementationKeydown($event)\" (keyupEvent)=\"onImplementationKeyup($event)\"\r\n  (clickEvent)=\"onImplementationClick($event)\">\r\n</br-material-autocomplete-control>\r\n\r\n<br-prime-autocomplete-control *ngIf=\"mode === 'PRIMENG' && primeConfig as cfg\" [config]=\"cfg\"\r\n  (valueChange)=\"onImplementationValueChange($event)\">\r\n</br-prime-autocomplete-control>", dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: CustomAutocompleteControlComponent, selector: "br-custom-autocomplete-control", inputs: ["config", "showLibraryTag"], outputs: ["valueChange", "blurEvent", "focusEvent", "inputEvent", "changeEvent", "keydownEvent", "keyupEvent", "clickEvent"] }, { kind: "component", type: MaterialAutocompleteControlComponent, selector: "br-material-autocomplete-control", inputs: ["config", "showLibraryTag"], outputs: ["valueChange", "blurEvent", "focusEvent", "inputEvent", "changeEvent", "keydownEvent", "keyupEvent", "clickEvent"] }, { kind: "component", type: PrimeAutocompleteControlComponent, selector: "br-prime-autocomplete-control", inputs: ["config"], outputs: ["valueChange"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.19", ngImport: i0, type: BrAutocompleteComponent, decorators: [{
            type: Component,
            args: [{ selector: 'br-autocomplete', standalone: true, imports: [CommonModule, CustomAutocompleteControlComponent, MaterialAutocompleteControlComponent, PrimeAutocompleteControlComponent], providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(() => BrAutocompleteComponent),
                            multi: true,
                        },
                    ], template: "<br-custom-autocomplete-control *ngIf=\"mode === 'CUSTOM' && customConfig as cfg\" [config]=\"cfg\"\r\n  [showLibraryTag]=\"showLibraryTag\" (valueChange)=\"onImplementationValueChange($event)\"\r\n  (blurEvent)=\"onImplementationBlur($event)\" (focusEvent)=\"onImplementationFocus($event)\"\r\n  (inputEvent)=\"onImplementationInput($event)\" (changeEvent)=\"onImplementationChange($event)\"\r\n  (keydownEvent)=\"onImplementationKeydown($event)\" (keyupEvent)=\"onImplementationKeyup($event)\"\r\n  (clickEvent)=\"onImplementationClick($event)\">\r\n</br-custom-autocomplete-control>\r\n\r\n<br-material-autocomplete-control *ngIf=\"mode === 'MATERIAL' && materialConfig as cfg\" [config]=\"cfg\"\r\n  [showLibraryTag]=\"showLibraryTag\" (valueChange)=\"onImplementationValueChange($event)\"\r\n  (blurEvent)=\"onImplementationBlur($event)\" (focusEvent)=\"onImplementationFocus($event)\"\r\n  (inputEvent)=\"onImplementationInput($event)\" (changeEvent)=\"onImplementationChange($event)\"\r\n  (keydownEvent)=\"onImplementationKeydown($event)\" (keyupEvent)=\"onImplementationKeyup($event)\"\r\n  (clickEvent)=\"onImplementationClick($event)\">\r\n</br-material-autocomplete-control>\r\n\r\n<br-prime-autocomplete-control *ngIf=\"mode === 'PRIMENG' && primeConfig as cfg\" [config]=\"cfg\"\r\n  (valueChange)=\"onImplementationValueChange($event)\">\r\n</br-prime-autocomplete-control>" }]
        }], ctorParameters: () => [{ type: RuntimeUiConfigService }, { type: ControlRegistryService }], propDecorators: { config: [{
                type: Input
            }], id: [{
                type: Input
            }], controlId: [{
                type: Input
            }], name: [{
                type: Input
            }], className: [{
                type: Input
            }], value: [{
                type: Input
            }], disabled: [{
                type: Input
            }], required: [{
                type: Input
            }], label: [{
                type: Input
            }], placeholder: [{
                type: Input
            }], options: [{
                type: Input
            }], meta: [{
                type: Input
            }], showLibraryTag: [{
                type: Input
            }], valueChange: [{
                type: Output
            }], blur: [{
                type: Output
            }], focus: [{
                type: Output
            }], input: [{
                type: Output
            }], change: [{
                type: Output
            }], keydown: [{
                type: Output
            }], keyup: [{
                type: Output
            }], click: [{
                type: Output
            }], controlEvent: [{
                type: Output
            }] } });

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

/**
 * ============================================================
 * MODAL CONFIGURATION MODEL — Library-Agnostic JSON Schema
 * ============================================================
 *
 * This interface defines the shape of the JSON configuration
 * that consuming screens pass to <br-modal>.
 *
 * CRITICAL: This schema MUST NOT contain any Angular Material
 * or library-specific properties. It is the public contract.
 * ============================================================
 */

const DEFAULT_BRANDING = {
    fontFamily: 'Tahoma, Arial, sans-serif',
    baseFontSize: '14px',
    welcomeTextFontSize: '24px',
    light: {
        baseFontColor: '#1f2937',
        titleFontColor: '#0f172a',
        labelFontColor: '#334155',
        linkColor: '#2563eb',
        foregroundColor: '#0f766e',
        accentColor: '#0f766e',
        focusColor: '#2563eb',
        focusRingColor: 'color-mix(in srgb, #2563eb 18%, transparent)',
        backgroundColor: '#ffffff',
        backgroundImage: '',
        heroImage: '',
        headerBackgroundColor: '#ffffff',
        headerTextColor: '#0f172a',
        sectionBackgroundColor: '#f8fafc',
        sectionBorderColor: '#e2e8f0',
        tableHeaderBackgroundColor: '#f8fafc',
        tableHeaderFontColor: '#0f172a',
        tableAltColor: 'transparent',
        inputBackgroundColor: '#ffffff',
        inputBorderColor: '#c8d5e6',
        inputTextColor: '#1f2937',
        inputPlaceholderColor: '#94a3b8',
        inputDisabledBackgroundColor: '#f1f5f9',
        inputDisabledTextColor: '#94a3b8',
        primaryButtonColor: '#2563eb',
        primaryButtonHoverColor: '#1d4ed8',
        primaryButtonTextColor: '#ffffff',
        primaryButtonTextHoverColor: '#ffffff',
        secondaryButtonColor: '#e2e8f0',
        secondaryButtonHoverColor: '#cbd5e1',
        secondaryButtonTextColor: '#0f172a',
        secondaryButtonTextHoverColor: '#0f172a',
        welcomeTextFontColor: '#ffffff',
    },
    dark: {
        baseFontColor: '#e5e7eb',
        titleFontColor: '#f8fafc',
        labelFontColor: '#cbd5e1',
        linkColor: '#93c5fd',
        foregroundColor: '#2dd4bf',
        accentColor: '#2dd4bf',
        focusColor: '#5eead4',
        focusRingColor: 'color-mix(in srgb, #5eead4 24%, transparent)',
        backgroundColor: '#0f172a',
        backgroundImage: '',
        heroImage: '',
        headerBackgroundColor: '#111827',
        headerTextColor: '#f8fafc',
        sectionBackgroundColor: '#1f2937',
        sectionBorderColor: '#334155',
        tableHeaderBackgroundColor: '#111827',
        tableHeaderFontColor: '#f8fafc',
        tableAltColor: '#0b1120',
        inputBackgroundColor: '#111827',
        inputBorderColor: '#334155',
        inputTextColor: '#e5e7eb',
        inputPlaceholderColor: '#94a3b8',
        inputDisabledBackgroundColor: '#1f2937',
        inputDisabledTextColor: '#64748b',
        primaryButtonColor: '#3b82f6',
        primaryButtonHoverColor: '#2563eb',
        primaryButtonTextColor: '#ffffff',
        primaryButtonTextHoverColor: '#ffffff',
        secondaryButtonColor: '#374151',
        secondaryButtonHoverColor: '#4b5563',
        secondaryButtonTextColor: '#f8fafc',
        secondaryButtonTextHoverColor: '#f8fafc',
        welcomeTextFontColor: '#ffffff',
    },
};

class EnterpriseBrandingAdapter {
    static toBrBrandingConfig(raw) {
        return {
            fontFamily: raw.fontFamily,
            baseFontSize: raw.baseFontSize,
            welcomeTextFontSize: raw.welcomeTextFontSize,
            light: {
                baseFontColor: raw.baseFontColor,
                titleFontColor: raw.titleFontColor,
                labelFontColor: raw.labelFontColor,
                linkColor: raw.linkColor,
                foregroundColor: raw.foreGroundColor,
                backgroundColor: raw.backgroundColor,
                backgroundImage: raw.backgroundImage,
                heroImage: raw.heroImage,
                headerBackgroundColor: raw.headerBackgroundColor,
                headerTextColor: raw.headerTextColor,
                sectionBackgroundColor: raw.sectionBackgroundColor,
                tableHeaderBackgroundColor: raw.tableHeaderBackgroundColor,
                tableHeaderFontColor: raw.tableHeaderFontColor,
                tableAltColor: raw.tableAltColor,
                primaryButtonColor: raw.primaryButtonColor,
                primaryButtonHoverColor: raw.primaryButtonHoverColor,
                primaryButtonTextColor: raw.primaryButtonTextColor,
                primaryButtonTextHoverColor: raw.primaryButtonTextHoverColor,
                secondaryButtonColor: raw.secondaryButtonColor,
                secondaryButtonHoverColor: raw.secondaryButtonHoverColor,
                secondaryButtonTextColor: raw.secondaryButtonTextColor,
                secondaryButtonTextHoverColor: raw.secondaryButtonTextHoverColor,
                welcomeTextFontColor: raw.welcomeTextFontColor,
            },
        };
    }
}

class TalentGatewayBrandingAdapter {
    static toBrBrandingConfig(raw) {
        return {
            fontFamily: raw.Responsive_BaseFontFamily,
            baseFontSize: raw.Responsive_BaseFontSize,
            light: {
                baseFontColor: raw.Responsive_BaseFontColor,
                labelFontColor: raw.Responsive_BaseFontColor,
                titleFontColor: raw.Responsive_BaseFontColor,
                backgroundColor: raw.Responsive_BackgroundColor,
                backgroundImage: raw.Responsive_BackgroundImage,
                primaryButtonColor: raw.Responsive_ButtonBackgroundColor,
                primaryButtonHoverColor: raw.Responsive_ButtonBackgroundColor,
            },
        };
    }
}

const BR_DEFAULT_BRANDING = new InjectionToken('BR_DEFAULT_BRANDING', {
    providedIn: 'root',
    factory: () => DEFAULT_BRANDING,
});
const BRANDING_STORAGE_KEY = 'br-runtime-branding';
const BRANDING_MODE_STORAGE_KEY = 'br-runtime-branding-mode';
const BRANDING_CHANGED_EVENT = 'br-runtime-branding-changed';
const BRANDING_MODE_CHANGED_EVENT = 'br-runtime-branding-mode-changed';
class BrandingRuntimeService {
    defaults;
    hasWindow = typeof window !== 'undefined';
    brandingSubject;
    modeSubject = new BehaviorSubject(this.loadInitialMode());
    branding$;
    mode$ = this.modeSubject.asObservable();
    constructor(defaults) {
        this.defaults = defaults;
        this.brandingSubject = new BehaviorSubject(this.loadInitialBranding());
        this.branding$ = this.brandingSubject.asObservable();
        this.applyCssVars(this.brandingSubject.value, this.modeSubject.value);
        if (this.hasWindow) {
            window.addEventListener(BRANDING_CHANGED_EVENT, this.onBrandingChanged);
            window.addEventListener(BRANDING_MODE_CHANGED_EVENT, this.onModeChanged);
        }
    }
    getBrandingSnapshot() {
        return this.brandingSubject.value;
    }
    getModeSnapshot() {
        return this.modeSubject.value;
    }
    setBranding(config) {
        const merged = this.mergeBranding(config);
        this.brandingSubject.next(merged);
        this.persistBranding(merged);
        this.applyCssVars(merged, this.modeSubject.value);
        this.broadcastBranding(merged);
    }
    setMode(mode) {
        this.modeSubject.next(mode);
        this.persistMode(mode);
        this.applyCssVars(this.brandingSubject.value, mode);
        this.broadcastMode(mode);
    }
    reset() {
        this.setBranding(this.defaults);
        this.setMode('light');
    }
    mergeBranding(config) {
        const defaults = this.defaults;
        const lightOverrides = config.light ?? {};
        const darkOverrides = config.dark ?? {};
        return {
            fontFamily: config.fontFamily ?? defaults.fontFamily,
            baseFontSize: config.baseFontSize ?? defaults.baseFontSize,
            welcomeTextFontSize: config.welcomeTextFontSize ?? defaults.welcomeTextFontSize,
            light: this.resolvePalette({
                ...(defaults.light ?? {}),
                ...lightOverrides,
            }, lightOverrides),
            dark: this.resolvePalette({
                ...(defaults.dark ?? {}),
                ...darkOverrides,
            }, darkOverrides),
        };
    }
    currentPalette(config, mode) {
        const light = {
            ...(this.defaults.light ?? {}),
            ...(config.light ?? {}),
        };
        if (mode === 'dark') {
            return {
                ...light,
                ...(this.defaults.dark ?? {}),
                ...(config.dark ?? {}),
            };
        }
        return light;
    }
    resolvePalette(base, overrides) {
        return {
            ...base,
            inputTextColor: overrides.inputTextColor ?? overrides.baseFontColor ?? base.inputTextColor ?? base.baseFontColor,
        };
    }
    applyCssVars(config, mode) {
        if (!this.hasWindow) {
            return;
        }
        const root = document.documentElement;
        const palette = this.currentPalette(config, mode);
        const vars = {
            '--br-font-family': config.fontFamily,
            '--br-base-font-size': config.baseFontSize,
            '--br-welcome-text-font-size': config.welcomeTextFontSize,
            '--br-base-font-color': palette.baseFontColor,
            '--br-title-font-color': palette.titleFontColor,
            '--br-label-font-color': palette.labelFontColor,
            '--br-link-color': palette.linkColor,
            '--br-foreground-color': palette.foregroundColor,
            '--br-accent-color': palette.accentColor,
            '--br-focus-color': palette.focusColor,
            '--br-focus-ring-color': palette.focusRingColor,
            '--br-background-color': palette.backgroundColor,
            '--br-background-image': palette.backgroundImage ? `url(${palette.backgroundImage})` : '',
            '--br-hero-image': palette.heroImage ? `url(${palette.heroImage})` : '',
            '--br-header-background-color': palette.headerBackgroundColor,
            '--br-header-text-color': palette.headerTextColor,
            '--br-section-background-color': palette.sectionBackgroundColor,
            '--br-section-border-color': palette.sectionBorderColor,
            '--br-table-header-background-color': palette.tableHeaderBackgroundColor,
            '--br-table-header-font-color': palette.tableHeaderFontColor,
            '--br-table-alt-color': palette.tableAltColor,
            '--br-input-background-color': palette.inputBackgroundColor,
            '--br-input-border-color': palette.inputBorderColor,
            '--br-input-text-color': palette.inputTextColor,
            '--br-input-placeholder-color': palette.inputPlaceholderColor,
            '--br-input-disabled-background-color': palette.inputDisabledBackgroundColor,
            '--br-input-disabled-text-color': palette.inputDisabledTextColor,
            '--br-primary-button-color': palette.primaryButtonColor,
            '--br-primary-button-hover-color': palette.primaryButtonHoverColor,
            '--br-primary-button-text-color': palette.primaryButtonTextColor,
            '--br-primary-button-text-hover-color': palette.primaryButtonTextHoverColor,
            '--br-secondary-button-color': palette.secondaryButtonColor,
            '--br-secondary-button-hover-color': palette.secondaryButtonHoverColor,
            '--br-secondary-button-text-color': palette.secondaryButtonTextColor,
            '--br-secondary-button-text-hover-color': palette.secondaryButtonTextHoverColor,
            '--br-welcome-text-font-color': palette.welcomeTextFontColor,
            '--br-color-mode': mode,
        };
        Object.entries(vars).forEach(([key, value]) => {
            if (value !== undefined) {
                root.style.setProperty(key, value);
            }
        });
    }
    loadInitialBranding() {
        if (!this.hasWindow) {
            return this.mergeBranding(this.defaults);
        }
        try {
            const raw = window.localStorage.getItem(BRANDING_STORAGE_KEY);
            if (!raw) {
                return this.mergeBranding(this.defaults);
            }
            return this.mergeBranding(JSON.parse(raw));
        }
        catch {
            return this.mergeBranding(this.defaults);
        }
    }
    loadInitialMode() {
        if (!this.hasWindow) {
            return 'light';
        }
        const raw = window.localStorage.getItem(BRANDING_MODE_STORAGE_KEY);
        return raw === 'dark' ? 'dark' : 'light';
    }
    persistBranding(config) {
        if (!this.hasWindow) {
            return;
        }
        try {
            window.localStorage.setItem(BRANDING_STORAGE_KEY, JSON.stringify(config));
        }
        catch {
            // ignore storage failures
        }
    }
    persistMode(mode) {
        if (!this.hasWindow) {
            return;
        }
        try {
            window.localStorage.setItem(BRANDING_MODE_STORAGE_KEY, mode);
        }
        catch {
            // ignore storage failures
        }
    }
    broadcastBranding(config) {
        if (!this.hasWindow) {
            return;
        }
        try {
            window.dispatchEvent(new CustomEvent(BRANDING_CHANGED_EVENT, { detail: config }));
        }
        catch {
            // ignore event dispatch failures
        }
    }
    broadcastMode(mode) {
        if (!this.hasWindow) {
            return;
        }
        try {
            window.dispatchEvent(new CustomEvent(BRANDING_MODE_CHANGED_EVENT, { detail: mode }));
        }
        catch {
            // ignore event dispatch failures
        }
    }
    onBrandingChanged = (event) => {
        const detail = event.detail;
        if (!detail) {
            return;
        }
        const merged = this.mergeBranding(detail);
        if (JSON.stringify(this.brandingSubject.value) === JSON.stringify(merged)) {
            return;
        }
        this.brandingSubject.next(merged);
        this.applyCssVars(merged, this.modeSubject.value);
    };
    onModeChanged = (event) => {
        const detail = event.detail;
        if (!detail || this.modeSubject.value === detail) {
            return;
        }
        this.modeSubject.next(detail);
        this.applyCssVars(this.brandingSubject.value, detail);
    };
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.19", ngImport: i0, type: BrandingRuntimeService, deps: [{ token: BR_DEFAULT_BRANDING }], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "19.2.19", ngImport: i0, type: BrandingRuntimeService, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.19", ngImport: i0, type: BrandingRuntimeService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: () => [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [BR_DEFAULT_BRANDING]
                }] }] });

/*
 * Public API Surface of br-ui-wrapper
 */

/**
 * Generated bundle index. Do not edit.
 */

export { AutocompleteAdapter, BR_DEFAULT_BRANDING, BrAutocompleteComponent, BrCheckboxComponent, BrDateComponent, BrGridComponent, BrModalComponent, BrMultiSelectComponent, BrRadioComponent, BrSingleSelectComponent, BrTextAreaComponent, BrTextComponent, BrUiWrapperComponent, BrUiWrapperService, BrandingRuntimeService, CheckboxAdapter, ControlRegistryService, DEFAULT_BRANDING, DateAdapter, EnterpriseBrandingAdapter, GridAdapter, ModalAdapter, MultiSelectAdapter, RadioAdapter, RuntimeUiConfigService, SingleSelectAdapter, TalentGatewayBrandingAdapter, TextAdapter, TextAreaAdapter, UI_MODE, UI_MODE_BY_CONTROL };
//# sourceMappingURL=sriharshavarada-br-ui-wrapper.mjs.map
