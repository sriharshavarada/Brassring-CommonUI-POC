/**
 * ============================================================
 * CUSTOM DATE IMPLEMENTATION
 * ============================================================
 * A native HTML <input type="date"> based date picker.
 * No external library dependency.
 * ============================================================
 */

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CustomDateInput } from '../../adapters/date.adapter';

@Component({
    selector: 'br-custom-date',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './custom-date.component.html',
    styleUrls: ['./custom-date.component.scss'],
})
export class CustomDateComponent {
    @Input() config!: CustomDateInput;
    @Output() dateChange = new EventEmitter<string>();

    onDateChange(value: string): void {
        this.dateChange.emit(value);
    }
}
