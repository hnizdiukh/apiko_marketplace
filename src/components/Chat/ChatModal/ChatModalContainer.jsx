import React, { useRef } from 'react';
import Modal from 'src/components/CustomComponents/Modal';
import '../chat.css';
import * as Yup from 'yup';
import { useSelector, useDispatch, useStore } from 'react-redux';
import routes from 'src/routes/config';
import { chatOperations } from 'src/modules/chat';
import { messagesOperations } from 'src/modules/messages';
import { toast } from 'react-toastify';
import ChatModal from './ChatModal';

const ChatModalContainer = (props) => {
  const params = new URLSearchParams(props.location.search);
  const chatModalRef = useRef();
  const dispatch = useDispatch();
  const store = useStore();
  const product = useSelector((state) => state.products.product);

  const handleModalClick = (e) => {
    if (!e.target.closest(`.${chatModalRef.current.className}`) || e.target.closest(`.close-btn`)) {
      props.history.push(props.location.pathname);
    }
  };

  const initialValues = {
    text: ''
  };

  const ChatModalSchema = Yup.object().shape({
    text: Yup.string().required('Required')
  });

  const handleSubmit = async (values) => {
    let createdChat;
    try {
      if (!product.chatId) {
        await dispatch(chatOperations.createChat(product.id));
        const storeState = await store.getState();
        createdChat = storeState.chat.createdChat;
      }
      await dispatch(messagesOperations.sendMessage(values, createdChat || product.chatId));
      await props.history.push(`${routes.CHAT}/${createdChat || product.chatId}`);
    } catch (error) {
      toast.error('Imposible to create chat');
    }
  };

  return (
    params.get('chat') &&
    product && (
      <Modal
        onClick={(e) => {
          handleModalClick(e);
        }}
      >
        <ChatModal
          initialValues={initialValues}
          schema={ChatModalSchema}
          handleSubmit={handleSubmit}
          forwardRef={chatModalRef}
          product={product}
        />
      </Modal>
    )
  );
};

export default ChatModalContainer;
