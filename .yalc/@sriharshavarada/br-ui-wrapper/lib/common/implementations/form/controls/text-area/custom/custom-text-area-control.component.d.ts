import { EventEmitter } from '@angular/core';
import { CustomTextAreaInput } from '../../../../../adapters/text-area.adapter';
import * as i0 from "@angular/core";
export declare class CustomTextAreaControlComponent {
    config: CustomTextAreaInput;
    showLibraryTag: boolean;
    valueChange: EventEmitter<string>;
    blurEvent: EventEmitter<FocusEvent>;
    focusEvent: EventEmitter<FocusEvent>;
    inputEvent: EventEmitter<Event>;
    changeEvent: EventEmitter<Event>;
    keydownEvent: EventEmitter<KeyboardEvent>;
    keyupEvent: EventEmitter<KeyboardEvent>;
    clickEvent: EventEmitter<MouseEvent>;
    static ɵfac: i0.ɵɵFactoryDeclaration<CustomTextAreaControlComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CustomTextAreaControlComponent, "br-custom-text-area-control", never, { "config": { "alias": "config"; "required": false; }; "showLibraryTag": { "alias": "showLibraryTag"; "required": false; }; }, { "valueChange": "valueChange"; "blurEvent": "blurEvent"; "focusEvent": "focusEvent"; "inputEvent": "inputEvent"; "changeEvent": "changeEvent"; "keydownEvent": "keydownEvent"; "keyupEvent": "keyupEvent"; "clickEvent": "clickEvent"; }, never, never, true, never>;
}
