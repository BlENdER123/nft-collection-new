import React from "react";
import {HashRouter as Router} from "react-router-dom";

function WelcomeDidPage() {
	return (
		<Router>
			<div className="modal-w modal-welcome">
				<div className="text">Welcome!</div>

				<a href="#/login-did">
					<button type="button" className="btn btn-secondary">
						I want to create DID
					</button>
				</a>
			</div>
		</Router>
	);
}

export default WelcomeDidPage;
