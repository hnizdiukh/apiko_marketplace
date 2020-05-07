import { handleActions, combineActions } from '@letapp/redux-actions';
import * as actions from './viewerActions';
import * as authActions from '../auth/authActions';

const INITIAL_STATE = {
	fetchViewer: {
		isLoading: false,
		isError: false,
		error: null
	},
	user: null,
	putUser: {
		isLoading: false,
		isError: false,
		error: null
	}
};

export default handleActions(
	{
		[actions.fetchViewer.start]: (state) => ({
			...state,
			fetchViewer: {
				...state.fetchViewer,
				isLoading: true,
				error: null,
				isError: false
			}
		}),
		[combineActions(actions.fetchViewer.success, authActions.register.success)]: (state, action) => ({
			...state,
			fetchViewer: {
				...state.fetchViewer,
				isLoading: false
			},
			user: action.payload
		}),
		[actions.fetchViewer.error]: (state, action) => ({
			...state,
			fetchViewer: {
				...state.fetchViewer,
				isLoading: false,
				error: action.payload,
				isError: true
			}
		}),

		[actions.putUser.start]: (state) => ({
			...state,
			putUser: {
				...state.putUser,
				isLoading: true,
				error: null,
				isError: false,
				isSuccess: false
			}
		}),
		[actions.putUser.success]: (state, action) => ({
			...state,
			putUser: {
				...state.putUser,
				isLoading: false,
				isSuccess: true
			},
			user: action.payload
		}),
		[actions.putUser.error]: (state, action) => ({
			...state,
			putUser: {
				...state.putUser,
				isLoading: false,
				error: action.payload,
				isError: true,
				isSuccess: false
			}
		})
	},
	INITIAL_STATE
);
