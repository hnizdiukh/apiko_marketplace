import React from 'react';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import routes from 'src/routes/config';

const ChatItem = ({ chat, current }) => {
  const calendarStrings = {
    lastDay: '[Yesterday ] HH:mm',
    sameDay: 'HH:mm',
    lastWeek: '[last] dddd [at] HH:mm',
    sameElse: 'L'
  };

  return (
    <Link to={`${routes.CHAT}/${chat.id}`} className={chat.id === current ? 'current-chat chat-item' : 'chat-item'}>
      <div className="chat-with">
        <span className="chat-with-fullName">{chat.participants ? chat.participants[0].fullName : ''}</span>
        <span className="chat-last-message">{chat.lastMessage ? chat.lastMessage.text : ''}</span>
      </div>
      <div className="product-with">
        <span className="product-image">
          <img src={chat.product.photos[0] || '/product-placeholder.png'} alt={chat.product.title} />
        </span>
        <div className="chat-product-details">
          <span className="chat-product-name">{chat.product.title}</span>
          <span className="chat-product-price">${chat.product.price.toFixed(2)}</span>
        </div>
      </div>
      <div className="message-time">
        {chat.lastMessage ? (
          <Moment calendar={calendarStrings}>{chat.lastMessage.createdAt}</Moment>
        ) : (
          <Moment calendar={calendarStrings}>{chat.createdAt}</Moment>
        )}
      </div>
    </Link>
  );
};

export default ChatItem;
