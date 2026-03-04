import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  forwardRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

import { BrMultiSelectConfig, BrOption } from '../../models/controls-config.model';
import {
  CustomMultiSelectInput,
  MaterialMultiSelectInput,
  MultiSelectAdapter,
} from '../../adapters/multi-select.adapter';
import { RuntimeUiConfigService } from '../../services/runtime-ui-config.service';
import { CustomMultiSelectControlComponent } from '../../implementations/form/controls/multi-select/custom/custom-multi-select-control.component';
import { MaterialMultiSelectControlComponent } from '../../implementations/form/controls/multi-select/material/material-multi-select-control.component';
import { BaseValueAccessor } from '../../forms/base-value-accessor';
import { BrControlEvent, BrControlEventType } from '../../models/control-event.model';
import { BrControlHandle, ControlRegistryService } from '../../services/control-registry.service';

@Component({
  selector: 'br-multi-select',
  standalone: true,
  imports: [CommonModule, CustomMultiSelectControlComponent, MaterialMultiSelectControlComponent],
  templateUrl: './br-multi-select.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => BrMultiSelectComponent),
      multi: true,
    },
  ],
})
export class BrMultiSelectComponent extends BaseValueAccessor<any[]> implements OnInit, OnChanges, OnDestroy {
  @Input() config?: BrMultiSelectConfig;

  @Input() id?: string;
  @Input() controlId?: string;
  @Input() name?: string;
  @Input() className?: string;
  @Input() value?: any[];
  @Input() options?: BrOption[];
  @Input() disabled?: boolean;
  @Input() required?: boolean;
  @Input() label?: string;
  @Input() meta?: Record<string, any>;

  @Output() valueChange = new EventEmitter<any[]>();
  @Output() blur = new EventEmitter<FocusEvent>();
  @Output() focus = new EventEmitter<FocusEvent>();
  @Output() input = new EventEmitter<Event>();
  @Output() change = new EventEmitter<Event>();
  @Output() keydown = new EventEmitter<KeyboardEvent>();
  @Output() keyup = new EventEmitter<KeyboardEvent>();
  @Output() click = new EventEmitter<MouseEvent>();
  @Output() controlEvent = new EventEmitter<BrControlEvent<any[]>>();

  mode: 'CUSTOM' | 'MATERIAL' = 'CUSTOM';
  customConfig!: CustomMultiSelectInput;
  materialConfig!: MaterialMultiSelectInput;

  private readonly destroy$ = new Subject<void>();
  private registryHandle?: BrControlHandle;

  constructor(
    private readonly runtimeUiConfig: RuntimeUiConfigService,
    private readonly controlRegistry: ControlRegistryService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.mode = this.runtimeUiConfig.getModesSnapshot().multiSelect;
    this.adaptConfig();
    this.runtimeUiConfig.modes$.pipe(takeUntil(this.destroy$)).subscribe((m) => {
      this.mode = m.multiSelect;
      this.adaptConfig();
    });
    this.refreshRegistryRegistration();
  }

  ngOnChanges(_: SimpleChanges): void {
    this.adaptConfig();
    this.refreshRegistryRegistration();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    if (this.registryHandle) {
      this.controlRegistry.unregister(this.registryHandle);
    }
  }

  onImplementationValueChange(value: any[]): void {
    this.value = Array.isArray(value) ? [...value] : [];
    this.valueChange.emit(this.value);
    this.emitValueChange(this.value);
    this.emitControlEvent('valueChange', this.value);
    this.refreshRegistryRegistration();
  }

  onImplementationBlur(event: FocusEvent): void {
    this.blur.emit(event);
    this.emitControlEvent('blur', this.value ?? [], event);
    this.markTouched();
  }

  onImplementationFocus(event: FocusEvent): void {
    this.focus.emit(event);
    this.emitControlEvent('focus', this.value ?? [], event);
  }

  onImplementationInput(event: Event): void {
    this.input.emit(event);
    this.emitControlEvent('input', this.value ?? [], event);
  }

  onImplementationChange(event: Event): void {
    this.change.emit(event);
    this.emitControlEvent('change', this.value ?? [], event);
  }

  onImplementationKeydown(event: KeyboardEvent): void {
    this.keydown.emit(event);
    this.emitControlEvent('keydown', this.value ?? [], event);
  }

  onImplementationKeyup(event: KeyboardEvent): void {
    this.keyup.emit(event);
    this.emitControlEvent('keyup', this.value ?? [], event);
  }

  onImplementationClick(event: MouseEvent): void {
    this.click.emit(event);
    this.emitControlEvent('click', this.value ?? [], event);
  }

  protected override normalizeValue(value: any[]): any[] {
    return Array.isArray(value) ? [...value] : [];
  }

  protected override afterWriteValue(value: any[]): void {
    this.value = value;
    this.adaptConfig();
    this.refreshRegistryRegistration();
  }

  protected override afterDisabledStateChange(isDisabled: boolean): void {
    this.disabled = isDisabled;
    this.adaptConfig();
  }

  private adaptConfig(): void {
    const resolved = this.resolveConfig();
    if (this.mode === 'CUSTOM') {
      this.customConfig = MultiSelectAdapter.toCustom(resolved);
    } else {
      this.materialConfig = MultiSelectAdapter.toMaterial(resolved);
    }
  }

  private resolveConfig(): BrMultiSelectConfig {
    const source: BrMultiSelectConfig = this.config
      ? { ...this.config }
      : {
        label: '',
        value: [],
        options: [],
      };

    return {
      ...source,
      id: this.effectiveId,
      controlId: this.controlId,
      name: this.name ?? source.name,
      className: this.className ?? source.className,
      meta: this.meta ?? source.meta,
      label: this.label ?? source.label,
      value: this.value !== undefined ? this.value : source.value,
      options: this.options ?? source.options ?? [],
      disabled: this.disabled ?? source.disabled ?? this.currentDisabled,
      required: this.required ?? source.required ?? false,
    };
  }

  private get effectiveId(): string | undefined {
    return this.id || this.controlId || this.config?.id || this.config?.controlId;
  }

  private refreshRegistryRegistration(): void {
    if (this.registryHandle) {
      this.controlRegistry.unregister(this.registryHandle);
    }

    this.registryHandle = {
      id: this.effectiveId,
      name: this.name || this.config?.name,
      classes: this.extractClasses(this.className || this.config?.className),
      type: 'multiSelect',
      getValue: () => this.value ?? this.config?.value ?? [],
    };

    this.controlRegistry.register(this.registryHandle);
  }

  private extractClasses(classNames: string | undefined): string[] {
    return (classNames || '')
      .split(/\s+/)
      .map((part) => part.trim())
      .filter((part) => !!part);
  }

  private emitControlEvent(type: BrControlEventType, value?: any[], originalEvent?: Event): void {
    this.controlEvent.emit({
      type,
      id: this.effectiveId,
      name: this.name || this.config?.name,
      className: this.className || this.config?.className,
      value,
      meta: this.meta || this.config?.meta,
      originalEvent,
    });
  }
}
