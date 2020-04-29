import React, { useEffect } from 'react';
import { Homepage } from './HomepageComponent';
import { useSelector, useDispatch } from 'react-redux';

import { viewerOperations } from 'src/modules/viewer';
import Loading from '../CustomComponents/Loading';

const HomepageContainer = () => {
	const dispatch = useDispatch();
	const isLoading = useSelector((state) => state.viewer.fetchViewer.isLoading);
	const userState = useSelector((state) => state.viewer.user);

	useEffect(
		() => {
			dispatch(viewerOperations.fetchViewer());
		},
		[ dispatch ]
	);

	let HomepageElement = isLoading ? <Loading /> : <Homepage user={userState} />;

	return HomepageElement;
};

export default HomepageContainer;
