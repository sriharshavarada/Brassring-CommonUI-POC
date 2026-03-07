import { EventEmitter } from '@angular/core';
import { CustomRadioInput } from '../../../../../adapters/radio.adapter';
import * as i0 from "@angular/core";
export declare class CustomRadioControlComponent {
    config: CustomRadioInput;
    showLibraryTag: boolean;
    valueChange: EventEmitter<any>;
    blurEvent: EventEmitter<FocusEvent>;
    focusEvent: EventEmitter<FocusEvent>;
    inputEvent: EventEmitter<Event>;
    changeEvent: EventEmitter<Event>;
    keydownEvent: EventEmitter<KeyboardEvent>;
    keyupEvent: EventEmitter<KeyboardEvent>;
    clickEvent: EventEmitter<MouseEvent>;
    static ɵfac: i0.ɵɵFactoryDeclaration<CustomRadioControlComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CustomRadioControlComponent, "br-custom-radio-control", never, { "config": { "alias": "config"; "required": false; }; "showLibraryTag": { "alias": "showLibraryTag"; "required": false; }; }, { "valueChange": "valueChange"; "blurEvent": "blurEvent"; "focusEvent": "focusEvent"; "inputEvent": "inputEvent"; "changeEvent": "changeEvent"; "keydownEvent": "keydownEvent"; "keyupEvent": "keyupEvent"; "clickEvent": "clickEvent"; }, never, never, true, never>;
}
