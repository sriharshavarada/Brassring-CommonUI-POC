import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

import { MaterialSingleSelectInput } from '../../../../../adapters/single-select.adapter';

@Component({
  selector: 'br-material-single-select-control',
  standalone: true,
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatSelectModule],
  templateUrl: './material-single-select-control.component.html',
  styleUrls: ['./material-single-select-control.component.scss'],
})
export class MaterialSingleSelectControlComponent {
  @Input() config!: MaterialSingleSelectInput;
  @Output() valueChange = new EventEmitter<any>();
}
