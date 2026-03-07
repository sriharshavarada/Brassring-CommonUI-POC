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
export interface PrimeAutocompleteInput extends MaterialAutocompleteInput {
}
export declare class AutocompleteAdapter {
    static toCustom(config: BrAutocompleteConfig): CustomAutocompleteInput;
    static toMaterial(config: BrAutocompleteConfig): MaterialAutocompleteInput;
    static toPrime(config: BrAutocompleteConfig): PrimeAutocompleteInput;
}
