import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Payment } from '../models/payment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  apiUrl="https://localhost:7249/api/Payment"; // अपना Backend Port डालें

  constructor(private http:HttpClient) { }

  getPayments():Observable<Payment[]>{

    return this.http.get<Payment[]>(this.apiUrl);

  }

  savePayment(payment:any){

    return this.http.post(this.apiUrl,payment);

  }

  createOrder(order:any){

    return this.http.post<any>(this.apiUrl+"/create-order",order);

  }

}