import React from 'react';
import Product from '../Product/Product';
import Loading from '../CustomComponents/Loading';

const WishlistPage = ({ products }) => {
	return (
		<div className="wishlist-container">
			<div className="product-container">
				<h1 className="saved-items-title">
					Saved items <span>({products.length})</span>
				</h1>
				<div className="product-list">
					{products ? products.map((p) => <Product product={p} key={p.id} />) : <Loading />}
				</div>
			</div>
		</div>
	);
};

export default WishlistPage;
