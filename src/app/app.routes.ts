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
];
