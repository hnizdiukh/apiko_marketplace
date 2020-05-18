import createAsyncActions from '@letapp/redux-actions/lib/createAsyncActions';

export const products = createAsyncActions('products/FETCH');
export const fetchMoreProducts = createAsyncActions('products/FETCH_MORE');
export const addProduct = createAsyncActions('products/ADD');
export const search = createAsyncActions('products/SEARCH');
export const saveProduct = createAsyncActions('products/SAVE');
export const unsaveProduct = createAsyncActions('products/UNSAVE');
export const savedProducts = createAsyncActions('products/SAVED');
export const getProduct = createAsyncActions('products/GET_PRODUCT');
