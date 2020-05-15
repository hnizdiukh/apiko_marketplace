import React from 'react';
import { createPortal } from 'react-dom';

const Modal = (props) => {
	return createPortal(
		<div className="modal" onClick={props.onClick}>
			{props.children}
		</div>,
		document.getElementById('modal_root')
	);
};

export default Modal;
