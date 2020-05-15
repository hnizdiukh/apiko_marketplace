import * as actions from './appActions';
import Api, { SocketApi } from 'src/api';
import { messagesOperations } from '../messages';

export function subscirbeToSockets() {
	return function subscirbeToSocketsThunk(dispatch) {
		SocketApi.handleMessages((message) => dispatch(messagesOperations.handleMessagesRealtime(message)));
	};
}

export function init() {
	return async function initThunk(dispatch) {
		try {
			dispatch(actions.initialization.start());

			Api.init();

			dispatch(subscirbeToSockets());
			dispatch(actions.initialization.success());
		} catch (err) {
			dispatch(actions.initialization.error({ message: err.message }));
		}
	};
}
