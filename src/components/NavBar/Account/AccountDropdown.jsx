import React, { Fragment, useState, useEffect, useRef } from 'react';
import Badge from '../../CustomComponents/Badge';
import { NavLink } from 'react-router-dom';
import routes from 'src/routes/config';
import './account-dropdown.css';

const AccountDropdown = ({ user, onLogout }) => {
	const [ isDropdownShown, setDropdownShown ] = useState(false);
	const accountMenuRef = useRef();

	const onClick = () => {
		setDropdownShown(!isDropdownShown);
	};

	useEffect(
		() => {
			const handleClickOutside = (event) => {
				if (accountMenuRef.current && !accountMenuRef.current.contains(event.target)) {
					setDropdownShown(false);
				}
			};

			document.addEventListener('mousedown', handleClickOutside);

			return () => {
				document.removeEventListener('mousedown', handleClickOutside);
			};
		},
		[ isDropdownShown, accountMenuRef ]
	);

	return (
		<Fragment>
			<Badge user={user} onClick={onClick} wrapperClassName="badge-toggler" size="40px" />
			<div className="account-menu" style={{ display: isDropdownShown ? 'flex' : 'none' }} ref={accountMenuRef}>
				<span className="account-dropdown-row">
					<span className="avatar-wrap">
						<Badge user={user} size="40px" />
					</span>
					<span className="account-dropdown-col">
						<b className="account-dropdown-fullName">{user.fullName}</b>
						<p className="account-dropdown-email">{user.email}</p>
						<NavLink to={routes.PROFILE} className="profile-small-link">
							Profile
						</NavLink>
					</span>
				</span>
				<NavLink to={routes.PROFILE} className="profile-link">
					Edit Profile
				</NavLink>
				<hr />
				<NavLink to={routes.LOGIN} className="profile-link" onClick={onLogout}>
					Logout
				</NavLink>
			</div>
		</Fragment>
	);
};

export default AccountDropdown;
