import { WishListService } from 'src/app/Services/wish-list.service';
import { Component } from '@angular/core';
import { Product } from '../show-products/show-products.component';
import { ApiService } from 'src/app/Services/api.service';
import { CartManagementService } from 'src/app/Services/cart-management.service';

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.scss']
})
export class WishListComponent {
  WishList:Product[]= [];
  wishListNumbers: number[] = [];
  constructor(private wishListServ: WishListService, private api: ApiService, private cart: CartManagementService){}
  ngOnInit(){
    this.wishListNumbers = this.wishListServ.WishList;
    for(let i=0;i<this.wishListNumbers.length;i++)
      {
        this.api.getSingleProduct(this.wishListNumbers[i]).subscribe(product => {
          let prod = product;
          prod.quantity = 1;
          this.WishList.push(prod);
        });
      }
  }


  BuyProduct(item:Product):void{
    this.cart.addProduct(item);
  }
}
