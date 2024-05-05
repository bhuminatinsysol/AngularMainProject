import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WishListService {

  constructor() { }

  WishList: number[] = [];

  addToWishList(id:number): void {
    if(this.WishList.includes(id)) {
      this.WishList = this.WishList.filter(w => w !== id);
    }
    else
    {
      this.WishList.push(id);
    }
  }

  checkProductInWishList(productId:number): boolean {
    if(this.WishList.includes(productId))
      {
        return true;
      }
      else{
        return false;
      }
  }

}
