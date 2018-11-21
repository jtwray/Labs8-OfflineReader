// Based loosly on https://redux.js.org/recipes/configuringyourstore
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from './reducers';

export default preloadedState => {
	// collect our middleware into a central applyMiddleware redux method
	const middlewares = [thunk];
	if (process.env.NODE_ENV !== 'production') {
		middlewares.push(logger);
	}
	const middlewareEnhancer = applyMiddleware(...middlewares);

	// grab all the middleware and any enhancers for the store
	const enhancers = [middlewareEnhancer];

	// feed all the middleware and enhancers to a store composer based on the environment
	let composedEnhancers;
	if (process.env.NODE_ENV === 'production') {
		composedEnhancers = compose(...enhancers);
	} else {
		composedEnhancers = composeWithDevTools(...enhancers);
	}

	// yay! we have a store! preloadedState in place in case we want to feed in test data later.
	return createStore(rootReducer, preloadedState, composedEnhancers);
};
