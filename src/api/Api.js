import axios from 'axios';
import SocketApi from './SocketApi';

const urls = {
	login: '/api/auth/login',
	register: '/api/auth/register',
	getViewer: '/api/account/user',
	putUser: '/api/account/user',

	getProducts: '/api/products/latest',
	getProduct: '/api/products',
	addProduct: '/api/products',
	getSaved: '/api/products/saved',

	imageUpload: '/api/upload/images',

	search: '/api/products/search',

	createChat: '/api/products/',
	chats: '/api/chats',
	sendMessage: '/api/chats',
	getMessages: '/api/chats'
};

export const Auth = {
	_token: null,

	get isLoggedIn() {
		return !!this._token;
	},

	setToken(token) {
		this._token = token;

		this._storeToken(token);

		this._setTokenToAxios(token);
	},

	init() {
		try {
			const token = window.localStorage.getItem('token');
			this._token = JSON.parse(token);

			this._setTokenToAxios(this._token);

			SocketApi.init(this._token);
		} catch (err) {
			console.error(err);
		}
	},

	login({ email, password }) {
		return axios.post(urls.login, { email, password });
	},

	logout() {
		this._token = null;
		try {
			window.localStorage.removeItem('token');
		} catch (err) {
			console.error(err);
		}
	},

	register({ email, password, fullName }) {
		return axios.post(urls.register, { email, password, fullName });
	},

	_storeToken() {
		try {
			window.localStorage.setItem('token', JSON.stringify(this._token));
		} catch (error) {
			console.error(error);
		}
	},

	_setTokenToAxios(token) {
		axios.defaults.headers.common.Authorization = `Bearer ${token}`;
	}
};

export const Viewer = {
	get() {
		return axios.get(urls.getViewer);
	},
	put({ fullName, avatar, phone, location }) {
		return axios.put(urls.putUser, { fullName, avatar, phone, location });
	}
};

export const Products = {
	get() {
		return axios.get(urls.getProducts);
	},
	getProduct(productId) {
		return axios.get(urls.getProduct + '/' + productId);
	},
	add(product) {
		return axios.post(urls.addProduct, product);
	},
	save(productId) {
		return axios.post(`/api/products/${productId}/save`);
	},
	unsave(productId) {
		return axios.post(`/api/products/${productId}/unsave`);
	},
	getSaved() {
		return axios.get(urls.getSaved);
	},
	search(query) {
		return axios.get(urls.search, { params: query });
	}
};

export const Image = {
	upload(image) {
		const formData = new FormData();
		formData.append('image', image);
		return axios.post(urls.imageUpload, formData);
	}
};

export const Chats = {
	createChat(productId) {
		return axios.post(`${urls.createChat}/${productId}/createChat`);
	},
	get() {
		return axios.get(urls.chats);
	}
};

export const Messages = {
	sendMessage(text, chatId) {
		return axios.post(`${urls.sendMessage}/${chatId}/messages`, text);
	},
	getMessages(chatId) {
		return axios.get(`${urls.getMessages}/${chatId}/messages`);
	}
};

export function init() {
	Auth.init();
}
