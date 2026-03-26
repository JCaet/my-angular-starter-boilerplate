import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    // ShellComponent provides the root layout (header, footer, router-outlet).
    // All authenticated feature routes should be children of this route.
    path: '',
    loadComponent: () => import('@layout').then((m) => m.ShellComponent),
    children: [
      {
        path: '',
        loadChildren: () => import('@features/home/home.routes').then((m) => m.HOME_ROUTES),
      },
      // Add more feature routes here, e.g.:
      // { path: 'dashboard', loadChildren: () => import('./features/dashboard/dashboard.routes').then(m => m.DASHBOARD_ROUTES) },
    ],
  },
];
