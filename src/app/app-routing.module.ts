import { ShowProductsComponent } from './Components/show-products/show-products.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './Components/cart/cart.component';
import { ProductDetailsComponent } from './Components/product-details/product-details.component';
import { WishListComponent } from './Components/wish-list/wish-list.component';
import { LoginComponent } from './Components/login/login.component';
import { SignupComponent } from './Components/signup/signup.component';
import { HomeComponent } from './Components/home/home.component';
import { ProfileComponent } from './Components/profile/profile.component';
import { loginGuardGuard } from './Guards/login-guard.guard';

const routes: Routes = [
  {
    path:'login',
    component: LoginComponent
  },
  {
    path:'signup',
    component: SignupComponent
  },
  {
    path:'home',
    component: HomeComponent,
    canActivate:[loginGuardGuard],
    children:[
      {
        path:'',
        component:ShowProductsComponent
      },
      {
        path:'Cart',
        component:CartComponent
      },
      {
        path:'WishList',
        component:WishListComponent
      },
      {
        path:'ProdDetails/:id',
        component:ProductDetailsComponent
      },
      {
        path:'profile',
        component:ProfileComponent
      }
    ]
  },
  {
    path:'',
    redirectTo:'home',
    pathMatch:'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
