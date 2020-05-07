import React, { useEffect } from 'react';
import { Homepage } from './HomepageComponent';
import { useSelector, useDispatch } from 'react-redux';

import Loading from '../CustomComponents/Loading';
import { productsOperations } from 'src/modules/products';

const HomepageContainer = () => {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.viewer.user);
	const products = useSelector((state) => state.products.products);
	const isLoading = useSelector((state) => state.products.fetchProducts.isLoading);

	useEffect(
		() => {
			if (user) dispatch(productsOperations.savedProducts());
		},
		[ user, dispatch ]
	);

	useEffect(
		() => {
			dispatch(productsOperations.fetchProducts());
		},
		[ dispatch ]
	);

	let HomepageElement = isLoading ? <Loading /> : <Homepage products={products} />;

	return HomepageElement;
};

export default HomepageContainer;
