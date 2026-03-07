import { ElementRef, EventEmitter } from '@angular/core';
import { CustomMultiSelectInput } from '../../../../../adapters/multi-select.adapter';
import * as i0 from "@angular/core";
export declare class CustomMultiSelectControlComponent {
    private readonly elementRef;
    config: CustomMultiSelectInput;
    showLibraryTag: boolean;
    valueChange: EventEmitter<any[]>;
    blurEvent: EventEmitter<FocusEvent>;
    focusEvent: EventEmitter<FocusEvent>;
    inputEvent: EventEmitter<Event>;
    changeEvent: EventEmitter<Event>;
    keydownEvent: EventEmitter<KeyboardEvent>;
    keyupEvent: EventEmitter<KeyboardEvent>;
    clickEvent: EventEmitter<MouseEvent>;
    panelOpen: boolean;
    constructor(elementRef: ElementRef<HTMLElement>);
    get selectedValues(): any[];
    get selectedLabels(): string[];
    togglePanel(event?: MouseEvent): void;
    toggleValue(value: any, event?: Event): void;
    removeValue(value: any, event?: MouseEvent): void;
    isSelected(value: any): boolean;
    onDocumentClick(event: MouseEvent): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<CustomMultiSelectControlComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CustomMultiSelectControlComponent, "br-custom-multi-select-control", never, { "config": { "alias": "config"; "required": false; }; "showLibraryTag": { "alias": "showLibraryTag"; "required": false; }; }, { "valueChange": "valueChange"; "blurEvent": "blurEvent"; "focusEvent": "focusEvent"; "inputEvent": "inputEvent"; "changeEvent": "changeEvent"; "keydownEvent": "keydownEvent"; "keyupEvent": "keyupEvent"; "clickEvent": "clickEvent"; }, never, never, true, never>;
}
