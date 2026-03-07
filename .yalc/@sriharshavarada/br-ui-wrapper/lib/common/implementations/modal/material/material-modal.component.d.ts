/**
 * ============================================================
 * MATERIAL MODAL IMPLEMENTATION
 * ============================================================
 * Uses Angular Material's Dialog components for styling.
 * ============================================================
 */
import { EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { MaterialModalInput } from '../../../adapters/modal.adapter';
import { BrModalActionEvent } from '../../../models/modal-config.model';
import * as i0 from "@angular/core";
export declare class MaterialModalComponent implements OnChanges {
    config: MaterialModalInput;
    action: EventEmitter<BrModalActionEvent>;
    close: EventEmitter<void>;
    /** Local state for form field values */
    fieldValues: Record<string, any>;
    ngOnChanges(changes: SimpleChanges): void;
    get overlayClasses(): string[];
    get modalClasses(): string[];
    onActionClick(actionId: string, label: string): void;
    onBackdropClick(): void;
    onCloseClick(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<MaterialModalComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MaterialModalComponent, "br-material-modal", never, { "config": { "alias": "config"; "required": false; }; }, { "action": "action"; "close": "close"; }, never, never, true, never>;
}
