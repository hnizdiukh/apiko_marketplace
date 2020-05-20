import { handleActions } from '@letapp/redux-actions';
import * as actions from './messagesActions';

const INITIAL_STATE = {
  fetchMessages: {
    isLoading: false,
    isError: false,
    error: null
  },
  messages: [],
  lastMessage: null,
  sendMessage: {
    isLoading: false,
    isError: false,
    error: null
  }
};

export default handleActions(
  {
    [actions.fetchMessages.start]: (state) => ({
      ...state,
      fetchMessages: {
        ...state.fetchMessages,
        isLoading: true,
        error: null,
        isError: false
      }
    }),
    [actions.fetchMessages.success]: (state, action) => ({
      ...state,
      fetchMessages: {
        ...state.fetchMessages,
        isLoading: false
      },
      messages: action.payload.data.reverse()
    }),
    [actions.fetchMessages.error]: (state, action) => ({
      ...state,
      fetchMessages: {
        ...state.fetchMessages,
        isLoading: false,
        error: action.payload,
        isError: true
      }
    }),

    // SEND MESSAGE

    [actions.sendMessage.start]: (state, action) => ({
      ...state,
      sendMessage: {
        ...state.sendMessage,
        isLoading: true,
        error: null,
        isError: false
      },
      messages: [ ...state.messages, action.payload ],
      lastMessage: action.payload
    }),
    [actions.sendMessage.success]: (state, { payload: { oldMessageId, result } }) => {
      const messages = state.messages.filter((i) => i.id !== oldMessageId).concat(result);
      return {
        ...state,
        sendMessage: {
          ...state.sendMessage,
          isLoading: false
        },
        messages: messages
      };
    },
    [actions.sendMessage.error]: (state, action) => ({
      ...state,
      sendMessage: {
        ...state.sendMessage,
        isLoading: false,
        error: action.payload,
        isError: true
      }
    })
  },
  INITIAL_STATE
);
