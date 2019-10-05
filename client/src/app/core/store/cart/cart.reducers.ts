import { CartState } from './cart.state';
import { AppState } from '../app.state';
import {
  ADD_TO_CART,
  UPDATE_CART,
  REMOVE_FROM_CART,
  CLEAR_CART,
  GET_USER_CART
} from './cart.actions';
import { CartProductModel } from '../../models/cart/cartProduct.model';
import { CartModel } from '../../models/cart/cart.model';

const initialState: CartState = {
  products: []
};

function getUserCart(state: CartState, cart: CartModel) {
  return {
    ...state,
    products: cart.products
  };
}

function addToCart(state: CartState, product: CartProductModel) {
  if (state.products.find(p => p.productId === product.productId)) {
    const newProducts = state.products.slice();
    const cartProduct = newProducts.find(
      p => p.productId === product.productId
    );
    console.log(cartProduct);
    cartProduct.quantity = +1;
    return {
      ...state,
      products: newProducts
    };
  }
  console.log(state);
  console.log(state.products, product);

  return {
    ...state,
    products: [...state.products, product]
  };
}

function updateCart(state: CartState, id: string, quantity: number) {
  // debugger
  const newProducts = state.products.slice();
  const cartProduct = newProducts.find(p => p.productId === id);
  cartProduct.quantity = quantity;

  return {
    ...state,
    products: newProducts
  };
}

function removeFromCart(state: CartState, id: string) {
  return {
    ...state,
    products: [...state.products.filter(p => p.productId !== id)]
  };
}

function clearCart(state) {
  return {
    ...state,
    products: []
  };
}

export function cartReducer(state: CartState = initialState, action) {
  switch (action.type) {
    case GET_USER_CART:
      return getUserCart(state, action.payload);
    case ADD_TO_CART:
      return addToCart(state, action.payload);

    case UPDATE_CART:
      return updateCart(state, action.id, action.quantity);

    case REMOVE_FROM_CART:
      return removeFromCart(state, action.id);

    case CLEAR_CART:
      return clearCart(state);
    default:
      return state;
  }
}
