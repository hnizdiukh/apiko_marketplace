import React, { Fragment, useState, useEffect, useRef } from 'react';
import { Icon } from '../CustomComponents/Icon/Icon';
import { Link } from 'react-router-dom';
import routes from 'src/routes/config';
import Badge from '../CustomComponents/Badge';
import Moment from 'react-moment';
import { useDispatch, useSelector } from 'react-redux';
import { messagesOperations } from 'src/modules/messages';
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';
import 'emoji-mart/css/emoji-mart.css';
import { Picker } from 'emoji-mart';
import getProductImage from 'src/utils/getProductImage';

const Messages = ({ chat }) => {
  const [ messageInput, setMessageInput ] = useState('');
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.messages.messages);
  const isMessagesLoading = useSelector((state) => state.messages.fetchMessages.isLoading);

  const messagesEndRef = React.createRef(null);
  const emojiRef = useRef();

  const [ displayEmojiPicker, setDisplayEmojiPicker ] = useState(false);

  const onEmojiClick = (emojiObject) => {
    setMessageInput(messageInput + emojiObject.native);
  };

  const handleMessageSubmit = (e) => {
    e.preventDefault();
    if (!messageInput) return;
    dispatch(messagesOperations.sendMessage({ text: messageInput }, chat.id));
    setMessageInput('');
  };

  useEffect(
    () => {
      if (messagesEndRef.current && !messageInput) {
        messagesEndRef.current.scrollIntoView();
      }
    },
    [ messagesEndRef, messageInput ]
  );

  if (!chat && !isMessagesLoading) {
    return <div className="no-chat-selected not-found">Please select chat to start messaging</div>;
  }

  const imageSrc = getProductImage(chat.product.photos);

  return (
    <Fragment>
      <div className="messages-header">
        <Badge user={chat.participants[0]} size="45px" />
        <div className="messaging-with">{chat.participants[0].fullName}</div>
        <Link to={`${routes.PRODUCT}/${chat.product.id}`} className="chat-product">
          <span className="product-image">
            <img src={imageSrc} alt={chat.product.title} />
          </span>
          <div className="chat-product-details">
            <span className="chat-product-name">{chat.product.title}</span>
            <span className="chat-product-price">${chat.product.price.toFixed(2)}</span>
          </div>
          <span className="product-link">
            <Icon name="open_link" width="18" height="18" />
          </span>
        </Link>
      </div>
      <div className="messages-body">
        <SimpleBar style={{ maxHeight: window.innerHeight - 212 }} autoHide={false}>
          {messages.map((message) => {
            return (
              <div
                className={chat.participants[0].id === message.ownerId ? 'message-recieved' : 'message-send'}
                key={`${message.id}${chat.id}`}
              >
                <div className="message-text">{message.text}</div>
                <div className="message-time-under">
                  <Moment fromNow>{message.createdAt}</Moment>
                </div>
              </div>
            );
          })}
          <span ref={messagesEndRef} />
        </SimpleBar>
      </div>

      <div className="messages-footer">
        <form onSubmit={handleMessageSubmit} className="submit-message-form">
          <input
            className="message-input"
            type="text"
            value={messageInput}
            placeholder="Type your message here..."
            onChange={(e) => setMessageInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleMessageSubmit(e)}
          />
          <span className="emoji-picker-btn" onClick={() => setDisplayEmojiPicker(!displayEmojiPicker)}>
            <Icon name="emoji" width="22" height="22" />
          </span>

          <span className="emoji-picker" style={{ display: displayEmojiPicker ? 'flex' : 'none' }} ref={emojiRef}>
            <Picker onSelect={onEmojiClick} />
          </span>
          <button type="submit" name="button" onClick={() => setDisplayEmojiPicker(false)}>
            Send
          </button>
        </form>
      </div>
    </Fragment>
  );
};

export default Messages;
