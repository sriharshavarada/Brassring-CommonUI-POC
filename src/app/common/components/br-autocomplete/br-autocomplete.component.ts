import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

import { BrAutocompleteConfig } from '../../models/controls-config.model';
import {
  AutocompleteAdapter,
  CustomAutocompleteInput,
  MaterialAutocompleteInput,
} from '../../adapters/autocomplete.adapter';
import { RuntimeUiConfigService } from '../../services/runtime-ui-config.service';
import { CustomAutocompleteControlComponent } from '../../implementations/form/controls/autocomplete/custom/custom-autocomplete-control.component';
import { MaterialAutocompleteControlComponent } from '../../implementations/form/controls/autocomplete/material/material-autocomplete-control.component';

@Component({
  selector: 'br-autocomplete',
  standalone: true,
  imports: [CommonModule, CustomAutocompleteControlComponent, MaterialAutocompleteControlComponent],
  templateUrl: './br-autocomplete.component.html',
})
export class BrAutocompleteComponent implements OnInit, OnChanges, OnDestroy {
  @Input() config!: BrAutocompleteConfig;
  @Output() valueChange = new EventEmitter<string>();

  mode: 'CUSTOM' | 'MATERIAL' = 'CUSTOM';
  customConfig!: CustomAutocompleteInput;
  materialConfig!: MaterialAutocompleteInput;
  private destroy$ = new Subject<void>();

  constructor(private readonly runtimeUiConfig: RuntimeUiConfigService) { }

  ngOnInit(): void {
    this.mode = this.runtimeUiConfig.getModesSnapshot().autocomplete;
    this.runtimeUiConfig.modes$.pipe(takeUntil(this.destroy$)).subscribe((m) => {
      this.mode = m.autocomplete;
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
      this.customConfig = AutocompleteAdapter.toCustom(this.config);
    } else {
      this.materialConfig = AutocompleteAdapter.toMaterial(this.config);
    }
  }
}
