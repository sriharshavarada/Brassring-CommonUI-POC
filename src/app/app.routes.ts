import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'users',
        pathMatch: 'full',
    },
    {
        path: 'users',
        loadComponent: () =>
            import('./screens/user-list/user-list.component').then(m => m.UserListComponent),
    },
    {
        path: 'orders',
        loadComponent: () =>
            import('./screens/order-list/order-list.component').then(m => m.OrderListComponent),
    },
    {
        path: 'modals',
        loadComponent: () =>
            import('./screens/modal-demo/modal-demo.component').then(m => m.ModalDemoComponent),
    },
    {
        path: 'playground',
        loadComponent: () =>
            import('./screens/playground/playground.component').then(m => m.PlaygroundComponent),
    },
    {
        path: 'docs',
        loadComponent: () =>
            import('./screens/docs/docs.component').then(m => m.DocsComponent),
    },
];
