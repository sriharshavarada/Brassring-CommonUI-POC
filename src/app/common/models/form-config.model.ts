export type BrFormFieldType =
  | 'text'
  | 'single-select'
  | 'multi-select'
  | 'checkbox'
  | 'radio'
  | 'date'
  | 'autocomplete';

export interface BrFormOption {
  label: string;
  value: any;
}

export interface BrFormField {
  id: string;
  type: BrFormFieldType;
  label: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  options?: BrFormOption[];
  hint?: string;
}

export interface BrFormUiConfig {
  density?: 'compact' | 'comfortable' | 'spacious';
  size?: 'sm' | 'md' | 'lg';
  variant?: 'outline' | 'filled' | 'plain';
  className?: string;
  tokens?: Record<string, string | number>;
}

export interface BrFormConfig {
  title?: string;
  description?: string;
  fields: BrFormField[];
  value?: Record<string, any>;
  showActions?: boolean;
  submitLabel?: string;
  resetLabel?: string;
  uiConfig?: BrFormUiConfig;
}

export type BrFormActionSource = 'change' | 'submit' | 'reset';

export interface BrFormActionEvent {
  source: BrFormActionSource;
  fieldId?: string;
  value?: any;
  values: Record<string, any>;
}
