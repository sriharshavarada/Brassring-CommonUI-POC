/**
 * ============================================================
 * MATERIAL DATE IMPLEMENTATION
 * ============================================================
 * Uses Angular Material's mat-datepicker with mat-form-field.
 * Only loaded when UI_MODE === 'MATERIAL'.
 * ============================================================
 */
import { EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { DateAdapter } from '@angular/material/core';
import { MaterialDateInput } from '../../../../../adapters/date.adapter';
import { MaterialDateCalendarHeaderComponent } from './material-date-calendar-header.component';
import * as i0 from "@angular/core";
export declare class MaterialDateComponent implements OnChanges {
    private readonly dateAdapter;
    config: MaterialDateInput;
    showLibraryTag: boolean;
    dateChange: EventEmitter<Date | null>;
    blurEvent: EventEmitter<FocusEvent>;
    focusEvent: EventEmitter<FocusEvent>;
    inputEvent: EventEmitter<Event>;
    changeEvent: EventEmitter<Event>;
    keydownEvent: EventEmitter<KeyboardEvent>;
    keyupEvent: EventEmitter<KeyboardEvent>;
    clickEvent: EventEmitter<MouseEvent>;
    readonly calendarHeader: typeof MaterialDateCalendarHeaderComponent;
    constructor(dateAdapter: DateAdapter<Date>);
    ngOnChanges(changes: SimpleChanges): void;
    readonly dateFilter: (date: Date | null) => boolean;
    get wrapperClasses(): string[];
    get wrapperStyles(): Record<string, string>;
    get appearance(): 'outline' | 'fill';
    get startAt(): Date;
    onDateChange(value: Date | null): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<MaterialDateComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MaterialDateComponent, "br-material-date", never, { "config": { "alias": "config"; "required": false; }; "showLibraryTag": { "alias": "showLibraryTag"; "required": false; }; }, { "dateChange": "dateChange"; "blurEvent": "blurEvent"; "focusEvent": "focusEvent"; "inputEvent": "inputEvent"; "changeEvent": "changeEvent"; "keydownEvent": "keydownEvent"; "keyupEvent": "keyupEvent"; "clickEvent": "clickEvent"; }, never, never, true, never>;
}
