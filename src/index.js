import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import './App.css';
import NavBar from './components/NavBar/NavBarContainer';
import LoginForm from './components/LoginForm/LoginFormContainer';
import RegisterForm from './components/RegisterForm/RegisterFormContainer';
import routes from './routes/config';
import Homepage from './components/Homepage/HomepageContainer';
import store from './store/createStore';
import { appOperations } from './modules/app';
import { viewerOperations } from './modules/viewer';

const App = () => {
	store.dispatch(appOperations.init());
	store.dispatch(viewerOperations.fetchViewer());

	return (
		<BrowserRouter>
			<NavBar />
			<Switch>
				<Route path={routes.HOME} exact component={Homepage} />
				<Route path={routes.LOGIN} component={LoginForm} />
				<Route path={routes.REGISTER} component={RegisterForm} />
			</Switch>
		</BrowserRouter>
	);
};

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.querySelector('#root')
);
