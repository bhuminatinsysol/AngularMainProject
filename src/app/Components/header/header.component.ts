import { Component, inject } from '@angular/core';
import { CartManagementService } from 'src/app/Services/cart-management.service';
import { Product } from '../show-products/show-products.component';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/Services/api.service';
import { WishListService } from 'src/app/Services/wish-list.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  cartListLength: number = 0;
  cartObs!: Subscription;

  wishlistLength: number = 0;
  constructor(private api: ApiService, private cartmanager:CartManagementService, private wishlist: WishListService){}
  ngOnInit(): void {
    this.cartObs = this.cartmanager.productObs.subscribe((product: Product[]) => {
      this.cartListLength = product.length;
    });
    this.wishlistLength = this.wishlist.WishList.length;
  }

  searchFun(event:Event): void {
    this.api.searchProduct((event.target as HTMLInputElement).value);
  }

  ngOnDestory(): void {
    this.cartObs.unsubscribe();
  }
}
