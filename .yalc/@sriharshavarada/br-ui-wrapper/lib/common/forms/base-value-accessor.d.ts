import { ControlValueAccessor } from '@angular/forms';
export declare abstract class BaseValueAccessor<T> implements ControlValueAccessor {
    protected onChangeCallback: (value: T) => void;
    protected onTouchedCallback: () => void;
    protected currentValue: T;
    protected currentDisabled: boolean;
    writeValue(value: T): void;
    registerOnChange(fn: (value: T) => void): void;
    registerOnTouched(fn: () => void): void;
    setDisabledState(isDisabled: boolean): void;
    protected emitValueChange(value: T): void;
    protected markTouched(): void;
    protected abstract normalizeValue(value: T): T;
    protected afterWriteValue(_: T): void;
    protected afterDisabledStateChange(_: boolean): void;
}
