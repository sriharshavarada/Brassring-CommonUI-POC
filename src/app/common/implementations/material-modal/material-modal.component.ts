/**
 * ============================================================
 * MATERIAL MODAL IMPLEMENTATION
 * ============================================================
 * Uses Angular Material's Dialog components for styling.
 * ============================================================
 */

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MaterialModalInput } from '../../adapters/modal.adapter';
import { BrModalActionEvent } from '../../models/modal-config.model';

@Component({
    selector: 'br-material-modal',
    standalone: true,
    imports: [
        CommonModule,
        MatDialogModule,
        MatButtonModule,
        MatIconModule
    ],
    templateUrl: './material-modal.component.html',
    styleUrls: ['./material-modal.component.scss'],
})
export class MaterialModalComponent {
    @Input() config!: MaterialModalInput;
    @Output() action = new EventEmitter<BrModalActionEvent>();
    @Output() close = new EventEmitter<void>();

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
        this.action.emit({ actionId, label });
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
