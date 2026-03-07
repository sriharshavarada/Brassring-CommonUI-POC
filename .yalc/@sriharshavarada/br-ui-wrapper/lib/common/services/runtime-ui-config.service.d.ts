import { UiModeByControl } from '../config/ui-mode.config';
import * as i0 from "@angular/core";
export declare class RuntimeUiConfigService {
    private readonly modesSubject;
    readonly modes$: import("rxjs").Observable<UiModeByControl>;
    private readonly hasWindow;
    getModesSnapshot(): UiModeByControl;
    constructor();
    setModes(next: UiModeByControl): void;
    setMode<K extends keyof UiModeByControl>(control: K, mode: UiModeByControl[K]): void;
    resetToDefaults(): void;
    private loadInitialModes;
    private persist;
    private broadcast;
    private readonly onModesChanged;
    static ɵfac: i0.ɵɵFactoryDeclaration<RuntimeUiConfigService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RuntimeUiConfigService>;
}
