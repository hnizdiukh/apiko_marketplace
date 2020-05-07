import { handleActions } from '@letapp/redux-actions';
import * as actions from './productsActions';

const INITIAL_STATE = {
	fetchProducts: {
		isLoading: false,
		isError: false,
		error: null,
		isSuccess: false
	},
	products: [],
	search: {
		isLoading: false,
		isError: false,
		error: null,
		isSuccess: false
	},
	saveProduct: {
		isLoading: false,
		isError: false,
		error: null,
		isSuccess: false
	},
	unsaveProduct: {
		isLoading: false,
		isError: false,
		error: null,
		isSuccess: false
	},
	savedProducts: {
		isLoading: false,
		isError: false,
		error: null,
		isSuccess: false
	},
	saved: []
};

export default handleActions(
	{
		[actions.products.start]: (state) => ({
			...state,
			fetchProducts: {
				...state.fetchProducts,
				isLoading: true,
				error: null,
				isError: false,
				isSuccess: false
			}
		}),
		[actions.products.success]: (state, action) => ({
			...state,
			fetchProducts: {
				...state.fetchProducts,
				isLoading: false,
				isSuccess: true
			},
			products: action.payload
		}),
		[actions.products.error]: (state, action) => ({
			...state,
			fetchProducts: {
				...state.fetchProducts,
				isLoading: false,
				error: action.payload,
				isError: true,
				isSuccess: false
			}
		}),

		// SEARCH

		[actions.search.start]: (state) => ({
			...state,
			search: {
				...state.search,
				isLoading: true,
				error: null,
				isError: false,
				isSuccess: false
			}
		}),
		[actions.search.success]: (state, action) => ({
			...state,
			search: {
				...state.search,
				isLoading: false,
				isSuccess: true
			},
			products: action.payload
		}),
		[actions.search.error]: (state, action) => ({
			...state,
			search: {
				...state.search,
				isLoading: false,
				error: action.payload,
				isError: true,
				isSuccess: false
			}
		}),

		// fetch saved products

		[actions.savedProducts.start]: (state) => ({
			...state,
			savedProducts: {
				...state.savedProducts,
				isLoading: true,
				error: null,
				isError: false,
				isSuccess: false
			}
		}),
		[actions.savedProducts.success]: (state, action) => ({
			...state,
			savedProducts: {
				...state.savedProducts,
				isLoading: false,
				isSuccess: true
			},
			saved: action.payload
		}),
		[actions.savedProducts.error]: (state, action) => ({
			...state,
			savedProducts: {
				...state.savedProducts,
				isLoading: false,
				error: action.payload,
				isError: true,
				isSuccess: false
			}
		}),

		// SAVE PRODUCT

		[actions.saveProduct.start]: (state) => ({
			...state,
			saveProduct: {
				...state.saveProduct,
				isLoading: true,
				error: null,
				isError: false,
				isSuccess: false
			}
		}),
		[actions.saveProduct.success]: (state, action) => ({
			...state,
			saveProduct: {
				...state.saveProduct,
				isLoading: false,
				isSuccess: true
			},
			saved: [ ...state.saved, action.payload ]
		}),
		[actions.saveProduct.error]: (state, action) => ({
			...state,
			saveProduct: {
				...state.saveProduct,
				isLoading: false,
				error: action.payload,
				isError: true,
				isSuccess: false
			}
		}),

		// UNSAVE RRODUCT

		[actions.unsaveProduct.start]: (state) => ({
			...state,
			unsaveProduct: {
				...state.unsaveProduct,
				isLoading: true,
				error: null,
				isError: false,
				isSuccess: false
			}
		}),
		[actions.unsaveProduct.success]: (state, action) => ({
			...state,
			unsaveProduct: {
				...state.unsaveProduct,
				isLoading: false,
				isSuccess: true
			},
			saved: state.saved.filter((product) => product.id !== action.payload.id)
		}),
		[actions.unsaveProduct.error]: (state, action) => ({
			...state,
			unsaveProduct: {
				...state.unsaveProduct,
				isLoading: false,
				error: action.payload,
				isError: true,
				isSuccess: false
			}
		})
	},
	INITIAL_STATE
);
