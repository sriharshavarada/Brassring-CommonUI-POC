/**
 * ============================================================
 * MATERIAL DATE IMPLEMENTATION
 * ============================================================
 * Uses Angular Material's mat-datepicker with mat-form-field.
 * Only loaded when UI_MODE === 'MATERIAL'.
 * ============================================================
 */

import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DateAdapter, MatNativeDateModule, NativeDateAdapter } from '@angular/material/core';

import { MaterialDateInput } from '../../../../../adapters/date.adapter';
import { MaterialDateCalendarHeaderComponent } from './material-date-calendar-header.component';

class DynamicFirstDayNativeDateAdapter extends NativeDateAdapter {
    private firstDayOfWeek = 0;
    private dateFormat = 'yyyy-MM-dd';

    override getFirstDayOfWeek(): number {
        return this.firstDayOfWeek;
    }

    setFirstDayOfWeek(day: number): void {
        this.firstDayOfWeek = Number.isInteger(day) ? Math.min(Math.max(day, 0), 6) : 0;
    }

    setDateFormat(format: string): void {
        this.dateFormat = (format || 'yyyy-MM-dd').trim();
    }

    override format(date: Date): string {
        if (!this.isValid(date)) return '';

        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const mm = String(month).padStart(2, '0');
        const dd = String(day).padStart(2, '0');
        const yy = String(year).slice(-2);

        const fmt = this.dateFormat.toLowerCase();
        if (fmt === 'mm/dd/yyyy') return `${mm}/${dd}/${year}`;
        if (fmt === 'm/d/yyyy') return `${month}/${day}/${year}`;
        if (fmt === 'mm-dd-yyyy') return `${mm}-${dd}-${year}`;
        if (fmt === 'm-d-yyyy') return `${month}-${day}-${year}`;
        if (fmt === 'dd/mm/yyyy') return `${dd}/${mm}/${year}`;
        if (fmt === 'd/m/yyyy') return `${day}/${month}/${year}`;
        if (fmt === 'dd-mm-yyyy') return `${dd}-${mm}-${year}`;
        if (fmt === 'd-m-yyyy') return `${day}-${month}-${year}`;
        if (fmt === 'm/d/yy') return `${month}/${day}/${yy}`;
        if (fmt === 'mm/dd/yy') return `${mm}/${dd}/${yy}`;
        if (fmt === 'm-d-yy') return `${month}-${day}-${yy}`;
        if (fmt === 'mm-dd-yy') return `${mm}-${dd}-${yy}`;
        if (fmt === 'd/m/yy') return `${day}/${month}/${yy}`;
        if (fmt === 'dd/mm/yy') return `${dd}/${mm}/${yy}`;
        if (fmt === 'd-m-yy') return `${day}-${month}-${yy}`;
        if (fmt === 'dd-mm-yy') return `${dd}-${mm}-${yy}`;
        return `${year}-${mm}-${dd}`;
    }

