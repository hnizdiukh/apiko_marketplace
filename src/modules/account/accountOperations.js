import * as actions from './accountActions';
import Api from '../../api';

export function fetchProducts() {
	return async function productsThunk(dispatch) {
		try {
			dispatch(actions.products.start());

			const res = await Api.Products.get();

			console.log(res.data);

			dispatch(actions.products.success(res.data));
		} catch (err) {
			console.log('Products operation ', err);
			dispatch(actions.products.error({ message: err.message }));
		}
	};
}
