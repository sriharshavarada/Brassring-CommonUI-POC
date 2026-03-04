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

import { BrCheckboxConfig } from '../../models/controls-config.model';
import {
  CheckboxAdapter,
  CustomCheckboxInput,
  MaterialCheckboxInput,
} from '../../adapters/checkbox.adapter';
import { RuntimeUiConfigService } from '../../services/runtime-ui-config.service';
import { CustomCheckboxControlComponent } from '../../implementations/form/controls/checkbox/custom/custom-checkbox-control.component';
import { MaterialCheckboxControlComponent } from '../../implementations/form/controls/checkbox/material/material-checkbox-control.component';
import { BaseValueAccessor } from '../../forms/base-value-accessor';
import { BrControlEvent, BrControlEventType } from '../../models/control-event.model';
import { BrControlHandle, ControlRegistryService } from '../../services/control-registry.service';

@Component({
  selector: 'br-checkbox',
  standalone: true,
  imports: [CommonModule, CustomCheckboxControlComponent, MaterialCheckboxControlComponent],
  templateUrl: './br-checkbox.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => BrCheckboxComponent),
      multi: true,
    },
  ],
})
export class BrCheckboxComponent extends BaseValueAccessor<boolean> implements OnInit, OnChanges, OnDestroy {
  @Input() config?: BrCheckboxConfig;

  @Input() id?: string;
  @Input() controlId?: string;
  @Input() name?: string;
  @Input() className?: string;
  @Input() value?: boolean;
  @Input() disabled?: boolean;
  @Input() required?: boolean;
  @Input() label?: string;
  @Input() meta?: Record<string, any>;

  @Output() valueChange = new EventEmitter<boolean>();
  @Output() blur = new EventEmitter<FocusEvent>();
  @Output() focus = new EventEmitter<FocusEvent>();
  @Output() input = new EventEmitter<Event>();
  @Output() change = new EventEmitter<Event>();
  @Output() keydown = new EventEmitter<KeyboardEvent>();
  @Output() keyup = new EventEmitter<KeyboardEvent>();
  @Output() click = new EventEmitter<MouseEvent>();
  @Output() controlEvent = new EventEmitter<BrControlEvent<boolean>>();

  mode: 'CUSTOM' | 'MATERIAL' = 'CUSTOM';
  customConfig!: CustomCheckboxInput;
  materialConfig!: MaterialCheckboxInput;

  private readonly destroy$ = new Subject<void>();
  private registryHandle?: BrControlHandle;

  constructor(
    private readonly runtimeUiConfig: RuntimeUiConfigService,
    private readonly controlRegistry: ControlRegistryService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.mode = this.runtimeUiConfig.getModesSnapshot().checkbox;
    this.adaptConfig();
    this.runtimeUiConfig.modes$.pipe(takeUntil(this.destroy$)).subscribe((m) => {
      this.mode = m.checkbox;
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

  onImplementationValueChange(value: boolean): void {
    this.value = !!value;
    this.valueChange.emit(this.value);
    this.emitValueChange(this.value);
    this.emitControlEvent('valueChange', this.value);
    this.refreshRegistryRegistration();
  }

  onImplementationBlur(event: FocusEvent): void {
    this.blur.emit(event);
    this.emitControlEvent('blur', this.value ?? false, event);
    this.markTouched();
  }

  onImplementationFocus(event: FocusEvent): void {
    this.focus.emit(event);
    this.emitControlEvent('focus', this.value ?? false, event);
  }

  onImplementationInput(event: Event): void {
    this.input.emit(event);
    this.emitControlEvent('input', this.value ?? false, event);
  }

  onImplementationChange(event: Event): void {
    this.change.emit(event);
    this.emitControlEvent('change', this.value ?? false, event);
  }

  onImplementationKeydown(event: KeyboardEvent): void {
    this.keydown.emit(event);
    this.emitControlEvent('keydown', this.value ?? false, event);
  }

  onImplementationKeyup(event: KeyboardEvent): void {
    this.keyup.emit(event);
    this.emitControlEvent('keyup', this.value ?? false, event);
  }

  onImplementationClick(event: MouseEvent): void {
    this.click.emit(event);
    this.emitControlEvent('click', this.value ?? false, event);
  }

  protected override normalizeValue(value: boolean): boolean {
    return !!value;
  }

  protected override afterWriteValue(value: boolean): void {
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
      this.customConfig = CheckboxAdapter.toCustom(resolved);
    } else {
      this.materialConfig = CheckboxAdapter.toMaterial(resolved);
    }
  }

  private resolveConfig(): BrCheckboxConfig {
    const source: BrCheckboxConfig = this.config
      ? { ...this.config }
      : {
        label: '',
        checked: false,
      };

    const resolvedValue = this.value !== undefined ? this.value : (source.value ?? source.checked ?? false);

    return {
      ...source,
      id: this.effectiveId,
      controlId: this.controlId,
      name: this.name ?? source.name,
      className: this.className ?? source.className,
      meta: this.meta ?? source.meta,
      label: this.label ?? source.label,
      value: resolvedValue,
      checked: resolvedValue,
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
      type: 'checkbox',
      getValue: () => this.value ?? this.config?.value ?? this.config?.checked ?? false,
    };

    this.controlRegistry.register(this.registryHandle);
  }

  private extractClasses(classNames: string | undefined): string[] {
    return (classNames || '')
      .split(/\s+/)
      .map((part) => part.trim())
      .filter((part) => !!part);
  }

  private emitControlEvent(type: BrControlEventType, value?: boolean, originalEvent?: Event): void {
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
