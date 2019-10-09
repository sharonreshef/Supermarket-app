import { Component, OnInit } from '@angular/core';
import ProductModel from 'src/app/core/models/product/product.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/core/services/product.service';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/core/store/app.state';
import { CategoryService } from 'src/app/core/services/category.service';
import { Category } from 'src/app/core/models/product/category.model';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  _id: string;
  product: ProductModel;
  categories: Category[];
  category: Category;
  editProductForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private productService: ProductService,
    private categoryService: CategoryService,
    private store: Store<AppState> // private toastr: ToastrService
  ) {
    this._id = this.route.snapshot.params['id'];
    this.categoryService.getCategoriesFromServer().subscribe(categories => {
      this.categories = categories;
    });
  }

  ngOnInit() {
    this.store
      .pipe(select(state => state.product.all))
      .subscribe(async products => {
        this.product = await products.find(p => p._id === this._id);
        await this.partialUpdate();
      });

    this.editProductForm = this.fb.group({
      name: [null, [Validators.required, Validators.minLength(3)]],
      categoryName: [null, [Validators.required]],
      price: [null, [Validators.required, Validators.min(0)]],
      image: [null, [Validators.required, Validators.pattern('http|https')]]
    });
  }

  partialUpdate() {
    this.editProductForm.patchValue({
      name: this.product.name,
      categoryName: this.product.categoryName,
      price: this.product.price,
      image: this.product.image
    });
  }

  edit() {
    const product = Object.assign({}, this.product, this.editProductForm.value);
    this.productService.editProduct(product);
    // this.toastr.success('Book Edited!');
  }
}
