import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../Components/show-products/show-products.component';

@Pipe({
  name: 'filterProducts'
})
export class FilterProductsPipe implements PipeTransform {

  transform(value: Product[], searchText:string): Product[] {
    if(searchText != ''){
      return value.filter((prod:Product) => prod.title.toLowerCase().includes(searchText.toLowerCase()));
    }
    else
    {
      return value;
    }
  }

}
