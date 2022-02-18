import React, {useState} from "react";
import {HashRouter as Router} from "react-router-dom";

import {Account} from "@tonclient/appkit";
import {libWeb} from "@tonclient/lib-web";

import {signerKeys, TonClient, signerNone} from "@tonclient/core";

//contracts
// import {DeployerColectionContract} from "./collection contracts/nftour/src/build/DeployerColectionContract.js";
// import {NftRootContract} from "./collection contracts/nftour/src/build/NftRootContract.js";
// import {CollectionRoot} from "./collection contracts/nftour/src/build/NftRootContract.js";
// import {StorageContract} from "./collection contracts/nftour/src/build/StorageContract.js";
import {DEXRootContract} from "./test net contracts/DEXRoot.js";

import {DEXClientContract} from "./test net contracts/DEXClient.js";
import {Collections, InsertEmoticon} from "@material-ui/icons";

import {DataContract} from "./collection contracts/DataContract.js";
import {NFTMarketContract} from "./collection contracts/NftMarketContract.js";
import {NftRootColectionContract} from "./collection contracts/NftRootColectionContract.js";

TonClient.useBinaryLibrary(libWeb);

const axios = require("axios");

const config = require("./config.json");

const client = new TonClient({network: {endpoints: [config.DappServer]}});

const pidCrypt = require("pidcrypt");
require("pidcrypt/aes_cbc");
const aes = new pidCrypt.AES.CBC();

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

function base64ToHex(str) {
	const raw = atob(str);
	let result = "";
	for (let i = 0; i < raw.length; i++) {
		const hex = raw.charCodeAt(i).toString(16);
		result += hex.length === 2 ? hex : "0" + hex;
	}
	return result.toUpperCase();
}

