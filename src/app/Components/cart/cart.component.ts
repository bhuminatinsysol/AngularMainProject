import { Component } from '@angular/core';
import { CartManagementService } from 'src/app/Services/cart-management.service';
import { Product } from '../show-products/show-products.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {
  constructor(private cart: CartManagementService)
  {

  }
  cartList: Product[] = [];

  cartObs: any;
  shippingCharge:number = 20;

  ngOnInit() {
    this.cartObs= this.cart.productObs.subscribe((product: any) => {
      this.cartList=product;
      console.log("Cart list:- ",this.cartList);
    });
  }

  getTotal():number{
    let total = 0;
    this.cartList.map((product:Product) =>{
      total += product.quantity * product.price;
    });
    return total;
  }
  updateQty(id:number, qty:any):void
  {
    this.cartList.map((product:Product) =>{
      if(product.id === id)
      {
        product.quantity = qty.target.value;
      }
    });
  }
  deleteItem(id:any): void {
    this.cart.deleteProduct(id);
  }

  ngOnDestroy(): void {
    console.log("Cart destroyed");
    this.cartObs.unsubscribe();
    console.log("observabel unsubscribed successfully....");
  }
}
