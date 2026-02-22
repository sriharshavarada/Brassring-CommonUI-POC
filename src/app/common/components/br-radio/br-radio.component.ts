import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

import { BrRadioConfig } from '../../models/controls-config.model';
import { CustomRadioInput, MaterialRadioInput, RadioAdapter } from '../../adapters/radio.adapter';
import { RuntimeUiConfigService } from '../../services/runtime-ui-config.service';
import { CustomRadioControlComponent } from '../../implementations/form/controls/radio/custom/custom-radio-control.component';
import { MaterialRadioControlComponent } from '../../implementations/form/controls/radio/material/material-radio-control.component';

@Component({
  selector: 'br-radio',
  standalone: true,
  imports: [CommonModule, CustomRadioControlComponent, MaterialRadioControlComponent],
  templateUrl: './br-radio.component.html',
})
export class BrRadioComponent implements OnInit, OnChanges, OnDestroy {
  @Input() config!: BrRadioConfig;
  @Output() valueChange = new EventEmitter<any>();

  mode: 'CUSTOM' | 'MATERIAL' = 'CUSTOM';
  customConfig!: CustomRadioInput;
  materialConfig!: MaterialRadioInput;
  private destroy$ = new Subject<void>();

  constructor(private readonly runtimeUiConfig: RuntimeUiConfigService) { }

  ngOnInit(): void {
    this.mode = this.runtimeUiConfig.getModesSnapshot().radio;
    this.runtimeUiConfig.modes$.pipe(takeUntil(this.destroy$)).subscribe((m) => {
      this.mode = m.radio;
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
      this.customConfig = RadioAdapter.toCustom(this.config);
    } else {
      this.materialConfig = RadioAdapter.toMaterial(this.config);
    }
  }
}
