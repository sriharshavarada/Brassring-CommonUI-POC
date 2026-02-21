import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, forwardRef } from '@angular/core';
import { FormsModule } from '@angular/forms';

export interface JsonNodeChange {
  path: Array<string | number>;
  value: any;
}

@Component({
  selector: 'app-json-tree-node',
  standalone: true,
  imports: [CommonModule, FormsModule, forwardRef(() => JsonTreeNodeComponent)],
  templateUrl: './json-tree-node.component.html',
  styleUrls: ['./json-tree-node.component.scss'],
})
export class JsonTreeNodeComponent {
  @Input() keyLabel = 'root';
  @Input() value: any;
  @Input() path: Array<string | number> = [];
  @Input() depth = 0;
  @Input() collapsedPaths = new Set<string>();
  @Input() isRoot = false;

  @Output() nodeChange = new EventEmitter<JsonNodeChange>();

  get isArray(): boolean {
    return Array.isArray(this.value);
  }

  get isObject(): boolean {
    return !!this.value && typeof this.value === 'object' && !Array.isArray(this.value);
  }

  get isComposite(): boolean {
    return this.isArray || this.isObject;
  }

  get typeLabel(): string {
    if (this.value === null) return 'null';
    if (this.isArray) return 'array';
    return typeof this.value;
  }

  get pathKey(): string {
    return JSON.stringify(this.path);
  }

  get isCollapsed(): boolean {
    return this.collapsedPaths.has(this.pathKey);
  }

  get displayValue(): string {
    if (this.value === null) return 'null';
    return String(this.value);
  }

  objectKeys(value: any): string[] {
    return Object.keys(value || {});
  }

  childPath(key: string | number): Array<string | number> {
    return [...this.path, key];
  }

  childPathKey(key: string | number): string {
    return JSON.stringify(this.childPath(key));
  }

  toggleCollapse(): void {
    if (!this.isComposite) return;
    if (this.isCollapsed) {
      this.collapsedPaths.delete(this.pathKey);
    } else {
      this.collapsedPaths.add(this.pathKey);
    }
  }

  onBooleanChange(checked: boolean): void {
    this.emitChange(checked);
  }

  onNumberChange(raw: string): void {
    const next = Number(raw);
    if (!Number.isNaN(next)) {
      this.emitChange(next);
    }
  }

  onTextChange(raw: string): void {
    if (this.value === null) {
      this.emitChange(this.parseNullInput(raw));
      return;
    }

    if (typeof this.value === 'string') {
      this.emitChange(raw);
      return;
    }

    this.emitChange(raw);
  }

  trackByIndex(index: number): number {
    return index;
  }

  trackByKey(_: number, key: string): string {
    return key;
  }

  private emitChange(value: any): void {
    this.nodeChange.emit({ path: [...this.path], value });
  }

  private parseNullInput(raw: string): any {
    const text = raw.trim();
    if (text === '' || text.toLowerCase() === 'null') return null;
    if (text.toLowerCase() === 'true') return true;
    if (text.toLowerCase() === 'false') return false;

    const maybeNumber = Number(text);
    if (!Number.isNaN(maybeNumber) && text !== '') {
      return maybeNumber;
    }

    return text;
  }
}
