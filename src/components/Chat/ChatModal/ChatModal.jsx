import React from 'react';
import { Icon } from '../../CustomComponents/Icon/Icon';
import Badge from '../../CustomComponents/Badge';
import { Formik, Form } from 'formik';
import Input from '../../CustomComponents/InputComponent';

const ChatModal = (props) => {
  const { product, schema, handleSubmit, initialValues } = props;

  return (
    <div className="chat-modal-wrap" ref={props.forwardRef}>
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
          <Formik onSubmit={handleSubmit} validationSchema={schema} initialValues={initialValues}>
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
  );
};

export default ChatModal;
