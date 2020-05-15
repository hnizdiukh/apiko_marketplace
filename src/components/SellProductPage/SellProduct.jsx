import React from 'react';
import './sellproduct.css';
import Input from '../CustomComponents/InputComponent';
import { Form, Formik } from 'formik';
import ProductImagesInput from '../CustomComponents/ProductImageInput/ProductImagesUploader';

const SellProduct = (props) => {
	return (
		<div className="container">
			<div className="sell-container">
				<div className="sell-wrap">
					<h1>Add product</h1>
					<Formik initialValues={props.initialValues} validationSchema={props.schema} onSubmit={props.onSubmit}>
						{({ values, handleChange, handleSubmit, isSubmitting }) => (
							<Form className="form" onSubmit={handleSubmit}>
								<Input
									onChange={handleChange}
									value={values.title}
									label="Title"
									type="text"
									name="title"
									autoComplete="product-title"
									placeholder="For example: Iron man suit"
								/>

								<Input
									onChange={handleChange}
									value={values.location}
									label="Location"
									type="text"
									name="location"
									autoComplete="location"
									placeholder="For example: Los Angeles, CA"
								/>

								<Input
									onChange={handleChange}
									value={values.description}
									label="Description"
									type="text"
									name="description"
									autoComplete="product-description"
									as="textarea"
									placeholder="For example: Iron man suit"
								/>

								<ProductImagesInput handleImageUpload={props.handleImageUpload} value={values.photos} />

								<Input
									onChange={handleChange}
									value={values.price}
									label="Price"
									type="number"
									name="price"
									autoComplete="product-price"
									placeholder="9.99"
								/>

								<button className="primary-btn" type="submit" disabled={isSubmitting}>
									SUBMIT
								</button>
							</Form>
						)}
					</Formik>
				</div>
			</div>
		</div>
	);
};

export default SellProduct;
