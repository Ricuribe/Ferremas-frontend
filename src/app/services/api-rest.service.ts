import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable, switchMap} from 'rxjs';
import {SessionService} from "./session.service";

@Injectable({
  providedIn: 'root',
})
export class ApiRestService {
  private baseUrl = 'http://localhost:8000/api/';
  private productsUrl = `${this.baseUrl}productos/`;
  private  headers: HttpHeaders = new HttpHeaders({'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: 'Token 958ef3e470f7402be20c9a2d18db98541723fa2a'});

  constructor(private http: HttpClient, private session: SessionService) {}
  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: 'Token 958ef3e470f7402be20c9a2d18db98541723fa2a'
    });
  }

  private getAuthHeaders(): Observable<HttpHeaders> {
    return new Observable(observer => {
      this.session.getSessionData().subscribe(user => {
        console.log("debug authHeaders",  user.token)
        let headers = this.getHeaders().set('Authorization', `Token ${user.token}`);
        console.log("headers: ", headers);
        observer.next(headers);
        observer.complete();
      });
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
  // TODO: Arreglar esta cagaita
  logout(token: any){
    return this.getAuthHeaders().pipe(
      switchMap(headers => {
        console.log(headers);
        return this.http.post(`${this.baseUrl}auth/logout/`, {
          headers: headers,
        })
      })
    )
  }
  getCart(userId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}carritos/?usuario=${userId}/`, {headers: this.headers});
  }

  getCartDetails(cartId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}carritos-detalles/${cartId}/`);
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
