import React, { Fragment } from 'react';
import { Formik, Form } from 'formik';
import { Link } from 'react-router-dom';

import routes from 'src/routes/config';
import Input from '../CustomComponents/InputComponent';
import Eye from '../CustomComponents/PasswordEye';

export const RegisterForm = (props) => {
	return (
		<Fragment>
			<div className="login-block">
				<h1>Register</h1>
				<Formik initialValues={props.initialValues} validationSchema={props.schema} onSubmit={props.onSubmit}>
					{({ values, handleChange, handleSubmit, isSubmitting }) => (
						<Form className="form" onSubmit={handleSubmit}>
							<Input
								onChange={handleChange}
								value={values.email}
								label="Email"
								type="email"
								name="email"
								autoComplete="email"
								placeholder="Example@gmail.com"
							/>

							<Input
								onChange={handleChange}
								value={values.fullName}
								label="Full name"
								type="text"
								name="fullName"
								autoComplete="name"
								placeholder="Tony Stark"
							/>

							<Input
								onChange={handleChange}
								value={values.password}
								labelClass="password-label"
								label="Password"
								type="password"
								name="password"
								autoComplete="new-password"
								additionalFields={<Eye inputName="password" />}
							/>

							<Input
								onChange={handleChange}
								value={values.passwordConfirmation}
								labelClass="password-label"
								label="Password again"
								type="password"
								name="passwordConfirmation"
								autoComplete="new-password"
								additionalFields={<Eye inputName="passwordConfirmation" />}
							/>

							<button className="primary-btn" type="submit" disabled={isSubmitting}>
								Register
							</button>
						</Form>
					)}
				</Formik>
			</div>
			<div className="have-account">
				I already have an account, <Link to={routes.LOGIN}>Log in</Link>
			</div>
		</Fragment>
	);
};
