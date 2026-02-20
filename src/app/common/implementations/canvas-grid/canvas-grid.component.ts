import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CanvasGridInput } from '../../adapters/grid.adapter';
import { BrGridActionEvent } from '../../models/grid-config.model';
import { GridShellComponent } from '../grid-shell/grid-shell.component';

@Component({
  selector: 'br-canvas-grid',
  standalone: true,
  imports: [CommonModule, GridShellComponent],
  templateUrl: './canvas-grid.component.html',
  styleUrls: ['./canvas-grid.component.scss'],
})
export class CanvasGridComponent {
  @Input() config!: CanvasGridInput;
  @Output() action = new EventEmitter<BrGridActionEvent>();
}
