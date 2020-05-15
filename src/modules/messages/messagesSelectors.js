import { createSelector } from 'reselect';

const getMessagesEntities = (state) => state.messages.messages;
const getIds = (state) => state.messages.messageIds || [];

export const getMessages = createSelector([ getMessagesEntities, getIds ], (messages, ids) =>
	ids.map((i) => messages[i])
);
