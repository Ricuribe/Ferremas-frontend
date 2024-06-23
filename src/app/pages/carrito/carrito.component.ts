import { Component } from '@angular/core';
import { SessionService } from '../../services/session.service';
import { ApiRestService } from '../../services/api-rest.service';
import {forkJoin, map, Observable, switchMap} from "rxjs";
@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.css',
})
export class CarritoComponent {
  cart: any;
  cartDetails: any = [];
  totalCost: number = 0;
  ready = false

  constructor(
    private apiService: ApiRestService,
    private sessionService: SessionService
  ) {}

  ngOnInit(): void {
    this.sessionService.getSessionData().subscribe((user: any) => {
      if (user && user.user) {
        console.log("Carro qlo" , user.user)

        this.loadCart(user.user.id)
      } else {
        alert('ERROR 404: NOT FOUND')
      }
    });

  }

  loadCart(userId: number): void {
    this.apiService.getCart(userId).pipe(
      switchMap(cart => {
        this.cart = cart;
        return this.apiService.getCartDetails(cart[0].usuario).pipe(
          switchMap(details => {
            this.cartDetails = details;
            const productObservables = details.map((item:any) =>
              this.apiService.getProductDetails(item.producto).pipe(
                map(producto => ({ ...item, producto }))
              )
            );
            return forkJoin(productObservables);
          })
        );
      })
    ).subscribe(detailsWithProducts => {
      this.cartDetails = detailsWithProducts;
      console.log(detailsWithProducts)
      this.calculateTotalCost();
      this.ready = true;
    });
  }

  calculateTotalCost(): void {
    this.totalCost = this.cartDetails.reduce(
      (total:number, item:any) => total + item.producto.precio * item.cantidad, 0);
  }
}
