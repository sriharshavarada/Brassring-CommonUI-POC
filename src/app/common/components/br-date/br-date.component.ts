/**
 * ============================================================
 * BR-DATE — THE FAÇADE WRAPPER COMPONENT
 * ============================================================
 *
 * This is the ONLY date component that consuming screens use.
 * Internally it:
 *   1. Reads UI_MODE from the config
 *   2. Uses the DateAdapter to transform the generic config
 *   3. Renders the correct implementation component
 *
 * Consumer screens NEVER import CustomDate or MaterialDate
 * directly — they only use <br-date [config]="dateConfig">.
 *
 * PATTERN: Façade + Strategy
 * ============================================================
 */

import {
    Component, Input, Output, EventEmitter,
    OnChanges, OnDestroy, OnInit, SimpleChanges
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';

import { DateUiMode } from '../../config/ui-mode.config';
import { BrDateConfig } from '../../models/date-config.model';
import { DateAdapter as BrDateAdapter, CustomDateInput, MaterialDateInput } from '../../adapters/date.adapter';
import { RuntimeUiConfigService } from '../../services/runtime-ui-config.service';

// Implementation components
import { CustomDateComponent } from '../../implementations/form/date/custom/custom-date.component';
import { MaterialDateComponent } from '../../implementations/form/date/material/material-date.component';

@Component({
    selector: 'br-date',
    standalone: true,
    imports: [CommonModule, CustomDateComponent, MaterialDateComponent],
    templateUrl: './br-date.component.html',
    styleUrls: ['./br-date.component.scss'],
})
export class BrDateComponent implements OnInit, OnChanges, OnDestroy {
    /**
     * The ONLY input — a library-agnostic JSON config.
     * Consumer screens pass this and nothing else.
     */
    @Input() config!: BrDateConfig;

    /**
     * Emits date changes back to the consumer in a generic format.
     */
    @Output() dateChange = new EventEmitter<string>();

    /** Resolved at runtime from config service */
    uiMode: DateUiMode = 'CUSTOM';

    /** Adapted configs for each implementation */
    customConfig!: CustomDateInput;
    materialConfig!: MaterialDateInput;
    private readonly destroy$ = new Subject<void>();

    constructor(private readonly runtimeUiConfig: RuntimeUiConfigService) { }

    ngOnInit(): void {
        this.uiMode = this.runtimeUiConfig.getModesSnapshot().date;
        this.runtimeUiConfig.modes$
            .pipe(takeUntil(this.destroy$))
            .subscribe((modes) => {
                this.uiMode = modes.date;
                this.adaptConfig();
            });
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['config'] && this.config) {
            this.adaptConfig();
        }
    }

    /** Normalize output from any implementation to ISO string */
    onCustomDateChange(value: string): void {
        this.dateChange.emit(value);
    }

    onMaterialDateChange(value: Date | null): void {
        this.dateChange.emit(value ? value.toISOString().split('T')[0] : '');
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    private adaptConfig(): void {
        if (!this.config) return;
        if (this.uiMode === 'CUSTOM') {
            this.customConfig = BrDateAdapter.toCustom(this.config);
        } else {
            this.materialConfig = BrDateAdapter.toMaterial(this.config);
        }
    }
}
