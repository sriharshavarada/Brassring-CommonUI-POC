/**
 * ============================================================
 * CUSTOM MODAL IMPLEMENTATION
 * ============================================================
 * A native HTML/CSS based modal.
 * No external library dependency.
 * ============================================================
 */
import { EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CustomModalInput } from '../../../adapters/modal.adapter';
import { BrModalActionEvent } from '../../../models/modal-config.model';
import * as i0 from "@angular/core";
export declare class CustomModalComponent implements OnChanges {
    config: CustomModalInput;
    action: EventEmitter<BrModalActionEvent>;
    close: EventEmitter<void>;
    /** Local state for form field values */
    fieldValues: Record<string, any>;
    ngOnChanges(changes: SimpleChanges): void;
    get overlayClasses(): string[];
    get modalClasses(): string[];
    get overlayStyles(): Record<string, string>;
    onActionClick(actionId: string, label: string): void;
    onBackdropClick(): void;
    onCloseClick(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<CustomModalComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CustomModalComponent, "br-custom-modal", never, { "config": { "alias": "config"; "required": false; }; }, { "action": "action"; "close": "close"; }, never, never, true, never>;
}
