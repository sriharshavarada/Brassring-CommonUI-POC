import { BrOption, BrSingleSelectConfig } from '../models/controls-config.model';

export interface CustomSingleSelectInput {
  id?: string;
  name?: string;
  className?: string;
  label: string;
  value: any;
  options: BrOption[];
  disabled: boolean;
  required: boolean;
}

export interface MaterialSingleSelectInput {
  id?: string;
  name?: string;
  className?: string;
  label: string;
  value: any;
  options: BrOption[];
  disabled: boolean;
  required: boolean;
}

export class SingleSelectAdapter {
  static toCustom(config: BrSingleSelectConfig): CustomSingleSelectInput {
    return {
      id: config.id || config.controlId,
      name: config.name,
      className: config.className,
      label: config.label || '',
      value: config.value ?? '',
      options: [...(config.options || [])],
      disabled: config.disabled ?? false,
      required: config.required ?? false,
    };
  }

  static toMaterial(config: BrSingleSelectConfig): MaterialSingleSelectInput {
    return {
      id: config.id || config.controlId,
      name: config.name,
      className: config.className,
      label: config.label || '',
      value: config.value ?? '',
      options: [...(config.options || [])],
      disabled: config.disabled ?? false,
      required: config.required ?? false,
    };
  }
}
