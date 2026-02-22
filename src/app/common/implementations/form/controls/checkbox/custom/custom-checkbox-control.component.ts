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
}
