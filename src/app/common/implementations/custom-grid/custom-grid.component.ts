import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomGridInput } from '../../adapters/grid.adapter';
import { BrGridActionEvent } from '../../models/grid-config.model';
import { GridShellComponent } from '../grid-shell/grid-shell.component';

@Component({
  selector: 'br-custom-grid',
  standalone: true,
  imports: [CommonModule, GridShellComponent],
  templateUrl: './custom-grid.component.html',
  styleUrls: ['./custom-grid.component.scss'],
})
export class CustomGridComponent {
  @Input() config!: CustomGridInput;
  @Output() action = new EventEmitter<BrGridActionEvent>();
}
