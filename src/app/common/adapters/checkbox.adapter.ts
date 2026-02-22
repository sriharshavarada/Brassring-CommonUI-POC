import { BrCheckboxConfig } from '../models/controls-config.model';

export interface CustomCheckboxInput {
  label: string;
  checked: boolean;
  disabled: boolean;
}

export interface MaterialCheckboxInput {
  label: string;
  checked: boolean;
  disabled: boolean;
}

export class CheckboxAdapter {
  static toCustom(config: BrCheckboxConfig): CustomCheckboxInput {
    return {
      label: config.label || '',
      checked: config.checked ?? false,
      disabled: config.disabled ?? false,
    };
  }

  static toMaterial(config: BrCheckboxConfig): MaterialCheckboxInput {
    return {
      label: config.label || '',
      checked: config.checked ?? false,
      disabled: config.disabled ?? false,
    };
  }
}
