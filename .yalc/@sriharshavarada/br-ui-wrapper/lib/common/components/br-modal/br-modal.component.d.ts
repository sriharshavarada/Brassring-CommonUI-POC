/**
 * ============================================================
 * BR-MODAL — THE FAÇADE WRAPPER COMPONENT
 * ============================================================
 *
 * This is the ONLY modal component that consuming screens use.
 * Internally it:
 *   1. Reads UI_MODE from the config
 *   2. Uses the ModalAdapter to transform the generic config
 *   3. Renders the correct implementation component
 *
 * Consumer screens NEVER import CustomModal or MaterialModal
 * directly — they only use <br-modal [config]="modalConfig">.
 * ============================================================
 */
import { EventEmitter, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { ModalUiMode } from '../../config/ui-mode.config';
import { BrModalConfig, BrModalActionEvent } from '../../models/modal-config.model';
import { CustomModalInput, MaterialModalInput, PrimeModalInput } from '../../adapters/modal.adapter';
import { RuntimeUiConfigService } from '../../services/runtime-ui-config.service';
import * as i0 from "@angular/core";
export declare class BrModalComponent implements OnInit, OnChanges, OnDestroy {
    private readonly runtimeUiConfig;
    /**
     * The ONLY input — a library-agnostic JSON config.
     */
    config: BrModalConfig;
    /**
     * Emits when an action button is clicked.
     */
    action: EventEmitter<BrModalActionEvent>;
    /**
     * Emits when the modal is closed (via backdrop or close button).
     */
    close: EventEmitter<void>;
    /** Resolved at runtime from config service */
    uiMode: ModalUiMode;
    /** Adapted configs for each implementation */
    customConfig: CustomModalInput;
    materialConfig: MaterialModalInput;
    primeConfig: PrimeModalInput;
    private readonly destroy$;
    constructor(runtimeUiConfig: RuntimeUiConfigService);
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    onModalAction(event: BrModalActionEvent): void;
    onModalClose(): void;
    ngOnDestroy(): void;
    private adaptConfig;
    static ɵfac: i0.ɵɵFactoryDeclaration<BrModalComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BrModalComponent, "br-modal", never, { "config": { "alias": "config"; "required": false; }; }, { "action": "action"; "close": "close"; }, never, never, true, never>;
}
