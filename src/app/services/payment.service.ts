import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private baseUrl = 'http://localhost:8000/api/';
  private  headers: HttpHeaders = new HttpHeaders(
    {'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: 'Token 958ef3e470f7402be20c9a2d18db98541723fa2a'});

  constructor(private http: HttpClient) { }

  initiatePayment(amount: number) {
    return this.http.post(`${this.baseUrl}create_transaction/`, amount, {headers: this.headers});
  }
}
