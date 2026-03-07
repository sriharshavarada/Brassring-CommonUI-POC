import { OnDestroy } from '@angular/core';
import * as i0 from "@angular/core";
export declare class MaterialDateCalendarHeaderComponent implements OnDestroy {
    private readonly calendar;
    private readonly dateAdapter;
    private readonly subscription;
    monthModel: string;
    yearModel: string;
    constructor();
    get selectedMonth(): number;
    get selectedYear(): number;
    get monthOptions(): Array<{
        value: number;
        label: string;
    }>;
    get yearOptions(): number[];
    previousClicked(): void;
    nextClicked(): void;
    onMonthModelChange(value: string): void;
    onYearModelChange(value: string): void;
    private setActiveDate;
    private syncModels;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<MaterialDateCalendarHeaderComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MaterialDateCalendarHeaderComponent, "br-material-date-calendar-header", never, {}, {}, never, never, true, never>;
}
