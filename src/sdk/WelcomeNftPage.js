import React from "react";
import {HashRouter as Router} from "react-router-dom";

function WelcomeNftPage() {
	return (
		<Router>
			<div className="modal-w modal-welcome">
				<div className="text">Welcome!</div>

				<a href="#/load-nft">
					<button type="button" className="btn btn-secondary">
						I want to create NFT collection
					</button>
				</a>
			</div>
		</Router>
	);
}

export default WelcomeNftPage;
