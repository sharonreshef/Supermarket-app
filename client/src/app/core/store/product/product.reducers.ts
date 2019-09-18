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

// function deleteProduct(state, action) {
//     return {
//         ...state,
//         all: [...state.all.filter(p => p._id !== action._id)]
//     }
// }

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

    // case ProductActions.DELETE_PRODUCT:
    //     return deleteProduct(state, action.payload);
    default:
      return initialState;
  }
}
