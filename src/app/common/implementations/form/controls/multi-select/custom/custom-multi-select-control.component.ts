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

  togglePanel(): void {
    if (this.config.disabled) {
      return;
    }
    this.panelOpen = !this.panelOpen;
  }

  toggleValue(value: any): void {
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
    this.valueChange.emit(next);
  }

  removeValue(value: any, event?: MouseEvent): void {
    event?.stopPropagation();
    if (this.config.disabled) {
      return;
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
