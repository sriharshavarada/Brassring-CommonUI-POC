/**
 * ============================================================
 * MODAL ADAPTER — Transforms generic JSON → implementation inputs
 * ============================================================
 *
 * Transforms the library-agnostic BrModalConfig into whatever
 * format each implementation component needs.
 * ============================================================
 */

import { BrModalConfig, BrModalUiConfig, BrModalAction } from '../models/modal-config.model';

// ─── Custom Modal adapted output ──────────────────────────────
export interface CustomModalInput {
    isOpen: boolean;
    title: string;
    subtitle: string;
    content: string;
    actions: BrModalAction[];
    uiConfig: Required<Omit<BrModalUiConfig, 'tokens' | 'className'>> & {
        className: string;
        tokens: Record<string, string | number>;
    };
}

// ─── Material Modal adapted output ────────────────────────────
export interface MaterialModalInput {
    isOpen: boolean;
    title: string;
    subtitle: string;
    content: string;
    actions: BrModalAction[];
    uiConfig: Required<Omit<BrModalUiConfig, 'tokens' | 'className'>> & {
        className: string;
        tokens: Record<string, string | number>;
    };
}

export class ModalAdapter {

    /**
     * Transform generic config → Custom modal input
     */
    static toCustom(config: BrModalConfig): CustomModalInput {
        return {
            isOpen: config.isOpen ?? false,
            title: config.title || '',
            subtitle: config.subtitle || '',
            content: config.content || '',
            actions: config.actions || [],
            uiConfig: {
                size: config.uiConfig?.size ?? 'md',
                showCloseButton: config.uiConfig?.showCloseButton ?? true,
                isDismissible: config.uiConfig?.isDismissible ?? true,
                className: config.uiConfig?.className ?? '',
                tokens: config.uiConfig?.tokens ?? {},
            },
        };
    }

    /**
     * Transform generic config → Material modal input
     */
    static toMaterial(config: BrModalConfig): MaterialModalInput {
        // MatDialog usually needs a slightly different structure if using MatDialogConfig,
        // but since we are wrapping it in a component, we can keep it similar.
        return {
            isOpen: config.isOpen ?? false,
            title: config.title || '',
            subtitle: config.subtitle || '',
            content: config.content || '',
            actions: config.actions || [],
            uiConfig: {
                size: config.uiConfig?.size ?? 'md',
                showCloseButton: config.uiConfig?.showCloseButton ?? true,
                isDismissible: config.uiConfig?.isDismissible ?? true,
                className: config.uiConfig?.className ?? '',
                tokens: config.uiConfig?.tokens ?? {},
            },
        };
    }
}
