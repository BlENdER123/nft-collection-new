import React from "react";

function WelcomeDidPageHeader() {
	return (
		<div className="acc">
			<div className="acc-logo"></div>
			<div className="content">
				<div className="acc-status">Connected</div>
				<div className="break"></div>
				<div className="acc-wallet">{localStorage.address}</div>
			</div>
		</div>
	);
}

export default WelcomeDidPageHeader;
