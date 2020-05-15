import React, { useRef } from 'react';
import Modal from 'src/components/CustomComponents/Modal';
import './chat.css';
import { Icon } from '../CustomComponents/Icon/Icon';
import Badge from '../CustomComponents/Badge';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import Input from '../CustomComponents/InputComponent';
import { useSelector, useDispatch, useStore } from 'react-redux';
import routes from 'src/routes/config';
import { chatOperations } from 'src/modules/chat';
import { messagesOperations } from 'src/modules/messages';
import { toast } from 'react-toastify';

const ChatModal = (props) => {
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
				<div className="chat-modal-wrap" ref={chatModalRef}>
					<div className="modal-header">
						<span />
						<span className="modal-title">Contact seller</span>
						<span>
							<Icon className="close-btn" name="close" width="34" height="34" fill="#349A89" />
						</span>
					</div>
					<div className="modal-body">
						<div className="message-subject">Subject: {product.title}</div>
						<div className="message-reciever">
							<Badge user={product.owner} wrapperClassName="badge-pdp" size="72px" fontSize="30px" />
							<div>
								<p className="owner-name">{product.owner.fullName}</p>
								<p className="location-pdp">{product.owner.location || ''}</p>
							</div>
						</div>
						<div className="message-input">
							<Formik onSubmit={handleSubmit} validationSchema={ChatModalSchema} initialValues={initialValues}>
								{({ handleSubmit, handleChange, values, isSubmitting }) => (
									<Form onSubmit={handleSubmit}>
										<Input
											value={values.text}
											onChange={handleChange}
											label="Message"
											name="text"
											as="textarea"
											placeholder="For example: Iron man suite"
											rows="7"
										/>
										<button type="submit" className="primary-btn btn" disabled={isSubmitting}>
											Submit
										</button>
									</Form>
								)}
							</Formik>
						</div>
					</div>
				</div>
			</Modal>
		)
	);
};

export default ChatModal;
