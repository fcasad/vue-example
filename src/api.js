import axios from 'axios';

const fetchJSON = ({ 
	method = 'GET', 
	url = '/',
	query = {}, 
	body = {}, 
	headers = {},
} = {}) =>
	axios({
		method,
		url,
		params: query,
		data: body,
		baseURL: 'http://localhost:3000',
	    headers: Object.assign({
	    	// add auth headers
	        'Content-Type': 'application/json; charset=utf-8',
	    }, headers),
	})
		.then(res => Promise.resolve(res.data))
		.catch(err => Promise.reject(err));

export const listUsers = () => fetchJSON({ 
	url: 'users',
	query: { _sort: 'lastName' },
});

export const getUser = userId => fetchJSON({ 
	url: `users/${userId}`,
	query: { _expand: 'team' },
});

export const updateUser = (userId, update) => fetchJSON({
	method: 'PATCH',
	url: `users/${userId}`,
	body: update,
});
