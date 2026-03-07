/**
 * ============================================================
 * BR-GRID — THE FAÇADE WRAPPER COMPONENT
 * ============================================================
 *
 * This is the ONLY grid component that consuming screens use.
 * Internally it:
 *   1. Reads UI_MODE from the config
 *   2. Uses the GridAdapter to transform the generic config
 *   3. Renders the correct implementation component
 *
 * Consumer screens NEVER import CustomGrid or MaterialGrid
 * directly — they only use <br-grid [config]="gridConfig">.
 *
 * PATTERN: Façade + Strategy
 * ============================================================
 */
import { EventEmitter, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { UiMode } from '../../config/ui-mode.config';
import { BrGridActionEvent, BrGridConfig } from '../../models/grid-config.model';
import { CustomGridInput, MaterialGridInput, CanvasGridInput, GridShellInput } from '../../adapters/grid.adapter';
import { RuntimeUiConfigService } from '../../services/runtime-ui-config.service';
import * as i0 from "@angular/core";
export declare class BrGridComponent implements OnInit, OnChanges, OnDestroy {
    private readonly runtimeUiConfig;
    /**
     * The ONLY input — a library-agnostic JSON config.
     * Consumer screens pass this and nothing else.
     */
    config: BrGridConfig;
    action: EventEmitter<BrGridActionEvent>;
    /** Resolved at runtime from config service */
    uiMode: UiMode;
    /** Adapted configs for each implementation */
    customConfig: CustomGridInput;
    materialConfig: MaterialGridInput;
    canvasConfig: CanvasGridInput;
    primeConfig: GridShellInput;
    private readonly destroy$;
    constructor(runtimeUiConfig: RuntimeUiConfigService);
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    onGridAction(event: BrGridActionEvent): void;
    ngOnDestroy(): void;
    private adaptConfig;
    static ɵfac: i0.ɵɵFactoryDeclaration<BrGridComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BrGridComponent, "br-grid", never, { "config": { "alias": "config"; "required": false; }; }, { "action": "action"; }, never, never, true, never>;
}
