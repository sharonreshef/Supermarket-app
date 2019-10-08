import { Component, OnInit, Input } from '@angular/core';
import { CategoryService } from 'src/app/core/services/category.service';
import { Category } from 'src/app/core/models/product/category.model';

@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.scss']
})
export class ProductFilterComponent implements OnInit {
  categories: Category[];
  @Input('category') category;

  constructor(private categoryService: CategoryService) {
    this.categoryService.getCategoriesFromServer().subscribe(categories => {
      this.categories = categories;
    });
  }

  ngOnInit() {}
}
