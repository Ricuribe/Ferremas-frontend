import { Component } from '@angular/core';
import {PaymentService} from "../../services/payment.service";
import {forkJoin, map, switchMap} from "rxjs";
import {SessionService} from "../../services/session.service";
import {ApiRestService} from "../../services/api-rest.service";

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent {

  totalCost: number = 0; // Deberás calcular esto o pasarlo desde el carrito
  cart: any;
  cartDetails: any;
  ready : boolean = false;

  constructor(private paymentService: PaymentService,
              private sessionService: SessionService,
              private apiService: ApiRestService) {}

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
        return this.apiService.getCartDetails(cart[0].id_carrito).pipe(
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

  initiatePayment() {
    this.paymentService.initiatePayment(this.totalCost).subscribe(
      (data:any) => {
        window.location.href = `${data.url}?token_ws=${data.token}`;
      },
      error => {
        console.error('Error initiating payment:', error);
      }
    );
  }

}
