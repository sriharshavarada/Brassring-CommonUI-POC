import { BrMultiSelectConfig, BrOption } from '../models/controls-config.model';
export interface CustomMultiSelectInput {
    id?: string;
    name?: string;
    className?: string;
    label: string;
    value: any[];
    options: BrOption[];
    disabled: boolean;
    required: boolean;
}
export interface MaterialMultiSelectInput {
    id?: string;
    name?: string;
    className?: string;
    label: string;
    value: any[];
    options: BrOption[];
    disabled: boolean;
    required: boolean;
}
export interface PrimeMultiSelectInput extends MaterialMultiSelectInput {
}
export declare class MultiSelectAdapter {
    static toCustom(config: BrMultiSelectConfig): CustomMultiSelectInput;
    static toMaterial(config: BrMultiSelectConfig): MaterialMultiSelectInput;
    static toPrime(config: BrMultiSelectConfig): PrimeMultiSelectInput;
}
