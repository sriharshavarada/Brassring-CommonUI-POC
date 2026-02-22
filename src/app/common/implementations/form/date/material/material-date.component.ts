/**
 * ============================================================
 * MATERIAL DATE IMPLEMENTATION
 * ============================================================
 * Uses Angular Material's mat-datepicker with mat-form-field.
 * Only loaded when UI_MODE === 'MATERIAL'.
 * ============================================================
 */

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

import { MaterialDateInput } from '../../../../adapters/date.adapter';

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
    templateUrl: './material-date.component.html',
    styleUrls: ['./material-date.component.scss'],
})
export class MaterialDateComponent {
    @Input() config!: MaterialDateInput;
    @Output() dateChange = new EventEmitter<Date | null>();

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

    onDateChange(value: Date | null): void {
        this.dateChange.emit(value);
    }
}
