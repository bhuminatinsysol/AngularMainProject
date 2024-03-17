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

  searchObs = new BehaviorSubject<string>('');

  addProduct(product: Product): void {
    this.CartList.push(product);
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





}
