import { EventEmitter } from '@angular/core';
import { MaterialCheckboxInput } from '../../../../../adapters/checkbox.adapter';
import * as i0 from "@angular/core";
export declare class MaterialCheckboxControlComponent {
    config: MaterialCheckboxInput;
    showLibraryTag: boolean;
    valueChange: EventEmitter<boolean>;
    blurEvent: EventEmitter<FocusEvent>;
    focusEvent: EventEmitter<FocusEvent>;
    inputEvent: EventEmitter<Event>;
    changeEvent: EventEmitter<any>;
    keydownEvent: EventEmitter<KeyboardEvent>;
    keyupEvent: EventEmitter<KeyboardEvent>;
    clickEvent: EventEmitter<MouseEvent>;
    static ɵfac: i0.ɵɵFactoryDeclaration<MaterialCheckboxControlComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MaterialCheckboxControlComponent, "br-material-checkbox-control", never, { "config": { "alias": "config"; "required": false; }; "showLibraryTag": { "alias": "showLibraryTag"; "required": false; }; }, { "valueChange": "valueChange"; "blurEvent": "blurEvent"; "focusEvent": "focusEvent"; "inputEvent": "inputEvent"; "changeEvent": "changeEvent"; "keydownEvent": "keydownEvent"; "keyupEvent": "keyupEvent"; "clickEvent": "clickEvent"; }, never, never, true, never>;
}
