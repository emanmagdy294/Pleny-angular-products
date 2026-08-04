import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-products-sidebar',
  standalone: true,
  templateUrl: './products-sidebar.html',
  styleUrl: './products-sidebar.scss'
})
export class ProductsSidebar {

  categories = input<string[]>([]);

  selectedCategory = output<string>();


  selectCategory(category: string) {
    this.selectedCategory.emit(category);
  }

}