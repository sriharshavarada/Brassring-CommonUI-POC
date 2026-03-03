import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { CustomTextInput } from '../../../../../adapters/text.adapter';

@Component({
  selector: 'br-custom-text-control',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './custom-text-control.component.html',
  styleUrls: ['./custom-text-control.component.scss'],
})
export class CustomTextControlComponent {
  @Input() config!: CustomTextInput;
  @Output() valueChange = new EventEmitter<string>();
  @Output() blurEvent = new EventEmitter<FocusEvent>();
  @Output() focusEvent = new EventEmitter<FocusEvent>();
  @Output() inputEvent = new EventEmitter<Event>();
  @Output() changeEvent = new EventEmitter<Event>();
  @Output() keydownEvent = new EventEmitter<KeyboardEvent>();
  @Output() keyupEvent = new EventEmitter<KeyboardEvent>();
  @Output() clickEvent = new EventEmitter<MouseEvent>();
}
