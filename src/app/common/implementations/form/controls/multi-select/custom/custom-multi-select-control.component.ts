import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { CustomMultiSelectInput } from '../../../../../adapters/multi-select.adapter';

@Component({
  selector: 'br-custom-multi-select-control',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './custom-multi-select-control.component.html',
  styleUrls: ['./custom-multi-select-control.component.scss'],
})
export class CustomMultiSelectControlComponent {
  @Input() config!: CustomMultiSelectInput;
  @Output() valueChange = new EventEmitter<any[]>();
  @Output() blurEvent = new EventEmitter<FocusEvent>();
  @Output() focusEvent = new EventEmitter<FocusEvent>();
  @Output() inputEvent = new EventEmitter<Event>();
  @Output() changeEvent = new EventEmitter<Event>();
  @Output() keydownEvent = new EventEmitter<KeyboardEvent>();
  @Output() keyupEvent = new EventEmitter<KeyboardEvent>();
  @Output() clickEvent = new EventEmitter<MouseEvent>();

  panelOpen = false;

  constructor(private readonly elementRef: ElementRef<HTMLElement>) {}

  get selectedValues(): any[] {
    return Array.isArray(this.config?.value) ? this.config.value : [];
  }

  get selectedLabels(): string[] {
    return this.config.options
      .filter((option) => this.selectedValues.includes(option.value))
      .map((option) => option.label);
  }

  togglePanel(event?: MouseEvent): void {
    if (this.config.disabled) {
      return;
    }
    if (event) {
      this.clickEvent.emit(event);
    }
    this.panelOpen = !this.panelOpen;
  }

  toggleValue(value: any, event?: Event): void {
    if (this.config.disabled) {
      return;
    }
    const next = [...this.selectedValues];
    const existingIdx = next.findIndex((item) => item === value);
    if (existingIdx >= 0) {
      next.splice(existingIdx, 1);
    } else {
      next.push(value);
    }
    if (event) {
      this.changeEvent.emit(event);
      this.inputEvent.emit(event);
    }
    this.valueChange.emit(next);
  }

  removeValue(value: any, event?: MouseEvent): void {
    event?.stopPropagation();
    if (this.config.disabled) {
      return;
    }
    if (event) {
      this.clickEvent.emit(event);
    }
    const next = this.selectedValues.filter((item) => item !== value);
    this.valueChange.emit(next);
  }

  isSelected(value: any): boolean {
    return this.selectedValues.includes(value);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.panelOpen) {
      return;
    }
    const host = this.elementRef.nativeElement;
    if (!host.contains(event.target as Node)) {
      this.panelOpen = false;
    }
  }
}
