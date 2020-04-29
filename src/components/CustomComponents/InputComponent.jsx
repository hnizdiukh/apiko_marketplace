import React, { Fragment } from 'react';
import { Field, ErrorMessage } from 'formik';

const Input = (props) => {
	const { label, type, name, handleChange, value, labelClass, additionalFields, autoComplete } = props;
	return (
		<Fragment>
			<label className={labelClass}>{label}</label>
			<Field onChange={handleChange} value={value} type={type} name={name} autoComplete={autoComplete} />
			{additionalFields}
			<ErrorMessage name={name} component="div" className="error-msg" />
		</Fragment>
	);
};

export default Input;
