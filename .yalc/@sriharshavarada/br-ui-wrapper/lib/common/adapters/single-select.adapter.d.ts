import { BrOption, BrSingleSelectConfig } from '../models/controls-config.model';
export interface CustomSingleSelectInput {
    id?: string;
    name?: string;
    className?: string;
    label: string;
    value: any;
    options: BrOption[];
    disabled: boolean;
    required: boolean;
}
export interface MaterialSingleSelectInput {
    id?: string;
    name?: string;
    className?: string;
    label: string;
    value: any;
    options: BrOption[];
    disabled: boolean;
    required: boolean;
}
export interface PrimeSingleSelectInput extends MaterialSingleSelectInput {
}
export declare class SingleSelectAdapter {
    static toCustom(config: BrSingleSelectConfig): CustomSingleSelectInput;
    static toMaterial(config: BrSingleSelectConfig): MaterialSingleSelectInput;
    static toPrime(config: BrSingleSelectConfig): PrimeSingleSelectInput;
}
