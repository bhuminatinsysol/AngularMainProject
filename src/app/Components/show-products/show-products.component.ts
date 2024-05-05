import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/Services/api.service';
import { CartManagementService } from 'src/app/Services/cart-management.service';
import { WishListService } from 'src/app/Services/wish-list.service';

@Component({
  selector: 'app-show-products',
  templateUrl: './show-products.component.html',
  styleUrls: ['./show-products.component.scss']
})
export class ShowProductsComponent {
  filterText: string='';
  productList: Product[] = [];

  paginationArray: number[] = [];
  getDataObs!:Subscription;

  router = inject(Router);

  constructor(private api: ApiService, private cart:CartManagementService, private wishlist: WishListService){}

  filterSearchText : string = "";

  skipValue:number = 0;
  limitValue: number = 10;

  actualLength:number = 0;

  ngOnInit(): void {
    this.updateProductList();
    this.getDataObs = this.api.finalProdctList.subscribe((data:Product[]) => {
      this.productList = data;
      this.actualLength = this.api.lengthOfDdata;
      this.paginationArray = [];
      for(let i = 0; i < this.actualLength; i+=10)
        {
          this.paginationArray.push(i);
        }
    });
  }

  addOrRemoveWishList(id:number): void {
    this.wishlist.addToWishList(id);
  }

  checkWishList(id:number): boolean{
    return this.wishlist.checkProductInWishList(id);
  }

  SkipValueUpdate(): void
  {
    if(this.skipValue != 0)
      {
        console.log("Skip Value: " + this.skipValue);
        this.skipValue -= 10;
        this.updateProductList();
      }
  }

  limitValueUpdate(): void {
    if(this.skipValue < 90)
      {
        console.log("limit value: " + this.limitValue)
        this.skipValue += 10;
        this.updateProductList();
      }
  }
  openpage(i:number): void
  {
    this.skipValue = i;
    this.updateProductList();
  }
  AllCategory(): void
  {
    this.skipValue = 0;
    this.updateProductList();
  }

  updateProductList(): void
  {
    this.api.getData(this.skipValue,this.limitValue);
  }


  BuyProduct(item:Product):void{
    this.cart.addProduct(item);
  }

  filter(x:string):void
  {
    this.api.getCategorizedProducts(x);
  }

  ShowProduct(item:Product):void{
    this.router.navigateByUrl("ProdDetails/"+item.id);
  }

  ngOnDestroy():void
  {
    this.getDataObs.unsubscribe();
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
