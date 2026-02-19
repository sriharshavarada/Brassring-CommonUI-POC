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

import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UI_MODE } from '../../config/ui-mode.config';
import { BrGridConfig } from '../../models/grid-config.model';
import { GridAdapter, CustomGridInput, MaterialGridInput } from '../../adapters/grid.adapter';

// Implementation components
import { CustomGridComponent } from '../../implementations/custom-grid/custom-grid.component';
import { MaterialGridComponent } from '../../implementations/material-grid/material-grid.component';

@Component({
    selector: 'br-grid',
    standalone: true,
    imports: [CommonModule, CustomGridComponent, MaterialGridComponent],
    templateUrl: './br-grid.component.html',
    styleUrls: ['./br-grid.component.scss'],
})
export class BrGridComponent implements OnChanges {
    /**
     * The ONLY input — a library-agnostic JSON config.
     * Consumer screens pass this and nothing else.
     */
    @Input() config!: BrGridConfig;

    /** Resolved at compile-time from the central config */
    uiMode = UI_MODE;

    /** Adapted configs for each implementation */
    customConfig!: CustomGridInput;
    materialConfig!: MaterialGridInput;

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['config'] && this.config) {
            // Transform generic config through the appropriate adapter
            if (this.uiMode === 'CUSTOM') {
                this.customConfig = GridAdapter.toCustom(this.config);
            } else {
                this.materialConfig = GridAdapter.toMaterial(this.config);
            }
        }
    }
}
