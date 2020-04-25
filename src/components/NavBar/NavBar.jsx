import React from 'react';
import { NavLink } from 'react-router-dom';
import routes from 'src/routes/config';
import { Icon } from 'src/components/Icon/Icon';

export const NavBar = (props) => {
	return (
		<nav className="navbar">
			<NavLink to={routes.HOME}>
				<Icon name="logo" height="42" width="102" />
			</NavLink>
			<div className="right-nav-btns">
				{props.user ? (
					<button
						className=" btn-logout"
						onClick={() => {
							props.onLogout();
						}}
					>
						Logout
					</button>
				) : (
					<NavLink to={routes.LOGIN} className=" btn-login">
						Login
					</NavLink>
				)}
			</div>
		</nav>
	);
};
