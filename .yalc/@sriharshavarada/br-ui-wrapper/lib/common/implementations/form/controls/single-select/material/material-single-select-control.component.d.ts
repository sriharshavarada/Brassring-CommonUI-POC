import { EventEmitter } from '@angular/core';
import { MaterialSingleSelectInput } from '../../../../../adapters/single-select.adapter';
import * as i0 from "@angular/core";
export declare class MaterialSingleSelectControlComponent {
    config: MaterialSingleSelectInput;
    showLibraryTag: boolean;
    valueChange: EventEmitter<any>;
    blurEvent: EventEmitter<FocusEvent>;
    focusEvent: EventEmitter<FocusEvent>;
    inputEvent: EventEmitter<Event>;
    changeEvent: EventEmitter<any>;
    keydownEvent: EventEmitter<KeyboardEvent>;
    keyupEvent: EventEmitter<KeyboardEvent>;
    clickEvent: EventEmitter<MouseEvent>;
    static ɵfac: i0.ɵɵFactoryDeclaration<MaterialSingleSelectControlComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MaterialSingleSelectControlComponent, "br-material-single-select-control", never, { "config": { "alias": "config"; "required": false; }; "showLibraryTag": { "alias": "showLibraryTag"; "required": false; }; }, { "valueChange": "valueChange"; "blurEvent": "blurEvent"; "focusEvent": "focusEvent"; "inputEvent": "inputEvent"; "changeEvent": "changeEvent"; "keydownEvent": "keydownEvent"; "keyupEvent": "keyupEvent"; "clickEvent": "clickEvent"; }, never, never, true, never>;
}
