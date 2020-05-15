import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { productsOperations } from 'src/modules/products';
import Loading from '../CustomComponents/Loading/Loading';
import WishlistPage from './WishlistComponent';
import { Redirect } from 'react-router-dom';
import routes from 'src/routes/config';
import Api from 'src/api';

const Wishlist = () => {
	const dispatch = useDispatch();
	const isLoggedIn = Api.Auth.isLoggedIn;
	const user = useSelector((state) => state.viewer.user);
	const products = useSelector((state) => state.products.saved);
	const isLoading = useSelector((state) => state.products.savedProducts.isLoading);

	useEffect(
		() => {
			if (user) dispatch(productsOperations.savedProducts());
		},
		[ user, dispatch ]
	);

	if (!isLoggedIn) {
		return <Redirect to={routes.LOGIN} />;
	}

	let WishlistElement = isLoading ? <Loading /> : <WishlistPage products={products} />;

	return WishlistElement;
};

export default Wishlist;
