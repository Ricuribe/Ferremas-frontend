import { Component, Input, OnInit } from '@angular/core';
import {ApiRestService} from "../../services/api-rest.service";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {
  constructor(private apiRestService: ApiRestService) {}

  products: any[] = [];


  ngOnInit(): void {
    this.apiRestService.GetProducts().subscribe((prods: any[]) => this.products = prods);
  }

  ViewProducto(id: number): void {
    console.log(id);

  }


}
