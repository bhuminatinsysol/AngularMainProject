import { BehaviorSubject } from 'rxjs';
import { Product } from './../Components/show-products/show-products.component';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartManagementService {

  constructor() { }

  CartList: Product[] = [];

  productObs = new BehaviorSubject<Product[]>([]);


  addProduct(product: Product): void {
    let index =  this.checkProduct(product);
    if(index != -1)
      {
        this.CartList[index].quantity += 1;
      }
      else{
        this.CartList.push(product);
      }
    this.productObs.next(this.CartList);
  }

  deleteProduct(pid: any): void {
    this.CartList.map((product,index)=>{
      if(product.id === pid)
      {
        this.CartList.splice(index, 1);
      }
    });
    this.productObs.next(this.CartList);
  }

  checkProduct(product: Product): number{
    return this.CartList.findIndex((p)=> p.id === product.id);
  }



}