function NftCollection() {
	let arr = JSON.parse(localStorage.getItem("collection"));

	const [collection, setCollection] = useState(arr);

	const [errorModal, setErrorModal] = useState({
		hidden: false,
		message: "",
	});

	const [avatar, setAvatar] = useState();

	let marketrootAddr = config.marketroot;

	const zeroAddress =
		"0:0000000000000000000000000000000000000000000000000000000000000000";

	async function deployCollection() {
		const pinataKey = "0a2ed9f679a6c395f311";
		const pinataSecretKey =
			"7b53c4d13eeaf7063ac5513d4c97c4f530ce7e660f0c147ab5d6aee6da9a08b9";
		let decrypted = aes.decryptText(sessionStorage.getItem("seedHash"), "5555");

		const acc = new Account(NFTMarketContract, {
			address: marketrootAddr,
			signer: signerNone(),
			client,
		});

		const clientAcc = new Account(DEXClientContract, {
			address: sessionStorage.getItem("address"),
			signer: signerKeys(await getClientKeys(decrypted)),
			client,
		});

		let deployData = JSON.parse(sessionStorage.getItem("details"));
		console.log(deployData);

		// save avatar to IPFS

		await fetch(avatar)
			.then((res) => res.blob())
			.then((blob) => {
				const file = new File([blob], "File name", {type: "image/png"});

				const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;

				let data = new FormData();

				data.append("file", file);

				return axios
					.post(url, data, {
						maxBodyLength: "Infinity",
						headers: {
							"Content-Type": `multipart/form-data; boundary=${data._boundary}`,
							pinata_api_key: pinataKey,
							pinata_secret_api_key: pinataSecretKey,
						},
					})
					.then(async function (response) {
						console.log(response.data.IpfsHash);
						//deploy Collection
						try {
							const {body} = await client.abi.encode_message_body({
								abi: {type: "Contract", value: NFTMarketContract.abi},
								signer: {type: "None"},
								is_internal: true,
								call_set: {
									function_name: "deployColection",
									input: {
										name: deployData.projectName,
										description: deployData.projectDescription,
										icon: response.data.IpfsHash,
									},
								},
							});

							const res = await clientAcc.run("sendTransaction", {
								dest: marketrootAddr,
								value: 1200000000,
								bounce: true,
								flags: 3,
								payload: body,
							});
							console.log(res);
						} catch (e) {
							console.log(e);
						}
					})
					.catch(function (error) {
						console.error(error);
					});
			});

		console.log(1);

		let idLastCol;

		try {
			const response = await acc.runLocal("getInfo", {});
			let value0 = response;
			idLastCol = response.decoded.output.countColections - 1;
			console.log("value0", value0);
		} catch (e) {
			console.log("catch E", e);
		}

		console.log(idLastCol);

		let nftRoot;

		try {
			const response = await acc.runLocal("resolveNftRoot", {
				addrOwner: sessionStorage.getItem("address"),
				id: idLastCol,
			});
			let value0 = response;
			nftRoot = response.decoded.output.addrNftRoot;
			console.log("value0", value0);
		} catch (e) {
			console.log("catch E", e);
		}

		console.log(nftRoot);

		const acc1 = new Account(NftRootColectionContract, {
			address: nftRoot,
			signer: signerNone(),
			client,
		});

		// save imgs to IPFS

		for (let i = 0; i < collection.length; i++) {
			const url = collection[i];
			await fetch(url)
				.then((res) => res.blob())
				.then((blob) => {
					const file = new File([blob], "File name", {type: "image/png"});

					const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;

					let data = new FormData();

					data.append("file", file);

					return axios
						.post(url, data, {
							maxBodyLength: "Infinity",
							headers: {
								"Content-Type": `multipart/form-data; boundary=${data._boundary}`,
								pinata_api_key: pinataKey,
								pinata_secret_api_key: pinataSecretKey,
							},
						})
						.then(async function (response) {
							console.log(response.data.IpfsHash);

							try {
								const {body} = await client.abi.encode_message_body({
									abi: {type: "Contract", value: NftRootColectionContract.abi},
									signer: {type: "None"},
									is_internal: true,
									call_set: {
										function_name: "deployMetadata",
										input: {
											wid: i,
											name: deployData.projectName,
											description: deployData.projectDescription,
											contentHash: 1,
											mimeType: "test",
											chunks: 1,
											chunkSize: 1,
											size: 1,
											meta: {
												height: 1,
												width: 1,
												duration: 1,
												extra: "test",
												json: response.data.IpfsHash,
											},
										},
									},
								});

								const res = await clientAcc.run("sendTransaction", {
									dest: nftRoot,
									value: 1200000000,
									bounce: true,
									flags: 3,
									payload: body,
								});
								console.log(res);
							} catch (e) {
								console.log(e);
							}
						})
						.catch(function (error) {
							console.error(error);
						});
				});
		}
	}

	function closeError() {
		console.log(1);
		setErrorModal({
			hidden: false,
			message: "",
		});
	}

	function test(event) {
		let file = event.target.files[0];

		if (event.target.files[0].size / 1024 / 1024 > 1) {
			setErrorModal({
				hidden: true,
				message: "Image is larger than 1MB",
			});
			return;
		}

		var image = new Image();
		image.src = URL.createObjectURL(file);
		image.onload = function () {
			setAvatar(image.src);
		};
	}

	return (
		<Router>
			<div className={errorModal.hidden === true ? "error-bg" : "hide"}></div>
			<div className={errorModal.hidden === true ? "App-error" : "App App2"}>
				<div className="header header2">
					<div className="container-header">
						<div className="acc-info">
							<div class="acc-info1">
								<a href="#/">
									<div class="name">NFTour</div>
								</a>
								{localStorage.address ? (
									<div class="wallet">
										<div className="acc-status">Connected:</div>
										<div className="acc-wallet">{localStorage.address}</div>
									</div>
								) : (
									""
								)}
							</div>

							<div class="pages">
								<a href="#/">
									<div class="page-element">Home</div>
								</a>
								<a href="#/load-nft">
									<div class="page-element active">NFT Generator</div>
								</a>
								<a href="#/collection-market">
									<div class="page-element">NFT Collection Market</div>
								</a>
								<div class="page-element">FAQ</div>
							</div>
						</div>
					</div>
				</div>

				<div class="collection">
					<div
						className={errorModal.hidden === true ? "error-modal-img" : "hide"}
					>
						<button className="close" onClick={closeError}>
							<span></span>
							<span></span>
						</button>
						<img src={errorModal.message}></img>
						{/* <div className="message">{errorModal.message}</div> */}
					</div>

					<div class="title">Your Collection</div>
					<div class="text">
						NFT art creator’s main goal is to invent, and using NFTour artists
					</div>

					<div class="button-1-square" onClick={deployCollection}>
						Deploy Collection
					</div>

					{/* <div class="button-3-square" onClick={savePinata}>Save As</div> */}

					<div class="nft-avatar">
						<input
							type="file"
							id="input_avatar"
							accept=".png,.jpg,.jpeg"
							onChange={test}
						/>

						<div class="nft-img">
							<img src={avatar} />
							<label for="input_avatar" class="input-avatar-btn">
								<span>1</span>
							</label>
						</div>

						<div class="title">Collection avatar</div>
					</div>

					<div class="nft-collection">
						{collection.map((item) => {
							return (
								<div
									class="nft-element"
									onClick={() =>
										setErrorModal({
											hidden: true,
											message: item,
										})
									}
								>
									<img src={item} />
								</div>
							);
						})}
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

export default NftCollection;
