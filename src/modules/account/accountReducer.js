import { handleActions } from '@letapp/redux-actions';
import * as actions from './accountActions';

const INITIAL_STATE = {
	fetchProducts: {
		isLoading: false,
		isError: false,
		error: null,
		isSuccess: false
	},
	products: []
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
		})
	},
	INITIAL_STATE
);
