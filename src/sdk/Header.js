import React, {useState} from "react";
//import "../index.scss";
//import './App.css';
//import 'bootstrap/dist/css/bootstrap.css';
import "bootstrap";
import logo from "./img/radiance logo.png";
import {
	HashRouter as Router,
	Switch,
	Route,
	useHistory,
} from "react-router-dom";
import ConnectWalletPage from "./ConnectWalletPage";
import {useDispatch, useSelector} from "react-redux";

function Header({activeCat}) {
	let history = useHistory();

	const [openMenu, setOpenMenu] = useState(false);

	const [mobMenu, setMobMenu] = useState(false);

	const dispatch = useDispatch();

	const connectWallet = useSelector((state) => state.connectWallet);

	function logOut(e) {
		e.preventDefault();
		console.log(1);
		sessionStorage.clear();
		location.reload();
	}

	function open() {
		dispatch({type: "openConnect"});
		console.log(connectWallet);
	}

	return (
		<Router>
			<div className="header header2">
				<div className="container-header">
					<div className="acc-info">
						<div className={mobMenu ? "hide" : "acc-info1"}>
							<a href="#/">
								<div class="name">NFTour</div>
							</a>
							{sessionStorage.address ? (
								<div class="wallet">
									<div className="acc-status">Connected:</div>
									<div className="acc-wallet">{sessionStorage.address}</div>
									<div
										className={
											openMenu ? "btn-menu btn-menu-active" : "btn-menu"
										}
										onClick={() => setOpenMenu(!openMenu)}
									></div>

									<div className={openMenu ? "menu-info" : "hide"}>
										<a
											onClick={(ev) => {
												ev.preventDefault();
												history.push(
													"/profile/" + sessionStorage.getItem("address"),
												);
											}}
										>
											Your Profile
										</a>
										<a onClick={logOut}>Log out</a>
									</div>
								</div>
							) : (
								<div class="wallet">
									<div class="button-1-square" onClick={open}>
										Connect
									</div>
								</div>
							)}
						</div>

						<div class="pages">
							<a href="#/">
								<div
									className={
										activeCat == 0 ? "page-element active" : "page-element"
									}
								>
									Home
								</div>
							</a>
							<a href="#/load-nft">
								<div
									className={
										activeCat == 1 ? "page-element active" : "page-element"
									}
								>
									NFT Generator
								</div>
							</a>
							<a href="#/collection-market">
								<div
									className={
										activeCat == 2 ? "page-element active" : "page-element"
									}
								>
									NFT Collection Market
								</div>
							</a>
							<div class="page-element">FAQ</div>
						</div>

						<div className={mobMenu ? "pages-m pages-m-active" : "pages-m"}>
							<a href="#/">
								<div
									className={
										activeCat == 0 ? "page-element active" : "page-element"
									}
								>
									Home
								</div>
							</a>
							<a href="#/load-nft">
								<div
									className={
										activeCat == 1 ? "page-element active" : "page-element"
									}
								>
									NFT Generator
								</div>
							</a>
							<a href="#/collection-market">
								<div
									className={
										activeCat == 2 ? "page-element active" : "page-element"
									}
								>
									NFT Collection Market
								</div>
							</a>
							<a>
								<div class="page-element">FAQ</div>
							</a>

							<span
								onClick={() => setMobMenu(!mobMenu)}
								className={mobMenu ? "menu-m menu-m-active" : "menu-m"}
							></span>
						</div>
					</div>
				</div>
			</div>

			<div className={connectWallet ? "" : "hide"}>
				<ConnectWalletPage></ConnectWalletPage>
			</div>
		</Router>
	);
}

export default Header;
