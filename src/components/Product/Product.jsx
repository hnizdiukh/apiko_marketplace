import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import routes from 'src/routes/config';
import { Icon } from '../CustomComponents/Icon/Icon';
import { useDispatch, useStore, useSelector } from 'react-redux';
import { productsOperations } from 'src/modules/products';
import { toast } from 'react-toastify';

const Product = ({ product }) => {
	const dispatch = useDispatch();
	const store = useStore();
	const history = useHistory();
	const user = useSelector((state) => state.viewer.user);
	const savedProducts = useSelector((state) => state.products.saved);
	const [ isSaved, setSaved ] = useState(false);

	useEffect(
		() => {
			if (savedProducts.find((p) => p.id === product.id)) {
				setSaved(true);
			}
		},
		[ savedProducts, product.id ]
	);

	let hasPhoto;
	hasPhoto = product.photos !== null && product.photos[0] !== '' && product.photos.length !== 0;

	const addToWishlist = async () => {
		if (!user) {
			history.push(routes.LOGIN);
			return;
		}
		if (isSaved) {
			await dispatch(productsOperations.unsaveProduct(product));
			setSaved(false);
		} else {
			await dispatch(productsOperations.saveProduct(product));
		}
		let state = await store.getState();
		const saveError = state.products.saveProduct.error;
		const unsaveError = state.products.unsaveProduct.error;
		if (saveError) {
			toast.error('Can not add this product to wish list.');
		}
		if (unsaveError) {
			toast.error('Can not remove this product from wish list.');
		}
	};

	return (
		<div className="product-thumbnail">
			<Link to={routes.PRODUCT + '/' + product.id}>
				<img src={hasPhoto ? product.photos[0] : 'logo512.png'} alt="product" />
			</Link>
			<div className="add-to-wishlist-container">
				<span className="add-to-wishlist-wrap" onClick={addToWishlist}>
					{isSaved ? (
						<Icon name="heart_filled" width="16" height="17" fill="#349a89" />
					) : (
						<Icon name="heart" width="16" height="17" />
					)}
				</span>
			</div>
			<p>{product.title}</p>
			<b>${product.price.toFixed(2)}</b>
		</div>
	);
};
export default Product;
