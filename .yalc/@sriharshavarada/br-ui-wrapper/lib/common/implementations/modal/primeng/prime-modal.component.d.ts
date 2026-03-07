import { EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { PrimeModalInput } from '../../../adapters/modal.adapter';
import { BrModalActionEvent } from '../../../models/modal-config.model';
import * as i0 from "@angular/core";
export declare class PrimeModalComponent implements OnChanges {
    config: PrimeModalInput;
    action: EventEmitter<BrModalActionEvent>;
    close: EventEmitter<void>;
    fieldValues: Record<string, any>;
    filteredOptionsMap: Record<string, any[]>;
    getAutocompleteValue(field: any): any;
    onAutocompleteChange(event: any, fieldId: string): void;
    onAutocompleteClear(fieldId: string): void;
    filterAutocomplete(event: any, field: any): void;
    ngOnChanges(changes: SimpleChanges): void;
    getSizeStyle(): string;
    getSeverity(type?: string): 'success' | 'info' | 'warn' | 'danger' | 'help' | 'primary' | 'secondary' | 'contrast' | null | undefined;
    onActionClick(actionId: string, label: string): void;
    onCloseClick(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<PrimeModalComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<PrimeModalComponent, "br-prime-modal", never, { "config": { "alias": "config"; "required": false; }; }, { "action": "action"; "close": "close"; }, never, never, true, never>;
}
