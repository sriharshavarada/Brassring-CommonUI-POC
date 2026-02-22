export interface BrOption {
  label: string;
  value: any;
}

export interface BrTextConfig {
  label: string;
  value: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
}

export interface BrSingleSelectConfig {
  label: string;
  value: any;
  options: BrOption[];
  disabled?: boolean;
  required?: boolean;
}

export interface BrMultiSelectConfig {
  label: string;
  value: any[];
  options: BrOption[];
  disabled?: boolean;
}

export interface BrCheckboxConfig {
  label: string;
  checked: boolean;
  disabled?: boolean;
}

export interface BrRadioConfig {
  label: string;
  value: any;
  options: BrOption[];
  disabled?: boolean;
}

export interface BrAutocompleteConfig {
  label: string;
  value: string;
  options: BrOption[];
  placeholder?: string;
  disabled?: boolean;
}
