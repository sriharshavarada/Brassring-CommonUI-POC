import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

import { JsonNodeChange, JsonTreeNodeComponent } from '../json-tree-node/json-tree-node.component';

@Component({
  selector: 'app-json-workbench',
  standalone: true,
  imports: [CommonModule, JsonTreeNodeComponent],
  templateUrl: './json-workbench.component.html',
  styleUrls: ['./json-workbench.component.scss'],
})
export class JsonWorkbenchComponent implements OnChanges {
  @Input() title = 'JSON';
  @Input() value: any;

  @Output() valueChange = new EventEmitter<any>();

  editorText = '{}';
  parseError = '';
  model: any = {};

  collapsedPaths = new Set<string>();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['value']) {
      const incoming = this.clone(this.value);
      const shouldPreserveCollapseState = this.areEqual(incoming, this.model);

      this.model = incoming;
      this.editorText = this.stringify(this.model);
      this.parseError = '';

      // Keep expand/collapse state for in-place edits.
      // Reset only when a different config is loaded (preset switch, tab change, etc).
      if (!shouldPreserveCollapseState) {
        this.collapsedPaths.clear();
      }
    }
  }

  onRawInput(text: string): void {
    this.editorText = text;
    try {
      const parsed = JSON.parse(text);
      this.model = parsed;
      this.parseError = '';
      this.valueChange.emit(this.clone(this.model));
    } catch (error) {
      this.parseError = error instanceof Error ? error.message : 'Invalid JSON';
    }
  }

  onRawBlur(): void {
    if (!this.parseError) {
      this.editorText = this.stringify(this.model);
    }
  }

  collapseAll(): void {
    this.collapsedPaths = new Set(this.collectCompositePaths(this.model, []));
  }

  expandAll(): void {
    this.collapsedPaths.clear();
  }

  onNodeChange(change: JsonNodeChange): void {
    this.setValueAtPath(this.model, change.path, change.value);
    this.editorText = this.stringify(this.model);
    this.valueChange.emit(this.clone(this.model));
  }

  private collectCompositePaths(value: any, path: Array<string | number>): string[] {
    if (!value || typeof value !== 'object') {
      return [];
    }

    const currentPath = JSON.stringify(path);
    const nested: string[] = [];

    if (Array.isArray(value)) {
      value.forEach((item, index) => {
        nested.push(...this.collectCompositePaths(item, [...path, index]));
      });
    } else {
      Object.keys(value).forEach((key) => {
        nested.push(...this.collectCompositePaths(value[key], [...path, key]));
      });
    }

    return path.length === 0 ? nested : [currentPath, ...nested];
  }

  private setValueAtPath(root: any, path: Array<string | number>, value: any): void {
    if (path.length === 0) {
      this.model = value;
      return;
    }

    let cursor = root;
    for (let i = 0; i < path.length - 1; i += 1) {
      cursor = cursor[path[i]];
    }

    cursor[path[path.length - 1]] = value;
  }

  private stringify(value: any): string {
    return JSON.stringify(value, null, 2);
  }

  private areEqual(left: any, right: any): boolean {
    return JSON.stringify(left) === JSON.stringify(right);
  }

  private clone<T>(value: T): T {
    return JSON.parse(JSON.stringify(value)) as T;
  }
}
