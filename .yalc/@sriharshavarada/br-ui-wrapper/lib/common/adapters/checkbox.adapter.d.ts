import { BrCheckboxConfig } from '../models/controls-config.model';
export interface CustomCheckboxInput {
    id?: string;
    name?: string;
    className?: string;
    label: string;
    checked: boolean;
    required: boolean;
    disabled: boolean;
}
export interface MaterialCheckboxInput {
    id?: string;
    name?: string;
    className?: string;
    label: string;
    checked: boolean;
    required: boolean;
    disabled: boolean;
}
export interface PrimeCheckboxInput extends CustomCheckboxInput {
}
export declare class CheckboxAdapter {
    static toCustom(config: BrCheckboxConfig): CustomCheckboxInput;
    static toMaterial(config: BrCheckboxConfig): MaterialCheckboxInput;
    static toPrime(config: BrCheckboxConfig): PrimeCheckboxInput;
}
