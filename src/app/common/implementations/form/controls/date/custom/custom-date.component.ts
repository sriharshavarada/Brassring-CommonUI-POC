/**
 * ============================================================
 * CUSTOM DATE IMPLEMENTATION
 * ============================================================
 * Custom-rendered date picker (no native input calendar) so we can
 * fully control first day of week and disabled weekdays.
 * ============================================================
 */

import {
    Component,
    ElementRef,
    EventEmitter,
    HostListener,
    Input,
    OnChanges,
    Output,
    SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CustomDateInput } from '../../../../../adapters/date.adapter';

interface CalendarCell {
    date: Date;
    day: number;
    inMonth: boolean;
    disabled: boolean;
    selected: boolean;
    today: boolean;
}

@Component({
    selector: 'br-custom-date',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './custom-date.component.html',
    styleUrls: ['./custom-date.component.scss'],
})
export class CustomDateComponent implements OnChanges {
    @Input() config!: CustomDateInput;
    @Output() dateChange = new EventEmitter<string>();

    isOpen = false;
    visibleMonth = new Date();
    selectedDate: Date | null = null;

    dayHeaders: string[] = [];
    calendarWeeks: CalendarCell[][] = [];
    monthModel = '0';
    yearModel = '';

    constructor(private readonly host: ElementRef<HTMLElement>) { }

    ngOnChanges(changes: SimpleChanges): void {
        if (!changes['config'] || !this.config) return;

        this.selectedDate = this.parseDate(this.config.value);

        const base = this.selectedDate ?? new Date();

        this.visibleMonth = new Date(base.getFullYear(), base.getMonth(), 1);
        this.dayHeaders = this.getOrderedDayHeaders();
        this.rebuildCalendar();
    }

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

    get displayValue(): string {
        return this.selectedDate ? this.formatDate(this.selectedDate, this.config.dateFormat) : '';
    }

    get monthLabel(): string {
        return this.visibleMonth.toLocaleDateString(this.locale, {
            month: 'long',
            year: 'numeric',
        });
    }

    get monthOptions(): Array<{ value: number; label: string }> {
        return Array.from({ length: 12 }, (_, value) => ({
            value,
            label: new Date(2024, value, 1).toLocaleDateString(this.locale, { month: 'long' }),
        }));
    }

    get yearOptions(): number[] {
        const minDate = this.parseDate(this.config?.minDate);
        const maxDate = this.parseDate(this.config?.maxDate);

        const fallbackStart = this.visibleMonth.getFullYear() - 100;
        const fallbackEnd = this.visibleMonth.getFullYear() + 100;

        const start = minDate ? minDate.getFullYear() : fallbackStart;
        const end = maxDate ? maxDate.getFullYear() : fallbackEnd;

        const safeStart = Math.min(start, end);
        const safeEnd = Math.max(start, end);

        const years: number[] = [];
        for (let year = safeStart; year <= safeEnd; year += 1) {
            years.push(year);
        }
        return years;
    }

    openCalendar(event?: Event): void {
        if (event) event.stopPropagation();
        if (this.config.disabled) return;

        this.isOpen = true;
        this.rebuildCalendar();
    }

    toggleCalendar(event: Event): void {
        event.stopPropagation();
        if (this.config.disabled) return;

        this.isOpen = !this.isOpen;
        if (this.isOpen) {
            this.rebuildCalendar();
        }
    }

    closeCalendar(): void {
        this.isOpen = false;
    }

    goToPreviousMonth(event: Event): void {
        event.stopPropagation();
        this.visibleMonth = new Date(this.visibleMonth.getFullYear(), this.visibleMonth.getMonth() - 1, 1);
        this.rebuildCalendar();
    }

    goToNextMonth(event: Event): void {
        event.stopPropagation();
        this.visibleMonth = new Date(this.visibleMonth.getFullYear(), this.visibleMonth.getMonth() + 1, 1);
        this.rebuildCalendar();
    }

    onMonthModelChange(value: string): void {
        const month = Number(value);
        if (!Number.isInteger(month) || month < 0 || month > 11) return;

        this.visibleMonth = new Date(this.visibleMonth.getFullYear(), month, 1);
        this.rebuildCalendar();
    }

    onYearModelChange(value: string): void {
        const year = Number(value);
        if (!Number.isInteger(year)) return;

        this.visibleMonth = new Date(year, this.visibleMonth.getMonth(), 1);
        this.rebuildCalendar();
    }

