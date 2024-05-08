import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './Components/header/header.component';
import { FooterComponent } from './Components/footer/footer.component';
import { ShowProductsComponent } from './Components/show-products/show-products.component';
import { CartComponent } from './Components/cart/cart.component';
import { FilterProductsPipe } from './MyPipes/filter-products.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HttpClientModule } from '@angular/common/http';
import { ProductDetailsComponent } from './Components/product-details/product-details.component';
import { FormsModule } from '@angular/forms';
import { WishListComponent } from './Components/wish-list/wish-list.component';
import { LoginComponent } from './Components/login/login.component';
import { SignupComponent } from './Components/signup/signup.component';
import { ProfileComponent } from './Components/profile/profile.component';
import { HomeComponent } from './Components/home/home.component';
import { CarouselComponent } from './Components/carousel/carousel.component';
import { CategoryMenuComponent } from './Components/category-menu/category-menu.component';
import { AlertModule } from "ngx-bootstrap/alert";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ShowProductsComponent,
    CartComponent,
    FilterProductsPipe,
    ProductDetailsComponent,
    WishListComponent,
    LoginComponent,
    SignupComponent,
    ProfileComponent,
    HomeComponent,
    CarouselComponent,
    CategoryMenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    AlertModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
