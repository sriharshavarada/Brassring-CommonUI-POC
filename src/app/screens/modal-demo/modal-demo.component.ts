import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    BrModalComponent,
    BrModalConfig,
    BrModalActionEvent
} from '../../common';

@Component({
    selector: 'app-modal-demo',
    standalone: true,
    imports: [CommonModule, BrModalComponent],
    templateUrl: './modal-demo.component.html',
    styleUrls: ['./modal-demo.component.scss']
})
export class ModalDemoComponent {

    // Config for a simple info modal
    infoModalConfig: BrModalConfig = {
        isOpen: false,
        title: 'System Information',
        subtitle: 'Basic details about the application state.',
        content: `
            <p>This is a <strong>generic modal</strong> abstraction.</p>
            <p>It can render using either <strong>Custom CSS</strong> or <strong>Angular Material</strong> without changing the consumer code.</p>
        `,
        actions: [
            { id: 'ok', label: 'Understood', type: 'primary' }
        ],
        uiConfig: {
            size: 'md'
        }
    };

    // Config for a confirmation modal
    confirmModalConfig: BrModalConfig = {
        isOpen: false,
        title: 'Confirm Action',
        subtitle: 'Please confirm to proceed.',
        content: '<p>Are you sure you want to perform this operation?</p>',
        actions: [
            { id: 'cancel', label: 'Cancel', type: 'secondary' },
            { id: 'confirm', label: 'Confirm', type: 'primary' }
        ],
        uiConfig: {
            size: 'sm'
        }
    };

    // Config for a specialized Delete Modal
    deleteModalConfig: BrModalConfig = {
        isOpen: false,
        title: 'Delete User Record',
        subtitle: 'This will permanently remove the record from the database.',
        content: `
            <div style="color: #666; font-size: 0.9rem;">
                <p>You are about to delete <strong>John Doe</strong>.</p>
                <p>This action:
                    <ul>
                        <li>Cannot be undone</li>
                        <li>Will remove all associated permissions</li>
                        <li>Will trigger an audit log notification</li>
                    </ul>
                </p>
            </div>
        `,
        actions: [
            { id: 'cancel', label: 'Keep Record', type: 'ghost' },
            { id: 'delete', label: 'Yes, Delete Permanently', type: 'danger' }
        ],
        uiConfig: {
            size: 'md',
            isDismissible: false, // Force user to click a button
            showCloseButton: true
        }
    };

    openInfoModal() {
        this.infoModalConfig = { ...this.infoModalConfig, isOpen: true };
    }

    openConfirmModal() {
        this.confirmModalConfig = { ...this.confirmModalConfig, isOpen: true };
    }

    openDeleteModal() {
        this.deleteModalConfig = { ...this.deleteModalConfig, isOpen: true };
    }

    onModalAction(event: BrModalActionEvent, type: 'info' | 'confirm' | 'delete') {
        console.log(`Modal Action [${type}]:`, event);
        if (type === 'info') {
            this.infoModalConfig = { ...this.infoModalConfig, isOpen: false };
        } else if (type === 'confirm') {
            this.confirmModalConfig = { ...this.confirmModalConfig, isOpen: false };
        } else {
            // Delete logic
            if (event.actionId === 'delete') {
                alert('Record Deleted Successfully!');
            }
            this.deleteModalConfig = { ...this.deleteModalConfig, isOpen: false };
        }
    }

    onModalClose(type: 'info' | 'confirm' | 'delete') {
        console.log(`Modal Closed [${type}]`);
        if (type === 'info') {
            this.infoModalConfig = { ...this.infoModalConfig, isOpen: false };
        } else if (type === 'confirm') {
            this.confirmModalConfig = { ...this.confirmModalConfig, isOpen: false };
        } else {
            this.deleteModalConfig = { ...this.deleteModalConfig, isOpen: false };
        }
    }
}
