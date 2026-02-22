import { BrOption, BrSingleSelectConfig } from '../models/controls-config.model';

export interface CustomSingleSelectInput {
  label: string;
  value: any;
  options: BrOption[];
  disabled: boolean;
  required: boolean;
}

export interface MaterialSingleSelectInput {
  label: string;
  value: any;
  options: BrOption[];
  disabled: boolean;
  required: boolean;
}

export class SingleSelectAdapter {
  static toCustom(config: BrSingleSelectConfig): CustomSingleSelectInput {
    return {
      label: config.label || '',
      value: config.value ?? '',
      options: [...(config.options || [])],
      disabled: config.disabled ?? false,
      required: config.required ?? false,
    };
  }

  static toMaterial(config: BrSingleSelectConfig): MaterialSingleSelectInput {
    return {
      label: config.label || '',
      value: config.value ?? '',
      options: [...(config.options || [])],
      disabled: config.disabled ?? false,
      required: config.required ?? false,
    };
  }
}
