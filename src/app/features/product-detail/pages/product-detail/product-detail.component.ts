import { CurrencyPipe } from '@angular/common';
import { Component, OnInit, signal, inject, effect } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Product } from '../../../../core/model';
import { CartService, ProductService } from '../../../../core/services';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss',
})
export class ProductDetailComponent implements OnInit {

  private route = inject(ActivatedRoute);
  private productService = inject(ProductService);
  private cartService = inject(CartService);

  product = signal<Product | null>(null);
  relatedProducts = signal<Product[]>([]);
  selectedImage = signal<string>('');
  selectedVariant = signal<string>('');
  addedToCart = signal<boolean>(false);

  private id = Number(this.route.snapshot.paramMap.get('id'));
  private requested = false;

  private productEffect = effect(() => {
    const found = this.productService.getProductById(this.id);
    if (found) {
      this.product.set(found);
      this.selectedImage.set(found.images?.[0] ?? '');
      this.selectedVariant.set(found.variants?.[0] ?? '');
      this.loadRelated(found);
      return;
    }

    if (!found && !this.requested) {
      this.requested = true;
      this.productService.getProductByIdAsync(this.id).then(prod => {
        if (prod) {
          this.product.set(prod);
          this.selectedImage.set(prod.images?.[0] ?? '');
          this.selectedVariant.set(prod.variants?.[0] ?? '');
          this.loadRelated(prod);
        }
      });
    }
  });

  ngOnInit(): void {
    if (this.productService.products().length === 0) {
      this.productService.loadProducts();
    }
  }

  private loadRelated(product: Product): void {
    const related = this.productService.products()
      .filter(p => p.category === product.category && p.id !== product.id)
      .slice(0, 4);
    this.relatedProducts.set(related);
  }

  selectImage(image: string): void {
    this.selectedImage.set(image);
  }

  selectVariant(variant: string): void {
    this.selectedVariant.set(variant);
  }

  onAddToCart(): void {
    if (!this.product()) return;
    this.cartService.addToCart(this.product()!);
    this.addedToCart.set(true);
    setTimeout(() => this.addedToCart.set(false), 2000);
  }
}
