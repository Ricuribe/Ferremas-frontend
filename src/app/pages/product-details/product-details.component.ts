import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {ApiRestService} from "../../services/api-rest.service";
import {forkJoin} from "rxjs";

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent implements OnInit {
  ready: boolean = false;
  product: any;
  quantity:number = 1;

  constructor(private route: ActivatedRoute, private apiService:ApiRestService) {}

  ngOnInit(): void {
    //@ts-ignore
    const id = +this.route.snapshot.paramMap.get('id');
    this.apiService.getProductDetails(id).subscribe(data => {
      this.product = data;
      console.log(this.product);

      forkJoin([
        this.apiService.getSingleCategory(this.product.id_producto),
        this.apiService.getSingleType(this.product.id_producto)
      ]).subscribe(([category, type]) => {
        this.product.categoria = category.nombre;
        this.product.tipo = type.nombre;
        this.calculateDiscountedPrice()
        this.ready = true;// Aquí se establece `ready` a `true` después de que todas las suscripciones se completen
        console.log(this.product);
      });
    });
  }

  calculateDiscountedPrice(): void {
    if (this.product.descuento && this.product.descuento > 0) {
      this.product.precioConDescuento = this.product.precio - (this.product.precio * this.product.descuento / 100);
    } else {
      this.product.precioConDescuento = null;
    }
  }

  decrementQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  incrementQuantity() {
    if (this.quantity < 20) {
      this.quantity++;
    }
  }

  addToCart() {
    console.log(`Agregar al carrito: ${this.product.nombre}, Cantidad: ${this.quantity}`);

  }

}
