import { Product } from './../Components/show-products/show-products.component';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }

  lengthOfDdata: number = 0;
  finalProdctList = new BehaviorSubject([]);
  searchObs = new BehaviorSubject<string>('');

  getData(skipValue:number, limitValue:number): void{
    this.http.get("https://dummyjson.com/products?skip=" +skipValue + "&limit="+ limitValue).subscribe((data:any) =>{
      let prod = data.products;
      this.lengthOfDdata = data.total;
      console.log(this.lengthOfDdata);
      prod.map((product:any) => {
        product.quantity = 1;
      })
      this.finalProdctList.next(prod);
    });
  }

  getCategories(): Observable<any>
  {
    return this.http.get("https://dummyjson.com/products/categories");
  }

  searchProduct(searchText:string):void
  {
    if(searchText != '')
      {
        this.http.get("https://dummyjson.com/products/search?q=" + searchText).subscribe((data:any) =>
        {
          let prod = data.products;
          this.lengthOfDdata = data.total;
          console.log(this.lengthOfDdata);
          prod.map((product:any) => {
            product.quantity = 1;
          });
          this.finalProdctList.next(data.products);
        });
      }
  }

  getCategorizedProducts(productCategory:string): void
  {
    this.http.get("https://dummyjson.com/products/category/"+ productCategory).subscribe((data:any) =>{
      let prod = data.products;
      this.lengthOfDdata = data.total;
      console.log(this.lengthOfDdata);
      prod.map((product:any) => {
        product.quantity = 1;
      });
      this.finalProdctList.next(data.products);
    });
  }

  getSingleProduct(prdId:number): Observable<any>
  {
    return this.http.get<Product>("https://dummyjson.com/products/" + prdId);
  }
}
