import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { NavBar } from './NavBar';
import Api from 'src/api';
import routes from 'src/routes/config';

const NavBarContainer = () => {
	const [ user, setUser ] = useState();
	const history = useHistory();

	const onLogout = () => {
		try {
			Api.Auth.logout();
			console.log('logout');
			setUser(null);
			history.push(routes.LOGIN);
		} catch (error) {
			console.error(error);
		}
	};

	return <NavBar user={user} onLogout={onLogout} />;
};

export default NavBarContainer;
