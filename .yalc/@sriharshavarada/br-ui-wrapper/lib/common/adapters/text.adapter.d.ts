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
export interface PrimeTextInput extends CustomTextInput {
}
export declare class TextAdapter {
    static toCustom(config: BrTextConfig): CustomTextInput;
    static toMaterial(config: BrTextConfig): MaterialTextInput;
    static toPrime(config: BrTextConfig): PrimeTextInput;
}
