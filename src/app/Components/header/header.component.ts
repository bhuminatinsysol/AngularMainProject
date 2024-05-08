import { Component, inject } from '@angular/core';
import { CartManagementService } from 'src/app/Services/cart-management.service';
import { Product } from '../show-products/show-products.component';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/Services/api.service';
import { WishListService } from 'src/app/Services/wish-list.service';
import { AuthService, User } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  cartListLength: number = 0;
  cartObs!: Subscription;
  loggedInuser!: User;
  wishlistLength: number = 0;
  constructor(private api: ApiService, private cartmanager:CartManagementService, private wishlist: WishListService, private auth:AuthService){}
  ngOnInit(): void {
    this.cartObs = this.cartmanager.productObs.subscribe((product: Product[]) => {
      this.cartListLength = product.length;
    });
    this.wishlistLength = this.wishlist.WishList.length;
    this.auth.UserSubject.subscribe((user: User) => {
      this.loggedInuser = user;
    });
  }

  logOut(){
    this.auth.logout();
  }

  ngOnDestory(): void {
    this.cartObs.unsubscribe();
  }
}
