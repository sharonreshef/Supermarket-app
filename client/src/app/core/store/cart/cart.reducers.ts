import { CartState } from './cart.state';
import {
  ADD_TO_CART,
  UPDATE_CART,
  REMOVE_FROM_CART,
  CLEAR_CART
} from './cart.actions';
import { CartProductModel } from '../../models/cart/cart.model';

const initialState: CartState = {
  products: []
};

function addToCart(state: CartState, product: CartProductModel) {
  if (state.products.find(p => p._id === product._id)) {
    const newProducts = state.products.slice();
    const cartProduct = newProducts.find(p => p._id === product._id);
    cartProduct.quantity = +1;
    return {
      ...state,
      products: newProducts
    };
  }

  return {
    ...state,
    products: [...state.products, product]
  };
}

function updateCart(state: CartState, id: string, quantity: number) {
  // debugger
  const newProducts = state.products.slice();
  const cartProduct = newProducts.find(p => p._id === id);
  cartProduct.quantity = quantity;

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
