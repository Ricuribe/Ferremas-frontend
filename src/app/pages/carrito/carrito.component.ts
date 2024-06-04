import { Component } from '@angular/core';
import { SessionService } from '../../services/session.service';
import { ApiRestService } from '../../services/api-rest.service';
@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.css',
})
export class CarritoComponent {
  cart: any;
  cartDetails: any[] = [];
  totalCost: number = 0;

  constructor(
    private apiService: ApiRestService,
    private sessionService: SessionService
  ) {}

  ngOnInit(): void {
    this.sessionService.getSessionData('user').subscribe((user: any) => {
      if (user && user.id) {
        this.loadCart(user.id);
      }
    });
  }

  loadCart(userId: number): void {
    this.apiService.getCart(userId).subscribe((cart) => {
      this.cart = cart;
      this.loadCartDetails(cart.id);
    });
  }

  loadCartDetails(cartId: number): void {
    this.apiService.getCartDetails(cartId).subscribe((details) => {
      this.cartDetails = details;
      this.calculateTotalCost();
    });
  }

  calculateTotalCost(): void {
    this.totalCost = this.cartDetails.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }
}
