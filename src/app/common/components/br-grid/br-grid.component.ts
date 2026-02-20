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

import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UI_MODE_BY_CONTROL } from '../../config/ui-mode.config';
import { BrGridActionEvent, BrGridConfig } from '../../models/grid-config.model';
import {
    GridAdapter,
    CustomGridInput,
    MaterialGridInput,
    CanvasGridInput,
} from '../../adapters/grid.adapter';

// Implementation components
import { CustomGridComponent } from '../../implementations/custom-grid/custom-grid.component';
import { MaterialGridComponent } from '../../implementations/material-grid/material-grid.component';
import { CanvasGridComponent } from '../../implementations/canvas-grid/canvas-grid.component';

@Component({
    selector: 'br-grid',
    standalone: true,
    imports: [CommonModule, CustomGridComponent, MaterialGridComponent, CanvasGridComponent],
    templateUrl: './br-grid.component.html',
    styleUrls: ['./br-grid.component.scss'],
})
export class BrGridComponent implements OnChanges {
    /**
     * The ONLY input — a library-agnostic JSON config.
     * Consumer screens pass this and nothing else.
     */
    @Input() config!: BrGridConfig;
    @Output() action = new EventEmitter<BrGridActionEvent>();

    /** Resolved at compile-time from the central config */
    uiMode = UI_MODE_BY_CONTROL.grid;

    /** Adapted configs for each implementation */
    customConfig!: CustomGridInput;
    materialConfig!: MaterialGridInput;
    canvasConfig!: CanvasGridInput;

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['config'] && this.config) {
            // Transform generic config through the appropriate adapter
            if (this.uiMode === 'CUSTOM') {
                this.customConfig = GridAdapter.toCustom(this.config);
            } else if (this.uiMode === 'MATERIAL') {
                this.materialConfig = GridAdapter.toMaterial(this.config);
            } else {
                this.canvasConfig = GridAdapter.toCanvas(this.config);
            }
        }
    }

    onGridAction(event: BrGridActionEvent): void {
        this.action.emit(event);
    }
}
