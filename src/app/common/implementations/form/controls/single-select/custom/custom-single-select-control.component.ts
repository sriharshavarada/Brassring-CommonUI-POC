import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { CustomSingleSelectInput } from '../../../../../adapters/single-select.adapter';

@Component({
  selector: 'br-custom-single-select-control',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './custom-single-select-control.component.html',
  styleUrls: ['./custom-single-select-control.component.scss'],
})
export class CustomSingleSelectControlComponent {
  @Input() config!: CustomSingleSelectInput;
  @Output() valueChange = new EventEmitter<any>();
}
