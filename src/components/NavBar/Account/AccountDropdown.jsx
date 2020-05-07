import React, { Fragment, useState, useEffect } from 'react';
import Badge from '../../CustomComponents/Badge';
import { NavLink } from 'react-router-dom';
import routes from 'src/routes/config';
import './account-dropdown.css';

const AccountDropdown = ({ user, onLogout }) => {
	const [ isDropdownShown, setDropdownShown ] = useState(false);

	const onClick = () => {
		setDropdownShown(!isDropdownShown);
	};

	useEffect(
		() => {
			if (isDropdownShown) {
				window.onclick = (event) => {
					if (event.target.className !== 'badge') {
						setDropdownShown(false);
					}
				};
			}
		},
		[ isDropdownShown ]
	);

	return (
		<Fragment>
			<Badge user={user} onClick={onClick} wrapperClassName="badge-toggler" size="40px" />
			<div className="account-menu" style={{ display: isDropdownShown ? 'flex' : 'none' }}>
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
				<NavLink
					to={routes.LOGIN}
					className="profile-link"
					onClick={() => {
						onLogout();
					}}
				>
					Logout
				</NavLink>
			</div>
		</Fragment>
	);
};

export default AccountDropdown;
