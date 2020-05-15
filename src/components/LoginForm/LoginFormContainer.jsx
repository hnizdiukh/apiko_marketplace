import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LoginForm } from './LoginFormComponent';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';
import routes from 'src/routes/config';

import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import store from 'src/store/createStore';
import { authOperations } from 'src/modules/auth';
import Loading from '../CustomComponents/Loading/Loading';

const LoginFormContainer = () => {
	const history = useHistory();
	const dispatch = useDispatch();
	let isLoading = useSelector((state) => state.auth.login.isLoading);

	const LoginSchema = Yup.object().shape({
		email: Yup.string().email('Invalid email').required('Required'),
		password: Yup.string().min(8, 'Too Short!').required('Required')
	});

	let initialValues = { email: '', password: '' };

	const onSubmit = async (values) => {
		await dispatch(authOperations.login({ email: values.email, password: values.password }));
		let storeState = await store.getState();
		let isSuccess = storeState.auth.login.isSuccess;
		if (isSuccess) {
			history.push(routes.HOME);
		} else {
			toast.error('Incorrect email or password!');
		}
	};

	let Login = isLoading ? (
		<Loading />
	) : (
		<LoginForm schema={LoginSchema} initialValues={initialValues} onSubmit={onSubmit} />
	);

	return Login;
};

export default LoginFormContainer;
