import React, { useState } from 'react';
import { Icon } from './Icon/Icon';

const Eye = ({ inputName }) => {
	const [ isPasswordHidden, setPasswordShown ] = useState(false);

	const handleOnclick = () => {
		setPasswordShown(!isPasswordHidden);
		isPasswordHidden
			? (document.querySelector(`input[name=${inputName}]`).type = 'password')
			: (document.querySelector(`input[name=${inputName}]`).type = 'text');
	};
	return (
		<span className="password-eye-wrap">
			<span className="toggle-password" onClick={handleOnclick}>
				{isPasswordHidden ? (
					<Icon name="close_eye" height="16" width="24" />
				) : (
					<Icon name="open_eye" height="16" width="24" />
				)}
			</span>
		</span>
	);
};

export default Eye;
