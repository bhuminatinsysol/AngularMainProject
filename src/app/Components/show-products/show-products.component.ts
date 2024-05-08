import { Component, ViewEncapsulation, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/Services/api.service';
import { CartManagementService } from 'src/app/Services/cart-management.service';
import { WishListService } from 'src/app/Services/wish-list.service';

@Component({
  selector: 'app-show-products',
  templateUrl: './show-products.component.html',
  styleUrls: ['./show-products.component.scss'],
})
export class ShowProductsComponent {

  filterText: string = '';
  productList: Product[] = [];

  paginationArray: number[] = [];
  getDataObs!: Subscription;

  router = inject(Router);
  currentRoute = inject(ActivatedRoute);
  constructor(private api: ApiService, private cart: CartManagementService, private wishlist: WishListService) { }

  filterSearchText: string = "";

  skipValue: number = 0;
  limitValue: number = 10;
  productCategories: productCategories = {
    general: [],
    men: [],
    women: [],
  };
  actualLength: number = 0;
  alerts: ExampleAlertType[] = [];

  add(item:Product): void {
    this.alerts.push({
      msg: `${item.title} added successfully to your cart.`,
      timeout: 5000
    });
  }

  onClosed(dismissedAlert: ExampleAlertType): void {
    this.alerts = this.alerts.filter((alert) => alert !== dismissedAlert);
  }

  ngOnInit(): void {
    this.updateProductList();
    this.getDataObs = this.api.finalProdctList.subscribe((data: Product[]) => {
      this.productList = data;
      this.actualLength = this.api.lengthOfDdata;
      this.paginationArray = [];
      for (let i = 0; i < this.actualLength; i += 10) {
        this.paginationArray.push(i);
      }
    });
    this.getAllCategories();
  }

  JumpToSection(section: string): void {
    document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
  }
  addOrRemoveWishList(id: number): void {
    this.wishlist.addToWishList(id);
  }

  checkWishList(id: number): boolean {
    return this.wishlist.checkProductInWishList(id);
  }

  SkipValueUpdate(): void {
    this.JumpToSection('mainAlbum');
    if (this.skipValue != 0) {
      this.skipValue -= 10;
      this.updateProductList();
    }
  }

  limitValueUpdate(): void {
    this.JumpToSection('mainAlbum');
    if (this.skipValue < 90) {
      this.skipValue += 10;
      this.updateProductList();
    }
  }
  openpage(i: number): void {
    this.JumpToSection('mainAlbum');
    this.skipValue = i;
    this.updateProductList();
  }
  AllCategory(): void {
    this.skipValue = 0;
    this.updateProductList();
  }

  updateProductList(): void {
    this.api.getData(this.skipValue, this.limitValue);
  }

  searchFun(event:Event): void {
    this.api.searchProduct((event.target as HTMLInputElement).value);
  }

  BuyProduct(item: Product): void {
    this.cart.addProduct(item);
    this.add(item);
  }

  filter(x: string): void {
    this.api.getCategorizedProducts(x);
    this.JumpToSection('mainAlbum');
  }

  ShowProduct(item: Product): void {
    this.router.navigateByUrl("/home/ProdDetails/" + item.id);
  }

  getAllCategories(): void {
    this.api.getAllCategories().subscribe((data: string[]) => {
      data.map(x => {
        if (x.startsWith('men')) {
          this.productCategories.men.push(x);
        }
        else if (x.startsWith('women')) {
          this.productCategories.women.push(x);
        }
        else {
          this.productCategories.general.push(x);
        }
      })
    })
  }


  ngOnDestroy(): void {
    this.getDataObs.unsubscribe();
  }

}

export interface Product {
  id: number,
  category: string,
  description: string,
  price: number,
  rating: any,
  count: number,
  title: string,
  brand: string,
  discountPercentage: number,
  images: string[],
  stock: number,
  thumbnail: string,
  quantity: number
}

export interface productCategories {
  general: string[],
  men: string[],
  women: string[],
}
type ExampleAlertType = { msg: string; timeout: number };
