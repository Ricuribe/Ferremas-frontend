import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./pages/home/home.component";
import {LoginComponent} from "./pages/login/login.component";
import {RegisterComponent} from "./pages/register/register.component";
import {CarritoComponent} from "./pages/carrito/carrito.component";
import {ComprasComponent} from "./pages/compras/compras.component";
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import {PaymentComponent} from "./pages/payment/payment.component";
import {PaymentResultComponent} from "./pages/payment-result/payment-result.component";

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'cart', component: CarritoComponent},
  {path: 'shopping', component: ComprasComponent},
  {path: 'prod_detail/:id', component: ProductDetailsComponent},
  {path: 'payment', component: PaymentComponent},
  {path: 'payment-result/:status', component:PaymentResultComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
