import * as actions from './productsActions';
import Api from '../../api';

export function fetchProducts() {
	return async function productsThunk(dispatch) {
		try {
			dispatch(actions.products.start());

			const res = await Api.Products.get();

			dispatch(actions.products.success(res.data));
		} catch (err) {
			dispatch(actions.products.error({ message: err.message }));
		}
	};
}

export function addProduct(product) {
	return async function addProductThunk(dispatch) {
		try {
			dispatch(actions.addProduct.start());

			const res = await Api.Products.add(product);

			dispatch(actions.addProduct.success(res.data));
		} catch (err) {
			dispatch(actions.addProduct.error({ message: err.message }));
		}
	};
}

export function search(params) {
	return async function searchProductThunk(dispatch) {
		try {
			dispatch(actions.search.start());

			const res = await Api.Products.search(params);

			dispatch(actions.search.success(res.data));
		} catch (err) {
			dispatch(actions.search.error({ message: err.message }));
		}
	};
}

export function saveProduct(product) {
	return async function saveProductThunk(dispatch) {
		try {
			dispatch(actions.saveProduct.start());

			await Api.Products.save(product.id);

			dispatch(actions.saveProduct.success(product));
		} catch (err) {
			dispatch(actions.saveProduct.error({ message: err.message }));
		}
	};
}

export function unsaveProduct(product) {
	return async function unsaveProductThunk(dispatch) {
		try {
			dispatch(actions.unsaveProduct.start());

			await Api.Products.unsave(product.id);

			dispatch(actions.unsaveProduct.success(product));
		} catch (err) {
			dispatch(actions.unsaveProduct.error({ message: err.message }));
		}
	};
}

export function savedProducts() {
	return async function savedProductsThunk(dispatch) {
		try {
			dispatch(actions.savedProducts.start());

			const res = await Api.Products.getSaved();

			dispatch(actions.savedProducts.success(res.data));
		} catch (err) {
			dispatch(actions.savedProducts.error({ message: err.message }));
		}
	};
}

export function getProduct(productId) {
	return async function savedProductsThunk(dispatch) {
		try {
			dispatch(actions.getProduct.start());

			const res = await Api.Products.getProduct(productId);

			dispatch(actions.getProduct.success(res.data));
		} catch (err) {
			dispatch(actions.getProduct.error({ message: err.message }));
		}
	};
}
