import { handleActions } from '@letapp/redux-actions';
import * as actions from './productsActions';

const INITIAL_STATE = {
  fetchProducts: {
    isLoading: false,
    isError: false,
    error: null
  },
  fetchMoreProducts: {
    isLoading: false,
    isError: false,
    error: null
  },
  addProduct: {
    isLoading: false,
    isError: false,
    error: null
  },
  products: [],
  search: {
    isLoading: false,
    isError: false,
    error: null,
    searchParams: null
  },
  saveProduct: {
    isLoading: false,
    isError: false,
    error: null
  },
  unsaveProduct: {
    isLoading: false,
    isError: false,
    error: null
  },
  savedProducts: {
    isLoading: false,
    isError: false,
    error: null
  },
  getProduct: {
    isLoading: false,
    isError: false,
    error: null
  },

  saved: [],
  product: null
};

export default handleActions(
  {
    [actions.products.start]: (state) => ({
      ...state,
      fetchProducts: {
        ...state.fetchProducts,
        isLoading: true,
        error: null,
        isError: false
      }
    }),
    [actions.products.success]: (state, action) => ({
      ...state,
      fetchProducts: {
        ...state.fetchProducts,
        isLoading: false
      },
      products: action.payload,
      search: {
        ...state.search,
        searchParams: null
      }
    }),
    [actions.products.error]: (state, action) => ({
      ...state,
      fetchProducts: {
        ...state.fetchProducts,
        isLoading: false,
        error: action.payload,
        isError: true
      }
    }),

    // LOAD MORE PRODCUTS

    [actions.fetchMoreProducts.start]: (state) => ({
      ...state,
      fetchMoreProducts: {
        ...state.fetchMoreProducts,
        isLoading: true,
        error: null,
        isError: false
      }
    }),
    [actions.fetchMoreProducts.success]: (state, action) => ({
      ...state,
      fetchMoreProducts: {
        ...state.fetchMoreProducts,
        isLoading: false
      },
      products: [ ...state.products, ...action.payload ],
      search: {
        ...state.search,
        searchParams: null
      }
    }),
    [actions.fetchMoreProducts.error]: (state, action) => ({
      ...state,
      fetchMoreProducts: {
        ...state.fetchMoreProducts,
        isLoading: false,
        error: action.payload,
        isError: true
      }
    }),

    // ADD

    [actions.addProduct.start]: (state) => ({
      ...state,
      addProduct: {
        ...state.addProduct,
        isLoading: true,
        error: null,
        isError: false
      }
    }),
    [actions.addProduct.success]: (state, action) => ({
      ...state,
      addProduct: {
        ...state.addProduct,
        isLoading: false
      },
      products: [ ...state.products, action.payload ]
    }),
    [actions.addProduct.error]: (state, action) => ({
      ...state,
      addProduct: {
        ...state.addProduct,
        isLoading: false,
        error: action.payload,
        isError: true
      }
    }),

    // SEARCH

    [actions.search.start]: (state) => ({
      ...state,
      search: {
        ...state.search,
        isLoading: true,
        error: null,
        isError: false
      }
    }),
    [actions.search.success]: (state, { payload: { res, params } }) => ({
      ...state,
      search: {
        ...state.search,
        isLoading: false,
        searchParams: params
      },
      products: res
    }),
    [actions.search.error]: (state, action) => ({
      ...state,
      search: {
        ...state.search,
        isLoading: false,
        error: action.payload,
        isError: true
      }
    }),

    // fetch saved products

    [actions.savedProducts.start]: (state) => ({
      ...state,
      savedProducts: {
        ...state.savedProducts,
        isLoading: true,
        error: null,
        isError: false
      }
    }),
    [actions.savedProducts.success]: (state, action) => ({
      ...state,
      savedProducts: {
        ...state.savedProducts,
        isLoading: false
      },
      saved: action.payload
    }),
    [actions.savedProducts.error]: (state, action) => ({
      ...state,
      savedProducts: {
        ...state.savedProducts,
        isLoading: false,
        error: action.payload,
        isError: true
      }
    }),

    // SAVE PRODUCT

    [actions.saveProduct.start]: (state) => ({
      ...state,
      saveProduct: {
        ...state.saveProduct,
        isLoading: true,
        error: null,
        isError: false
      }
    }),
    [actions.saveProduct.success]: (state, action) => ({
      ...state,
      saveProduct: {
        ...state.saveProduct,
        isLoading: false
      },
      saved: [ ...state.saved, action.payload ]
    }),
    [actions.saveProduct.error]: (state, action) => ({
      ...state,
      saveProduct: {
        ...state.saveProduct,
        isLoading: false,
        error: action.payload,
        isError: true
      }
    }),

    // UNSAVE RRODUCT

    [actions.unsaveProduct.start]: (state) => ({
      ...state,
      unsaveProduct: {
        ...state.unsaveProduct,
        isLoading: true,
        error: null,
        isError: false
      }
    }),
    [actions.unsaveProduct.success]: (state, action) => ({
      ...state,
      unsaveProduct: {
        ...state.unsaveProduct,
        isLoading: false
      },
      saved: state.saved.filter((product) => product.id !== action.payload.id)
    }),
    [actions.unsaveProduct.error]: (state, action) => ({
      ...state,
      unsaveProduct: {
        ...state.unsaveProduct,
        isLoading: false,
        error: action.payload,
        isError: true
      }
    }),

    [actions.getProduct.start]: (state) => ({
      ...state,
      getProduct: {
        ...state.getProduct,
        isLoading: true,
        error: null,
        isError: false
      }
    }),
    [actions.getProduct.success]: (state, action) => ({
      ...state,
      getProduct: {
        ...state.getProduct,
        isLoading: false
      },
      product: action.payload
    }),
    [actions.getProduct.error]: (state, action) => ({
      ...state,
      getProduct: {
        ...state.getProduct,
        isLoading: false,
        error: action.payload,
        isError: true
      }
    })
  },
  INITIAL_STATE
);
