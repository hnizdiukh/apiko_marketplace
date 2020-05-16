import React, { useEffect } from 'react';
import { Homepage } from './HomepageComponent';
import { useSelector, useDispatch } from 'react-redux';
import Loading from '../CustomComponents/Loading/Loading';
import { productsOperations } from 'src/modules/products';
import './productlist.css';
import { useLocation } from 'react-router-dom';

const HomepageContainer = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const user = useSelector((state) => state.viewer.user);
  const products = useSelector((state) => state.products.products);
  const isLoading = useSelector((state) => state.products.fetchProducts.isLoading);
  const isSearching = useSelector((state) => state.products.search.isLoading);

  useEffect(
    () => {
      if (user) dispatch(productsOperations.savedProducts());
    },
    [ user, dispatch ]
  );

  useEffect(
    () => {
      location.search
        ? dispatch(productsOperations.search(new URLSearchParams(location.search)))
        : dispatch(productsOperations.fetchProducts());
    },
    [ dispatch, location ]
  );

  let HomepageElement = isLoading || isSearching ? <Loading /> : <Homepage products={products} />;

  if (!products.length && !isLoading && !isSearching) {
    HomepageElement = <div className="no-products not-found">No products found</div>;
  }

  return HomepageElement;
};

export default HomepageContainer;
