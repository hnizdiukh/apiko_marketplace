import React, { Fragment } from 'react';
import { Formik, Form } from 'formik';
import { Link } from 'react-router-dom';
import routes from 'src/routes/config';

import { ToastContainer } from 'react-toastify';
import Input from '../CustomComponents/InputComponent';
import Eye from '../CustomComponents/PasswordEye';

export const LoginForm = (props) => {
	const { initialValues, schema, onSubmit } = props;
	return (
		<Fragment>
			<div className="login-block">
				<h1>Login</h1>
				<ToastContainer />
				<Formik initialValues={initialValues} validationSchema={schema} onSubmit={onSubmit}>
					{({ values, handleChange, handleSubmit, isSubmitting }) => (
						<Form className="form" onSubmit={handleSubmit}>
							<Input
								handleChange={handleChange}
								value={values.email}
								label="Email"
								type="email"
								name="email"
								autoComplete="email"
								placeholder="Example@gmail.com"
							/>

							<Input
								handleChange={handleChange}
								value={values.password}
								labelClass="password-label"
								label="Password"
								type="password"
								name="password"
								autoComplete="current-password"
								additionalFields={<Eye />}
							/>

							<Link to={routes.FORGOT} className="forgot-password">
								Don't remember password?
							</Link>
							<button className="primary-btn" type="submit" disabled={isSubmitting}>
								Continue
							</button>
						</Form>
					)}
				</Formik>
			</div>
			<div className="have-account">
				I have no account, <Link to={routes.REGISTER}>Register now</Link>
			</div>
		</Fragment>
	);
};
