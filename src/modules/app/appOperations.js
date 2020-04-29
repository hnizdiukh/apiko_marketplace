import * as actions from './appActions';
import Api from 'src/api';

export function init() {
	return async function initThunk(dispatch) {
		try {
			dispatch(actions.initialization.start());

			Api.init();

			dispatch(actions.initialization.success());
		} catch (err) {
			console.log(err);
			dispatch(actions.initialization.error({ message: err.message }));
		}
	};
}
