import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { CustomRadioInput } from '../../../../../adapters/radio.adapter';

@Component({
  selector: 'br-custom-radio-control',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './custom-radio-control.component.html',
  styleUrls: ['./custom-radio-control.component.scss'],
})
export class CustomRadioControlComponent {
  @Input() config!: CustomRadioInput;
  @Output() valueChange = new EventEmitter<any>();
  @Output() blurEvent = new EventEmitter<FocusEvent>();
  @Output() focusEvent = new EventEmitter<FocusEvent>();
  @Output() inputEvent = new EventEmitter<Event>();
  @Output() changeEvent = new EventEmitter<Event>();
  @Output() keydownEvent = new EventEmitter<KeyboardEvent>();
  @Output() keyupEvent = new EventEmitter<KeyboardEvent>();
  @Output() clickEvent = new EventEmitter<MouseEvent>();
}
