import { EventEmitter } from '@angular/core';
import { MaterialAutocompleteInput } from '../../../../../adapters/autocomplete.adapter';
import * as i0 from "@angular/core";
export declare class MaterialAutocompleteControlComponent {
    config: MaterialAutocompleteInput;
    showLibraryTag: boolean;
    valueChange: EventEmitter<string>;
    blurEvent: EventEmitter<FocusEvent>;
    focusEvent: EventEmitter<FocusEvent>;
    inputEvent: EventEmitter<Event>;
    changeEvent: EventEmitter<Event>;
    keydownEvent: EventEmitter<KeyboardEvent>;
    keyupEvent: EventEmitter<KeyboardEvent>;
    clickEvent: EventEmitter<MouseEvent>;
    filtered(): Array<{
        label: string;
        value: any;
    }>;
    static ɵfac: i0.ɵɵFactoryDeclaration<MaterialAutocompleteControlComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MaterialAutocompleteControlComponent, "br-material-autocomplete-control", never, { "config": { "alias": "config"; "required": false; }; "showLibraryTag": { "alias": "showLibraryTag"; "required": false; }; }, { "valueChange": "valueChange"; "blurEvent": "blurEvent"; "focusEvent": "focusEvent"; "inputEvent": "inputEvent"; "changeEvent": "changeEvent"; "keydownEvent": "keydownEvent"; "keyupEvent": "keyupEvent"; "clickEvent": "clickEvent"; }, never, never, true, never>;
}
