import { BrMultiSelectConfig, BrOption } from '../models/controls-config.model';

export interface CustomMultiSelectInput {
  id?: string;
  name?: string;
  className?: string;
  label: string;
  value: any[];
  options: BrOption[];
  disabled: boolean;
  required: boolean;
}

export interface MaterialMultiSelectInput {
  id?: string;
  name?: string;
  className?: string;
  label: string;
  value: any[];
  options: BrOption[];
  disabled: boolean;
  required: boolean;
}

export class MultiSelectAdapter {
  static toCustom(config: BrMultiSelectConfig): CustomMultiSelectInput {
    return {
      id: config.id || config.controlId,
      name: config.name,
      className: config.className,
      label: config.label || '',
      value: Array.isArray(config.value) ? [...config.value] : [],
      options: [...(config.options || [])],
      disabled: config.disabled ?? false,
      required: config.required ?? false,
    };
  }

  static toMaterial(config: BrMultiSelectConfig): MaterialMultiSelectInput {
    return {
      id: config.id || config.controlId,
      name: config.name,
      className: config.className,
      label: config.label || '',
      value: Array.isArray(config.value) ? [...config.value] : [],
      options: [...(config.options || [])],
      disabled: config.disabled ?? false,
      required: config.required ?? false,
    };
  }
}
