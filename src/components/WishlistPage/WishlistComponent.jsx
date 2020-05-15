import React from 'react';
import Product from '../Product/ProductItem';
import Loading from '../CustomComponents/Loading/Loading';
import './wishlist.css';

const WishlistPage = ({ products }) => {
	return (
		<div className="wishlist-container container">
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
