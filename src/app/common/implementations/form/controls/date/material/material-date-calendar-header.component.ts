import { ChangeDetectionStrategy, Component, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCalendar } from '@angular/material/datepicker';
import { DateAdapter } from '@angular/material/core';
import { Subscription } from 'rxjs';

@Component({
    selector: 'br-material-date-calendar-header',
    standalone: true,
    imports: [CommonModule, FormsModule],
    template: `
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
  `,
    styles: [`
    .calendar-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 6px 8px 4px;
      gap: 8px;
    }
    .month-year-switchers {
      display: flex;
      align-items: center;
      gap: 6px;
      min-width: 0;
      flex: 1;
      justify-content: center;
    }
    .month-select, .year-select {
      border: 1px solid #d6deee;
      border-radius: 8px;
      background: #fff;
      color: #243042;
      font-size: 12px;
      font-weight: 600;
      height: 28px;
      padding: 0 8px;
      max-width: 120px;
    }
    .year-select { max-width: 86px; }
    .nav-btn {
      width: 28px;
      height: 28px;
      border-radius: 8px;
      border: 1px solid #d6deee;
      background: #f8faff;
      cursor: pointer;
      color: #2d3748;
      line-height: 1;
    }
  `],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialDateCalendarHeaderComponent implements OnDestroy {
    private readonly calendar = inject(MatCalendar<Date>);
    private readonly dateAdapter = inject(DateAdapter<Date>);
    private readonly subscription: Subscription;
    monthModel = '0';
    yearModel = '';

    constructor() {
        this.syncModels();
        this.subscription = this.calendar.stateChanges.subscribe(() => this.syncModels());
    }

    get selectedMonth(): number {
        return this.calendar.activeDate.getMonth();
    }

    get selectedYear(): number {
        return this.calendar.activeDate.getFullYear();
    }

    get monthOptions(): Array<{ value: number; label: string }> {
        const names = this.dateAdapter.getMonthNames('long');
        return names.map((label, value) => ({ value, label }));
    }

    get yearOptions(): number[] {
        const minYear = this.calendar.minDate?.getFullYear() ?? (this.selectedYear - 100);
        const maxYear = this.calendar.maxDate?.getFullYear() ?? (this.selectedYear + 100);
        const start = Math.min(minYear, maxYear);
        const end = Math.max(minYear, maxYear);

        const result: number[] = [];
        for (let year = start; year <= end; year += 1) {
            result.push(year);
        }
        return result;
    }

    previousClicked(): void {
        const prev = new Date(this.selectedYear, this.selectedMonth - 1, 1);
        this.setActiveDate(prev);
    }

    nextClicked(): void {
        const next = new Date(this.selectedYear, this.selectedMonth + 1, 1);
        this.setActiveDate(next);
    }

    onMonthModelChange(value: string): void {
        const month = Number(value);
        if (!Number.isInteger(month) || month < 0 || month > 11) return;
        this.setActiveDate(new Date(this.selectedYear, month, 1));
    }

    onYearModelChange(value: string): void {
        const year = Number(value);
        if (!Number.isInteger(year)) return;
        this.setActiveDate(new Date(year, this.selectedMonth, 1));
    }

    private setActiveDate(date: Date): void {
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

    private syncModels(): void {
        this.monthModel = String(this.calendar.activeDate.getMonth());
        this.yearModel = String(this.calendar.activeDate.getFullYear());
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}
