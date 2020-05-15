import createAsyncActions from '@letapp/redux-actions/lib/createAsyncActions';

export const fetchChats = createAsyncActions('chat/FETCH');
export const createChat = createAsyncActions('chat/CREATE');
