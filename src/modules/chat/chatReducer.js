import { handleActions } from '@letapp/redux-actions';
import * as actions from './chatActions';
import { messagesActions } from '../messages';

const INITIAL_STATE = {
  fetchChats: {
    isLoading: false,
    isError: false,
    error: null
  },
  chats: [],
  createdChat: null,
  createChat: {
    isLoading: false,
    isError: false,
    error: null
  }
};

export default handleActions(
  {
    [actions.fetchChats.start]: (state) => ({
      ...state,
      fetchChats: {
        ...state.fetchChats,
        isLoading: true,
        error: null,
        isError: false
      }
    }),
    [actions.fetchChats.success]: (state, action) => ({
      ...state,
      fetchChats: {
        ...state.fetchChats,
        isLoading: false
      },
      chats: action.payload
    }),
    [actions.fetchChats.error]: (state, action) => ({
      ...state,
      fetchChats: {
        ...state.fetchChats,
        isLoading: false,
        error: action.payload,
        isError: true
      }
    }),

    // CREATE CHAT

    [actions.createChat.start]: (state) => ({
      ...state,
      createChat: {
        ...state.createChat,
        isLoading: true,
        error: null,
        isError: false
      }
    }),
    [actions.createChat.success]: (state, action) => ({
      ...state,
      createChat: {
        ...state.createChat,
        isLoading: false
      },
      chats: action.payload.chats,
      createdChat: action.payload.createdChatId
    }),
    [actions.createChat.error]: (state, action) => ({
      ...state,
      createChat: {
        ...state.createChat,
        isLoading: false,
        error: action.payload,
        isError: true
      }
    }),

    // last message update

    [messagesActions.sendMessage.success]: (state, action) => {
      const chatToChange = state.chats.find((c) => c.id === action.payload.result.chatId);
      let chats;
      if (chatToChange) {
        chats = state.chats
          .filter((c) => c !== chatToChange)
          .reverse()
          .concat({ ...chatToChange, lastMessage: action.payload.result });
      } else {
        chats = state.chats;
      }

      return {
        ...state,
        chats: chats.reverse()
      };
    }
  },
  INITIAL_STATE
);
