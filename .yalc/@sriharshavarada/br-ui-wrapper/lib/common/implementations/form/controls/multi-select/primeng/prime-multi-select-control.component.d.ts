import { EventEmitter } from '@angular/core';
import { PrimeMultiSelectInput } from '../../../../../adapters/multi-select.adapter';
import * as i0 from "@angular/core";
export declare class PrimeMultiSelectControlComponent {
    config: PrimeMultiSelectInput;
    valueChange: EventEmitter<any[]>;
    onValueChange(newValue: any[]): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<PrimeMultiSelectControlComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<PrimeMultiSelectControlComponent, "br-prime-multi-select-control", never, { "config": { "alias": "config"; "required": false; }; }, { "valueChange": "valueChange"; }, never, never, true, never>;
}