    onCellClick(cell: CalendarCell, event: Event): void {
        event.stopPropagation();
        if (cell.disabled) return;

        this.selectedDate = new Date(cell.date.getFullYear(), cell.date.getMonth(), cell.date.getDate());
        this.dateChange.emit(this.toIsoDate(this.selectedDate));
        this.isOpen = false;
        this.rebuildCalendar();
    }

    trackByWeek(index: number): number {
        return index;
    }

    trackByCell(_: number, cell: CalendarCell): string {
        return `${cell.date.getFullYear()}-${cell.date.getMonth()}-${cell.date.getDate()}`;
    }

    @HostListener('document:click', ['$event'])
    onDocumentClick(event: MouseEvent): void {
        if (!this.isOpen) return;
        const target = event.target as Node | null;
        if (!target) return;
        if (!this.host.nativeElement.contains(target)) {
            this.closeCalendar();
        }
    }

    @HostListener('keydown.escape')
    onEscape(): void {
        this.closeCalendar();
    }

    private rebuildCalendar(): void {
        const firstDayOfWeek = this.normalizeFirstDayOfWeek(this.config.firstDayOfWeek);
        const monthStart = new Date(this.visibleMonth.getFullYear(), this.visibleMonth.getMonth(), 1);
        const offset = (monthStart.getDay() - firstDayOfWeek + 7) % 7;
        const calendarStart = new Date(monthStart);
        calendarStart.setDate(calendarStart.getDate() - offset);

        const cells: CalendarCell[] = [];
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

    private isDateDisabled(date: Date): boolean {
        const normalized = this.startOfDay(date);
        const minDate = this.parseDate(this.config.minDate);
        const maxDate = this.parseDate(this.config.maxDate);

        if (minDate && normalized < minDate) return true;
        if (maxDate && normalized > maxDate) return true;
        if (this.config.disabledDaysOfWeek?.includes(normalized.getDay())) return true;

        return false;
    }

    private parseDate(value: string | null | undefined): Date | null {
        if (!value) return null;
        const byFormat = this.tryParseByFormat(value, this.config?.dateFormat);
        if (byFormat) return this.startOfDay(byFormat);

        const localIso = value.trim().match(/^(\d{4})-(\d{2})-(\d{2})$/);
        if (localIso) {
            const year = Number(localIso[1]);
            const monthIndex = Number(localIso[2]) - 1;
            const day = Number(localIso[3]);
            const parsedLocal = new Date(year, monthIndex, day);
            if (
                parsedLocal.getFullYear() === year
                && parsedLocal.getMonth() === monthIndex
                && parsedLocal.getDate() === day
            ) {
                return this.startOfDay(parsedLocal);
            }
        }
        const parsed = new Date(value);
        if (Number.isNaN(parsed.getTime())) return null;
        return this.startOfDay(parsed);
    }

    private tryParseByFormat(value: string, format: string | undefined): Date | null {
        if (!format) return null;
        const normalized = format.toLowerCase();
        const text = value.trim();

        const parseThreePart = (a: number, b: number, c: number, yFirst = false): Date | null => {
            const year = yFirst ? a : (c < 100 ? 2000 + c : c);
            const monthIndex = (yFirst ? b : a) - 1;
            const day = yFirst ? c : b;
            const parsed = new Date(year, monthIndex, day);
            if (parsed.getFullYear() !== year || parsed.getMonth() !== monthIndex || parsed.getDate() !== day) return null;
            return parsed;
        };

        let match: RegExpMatchArray | null = null;
        if (normalized === 'mm/dd/yyyy' || normalized === 'm/d/yyyy') {
            match = text.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
            if (match) return parseThreePart(Number(match[1]), Number(match[2]), Number(match[3]));
        }
        if (normalized === 'mm-dd-yyyy' || normalized === 'm-d-yyyy') {
            match = text.match(/^(\d{1,2})-(\d{1,2})-(\d{4})$/);
            if (match) return parseThreePart(Number(match[1]), Number(match[2]), Number(match[3]));
        }
        if (normalized === 'dd/mm/yyyy' || normalized === 'd/m/yyyy') {
            match = text.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
            if (match) return parseThreePart(Number(match[2]), Number(match[1]), Number(match[3]));
        }
        if (normalized === 'dd-mm-yyyy' || normalized === 'd-m-yyyy') {
            match = text.match(/^(\d{1,2})-(\d{1,2})-(\d{4})$/);
            if (match) return parseThreePart(Number(match[2]), Number(match[1]), Number(match[3]));
        }
        if (normalized === 'm/d/yy' || normalized === 'mm/dd/yy') {
            match = text.match(/^(\d{1,2})\/(\d{1,2})\/(\d{2})$/);
            if (match) return parseThreePart(Number(match[1]), Number(match[2]), Number(match[3]));
        }
        if (normalized === 'm-d-yy' || normalized === 'mm-dd-yy') {
            match = text.match(/^(\d{1,2})-(\d{1,2})-(\d{2})$/);
            if (match) return parseThreePart(Number(match[1]), Number(match[2]), Number(match[3]));
        }
        if (normalized === 'd/m/yy' || normalized === 'dd/mm/yy') {
            match = text.match(/^(\d{1,2})\/(\d{1,2})\/(\d{2})$/);
            if (match) return parseThreePart(Number(match[2]), Number(match[1]), Number(match[3]));
        }
        if (normalized === 'd-m-yy' || normalized === 'dd-mm-yy') {
            match = text.match(/^(\d{1,2})-(\d{1,2})-(\d{2})$/);
            if (match) return parseThreePart(Number(match[2]), Number(match[1]), Number(match[3]));
        }
        if (normalized === 'yyyy-mm-dd') {
            match = text.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
            if (match) return parseThreePart(Number(match[1]), Number(match[2]), Number(match[3]), true);
        }
        return null;
    }

    private toIsoDate(value: Date): string {
        const year = value.getFullYear();
        const month = String(value.getMonth() + 1).padStart(2, '0');
        const day = String(value.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    private formatDate(value: Date, format: string | undefined): string {
        const year = value.getFullYear();
        const month = value.getMonth() + 1;
        const day = value.getDate();
        const mm = String(month).padStart(2, '0');
        const dd = String(day).padStart(2, '0');
        const yy = String(year).slice(-2);

        const normalized = (format || 'yyyy-MM-dd').toLowerCase();
        if (normalized === 'mm/dd/yyyy') return `${mm}/${dd}/${year}`;
        if (normalized === 'm/d/yyyy') return `${month}/${day}/${year}`;
        if (normalized === 'mm-dd-yyyy') return `${mm}-${dd}-${year}`;
        if (normalized === 'm-d-yyyy') return `${month}-${day}-${year}`;
        if (normalized === 'dd/mm/yyyy') return `${dd}/${mm}/${year}`;
        if (normalized === 'd/m/yyyy') return `${day}/${month}/${year}`;
        if (normalized === 'dd-mm-yyyy') return `${dd}-${mm}-${year}`;
        if (normalized === 'd-m-yyyy') return `${day}-${month}-${year}`;
        if (normalized === 'm/d/yy') return `${month}/${day}/${yy}`;
        if (normalized === 'mm/dd/yy') return `${mm}/${dd}/${yy}`;
        if (normalized === 'm-d-yy') return `${month}-${day}-${yy}`;
        if (normalized === 'mm-dd-yy') return `${mm}-${dd}-${yy}`;
        if (normalized === 'd/m/yy') return `${day}/${month}/${yy}`;
        if (normalized === 'dd/mm/yy') return `${dd}/${mm}/${yy}`;
        if (normalized === 'd-m-yy') return `${day}-${month}-${yy}`;
        if (normalized === 'dd-mm-yy') return `${dd}-${mm}-${yy}`;
        return `${year}-${mm}-${dd}`;
    }

    private startOfDay(value: Date): Date {
        const date = new Date(value);
        date.setHours(0, 0, 0, 0);
        return date;
    }

    private isSameDay(a: Date, b: Date): boolean {
        return a.getFullYear() === b.getFullYear()
            && a.getMonth() === b.getMonth()
            && a.getDate() === b.getDate();
    }

    private normalizeFirstDayOfWeek(day: number | null | undefined): number {
        if (!Number.isInteger(day)) return 0;
        return Math.min(Math.max(day as number, 0), 6);
    }

    private get locale(): string {
        return this.config?.locale || 'en-US';
    }

    private getOrderedDayHeaders(): string[] {
        const firstDay = this.normalizeFirstDayOfWeek(this.config?.firstDayOfWeek);
        return Array.from({ length: 7 }, (_, index) => {
            const dayIndex = (firstDay + index) % 7;
            const date = new Date(2024, 0, 7 + dayIndex);
            return date.toLocaleDateString(this.locale, { weekday: 'short' });
        });
    }
}
