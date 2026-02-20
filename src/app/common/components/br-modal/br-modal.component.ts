/**
 * ============================================================
 * BR-MODAL — THE FAÇADE WRAPPER COMPONENT
 * ============================================================
 *
 * This is the ONLY modal component that consuming screens use.
 * Internally it:
 *   1. Reads UI_MODE from the config
 *   2. Uses the ModalAdapter to transform the generic config
 *   3. Renders the correct implementation component
 *
 * Consumer screens NEVER import CustomModal or MaterialModal
 * directly — they only use <br-modal [config]="modalConfig">.
 * ============================================================
 */

import {
    Component, Input, Output, EventEmitter,
    OnChanges, SimpleChanges
} from '@angular/core';
import { CommonModule } from '@angular/common';

import { UI_MODE_BY_CONTROL } from '../../config/ui-mode.config';
import { BrModalConfig, BrModalActionEvent } from '../../models/modal-config.model';
import { ModalAdapter as BrModalAdapter, CustomModalInput, MaterialModalInput } from '../../adapters/modal.adapter';

// Implementation components
import { CustomModalComponent } from '../../implementations/custom-modal/custom-modal.component';
import { MaterialModalComponent } from '../../implementations/material-modal/material-modal.component';

@Component({
    selector: 'br-modal',
    standalone: true,
    imports: [CommonModule, CustomModalComponent, MaterialModalComponent],
    templateUrl: './br-modal.component.html',
    styleUrls: ['./br-modal.component.scss'],
})
export class BrModalComponent implements OnChanges {
    /**
     * The ONLY input — a library-agnostic JSON config.
     */
    @Input() config!: BrModalConfig;

    /**
     * Emits when an action button is clicked.
     */
    @Output() action = new EventEmitter<BrModalActionEvent>();

    /**
     * Emits when the modal is closed (via backdrop or close button).
     */
    @Output() close = new EventEmitter<void>();

    /** Resolved from the central config */
    uiMode = (UI_MODE_BY_CONTROL as any).modal || 'CUSTOM';

    /** Adapted configs for each implementation */
    customConfig!: CustomModalInput;
    materialConfig!: MaterialModalInput;

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['config'] && this.config) {
            if (this.uiMode === 'CUSTOM') {
                this.customConfig = BrModalAdapter.toCustom(this.config);
            } else {
                this.materialConfig = BrModalAdapter.toMaterial(this.config);
            }
        }
    }

    onModalAction(event: BrModalActionEvent): void {
        this.action.emit(event);
    }

    onModalClose(): void {
        this.close.emit();
    }
}
