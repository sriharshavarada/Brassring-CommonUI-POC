import { EventEmitter } from '@angular/core';
import { PrimeRadioInput } from '../../../../../adapters/radio.adapter';
import * as i0 from "@angular/core";
export declare class PrimeRadioControlComponent {
    config: PrimeRadioInput;
    showLibraryTag: boolean;
    valueChange: EventEmitter<any>;
    static ɵfac: i0.ɵɵFactoryDeclaration<PrimeRadioControlComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<PrimeRadioControlComponent, "br-prime-radio-control", never, { "config": { "alias": "config"; "required": false; }; "showLibraryTag": { "alias": "showLibraryTag"; "required": false; }; }, { "valueChange": "valueChange"; }, never, never, true, never>;
}
