import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PaymentService } from '../../services/payment.service';
import { Payment } from '../../models/payment';

declare var Razorpay:any;

@Component({
  selector: 'app-payment',
  standalone:true,
  imports:[CommonModule,FormsModule],
  templateUrl:'./payment.component.html'
})
export class PaymentComponent implements OnInit{

  payments:Payment[]=[];

  payment:any={

    customerName:'',
    email:'',
    amount:0

  };

  constructor(private service:PaymentService){}

  ngOnInit(){

    this.loadPayments();

  }

  loadPayments(){

    this.service.getPayments().subscribe(res=>{

      this.payments=res;

    });

  }

  payNow(){

    this.service.createOrder(this.payment).subscribe(order=>{

      const options={

        key:order.key,

        amount:order.amount,

        currency:order.currency,

        name:"Country CRUD",

        description:"Payment",

        order_id:order.orderId,

        handler:(response:any)=>{

          let data={

            customerName:this.payment.customerName,

            email:this.payment.email,

            amount:this.payment.amount,

            paymentMethod:"Razorpay",

            transactionId:response.razorpay_payment_id,

            paymentStatus:"Success"

          };

          this.service.savePayment(data).subscribe(()=>{

            alert("Payment Successful");

            this.loadPayments();

          });

        }

      };

      const rzp=new Razorpay(options);

      rzp.open();

    });

  }

}