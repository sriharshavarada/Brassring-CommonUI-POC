import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

import { MaterialMultiSelectInput } from '../../../../../adapters/multi-select.adapter';

@Component({
  selector: 'br-material-multi-select-control',
  standalone: true,
  imports: [CommonModule, FormsModule, MatCheckboxModule, MatFormFieldModule, MatSelectModule],
  templateUrl: './material-multi-select-control.component.html',
  styleUrls: ['./material-multi-select-control.component.scss'],
})
export class MaterialMultiSelectControlComponent {
  @Input() config!: MaterialMultiSelectInput;
  @Output() valueChange = new EventEmitter<any[]>();

  get selectedValues(): any[] {
    return Array.isArray(this.config?.value) ? this.config.value : [];
  }

  get selectedLabels(): string[] {
    return this.config.options
      .filter((option) => this.selectedValues.includes(option.value))
      .map((option) => option.label);
  }

  isSelected(value: any): boolean {
    return this.selectedValues.includes(value);
  }

  removeValue(value: any): void {
    if (this.config.disabled) {
      return;
    }
    this.valueChange.emit(this.selectedValues.filter((item) => item !== value));
  }
}
