/**
 * ============================================================
 * CUSTOM MODAL IMPLEMENTATION
 * ============================================================
 * A native HTML/CSS based modal.
 * No external library dependency.
 * ============================================================
 */

import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CustomModalInput } from '../../../adapters/modal.adapter';
import { BrModalActionEvent } from '../../../models/modal-config.model';

@Component({
    selector: 'br-custom-modal',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './custom-modal.component.html',
    styleUrls: ['./custom-modal.component.scss'],
})
export class CustomModalComponent implements OnChanges {
    @Input() config!: CustomModalInput;
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
        const classes = [];
        if (this.config.uiConfig.className) {
            classes.push(this.config.uiConfig.className);
        }
        return classes;
    }

    get modalClasses(): string[] {
        return [
            `size-${this.config.uiConfig.size}`
        ];
    }

    get overlayStyles(): Record<string, string> {
        const styles: Record<string, string> = {};
        Object.entries(this.config.uiConfig.tokens || {}).forEach(([key, value]) => {
            styles[`--modal-${key}`] = String(value);
        });
        return styles;
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
