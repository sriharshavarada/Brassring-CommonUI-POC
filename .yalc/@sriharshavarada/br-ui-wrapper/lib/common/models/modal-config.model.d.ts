/**
 * ============================================================
 * MODAL CONFIGURATION MODEL — Library-Agnostic JSON Schema
 * ============================================================
 *
 * This interface defines the shape of the JSON configuration
 * that consuming screens pass to <br-modal>.
 *
 * CRITICAL: This schema MUST NOT contain any Angular Material
 * or library-specific properties. It is the public contract.
 * ============================================================
 */
export interface BrModalField {
    id: string;
    type: 'text' | 'number' | 'radio' | 'checkbox' | 'select' | 'multiselect' | 'autocomplete' | 'textarea' | 'date';
    label: string;
    value?: any;
    placeholder?: string;
    options?: {
        label: string;
        value: any;
    }[];
    required?: boolean;
    disabled?: boolean;
    colSpan?: 1 | 2;
}
export interface BrModalAction {
    id: string;
    label: string;
    type?: 'primary' | 'secondary' | 'ghost' | 'danger';
    icon?: string;
    disabled?: boolean;
}
export interface BrModalUiConfig {
    size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
    showCloseButton?: boolean;
    isDismissible?: boolean;
    className?: string;
    tokens?: Record<string, string | number>;
}
export interface BrModalConfig {
    /** Whether the modal is currently open */
    isOpen: boolean;
    /** Title displayed in the modal header */
    title?: string;
    /** Subtitle or description in header */
    subtitle?: string;
    /**
     * Body content.
     * In a real app, this might be a component reference or template,
     * but for this POC we'll support simple text/HTML or a content ID.
     */
    content?: string;
    /**
     * Generic form fields to render in the modal body.
     * If provided, these will be rendered after the 'content' HTML.
     */
    fields?: BrModalField[];
    /** Footer actions */
    actions?: BrModalAction[];
    /** Visual configuration for the modal renderer */
    uiConfig?: BrModalUiConfig;
}
export interface BrModalActionEvent {
    actionId: string;
    label?: string;
    /** Current values of all fields in the modal, keyed by field ID */
    fieldValues?: Record<string, any>;
}
