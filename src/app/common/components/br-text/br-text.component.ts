import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

import { BrTextConfig } from '../../models/controls-config.model';
import { CustomTextInput, MaterialTextInput, TextAdapter } from '../../adapters/text.adapter';
import { RuntimeUiConfigService } from '../../services/runtime-ui-config.service';
import { CustomTextControlComponent } from '../../implementations/form/controls/text/custom/custom-text-control.component';
import { MaterialTextControlComponent } from '../../implementations/form/controls/text/material/material-text-control.component';

@Component({
  selector: 'br-text',
  standalone: true,
  imports: [CommonModule, CustomTextControlComponent, MaterialTextControlComponent],
  templateUrl: './br-text.component.html',
})
export class BrTextComponent implements OnInit, OnChanges, OnDestroy {
  @Input() config!: BrTextConfig;
  @Output() valueChange = new EventEmitter<string>();

  mode: 'CUSTOM' | 'MATERIAL' = 'CUSTOM';
  customConfig!: CustomTextInput;
  materialConfig!: MaterialTextInput;
  private destroy$ = new Subject<void>();

  constructor(private readonly runtimeUiConfig: RuntimeUiConfigService) { }

  ngOnInit(): void {
    this.mode = this.runtimeUiConfig.getModesSnapshot().text;
    this.runtimeUiConfig.modes$.pipe(takeUntil(this.destroy$)).subscribe((m) => {
      this.mode = m.text;
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
      this.customConfig = TextAdapter.toCustom(this.config);
    } else {
      this.materialConfig = TextAdapter.toMaterial(this.config);
    }
  }
}
