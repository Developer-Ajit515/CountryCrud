import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PaymentService } from '../../services/payment.service';

declare var Razorpay: any;

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './payment.component.html'
})
export class PaymentComponent implements OnInit {

  payments: any[] = [];

  payment = {
    customerName: '',
    email: '',
    amount: 0
  };

  constructor(private service: PaymentService) { }

  ngOnInit(): void {
    this.loadPayments();
  }

  loadPayments() {
    this.service.getPayments().subscribe({
      next: (res) => {
        console.log("Payments:", res);
        this.payments = res.data;
      },
      error: (err) => {
        console.error("Load Payments Error:", err);
      }
    });
  }

  payNow() {

    console.log("1. Pay Now Clicked");

    if (this.payment.amount <= 0) {
      alert("Please enter a valid amount.");
      return;
    }

    this.service.createOrder(this.payment.amount).subscribe({

      next: (res) => {

        console.log("2. Order Response:", res);

        const order = res.data;

        if (!order) {
          alert("Order creation failed.");
          return;
        }

        const options = {

          key: order.key,
          amount: order.amount * 100,
          currency: order.currency,
          name: "Country CRUD",
          description: "Payment",
          order_id: order.orderId,

          handler: (response: any) => {

            console.log("3. Payment Success:", response);

            this.verify(response);

          },

          prefill: {
            name: this.payment.customerName,
            email: this.payment.email
          },

          theme: {
            color: "#0d6efd"
          }

        };

        console.log("4. Opening Razorpay");

        const razorpay = new Razorpay(options);

        razorpay.open();

      },

      error: (err) => {

        console.error("Create Order Error:", err);
        alert("Unable to create Razorpay order.");

      }

    });

  }

  verify(response: any) {

    console.log("5. Verify Response:", response);

    this.service.verifyPayment({

      razorpayOrderId: response.razorpay_order_id,
      razorpayPaymentId: response.razorpay_payment_id,
      razorpaySignature: response.razorpay_signature

    }).subscribe({

      next: (result) => {

        console.log("6. Verify Result:", result);

        if (result.success) {

          this.service.savePayment({

            customerName: this.payment.customerName,
            email: this.payment.email,
            amount: this.payment.amount,
            transactionId: response.razorpay_payment_id,
            paymentMethod: "Razorpay",
            paymentStatus: "Success"

          }).subscribe({

            next: () => {

              alert("Payment Successful");

              this.loadPayments();

              this.payment = {
                customerName: '',
                email: '',
                amount: 0
              };

            },

            error: (err) => {
              console.error("Save Payment Error:", err);
            }

          });

        } else {

          alert("Payment Verification Failed");

        }

      },

      error: (err) => {
        console.error("Verify Payment Error:", err);
      }

    });

  }

}