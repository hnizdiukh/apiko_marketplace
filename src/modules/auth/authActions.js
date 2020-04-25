import createAsyncActions from '@letapp/redux-actions/lib/createAsyncActions';

export const login = createAsyncActions('auth/LOGIN');
export const register = createAsyncActions('auth/REGISTER');
