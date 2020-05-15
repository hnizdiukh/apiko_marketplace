import React, { Fragment, useRef, useState, useEffect } from 'react';
import './productImageInput.css';

const renderButtons = (images, setImages, imageInput) => {
	let arrayOfButtons = [];
	for (let i = 0; i < images.length + 1; i++) {
		arrayOfButtons.push(
			<Fragment key={i}>
				<div onClick={() => imageInput.current.click()} className="upload-product-image">
					+
				</div>
				<input
					onChange={(e) => {
						e.target.files[0] && setImages([ ...images, e.target.files[0] ]);
					}}
					type="file"
					accept="image/*"
					name="photos"
					autoComplete="photo"
					className="product-image-input"
					ref={imageInput}
				/>
			</Fragment>
		);
		return arrayOfButtons;
	}
};

const ProductImagesInput = ({ handleImageUpload }) => {
	const imageInput = useRef();
	const [ images, setImages ] = useState([]);

	useEffect(
		() => {
			handleImageUpload(images);
		},
		[ images, handleImageUpload ]
	);

	return (
		<Fragment>
			<label>Photos</label>
			<div className="product-image-container">
				{images.map((image) => (
					<div key={image.lastModified}>
						<img className="uploaded-product-image" src={URL.createObjectURL(image)} alt={image.name} />
						<span className="remove-image" onClick={() => setImages(images.filter((img) => img !== image))}>
							-
						</span>
					</div>
				))}
				{renderButtons(images, setImages, imageInput)}
			</div>
		</Fragment>
	);
};

export default ProductImagesInput;
