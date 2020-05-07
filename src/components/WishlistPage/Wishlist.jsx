import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { productsOperations } from 'src/modules/products';
import Loading from '../CustomComponents/Loading';
import WishlistPage from './WishlistComponent';
import { Redirect } from 'react-router-dom';
import routes from 'src/routes/config';

const Wishlist = () => {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.viewer.user);
	const products = useSelector((state) => state.products.saved);
	const isLoading = useSelector((state) => state.products.savedProducts.isLoading);

	useEffect(
		() => {
			if (user) dispatch(productsOperations.savedProducts());
		},
		[ user, dispatch ]
	);

	if (!user) {
		return <Redirect to={routes.LOGIN} />;
	}

	let WishlistElement = isLoading ? <Loading /> : <WishlistPage products={products} />;

	return WishlistElement;
};

export default Wishlist;
