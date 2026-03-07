import { EventEmitter } from '@angular/core';
import { MaterialGridInput } from '../../../adapters/grid.adapter';
import { BrGridActionEvent } from '../../../models/grid-config.model';
import * as i0 from "@angular/core";
export declare class MaterialGridComponent {
    config: MaterialGridInput;
    action: EventEmitter<BrGridActionEvent>;
    static ɵfac: i0.ɵɵFactoryDeclaration<MaterialGridComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MaterialGridComponent, "br-material-grid", never, { "config": { "alias": "config"; "required": false; }; }, { "action": "action"; }, never, never, true, never>;
}
