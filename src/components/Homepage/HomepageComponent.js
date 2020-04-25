import React, { useContext } from 'react';
import { UserContext } from 'src/utils/UserContext';

export const Homepage = (props) => {
	const { user } = useContext(UserContext);

	return <div>Homepage {user ? user.fullName : ''}</div>;
};
