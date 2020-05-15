import * as actions from './chatActions';
import Api from '../../api';

export function fetchChats() {
	return async function chatsThunk(dispatch) {
		try {
			dispatch(actions.fetchChats.start());

			const res = await Api.Chats.get();

			dispatch(actions.fetchChats.success(res.data));
		} catch (err) {
			dispatch(actions.fetchChats.error({ message: err.message }));
		}
	};
}

export function createChat(productId) {
	return async function createChatThunk(dispatch) {
		try {
			dispatch(actions.createChat.start());

			const createdChatRes = await Api.Chats.createChat(productId);
			const res = await Api.Chats.get();
			dispatch(actions.createChat.success({ chats: res.data, createdChatId: createdChatRes.data.id }));
		} catch (err) {
			dispatch(actions.createChat.error({ message: err.message }));
		}
	};
}
