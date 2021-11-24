import React from "react";
//import "../index.scss";
//import './App.css';
//import 'bootstrap/dist/css/bootstrap.css';
import "bootstrap";
import logo from "./img/radiance logo.png";
import {HashRouter as Router, Switch, Route} from "react-router-dom";

import StartPageHeader from "./StartPageHeader";
import WelcomeDidPageHeader from "./WelcomeDidPageHeader";
import AppPageHeader from "./AppPageHeader";

function Header() {
	return (
		<Router>
			<div className="header">
				<div className="container">
					<header className="d-flex flex-wrap justify-content-sm-around py-3 mb-4">
						<a
							href="#/"
							className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none"
						>
							<img src={logo} alt="logo" className="logo" />
							<span className="fs-4">RADIANCETEAM</span>
						</a>

						<Switch>
							{/* <Route exact path="/" component={StartPageHeader}></Route> */}
							{/* <Route exact path="/connect-wallet" component={StartPageHeader}></Route> */}
							<Route
								exact
								path="/welcome-did"
								component={WelcomeDidPageHeader}
							></Route>
							<Route
								exact
								path="/login-did"
								component={WelcomeDidPageHeader}
							></Route>
							<Route
								exact
								path="/login"
								component={WelcomeDidPageHeader}
							></Route>
							<Route
								exact
								path="/welcome-nft"
								component={WelcomeDidPageHeader}
							></Route>
							<Route
								exact
								path="/load-nft"
								component={WelcomeDidPageHeader}
							></Route>
							<Route
								exact
								path="/nft-customization"
								component={WelcomeDidPageHeader}
							></Route>
							<Route
								exact
								path="/nft-generate"
								component={WelcomeDidPageHeader}
							></Route>
							<Route
								exact
								path="/nft-collection"
								component={WelcomeDidPageHeader}
							></Route>
							<Route exact path="/app" component={AppPageHeader}></Route>
						</Switch>
					</header>
				</div>
			</div>
		</Router>
	);
}

export default Header;
