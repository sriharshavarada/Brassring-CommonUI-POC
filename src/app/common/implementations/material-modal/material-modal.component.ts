/**
 * ============================================================
 * MATERIAL MODAL IMPLEMENTATION
 * ============================================================
 * Uses Angular Material's Dialog components for styling.
 * ============================================================
 */

import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';

import { MaterialModalInput } from '../../adapters/modal.adapter';
import { BrModalActionEvent } from '../../models/modal-config.model';

@Component({
    selector: 'br-material-modal',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        MatDialogModule,
        MatButtonModule,
        MatIconModule,
        MatInputModule,
        MatFormFieldModule,
        MatRadioModule,
        MatCheckboxModule,
        MatSelectModule
    ],
    templateUrl: './material-modal.component.html',
    styleUrls: ['./material-modal.component.scss'],
})
export class MaterialModalComponent implements OnChanges {
    @Input() config!: MaterialModalInput;
    @Output() action = new EventEmitter<BrModalActionEvent>();
    @Output() close = new EventEmitter<void>();

    /** Local state for form field values */
    fieldValues: Record<string, any> = {};

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['config'] && this.config?.fields) {
            // Initialize or update field values from config
            this.config.fields.forEach(field => {
                if (this.fieldValues[field.id] === undefined) {
                    this.fieldValues[field.id] = field.value ?? (field.type === 'checkbox' ? false : '');
                }
            });
        }
    }

    get overlayClasses(): string[] {

        const classes = ['mat-modal-overlay'];
        if (this.config.uiConfig.className) {
            classes.push(this.config.uiConfig.className);
        }
        return classes;
    }

    get modalClasses(): string[] {
        return [
            'mat-modal-container',
            `size-${this.config.uiConfig.size}`
        ];
    }

    onActionClick(actionId: string, label: string): void {
        this.action.emit({
            actionId,
            label,
            fieldValues: { ...this.fieldValues }
        });
    }


    onBackdropClick(): void {
        if (this.config.uiConfig.isDismissible) {
            this.close.emit();
        }
    }

    onCloseClick(): void {
        this.close.emit();
    }
}
