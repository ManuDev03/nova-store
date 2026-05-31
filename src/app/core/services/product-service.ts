import { computed, inject, Injectable, signal } from '@angular/core';
import { Category, Product, ProductFilters, SortOption } from '../model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private http = inject(HttpClient);

  private _products = signal<Product[]>([]);
  private _categories = signal<Category[]>([]);
  private _loading = signal<boolean>(false);
  private _error = signal<string | null>(null);
  private _filters = signal<ProductFilters>({
    search: '',
    category: '',
    minPrice: null,
    maxPrice: null,
    inStock: null,
    sortBy: 'default'
  });

  readonly products = this._products.asReadonly();
  readonly categories = this._categories.asReadonly();
  readonly loading = this._loading.asReadonly();
  readonly error = this._error.asReadonly();
  readonly filters = this._filters.asReadonly();

  readonly filteredProducts = computed(() => {
    const products = this._products();
    const filters = this._filters();
    let result = [...products];

    if (filters.search) {
      const search = filters.search.toLowerCase();
      result = result.filter(p =>
        p.name.toLowerCase().includes(search) ||
        p.tags.some(t => t.toLowerCase().includes(search))
      );
    }

    if (filters.category) {
      result = result.filter(p => p.category === filters.category);
    }

    if (filters.minPrice !== null) {
      result = result.filter(p => p.price >= filters.minPrice!);
    }

    if (filters.maxPrice !== null) {
      result = result.filter(p => p.price <= filters.maxPrice!);
    }

    if (filters.inStock !== null) {
      result = result.filter(p => p.inStock === filters.inStock);
    }

    return this.sortProducts(result, filters.sortBy);
  });

  private sortProducts(products: Product[], sortBy: SortOption): Product[] {
    switch (sortBy) {
      case 'price-asc': return [...products].sort((a, b) => a.price - b.price);
      case 'price-desc': return [...products].sort((a, b) => b.price - a.price);
      case 'rating-desc': return [...products].sort((a, b) => b.rating - a.rating);
      case 'name-asc': return [...products].sort((a, b) => a.name.localeCompare(b.name));

      default: return products;
    }
  }

  loadProducts(): void {
    this._loading.set(true);
    this._error.set(null);

    this.http.get<Product[]>('/api/products').subscribe({
      next: (products) => {
        this._products.set(products);
        this._loading.set(false);
      },
      error: (err) => {
        this._error.set('Error al cargar los productos. Intenta de nuevo.');
        this._loading.set(false);
      }
    });
  }

  loadCategories(): void {
    this.http.get<Category[]>('/api/categories').subscribe({
      next: (categories) => this._categories.set(categories)
    });
  }

  getProductById(id: number): Product | undefined {
    return this._products().find(p => p.id === id);
  }

  updateFilters(partial: Partial<ProductFilters>): void {
    this._filters.update(current => ({ ...current, ...partial }));
  }

  resetFilters(): void {
    this._filters.set({
      search: '',
      category: '',
      minPrice: null,
      maxPrice: null,
      inStock: null,
      sortBy: 'default'
    });
  }


}
