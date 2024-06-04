import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent implements OnInit {
  private apiUrl = 'http://127.0.0.1:8000/api'; // Cambia la URL según tu API

  product: any;

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'Access-Control-Allow-Origin': 'http://127.0.0.1:8000/api',
  });

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    //@ts-ignore

    const productId = +this.route.snapshot.paramMap.get('id');
    this.getProductDetails(productId).subscribe((product) => {
      this.product = product;
    });
  }

  getProductDetails(productId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/productos/${productId}`, {
      headers: this.headers,
    });
  }
}
