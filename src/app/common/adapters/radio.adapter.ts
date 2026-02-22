import { BrOption, BrRadioConfig } from '../models/controls-config.model';

export interface CustomRadioInput {
  name: string;
  label: string;
  value: any;
  options: BrOption[];
  disabled: boolean;
}

export interface MaterialRadioInput {
  name: string;
  label: string;
  value: any;
  options: BrOption[];
  disabled: boolean;
}

export class RadioAdapter {
  static toCustom(config: BrRadioConfig): CustomRadioInput {
    return {
      name: RadioAdapter.toName(config.label),
      label: config.label || '',
      value: config.value ?? '',
      options: [...(config.options || [])],
      disabled: config.disabled ?? false,
    };
  }

  static toMaterial(config: BrRadioConfig): MaterialRadioInput {
    return {
      name: RadioAdapter.toName(config.label),
      label: config.label || '',
      value: config.value ?? '',
      options: [...(config.options || [])],
      disabled: config.disabled ?? false,
    };
  }

  private static toName(value: string | undefined): string {
    return (value || 'radio').trim().toLowerCase().replace(/\s+/g, '-');
  }
}
