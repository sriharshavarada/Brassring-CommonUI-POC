import { EventEmitter } from '@angular/core';
import { GridShellInput } from '../../../adapters/grid.adapter';
import { BrGridActionEvent } from '../../../models/grid-config.model';
import * as i0 from "@angular/core";
export declare class PrimeGridComponent {
    config: GridShellInput;
    action: EventEmitter<BrGridActionEvent>;
    static ɵfac: i0.ɵɵFactoryDeclaration<PrimeGridComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<PrimeGridComponent, "br-prime-grid", never, { "config": { "alias": "config"; "required": false; }; }, { "action": "action"; }, never, never, true, never>;
}
