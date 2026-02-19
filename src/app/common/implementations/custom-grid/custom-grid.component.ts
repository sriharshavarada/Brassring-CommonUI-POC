/**
 * ============================================================
 * CUSTOM GRID IMPLEMENTATION
 * ============================================================
 * A simple HTML table-based grid with basic sorting & pagination.
 * This is the "custom" implementation that uses NO external library.
 * ============================================================
 */

import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomGridInput } from '../../adapters/grid.adapter';
import { BrGridColumn } from '../../models/grid-config.model';

@Component({
    selector: 'br-custom-grid',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './custom-grid.component.html',
    styleUrls: ['./custom-grid.component.scss'],
})
export class CustomGridComponent implements OnChanges {
    @Input() config!: CustomGridInput;

    displayedData: any[] = [];
    sortField: string = '';
    sortDirection: 'asc' | 'desc' = 'asc';
    currentPage: number = 1;
    totalPages: number = 1;

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['config']) {
            this.applyView();
        }
    }

    /** Apply sorting + pagination to produce displayedData */
    private applyView(): void {
        if (!this.config) return;
        let data = [...this.config.data];

        // Sorting
        if (this.sortField) {
            data.sort((a, b) => {
                const valA = a[this.sortField];
                const valB = b[this.sortField];
                const cmp = valA > valB ? 1 : valA < valB ? -1 : 0;
                return this.sortDirection === 'asc' ? cmp : -cmp;
            });
        }

        // Pagination
        if (this.config.pagination) {
            this.totalPages = Math.ceil(data.length / this.config.pageSize) || 1;
            if (this.currentPage > this.totalPages) this.currentPage = 1;
            const start = (this.currentPage - 1) * this.config.pageSize;
            data = data.slice(start, start + this.config.pageSize);
        } else {
            this.totalPages = 1;
        }

        this.displayedData = data;
    }

    onSort(column: BrGridColumn): void {
        if (!column.sortable || !this.config.sorting) return;
        if (this.sortField === column.field) {
            this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
        } else {
            this.sortField = column.field;
            this.sortDirection = 'asc';
        }
        this.applyView();
    }

    getSortIcon(column: BrGridColumn): string {
        if (this.sortField !== column.field) return '↕';
        return this.sortDirection === 'asc' ? '↑' : '↓';
    }

    getCellValue(row: any, col: BrGridColumn): string {
        if (col.formatter) return col.formatter(row[col.field], row);
        return row[col.field] ?? '';
    }

    prevPage(): void {
        if (this.currentPage > 1) {
            this.currentPage--;
            this.applyView();
        }
    }

    nextPage(): void {
        if (this.currentPage < this.totalPages) {
            this.currentPage++;
            this.applyView();
        }
    }
}
