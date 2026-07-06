import { Routes } from '@angular/router';
import { CountryComponent } from './components/country/country.component';
import { PaymentComponent } from './components/payment/payment.component';

export const routes: Routes = [
  { path: '', redirectTo: 'country', pathMatch: 'full' },
  { path: 'country', component: CountryComponent },
  { path: 'payment', component: PaymentComponent },
  { path: '**', redirectTo: 'country' }
];