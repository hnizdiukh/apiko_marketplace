import * as actions from './authActions';
import Api from '../../api';
import { viewerOperations } from '../viewer';

export function login(body) {
	return async function loginThunk(dispatch) {
		try {
			dispatch(actions.login.start());

			const res = await Api.Auth.login(body);

			const { user, token } = res.data;

			Api.Auth.setToken(token);

			dispatch(actions.login.success(user));
			dispatch(viewerOperations.fetchViewer());
		} catch (err) {
			dispatch(actions.login.error({ message: err.message }));
		}
	};
}

export function register(body) {
	return async function registerThunk(dispatch) {
		try {
			dispatch(actions.register.start());

			const res = await Api.Auth.register(body);

			const { user, token } = res.data;
			Api.Auth.setToken(token);
			dispatch(actions.register.success(user));
		} catch (err) {
			dispatch(actions.register.error({ message: err.message }));
		}
	};
}

export function logout() {
	return async function logoutThunk(dispatch) {
		try {
			dispatch(actions.logout.start());

			await Api.Auth.logout();

			dispatch(actions.logout.success());
		} catch (err) {
			dispatch(actions.logout.error({ message: err.message }));
		}
	};
}
