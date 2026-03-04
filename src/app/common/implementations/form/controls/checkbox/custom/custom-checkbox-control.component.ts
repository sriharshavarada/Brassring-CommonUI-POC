import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { CustomCheckboxInput } from '../../../../../adapters/checkbox.adapter';

@Component({
  selector: 'br-custom-checkbox-control',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './custom-checkbox-control.component.html',
  styleUrls: ['./custom-checkbox-control.component.scss'],
})
export class CustomCheckboxControlComponent {
  @Input() config!: CustomCheckboxInput;
  @Output() valueChange = new EventEmitter<boolean>();
  @Output() blurEvent = new EventEmitter<FocusEvent>();
  @Output() focusEvent = new EventEmitter<FocusEvent>();
  @Output() inputEvent = new EventEmitter<Event>();
  @Output() changeEvent = new EventEmitter<Event>();
  @Output() keydownEvent = new EventEmitter<KeyboardEvent>();
  @Output() keyupEvent = new EventEmitter<KeyboardEvent>();
  @Output() clickEvent = new EventEmitter<MouseEvent>();
}
