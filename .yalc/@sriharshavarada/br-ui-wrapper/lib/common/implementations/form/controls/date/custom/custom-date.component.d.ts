/**
 * ============================================================
 * CUSTOM DATE IMPLEMENTATION
 * ============================================================
 * Custom-rendered date picker (no native input calendar) so we can
 * fully control first day of week and disabled weekdays.
 * ============================================================
 */
import { ElementRef, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CustomDateInput } from '../../../../../adapters/date.adapter';
import * as i0 from "@angular/core";
interface CalendarCell {
    date: Date;
    day: number;
    inMonth: boolean;
    disabled: boolean;
    selected: boolean;
    today: boolean;
}
export declare class CustomDateComponent implements OnChanges {
    private readonly host;
    config: CustomDateInput;
    showLibraryTag: boolean;
    dateChange: EventEmitter<string>;
    blurEvent: EventEmitter<FocusEvent>;
    focusEvent: EventEmitter<FocusEvent>;
    inputEvent: EventEmitter<Event>;
    changeEvent: EventEmitter<Event>;
    keydownEvent: EventEmitter<KeyboardEvent>;
    keyupEvent: EventEmitter<KeyboardEvent>;
    clickEvent: EventEmitter<MouseEvent>;
    isOpen: boolean;
    visibleMonth: Date;
    selectedDate: Date | null;
    dayHeaders: string[];
    calendarWeeks: CalendarCell[][];
    monthModel: string;
    yearModel: string;
    constructor(host: ElementRef<HTMLElement>);
    ngOnChanges(changes: SimpleChanges): void;
    get wrapperClasses(): string[];
    get wrapperStyles(): Record<string, string>;
    get displayValue(): string;
    get monthLabel(): string;
    get monthOptions(): Array<{
        value: number;
        label: string;
    }>;
    get yearOptions(): number[];
    openCalendar(event?: Event): void;
    toggleCalendar(event: Event): void;
    closeCalendar(): void;
    goToPreviousMonth(event: Event): void;
    goToNextMonth(event: Event): void;
    onMonthModelChange(value: string): void;
    onYearModelChange(value: string): void;
    onCellClick(cell: CalendarCell, event: Event): void;
    trackByWeek(index: number): number;
    trackByCell(_: number, cell: CalendarCell): string;
    onDocumentClick(event: MouseEvent): void;
    onEscape(): void;
    private rebuildCalendar;
    private isDateDisabled;
    private parseDate;
    private tryParseByFormat;
    private toIsoDate;
    private formatDate;
    private startOfDay;
    private isSameDay;
    private normalizeFirstDayOfWeek;
    private get locale();
    private getOrderedDayHeaders;
    static ɵfac: i0.ɵɵFactoryDeclaration<CustomDateComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CustomDateComponent, "br-custom-date", never, { "config": { "alias": "config"; "required": false; }; "showLibraryTag": { "alias": "showLibraryTag"; "required": false; }; }, { "dateChange": "dateChange"; "blurEvent": "blurEvent"; "focusEvent": "focusEvent"; "inputEvent": "inputEvent"; "changeEvent": "changeEvent"; "keydownEvent": "keydownEvent"; "keyupEvent": "keyupEvent"; "clickEvent": "clickEvent"; }, never, never, true, never>;
}
export {};
