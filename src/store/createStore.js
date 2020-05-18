import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../modules';
import logger from 'redux-logger';

const store = createStore(rootReducer, compose(applyMiddleware(thunk, logger)));

export default store;
