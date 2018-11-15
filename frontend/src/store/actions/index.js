import axios from 'axios';
//Article
export const ADD_ARTICLE = 'ADD_ARTICLE';
export const DELETE_ARTICLE = 'DELETE_ARTICLE';
export const FETCH_ARTICLE_DATA = 'FETCH_ARTICLE_DATA';
export const ARTICLE_DATA_FETCHED = 'ARTICLE_DATA_FETCHED';
export const USER_ERROR = 'ERROR';
export const ARTICLE_ERROR = 'ARTICLE_ERROR';
//User
export const REGISTER_USER = 'REGISTER_USER';
export const LOGIN_USER = 'LOGIN_USER';
export const LOGOUT_USER = 'LOGOUT_USER';
export const FETCH_USER_DATA = 'FETCH_USER_DATA';
export const USER_DATA_FETCHED = 'USER_DATA_FETCHED';

const apiBaseURL = 'https://anywhere-reader-test.herokuapp.com/api';

export const loadUser = () => {
	return (dispatch, getState) => {
		dispatch({ type: 'USER_LOADING' });

		const token = getState().auth.token;

		let headers = {
			'Content-Type': 'application/json'
		};

		if (token) {
			headers['Authorization'] = `Token ${token}`;
		}
		return fetch(apiBaseURL + '/auth/user/', { headers })
			.then(res => {
				if (res.status < 500) {
					return res.json().then(data => {
						return { status: res.status, data };
					});
				} else {
					console.log('Server Error!');
					throw res;
				}
			})
			.then(res => {
				if (res.status === 200) {
					dispatch({ type: 'USER_LOADED', user: res.data });
					return res.data;
				} else if (res.status >= 400 && res.status < 500) {
					dispatch({ type: 'AUTHENTICATION_ERROR', data: res.data });
					throw res.data;
				}
			});
	};
};

export const login = (username, password) => {
	return (dispatch, getState) => {
		let headers = { 'Content-Type': 'application/json' };
		let body = JSON.stringify({ username, password });

		return fetch('/api/auth/login/', { headers, body, method: 'POST' })
			.then(res => {
				if (res.status < 500) {
					return res.json().then(data => {
						return { status: res.status, data };
					});
				} else {
					console.log('Server Error!');
					throw res;
				}
			})
			.then(res => {
				if (res.status === 200) {
					dispatch({ type: 'LOGIN_SUCCESSFUL', data: res.data });
					return res.data;
				} else if (res.status === 403 || res.status === 401) {
					dispatch({ type: 'AUTHENTICATION_ERROR', data: res.data });
					throw res.data;
				} else {
					dispatch({ type: 'LOGIN_FAILED', data: res.data });
					throw res.data;
				}
			});
	};
};

// User actions //
export const register = (username, password) => {
	return (dispatch, getState) => {
		let headers = { 'Content-Type': 'application/json' };
		let body = JSON.stringify({ username, password });

		return fetch('/api/auth/register/', { headers, body, method: 'POST' })
			.then(res => {
				if (res.status < 500) {
					return res.json().then(data => {
						return { status: res.status, data };
					});
				} else {
					console.log('Server Error!');
					throw res;
				}
			})
			.then(res => {
				if (res.status === 200) {
					dispatch({ type: 'REGISTRATION_SUCCESSFUL', data: res.data });
					return res.data;
				} else if (res.status === 403 || res.status === 401) {
					dispatch({ type: 'AUTHENTICATION_ERROR', data: res.data });
					throw res.data;
				} else {
					dispatch({ type: 'REGISTRATION_FAILED', data: res.data });
					throw res.data;
				}
			});
	};
};

export const logoutUser = user => {
	return dispatch => {
		dispatch({ type: LOGOUT_USER });
		axios
			.post(apiBaseURL + '/rest-auth/logout/', user)
			.then(response =>
				dispatch({
					type: LOGOUT_USER,
					payload: {
						//the payload you're giving the API to populate the new user
					}
				})
			)
			.catch(err => dispatch({ type: USER_ERROR, err }));
	};
};
// Article actions //
export const addArticle = article => {
	return dispatch => {
		dispatch({ type: FETCH_ARTICLE_DATA });
		axios
			.post(apiBaseURL + '/users/{id}/articles', article)
			.then(response =>
				dispatch({
					type: ADD_ARTICLE,
					payload: {
						//the payload you're giving the API to populate the new article, will likely just be the article url that's fed to the scraper
					}
				})
			)
			.then(
				// Re-GET all the articles, with the newly added one included
				axios
					.get(apiBaseURL + '/users/{id}/articles')
					.then(response =>
						dispatch({ type: ARTICLE_DATA_FETCHED, payload: response.data })
					)
			)
			.catch(err => dispatch({ type: ARTICLE_ERROR, err }));
	};
};

export const deleteArticle = article => {
	return dispatch => {
		dispatch({ type: FETCH_ARTICLE_DATA });
		axios
			.delete(apiBaseURL + '/users/{id}/articles', article)
			.then(response =>
				dispatch({
					type: DELETE_ARTICLE,
					payload: {
						//the payload you're giving the API to delete the article
					}
				})
			)
			.then(
				// Re-GET all the articles of that user to confirm the deleted article isnt there
				axios
					.get(apiBaseURL + '/users/{id}/articles')
					.then(response =>
						dispatch({ type: ARTICLE_DATA_FETCHED, payload: response.data })
					)
			)
			.catch(err => dispatch({ type: ARTICLE_ERROR, err }));
	};
};
