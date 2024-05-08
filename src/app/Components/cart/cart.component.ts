import { Component } from '@angular/core';
import { CartManagementService } from 'src/app/Services/cart-management.service';
import { Product } from '../show-products/show-products.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {
  constructor(private cart: CartManagementService){}
  cartList: Product[] = [];
  cartObs!: Subscription;
  shippingCharge:number = 20;

  ngOnInit() {
    this.cartObs= this.cart.productObs.subscribe((product: any) => {
      this.cartList=product;
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
    this.cartObs.unsubscribe();
  }
}
