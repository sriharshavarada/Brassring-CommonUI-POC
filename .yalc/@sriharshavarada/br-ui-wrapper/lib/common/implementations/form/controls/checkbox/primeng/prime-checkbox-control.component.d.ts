import { EventEmitter } from '@angular/core';
import { PrimeCheckboxInput } from '../../../../../adapters/checkbox.adapter';
import * as i0 from "@angular/core";
export declare class PrimeCheckboxControlComponent {
    config: PrimeCheckboxInput;
    showLibraryTag: boolean;
    valueChange: EventEmitter<boolean>;
    static ɵfac: i0.ɵɵFactoryDeclaration<PrimeCheckboxControlComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<PrimeCheckboxControlComponent, "br-prime-checkbox-control", never, { "config": { "alias": "config"; "required": false; }; "showLibraryTag": { "alias": "showLibraryTag"; "required": false; }; }, { "valueChange": "valueChange"; }, never, never, true, never>;
}
