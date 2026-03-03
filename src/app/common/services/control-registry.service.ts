import { Injectable } from '@angular/core';

export type BrRegisteredControlType = 'text' | 'date';

export interface BrControlHandle {
  id?: string;
  name?: string;
  classes?: string[];
  type: BrRegisteredControlType;
  getValue: () => unknown;
}

@Injectable({ providedIn: 'root' })
export class ControlRegistryService {
  private readonly byId = new Map<string, BrControlHandle>();
  private readonly byName = new Map<string, Set<BrControlHandle>>();
  private readonly byClass = new Map<string, Set<BrControlHandle>>();

  register(handle: BrControlHandle): void {
    this.unregister(handle);

    if (handle.id) {
      this.byId.set(handle.id, handle);
    }

    if (handle.name) {
      this.addToSetMap(this.byName, handle.name, handle);
    }

    (handle.classes || []).forEach((className) => {
      if (className) {
        this.addToSetMap(this.byClass, className, handle);
      }
    });
  }

  unregister(handle: BrControlHandle): void {
    if (handle.id && this.byId.get(handle.id) === handle) {
      this.byId.delete(handle.id);
    }

    if (handle.name) {
      this.removeFromSetMap(this.byName, handle.name, handle);
    }

    (handle.classes || []).forEach((className) => {
      if (className) {
        this.removeFromSetMap(this.byClass, className, handle);
      }
    });
  }

  valueById(id: string): unknown {
    return this.byId.get(id)?.getValue();
  }

  valuesByName(name: string): unknown[] {
    return [...(this.byName.get(name) || [])].map((entry) => entry.getValue());
  }

  valuesByClass(className: string): unknown[] {
    return [...(this.byClass.get(className) || [])].map((entry) => entry.getValue());
  }

  private addToSetMap(
    map: Map<string, Set<BrControlHandle>>,
    key: string,
    handle: BrControlHandle,
  ): void {
    const set = map.get(key) || new Set<BrControlHandle>();
    set.add(handle);
    map.set(key, set);
  }

  private removeFromSetMap(
    map: Map<string, Set<BrControlHandle>>,
    key: string,
    handle: BrControlHandle,
  ): void {
    const set = map.get(key);
    if (!set) return;

    set.delete(handle);
    if (set.size === 0) {
      map.delete(key);
    } else {
      map.set(key, set);
    }
  }
}

