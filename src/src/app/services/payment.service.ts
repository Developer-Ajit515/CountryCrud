import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
 import { ApiResponse } from '../models/api-response';

@Injectable({
  providedIn:'root'
})
export class PaymentService {

  private api="https://localhost:7249/api/Payment";

  constructor(private http:HttpClient){}

  createOrder(amount:number):Observable<any>{

    return this.http.post<any>(`${this.api}/create-order`,{

      amount:amount,
      currency:"INR",
      receipt:"Receipt_"+Date.now()

    });

  }

 

verifyPayment(data: any): Observable<ApiResponse<any>> {
  return this.http.post<ApiResponse<any>>(`${this.api}/verify`, data);
}

  savePayment(payment:any){

    return this.http.post(this.api,payment);

  }

  getPayments(){

    return this.http.get<any>(this.api);

  }

}