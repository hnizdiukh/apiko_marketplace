import { handleActions } from '@letapp/redux-actions';
import * as actions from './authActions';

const INITIAL_STATE = {
	login: {
		isLoading: false,
		isError: false,
		error: null,
		isSuccess: false
	},
	register: {
		isLoading: false,
		isError: false,
		error: null,
		isSuccess: false
	},
	logout: {
		isLoading: false,
		isError: false,
		error: null
	}
};

export default handleActions(
	{
		// LOGIN

		[actions.login.start]: (state) => ({
			...state,
			login: {
				...state.login,
				isLoading: true,
				error: null,
				isError: false,
				isSuccess: false
			}
		}),
		[actions.login.success]: (state) => ({
			...state,
			login: {
				...state.login,
				isLoading: false,
				isSuccess: true
			}
		}),
		[actions.login.error]: (state, action) => ({
			...state,
			login: {
				...state.login,
				isLoading: false,
				error: action.payload,
				isError: true,
				isSuccess: false
			}
		}),

		// REGISTER:

		[actions.register.start]: (state) => ({
			...state,
			register: {
				...state.register,
				isLoading: true,
				error: null,
				isError: false,
				isSuccess: false
			}
		}),
		[actions.register.success]: (state) => ({
			...state,
			register: {
				...state.register,
				isLoading: false,
				isSuccess: true
			}
		}),
		[actions.register.error]: (state, action) => ({
			...state,
			register: {
				...state.register,
				isLoading: false,
				error: action.payload,
				isError: true,
				isSuccess: false
			}
		}),
		[actions.logout.start]: (state) => ({
			...state,
			logout: {
				...state.logout,
				isLoading: true,
				error: null,
				isError: false
			}
		}),
		[actions.logout.success]: (state) => ({
			...state,
			logout: {
				...state.logout,
				isLoading: false
			}
		}),
		[actions.logout.error]: (state, action) => ({
			...state,
			logout: {
				...state.logout,
				isLoading: false,
				error: action.payload,
				isError: true
			}
		})
	},
	INITIAL_STATE
);
