import React, {useState} from "react";
import {HashRouter as Router, Redirect, useHistory} from "react-router-dom";
import mergeImages from "merge-images";

import Header from "./Header";
import Footer from "./Footer";

import {useDispatch, useSelector} from "react-redux";

const axios = require("axios");
//const fs = require('fs');
const FormData = require("form-data");

const pinataKey = "0a2ed9f679a6c395f311";
const pinataSecretKey =
	"7b53c4d13eeaf7063ac5513d4c97c4f530ce7e660f0c147ab5d6aee6da9a08b9";

let nftArr = [];

function NftCustomization() {
	let history = useHistory();

	const dispatch = useDispatch();
	const connectWallet = useSelector((state) => state.connectWallet);

	let arr = JSON.parse(localStorage.getItem("class"));

	const [classArr, setClassArr] = useState(arr);

	const [contrBg, setContrBg] = useState(false);

	const [collection, setCollection] = useState([]);
	const [collectionName, setCollectionName] = useState([]);

	const [alert, setAlert] = useState({
		hidden: false,
		message: "",
	});

	const [randomNft, setRandomNft] = useState();

	let arrImg = [];
	for (let i = 0; i < arr.length; i++) {
		arrImg[i] = 0;
	}

	const [curentImg, setCurentImg] = useState(arrImg);

	let cur = localStorage.getItem("curentLayer");
	const [curentLayer, setCurentLayer] = useState(cur);

	const [testImg, setTestImg] = useState();

	const [redirect, setRedirect] = useState(false);

	const [errorModal, setErrorModal] = useState({
		hidden: false,
		message: "",
	});

	const [nftCombinations, setNftCombinations] = useState([]);

	const [uniqComb, setUniqComb] = useState(0);
	const [failComb, setFailComb] = useState(0);

	const [colPrice, setColPrice] = useState();
	const [royalty, setRoyalty] = useState();

	let comb = 1;
	for (let i = 0; i < classArr.length; i++) {
		comb = comb * classArr[i].imgs.length;
	}

	function copySrc() {
		const asyncFunction = async function () {
			return await getResizeMany();
		};
		asyncFunction().then((res) => {
			let tempArr = [];
			console.log(res);
			for (let i = 0; i < classArr.length; i++) {
				let temp = classArr[i];
				temp.src = res[i];
				tempArr.push(temp);
			}
			console.log(tempArr);
			setClassArr(tempArr);
		});
	}

	async function getResizeMany() {
		let tempArr = [];
		for (let i = 0; i < classArr.length; i++) {
			let tempArrImg = [];
			for (let j = 0; j < classArr[i].imgs.length; j++) {
				let res = await getResize(
					classArr[i].imgs[j],
					classArr[i].width,
					classArr[i].height,
				);
				tempArrImg.push(res);
			}
			tempArr.push(tempArrImg);
		}

		console.log(tempArr);
		return tempArr;
	}

	function getResize(img, width, height) {
		return new Promise((resolve, reject) => {
			var image = new Image();
			image.src = getSrc(img);
			console.log(getSrc(img));

			var canvas = document.createElement("canvas");
			canvas.width = width;
			canvas.height = height;

			var ctx = canvas.getContext("2d");
			// ctx.drawImage(image, 0, 0, width, height);

			// console.log(canvas);

			image.setAttribute("crossorigin", "anonymous");

			image.onload = function () {
				ctx.drawImage(image, 0, 0, width, height);
				resolve(canvas.toDataURL("image/png"));
			};

			//console.log(canvas.toDataURL("image/png"));

			// var dataURL = canvas.toDataURL("image/png");
			// console.log(dataURL);
			// return dataURL;
		});
	}

	function setActive(item) {
		let tempArr = [];
		for (let i = 0; i < classArr.length; i++) {
			let temp = classArr[i];
			if (temp == item) {
				//console.log(1);
				temp.active = true;
				tempArr.push(temp);
				setCurentLayer(i);
			} else {
				temp.active = false;
				tempArr.push(temp);
			}
		}
		setClassArr(tempArr);
	}

	function contrastBg() {
		if (contrBg) {
			setContrBg(false);
		} else {
			setContrBg(true);
		}
	}

	function setImg(index) {
		let temp = curentImg;

		temp[curentLayer] = index;

		setCurentImg(temp);

		let tempArr = [];
		for (let i = 0; i < classArr.length; i++) {
			tempArr.push(classArr[i]);
		}
		setClassArr(tempArr);
	}

	// function save() {

	// 	nftArr.push(curentImg);

	// 	let tempArr = [];
	// 	for (let i = 0; i < curentImg.length; i++) {
	// 		tempArr[i] = 0;
	// 	}
	// 	setCurentImg(tempArr);
	// }

	function split() {
		let tempCurentImg = curentImg.join();
		for (let i = 0; i < nftCombinations.length; i++) {
			if (tempCurentImg == nftCombinations[i]) {
				setErrorModal({
					hidden: true,
					message: "Each nft must be unique",
				});
				return;
			}
		}
		let tempNftCombinations = nftCombinations;
		tempNftCombinations.push(tempCurentImg);
		console.log(curentImg);

		alertM("Saved!");
		let mergeArr = [];

		let indexArr = [];

		for (let i = 0; i < classArr.length; i++) {
			for (let j = 0; j < classArr[i].imgs.length; j++) {
				if (classArr[i].imgs[j] == classArr[i].imgs[curentImg[i]]) {
					mergeArr.push({
						src: classArr[i].src[j],
						x: classArr[i].x,
						y: classArr[i].y,
					});
					indexArr.push(classArr[i].z_index);
				}
			}
		}

		for (let i = 0; i < indexArr.length; i++) {
			for (let j = 0; j < indexArr.length; j++) {
				if (indexArr[j] > indexArr[j + 1]) {
					let temp = indexArr[j];
					let temp1 = mergeArr[j];
					indexArr[j] = indexArr[j + 1];
					mergeArr[j] = mergeArr[j + 1];
					indexArr[j + 1] = temp;
					mergeArr[j + 1] = temp1;
				}
			}
		}

		console.log(indexArr);
		console.log(mergeArr);

		let tempCollection = [];
		for (let i = 0; i < collection.length; i++) {
			tempCollection[i] = collection[i];
		}

		mergeImages(mergeArr, {
			width: localStorage.getItem("width"),
			height: localStorage.getItem("height"),
		}).then((b64) => {
			tempCollection.push(b64);
		});

		console.log(tempCollection);

		setCollection(tempCollection);

		let tempName = collectionName;
		tempName.push(undefined);
		setCollectionName(tempName);
	}

	function getSrc(src) {
		return "https://gateway.pinata.cloud/ipfs/" + src;
	}

	function random() {
		let temp = [];

		for (let i = 0; i < classArr.length; i++) {
			let length = classArr[i].imgs.length;
			temp.push(Math.round(Math.random() * (length - 1 - 0) + 0));
		}

		setCurentImg(temp);
	}

	function randomMany() {
		let imgsLength = [];
		let combinations = 1;
		for (let i = 0; i < classArr.length; i++) {
			imgsLength.push(classArr[i].imgs.length);
		}
		for (let i = 0; i < imgsLength.length; i++) {
			combinations = combinations * imgsLength[i];
		}
		if (randomNft > combinations - nftCombinations.length) {
			setErrorModal({
				hidden: true,
				message:
					"The number of allowed combinations of nft is less than specify",
			});
			return;
		}
		if (randomNft <= 0) {
			setErrorModal({
				hidden: true,
				message: "Specify a positive number",
			});
			return;
		}
		let nftlength = [];
		let newnft = [];

		for (let i = 0; i < classArr.length; i++) {
			nftlength.push(classArr[i].imgs.length);
			newnft.push(0);
		}

		let uniqC = 0;
		let uniqFor = [];

		let nftRarityCombinations = [];
		console.log(classArr);
		for (let i = 0; i < classArr.length; i++) {
			let temp = [];
			for (let j = 0; j < classArr[i].rarity.length; j++) {
				for (let k = 0; k < Number(classArr[i].rarity[j]) + 1; k++) {
					temp.push(j);
				}
			}
			nftRarityCombinations.push(temp);
		}

		console.log(nftRarityCombinations);

		while (uniqC < randomNft) {
			for (let i = 0; i < classArr.length; i++) {
				newnft[i] =
					nftRarityCombinations[i][
						Math.round(
							Math.random() * (nftRarityCombinations[i].length - 1 - 0) + 0,
						)
					];
			}

			// for(let i = 0; i < nftlength.length; i++) {
			// 	newnft[i] = Math.round(Math.random() * (nftlength[i]-1 - 0) + 0);
			// }
			let uniq = true;
			for (let i = 0; i < nftCombinations.length; i++) {
				if (newnft.join() == nftCombinations[i]) {
					console.log("povtor", newnft.join(), nftCombinations[i]);
					uniq = false;
					setFailComb(failComb + 1);
					break;
				}
			}
			for (let i = 0; i < uniqFor.length; i++) {
				if (newnft.join() == uniqFor[i]) {
					console.log(uniqFor);
					console.log("povtor", newnft.join(), uniqFor[i]);
					uniq = false;
					setFailComb(failComb + 1);
					break;
				}
			}
			if (uniq) {
				console.log("uniq");
				uniqC++;
				uniqFor.push(newnft.join());
				console.log(uniqFor);
				console.log(newnft.join());
			}
		}
		setUniqComb(uniqC);
		console.log(uniqFor);

		let tempNftCombinations = nftCombinations;
		for (let i = 0; i < uniqFor.length; i++) {
			tempNftCombinations.push(uniqFor[i]);
		}
		setNftCombinations(tempNftCombinations);
		//tempNftCombinations.push(tempCurentImg);

		let tempCollection = [];

		for (let i = 0; i < collection.length; i++) {
			tempCollection[i] = collection[i];
		}

		//console.log(uniqFor);
		for (let i = 0; i < uniqFor.length; i++) {
			let tempCur = uniqFor[i].split(",");
			//console.log(tempCur);
			//alertM("Saved!");
			let mergeArr = [];

			let indexArr = [];

			for (let i = 0; i < classArr.length; i++) {
				for (let j = 0; j < classArr[i].imgs.length; j++) {
					if (classArr[i].imgs[j] == classArr[i].imgs[tempCur[i]]) {
						mergeArr.push({
							src: classArr[i].src[j],
							x: classArr[i].x,
							y: classArr[i].y,
						});
						indexArr.push(classArr[i].z_index);
					}
				}
			}

			for (let i = 0; i < indexArr.length; i++) {
				for (let j = 0; j < indexArr.length; j++) {
					if (indexArr[j] > indexArr[j + 1]) {
						let temp = indexArr[j];
						let temp1 = mergeArr[j];
						indexArr[j] = indexArr[j + 1];
						mergeArr[j] = mergeArr[j + 1];
						indexArr[j + 1] = temp;
						mergeArr[j + 1] = temp1;
					}
				}
			}

			console.log(indexArr);
			console.log(mergeArr);

			mergeImages(mergeArr, {
				width: localStorage.getItem("width"),
				height: localStorage.getItem("height"),
			}).then((b64) => tempCollection.push(b64));
		}

		setCollection(tempCollection);

		console.log(tempCollection);

		alertM("Generated " + uniqC + " uniq NFT");
	}

	function alertM(text) {
		setAlert({
			hidden: true,
			message: text,
		});

		setTimeout(function () {
			setAlert({
				hidden: false,
				message: text,
			});
		}, 1000);
	}

	function closeError() {
		setErrorModal({
			hidden: false,
			message: "",
		});
	}

	function changeNameCol(index, value) {
		console.log(index, value);

		let tempName = collectionName;

		tempName[index] = value;

		setCollectionName(tempName);
		console.log(tempName);
	}

	function logData() {
		console.log(collection);

		if (collection[0] === "" || collection[0] === undefined) {
			console.log("Save at least one NFT");
			setErrorModal({
				hidden: true,
				message: "Save at least one NFT",
			});
			return;
		}

		if (colPrice === "" || colPrice === undefined || colPrice < 1) {
			console.log("Set collection price");
			setErrorModal({
				hidden: true,
				message: "Set collection price",
			});
			return;
		}

		if (royalty === "" || royalty === undefined) {
			console.log("Set collection royalty");
			setErrorModal({
				hidden: true,
				message: "Set collection royalty",
			});
			return;
		}

		console.log(collectionName);

		for (let i = 0; i < collectionName.length; i++) {
			if (collectionName[i] == "" || collectionName[i] == undefined) {
				console.log("Set a name for each nft");
				setErrorModal({
					hidden: true,
					message: "Set a name for each nft",
				});
				return;
			}
		}

		sessionStorage.setItem("colPrice", colPrice);
		sessionStorage.setItem("royalty", royalty);
		sessionStorage.setItem("collection", JSON.stringify(collection));
		sessionStorage.setItem("collectionName", JSON.stringify(collectionName));

		// setRedirect(true);
		history.push("/nft-collection");
	}

	function close() {
		dispatch({type: "closeConnect"});
		console.log(connectWallet);
	}

	return (
		<Router>
			<div className={alert.hidden ? "alert-win" : "alert-win invisible"}>
				{alert.message}
			</div>

			<div
				className={
					errorModal.hidden === true || connectWallet ? "error-bg" : "hide"
				}
			>
				<span onClick={close}></span>
			</div>
			<div
				className={
					errorModal.hidden === true || connectWallet ? "App-error" : "App App2"
				}
			>
				<Header activeCat={1}></Header>

				<div class="constructors">
					<div class="container-header">
						<div
							className={errorModal.hidden === true ? "error-modal" : "hide"}
						>
							<button className="close" onClick={closeError}>
								<span></span>
								<span></span>
							</button>
							<div className="message">{errorModal.message}</div>
						</div>

						<div class="modal-constructor modal-constructor-layers ">
							<div class="title">Layers</div>
							<div class="text">Select and edit the layer</div>
							{classArr.map((item, index) => {
								return (
									<div
										className={
											item.active
												? "layers-list_layer layers-list_layer-active"
												: "layers-list_layer"
										}
										onClick={() => setActive(item)}
									>
										<div class="index">{index + 1}. </div>
										<span>{item.name}</span>
									</div>
								);
							})}

							<div class="title" style={{margin: "30px 0px 0px 0px"}}>
								Settings
							</div>
							<div class="text">NFT Settings</div>

							<div class="button-1-square" onClick={random}>
								Randomize
							</div>
							<div class="randomize-many">
								<input
									type="number"
									onChange={(event) => setRandomNft(event.target.value)}
								/>
								<button class="button-1-square" onClick={randomMany}>
									Randomize Many
								</button>
							</div>
							<div class="button-3-square" onClick={split}>
								Save
							</div>
						</div>

						<div class="modal-constructor modal-constructor-position">
							<div class="nft-img">
								<div
									className={contrBg ? "img img-contrast" : "img"}
									style={{
										width: localStorage.getItem("width") + "px",
										height: localStorage.getItem("height") + "px",
									}}
								>
									{classArr[0].src?.length > 0
										? classArr.map((item, index) => {
												return (
													<img
														src={item.src[curentImg[index]]}
														style={{
															left: item.x + "px",
															top: item.y + "px",
															"z-index": item.z_index,
														}}
													/>
												);
										  })
										: copySrc()}
								</div>
								<div class="break"></div>
								<div
									class="button-1-square"
									style={{width: localStorage.getItem("width") + "px"}}
									onClick={logData}
								>
									Create Collection
								</div>
							</div>
						</div>

						<div class="modal-constructor modal-constructor-elements">
							<div class="title">Elements</div>
							<div class="text">Edit element position & properties</div>

							<div class="elements">
								{classArr[curentLayer].imgs.map((item, index) => {
									return (
										<div
											className={
												curentImg[curentLayer] == index
													? "position-img position-img-active"
													: "position-img"
											}
											onClick={() => setImg(index)}
										>
											<img src={getSrc(item)} />
										</div>
									);
								})}
							</div>

							<div class="title">How to use?</div>
							<div class="text text-nonline">
								Phasellus condimentum suscipit metus vel mattis. Ut vulputate
								tincidunt odio. Nam odio augue, molestie id rutrum et, cursus id
								libero. Quisque nulla dolor, condimentum quis posuere et, mattis
								quis sapien. Donec mollis.{" "}
							</div>

							<div style={{margin: "20px 0px 0px 0px"}} class="title">
								Price Settings
							</div>
							<div class="text">Set a price for your collection</div>
							<div class="price">
								<div class="title">Collection Price</div>
								<input
									placeholder="100.0000"
									type="number"
									onChange={(event) => setColPrice(event.target.value)}
								/>
							</div>
							<div class="royalty">
								<div class="title">Royalty ({royalty ? royalty : "0"}%)</div>
								<input
									type="range"
									min="1"
									max="40"
									step="1"
									onChange={(event) => setRoyalty(event.target.value)}
								/>
								<div class="procent">
									<span>1%</span>
									<span>40%</span>
								</div>
							</div>
						</div>
					</div>
					{redirect ? <Redirect to="/nft-collection" /> : ""}
				</div>

				<div class="collection-preview">
					<div class="title">Preview Collection</div>
					{collection.length == 0 ? (
						<div>Null</div>
					) : (
						collection.map((item, index) => {
							return (
								<div class="preview-item">
									<img src={item} />
									<div className="title">Name:</div>
									<input
										onChange={(ev) => changeNameCol(index, ev.target.value)}
									/>
								</div>
							);
						})
					)}
				</div>

				<Footer></Footer>
			</div>
		</Router>
	);
}

export default NftCustomization;
