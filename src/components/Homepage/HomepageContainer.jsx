import React, { useEffect } from 'react';
import { Homepage } from './HomepageComponent';
import { useSelector, useDispatch } from 'react-redux';

import Loading from '../CustomComponents/Loading/Loading';
import { productsOperations } from 'src/modules/products';
import './productlist.css';

const HomepageContainer = () => {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.viewer.user);
	const products = useSelector((state) => state.products.products);
	const isLoading = useSelector((state) => state.products.fetchProducts.isLoading);
	const isSearching = useSelector((state) => state.products.search.isLoading);

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

	let HomepageElement = isLoading || isSearching ? <Loading /> : <Homepage products={products} />;

	if (!products.length && !isLoading && !isSearching) {
		HomepageElement = <div className="no-products not-found">No products found</div>;
	}

	return HomepageElement;
};

export default HomepageContainer;
