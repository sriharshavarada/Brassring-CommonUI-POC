import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';

import { MaterialRadioInput } from '../../../../../adapters/radio.adapter';

@Component({
  selector: 'br-material-radio-control',
  standalone: true,
  imports: [CommonModule, FormsModule, MatRadioModule],
  templateUrl: './material-radio-control.component.html',
  styleUrls: ['./material-radio-control.component.scss'],
})
export class MaterialRadioControlComponent {
  @Input() config!: MaterialRadioInput;
  @Output() valueChange = new EventEmitter<any>();
}
