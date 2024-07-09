import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
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

  constructor(private route: ActivatedRoute, private apiService:ApiRestService,
              private router: Router,) {}

  ngOnInit(): void {
    //@ts-ignore
    const id = +this.route.snapshot.paramMap.get('id');
    this.apiService.getProductDetails(id).subscribe(data => {
      this.product = data;
      console.log(this.product);

      forkJoin([
        this.apiService.getSingleCategory(this.product.categoria),
        this.apiService.getSingleType(this.product.tipo)
      ]).subscribe(([category, type]) => {
        this.product.categoria = category.nombre;
        this.product.tipo = type.nombre;
        this.calculateDiscountedPrice()
        this.ready = true;
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

  addToCart(id:any, cantidad: any) {
    console.log(`Agregar al carrito: ${this.product.nombre}, Cantidad: ${this.quantity}`);
    const producto = {
      "id_producto": id,
      "cantidad": cantidad
    }
    this.apiService.addToCart(producto).subscribe((data:any) => {
      if (data.message == "Product added to cart" || data.message == "Quantity changed") {
        console.log("CORRECTOOOOOOOO", data)
        this.router.navigate(["/cart"])
      } else {
        console.log("Error en el producto", data)
        console.log(data)
        console.log("ME CAGO EN TODOOOOOOOOOOOOOO")
      }
    })
  }

}
