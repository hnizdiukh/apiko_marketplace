import { v4 as uuid } from 'uuid';

export const createMessage = ({ text, chatId, ownerId }) => ({
	id: uuid(),
	text,
	createdAt: new Date().getTime(),
	chatId,
	ownerId
});
