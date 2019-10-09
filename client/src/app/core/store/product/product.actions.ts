import { Action } from '@ngrx/store';
import ProductModel from '../../models/product/product.model';

export const GET_ALL_PRODUCTS = '[PRODUCT] GET ALL';
export const CREATE_PRODUCT = '[PRODUCT] CREATE';
export const EDIT_PRODUCT = '[PRODUCT] EDIT';

export class GetAllProducts implements Action {
  type: string = GET_ALL_PRODUCTS;
  constructor(public payload: ProductModel[]) {}
}

export class CreateProduct implements Action {
  type: string = CREATE_PRODUCT;
  constructor(public payload) {}
}

export class EditProduct implements Action {
  type: string = EDIT_PRODUCT;
  constructor(public payload) {}
}

export type Types = GetAllProducts | CreateProduct | EditProduct;
