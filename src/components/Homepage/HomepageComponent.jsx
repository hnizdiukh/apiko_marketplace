import React from 'react';
import Product from '../Product/ProductItem';
import Loading from '../CustomComponents/Loading/Loading';

export const Homepage = ({ products }) => {
	return (
		<div className="container">
			<div className="product-list">
				{products ? products.map((p) => <Product product={p} key={p.id} />) : <Loading />}
			</div>
		</div>
	);
};
