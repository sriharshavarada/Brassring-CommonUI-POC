export type BrControlEventType = 'valueChange' | 'blur' | 'focus' | 'input' | 'change' | 'keydown' | 'keyup' | 'click';
export interface BrControlEvent<TValue = unknown> {
    type: BrControlEventType;
    id?: string;
    name?: string;
    className?: string;
    value?: TValue;
    meta?: Record<string, any>;
    originalEvent?: Event;
}
