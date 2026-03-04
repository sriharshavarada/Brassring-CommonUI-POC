export interface BrOption {
  label: string;
  value: any;
}

export interface BrTextConfig {
  id?: string;
  controlId?: string;
  name?: string;
  className?: string;
  meta?: Record<string, any>;
  label: string;
  value: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
}

export interface BrSingleSelectConfig {
  id?: string;
  controlId?: string;
  name?: string;
  className?: string;
  meta?: Record<string, any>;
  label: string;
  value: any;
  options: BrOption[];
  disabled?: boolean;
  required?: boolean;
}

export interface BrMultiSelectConfig {
  id?: string;
  controlId?: string;
  name?: string;
  className?: string;
  meta?: Record<string, any>;
  label: string;
  value: any[];
  options: BrOption[];
  disabled?: boolean;
  required?: boolean;
}

export interface BrCheckboxConfig {
  id?: string;
  controlId?: string;
  name?: string;
  className?: string;
  meta?: Record<string, any>;
  label: string;
  value?: boolean;
  checked: boolean;
  disabled?: boolean;
  required?: boolean;
}

export interface BrRadioConfig {
  id?: string;
  controlId?: string;
  name?: string;
  className?: string;
  meta?: Record<string, any>;
  label: string;
  value: any;
  options: BrOption[];
  disabled?: boolean;
  required?: boolean;
}

export interface BrAutocompleteConfig {
  id?: string;
  controlId?: string;
  name?: string;
  className?: string;
  meta?: Record<string, any>;
  label: string;
  value: string;
  options: BrOption[];
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
}
