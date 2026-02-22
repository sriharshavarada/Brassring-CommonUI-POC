import { BrMultiSelectConfig, BrOption } from '../models/controls-config.model';

export interface CustomMultiSelectInput {
  label: string;
  value: any[];
  options: BrOption[];
  disabled: boolean;
}

export interface MaterialMultiSelectInput {
  label: string;
  value: any[];
  options: BrOption[];
  disabled: boolean;
}

export class MultiSelectAdapter {
  static toCustom(config: BrMultiSelectConfig): CustomMultiSelectInput {
    return {
      label: config.label || '',
      value: Array.isArray(config.value) ? [...config.value] : [],
      options: [...(config.options || [])],
      disabled: config.disabled ?? false,
    };
  }

  static toMaterial(config: BrMultiSelectConfig): MaterialMultiSelectInput {
    return {
      label: config.label || '',
      value: Array.isArray(config.value) ? [...config.value] : [],
      options: [...(config.options || [])],
      disabled: config.disabled ?? false,
    };
  }
}
