import React, { useEffect, useState, Fragment } from 'react';
import { useParams, Link } from 'react-router-dom';
import './productpage.css';
import { Icon } from '../CustomComponents/Icon/Icon';
import Badge from '../CustomComponents/Badge';
import { useDispatch, useSelector } from 'react-redux';
import { productsOperations } from 'src/modules/products';
import Loading from '../CustomComponents/Loading/Loading';
import store from 'src/store/createStore';
import Moment from 'react-moment';
import useAddToWishlist from 'src/utils/useAddToWishlist';

const ProductPage = (props) => {
	let { productId } = useParams();
	const dispatch = useDispatch();
	const [ product, setProduct ] = useState(null);
	const user = useSelector((state) => state.viewer.user);
	const [ isSaved, setSaved ] = useAddToWishlist(user, product);

	useEffect(
		() => {
			const fetchProduct = async () => {
				await dispatch(productsOperations.getProduct(productId));
				const productState = await store.getState();
				setProduct(productState.products.product);
			};
			fetchProduct();
		},
		[ dispatch, productId ]
	);

	let isUserOwner = user && product ? product.owner.id === user.id : false;

	let renderElement = !product ? (
		<Loading />
	) : (
		<div className="container product-page">
			<div className="product-details">
				<img src={product.photos[0] || '/product-placeholder.png'} alt="product" />
				<div className="pdp-content-container">
					<p id="price-pdp">
						<b>${product.price.toFixed(2)}</b>
					</p>
					<p id="name-pdp">
						{product.title}
						<span>
							<Moment fromNow>{product.createdAt}</Moment>
						</span>
					</p>
					<p className="location-pdp">
						<Icon name="location" height="17" width="11" />
						<span>{product.location}</span>
					</p>
					<p className="description-pdp">{product.description}</p>
				</div>
			</div>

			<div className="author-details">
				<div className="author-info-wrap">
					<div className="green-block" />
					<div className="author-info">
						<Badge user={product.owner} wrapperClassName="badge-pdp" size="72px" fontSize="30px" />
						<p className="owner-name">{product.owner.fullName}</p>
						<p className="location-pdp">{product.owner.location || ''}</p>
					</div>
				</div>
				{isUserOwner ? (
					''
				) : (
					<Fragment>
						<div className="chat-btn-wrap">
							<Link to={{ pathname: props.match.url, search: '?chat=true' }} className="chat-btn btn">
								Chat with seller
							</Link>
						</div>

						<div>
							<button className="addToFavorite-btn" onClick={() => setSaved(isSaved)}>
								{isSaved ? (
									<Fragment>
										<Icon name="heart_filled" height="17" width="16" fill="#2E2E2E" />
										Remove favorite
									</Fragment>
								) : (
									<Fragment>
										<Icon name="heart" height="17" width="16" />
										Add to favorite
									</Fragment>
								)}
							</button>
						</div>
					</Fragment>
				)}
			</div>
		</div>
	);

	return renderElement;
};

export default ProductPage;
