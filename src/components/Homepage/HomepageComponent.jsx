import React from 'react';
import Product from '../Product/ProductItem';
import Loading from '../CustomComponents/Loading/Loading';

export const Homepage = ({ products, hanldeLoadMore, isLoadingMore, limit, search }) => {
  return (
    <div className="container">
      <div className="product-list">
        {products ? products.map((p) => <Product product={p} key={p.id} />) : <Loading />}
        {products.length % limit === 0 && !search ? (
          <div className="center col">
            {isLoadingMore && <Loading height={'auto'} />}
            <button className="load-more-btn" onClick={hanldeLoadMore}>
              Load more
            </button>
          </div>
        ) : (
          ''
        )}
      </div>
    </div>
  );
};
