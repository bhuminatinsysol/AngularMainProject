import { Component, EventEmitter, Input, Output } from '@angular/core';
import { productCategories } from '../show-products/show-products.component';

@Component({
  selector: 'app-category-menu',
  templateUrl: './category-menu.component.html',
  styleUrls: ['./category-menu.component.scss']
})
export class CategoryMenuComponent {
  @Input() productCategories: productCategories = {
    men:[],
    general:[],
    women:[],
  };
  @Output() AllCatEvent: EventEmitter<void> = new EventEmitter();
  @Output() filterEvent: EventEmitter<string> = new EventEmitter();
  AllCategory(): void {
    this.AllCatEvent.emit();
  }

  filter(st:string): void {
    this.filterEvent.emit(st);
  }
}
