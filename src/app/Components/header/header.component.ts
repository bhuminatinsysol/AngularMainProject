import { Component, inject } from '@angular/core';
import { CartManagementService } from 'src/app/Services/cart-management.service';
import { Product } from '../show-products/show-products.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  cartmanager = inject(CartManagementService);
  cartList: Product[] = [];
  cartObs!: Subscription;

  ngOnInit(): void {
    this.cartObs = this.cartmanager.productObs.subscribe((product: Product[]) => {
      this.cartList = product;
    });
  }

  searchFun(data:any): void {
    this.cartmanager.searchObs.next(data.target.value);
  }

  ngOnDestory(): void {
    this.cartObs.unsubscribe();
  }
}
