import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../../../core/services';
import { SortOption } from '../../../../core/model';

@Component({
  selector: 'app-product-filters',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-filters.component.html',
  styleUrl: './product-filters.component.scss',
})
export class ProductFiltersComponent implements OnInit, OnDestroy {
  private productService = inject(ProductService);

  categories = this.productService.categories;

  search = '';
  selectedCategory = '';
  minPrice: number | null = null;
  maxPrice: number | null = null;
  inStock: boolean | null = null;
  sortBy: SortOption = 'default';

  sortOptions: { value: SortOption; label: string }[] = [
    { value: 'default', label: 'Relevancia' },
    { value: 'price-asc', label: 'Precio: menor a mayor' },
    { value: 'price-desc', label: 'Precio: mayor a menor' },
    { value: 'rating-desc', label: 'Mejor valorados' },
    { value: 'name-asc', label: 'Nombre A-Z' }
  ];

  private searchTimer: any;

  ngOnInit(): void {
    
    const current = this.productService.filters();
    this.search = current.search;
    this.selectedCategory = current.category;
    this.minPrice = current.minPrice;
    this.maxPrice = current.maxPrice;
    this.inStock = current.inStock;
    this.sortBy = current.sortBy;
  }

  ngOnDestroy(): void {
    clearTimeout(this.searchTimer);
  }


  onSearchChange(): void {
    clearTimeout(this.searchTimer);
    this.searchTimer = setTimeout(() => {
      this.productService.updateFilters({ search: this.search });
    }, 300);
  }

  onCategoryChange(): void {
    this.productService.updateFilters({ category: this.selectedCategory });
  }

  onPriceChange(): void {
    this.productService.updateFilters({
      minPrice: this.minPrice,
      maxPrice: this.maxPrice
    });
  }

  onStockChange(value: string): void {
    const inStock = value === 'true' ? true : value === 'false' ? false : null;
    this.inStock = inStock;
    this.productService.updateFilters({ inStock });
  }

  onSortChange(): void {
    this.productService.updateFilters({ sortBy: this.sortBy });
  }

  resetFilters(): void {
    this.search = '';
    this.selectedCategory = '';
    this.minPrice = null;
    this.maxPrice = null;
    this.inStock = null;
    this.sortBy = 'default';
    this.productService.resetFilters();
  }

  get hasActiveFilters(): boolean {
    return !!(
      this.search ||
      this.selectedCategory ||
      this.minPrice ||
      this.maxPrice ||
      this.inStock !== null ||
      this.sortBy !== 'default'
    );
  }
}