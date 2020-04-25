import React from 'react';
import { Icon } from '../Icon/Icon';

const Eye = () => (
	<span className="password-eye-wrap">
		<span toggle="#password-field" className="toggle-password">
			<Icon name="open_eye" height="16" width="24" />
		</span>
		<span className="margin-fix" />
	</span>
);

export default Eye;
