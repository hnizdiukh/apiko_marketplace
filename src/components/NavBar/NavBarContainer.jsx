import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { NavBar } from './NavBar';
import { UserContext } from 'src/utils/UserContext';
import Api from 'src/api';
import routes from 'src/routes/config';

const NavBarContainer = () => {
	const { user, setUser } = useContext(UserContext);

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
