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
import { CommonModule } from '@angular/common';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

import { DateUiMode } from '../../config/ui-mode.config';
import { BrDateConfig } from '../../models/date-config.model';
import { BrControlEvent, BrControlEventType } from '../../models/control-event.model';
import { DateAdapter as BrDateAdapter, CustomDateInput, MaterialDateInput } from '../../adapters/date.adapter';
import { RuntimeUiConfigService } from '../../services/runtime-ui-config.service';
import { BaseValueAccessor } from '../../forms/base-value-accessor';
import { ControlRegistryService, BrControlHandle } from '../../services/control-registry.service';

import { CustomDateComponent } from '../../implementations/form/controls/date/custom/custom-date.component';
import { MaterialDateComponent } from '../../implementations/form/controls/date/material/material-date.component';

@Component({
  selector: 'br-date',
  standalone: true,
  imports: [CommonModule, CustomDateComponent, MaterialDateComponent],
  templateUrl: './br-date.component.html',
  styleUrls: ['./br-date.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => BrDateComponent),
      multi: true,
    },
  ],
})
export class BrDateComponent extends BaseValueAccessor<string> implements OnInit, OnChanges, OnDestroy {
  @Input() config?: BrDateConfig;

  @Input() id?: string;
  @Input() controlId?: string;
  @Input() name?: string;
  @Input() className?: string;
  @Input() value?: string | Date | null;
  @Input() disabled?: boolean;
  @Input() required?: boolean;
  @Input() label?: string;
  @Input() placeholder?: string;
  @Input() meta?: Record<string, any>;

  @Output() valueChange = new EventEmitter<string>();
  @Output() dateChange = new EventEmitter<string>();
  @Output() blur = new EventEmitter<FocusEvent>();
  @Output() focus = new EventEmitter<FocusEvent>();
  @Output() input = new EventEmitter<Event>();
  @Output() change = new EventEmitter<Event>();
  @Output() keydown = new EventEmitter<KeyboardEvent>();
  @Output() keyup = new EventEmitter<KeyboardEvent>();
  @Output() click = new EventEmitter<MouseEvent>();
  @Output() controlEvent = new EventEmitter<BrControlEvent<string>>();

  uiMode: DateUiMode = 'CUSTOM';
  customConfig!: CustomDateInput;
  materialConfig!: MaterialDateInput;

  private readonly destroy$ = new Subject<void>();
  private registryHandle?: BrControlHandle;

  constructor(
    private readonly runtimeUiConfig: RuntimeUiConfigService,
    private readonly controlRegistry: ControlRegistryService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.uiMode = this.runtimeUiConfig.getModesSnapshot().date;
    this.runtimeUiConfig.modes$
      .pipe(takeUntil(this.destroy$))
      .subscribe((modes) => {
        this.uiMode = modes.date;
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

  onCustomDateChange(value: string): void {
    this.emitDateValue(value);
  }

  onMaterialDateChange(value: Date | null): void {
    this.emitDateValue(value ? this.toLocalIsoDate(value) : '');
  }

  onImplementationBlur(event: FocusEvent): void {
    this.blur.emit(event);
    this.emitControlEvent('blur', this.normalizedStringValue, event);
    this.markTouched();
  }

  onImplementationFocus(event: FocusEvent): void {
    this.focus.emit(event);
    this.emitControlEvent('focus', this.normalizedStringValue, event);
  }

  onImplementationInput(event: Event): void {
    this.input.emit(event);
    this.emitControlEvent('input', this.normalizedStringValue, event);
  }

  onImplementationChange(event: Event): void {
    this.change.emit(event);
    this.emitControlEvent('change', this.normalizedStringValue, event);
  }

  onImplementationKeydown(event: KeyboardEvent): void {
    this.keydown.emit(event);
    this.emitControlEvent('keydown', this.normalizedStringValue, event);
  }

  onImplementationKeyup(event: KeyboardEvent): void {
    this.keyup.emit(event);
    this.emitControlEvent('keyup', this.normalizedStringValue, event);
  }

  onImplementationClick(event: MouseEvent): void {
    this.click.emit(event);
    this.emitControlEvent('click', this.normalizedStringValue, event);
  }

  protected override normalizeValue(value: string): string {
    return value ?? '';
  }

  protected override afterWriteValue(value: string): void {
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

    if (this.uiMode === 'CUSTOM') {
      this.customConfig = BrDateAdapter.toCustom(resolved);
    } else {
      this.materialConfig = BrDateAdapter.toMaterial(resolved);
    }
  }

  private resolveConfig(): BrDateConfig {
    const source: BrDateConfig = this.config
      ? { ...this.config }
      : {
        label: '',
        value: null,
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
      disabled: this.disabled ?? source.disabled ?? this.currentDisabled,
      required: this.required ?? source.required ?? false,
      placeholder: this.placeholder ?? source.placeholder,
    };
  }

  private emitDateValue(value: string): void {
    this.value = value;
    this.valueChange.emit(value);
    this.dateChange.emit(value);
    this.emitValueChange(value);
    this.emitControlEvent('valueChange', value);
    this.refreshRegistryRegistration();
  }

  private get effectiveId(): string | undefined {
    return this.id || this.controlId || this.config?.id || this.config?.controlId;
  }

  private toLocalIsoDate(value: Date): string {
    const year = value.getFullYear();
    const month = String(value.getMonth() + 1).padStart(2, '0');
    const day = String(value.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  private refreshRegistryRegistration(): void {
    if (this.registryHandle) {
      this.controlRegistry.unregister(this.registryHandle);
    }

    this.registryHandle = {
      id: this.effectiveId,
      name: this.name || this.config?.name,
      classes: this.extractClasses(this.className || this.config?.className),
      type: 'date',
      getValue: () => this.value ?? this.config?.value ?? '',
    };

    this.controlRegistry.register(this.registryHandle);
  }

  private extractClasses(classNames: string | undefined): string[] {
    return (classNames || '')
      .split(/\s+/)
      .map((part) => part.trim())
      .filter((part) => !!part);
  }

  private get normalizedStringValue(): string {
    if (typeof this.value === 'string') return this.value;
    if (this.value instanceof Date) return this.toLocalIsoDate(this.value);
    if (typeof this.config?.value === 'string') return this.config.value;
    if (this.config?.value instanceof Date) return this.toLocalIsoDate(this.config.value);
    return '';
  }

  private emitControlEvent(type: BrControlEventType, value?: string, originalEvent?: Event): void {
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
