import { combineReducers } from 'redux';
import app from './app';
import auth from './auth';
import viewer from './viewer';
import products from './products';
import chat from './chat';
import messages from './messages';

const appReducer = combineReducers({
	app,
	auth,
	viewer,
	products,
	chat,
	messages
});

const rootReducer = (state, action) => {
	if (action.type === 'auth/LOGOUT_SUCCESS') {
		state = undefined;
	}

	return appReducer(state, action);
};

export default rootReducer;
