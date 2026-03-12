import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import {
  ControlUiMode,
  DateUiMode,
  ModalUiMode,
  RuntimeUiConfigService,
  UiMode,
} from '@sriharshavarada/br-ui-wrapper';

type ModePanelKey =
  | 'grid'
  | 'date'
  | 'modal'
  | 'accordion'
  | 'text'
  | 'singleSelect'
  | 'multiSelect'
  | 'checkbox'
  | 'radio'
  | 'autocomplete';

interface ModePanelItem {
  key: ModePanelKey;
  label: string;
  hint: string;
}

@Component({
  selector: 'app-modes',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './modes.component.html',
  styleUrls: ['./modes.component.scss'],
})
export class ModesComponent {
  readonly gridModes: UiMode[] = ['CUSTOM', 'MATERIAL', 'CANVAS', 'PRIMENG'];
  readonly dateModes: DateUiMode[] = ['CUSTOM', 'MATERIAL', 'PRIMENG'];
  readonly modalModes: ModalUiMode[] = ['CUSTOM', 'MATERIAL', 'PRIMENG'];
  readonly controlModes: ControlUiMode[] = ['CUSTOM', 'MATERIAL', 'PRIMENG'];

  readonly coreModeItems: ModePanelItem[] = [
    { key: 'grid', label: 'Grid', hint: 'br-grid wrapper' },
    { key: 'modal', label: 'Modal Pop-up', hint: 'br-modal wrapper' },
    { key: 'accordion', label: 'Accordion', hint: 'br-accordion wrapper' },
  ];

  readonly controlModeItems: ModePanelItem[] = [
    { key: 'date', label: 'Date', hint: 'br-date wrapper' },
    { key: 'text', label: 'Text', hint: 'br-text wrapper' },
    { key: 'singleSelect', label: 'Single Select', hint: 'br-single-select wrapper' },
    { key: 'multiSelect', label: 'Multi Select', hint: 'br-multi-select wrapper' },
    { key: 'checkbox', label: 'Checkbox', hint: 'br-checkbox wrapper' },
    { key: 'radio', label: 'Radio', hint: 'br-radio wrapper' },
    { key: 'autocomplete', label: 'Autocomplete', hint: 'br-autocomplete wrapper' },
  ];

  constructor(public readonly runtimeUiConfig: RuntimeUiConfigService) { }

  get modes() {
    return this.runtimeUiConfig.getModesSnapshot();
  }

  setGridMode(mode: UiMode): void {
    this.runtimeUiConfig.setMode('grid', mode);
  }

  setDateMode(mode: DateUiMode): void {
    this.runtimeUiConfig.setMode('date', mode);
  }

  setModalMode(mode: ModalUiMode): void {
    this.runtimeUiConfig.setMode('modal', mode);
  }

  setAccordionMode(mode: ControlUiMode): void {
    this.runtimeUiConfig.setMode('accordion', mode);
  }

  setControlMode(
    control: 'text' | 'singleSelect' | 'multiSelect' | 'checkbox' | 'radio' | 'autocomplete',
    mode: ControlUiMode,
  ): void {
    this.runtimeUiConfig.setMode(control, mode);
  }

  setAllControlModes(mode: ControlUiMode): void {
    this.setDateMode(mode as DateUiMode);
    const controls: Array<'text' | 'singleSelect' | 'multiSelect' | 'checkbox' | 'radio' | 'autocomplete'> = [
      'text',
      'singleSelect',
      'multiSelect',
      'checkbox',
      'radio',
      'autocomplete',
    ];
    for (const control of controls) {
      this.runtimeUiConfig.setMode(control, mode);
    }
  }

  resetModes(): void {
    this.runtimeUiConfig.resetToDefaults();
  }

  modeOptionsFor(key: ModePanelKey): readonly string[] {
    if (key === 'grid') return this.gridModes;
    if (key === 'date') return this.dateModes;
    if (key === 'modal') return this.modalModes;
    if (key === 'accordion') return this.controlModes;
    return this.controlModes;
  }

  modeValueFor(key: ModePanelKey): string {
    return this.modes[key];
  }

  setModeFromPanel(key: ModePanelKey, mode: string): void {
    if (key === 'grid') {
      this.setGridMode(mode as UiMode);
      return;
    }
    if (key === 'date') {
      this.setDateMode(mode as DateUiMode);
      return;
    }
    if (key === 'modal') {
      this.setModalMode(mode as ModalUiMode);
      return;
    }
    if (key === 'accordion') {
      this.setAccordionMode(mode as ControlUiMode);
      return;
    }
    this.setControlMode(
      key as 'text' | 'singleSelect' | 'multiSelect' | 'checkbox' | 'radio' | 'autocomplete',
      mode as ControlUiMode,
    );
  }
}

