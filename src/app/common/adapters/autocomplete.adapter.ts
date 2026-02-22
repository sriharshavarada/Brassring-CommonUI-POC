import { BrAutocompleteConfig, BrOption } from '../models/controls-config.model';

export interface CustomAutocompleteInput {
  listId: string;
  label: string;
  value: string;
  options: BrOption[];
  placeholder: string;
  disabled: boolean;
}

export interface MaterialAutocompleteInput {
  label: string;
  value: string;
  options: BrOption[];
  placeholder: string;
  disabled: boolean;
}

export class AutocompleteAdapter {
  static toCustom(config: BrAutocompleteConfig): CustomAutocompleteInput {
    const label = config.label || '';
    return {
      listId: `${label || 'autocomplete'}-list`.toLowerCase().replace(/\s+/g, '-'),
      label,
      value: config.value || '',
      options: [...(config.options || [])],
      placeholder: config.placeholder || '',
      disabled: config.disabled ?? false,
    };
  }

  static toMaterial(config: BrAutocompleteConfig): MaterialAutocompleteInput {
    return {
      label: config.label || '',
      value: config.value || '',
      options: [...(config.options || [])],
      placeholder: config.placeholder || '',
      disabled: config.disabled ?? false,
    };
  }
}
