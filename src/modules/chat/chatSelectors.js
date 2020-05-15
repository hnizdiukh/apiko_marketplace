import { createSelector } from 'reselect';

const getChatsEntities = (state) => state.chat.chats;
const getIds = (state) => state.chat.chatsIds;

export const getChats = createSelector([ getChatsEntities, getIds ], (entities, ids) => ids.map((i) => entities[i]));
