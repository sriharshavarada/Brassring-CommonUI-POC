import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { MaterialCheckboxInput } from '../../../../../adapters/checkbox.adapter';

@Component({
  selector: 'br-material-checkbox-control',
  standalone: true,
  imports: [CommonModule, FormsModule, MatCheckboxModule],
  templateUrl: './material-checkbox-control.component.html',
  styleUrls: ['./material-checkbox-control.component.scss'],
})
export class MaterialCheckboxControlComponent {
  @Input() config!: MaterialCheckboxInput;
  @Output() valueChange = new EventEmitter<boolean>();
}
