import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { CustomAutocompleteInput } from '../../../../../adapters/autocomplete.adapter';

@Component({
  selector: 'br-custom-autocomplete-control',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './custom-autocomplete-control.component.html',
  styleUrls: ['./custom-autocomplete-control.component.scss'],
})
export class CustomAutocompleteControlComponent {
  @Input() config!: CustomAutocompleteInput;
  @Output() valueChange = new EventEmitter<string>();
  @Output() blurEvent = new EventEmitter<FocusEvent>();
  @Output() focusEvent = new EventEmitter<FocusEvent>();
  @Output() inputEvent = new EventEmitter<Event>();
  @Output() changeEvent = new EventEmitter<Event>();
  @Output() keydownEvent = new EventEmitter<KeyboardEvent>();
  @Output() keyupEvent = new EventEmitter<KeyboardEvent>();
  @Output() clickEvent = new EventEmitter<MouseEvent>();
}
