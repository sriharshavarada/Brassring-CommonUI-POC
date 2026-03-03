import { BrTextConfig } from '../models/controls-config.model';

export interface CustomTextInput {
  id?: string;
  name?: string;
  className?: string;
  label: string;
  value: string;
  placeholder: string;
  disabled: boolean;
  required: boolean;
}

export interface MaterialTextInput {
  id?: string;
  name?: string;
  className?: string;
  label: string;
  value: string;
  placeholder: string;
  disabled: boolean;
  required: boolean;
}

export class TextAdapter {
  static toCustom(config: BrTextConfig): CustomTextInput {
    return {
      id: config.id || config.controlId,
      name: config.name,
      className: config.className,
      label: config.label || '',
      value: config.value || '',
      placeholder: config.placeholder || '',
      disabled: config.disabled ?? false,
      required: config.required ?? false,
    };
  }

  static toMaterial(config: BrTextConfig): MaterialTextInput {
    return {
      id: config.id || config.controlId,
      name: config.name,
      className: config.className,
      label: config.label || '',
      value: config.value || '',
      placeholder: config.placeholder || '',
      disabled: config.disabled ?? false,
      required: config.required ?? false,
    };
  }
}
