import { computed, Injectable, signal } from '@angular/core';
import { CartItem, CartSummary, Product } from '../model';

@Injectable({
  providedIn: 'root',
})
export class CartService {

  private _items = signal<CartItem[]>([]);
  readonly isOpen = signal<boolean>(false);

  readonly summary = computed<CartSummary>(() => {
    const items = this._items();
    return {
      items,
      totalItems: items.reduce((acc, item) => acc + item.quantity, 0),
      totalPrice: items.reduce((acc, item) => acc + item.product.price * item.quantity, 0)
    };
  });

  addToCart(product: Product): void {
    this._items.update(items => {
      const existing = items.find(i => i.product.id === product.id);
      if (existing) {
        return items.map(i =>
          i.product.id === product.id
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      return [...items, { product, quantity: 1 }];
    });
  }

  removeFromCart(productId: number): void {
    this._items.update(items =>
      items.filter(i => i.product.id !== productId)
    );
  }

  updateQuantity(productId: number, quantity: number): void {
    if (quantity <= 0) {
      this.removeFromCart(productId);
      return;
    }
    this._items.update(items =>
      items.map(i =>
        i.product.id === productId ? { ...i, quantity } : i
      )
    );
  }

  clearCart(): void {
    this._items.set([]);
  }

  toggleCart(): void {
    this.isOpen.update(v => !v);
  }
}
