import { BrOption, BrRadioConfig } from '../models/controls-config.model';

export interface CustomRadioInput {
  id?: string;
  name: string;
  className?: string;
  label: string;
  value: any;
  options: BrOption[];
  disabled: boolean;
  required: boolean;
}

export interface MaterialRadioInput {
  id?: string;
  name: string;
  className?: string;
  label: string;
  value: any;
  options: BrOption[];
  disabled: boolean;
  required: boolean;
}

export class RadioAdapter {
  static toCustom(config: BrRadioConfig): CustomRadioInput {
    return {
      id: config.id || config.controlId,
      name: config.name || RadioAdapter.toName(config.label),
      className: config.className,
      label: config.label || '',
      value: config.value ?? '',
      options: [...(config.options || [])],
      disabled: config.disabled ?? false,
      required: config.required ?? false,
    };
  }

  static toMaterial(config: BrRadioConfig): MaterialRadioInput {
    return {
      id: config.id || config.controlId,
      name: config.name || RadioAdapter.toName(config.label),
      className: config.className,
      label: config.label || '',
      value: config.value ?? '',
      options: [...(config.options || [])],
      disabled: config.disabled ?? false,
      required: config.required ?? false,
    };
  }

  private static toName(value: string | undefined): string {
    return (value || 'radio').trim().toLowerCase().replace(/\s+/g, '-');
  }
}
