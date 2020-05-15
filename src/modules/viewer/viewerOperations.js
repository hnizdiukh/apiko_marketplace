import * as actions from './viewerActions';
import Api from 'src/api';

export function fetchViewer() {
	return async function fetchViewerThunk(dispatch) {
		try {
			dispatch(actions.fetchViewer.start());

			const res = await Api.Viewer.get();
			dispatch(actions.fetchViewer.success(res.data));
		} catch (err) {
			dispatch(actions.fetchViewer.error({ message: err.message }));
		}
	};
}

export function putUser(body) {
	return async function putUserThunk(dispatch) {
		try {
			dispatch(actions.putUser.start());

			const res = await Api.Viewer.put(body);

			dispatch(actions.putUser.success(res.data));
		} catch (error) {
			dispatch(actions.putUser.error({ message: error.message }));
		}
	};
}
