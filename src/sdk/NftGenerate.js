import React, {useState} from "react";
import {HashRouter as Router} from "react-router-dom";
import mergeImages from "merge-images";

let nftArr = [];

function NftCustomization() {
	let arr = JSON.parse(localStorage.getItem("class"));

	const [classArr, setClassArr] = useState(arr);

	const [contrBg, setContrBg] = useState(false);

	const [collection, setCollection] = useState([]);

	let arrImg = [];
	for (let i = 0; i < arr.length; i++) {
		arrImg[i] = 0;
	}

	const [curentImg, setCurentImg] = useState(arrImg);

	let cur = localStorage.getItem("curentLayer");
	const [curentLayer, setCurentLayer] = useState(cur);

	const [testImg, setTestImg] = useState();

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

	function save() {
		nftArr.push(curentImg);

		let tempArr = [];
		for (let i = 0; i < curentImg.length; i++) {
			tempArr[i] = 0;
		}
		setCurentImg(tempArr);
	}

	function split() {
		let mergeArr = [];

		let indexArr = [];

		for (let i = 0; i < classArr.length; i++) {
			for (let j = 0; j < classArr[i].imgs.length; j++) {
				if (classArr[i].imgs[j] == classArr[i].imgs[curentImg[i]]) {
					mergeArr.push({
						src: classArr[i].imgs[j],
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
		}).then((b64) => tempCollection.push(b64));

		console.log(tempCollection);

		setCollection(tempCollection);
	}

	function logData() {
		localStorage.setItem("collection", JSON.stringify(collection));
	}

	return (
		<Router>
			<div class="constructors">
				<div className="modal-constructor constructor-position show">
					<div class="nft-img">
						<div
							className={contrBg ? "img img-contrast" : "img"}
							style={{
								width: localStorage.getItem("width") + "px",
								height: localStorage.getItem("height") + "px",
							}}
						>
							{classArr.map((item, index) => {
								return (
									<img
										src={item.imgs[curentImg[index]]}
										style={{
											left: item.x + "px",
											top: item.y + "px",
											"z-index": item.z_index,
										}}
									/>
								);
							})}

							<img src={testImg} />
						</div>
						<button onClick={contrastBg}>Contrast bg</button>
						<div class="buttons">
							<button class="btn-standart">Randomize</button>
							<button class="btn-standart" onClick={split}>
								Save
							</button>
							{/* <button class="btn-standart" onClick={split}>Split</button> */}
						</div>
					</div>
					<div class="nft-position">
						<div class="menu-position">
							{classArr.map((item, index) => {
								return (
									<div
										className={
											item.active
												? "menu-element menu-element-active"
												: "menu-element"
										}
										onClick={() => setActive(item)}
									>
										{item.name}
									</div>
								);
							})}
						</div>
						<div class="position pos-img">
							{/* <div class="position-img position-img-active">
                                <div class="img"></div>
                                <div class="break"></div>
                                <div class="name">img 1</div>
                            </div>
                            <div class="position-img">
                                <div class="img"></div>
                                <div class="break"></div>
                                <div class="name">img 2</div>
                            </div>
                            <div class="position-img">
                                <div class="img"></div>
                                <div class="break"></div>
                                <div class="name">img 3</div>
                            </div>
                            <div class="position-img">
                                <div class="img"></div>
                                <div class="break"></div>
                                <div class="name">img 4</div>
                            </div> */}

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
										<div class="img">
											<img src={item} />
										</div>
										<div class="break"></div>
										<div class="name">
											{classArr[curentLayer].name} {index + 1}
										</div>
									</div>
								);
							})}
						</div>
					</div>
				</div>

				<div class="break"></div>
				<a href="#/nft-collection">
					<div class="next" onClick={logData}>
						Next
					</div>
				</a>
			</div>
		</Router>
	);
}

export default NftCustomization;
