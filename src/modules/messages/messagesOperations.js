import * as actions from './messagesActions';
import Api from '../../api';
import { createMessage } from './messagesCreators';
import { viewerSelectors } from '../viewer';

export function fetchMessages(chatId) {
	return async function messagesThunk(dispatch) {
		try {
			dispatch(actions.fetchMessages.start());

			const res = await Api.Messages.getMessages(chatId);

			dispatch(actions.fetchMessages.success({ chatId, data: res.data }));
		} catch (err) {
			dispatch(actions.fetchMessages.error({ message: err.message }));
		}
	};
}

export function sendMessage(message, chatId) {
	return async function sendMessageThunk(dispatch, getState) {
		const user = viewerSelectors.getUser(getState());

		const createdMessage = createMessage({ chatId, text: message.text, ownerId: user.id });
		try {
			dispatch(actions.sendMessage.start(createdMessage));

			const res = await Api.Messages.sendMessage(message, chatId);

			dispatch(actions.sendMessage.success({ oldMessageId: createdMessage.id, result: res.data }));
		} catch (err) {
			dispatch(actions.sendMessage.error({ message: err.message }));
		}
	};
}

export function handleMessagesRealtime(e) {
	return async function handleMessagesRealtimeThunk(dispatch) {
		if (e.type === 'ADD') {
			dispatch(addMessage(e.message));
		}
	};
}

export function addMessage(message) {
	return async function addMessageThunk(dispatch) {
		dispatch(actions.sendMessage.start(message, message.chatId));
	};
}
