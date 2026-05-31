import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./features/catalog/pages/catalog/catalog.component')
                .then(m => m.CatalogComponent)
    },
    {
    path: 'product/:id',
    loadComponent: () =>
      import('./features/product-detail/pages/product-detail/product-detail.component')
        .then(m => m.ProductDetailComponent)
    },
    {
        path: '**',
        redirectTo: ''
    }
];
