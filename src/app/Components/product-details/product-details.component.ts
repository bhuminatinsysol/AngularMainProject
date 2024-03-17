import { Product } from './../show-products/show-products.component';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { ApiService } from 'src/app/Services/api.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent {
  router = inject(Router);
  routes = inject(ActivatedRoute);
  prodList: Product[] = [];
  selected_pid!: number;
  api = inject( ApiService);

  selectedProduct!: Product | null;

  getDataObsProd !: Subscription;

  ngOnInit(): void {

    this.getDataObsProd = this.api.getData().subscribe(
      {
        next: (data: any) => {
          this.prodList = data;
          this.selectProduct();
        }, error(err) {

        },
        complete() {
        }
      });


    this.routes.paramMap.subscribe((params: any) => {
      this.selected_pid = params.get("id");
    });

  }


  selectProduct(): void {
    console.log("In select Product: ", this.prodList);
    this.selectedProduct = this.prodList.filter((prod: Product) => {
      return prod.id == this.selected_pid;
    })[0];
    console.log("selected Product: ", this.selectedProduct);
  }

  ngOnDestroy(): void {
    console.log("product details destroy");
    this.getDataObsProd.unsubscribe();
    console.log("Product details observer unsubscribe");
  }
}
