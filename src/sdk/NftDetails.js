import React, {useState, useEffect, PropTypes} from "react";
import {connect} from "react-redux";
import {HashRouter as Router} from "react-router-dom";
//import {main_screen_bg} from "../sdk/img/screenbg1.png"
import ConnectWalletPage from "./ConnectWalletPage";

import {Account} from "@tonclient/appkit";
import {libWeb} from "@tonclient/lib-web";

import {signerKeys, TonClient, signerNone} from "@tonclient/core";

import {DataContract} from "./collection contracts/DataContract.js";
import {NFTMarketContract} from "./collection contracts/NftMarketContract.js";
import {NftRootColectionContract} from "./collection contracts/NftRootColectionContract.js";
import {IndexContract} from "./collection contracts/IndexContract.js";

const config = require("./config.json");

TonClient.useBinaryLibrary(libWeb);

const client = new TonClient({network: {endpoints: [config.DappServer]}});

async function getClientKeys(phrase) {
	//todo change with only pubkey returns
	let test = await client.crypto.mnemonic_derive_sign_keys({
		phrase,
		path: "m/44'/396'/0'/0/0",
		dictionary: 1,
		word_count: 12,
	});
	console.log(test);
	return test;
}

function NftDetails() {
	const [connectWal, setConnect] = useState(false);

	const [openMenu, setOpenMenu] = useState(false);

	const [activeCat, setActiveCat] = useState(0);

	const [nftCol, setNftCol] = useState([
		{
			addrNft: "Null",
			name: "Null",
			desc: "Null",
			image: "Null",
		},
	]);

	let marketrootAddr = config.marketroot;

	async function getHash() {
		const acc = new Account(NFTMarketContract, {
			address: marketrootAddr,
			signer: signerNone(),
			client,
		});

		let rootCode;

		try {
			const response = await acc.runLocal("resolveCodeHashNftRoot", {});
			let value0 = response;
			rootCode = response.decoded.output.codeHashData.split("0x")[1];
			// console.log("value0", value0);
		} catch (e) {
			console.log("catch E", e);
		}

		await fetch("https://net.ton.dev/graphql", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				query: `
					{accounts(
					filter:{
						  code_hash:{
						  eq:"${rootCode}"
						}
					}){
					  id
					}}
				`,
			}),
		})
			.then((r) => r.json())
			.then(async (data) => {
				let tempData = data.data.accounts;

				console.log(tempData);

				let tempAddr = tempData[0].id;

				const tempAcc = new Account(NftRootColectionContract, {
					address: tempAddr,
					signer: signerNone(),
					client,
				});

				let hashNFT;

				try {
					const response = await tempAcc.runLocal("resolveCodeHashIndex", {
						addrRoot:
							"0:0000000000000000000000000000000000000000000000000000000000000000",
						addrOwner: sessionStorage.getItem("address"),
					});
					let value0 = response;
					hashNFT = response.decoded.output.codeHashIndex.split("0x")[1];
					console.log("value0", value0);
				} catch (e) {
					console.log("catch E", e);
				}

				console.log(hashNFT);

				await fetch("https://net.ton.dev/graphql", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						query: `
						{accounts(
						filter:{
							code_hash:{
							eq:"${hashNFT}"
							}
						}){
						id
						}}
					`,
					}),
				})
					.then((r) => r.json())
					.then(async (data) => {
						console.log(data);

						let tempCol = [];

						for (let j = 0; j < data.data.accounts.length; j++) {
							let addrNFT = data.data.accounts[j].id;

							console.log(addrNFT);

							const tempAccIndNFT = new Account(IndexContract, {
								address: addrNFT,
								signer: signerNone(),
								client,
							});

							let addrDataNFT;

							try {
								const response = await tempAccIndNFT.runLocal("getInfo", {});
								let value0 = response;
								addrDataNFT = response.decoded.output.addrData;
								console.log("value0", value0);
							} catch (e) {
								console.log("catch E", e);
							}

							const tempAccDataNFT = new Account(DataContract, {
								address: addrDataNFT,
								signer: signerNone(),
								client,
							});

							try {
								const response = await tempAccDataNFT.runLocal("getInfo", {});
								let value0 = response.decoded.output;
								tempCol.push({
									addrNft: addrNFT,
									name: value0.name,
									desc: value0.description,
									image: value0.meta.json,
								});
								console.log("value0", value0);
							} catch (e) {
								console.log("catch E", e);
							}
						}

						setNftCol(tempCol);
					});

				let test1;

				try {
					const response = await tempAcc.runLocal("resolveData", {
						addrRoot: tempData[4].id,
						id: 1,
					});
					let value0 = response;
					test1 = response.decoded.output.addrData;
					console.log("value0", value0);
				} catch (e) {
					console.log("catch E", e);
				}

				console.log(test1);

				const tempAccData = new Account(DataContract, {
					address: test1,
					signer: signerNone(),
					client,
				});

				try {
					const response = await tempAccData.runLocal("getInfo", {});
					let value0 = response;
					console.log("value0", value0);
				} catch (e) {
					console.log("catch E", e);
				}
			});
	}

	useEffect(() => {
		getHash();
	}, []);

	return (
		<Router>
			<div className={connectWal ? "error-bg" : "hide"}>
				<span onClick={() => setConnect(false)}></span>
			</div>
			<div className={connectWal ? "App-error" : "App App2"}>
				<div className="header header2">
					<div className="container-header">
						<div className="acc-info">
							<div class="acc-info1">
								<a href="#/">
									<div class="name">NFTour</div>
								</a>
								{sessionStorage.address ? (
									<div class="wallet">
										<div className="acc-status">Connected:</div>
										<div className="acc-wallet">{localStorage.address}</div>
										<div
											className={
												openMenu ? "btn-menu btn-menu-active" : "btn-menu"
											}
											onClick={() => setOpenMenu(!openMenu)}
										></div>

										<div className={openMenu ? "menu-info" : "hide"}>
											Your Profile
										</div>
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
								<a href="#/">
									<div class="page-element active">Home</div>
								</a>
								<a href="#/load-nft">
									<div class="page-element">NFT Generator</div>
								</a>
								<a href="#/collection-market">
									<div class="page-element">NFT Collection Market</div>
								</a>
								<div class="page-element">FAQ</div>
							</div>
						</div>
					</div>
				</div>

				<div className={connectWal ? "" : "hide"}>
					<ConnectWalletPage></ConnectWalletPage>
				</div>

				<div class="container">
					<div class="nft-info">
						<div class="image"></div>
						<div class="info-1">
							<div class="coll-name">Untitled Coolection #1239239</div>
							<div class="nft-name">Roboto #20542040</div>
							<div class="price">
								Price: <span>149 EVER</span> ~50$
							</div>

							<div class="block-info description">
								<div class="title">
									<div class="icon"></div>
									<div class="text">Description</div>
								</div>
								<div class="info">
									Created by you. This NFT has no description yet
								</div>
							</div>

							<div class="block-info about">
								<div class="title">
									<div class="icon"></div>
									<div class="text">About Untitled Coolection #1239239</div>
								</div>
								<div class="info">
									This collection has no description yet. Contact the owner of
									this collection about settings it up on NFTTour!
								</div>
							</div>
						</div>

						<div class="info-2">
							<div class="block-info details">
								<div class="title">
									<div class="icon"></div>
									<div class="text">Details</div>
								</div>
								<div class="info">
									<div>
										<span>Contact Adress</span>
										<span>0x495f...7b5e</span>
									</div>
									<div>
										<span>Token ID</span>
										<span>925392395593923....</span>
									</div>
									<div>
										<span>Token Standart</span>
										<span>ERC-1155</span>
									</div>
									<div>
										<span>Blockchain</span>
										<span>Eth</span>
									</div>
									<div>
										<span>Metadata</span>
										<span>Editable</span>
									</div>
								</div>
							</div>

							<div class="block-info activity">
								<div class="title">
									<div class="icon"></div>
									<div class="text">Item Activity</div>
								</div>
							</div>
						</div>
					</div>
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
								<a href="https://t.me/DefiSpacecom">
									<div class="page-element">Telegram</div>
								</a>
							</div>
							<div class="email">
								<span>For corporation</span>
								<div class="text">info@radianceteam.com</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Router>
	);
}

export default NftDetails;
