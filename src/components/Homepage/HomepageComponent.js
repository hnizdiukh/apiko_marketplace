import React from 'react';
import Product from '../Product/Product';
import Loading from '../CustomComponents/Loading';

export const Homepage = ({ products }) => {
	return (
		<div className="container">
			<div className="product-filters">
				<select>
					<option defaultValue>Choose category</option>
					<option>Freedom</option>
					<option>Nature</option>
					<option>Music</option>
				</select>
				<input placeholder="Price from (USD)" />
				<hr className="price-between" />
				<input placeholder="Price to (USD)" />
			</div>
			<div className="product-list">
				{products ? products.map((p) => <Product product={p} key={p.id} />) : <Loading />}
			</div>
		</div>
	);
};
