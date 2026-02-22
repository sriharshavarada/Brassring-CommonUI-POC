import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
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
  pagesMenuOpen = false;
  modesMenuOpen = false;

  @ViewChild('pagesMenuRef') pagesMenuRef?: ElementRef<HTMLElement>;
  @ViewChild('modesMenuRef') modesMenuRef?: ElementRef<HTMLElement>;

  constructor(public readonly runtimeUiConfig: RuntimeUiConfigService) { }

  get modes() {
    return this.runtimeUiConfig.getModesSnapshot();
  }

  togglePagesMenu(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.pagesMenuOpen = !this.pagesMenuOpen;
    if (this.pagesMenuOpen) {
      this.modesMenuOpen = false;
    }
  }

  toggleModesMenu(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.modesMenuOpen = !this.modesMenuOpen;
    if (this.modesMenuOpen) {
      this.pagesMenuOpen = false;
    }
  }

  closeMenus(): void {
    this.pagesMenuOpen = false;
    this.modesMenuOpen = false;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as Node | null;
    if (!target) return;

    const inPages = !!this.pagesMenuRef?.nativeElement.contains(target);
    const inModes = !!this.modesMenuRef?.nativeElement.contains(target);

    if (!inPages) {
      this.pagesMenuOpen = false;
    }
    if (!inModes) {
      this.modesMenuOpen = false;
    }
  }
}