    override parse(value: unknown): Date | null {
        if (value instanceof Date) return this.isValid(value) ? value : null;
        if (typeof value !== 'string') return null;

        const text = value.trim();
        if (!text) return null;

        const buildDate = (year: number, month: number, day: number): Date | null => {
            const monthIndex = month - 1;
            const parsed = new Date(year, monthIndex, day);
            if (parsed.getFullYear() !== year || parsed.getMonth() !== monthIndex || parsed.getDate() !== day) return null;
            return parsed;
        };

        const fmt = this.dateFormat.toLowerCase();
        let match: RegExpMatchArray | null = null;

        if (fmt === 'yyyy-mm-dd') {
            match = text.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
            if (match) return buildDate(Number(match[1]), Number(match[2]), Number(match[3]));
        }
        if (fmt === 'mm/dd/yyyy' || fmt === 'm/d/yyyy') {
            match = text.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
            if (match) return buildDate(Number(match[3]), Number(match[1]), Number(match[2]));
        }
        if (fmt === 'mm-dd-yyyy' || fmt === 'm-d-yyyy') {
            match = text.match(/^(\d{1,2})-(\d{1,2})-(\d{4})$/);
            if (match) return buildDate(Number(match[3]), Number(match[1]), Number(match[2]));
        }
        if (fmt === 'dd/mm/yyyy' || fmt === 'd/m/yyyy') {
            match = text.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
            if (match) return buildDate(Number(match[3]), Number(match[2]), Number(match[1]));
        }
        if (fmt === 'dd-mm-yyyy' || fmt === 'd-m-yyyy') {
            match = text.match(/^(\d{1,2})-(\d{1,2})-(\d{4})$/);
            if (match) return buildDate(Number(match[3]), Number(match[2]), Number(match[1]));
        }
        if (fmt === 'm/d/yy' || fmt === 'mm/dd/yy') {
            match = text.match(/^(\d{1,2})\/(\d{1,2})\/(\d{2})$/);
            if (match) return buildDate(2000 + Number(match[3]), Number(match[1]), Number(match[2]));
        }
        if (fmt === 'm-d-yy' || fmt === 'mm-dd-yy') {
            match = text.match(/^(\d{1,2})-(\d{1,2})-(\d{2})$/);
            if (match) return buildDate(2000 + Number(match[3]), Number(match[1]), Number(match[2]));
        }
        if (fmt === 'd/m/yy' || fmt === 'dd/mm/yy') {
            match = text.match(/^(\d{1,2})\/(\d{1,2})\/(\d{2})$/);
            if (match) return buildDate(2000 + Number(match[3]), Number(match[2]), Number(match[1]));
        }
        if (fmt === 'd-m-yy' || fmt === 'dd-mm-yy') {
            match = text.match(/^(\d{1,2})-(\d{1,2})-(\d{2})$/);
            if (match) return buildDate(2000 + Number(match[3]), Number(match[2]), Number(match[1]));
        }

        const fallback = new Date(text);
        return this.isValid(fallback) ? fallback : null;
    }
}

@Component({
    selector: 'br-material-date',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatDatepickerModule,
        MatNativeDateModule,
    ],
    providers: [{ provide: DateAdapter, useClass: DynamicFirstDayNativeDateAdapter }],
    templateUrl: './material-date.component.html',
    styleUrls: ['./material-date.component.scss'],
})
export class MaterialDateComponent implements OnChanges {
    @Input() config!: MaterialDateInput;
    @Output() dateChange = new EventEmitter<Date | null>();
    readonly calendarHeader = MaterialDateCalendarHeaderComponent;

    constructor(private readonly dateAdapter: DateAdapter<Date>) { }

    ngOnChanges(changes: SimpleChanges): void {
        if (!changes['config'] || !this.config) return;
        const adapter = this.dateAdapter as unknown as DynamicFirstDayNativeDateAdapter;
        adapter.setLocale(this.config.locale || 'en-US');
        adapter.setFirstDayOfWeek(this.config.firstDayOfWeek ?? 0);
        adapter.setDateFormat(this.config.dateFormat || 'yyyy-MM-dd');
    }

    readonly dateFilter = (date: Date | null): boolean => {
        if (!date) return true;
        if (this.config?.disabledDaysOfWeek?.includes(date.getDay())) return false;
        return true;
    };

    get wrapperClasses(): string[] {
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

    get wrapperStyles(): Record<string, string> {
        const styles: Record<string, string> = {};
        Object.entries(this.config.uiConfig.tokens || {}).forEach(([key, value]) => {
            styles[`--date-${key}`] = String(value);
        });
        return styles;
    }

    get appearance(): 'outline' | 'fill' {
        return this.config.uiConfig.variant === 'filled' ? 'fill' : 'outline';
    }

    get startAt(): Date {
        return this.config?.value ?? new Date();
    }

    onDateChange(value: Date | null): void {
        if (value && this.config?.disabledDaysOfWeek?.includes(value.getDay())) {
            this.dateChange.emit(null);
            return;
        }
        this.dateChange.emit(value);
    }
}
