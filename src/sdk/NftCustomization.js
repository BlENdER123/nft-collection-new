import React, {useState} from "react";
import {HashRouter as Router} from "react-router-dom";

function NftCustomization() {
	let arr = JSON.parse(localStorage.getItem("class"));

	const [classArr, setClassArr] = useState(arr);

	const [contrBg, setContrBg] = useState(false);

	let cur = localStorage.getItem("curentLayer");
	const [curentLayer, setCurentLayer] = useState(cur);

	console.log(arr);

	function test() {
		//let array = JSON.parse(localStorage.getItem("class"));
		//console.log(array);
		console.log(classArr);
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

	function setX(item, event) {
		let tempArr = [];

		for (let i = 0; i < classArr.length; i++) {
			let temp = classArr[i];
			if (temp == item) {
				temp.x = event.target.value;
				tempArr.push(temp);
			} else {
				tempArr.push(temp);
			}
		}
		setClassArr(tempArr);
	}

	function setY(item, event) {
		let tempArr = [];

		for (let i = 0; i < classArr.length; i++) {
			let temp = classArr[i];
			if (temp == item) {
				temp.y = event.target.value;
				tempArr.push(temp);
			} else {
				tempArr.push(temp);
			}
		}
		setClassArr(tempArr);
	}

	function setZ(item, event) {
		let tempArr = [];

		for (let i = 0; i < classArr.length; i++) {
			let temp = classArr[i];
			if (temp == item) {
				temp.z_index = event.target.value;
				tempArr.push(temp);
			} else {
				tempArr.push(temp);
			}
		}
		setClassArr(tempArr);
	}

	function logData() {
		console.log("-----------");
		console.log(classArr);
		localStorage.setItem("class", JSON.stringify(classArr));
		localStorage.setItem("curentLayer", curentLayer);
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
										src={item.imgs[0]}
										style={{
											left: item.x + "px",
											top: item.y + "px",
											"z-index": item.z_index,
										}}
									/>
								);
							})}
						</div>
						<button onClick={contrastBg}>Contrast bg</button>
					</div>
					<div class="nft-position">
						<div class="menu-position">
							{/* <div class="menu-element menu-element-active">
                                background
                            </div>
                            <div class="menu-element">
                                head
                            </div> */}

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

							{/* <button onClick={test}>cl</button> */}
						</div>

						{classArr.map((item, index) => {
							return (
								<div className={item.active ? "position" : "hide"}>
									<div class="position-input">
										<div class="title">Position</div>
										<div class="inputs">
											x{" "}
											<input
												type="text"
												onChange={(event) => setX(item, event)}
											/>
											y{" "}
											<input
												type="text"
												onChange={(event) => setY(item, event)}
											/>
										</div>
									</div>
									<div class="position-input">
										<div class="title">Z-index</div>
										<div class="inputs">
											<input
												type="text"
												onChange={(event) => setZ(item, event)}
											/>
										</div>
									</div>
								</div>
							);
						})}
						{/* <div class="position-input">
                                <div class="title">Position</div>
                                <div class="inputs">
                                    x <input type="text"/>
                                    y <input type="text"/>
                                </div>
                            </div>
                            <div class="position-input">
                                <div class="title">Z-index</div>
                                <div class="inputs">
                                    <input type="text"/>
                                    
                                </div>
                            </div> */}
					</div>
				</div>

				<div class="break"></div>
				<a href="#/nft-generate">
					<div class="next" onClick={logData}>
						Next
					</div>
				</a>
			</div>
		</Router>
	);
}

export default NftCustomization;
