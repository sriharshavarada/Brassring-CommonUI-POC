import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

import { BrMultiSelectConfig } from '../../models/controls-config.model';
import {
  CustomMultiSelectInput,
  MaterialMultiSelectInput,
  MultiSelectAdapter,
} from '../../adapters/multi-select.adapter';
import { RuntimeUiConfigService } from '../../services/runtime-ui-config.service';
import { CustomMultiSelectControlComponent } from '../../implementations/form/controls/multi-select/custom/custom-multi-select-control.component';
import { MaterialMultiSelectControlComponent } from '../../implementations/form/controls/multi-select/material/material-multi-select-control.component';

@Component({
  selector: 'br-multi-select',
  standalone: true,
  imports: [CommonModule, CustomMultiSelectControlComponent, MaterialMultiSelectControlComponent],
  templateUrl: './br-multi-select.component.html',
})
export class BrMultiSelectComponent implements OnInit, OnChanges, OnDestroy {
  @Input() config!: BrMultiSelectConfig;
  @Output() valueChange = new EventEmitter<any[]>();

  mode: 'CUSTOM' | 'MATERIAL' = 'CUSTOM';
  customConfig!: CustomMultiSelectInput;
  materialConfig!: MaterialMultiSelectInput;
  private destroy$ = new Subject<void>();

  constructor(private readonly runtimeUiConfig: RuntimeUiConfigService) { }

  ngOnInit(): void {
    this.mode = this.runtimeUiConfig.getModesSnapshot().multiSelect;
    this.runtimeUiConfig.modes$.pipe(takeUntil(this.destroy$)).subscribe((m) => {
      this.mode = m.multiSelect;
      this.adaptConfig();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['config']) {
      this.adaptConfig();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private adaptConfig(): void {
    if (!this.config) return;
    if (this.mode === 'CUSTOM') {
      this.customConfig = MultiSelectAdapter.toCustom(this.config);
    } else {
      this.materialConfig = MultiSelectAdapter.toMaterial(this.config);
    }
  }
}
