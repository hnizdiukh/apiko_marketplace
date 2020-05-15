import { schema } from 'normalizr';

export const Chat = new schema.Entity('chats');
export const Messages = new schema.Entity('messages');

export const ChatCollection = [ Chat ];
export const MessagesCollection = [ Messages ];
