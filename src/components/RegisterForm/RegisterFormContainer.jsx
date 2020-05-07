import React from 'react';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';
import routes from 'src/routes/config';
import { RegisterForm } from './RegisterFormComponent';
import { useDispatch, useSelector } from 'react-redux';
import { authOperations } from 'src/modules/auth';
import store from 'src/store/createStore';
import Loading from '../CustomComponents/Loading';
import { toast } from 'react-toastify';

const RegisterFormContainer = () => {
	const history = useHistory();
	const dispatch = useDispatch();
	let isLoading = useSelector((state) => state.auth.register.isLoading);

	const SignupSchema = Yup.object().shape({
		email: Yup.string().email('Invalid email').required('Required'),
		fullName: Yup.string().min(4, 'Too Short!').max(50, 'Too Long!').required('Required'),
		password: Yup.string().min(8, 'Too Short!').required('Required'),
		passwordConfirmation: Yup.string()
			.oneOf([ Yup.ref('password'), null ], 'Passwords must match')
			.required('Required')
	});

	let initialValues = { email: '', fullName: '', password: '', passwordConfirmation: '' };

	const onSubmit = async (values) => {
		await dispatch(
			authOperations.register({
				email: values.email,
				fullName: values.fullName,
				password: values.password
			})
		);
		let storeState = await store.getState();
		let isSuccess = storeState.auth.register.isSuccess;
		if (isSuccess) {
			history.push(routes.HOME);
		} else {
			toast.error('User with this email is already exist');
			console.error('login error: ', storeState.auth.register.error);
		}
	};
	let Register = isLoading ? (
		<Loading />
	) : (
		<RegisterForm schema={SignupSchema} initialValues={initialValues} onSubmit={onSubmit} />
	);

	return Register;
};

export default RegisterFormContainer;
