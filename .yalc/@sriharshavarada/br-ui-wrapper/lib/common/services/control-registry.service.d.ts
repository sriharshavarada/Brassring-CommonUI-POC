import * as i0 from "@angular/core";
export type BrRegisteredControlType = 'text' | 'textArea' | 'date' | 'autocomplete' | 'radio' | 'checkbox' | 'singleSelect' | 'multiSelect';
export interface BrControlHandle {
    id?: string;
    name?: string;
    classes?: string[];
    type: BrRegisteredControlType;
    getValue: () => unknown;
}
export declare class ControlRegistryService {
    private readonly byId;
    private readonly byName;
    private readonly byClass;
    register(handle: BrControlHandle): void;
    unregister(handle: BrControlHandle): void;
    valueById(id: string): unknown;
    valuesByName(name: string): unknown[];
    valuesByClass(className: string): unknown[];
    private addToSetMap;
    private removeFromSetMap;
    static ɵfac: i0.ɵɵFactoryDeclaration<ControlRegistryService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ControlRegistryService>;
}
