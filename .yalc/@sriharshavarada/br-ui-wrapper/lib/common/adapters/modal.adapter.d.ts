/**
 * ============================================================
 * MODAL ADAPTER — Transforms generic JSON → implementation inputs
 * ============================================================
 *
 * Transforms the library-agnostic BrModalConfig into whatever
 * format each implementation component needs.
 * ============================================================
 */
import { BrModalConfig, BrModalUiConfig, BrModalAction, BrModalField } from '../models/modal-config.model';
export interface CustomModalInput {
    isOpen: boolean;
    title: string;
    subtitle: string;
    content: string;
    fields: BrModalField[];
    actions: BrModalAction[];
    uiConfig: Required<Omit<BrModalUiConfig, 'tokens' | 'className'>> & {
        className: string;
        tokens: Record<string, string | number>;
    };
}
export interface MaterialModalInput {
    isOpen: boolean;
    title: string;
    subtitle: string;
    content: string;
    fields: BrModalField[];
    actions: BrModalAction[];
    uiConfig: Required<Omit<BrModalUiConfig, 'tokens' | 'className'>> & {
        className: string;
        tokens: Record<string, string | number>;
    };
}
export interface PrimeModalInput extends MaterialModalInput {
}
export declare class ModalAdapter {
    /**
     * Transform generic config → Custom modal input
     */
    static toCustom(config: BrModalConfig): CustomModalInput;
    /**
     * Transform generic config → Material modal input
     */
    static toMaterial(config: BrModalConfig): MaterialModalInput;
    /**
     * Transform generic config → PrimeNG modal input
     */
    static toPrime(config: BrModalConfig): PrimeModalInput;
}
