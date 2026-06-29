export interface Payment {

  id:number;

  customerName:string;

  email:string;

  amount:number;

  transactionId:string;

  paymentMethod:string;

  paymentStatus:string;

  createdDate:Date;

}