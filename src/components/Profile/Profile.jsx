import React, { Fragment, useRef, useState } from 'react';
import { Formik, Form } from 'formik';
import Input from '../CustomComponents/InputComponent';
import Badge from '../CustomComponents/Badge';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { viewerOperations } from 'src/modules/viewer';
import Api from 'src/api';
import routes from 'src/routes/config';
import { useHistory } from 'react-router-dom';

const Profile = ({ user, hanldeImageClick, initialValues, schema }) => {
	const dispatch = useDispatch();
	const imageInput = useRef(false);
	const history = useHistory();

	let [ imageSelected, setImageSelected ] = useState(null);

	const hanldeImageUpload = () => {
		setImageSelected(imageInput.current.files[0]);
	};

	const onSubmit = async (values) => {
		if (user.fullName === values.fullName && !!user.phone === !!values.phone && !imageSelected) {
			toast.success('Profile updated!');
			return;
		}

		try {
			let res;
			if (imageSelected) {
				try {
					res = await Api.Image.upload(imageSelected);
				} catch (error) {
					toast.error('Image can not be uploaded!');
				}
			}
			await dispatch(
				viewerOperations.putUser({
					fullName: values.fullName,
					phone: values.phone || null,
					avatar: res ? res.data : user.avatar || '',
					location: user.location || 'Ternopil'
				})
			);
			toast.success('Profile updated!');
			history.push(routes.HOME);
		} catch (error) {
			toast.error(error);
		}
	};

	return (
		<Fragment>
			<div className="profile-block">
				<h1>Edit profile</h1>
				<Badge
					user={user}
					onClick={hanldeImageClick}
					wrapperClassName="profile-page-badge"
					size="100px"
					fontSize="40px"
				/>
				<div className="upgrade-photo-wrap">
					<button
						onClick={() => imageInput.current.click()}
						className={imageSelected ? 'upgrade-photo upgrade-photo-selected' : 'upgrade-photo'}
					>
						{imageSelected ? 'Selected' : 'Upgrade photo'}
					</button>
					<input type="image" accept="image/*" ref={imageInput} onChange={hanldeImageUpload} alt="image" />
				</div>
				<Formik initialValues={initialValues} validationSchema={schema} onSubmit={onSubmit}>
					{({ values, handleChange, handleSubmit, isSubmitting }) => (
						<Form className="form" onSubmit={handleSubmit}>
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
								value={values.phone}
								label="Phone number"
								type="phone"
								name="phone"
								autoComplete="phone"
								placeholder="+380 12 345 678"
							/>
							<button className="primary-btn" type="submit" disabled={isSubmitting}>
								Save
							</button>
						</Form>
					)}
				</Formik>
			</div>
		</Fragment>
	);
};

export default Profile;
