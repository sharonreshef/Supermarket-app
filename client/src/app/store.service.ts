import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ProductService } from './product.service';
import { Product } from './models/product.model';
import { Category } from './models/category.model';
import { CategoryService } from './category.service';

export interface IState {
  products: Product[];
  categories: Category[];
  selectedProduct: Product;
  selectedCategory: string;
}

const initialState: IState = {
  products: [],
  selectedProduct: null,
  categories: [],
  selectedCategory: null
};

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private readonly _store = new BehaviorSubject<IState>(initialState);
  constructor(
    private productService: ProductService,
    private categoryService: CategoryService
  ) {}

  get currentState(): IState {
    return this._store.getValue();
  }

  setState(newState: Partial<IState>) {
    this._store.next({
      ...this.currentState,
      ...newState
    });
  }

  getProducts() {
    this.productService.getProductsFromServer().subscribe(products => {
      this.setState({
        products
      });
      console.log(this.products);
    });
  }

  get filterdProducts(): Product[] {
    if (!this.selectedCategory) {
      return this.products;
    }
    return this.currentState.products.filter(
      product => product.categoryName === this.selectedCategory
    );
  }

  setSelectedCategory(categoryName: string) {
    this.setState({
      selectedCategory: categoryName
    });
  }

  // deleteApartment(id: string) {
  //   this.apartmentService.deleteApartmentFromServer(id).subscribe(
  //     apartment => console.log(apartment),
  //     error => console.log('Error: ', error),
  //     () => {
  //       this.getApartments();
  //     }
  //   );
  // }

  get products(): Product[] {
    return this.currentState.products;
  }

  get selectedProduct(): Product {
    return this.currentState.selectedProduct;
  }

  get categories(): Category[] {
    return this.currentState.categories;
  }

  get selectedCategory(): IState['selectedCategory'] {
    return this.currentState.selectedCategory;
  }

  getCategories() {
    this.categoryService.getCategoriesFromServer().subscribe(categories => {
      this.setState({
        categories
      });
    });
  }

  // getApartmentById(id: string) {
  //   this.apartmentService
  //     .getApartmentDetailsFromServer(id)
  //     .subscribe(apartment => {
  //       this.setState({
  //         selectedApartment: apartment
  //       });
  //     });
  // }

  // addApartment(apartment: Apartment) {
  //   return this.apartmentService
  //     .addApartmentToServer(apartment)
  //     .subscribe(apartmentFromServer => {
  //       this.setState({
  //         apartments: this.apartments.concat(apartmentFromServer)
  //       });
  //     });
  // }
}
