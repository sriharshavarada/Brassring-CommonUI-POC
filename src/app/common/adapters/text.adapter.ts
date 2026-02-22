import { BrTextConfig } from '../models/controls-config.model';

export interface CustomTextInput {
  label: string;
  value: string;
  placeholder: string;
  disabled: boolean;
  required: boolean;
}

export interface MaterialTextInput {
  label: string;
  value: string;
  placeholder: string;
  disabled: boolean;
  required: boolean;
}

export class TextAdapter {
  static toCustom(config: BrTextConfig): CustomTextInput {
    return {
      label: config.label || '',
      value: config.value || '',
      placeholder: config.placeholder || '',
      disabled: config.disabled ?? false,
      required: config.required ?? false,
    };
  }

  static toMaterial(config: BrTextConfig): MaterialTextInput {
    return {
      label: config.label || '',
      value: config.value || '',
      placeholder: config.placeholder || '',
      disabled: config.disabled ?? false,
      required: config.required ?? false,
    };
  }
}
