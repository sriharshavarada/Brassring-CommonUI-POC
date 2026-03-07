import { EventEmitter } from '@angular/core';
import { CustomSingleSelectInput } from '../../../../../adapters/single-select.adapter';
import * as i0 from "@angular/core";
export declare class CustomSingleSelectControlComponent {
    config: CustomSingleSelectInput;
    showLibraryTag: boolean;
    valueChange: EventEmitter<any>;
    blurEvent: EventEmitter<FocusEvent>;
    focusEvent: EventEmitter<FocusEvent>;
    inputEvent: EventEmitter<Event>;
    changeEvent: EventEmitter<Event>;
    keydownEvent: EventEmitter<KeyboardEvent>;
    keyupEvent: EventEmitter<KeyboardEvent>;
    clickEvent: EventEmitter<MouseEvent>;
    static ɵfac: i0.ɵɵFactoryDeclaration<CustomSingleSelectControlComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CustomSingleSelectControlComponent, "br-custom-single-select-control", never, { "config": { "alias": "config"; "required": false; }; "showLibraryTag": { "alias": "showLibraryTag"; "required": false; }; }, { "valueChange": "valueChange"; "blurEvent": "blurEvent"; "focusEvent": "focusEvent"; "inputEvent": "inputEvent"; "changeEvent": "changeEvent"; "keydownEvent": "keydownEvent"; "keyupEvent": "keyupEvent"; "clickEvent": "clickEvent"; }, never, never, true, never>;
}
