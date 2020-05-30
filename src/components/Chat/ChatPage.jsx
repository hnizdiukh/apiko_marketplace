import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import routes from 'src/routes/config';
import { useSelector, useDispatch } from 'react-redux';
import Api from 'src/api';
import Loading from '../CustomComponents/Loading/Loading';
import { chatOperations } from 'src/modules/chat';
import ChatItem from './ChatItem';
import { messagesOperations } from 'src/modules/messages';
import Messages from './Messages';
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';

const ChatPage = (props) => {
  const dispatch = useDispatch();
  const isLoggedIn = Api.Auth.isLoggedIn;
  const isMessagesLoading = useSelector((state) => state.messages.fetchMessages.isLoading);
  const chats = useSelector((state) => state.chat.chats);
  const isChatsLoading = useSelector((state) => state.chat.fetchChats.isLoading);

  useEffect(
    () => {
      dispatch(chatOperations.fetchChats());
    },
    [ dispatch ]
  );

  useEffect(
    () => {
      if (props.match.params.chatId) {
        dispatch(messagesOperations.fetchMessages(props.match.params.chatId));
      }
    },
    [ dispatch, props.match.params.chatId ]
  );

  if (!isLoggedIn) {
    return <Redirect to={routes.LOGIN} />;
  }

  const chatSelected = chats.find((c) => c.id === props.match.params.chatId);

  return (
    <div className="chat-page">
      <div className="chat-list-wrap">
        <div className="chat-list">
          <SimpleBar style={{ maxHeight: window.innerHeight - 78 }}>
            {isChatsLoading ? (
              <Loading />
            ) : chats.length ? (
              chats.map((chat) => <ChatItem chat={chat} key={chat.id} current={props.match.params.chatId} />)
            ) : (
              <div className="no-chats-message not-found">You don't have any chat yet</div>
            )}
          </SimpleBar>
        </div>
      </div>
      <div className="messages-wrap">{isMessagesLoading ? <Loading /> : <Messages chat={chatSelected} />}</div>
    </div>
  );
};

export default ChatPage;
