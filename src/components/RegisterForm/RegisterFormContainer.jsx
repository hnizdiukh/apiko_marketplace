import React, { useContext } from 'react';
import * as Yup from 'yup';
import Api from 'src/api';
import { useHistory } from 'react-router-dom';
import routes from 'src/routes/config';
import { RegisterForm } from './RegisterFormComponent';
import { UserContext } from 'src/utils/UserContext';

const RegisterFormContainer = () => {
	const history = useHistory();

	const { setUser } = useContext(UserContext);

	const SignupSchema = Yup.object().shape({
		email: Yup.string().email('Invalid email').required('Required'),
		fullName: Yup.string().min(4, 'Too Short!').max(50, 'Too Long!').required('Required'),
		password: Yup.string().min(8, 'Too Short!').required('Required'),
		passwordConfirmation: Yup.string().oneOf([ Yup.ref('password'), null ], 'Passwords must match').required('Required')
	});

	let initialValues = { email: '', fullName: '', password: '', passwordConfirmation: '' };

	const onSubmit = async (values) => {
		try {
			const res = await Api.Auth.register({
				email: values.email,
				fullName: values.fullName,
				password: values.password
			});
			Api.Auth.setToken(res.data.token);
			setUser(res.data.user);
			history.push(routes.HOME);
		} catch (error) {
			console.error(error);
		}
	};

	return <RegisterForm schema={SignupSchema} initialValues={initialValues} onSubmit={onSubmit} />;
};

export default RegisterFormContainer;
