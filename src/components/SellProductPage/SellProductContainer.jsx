import React from 'react';
import SellProduct from './SellProduct';
import * as Yup from 'yup';

const SellProductPage = () => {
	const initialValues = {
		title: '',
		location: '',
		description: '',
		photos: [],
		price: ''
	};

	const ProductSchema = Yup.object().shape({
		title: Yup.string().email('Invalid email').required('Required'),
		location: Yup.string().min(4, 'Too Short!').max(50, 'Too Long!').required('Required'),
		description: Yup.string(),
		photos: Yup.array().of(Yup.string()),
		price: Yup.number().required('Required')
	});

	const handleAddProduct = (values) => {
		console.log(values);
	};
	return <SellProduct initialValues={initialValues} validationSchema={ProductSchema} onSubmit={handleAddProduct} />;
};

export default SellProductPage;
