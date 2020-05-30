const getProductImage = (photos) => {
  return photos ? photos[0] || '/product-placeholder.png' : '/product-placeholder.png';
};

export default getProductImage;
