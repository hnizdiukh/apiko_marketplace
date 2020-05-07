import React from 'react';
import Profile from './Profile';
import Loading from '../CustomComponents/Loading';
import * as Yup from 'yup';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './profile.css';
import 'react-toastify/dist/ReactToastify.css';
import routes from 'src/routes/config';

const ProfileContainer = () => {
	let isLoading = useSelector((state) => state.app.isLoading);
	const user = useSelector((state) => state.viewer.user);
	const SignupSchema = Yup.object().shape({
		fullName: Yup.string().min(4, 'Too Short!').max(50, 'Too Long!').required('Required'),
		phone: Yup.string().min(8, 'Invalid Number!').max(13, 'Invalid Number!')
	});

	let initialValues = {
		phone: user ? user.phone || '' : '',
		fullName: user ? user.fullName || '' : ''
	};

	const hanldeImageClick = () => {
		console.log('on image click');
	};

	if (!user) {
		return <Redirect to={routes.LOGIN} />;
	}

	let ProfileElement = isLoading ? (
		<Loading />
	) : (
		<Profile user={user} schema={SignupSchema} initialValues={initialValues} hanldeImageClick={hanldeImageClick} />
	);

	return ProfileElement;
};

export default ProfileContainer;
