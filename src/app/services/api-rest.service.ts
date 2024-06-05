import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiRestService {
  private baseUrl = 'http://localhost:8000/api/';
  private productsUrl = `${this.baseUrl}productos/`;
  private readonly headers: HttpHeaders;

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    });
  }

  GetProducts(): Observable<any> {
    return this.http.get(this.productsUrl, { headers: this.headers });
  }

  login(algo: any) {
    return this.http.post(`${this.baseUrl}auth/login/`, algo, {
      headers: this.headers,
    });
  }

  register(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}auth/register/`, data, {
      headers: this.headers,
    });
  }
  logout(token: any): Observable<any> {
    return this.http.post(`${this.baseUrl}auth/logout/`, {
      headers: this.headers,
    });
  }
  getCart(userId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/carrito/${userId}/`);
  }

  getCartDetails(cartId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/carrito-detalle/${cartId}/`);
  }

  getProductDetails(id: number): Observable<any> {
    return this.http.get(`${this.productsUrl}${id}/`);
  }

  getSingleCategory(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}categorias/${id}/`);
  }

  getSingleType(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}tipos/${id}/`);
  }

}
