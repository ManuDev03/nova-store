import { Component, inject, OnInit } from '@angular/core';
import { CartService, ProductService } from '../../../../core/services';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { ProductFiltersComponent } from '../../components/product-filters/product-filters.component';
import { Product } from '../../../../core/model';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [ProductCardComponent, ProductFiltersComponent],
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.scss',
})

export class CatalogComponent implements OnInit{
  private productService = inject(ProductService);
  private cartService = inject(CartService);

  products = this.productService.filteredProducts;
  loading = this.productService.loading;
  error = this.productService.error;
  
  ngOnInit(): void {
    this.productService.loadProducts();
    this.productService.loadCategories();
  }

  onAddToCart(product: Product): void {
    this.cartService.addToCart(product);
  }
}
