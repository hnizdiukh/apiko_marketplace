import React, { Fragment } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import routes from 'src/routes/config';
import { Icon } from 'src/components/CustomComponents/Icon/Icon';
import AccountDropdown from './Account/AccountDropdown';
import Search from './SearchForm/SearchForm';

export const NavBar = ({ user, onLogout }) => {
	const location = useLocation();
	let classNames;
	const isWhiteNavbar = location.pathname === routes.LOGIN || location.pathname === routes.REGISTER;
	const isSearchShown = location.pathname === routes.HOME || location.pathname === routes.WISH_LIST;
	if (isWhiteNavbar) {
		classNames = 'navbar';
	} else {
		classNames = 'navbar main-navbar';
	}
	return (
		<nav className={classNames}>
			<div className="top-navbar">
				<NavLink to={routes.HOME}>
					<Icon name={isWhiteNavbar ? 'logo' : 'logo_white'} height="42" width="102" />
				</NavLink>
				<div className="right-nav-btns">
					<NavLink to={routes.SELL} className="btn sell-btn">
						Sell
					</NavLink>
					{user ? (
						<Fragment>
							<AccountDropdown user={user} onLogout={onLogout} />
						</Fragment>
					) : (
						<Fragment>
							<NavLink
								to={routes.LOGIN}
								className="btn-login"
								style={{ color: isWhiteNavbar ? '#2B2B2B' : '#FFFFFF' }}
							>
								Login
							</NavLink>
						</Fragment>
					)}
					<NavLink to={routes.WISH_LIST} className="wishlist-link">
						{location.pathname === routes.WISH_LIST ? (
							<Icon name="heart_filled" height="17" width="16" fill="#FFFFFF" />
						) : (
							<Icon name="heart" height="17" width="16" fill={isWhiteNavbar ? '#2E2E2E' : '#FFFFFF'} />
						)}
					</NavLink>
				</div>
			</div>
			{isSearchShown ? <Search /> : ''}
		</nav>
	);
};
