import React, { Fragment } from 'react';
import { Field, ErrorMessage } from 'formik';

const Input = (props) => {
	const {
		label,
		type,
		name,
		onChange,
		value,
		labelClass,
		additionalFields,
		autoComplete,
		placeholder,
		as,
		rows
	} = props;
	return (
		<Fragment>
			<label className={labelClass} htmlFor={name}>
				{label}
			</label>
			<Field
				onChange={onChange}
				value={value}
				name={name}
				type={type}
				autoComplete={autoComplete}
				placeholder={placeholder}
				as={as}
				rows={rows}
			/>
			{additionalFields}
			<ErrorMessage name={name} component="div" className="error-msg" />
		</Fragment>
	);
};

export default Input;
