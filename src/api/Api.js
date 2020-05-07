import axios from 'axios';

const urls = {
	login: 'api/auth/login',
	register: 'api/auth/register',
	getViewer: 'api/account/user',
	getProduts: 'api/products/latest',
	putUser: 'api/account/user',
	imageUpload: 'api/upload/images',
	getSaved: 'api/products/saved',
	search: 'api/products/search'
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

			this._setTokenToAxios(token);
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
		return axios.get(urls.getProduts);
	},
	save(productId) {
		return axios.post(`api/products/${productId}/save`);
	},
	unsave(productId) {
		return axios.post(`api/products/${productId}/unsave`);
	},
	getSaved() {
		return axios.get(urls.getSaved);
	},
	search(query) {
		console.log(urls.search + '?' + query);
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

export function init() {
	Auth.init();
}
