import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import {
  BrAutocompleteComponent,
  BrAutocompleteConfig,
  BrCheckboxComponent,
  BrCheckboxConfig,
  BrControlEvent,
  ControlRegistryService,
  BrDateComponent,
  BrDateConfig,
  BrMultiSelectComponent,
  BrMultiSelectConfig,
  BrRadioComponent,
  BrRadioConfig,
  BrSingleSelectComponent,
  BrSingleSelectConfig,
  BrTextComponent,
  BrTextConfig,
} from '../../common';

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [
    CommonModule,
    BrTextComponent,
    BrSingleSelectComponent,
    BrMultiSelectComponent,
    BrCheckboxComponent,
    BrRadioComponent,
    BrDateComponent,
    BrAutocompleteComponent,
  ],
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
})
export class AddUserComponent {
  nameConfig: BrTextConfig = {
    id: 'add-user-name',
    name: 'userName',
    className: 'profile-field',
    meta: { settingValue: '1234', source: 'add-user-screen' },
    label: 'Full Name',
    value: '',
    placeholder: 'Enter full name',
    required: true,
  };
  emailConfig: BrTextConfig = { label: 'Email', value: '', placeholder: 'name@company.com', required: true };

  departmentConfig: BrSingleSelectConfig = {
    label: 'Department',
    value: '',
    required: true,
    options: [
      { label: 'Engineering', value: 'eng' },
      { label: 'Finance', value: 'fin' },
      { label: 'HR', value: 'hr' },
      { label: 'Operations', value: 'ops' },
    ],
  };

  skillsConfig: BrMultiSelectConfig = {
    label: 'Skills',
    value: [],
    options: [
      { label: 'Angular', value: 'angular' },
      { label: 'Java', value: 'java' },
      { label: 'SQL', value: 'sql' },
      { label: 'AWS', value: 'aws' },
      { label: 'CI/CD', value: 'cicd' },
    ],
  };

  userTypeConfig: BrRadioConfig = {
    label: 'Employment Type',
    value: 'ft',
    options: [
      { label: 'Full Time', value: 'ft' },
      { label: 'Contract', value: 'ct' },
      { label: 'Intern', value: 'in' },
    ],
  };

  startDateConfig: BrDateConfig = {
    controlId: 'add-user-start-date',
    name: 'userStartDate',
    className: 'profile-field',
    meta: { settingValue: 'ABCD', source: 'add-user-screen' },
    label: 'Start Date',
    value: '',
    minDate: new Date('2025-01-01'),
    maxDate: new Date('2027-12-31'),
    placeholder: 'Pick start date',
    required: true,
    disabled: false,
  };

  locationConfig: BrAutocompleteConfig = {
    label: 'Location',
    value: '',
    placeholder: 'Search office location',
    options: [
      { label: 'Austin', value: 'Austin' },
      { label: 'Seattle', value: 'Seattle' },
      { label: 'New York', value: 'New York' },
      { label: 'Chicago', value: 'Chicago' },
      { label: 'Denver', value: 'Denver' },
    ],
  };

  activeConfig: BrCheckboxConfig = { label: 'Active User', checked: true };

  submitMessage = '';
  controlEvents: string[] = [];

  constructor(private readonly controlRegistry: ControlRegistryService) { }

  updateName(value: string): void { this.nameConfig = { ...this.nameConfig, value }; }
  updateEmail(value: string): void { this.emailConfig = { ...this.emailConfig, value }; }
  updateDepartment(value: any): void { this.departmentConfig = { ...this.departmentConfig, value }; }
  updateSkills(value: any[]): void { this.skillsConfig = { ...this.skillsConfig, value }; }
  updateUserType(value: any): void { this.userTypeConfig = { ...this.userTypeConfig, value }; }
  updateStartDate(value: string): void { this.startDateConfig = { ...this.startDateConfig, value }; }
  updateLocation(value: string): void { this.locationConfig = { ...this.locationConfig, value }; }
  updateActive(checked: boolean): void { this.activeConfig = { ...this.activeConfig, checked }; }

  onTextControlEvent(event: BrControlEvent<string>): void {
    this.pushControlEvent('TEXT', event);
  }

  onDateControlEvent(event: BrControlEvent<string>): void {
    this.pushControlEvent('DATE', event);
  }

  onNameBlur(_: FocusEvent): void {
    this.controlEvents = [`Name blur fired`, ...this.controlEvents].slice(0, 8);
  }

  onNameKeyup(event: KeyboardEvent): void {
    this.controlEvents = [`Name keyup: ${event.key}`, ...this.controlEvents].slice(0, 8);
  }

  onDateFocus(_: FocusEvent): void {
    this.controlEvents = [`Date focus fired`, ...this.controlEvents].slice(0, 8);
  }

  submit(): void {
    const payload = {
      name: this.nameConfig.value,
      email: this.emailConfig.value,
      department: this.departmentConfig.value,
      skills: this.skillsConfig.value,
      userType: this.userTypeConfig.value,
      startDate: this.startDateConfig.value,
      location: this.locationConfig.value,
      active: this.activeConfig.checked,
      registryRead: {
        nameById: this.controlRegistry.valueById('add-user-name'),
        startDateById: this.controlRegistry.valueById('add-user-start-date'),
        profileFields: this.controlRegistry.valuesByClass('profile-field'),
      },
    };
    this.submitMessage = `Saved user payload: ${JSON.stringify(payload)}`;
  }

  private pushControlEvent(scope: string, event: BrControlEvent<string>): void {
    const text = `${scope} ${event.type}: id=${event.id || '-'} value=${event.value || ''} meta=${JSON.stringify(event.meta || {})}`;
    this.controlEvents = [text, ...this.controlEvents].slice(0, 8);
  }
}
