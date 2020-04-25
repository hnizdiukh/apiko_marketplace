import React, { useState, useMemo } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar/NavBarContainer';
import LoginForm from './components/LoginForm/LoginFormContainer';
import RegisterForm from './components/RegisterForm/RegisterFormContainer';
import routes from './routes/config';
import Homepage from './components/Homepage/HomepageContainer';
import { UserContext } from './utils/UserContext';

const App = () => {
	const [ user, setUser ] = useState(null);

	const providerValue = useMemo(() => ({ user, setUser }), [ user, setUser ]);

	return (
		<BrowserRouter>
			<Switch>
				<UserContext.Provider value={providerValue}>
					<NavBar />
					<Route path={routes.HOME} exact component={Homepage} />
					<Route path={routes.LOGIN} component={LoginForm} />
					<Route path={routes.REGISTER} component={RegisterForm} />
				</UserContext.Provider>
			</Switch>
		</BrowserRouter>
	);
};

ReactDOM.render(<App />, document.querySelector('#root'));
