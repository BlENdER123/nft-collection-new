import React, {useContext, useState} from "react";
import {HashRouter as Router, Redirect} from "react-router-dom";
import Context from "./Context";

class MyClass {
	constructor(name, active, imgs, x, y, z_index, width, height) {
		this.name = name;
		this.active = active;
		this.imgs = imgs;
		this.x = x;
		this.y = y;
		this.z_index = z_index;
		this.width = width;
		this.height = height;
	}

	logName() {
		console.log(this.name);
	}
}

function LoadNftPage() {
	//const {status} = useContext(Context);

	const [classArr1, setClassArr1] = useState([
		new MyClass("background", true, [], 0, 0, 0, 0, 0),
	]);

	const [newLayer, setNewLayer] = useState();

	const [curentLayer, setCurenLayer] = useState(0);

	const [width, setWidth] = useState();
	const [height, setHeight] = useState();

	const [src, setSrc] = useState();

	const [errorModal, setErrorModal] = useState({
		hidden: false,
		message: "",
	});

	const [redirect, setRedirect] = useState(false);

	function newClass(name, active, imgsL, x, y, z) {
		console.log(classArr1);
		let temp = new MyClass(name, active, imgsL, x, y, z);

		let tempArr = Object.values(classArr1);
		tempArr.push(temp);

		//console.log(tempArr);

		setClassArr1(tempArr);

		// classArr.push(temp);
		// setClassArr1(classArr);
		console.log(classArr1);
		//temp.logName();
	}

	function setActive(item) {
		console.log(classArr1[curentLayer].imgs);

		let tempArr = [];
		for (let i = 0; i < classArr1.length; i++) {
			let temp = classArr1[i];
			if (temp == item) {
				//console.log(1);
				temp.active = true;
				tempArr.push(temp);
				setCurenLayer(i);
			} else {
				temp.active = false;
				tempArr.push(temp);
			}
		}
		// console.log(tempArr);
		// console.log(curentLayer);
		setClassArr1(tempArr);
	}

	function deleteLayer(item) {
		let tempArr1 = [];

		for (let i = 0; i < classArr1.length; i++) {
			let temp = classArr1[i];
			if (temp == item) {
			} else {
				tempArr1.push(temp);
			}
		}

		if (item.active == classArr1[curentLayer].active) {
			setCurenLayer(0);
		}

		console.log(tempArr1);

		if (classArr1.length == 1) {
			console.log(111);
			let temp = new MyClass("no name", false, [], 0, 0, 0);
			setClassArr1([temp]);
		} else {
			setClassArr1(tempArr1);
		}
	}

	function download(event) {
		let file = event.target.files[0];

		var image = new Image();
		image.src = URL.createObjectURL(file);
		image.onload = function () {
			//console.log(image.width);

			setSrc(URL.createObjectURL(file));

			let tempArr = [];
			for (let i = 0; i < classArr1.length; i++) {
				let temp = classArr1[i];
				if (classArr1[curentLayer].name == classArr1[i].name) {
					if (temp.imgs[0] == undefined) {
						temp.imgs = [];
						temp.imgs.push(URL.createObjectURL(file));
						temp.width = image.width;
						temp.height = image.height;
					} else {
						if (temp.height == image.height && temp.width == image.width) {
							temp.imgs.push(URL.createObjectURL(file));
						} else {
							setErrorModal({
								hidden: true,
								message: "Your images are different sizes",
							});
						}
					}
				}
				tempArr.push(temp);
			}
			console.log(tempArr);
			setClassArr1(tempArr);
		};
	}

	function setNewLayerName(event) {
		let tempVal = event.target.value;

		let tempArr = [];
		for (let i = 0; i < classArr1.length; i++) {
			let temp = classArr1[i];
			if (classArr1[curentLayer].name == classArr1[i].name) {
				temp.name = tempVal;
			}
			tempArr.push(temp);
		}
		setClassArr1(tempArr);
	}

	function logData() {
		console.log("-----------");

		for (let i = 0; i < classArr1.length; i++) {
			if (classArr1[i].height > height || classArr1[i].width > width) {
				setErrorModal({
					hidden: true,
					message: "The selected size are smaller than your images",
				});
				return;
			}
		}
		setRedirect(true);
		console.log(classArr1);
		localStorage.setItem("class", JSON.stringify(classArr1));
		localStorage.setItem("width", width);
		localStorage.setItem("height", height);
		localStorage.setItem("curentLayer", curentLayer);
	}

	function closeError() {
		setErrorModal({
			hidden: false,
			message: "",
		});
	}

	return (
		<Router>
			<div class="constructors">
				<div className={errorModal.hidden === true ? "error-modal" : "hide"}>
					<button className="close" onClick={closeError}>
						<span></span>
						<span></span>
					</button>
					<div className="message">{errorModal.message}</div>
				</div>

				<div className="modal-constructor show">
					<div class="title">Layers</div>

					{classArr1.map((item, index) => {
						return (
							<div
								className={
									item.active
										? "layers-list_layer layers-list_layer-active"
										: "layers-list_layer"
								}
							>
								<span onClick={() => setActive(item)}>{item.name}</span>
								<div class="info">
									<div class="index">{index + 1}</div>
									<div class="delete" onClick={() => deleteLayer(item)}>
										<span></span>
										<span></span>
									</div>
								</div>
							</div>
						);
					})}

					<div class="layers-list_layer layers-list_layer-input">
						<input
							type="text"
							onChange={(ev) => {
								setNewLayer(ev.target.value);
							}}
						/>
						<button
							class="add"
							onClick={() => newClass(newLayer, false, [], 0, 0, 0, 0, 0)}
						>
							<span></span>
							<span></span>
						</button>
					</div>
				</div>
				<div class="modal-constructor">
					<div class="title">
						Layer:
						{classArr1[curentLayer].name
							? classArr1[curentLayer].name
							: "undefined"}
					</div>
					<div class="imgs-list">
						{classArr1[curentLayer].imgs.map((item, index) => {
							return (
								<div class="img-element">
									<div class="img">
										<img src={item}></img>
									</div>
									<div class="break"></div>
									<div class="name">
										{index + 1} {classArr1[curentLayer].name}
									</div>
								</div>
							);
						})}
					</div>
					<div class="drop-img">
						<input type="file" onChange={download} />
						{/* <input className="text" type="file" onChange={(ev) => download(ev.target)}/> */}
						{/* Click or drop images here!
							(image/png, image/gif, video/mp4, Max size: 10MB) */}
						{/* </input> */}
						{/* <button type="button" onClick={logImgs}>Log imgs</button> */}
					</div>
				</div>

				<div class="modal-constructor">
					<div class="project-settings">
						<div class="setting">
							<div class="title-settings">Project Name</div>
							<input type="text" class="input-settings" />
						</div>
						<div class="setting">
							<div class="title-settings">Project Description</div>
							<input type="text" class="input-settings" />
						</div>
						<div class="setting">
							<div class="title-settings">Size</div>
							Width{" "}
							<input
								type="text"
								class="input-settings"
								onChange={(event) => setWidth(event.target.value)}
							/>
							Height{" "}
							<input
								type="text"
								class="input-settings"
								onChange={(event) => setHeight(event.target.value)}
							/>
						</div>
						<div class="setting">
							<div class="title-settings">Layer Name</div>
							<input
								type="text"
								class="input-settings"
								placeholder={classArr1[curentLayer].name}
								onChange={setNewLayerName}
							/>
						</div>
					</div>
				</div>
				<div class="break"></div>
				{/* <a href="#/nft-customization"><div class="next" onClick={logData}>Next</div></a> */}
				<div class="next" onClick={logData}>
					Next
				</div>
				{redirect ? <Redirect to="/nft-customization" /> : ""}
			</div>
		</Router>
	);
}

export default LoadNftPage;
