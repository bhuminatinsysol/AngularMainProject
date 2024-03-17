import { Component, Input, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/Services/api.service';
import { CartManagementService } from 'src/app/Services/cart-management.service';

@Component({
  selector: 'app-show-products',
  templateUrl: './show-products.component.html',
  styleUrls: ['./show-products.component.scss']
})
export class ShowProductsComponent {

  filterText: string='';
  productList: Product[] = [];
  FilteredProductList: Product[] = [];

  getDataObs!:Subscription;

  router = inject(Router);

  api = inject(ApiService);

  cart = inject(CartManagementService);
  filterSearchText : string = "";

  ngOnInit(): void {
    this.getDataObs = this.api.getData().subscribe((data:any) => {
      this.productList = data;
      this.FilteredProductList= this.productList;
    });

    this.cart.searchObs.subscribe((data:string) => {
      this.filterText = data;
    });

  }



  BuyProduct(item:Product):void{
    this.cart.addProduct(item);
  }

  filter(x:string):void
  {
    this.filterSearchText = x;
    this.FilteredProductList= this.productList;
    if(x != '')
    {
      this.FilteredProductList = this.FilteredProductList.filter((item:Product) =>{
      return item.category === x;
      });
    }
  }

  ShowProduct(item:Product):void{
    this.router.navigateByUrl("ProdDetails/"+item.id);
  }

  ngOnDestroy():void
  {
    console.log("showProduct destroyed");
    this.getDataObs.unsubscribe();
    console.log("showProduct getData observable unsubscribed");
  }

}

export interface Product
{
  id: number,
  category: string,
  description: string,
  price: number,
  rating: any,
  count: number,
  title: string,
  brand: string,
  discountPercentage: number,​​​
  images: string[],
  stock: number,
  thumbnail: string,
  quantity: number
}
