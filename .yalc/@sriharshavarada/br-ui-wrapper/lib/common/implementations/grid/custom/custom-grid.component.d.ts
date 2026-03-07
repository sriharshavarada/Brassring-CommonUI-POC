import { EventEmitter } from '@angular/core';
import { CustomGridInput } from '../../../adapters/grid.adapter';
import { BrGridActionEvent } from '../../../models/grid-config.model';
import * as i0 from "@angular/core";
export declare class CustomGridComponent {
    config: CustomGridInput;
    action: EventEmitter<BrGridActionEvent>;
    static ɵfac: i0.ɵɵFactoryDeclaration<CustomGridComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CustomGridComponent, "br-custom-grid", never, { "config": { "alias": "config"; "required": false; }; }, { "action": "action"; }, never, never, true, never>;
}
