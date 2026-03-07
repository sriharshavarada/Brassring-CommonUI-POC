import { EventEmitter } from '@angular/core';
import { CustomCheckboxInput } from '../../../../../adapters/checkbox.adapter';
import * as i0 from "@angular/core";
export declare class CustomCheckboxControlComponent {
    config: CustomCheckboxInput;
    showLibraryTag: boolean;
    valueChange: EventEmitter<boolean>;
    blurEvent: EventEmitter<FocusEvent>;
    focusEvent: EventEmitter<FocusEvent>;
    inputEvent: EventEmitter<Event>;
    changeEvent: EventEmitter<Event>;
    keydownEvent: EventEmitter<KeyboardEvent>;
    keyupEvent: EventEmitter<KeyboardEvent>;
    clickEvent: EventEmitter<MouseEvent>;
    static ɵfac: i0.ɵɵFactoryDeclaration<CustomCheckboxControlComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CustomCheckboxControlComponent, "br-custom-checkbox-control", never, { "config": { "alias": "config"; "required": false; }; "showLibraryTag": { "alias": "showLibraryTag"; "required": false; }; }, { "valueChange": "valueChange"; "blurEvent": "blurEvent"; "focusEvent": "focusEvent"; "inputEvent": "inputEvent"; "changeEvent": "changeEvent"; "keydownEvent": "keydownEvent"; "keyupEvent": "keyupEvent"; "clickEvent": "clickEvent"; }, never, never, true, never>;
}
