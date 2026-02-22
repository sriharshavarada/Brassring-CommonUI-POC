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
}
