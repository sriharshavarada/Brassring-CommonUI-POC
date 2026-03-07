import { BrTextAreaConfig } from '../models/controls-config.model';
export interface CustomTextAreaInput {
    id?: string;
    name?: string;
    className?: string;
    label: string;
    value: string;
    placeholder: string;
    disabled: boolean;
    required: boolean;
    rows: number;
    maxLength?: number;
}
export interface MaterialTextAreaInput {
    id?: string;
    name?: string;
    className?: string;
    label: string;
    value: string;
    placeholder: string;
    disabled: boolean;
    required: boolean;
    rows: number;
    maxLength?: number;
}
export interface PrimeTextAreaInput extends CustomTextAreaInput {
}
export declare class TextAreaAdapter {
    static toCustom(config: BrTextAreaConfig): CustomTextAreaInput;
    static toMaterial(config: BrTextAreaConfig): MaterialTextAreaInput;
    static toPrime(config: BrTextAreaConfig): PrimeTextAreaInput;
}
