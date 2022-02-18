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
				<div className="container-header">
					<div className="acc-info">
						<div class="acc-info1">
							<div class="name">NFTour</div>
							<div class="wallet">
								<div className="acc-status">Connected:</div>
								<div className="acc-wallet">{localStorage.address}</div>
							</div>
						</div>

						<div class="pages">
							<div class="page-element active">Home</div>
							<div class="page-element">NFT Generator</div>
							<div class="page-element">NFT Chapter Constructor</div>
							<div class="page-element">FAQ</div>
						</div>
					</div>
				</div>
			</div>
		</Router>
	);
}

export default Header;
