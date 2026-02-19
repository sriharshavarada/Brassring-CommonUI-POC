/**
 * ============================================================
 * USER LIST SCREEN — CONSUMER COMPONENT #1
 * ============================================================
 *
 * 🚫 THIS FILE MUST NEVER CHANGE WHEN SWITCHING UI LIBRARIES!
 *
 * This component only uses:
 *   - <br-grid>  with a generic JSON config
 *   - <br-date>  with a generic JSON config
 *
 * It does NOT import or reference Angular Material, Custom
 * implementations, adapters, or any library-specific code.
 * ============================================================
 */

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

// ▼ Import ONLY from the common barrel — never from implementations ▼
import {
    BrGridComponent,
    BrDateComponent,
    BrGridConfig,
    BrDateConfig,
    UI_MODE
} from '../../common';

@Component({
    selector: 'br-user-list',
    standalone: true,
    imports: [CommonModule, BrGridComponent, BrDateComponent],
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent {
    /** Current UI mode (for display only — not used in logic) */
    currentMode = UI_MODE;

    /**
     * GRID CONFIGURATION — Library-Agnostic JSON
     * This exact JSON works with BOTH Custom and Material grids.
     */
    gridConfig: BrGridConfig = {
        title: 'User Management',
        columns: [
            { field: 'id', header: 'ID', sortable: true, width: '80px' },
            { field: 'name', header: 'Full Name', sortable: true },
            { field: 'email', header: 'Email', sortable: true },
            { field: 'role', header: 'Role', sortable: true },
            { field: 'status', header: 'Status', sortable: false },
        ],
        data: [
            { id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin', status: 'Active' },
            { id: 2, name: 'Bob Smith', email: 'bob@example.com', role: 'Developer', status: 'Active' },
            { id: 3, name: 'Carol Williams', email: 'carol@example.com', role: 'Designer', status: 'Inactive' },
            { id: 4, name: 'Dave Brown', email: 'dave@example.com', role: 'Developer', status: 'Active' },
            { id: 5, name: 'Eve Davis', email: 'eve@example.com', role: 'Manager', status: 'Active' },
            { id: 6, name: 'Frank Miller', email: 'frank@example.com', role: 'Developer', status: 'Active' },
            { id: 7, name: 'Grace Wilson', email: 'grace@example.com', role: 'QA', status: 'Active' },
            { id: 8, name: 'Henry Moore', email: 'henry@example.com', role: 'DevOps', status: 'Inactive' },
            { id: 9, name: 'Ivy Taylor', email: 'ivy@example.com', role: 'Designer', status: 'Active' },
            { id: 10, name: 'Jack Anderson', email: 'jack@example.com', role: 'Developer', status: 'Active' },
            { id: 11, name: 'Karen Thomas', email: 'karen@example.com', role: 'Manager', status: 'Active' },
            { id: 12, name: 'Leo Jackson', email: 'leo@example.com', role: 'Developer', status: 'Inactive' },
        ],
        pagination: true,
        pageSize: 5,
        sorting: true,
        striped: true,
    };

    /**
     * DATE CONFIGURATION — Library-Agnostic JSON
     * This exact JSON works with BOTH Custom and Material date pickers.
     */
    joinDateConfig: BrDateConfig = {
        label: 'Filter by Join Date',
        value: null,
        minDate: new Date(2020, 0, 1),
        maxDate: new Date(),
        disabled: false,
        placeholder: 'Select join date',
        required: false,
    };

    /** Handle date change events generically */
    onJoinDateChange(value: string): void {
        console.log('[UserList] Join date changed:', value);
    }
}
