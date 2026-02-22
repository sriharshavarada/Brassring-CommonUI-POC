import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

import { BrCheckboxConfig } from '../../models/controls-config.model';
import {
  CheckboxAdapter,
  CustomCheckboxInput,
  MaterialCheckboxInput,
} from '../../adapters/checkbox.adapter';
import { RuntimeUiConfigService } from '../../services/runtime-ui-config.service';
import { CustomCheckboxControlComponent } from '../../implementations/form/controls/checkbox/custom/custom-checkbox-control.component';
import { MaterialCheckboxControlComponent } from '../../implementations/form/controls/checkbox/material/material-checkbox-control.component';

@Component({
  selector: 'br-checkbox',
  standalone: true,
  imports: [CommonModule, CustomCheckboxControlComponent, MaterialCheckboxControlComponent],
  templateUrl: './br-checkbox.component.html',
})
export class BrCheckboxComponent implements OnInit, OnChanges, OnDestroy {
  @Input() config!: BrCheckboxConfig;
  @Output() valueChange = new EventEmitter<boolean>();

  mode: 'CUSTOM' | 'MATERIAL' = 'CUSTOM';
  customConfig!: CustomCheckboxInput;
  materialConfig!: MaterialCheckboxInput;
  private destroy$ = new Subject<void>();

  constructor(private readonly runtimeUiConfig: RuntimeUiConfigService) { }

  ngOnInit(): void {
    this.mode = this.runtimeUiConfig.getModesSnapshot().checkbox;
    this.runtimeUiConfig.modes$.pipe(takeUntil(this.destroy$)).subscribe((m) => {
      this.mode = m.checkbox;
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
      this.customConfig = CheckboxAdapter.toCustom(this.config);
    } else {
      this.materialConfig = CheckboxAdapter.toMaterial(this.config);
    }
  }
}
