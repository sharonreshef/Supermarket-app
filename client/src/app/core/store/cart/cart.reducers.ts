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
  console.log(state, cart.products);
  return {
    ...state,
    products: cart.products
  };
}

function addToCart(state: CartState, product: CartProductModel) {
  if (state.products.find(p => p._id === product._id)) {
    const newProducts = state.products.slice();
    const cartProduct = newProducts.find(p => p._id === product._id);
    console.log(cartProduct);
    cartProduct.amount = +1;
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

function updateCart(state: CartState, id: string, amount: number) {
  // debugger
  const newProducts = state.products.slice();
  const cartProduct = newProducts.find(p => p._id === id);
  cartProduct.amount = amount;

  return {
    ...state,
    products: newProducts
  };
}

function removeFromCart(state: CartState, id: string) {
  return {
    ...state,
    products: [...state.products.filter(p => p._id !== id)]
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
