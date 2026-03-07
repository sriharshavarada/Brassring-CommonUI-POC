import { EventEmitter } from '@angular/core';
import { CanvasGridInput } from '../../../adapters/grid.adapter';
import { BrGridActionEvent } from '../../../models/grid-config.model';
import * as i0 from "@angular/core";
export declare class CanvasGridComponent {
    config: CanvasGridInput;
    action: EventEmitter<BrGridActionEvent>;
    static ɵfac: i0.ɵɵFactoryDeclaration<CanvasGridComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CanvasGridComponent, "br-canvas-grid", never, { "config": { "alias": "config"; "required": false; }; }, { "action": "action"; }, never, never, true, never>;
}
