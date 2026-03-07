import { EventEmitter } from '@angular/core';
import { PrimeDateInput } from '../../../../../adapters/date.adapter';
import * as i0 from "@angular/core";
export declare class PrimeDateControlComponent {
    config: PrimeDateInput;
    showLibraryTag: boolean;
    dateChange: EventEmitter<Date | null>;
    static ɵfac: i0.ɵɵFactoryDeclaration<PrimeDateControlComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<PrimeDateControlComponent, "br-prime-date-control", never, { "config": { "alias": "config"; "required": false; }; "showLibraryTag": { "alias": "showLibraryTag"; "required": false; }; }, { "dateChange": "dateChange"; }, never, never, true, never>;
}
