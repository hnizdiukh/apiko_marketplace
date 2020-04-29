import React from 'react';
import T from 'prop-types';

import { IconsConfig } from './IconsConfig';

export const Icon = ({ name, ...props }) => {
	const IconC = IconsConfig[name];
	return <IconC {...props} />;
};

Icon.propTypes = {
	name: T.string.isRequired
};
