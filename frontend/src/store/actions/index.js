export const apiBaseUrl =
	process.env.NODE_ENV === 'production'
		? 'https://anywhere-reader-test.herokuapp.com'
		: 'http://localhost:8000';

export {
	ADD_ARTICLE,
	DELETE_ARTICLE,
	FETCH_ARTICLE_DATA,
	ARTICLE_DATA_FETCHED,
	ARTICLE_ERROR,
	addArticle,
	deleteArticle
} from './articleActions';

export {
	FETCHING_PAGES,
	PAGES_FETCHED,
	PAGES_FETCH_ERROR,
	INITIALIZE_URL_SUBMIT,
	COMPLETE_URL_SUBMIT,
	SUBMIT_URL_ERROR,
	TOGGLE_MODAL,
	fetchPages,
	toggleModal,
	sendURL
} from './testScraperFormActions';

export {
	REGISTER_USER,
	LOGGING_IN_USER,
	LOGGED_IN_USER,
	LOGOUT_USER,
	PREMIUM_USER,
	FETCH_USER_DATA,
	USER_DATA_FETCHED,
	USER_ERROR,
	registerUser,
	loginUser,
	logoutUser,
	fetchUser,
	premiumUser
} from './userActions';
