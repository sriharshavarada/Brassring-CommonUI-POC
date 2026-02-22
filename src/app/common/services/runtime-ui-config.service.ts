import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { UI_MODE_BY_CONTROL, UiModeByControl } from '../config/ui-mode.config';

const STORAGE_KEY = 'br-runtime-ui-modes';

@Injectable({ providedIn: 'root' })
export class RuntimeUiConfigService {
  private readonly modesSubject = new BehaviorSubject<UiModeByControl>(this.loadInitialModes());
  readonly modes$ = this.modesSubject.asObservable();

  getModesSnapshot(): UiModeByControl {
    return this.modesSubject.value;
  }

  setModes(next: UiModeByControl): void {
    this.modesSubject.next(next);
    this.persist(next);
  }

  setMode<K extends keyof UiModeByControl>(control: K, mode: UiModeByControl[K]): void {
    const updated: UiModeByControl = { ...this.modesSubject.value, [control]: mode };
    this.setModes(updated);
  }

  resetToDefaults(): void {
    this.setModes({ ...UI_MODE_BY_CONTROL });
  }

  private loadInitialModes(): UiModeByControl {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        return { ...UI_MODE_BY_CONTROL };
      }
      const parsed = JSON.parse(raw) as Partial<UiModeByControl> & { form?: UiModeByControl['text'] };
      const legacyFormMode = parsed.form;
      return {
        grid: parsed.grid ?? UI_MODE_BY_CONTROL.grid,
        date: parsed.date ?? UI_MODE_BY_CONTROL.date,
        modal: parsed.modal ?? UI_MODE_BY_CONTROL.modal,
        text: parsed.text ?? legacyFormMode ?? UI_MODE_BY_CONTROL.text,
        singleSelect: parsed.singleSelect ?? legacyFormMode ?? UI_MODE_BY_CONTROL.singleSelect,
        multiSelect: parsed.multiSelect ?? legacyFormMode ?? UI_MODE_BY_CONTROL.multiSelect,
        checkbox: parsed.checkbox ?? legacyFormMode ?? UI_MODE_BY_CONTROL.checkbox,
        radio: parsed.radio ?? legacyFormMode ?? UI_MODE_BY_CONTROL.radio,
        autocomplete: parsed.autocomplete ?? legacyFormMode ?? UI_MODE_BY_CONTROL.autocomplete,
      };
    } catch {
      return { ...UI_MODE_BY_CONTROL };
    }
  }

  private persist(modes: UiModeByControl): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(modes));
    } catch {
      // Ignore storage issues in restricted environments.
    }
  }
}
