import React, { useContext } from 'react';
import { LoginForm } from './LoginFormComponent';
import * as Yup from 'yup';
import Api from 'src/api';
import { useHistory } from 'react-router-dom';
import routes from 'src/routes/config';
import { UserContext } from 'src/utils/UserContext';

const LoginFormContainer = () => {
	const history = useHistory();

	const { setUser } = useContext(UserContext);

	const LoginSchema = Yup.object().shape({
		email: Yup.string().email('Invalid email').required('Required'),
		password: Yup.string().min(8, 'Too Short!').required('Required')
	});

	let initialValues = { email: '', password: '' };

	const onSubmit = async (values) => {
		try {
			const res = await Api.Auth.login({ email: values.email, password: values.password });
			Api.Auth.setToken(res.data.token);
			console.log(res.data);
			setUser(res.data.user);
			history.push(routes.HOME);
		} catch (error) {
			console.error(error);
		}
	};

	return <LoginForm schema={LoginSchema} initialValues={initialValues} onSubmit={onSubmit} />;
};

export default LoginFormContainer;
