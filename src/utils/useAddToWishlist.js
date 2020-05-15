import { useDispatch, useSelector } from 'react-redux';
import routes from 'src/routes/config';
import { productsOperations } from 'src/modules/products';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const useAddToWishlist = (user, product, redirectTo) => {
	const [ isSaved, setSaved ] = useState(false);
	const dispatch = useDispatch();

	const savedProducts = useSelector((state) => state.products.saved);

	useEffect(
		() => {
			if (product && savedProducts.length && savedProducts.find((p) => p.id === product.id)) {
				setSaved(true);
			}
		},
		[ setSaved, product, savedProducts ]
	);

	const history = useHistory();

	const bind = async (isSave) => {
		if (!user) {
			history.push(redirectTo || routes.LOGIN);
			return;
		}
		if (isSave) {
			await dispatch(productsOperations.unsaveProduct(product));
			setSaved(false);
		} else {
			await dispatch(productsOperations.saveProduct(product));
		}
	};

	return [ isSaved, bind ];
};

export default useAddToWishlist;
