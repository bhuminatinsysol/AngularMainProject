import { ShowProductsComponent } from './Components/show-products/show-products.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './Components/cart/cart.component';
import { ProductDetailsComponent } from './Components/product-details/product-details.component';
import { WishListComponent } from './Components/wish-list/wish-list.component';

const routes: Routes = [
  {
    path:'Products',
    component:ShowProductsComponent
  },
  {
    path:'',
    redirectTo:'Products',
    pathMatch:'full'
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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
