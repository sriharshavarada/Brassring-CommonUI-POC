import { ControlValueAccessor } from '@angular/forms';

export abstract class BaseValueAccessor<T> implements ControlValueAccessor {
  protected onChangeCallback: (value: T) => void = () => { };
  protected onTouchedCallback: () => void = () => { };
  protected currentValue!: T;
  protected currentDisabled = false;

  writeValue(value: T): void {
    this.currentValue = this.normalizeValue(value);
    this.afterWriteValue(this.currentValue);
  }

  registerOnChange(fn: (value: T) => void): void {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouchedCallback = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.currentDisabled = !!isDisabled;
    this.afterDisabledStateChange(this.currentDisabled);
  }

  protected emitValueChange(value: T): void {
    this.currentValue = this.normalizeValue(value);
    this.onChangeCallback(this.currentValue);
  }

  protected markTouched(): void {
    this.onTouchedCallback();
  }

  protected abstract normalizeValue(value: T): T;

  protected afterWriteValue(_: T): void {
    // optional override
  }

  protected afterDisabledStateChange(_: boolean): void {
    // optional override
  }
}

