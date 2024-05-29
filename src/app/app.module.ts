import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import {NgOptimizedImage} from "@angular/common";
import {provideHttpClient, withInterceptorsFromDi} from "@angular/common/http";
import {ApiRestService} from "./services/api-rest.service";
import { LoginComponent } from './pages/login/login.component';
import { LoadImageDirective } from './directives/load-image.directive';
import {ReactiveFormsModule} from "@angular/forms";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {MatFormField} from "@angular/material/form-field";
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {StorageModule} from '@ngx-pwa/local-storage';

import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { CarritoComponent } from './pages/carrito/carrito.component';
import { RegisterComponent } from './pages/register/register.component';
import { ComprasComponent } from './pages/compras/compras.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    ProductListComponent,
    LoginComponent,
    LoadImageDirective,
    ProductDetailsComponent,
    CarritoComponent,
    RegisterComponent,
    ComprasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgOptimizedImage,
    ReactiveFormsModule,
    MatFormField,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    StorageModule
  ],
  providers: [provideHttpClient(withInterceptorsFromDi()), ApiRestService, provideAnimationsAsync()],
  bootstrap: [AppComponent]
})
export class AppModule { }
