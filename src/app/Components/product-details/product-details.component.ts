import { Product } from './../show-products/show-products.component';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/Services/api.service';
import { CartManagementService } from 'src/app/Services/cart-management.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent {
  router = inject(Router);
  routes = inject(ActivatedRoute);
  selected_pid!: number;

  selectedPhoto!: string;
  constructor(private api: ApiService, private cart:CartManagementService){}

  selectedProduct!: Product;

  getDataObsProd !: Subscription;

  ngOnInit(): void {
    this.routes.paramMap.subscribe((params: any) => {
      this.selected_pid = params.get("id");
    });

    this.getDataObsProd = this.api.getSingleProduct(this.selected_pid).subscribe((data:Product)=>{
      let prod = data;
      prod.quantity = 1;
      this.selectedProduct = data;
      this.selectedPhoto = prod.thumbnail;
      console.log("selected Product: ", this.selectedProduct);
    });
  }

  changePhoto(photo: string): void
  {
    this.selectedPhoto = photo;
    console.log("selected Photo: "+ this.selectedPhoto);
  }

  BuyProduct(item:Product):void{
    this.cart.addProduct(item);
  }

  ngOnDestroy(): void {
    console.log("product details destroy");
    this.getDataObsProd.unsubscribe();
    console.log("Product details observer unsubscribe");
  }

}
