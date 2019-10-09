import ProductState from './product.state';
import * as ProductActions from './product.actions';

const initialState: ProductState = {
  all: []
};

function getAllProducts(state, action) {
  return {
    ...state,
    all: action
  };
}

function createProduct(state, action) {
  return {
    ...state,
    all: [...state.all, action]
  };
}

function editProduct(state, action) {
  return {
    ...state,
    all: [...state.all.filter(p => p._id !== action._id), action]
  };
}

export function productReducer(
  state: ProductState = initialState,
  action: ProductActions.Types
) {
  switch (action.type) {
    case ProductActions.GET_ALL_PRODUCTS:
      return getAllProducts(state, action.payload);

    case ProductActions.CREATE_PRODUCT:
      return createProduct(state, action.payload);

    case ProductActions.EDIT_PRODUCT:
      return editProduct(state, action.payload);
    default:
      return state;
  }
}
