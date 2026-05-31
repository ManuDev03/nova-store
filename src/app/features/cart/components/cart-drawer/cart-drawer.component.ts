import { Component, inject } from '@angular/core';
import { CartService } from '../../../../core/services';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-cart-drawer',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './cart-drawer.component.html',
  styleUrl: './cart-drawer.component.scss',
})
export class CartDrawerComponent {

  cartService = inject(CartService);

  summary = this.cartService.summary;
  isOpen = this.cartService.isOpen;
}
