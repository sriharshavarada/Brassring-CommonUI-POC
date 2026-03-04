import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ControlRegistryService } from '../../common';
import {
  BrAutocompleteComponent,
  BrCheckboxComponent,
  BrCheckboxConfig,
  BrControlEvent,
  BrDateComponent,
  BrDateConfig,
  BrRadioComponent,
  BrSingleSelectComponent,
  BrSingleSelectConfig,
  BrTextComponent,
  BrTextConfig,
} from '../../common';

@Component({
  selector: 'app-add-order',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    BrTextComponent,
    BrSingleSelectComponent,
    BrDateComponent,
    BrCheckboxComponent,
    BrAutocompleteComponent,
    BrRadioComponent,
  ],
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.scss'],
})
export class AddOrderComponent {
  constructor(private readonly controlRegistry: ControlRegistryService) { }
  orderCodeConfig: BrTextConfig = { label: 'Order Code', value: '', placeholder: 'ORD-2026-001', required: true };
  customerConfig: BrTextConfig = { label: 'Customer Name', value: '', placeholder: 'Customer name', required: true };
  amountConfig: BrTextConfig = { label: 'Amount (USD)', value: '', placeholder: 'e.g. 1200', required: true };

  statusConfig: BrSingleSelectConfig = {
    label: 'Status',
    value: 'draft',
    options: [
      { label: 'Draft', value: 'draft' },
      { label: 'Submitted', value: 'submitted' },
      { label: 'Approved', value: 'approved' },
    ],
  };
  AutoCompleteTest = '';
  orderType = 'standard';
  orderTypeOptions = [
    { label: 'Standard', value: 'standard' },
    { label: 'Bulk', value: 'bulk' },
    { label: 'Rush', value: 'rush' },
  ];
  orderDateConfig: BrDateConfig = {
    label: 'Order Date',
    value: '',
    minDate: new Date('2025-01-01'),
    maxDate: new Date('2027-12-31'),
    disabled: false,
    placeholder: 'Select order date',
  };

  deliveryDateConfig: BrDateConfig = {
    label: 'Delivery Date',
    value: '',
    minDate: new Date(),
    maxDate: null,
    disabled: false,
    placeholder: 'Select delivery date',
  };

  expeditedConfig: BrCheckboxConfig = { label: 'Expedited Delivery', checked: false };

  submitMessage = '';
  controlEvents: string[] = [];

  updateOrderCode(value: string): void { this.orderCodeConfig = { ...this.orderCodeConfig, value }; }
  updateCustomer(value: string): void { this.customerConfig = { ...this.customerConfig, value }; }
  updateAmount(value: string): void { this.amountConfig = { ...this.amountConfig, value }; }
  updateStatus(value: any): void { this.statusConfig = { ...this.statusConfig, value }; }
  updateOrderDate(value: string): void { this.orderDateConfig = { ...this.orderDateConfig, value }; }
  updateDeliveryDate(value: string): void { this.deliveryDateConfig = { ...this.deliveryDateConfig, value }; }
  updateExpedited(checked: boolean): void { this.expeditedConfig = { ...this.expeditedConfig, checked }; }

  onControlEvent(scope: string, event: BrControlEvent<unknown>): void {
    const text = `${scope} ${event.type}: id=${event.id || '-'} value=${JSON.stringify(event.value ?? '')} meta=${JSON.stringify(event.meta || {})}`;
    this.controlEvents = [text, ...this.controlEvents].slice(0, 8);
  }

  submit(): void {
    const payload = {
      orderCode: this.orderCodeConfig.value,
      customer: this.customerConfig.value,
      amount: this.amountConfig.value,
      status: this.statusConfig.value,
      orderType: this.orderType,
      orderDate: this.orderDateConfig.value,
      deliveryDate: this.deliveryDateConfig.value,
      expedited: this.expeditedConfig.checked,
      autoCompleteTest: this.controlRegistry.valueById('AutoCompleteTest'),
    };
    this.submitMessage = `Saved order payload: ${JSON.stringify(payload)}`;
  }
}
