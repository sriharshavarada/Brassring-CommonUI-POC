import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RuntimeUiConfigService } from './common';

@Component({
  selector: 'br-root',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'BR UI Framework POC';

  constructor(public readonly runtimeUiConfig: RuntimeUiConfigService) { }
}
