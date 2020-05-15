import React, { Fragment, useState } from 'react';
import { NavLink, useLocation, useHistory } from 'react-router-dom';
import routes from 'src/routes/config';
import { Icon } from 'src/components/CustomComponents/Icon/Icon';
import AccountDropdown from './Account/AccountDropdown';
import Search from './SearchForm/SearchForm';
import { useDispatch } from 'react-redux';
import { productsOperations } from 'src/modules/products';
import { toast } from 'react-toastify';
import Filters from './Filters/Filters';

export const NavBar = ({ user, onLogout }) => {
	const location = useLocation();

	const [ searchValues, setSearchValues ] = useState({ priceFrom: '', priceTo: '', location: '', keyword: '' });

	const dispatch = useDispatch();
	const history = useHistory();

	const pagesWithSearchBar = [ routes.HOME, routes.WISH_LIST, routes.PRODUCT ];
	const productRegex = new RegExp(routes.PRODUCT, 'g');

	const pagesWithWhiteNavbar = [ routes.LOGIN, routes.REGISTER ];
	let classNames;
	const isWhiteNavbar = pagesWithWhiteNavbar.includes(location.pathname);
	const isSearchShown = pagesWithSearchBar.includes(location.pathname) || location.pathname.match(productRegex);
	const isFilterShown = location.pathname === routes.HOME;

	if (isWhiteNavbar) {
		classNames = 'navbar';
	} else {
		classNames = 'navbar main-navbar';
	}

	const handleSearch = (e) => {
		e.preventDefault();
		let { keyword, location, priceFrom, priceTo } = searchValues;
		priceFrom = Number(priceFrom);
		priceTo = Number(priceTo);
		if (!keyword.trim() && !location.trim()) {
			return toast.error('Please enter product name or location');
		}

		if ((typeof priceFrom !== 'number' || typeof priceTo !== 'number') && (priceFrom && priceTo)) {
			return toast.error('Price fields have to be filled with numbers!');
		}
		let usp = new URLSearchParams();
		if (keyword.trim()) {
			usp.append('keywords', keyword);
		}
		if (location.trim()) {
			usp.append('location', location);
		}
		if (priceFrom) {
			usp.append('priceFrom', priceFrom);
		}
		if (priceTo) {
			usp.append('priceTo', priceTo);
		}
		if (location.pathname !== routes.HOME) history.push(routes.HOME);
		dispatch(productsOperations.search(usp));
	};

	return (
		<Fragment>
			<nav className={classNames}>
				<div className="top-navbar">
					<NavLink to={routes.HOME}>
						<Icon name={isWhiteNavbar ? 'logo' : 'logo_white'} height="42" width="102" />
					</NavLink>
					<div className="right-nav-btns">
						{isWhiteNavbar ? (
							''
						) : (
							<NavLink to={routes.CHAT} className="chat-link">
								<Icon name="chat" height="18" width="18" />
							</NavLink>
						)}
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
				{isSearchShown ? (
					<Search handleSearch={handleSearch} searchValues={searchValues} setSearchValues={setSearchValues} />
				) : (
					''
				)}
			</nav>
			{isFilterShown ? (
				<Filters handleSearch={handleSearch} searchValues={searchValues} setSearchValues={setSearchValues} />
			) : (
				''
			)}
		</Fragment>
	);
};
