import React, { useState } from 'react';
import SellProduct from './SellProduct';
import * as Yup from 'yup';
import Api from 'src/api';
import { useDispatch } from 'react-redux';
import { productsOperations } from 'src/modules/products';
import { useHistory, Redirect } from 'react-router-dom';
import routes from 'src/routes/config';
import { toast } from 'react-toastify';

const SellProductPage = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const isLoggedIn = Api.Auth.isLoggedIn;

	const initialValues = {
		title: '',
		location: '',
		description: '',
		price: ''
	};

	const [ images, setImages ] = useState(initialValues);

	const ProductSchema = Yup.object().shape({
		title: Yup.string().required('Required'),
		location: Yup.string().min(4, 'Too Short!').max(50, 'Too Long!').required('Required'),
		description: Yup.string().required('Required'),
		price: Yup.number().required('Required')
	});

	const fetchImage = async (image) => {
		let res = await Api.Image.upload(image);
		return res;
	};

	const getImages = async (images) => {
		return Promise.all(images.map((image) => fetchImage(image)));
	};

	const handleAddProduct = async (values) => {
		const { title, location, description, price } = values;
		let imagesResponsesArray;
		let imageLinksArray = [];
		if (images) {
			imagesResponsesArray = await getImages(images);
		}
		if (imagesResponsesArray && Array.isArray(imagesResponsesArray)) {
			imagesResponsesArray.map((imageRes) => imageLinksArray.push(imageRes.data));
		}
		const product = { title, description: description, photos: imageLinksArray || [], location, price };
		try {
			await dispatch(productsOperations.addProduct(product));
			history.push(routes.HOME);
		} catch (error) {
			toast.error('Can not upload this product');
		}
	};

	const handleImageUpload = (imgs) => {
		setImages(imgs);
	};

	if (!isLoggedIn) {
		return <Redirect to={routes.LOGIN} />;
	}

	return (
		<SellProduct
			initialValues={initialValues}
			schema={ProductSchema}
			onSubmit={handleAddProduct}
			handleImageUpload={handleImageUpload}
		/>
	);
};

export default SellProductPage;
