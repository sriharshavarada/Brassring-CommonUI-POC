import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

import { BrSingleSelectConfig } from '../../models/controls-config.model';
import {
  CustomSingleSelectInput,
  MaterialSingleSelectInput,
  SingleSelectAdapter,
} from '../../adapters/single-select.adapter';
import { RuntimeUiConfigService } from '../../services/runtime-ui-config.service';
import { CustomSingleSelectControlComponent } from '../../implementations/form/controls/single-select/custom/custom-single-select-control.component';
import { MaterialSingleSelectControlComponent } from '../../implementations/form/controls/single-select/material/material-single-select-control.component';

@Component({
  selector: 'br-single-select',
  standalone: true,
  imports: [CommonModule, CustomSingleSelectControlComponent, MaterialSingleSelectControlComponent],
  templateUrl: './br-single-select.component.html',
})
export class BrSingleSelectComponent implements OnInit, OnChanges, OnDestroy {
  @Input() config!: BrSingleSelectConfig;
  @Output() valueChange = new EventEmitter<any>();

  mode: 'CUSTOM' | 'MATERIAL' = 'CUSTOM';
  customConfig!: CustomSingleSelectInput;
  materialConfig!: MaterialSingleSelectInput;
  private destroy$ = new Subject<void>();

  constructor(private readonly runtimeUiConfig: RuntimeUiConfigService) { }

  ngOnInit(): void {
    this.mode = this.runtimeUiConfig.getModesSnapshot().singleSelect;
    this.runtimeUiConfig.modes$.pipe(takeUntil(this.destroy$)).subscribe((m) => {
      this.mode = m.singleSelect;
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
      this.customConfig = SingleSelectAdapter.toCustom(this.config);
    } else {
      this.materialConfig = SingleSelectAdapter.toMaterial(this.config);
    }
  }
}
