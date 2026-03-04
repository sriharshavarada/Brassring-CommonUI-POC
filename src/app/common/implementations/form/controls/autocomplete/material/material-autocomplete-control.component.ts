import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { MaterialAutocompleteInput } from '../../../../../adapters/autocomplete.adapter';

@Component({
  selector: 'br-material-autocomplete-control',
  standalone: true,
  imports: [CommonModule, FormsModule, MatAutocompleteModule, MatInputModule, MatFormFieldModule],
  templateUrl: './material-autocomplete-control.component.html',
  styleUrls: ['./material-autocomplete-control.component.scss'],
})
export class MaterialAutocompleteControlComponent {
  @Input() config!: MaterialAutocompleteInput;
  @Output() valueChange = new EventEmitter<string>();
  @Output() blurEvent = new EventEmitter<FocusEvent>();
  @Output() focusEvent = new EventEmitter<FocusEvent>();
  @Output() inputEvent = new EventEmitter<Event>();
  @Output() changeEvent = new EventEmitter<Event>();
  @Output() keydownEvent = new EventEmitter<KeyboardEvent>();
  @Output() keyupEvent = new EventEmitter<KeyboardEvent>();
  @Output() clickEvent = new EventEmitter<MouseEvent>();

  filtered(): Array<{ label: string; value: any }> {
    const term = (this.config?.value || '').toLowerCase();
    return (this.config?.options || []).filter((o) => o.label.toLowerCase().includes(term));
  }
}
