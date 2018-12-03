import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
// import styled from 'styled-components';

import { TestScraperFormContainer } from '../../containers';
import {
	SignInPage,
	SignUpPage,
	SignedIn,
	SignedUp,
	Navi,
	StripeProviderStub,
	LandingPage
} from '../';

class App extends Component {
	render() {
		return (
			<Router>
				<div>
					<Navi />
					<Route
						path="/testScraperFormContainer"
						component={TestScraperFormContainer}
					/>
					<Route exact path="/" component={LandingPage} />
					<Route path="/signIn" component={SignInPage} />
					<Route path="/signUp" component={SignUpPage} />
					<Route path="/signedIn" component={SignedIn} />
					<Route path="/signedUp" component={SignedUp} />
					<Route path="/payment" component={StripeProviderStub} />
				</div>
			</Router>
		);
	}
}

export default App;
