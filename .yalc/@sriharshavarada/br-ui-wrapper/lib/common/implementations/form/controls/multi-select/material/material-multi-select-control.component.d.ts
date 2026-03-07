import { EventEmitter } from '@angular/core';
import { MaterialMultiSelectInput } from '../../../../../adapters/multi-select.adapter';
import * as i0 from "@angular/core";
export declare class MaterialMultiSelectControlComponent {
    config: MaterialMultiSelectInput;
    showLibraryTag: boolean;
    valueChange: EventEmitter<any[]>;
    blurEvent: EventEmitter<FocusEvent>;
    focusEvent: EventEmitter<FocusEvent>;
    inputEvent: EventEmitter<Event>;
    changeEvent: EventEmitter<any>;
    keydownEvent: EventEmitter<KeyboardEvent>;
    keyupEvent: EventEmitter<KeyboardEvent>;
    clickEvent: EventEmitter<MouseEvent>;
    get selectedValues(): any[];
    get selectedLabels(): string[];
    isSelected(value: any): boolean;
    removeValue(value: any, event?: MouseEvent): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<MaterialMultiSelectControlComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MaterialMultiSelectControlComponent, "br-material-multi-select-control", never, { "config": { "alias": "config"; "required": false; }; "showLibraryTag": { "alias": "showLibraryTag"; "required": false; }; }, { "valueChange": "valueChange"; "blurEvent": "blurEvent"; "focusEvent": "focusEvent"; "inputEvent": "inputEvent"; "changeEvent": "changeEvent"; "keydownEvent": "keydownEvent"; "keyupEvent": "keyupEvent"; "clickEvent": "clickEvent"; }, never, never, true, never>;
}
