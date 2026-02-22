import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import {
  BrAutocompleteComponent,
  BrAutocompleteConfig,
  BrCheckboxComponent,
  BrCheckboxConfig,
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
  nameConfig: BrTextConfig = { label: 'Full Name', value: '', placeholder: 'Enter full name', required: true };
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

  updateName(value: string): void { this.nameConfig = { ...this.nameConfig, value }; }
  updateEmail(value: string): void { this.emailConfig = { ...this.emailConfig, value }; }
  updateDepartment(value: any): void { this.departmentConfig = { ...this.departmentConfig, value }; }
  updateSkills(value: any[]): void { this.skillsConfig = { ...this.skillsConfig, value }; }
  updateUserType(value: any): void { this.userTypeConfig = { ...this.userTypeConfig, value }; }
  updateStartDate(value: string): void { this.startDateConfig = { ...this.startDateConfig, value }; }
  updateLocation(value: string): void { this.locationConfig = { ...this.locationConfig, value }; }
  updateActive(checked: boolean): void { this.activeConfig = { ...this.activeConfig, checked }; }

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
    };
    this.submitMessage = `Saved user payload: ${JSON.stringify(payload)}`;
  }
}
