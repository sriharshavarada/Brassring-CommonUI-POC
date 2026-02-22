import { CommonModule } from '@angular/common';
import { Component, EventEmitter, HostListener, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { GridShellInput } from '../../../adapters/grid.adapter';
import { BrGridAction, BrGridActionEvent, BrGridColumnOption, BrGridFilterRule, BrGridSortRule } from '../../../models/grid-config.model';

interface GridRow {
  __rowId: number;
  __raw: any;
}

@Component({
  selector: 'br-grid-shell',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './grid-shell.component.html',
  styleUrls: ['./grid-shell.component.scss'],
})
export class GridShellComponent implements OnChanges {
  @Input() config!: GridShellInput;
  @Input() variant: 'custom' | 'material' | 'canvas' = 'custom';
  @Output() action = new EventEmitter<BrGridActionEvent>();

  allColumns: GridShellInput['columns'] = [];
  availableColumns: BrGridColumnOption[] = [];
  visibleColumnFields: string[] = [];

  rows: GridRow[] = [];
  pageRows: GridRow[] = [];

  selectedRowIds = new Set<number>();

  searchOpen = false;
  searchTerm = '';

  zoomMode = false;

  showSortModal = false;
  showFilterModal = false;
  sortCriteria: BrGridSortRule[] = [];
  filterCriteria: BrGridFilterRule[] = [];

  showColumnsPanel = false;
  showPrimaryActionMenu = false;
  columnSearch = '';

  showContextMenu = false;
  contextX = 0;
  contextY = 0;
  contextRowId: number | null = null;

  currentPage = 1;
  pageSize = 5;
  totalPages = 1;
  totalRows = 0;
  pageSizeOptions = [5, 10, 15];

  get rootClasses(): string[] {
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

  get rootStyles(): Record<string, string> {
    const styles: Record<string, string> = {};
    const tokens = this.config.uiConfig.tokens || {};
    Object.entries(tokens).forEach(([key, value]) => {
      styles[`--grid-${key}`] = String(value);
    });
    return styles;
  }

  get isCustomVariant(): boolean {
    return this.variant === 'custom';
  }

  get isMaterialVariant(): boolean {
    return this.variant === 'material';
  }

  get isCanvasVariant(): boolean {
    return this.variant === 'canvas';
  }

  get activeSortCount(): number {
    return this.sortCriteria.filter((x) => !!x.field).length;
  }

  get activeFilterCount(): number {
    return this.filterCriteria.filter((x) => !!x.field && !!x.value.trim()).length;
  }

  get activeColumns(): GridShellInput['columns'] {
    return this.visibleColumnFields
      .map((field) => this.allColumns.find((col) => col.field === field))
      .filter((col): col is GridShellInput['columns'][number] => !!col);
  }

  get filteredColumnOptions(): BrGridColumnOption[] {
    const term = this.columnSearch.toLowerCase().trim();
    if (!term) {
      return this.availableColumns;
    }
    return this.availableColumns.filter((col) =>
      `${col.label || ''} ${col.field} ${col.group || ''}`.toLowerCase().includes(term)
    );
  }

  get selectionCount(): number {
    return this.selectedRowIds.size;
  }

  get isAllPageSelected(): boolean {
    return this.pageRows.length > 0 && this.pageRows.every((row) => this.selectedRowIds.has(row.__rowId));
  }

  get isSomePageSelected(): boolean {
    return this.pageRows.some((row) => this.selectedRowIds.has(row.__rowId));
  }

  get startItem(): number {
    return this.totalRows === 0 ? 0 : (this.currentPage - 1) * this.pageSize + 1;
  }

  get endItem(): number {
    return Math.min(this.currentPage * this.pageSize, this.totalRows);
  }

  ngOnChanges(changes: SimpleChanges): void {
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

  @HostListener('document:click')
  onDocumentClick(): void {
    this.showContextMenu = false;
    this.showPrimaryActionMenu = false;
  }

  openSortModal(event: MouseEvent): void {
    if (!this.config.features.enableSorting) {
      return;
    }
    event.stopPropagation();
    this.showSortModal = true;
  }

  closeSortModal(): void {
    this.showSortModal = false;
  }

  openFilterModal(event: MouseEvent): void {
    if (!this.config.features.enableFiltering) {
      return;
    }
    event.stopPropagation();
    this.showFilterModal = true;
  }

  closeFilterModal(): void {
    this.showFilterModal = false;
  }

  applySortCriteria(): void {
    this.currentPage = 1;
    this.applyView();
    this.showSortModal = false;
    this.emitAction({
      source: 'sort-apply',
      actionId: 'sort-apply',
      sortCriteria: this.sortCriteria.filter((x) => x.field),
    });
  }

  clearSortCriteria(): void {
    this.sortCriteria = this.seedSortCriteria([]);
    this.applyView();
    this.emitAction({ source: 'sort-clear', actionId: 'sort-clear' });
  }

  applyFilterCriteria(): void {
    this.currentPage = 1;
    this.applyView();
    this.showFilterModal = false;
    this.emitAction({
      source: 'filter-apply',
      actionId: 'filter-apply',
      filterCriteria: this.filterCriteria.filter((x) => x.field && x.value.trim()),
    });
  }

  clearFilterCriteria(): void {
    this.filterCriteria = this.seedFilterCriteria([]);
    this.applyView();
    this.emitAction({ source: 'filter-clear', actionId: 'filter-clear' });
  }

  toggleSearch(): void {
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

  toggleZoomMode(): void {
    if (!this.config.features.enableViewMode) {
      return;
    }
    this.zoomMode = !this.zoomMode;
    this.emitAction({ source: 'view-mode-toggle', actionId: this.zoomMode ? 'view-mode-on' : 'view-mode-off' });
  }

  onSearchChange(): void {
    this.currentPage = 1;
    this.applyView();
  }

  refreshGrid(): void {
    this.searchTerm = '';
    this.searchOpen = false;
    this.sortCriteria = this.seedSortCriteria(this.config.defaultSort || []);
    this.filterCriteria = this.seedFilterCriteria(this.config.defaultFilters || []);
    this.currentPage = 1;
    this.selectedRowIds.clear();
    this.applyView();
    this.emitAction({ source: 'refresh', actionId: 'refresh' });
  }

  openColumnsPanel(event: MouseEvent): void {
    if (!this.config.features.enableColumnPersonalization) {
      return;
    }
    event.stopPropagation();
    this.showColumnsPanel = true;
  }

  closeColumnsPanel(): void {
    this.showColumnsPanel = false;
    this.columnSearch = '';
    this.emitAction({
      source: 'columns-cancel',
      actionId: 'columns-cancel',
      visibleColumns: [...this.visibleColumnFields],
    });
  }

  togglePrimaryActionMenu(event: MouseEvent): void {
    if (!this.config.features.enablePrimaryActionMenu) {
      return;
    }
    event.stopPropagation();
    this.showPrimaryActionMenu = !this.showPrimaryActionMenu;
  }

  toggleColumn(field: string): void {
    if (!this.config.features.enableColumnVisibilityToggle) {
      return;
    }
    const exists = this.visibleColumnFields.includes(field);

    if (exists) {
      if (this.visibleColumnFields.length === 1) {
        return;
      }
      this.visibleColumnFields = this.visibleColumnFields.filter((f) => f !== field);
    } else {
      if (this.visibleColumnFields.length >= this.config.personalization.maxSelectedColumns) {
        return;
      }
      this.visibleColumnFields = [...this.visibleColumnFields, field];
    }

    this.applyView();
  }

  removeColumn(field: string): void {
    if (this.visibleColumnFields.length === 1) {
      return;
    }
    this.visibleColumnFields = this.visibleColumnFields.filter((f) => f !== field);
    this.applyView();
  }

  moveColumn(field: string, direction: -1 | 1): void {
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

  toggleSelectAllOnPage(checked: boolean): void {
    if (!this.config.features.enableRowSelection) {
      return;
    }
    if (checked) {
      this.pageRows.forEach((row) => this.selectedRowIds.add(row.__rowId));
    } else {
      this.pageRows.forEach((row) => this.selectedRowIds.delete(row.__rowId));
    }
    this.emitSelectionChange();
  }

  toggleRowSelection(rowId: number, checked: boolean): void {
    if (!this.config.features.enableRowSelection) {
      return;
    }
    if (checked) {
      this.selectedRowIds.add(rowId);
    } else {
      this.selectedRowIds.delete(rowId);
    }
    this.emitSelectionChange();
  }

  clearSelection(): void {
    this.selectedRowIds.clear();
    this.emitSelectionChange();
  }

  onRowContextMenu(event: MouseEvent, rowId: number): void {
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

  openContextMenuFromButton(event: MouseEvent, rowId: number): void {
    if (!this.config.features.enableContextMenu) {
      return;
    }
    event.preventDefault();
    event.stopPropagation();

    const target = event.target as HTMLElement;
    const rect = target.getBoundingClientRect();

    this.contextX = rect.right - 220;
    this.contextY = rect.bottom + 8;
    this.contextRowId = rowId;
    this.showContextMenu = true;
  }

  closeContextMenu(event: MouseEvent): void {
    event.stopPropagation();
    this.showContextMenu = false;
    this.contextRowId = null;
  }

  getCellValue(row: GridRow, field: string): string {
    const rawValue = row.__raw[field];
    const col = this.allColumns.find((x) => x.field === field);
    if (col?.formatter) {
      return col.formatter(rawValue, row.__raw);
    }
    return rawValue ?? '';
  }

  getColumnHeader(field: string): string {
    return this.allColumns.find((col) => col.field === field)?.header ?? field;
  }

  getColumnGroup(field: string): string {
    return this.availableColumns.find((col) => col.field === field)?.group ?? '';
  }

  trackByRow(_: number, row: GridRow): number {
    return row.__rowId;
  }

  trackByField(_: number, field: string): string {
    return field;
  }

  trackByAction(_: number, action: BrGridAction): string {
    return action.id;
  }

  setPageSize(value: number): void {
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

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage += 1;
      this.applyView();
      this.emitAction({ source: 'page-change', actionId: 'page-change', page: this.currentPage, pageSize: this.pageSize });
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage -= 1;
      this.applyView();
      this.emitAction({ source: 'page-change', actionId: 'page-change', page: this.currentPage, pageSize: this.pageSize });
    }
  }

  firstPage(): void {
    if (this.currentPage !== 1) {
      this.currentPage = 1;
      this.applyView();
      this.emitAction({ source: 'page-change', actionId: 'page-change', page: this.currentPage, pageSize: this.pageSize });
    }
  }

  lastPage(): void {
    if (this.currentPage !== this.totalPages) {
      this.currentPage = this.totalPages;
      this.applyView();
      this.emitAction({ source: 'page-change', actionId: 'page-change', page: this.currentPage, pageSize: this.pageSize });
    }
  }

  onToolbarPrimaryClick(): void {
    this.emitAction({ source: 'toolbar-primary', actionId: 'toolbar-primary', label: this.config.toolbar.primaryActionLabel });
  }

  onToolbarPrimaryMenuAction(action: BrGridAction): void {
    this.showPrimaryActionMenu = false;
    this.emitAction({ source: 'toolbar-primary-menu', actionId: action.id, label: action.label });
  }

  onSelectionActionClick(action: BrGridAction): void {
    this.emitAction({
      source: 'selection-action',
      actionId: action.id,
      label: action.label,
      selectedRows: this.getSelectedRows(),
    });
  }

  onContextActionClick(action: BrGridAction): void {
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

  saveColumns(): void {
    this.showColumnsPanel = false;
    this.columnSearch = '';
    this.emitAction({
      source: 'columns-save',
      actionId: 'columns-save',
      visibleColumns: [...this.visibleColumnFields],
    });
  }

  private emitSelectionChange(): void {
    this.emitAction({
      source: 'selection-change',
      actionId: 'selection-change',
      selectedRows: this.getSelectedRows(),
    });
  }

  private getSelectedRows(): any[] {
    return this.rows.filter((row) => this.selectedRowIds.has(row.__rowId)).map((row) => row.__raw);
  }

  private emitAction(event: BrGridActionEvent): void {
    this.action.emit(event);
  }

  private seedSortCriteria(seed: BrGridSortRule[]): BrGridSortRule[] {
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

  private seedFilterCriteria(seed: BrGridFilterRule[]): BrGridFilterRule[] {
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

  private applyView(): void {
    let working = [...this.rows];

    const searchText = this.searchTerm.trim().toLowerCase();
    if (searchText) {
      const fields = this.activeColumns.map((col) => col.field);
      working = working.filter((row) =>
        fields.some((field) => String(row.__raw[field] ?? '').toLowerCase().includes(searchText))
      );
    }

    const activeFilters = this.filterCriteria.filter((criterion) => criterion.field && criterion.value.trim());
    if (activeFilters.length > 0 && this.config.features.enableFiltering) {
      working = working.filter((row) =>
        activeFilters.every((criterion) => {
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
        })
      );
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
    } else {
      this.totalPages = 1;
      this.currentPage = 1;
      this.pageRows = working;
    }
  }
}
