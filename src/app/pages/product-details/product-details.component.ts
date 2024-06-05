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
        this.ready = true;// Aquí se establece `ready` a `true` después de que todas las suscripciones se completen
        console.log(this.product);
      });
    });
  }
}
