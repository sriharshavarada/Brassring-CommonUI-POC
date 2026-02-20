/**
 * ============================================================
 * ORDER LIST SCREEN — CONSUMER COMPONENT #2
 * ============================================================
 *
 * 🚫 THIS FILE MUST NEVER CHANGE WHEN SWITCHING UI LIBRARIES!
 *
 * Same pattern as UserListComponent — uses only <br-grid>
 * and <br-date> with library-agnostic JSON configs.
 *
 * This proves the pattern works across multiple screens.
 * ============================================================
 */

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

// ▼ Import ONLY from the common barrel — never from implementations ▼
import {
    BrGridComponent,
    BrDateComponent,
    BrGridConfig,
    BrGridActionEvent,
    BrDateConfig,
    UI_MODE
} from '../../common';

@Component({
    selector: 'br-order-list',
    standalone: true,
    imports: [CommonModule, BrGridComponent, BrDateComponent],
    templateUrl: './order-list.component.html',
    styleUrls: ['./order-list.component.scss'],
})
export class OrderListComponent {
    currentMode = UI_MODE;

    /**
     * GRID CONFIGURATION — Different data, same JSON schema.
     * Works identically with Custom and Material implementations.
     */
    gridConfig: BrGridConfig = {
        title: 'Order History',
        columns: [
            { field: 'orderId', header: 'Order #', sortable: true, width: '100px' },
            { field: 'customer', header: 'Customer', sortable: true },
            { field: 'product', header: 'Product', sortable: true },
            { field: 'amount', header: 'Amount ($)', sortable: true, width: '120px' },
            { field: 'date', header: 'Order Date', sortable: true },
            { field: 'status', header: 'Status', sortable: false },
        ],
        data: [
            { orderId: 'ORD-001', customer: 'Acme Corp', product: 'Widget Pro', amount: 1250.00, date: '2025-01-15', status: 'Delivered' },
            { orderId: 'ORD-002', customer: 'TechStart Inc', product: 'Cloud Suite', amount: 4500.00, date: '2025-01-18', status: 'Shipped' },
            { orderId: 'ORD-003', customer: 'RetailMax', product: 'POS System', amount: 890.00, date: '2025-01-20', status: 'Processing' },
            { orderId: 'ORD-004', customer: 'HealthFirst', product: 'Data Toolkit', amount: 2100.00, date: '2025-01-22', status: 'Delivered' },
            { orderId: 'ORD-005', customer: 'EduLearn', product: 'LMS Premium', amount: 3200.00, date: '2025-01-25', status: 'Shipped' },
            { orderId: 'ORD-006', customer: 'AutoDrive', product: 'IoT Sensors', amount: 6700.00, date: '2025-02-01', status: 'Pending' },
            { orderId: 'ORD-007', customer: 'FoodChain', product: 'Supply Track', amount: 1800.00, date: '2025-02-05', status: 'Delivered' },
            { orderId: 'ORD-008', customer: 'BuildRight', product: 'Project Mgr', amount: 950.00, date: '2025-02-08', status: 'Processing' },
            { orderId: 'ORD-009', customer: 'LogiMove', product: 'Fleet GPS', amount: 5400.00, date: '2025-02-10', status: 'Shipped' },
            { orderId: 'ORD-010', customer: 'CyberShield', product: 'SecureNet', amount: 7800.00, date: '2025-02-14', status: 'Pending' },
        ],
        pagination: true,
        pageSize: 5,
        sorting: true,
        striped: true,
        toolbar: {
            showSort: true,
            showFilter: true,
            showSearch: true,
            showRefresh: true,
            showColumnSettings: true,
            showShare: true,
            showViewMode: true,
            primaryActionLabel: 'Add Order',
            primaryActions: [
                { id: 'new-order', label: 'New Order' },
                { id: 'clone-order', label: 'Clone Selected' },
            ],
        },
        selectionActions: [
            { id: 'ship', label: 'Ship' },
            { id: 'mark-delivered', label: 'Mark Delivered' },
            { id: 'cancel', label: 'Cancel Order' },
        ],
        contextMenuActions: [
            { id: 'open', label: 'Open Details' },
            { id: 'edit', label: 'Edit Order' },
            { id: 'save-as-new', label: 'Save As New' },
            { id: 'status', label: 'Update Status' },
        ],
        personalization: {
            availableColumns: [
                { field: 'orderId', label: 'Order Number', group: 'Order' },
                { field: 'customer', label: 'Customer', group: 'Order' },
                { field: 'product', label: 'Product', group: 'Order' },
                { field: 'amount', label: 'Amount', group: 'Finance' },
                { field: 'date', label: 'Order Date', group: 'Timeline' },
                { field: 'status', label: 'Status', group: 'Timeline' },
            ],
            selectedColumns: ['orderId', 'customer', 'product', 'amount', 'date', 'status'],
            maxSelectedColumns: 10,
            searchPlaceholder: 'Search order columns',
        },
        defaultSort: [{ field: 'date', direction: 'desc' }],
        defaultFilters: [{ field: 'status', operator: 'contains', value: 'Pending' }],
        features: {
            enableTopBar: false,
            enableRowSelection: false,
            enableSelectionActions: false,
            enableContextMenu: false,
            enableRowActionButton: false,
            enableColumnPersonalization: false,
            enableColumnVisibilityToggle: false,
            enableColumnReorder: false,
            enableSorting: true,
            sortLevels: 4,
            enableFiltering: false,
            filterLevels: 2,
            enableSearch: false,
            enableRefresh: false,
            enableShare: false,
            enableViewMode: false,
            enablePrimaryAction: false,
            enablePrimaryActionMenu: false,
            showPaginationSizeSelector: true,
            showPaginationSummary: true,
            showPaginationNavigation: true,
        },
    };

    /**
     * DATE CONFIGURATION — Different label/constraints, same JSON schema.
     */
    orderDateConfig: BrDateConfig = {
        label: 'Filter by Order Date',
        value: null,
        minDate: new Date(2024, 0, 1),
        maxDate: new Date(),
        disabled: false,
        placeholder: 'Select order date',
        required: false,
    };

    deliveryDateConfig: BrDateConfig = {
        label: 'Expected Delivery',
        value: null,
        minDate: new Date(),
        maxDate: null,
        disabled: false,
        placeholder: 'Select delivery date',
        required: true,
    };

    onOrderDateChange(value: string): void {
        console.log('[OrderList] Order date changed:', value);
    }

    onDeliveryDateChange(value: string): void {
        console.log('[OrderList] Delivery date changed:', value);
    }

    onGridAction(event: BrGridActionEvent): void {
        // Business actions should be handled by screen/service code.
        console.log('[OrderList] Grid action:', event);
    }
}
