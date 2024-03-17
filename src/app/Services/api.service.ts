import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }
  private datasub = new Subject();

  getData(): Subject<any> {
    this.http.get("https://dummyjson.com/products").subscribe((data:any) =>{
      let prod = data.products;
      prod.map((product:any) => {
        product.quantity = 1;
      })
      this.datasub.next(prod);
    });
    return this.datasub;
  }

}
