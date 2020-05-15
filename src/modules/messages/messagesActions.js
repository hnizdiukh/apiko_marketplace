import createAsyncActions from '@letapp/redux-actions/lib/createAsyncActions';

export const fetchMessages = createAsyncActions('messages/FETCH');
export const sendMessage = createAsyncActions('messages/SEND');
