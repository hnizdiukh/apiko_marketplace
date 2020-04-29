import React from 'react';

export const Homepage = ({ user }) => {
	return <div>{user ? user.fullName : 'Not logged'}</div>;
};
