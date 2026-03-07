import { BrOption, BrRadioConfig } from '../models/controls-config.model';
export interface CustomRadioInput {
    id?: string;
    name: string;
    className?: string;
    label: string;
    value: any;
    options: BrOption[];
    disabled: boolean;
    required: boolean;
}
export interface MaterialRadioInput {
    id?: string;
    name: string;
    className?: string;
    label: string;
    value: any;
    options: BrOption[];
    disabled: boolean;
    required: boolean;
}
export interface PrimeRadioInput extends CustomRadioInput {
}
export declare class RadioAdapter {
    static toCustom(config: BrRadioConfig): CustomRadioInput;
    static toMaterial(config: BrRadioConfig): MaterialRadioInput;
    static toPrime(config: BrRadioConfig): PrimeRadioInput;
    private static toName;
}
