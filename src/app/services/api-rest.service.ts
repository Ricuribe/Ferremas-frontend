import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiRestService {
  private baseurl = 'http://127.0.0.1:8000/api/'
  private productsUrl = `${this.baseurl}productos/`;
  private readonly headers: HttpHeaders;

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  }


  GetProducts(): Observable<any> {
    return this.http.get(this.productsUrl, {headers: this.headers});
  }

  login(algo:any) {
    return this.http.post(`${this.baseurl}auth/login/`, algo, {headers: this.headers});
  }

  register(data:any): Observable<any> {

     return this.http.post(`${this.baseurl}auth/register/`, data, {headers: this.headers});
  }
}
