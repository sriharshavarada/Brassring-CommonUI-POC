import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { MaterialTextInput } from '../../../../../adapters/text.adapter';

@Component({
  selector: 'br-material-text-control',
  standalone: true,
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './material-text-control.component.html',
  styleUrls: ['./material-text-control.component.scss'],
})
export class MaterialTextControlComponent {
  @Input() config!: MaterialTextInput;
  @Output() valueChange = new EventEmitter<string>();
}
