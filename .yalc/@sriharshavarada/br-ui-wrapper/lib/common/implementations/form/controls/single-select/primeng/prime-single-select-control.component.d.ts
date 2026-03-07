import { EventEmitter } from '@angular/core';
import { PrimeSingleSelectInput } from '../../../../../adapters/single-select.adapter';
import * as i0 from "@angular/core";
export declare class PrimeSingleSelectControlComponent {
    config: PrimeSingleSelectInput;
    valueChange: EventEmitter<any>;
    onValueChange(newValue: any): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<PrimeSingleSelectControlComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<PrimeSingleSelectControlComponent, "br-prime-single-select-control", never, { "config": { "alias": "config"; "required": false; }; }, { "valueChange": "valueChange"; }, never, never, true, never>;
}
