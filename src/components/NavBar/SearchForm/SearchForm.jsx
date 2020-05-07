import React from 'react';
import { Icon } from 'src/components/CustomComponents/Icon/Icon';
import './search.css';
import { Formik, Form } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import { productsOperations } from 'src/modules/products';

const Search = () => {
	let initialValues = { productName: '', location: '' };
	const dispatch = useDispatch();

	const handleSearch = (values) => {
		console.log('onSubmit', values);
		const { productName, location } = values;
		if (!productName && !location) {
			return;
		}
		let usp = new URLSearchParams();
		if (productName) {
			usp.append('keywords', productName);
		}
		if (location) {
			usp.append('location', location);
		}
		dispatch(productsOperations.search(usp));
	};

	return (
		<Formik initialValues={initialValues} onSubmit={handleSearch}>
			{({ values, handleChange, handleSubmit }) => (
				<Form className="search-form" onSubmit={handleSubmit}>
					(<div id="search-input">
						<Icon name="search" height="18" width="17" id="search-icon" />
						<input
							placeholder="Search product by name"
							name="productName"
							onChange={handleChange}
							value={values.productName}
						/>
					</div>
					<div id="location-input">
						<Icon name="location" width="13" height="19" id="location-icon" />
						<input placeholder="Location" name="location" onChange={handleChange} value={values.location} />
					</div>
					<div>
						<button className="search-btn" type="submit">
							Search
						</button>
					</div>
				</Form>
			)}
		</Formik>
	);
};

export default Search;
