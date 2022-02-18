import React, {useState} from "react";
import {connect} from "react-redux";
import {HashRouter as Router} from "react-router-dom";
//import {main_screen_bg} from "../sdk/img/screenbg1.png"
import ConnectWalletPage from "./ConnectWalletPage";

function OpenPack() {
	const [connectWal, setConnect] = useState(false);

	return (
		<Router>
			<div className={connectWal ? "error-bg" : "hide"}></div>
			<div className={connectWal ? "App-error" : "App App2"}>
				<div className="header header2">
					<div className="container-header">
						<div className="acc-info">
							<div class="acc-info1">
								<div class="name">NFTour</div>
								{localStorage.address ? (
									<div class="wallet">
										<div className="acc-status">Connected:</div>
										<div className="acc-wallet">{localStorage.address}</div>
									</div>
								) : (
									<div class="wallet">
										<div
											class="button-1-square"
											onClick={() => setConnect(true)}
										>
											Connect
										</div>
									</div>
								)}
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

				<div class="pack">
					<div class="title">Robots Collection</div>
					<div class="info">
						<div>
							Owner: <span>0:65eb...fe7b</span>
						</div>
						<div>
							Price: <span>149000.00</span>
						</div>
						<div>
							Royalty for Author : <span>15%</span>
						</div>
					</div>
					<div class="text">
						By purchasing and opening a pack of a collection, you get one of the
						NFTs from the selected collection
					</div>
					<div class="button-1-square">Buy & Open Pack</div>
				</div>

				<div class="footer">
					<div class="container-header">
						<div class="footer-1">
							<div class="name">RADIANCETEAM</div>
							<div class="copyright">
								© 2021, radianceteam.com
								<br />
								Terms of Service
								<br />
								Privacy Policy
							</div>
						</div>
						<div class="footer-2">
							<div class="pages">
								<div class="page-element active">Home</div>
								<div class="page-element">App</div>
								<div class="page-element">FAQ</div>
								<div class="page-element">Twitter</div>
								<div class="page-element">Facebook</div>
							</div>
							<div class="email">
								<span>For corparation</span>
								<div class="text">info@radianceteam.com</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Router>
	);
}

export default OpenPack;
