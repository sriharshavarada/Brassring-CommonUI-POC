import { EventEmitter } from '@angular/core';
import { MaterialRadioInput } from '../../../../../adapters/radio.adapter';
import * as i0 from "@angular/core";
export declare class MaterialRadioControlComponent {
    config: MaterialRadioInput;
    showLibraryTag: boolean;
    valueChange: EventEmitter<any>;
    blurEvent: EventEmitter<FocusEvent>;
    focusEvent: EventEmitter<FocusEvent>;
    inputEvent: EventEmitter<Event>;
    changeEvent: EventEmitter<any>;
    keydownEvent: EventEmitter<KeyboardEvent>;
    keyupEvent: EventEmitter<KeyboardEvent>;
    clickEvent: EventEmitter<MouseEvent>;
    static ɵfac: i0.ɵɵFactoryDeclaration<MaterialRadioControlComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MaterialRadioControlComponent, "br-material-radio-control", never, { "config": { "alias": "config"; "required": false; }; "showLibraryTag": { "alias": "showLibraryTag"; "required": false; }; }, { "valueChange": "valueChange"; "blurEvent": "blurEvent"; "focusEvent": "focusEvent"; "inputEvent": "inputEvent"; "changeEvent": "changeEvent"; "keydownEvent": "keydownEvent"; "keyupEvent": "keyupEvent"; "clickEvent": "clickEvent"; }, never, never, true, never>;
}
