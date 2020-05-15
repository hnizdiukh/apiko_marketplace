import React from 'react';
import Profile from './Profile';
import Loading from '../CustomComponents/Loading/Loading';
import * as Yup from 'yup';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './profile.css';
import 'react-toastify/dist/ReactToastify.css';
import routes from 'src/routes/config';
import Api from 'src/api';

const ProfileContainer = () => {
	const user = useSelector((state) => state.viewer.user);
	const isViewerLoading = useSelector((state) => state.viewer.fetchViewer.isLoading);
	const isAppLoading = useSelector((state) => state.app.isLoading);
	const isLoggedIn = Api.Auth.isLoggedIn;
	const SignupSchema = Yup.object().shape({
		fullName: Yup.string().min(4, 'Too Short!').max(50, 'Too Long!').required('Required'),
		phone: Yup.string().min(8, 'Invalid Number!').max(13, 'Invalid Number!')
	});

	let initialValues = {
		phone: user && Object.keys(user).length ? user.phone || '' : '',
		fullName: user && Object.keys(user).length ? user.fullName || '' : ''
	};

	if (!isLoggedIn) {
		return <Redirect to={routes.LOGIN} />;
	}

	let ProfileElement =
		isAppLoading || isViewerLoading || !user ? (
			<Loading />
		) : (
			<Profile user={user} schema={SignupSchema} initialValues={initialValues} />
		);

	return ProfileElement;
};

export default ProfileContainer;
