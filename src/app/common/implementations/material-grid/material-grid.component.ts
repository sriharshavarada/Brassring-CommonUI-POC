/**
 * ============================================================
 * MATERIAL GRID IMPLEMENTATION
 * ============================================================
 * Uses Angular Material's mat-table with MatSort and MatPaginator.
 * This component is ONLY loaded when UI_MODE === 'MATERIAL'.
 * ============================================================
 */

import {
    Component, Input, OnChanges, SimpleChanges,
    ViewChild, AfterViewInit
} from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';

import { MaterialGridInput } from '../../adapters/grid.adapter';
import { BrGridColumn } from '../../models/grid-config.model';

@Component({
    selector: 'br-material-grid',
    standalone: true,
    imports: [
        CommonModule,
        MatTableModule,
        MatSortModule,
        MatPaginatorModule,
    ],
    templateUrl: './material-grid.component.html',
    styleUrls: ['./material-grid.component.scss'],
})
export class MaterialGridComponent implements OnChanges, AfterViewInit {
    @Input() config!: MaterialGridInput;

    @ViewChild(MatSort) sort!: MatSort;
    @ViewChild(MatPaginator) paginator!: MatPaginator;

    dataSource = new MatTableDataSource<any>([]);
    displayedColumns: string[] = [];
    columns: BrGridColumn[] = [];

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['config'] && this.config) {
            this.columns = this.config.columns;
            this.displayedColumns = this.config.displayedColumns;
            this.dataSource.data = this.config.data;

            // Re-attach sort/paginator if already initialized
            if (this.sort) this.dataSource.sort = this.sort;
            if (this.paginator) this.dataSource.paginator = this.paginator;
        }
    }

    ngAfterViewInit(): void {
        if (this.config?.sorting && this.sort) {
            this.dataSource.sort = this.sort;
        }
        if (this.config?.pagination && this.paginator) {
            this.dataSource.paginator = this.paginator;
        }
    }
}
