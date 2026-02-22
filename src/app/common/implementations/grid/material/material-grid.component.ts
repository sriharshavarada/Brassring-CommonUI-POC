import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialGridInput } from '../../../adapters/grid.adapter';
import { BrGridActionEvent } from '../../../models/grid-config.model';
import { GridShellComponent } from '../shell/grid-shell.component';

@Component({
  selector: 'br-material-grid',
  standalone: true,
  imports: [CommonModule, GridShellComponent],
  templateUrl: './material-grid.component.html',
  styleUrls: ['./material-grid.component.scss'],
})
export class MaterialGridComponent {
  @Input() config!: MaterialGridInput;
  @Output() action = new EventEmitter<BrGridActionEvent>();
}
