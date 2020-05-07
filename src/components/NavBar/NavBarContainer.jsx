import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { NavBar } from './NavBar';
import routes from 'src/routes/config';
import { useDispatch, useSelector } from 'react-redux';
import { viewerOperations } from 'src/modules/viewer';
import { authOperations } from 'src/modules/auth';

const NavBarContainer = () => {
	const dispatch = useDispatch();
	const userState = useSelector((state) => state.viewer.user);

	useEffect(
		() => {
			dispatch(viewerOperations.fetchViewer());
		},
		[ dispatch ]
	);

	const history = useHistory();
	const onLogout = async () => {
		try {
			await dispatch(authOperations.logout());
			console.log('logout');
			history.push(routes.LOGIN);
		} catch (error) {
			console.error(error);
		}
	};

	return <NavBar user={userState} onLogout={onLogout} />;
};

export default NavBarContainer;
