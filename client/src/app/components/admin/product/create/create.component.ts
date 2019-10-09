import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/core/services/category.service';
import { Category } from 'src/app/core/models/product/category.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/core/services/product.service';
import ProductModel from 'src/app/core/models/product/product.model';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  categories: Category[];
  createProductForm: FormGroup;

  constructor(
    private categoryService: CategoryService,
    private fb: FormBuilder,
    private productService: ProductService
  ) {
    this.categoryService.getCategoriesFromServer().subscribe(categories => {
      this.categories = categories;
    });
  }
  ngOnInit() {
    this.createProductForm = this.fb.group({
      name: [null, [Validators.required, Validators.minLength(3)]],
      categoryName: [null, [Validators.required]],
      price: [null, [Validators.required, Validators.min(0)]],
      image: [null, [Validators.required, Validators.pattern('http|https')]]
    });
  }

  create() {
    // this.spinner.show();
    const { name, categoryName, price, image } = this.createProductForm.value;
    const newProduct = { name, categoryName, price, image };
    this.productService.createProduct(newProduct);
    // this.spinner.hide();
  }
}
