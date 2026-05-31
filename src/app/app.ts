import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CartDrawerComponent } from './features/cart/components/cart-drawer/cart-drawer.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,  NavbarComponent, CartDrawerComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
}
