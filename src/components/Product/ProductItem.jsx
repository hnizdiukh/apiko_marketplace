import React from 'react';
import { Link } from 'react-router-dom';
import routes from 'src/routes/config';
import { Icon } from '../CustomComponents/Icon/Icon';
import { useSelector } from 'react-redux';
import useAddToWishlist from 'src/utils/useAddToWishlist';

const Product = ({ product }) => {
  const user = useSelector((state) => state.viewer.user);
  const [ isSaved, setSaved ] = useAddToWishlist(user, product);

  const handleAddToWishlish = () => {
    setSaved(isSaved);
  };

  let hasPhoto = product.photos !== null && product.photos[0] !== '' && product.photos.length !== 0;
  let isUserOwner = user ? product.ownerId === user.id : false;

  return (
    <div className="product-thumbnail">
      <Link to={`${routes.PRODUCT}/${product.id}`}>
        <img src={hasPhoto ? product.photos[0] : '/product-placeholder.png'} alt={product.title} />
      </Link>
      {isUserOwner ? (
        ''
      ) : (
        <div className="add-to-wishlist-container">
          <span className="add-to-wishlist-wrap" onClick={handleAddToWishlish}>
            {isSaved ? (
              <Icon name="heart_filled" width="16" height="17" fill="#349a89" />
            ) : (
              <Icon name="heart" width="16" height="17" />
            )}
          </span>
        </div>
      )}
      <div>
        <p>{product.title}</p>
        <b>${product.price.toFixed(2)}</b>
      </div>
    </div>
  );
};
export default Product;
