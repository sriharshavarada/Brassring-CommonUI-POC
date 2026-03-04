import { BrCheckboxConfig } from '../models/controls-config.model';

export interface CustomCheckboxInput {
  id?: string;
  name?: string;
  className?: string;
  label: string;
  checked: boolean;
  required: boolean;
  disabled: boolean;
}

export interface MaterialCheckboxInput {
  id?: string;
  name?: string;
  className?: string;
  label: string;
  checked: boolean;
  required: boolean;
  disabled: boolean;
}

export class CheckboxAdapter {
  static toCustom(config: BrCheckboxConfig): CustomCheckboxInput {
    return {
      id: config.id || config.controlId,
      name: config.name,
      className: config.className,
      label: config.label || '',
      checked: config.value ?? config.checked ?? false,
      required: config.required ?? false,
      disabled: config.disabled ?? false,
    };
  }

  static toMaterial(config: BrCheckboxConfig): MaterialCheckboxInput {
    return {
      id: config.id || config.controlId,
      name: config.name,
      className: config.className,
      label: config.label || '',
      checked: config.value ?? config.checked ?? false,
      required: config.required ?? false,
      disabled: config.disabled ?? false,
    };
  }
}
