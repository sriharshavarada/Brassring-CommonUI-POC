import { BrAutocompleteConfig, BrOption } from '../models/controls-config.model';

export interface CustomAutocompleteInput {
  id?: string;
  name?: string;
  className?: string;
  listId: string;
  label: string;
  value: string;
  options: BrOption[];
  placeholder: string;
  disabled: boolean;
  required: boolean;
}

export interface MaterialAutocompleteInput {
  id?: string;
  name?: string;
  className?: string;
  label: string;
  value: string;
  options: BrOption[];
  placeholder: string;
  disabled: boolean;
  required: boolean;
}

export class AutocompleteAdapter {
  static toCustom(config: BrAutocompleteConfig): CustomAutocompleteInput {
    const label = config.label || '';
    const id = config.id || config.controlId;
    return {
      id,
      name: config.name,
      className: config.className,
      listId: `${id || label || 'autocomplete'}-list`.toLowerCase().replace(/\s+/g, '-'),
      label,
      value: config.value || '',
      options: [...(config.options || [])],
      placeholder: config.placeholder || '',
      disabled: config.disabled ?? false,
      required: config.required ?? false,
    };
  }

  static toMaterial(config: BrAutocompleteConfig): MaterialAutocompleteInput {
    return {
      id: config.id || config.controlId,
      name: config.name,
      className: config.className,
      label: config.label || '',
      value: config.value || '',
      options: [...(config.options || [])],
      placeholder: config.placeholder || '',
      disabled: config.disabled ?? false,
      required: config.required ?? false,
    };
  }
}
