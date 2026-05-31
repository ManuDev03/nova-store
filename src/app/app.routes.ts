import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./features/catalog/pages/catalog/catalog.component')
                .then(m => m.CatalogComponent)
    },
    {
        path: '**',
        redirectTo: ''
    }
];
