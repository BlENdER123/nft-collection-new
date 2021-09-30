import React from "react";
import {useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {connectWallet, setCurExt, showPopup} from "../../store/actions/app";
import {getCurrentExtension} from "../../extensions/extensions/checkExtensions";
import extratonIcon from "../../extensions/extratonIcon.png";
import broxusIcon from "../../extensions/broxusIcon.png";
import MainBlock from "../MainBlock/MainBlock";
import "./ExtensionsList.scss";

import EnterSeedPhrase from "../EnterSeedPhrase/EnterSeedPhrase";
import {
	showEnterSeedPhrase,
	showEnterSeedPhraseRegister,
} from "../../store/actions/enterSeedPhrase";

function extensionIcon(name) {
	switch (name) {
		case "mnemonic":
			return extratonIcon;

		case "extraton":
			return extratonIcon;
		case "broxus":
			return broxusIcon;
		default:
			break;
	}
}

function ExtensionsList() {
	const history = useHistory();
	const dispatch = useDispatch();
	// const [extensionsList,setExtensionsList] = useState([])
	const extensionsList = useSelector(
		(state) => state.appReducer.extensionsList,
	);
	const enterSeedPhraseIsVisible = useSelector(
		(state) => state.enterSeedPhrase.enterSeedPhraseIsVisible,
	);

	// useEffect(async ()=>{
	//   try {
	//     await checkExtensions().then(res=>
	//         setExtensionsList(res)
	//     )
	//   }catch(e){
	//     return e
	//   }
	// },[])
	function handleClick(name) {
		// let checkEX = await checkExtensions()
		//  console.log("checkEX",checkEX)
		extensionsList.forEach(async (i) => {
			if (i.name === name) {
				if (i.available) {
					let curExt = await getCurrentExtension(name);

					dispatch(setCurExt(curExt));
					dispatch(connectWallet());
				} else {
					dispatch(
						showPopup({type: "extension", message: i.name, link: i.link}),
					);
				}
			}
		});
	}

	return (
		// !extensionsList.length ?
		//   <Loader /> :
		<MainBlock
			//TODO: Пересмотреть строчку ниже.
			title={"Login or Sign Up"}
			classTitle={"fixFontSize"}
			button={
				<svg
					onClick={() => history.goBack()}
					className="close"
					width="26"
					height="26"
					viewBox="0 0 26 26"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						opacity="0.6"
						d="M21.7676 25.272L13 16.507L4.23239 25.272C4.00265 25.5027 3.7296 25.6858 3.42891 25.8108C3.12822 25.9357 2.80582 26 2.48021 26C2.15459 26 1.83219 25.9357 1.5315 25.8108C1.23081 25.6858 0.957759 25.5027 0.728021 25.272C0.497277 25.0422 0.314182 24.7692 0.189248 24.4685C0.0643133 24.1678 0 23.8454 0 23.5198C0 23.1942 0.0643133 22.8718 0.189248 22.5711C0.314182 22.2704 0.497277 21.9973 0.728021 21.7676L9.49296 13L0.728021 4.23239C0.497277 4.00265 0.314182 3.7296 0.189248 3.42891C0.0643133 3.12822 0 2.80582 0 2.48021C0 2.15459 0.0643133 1.83219 0.189248 1.5315C0.314182 1.23081 0.497277 0.957759 0.728021 0.728021C0.957759 0.497277 1.23081 0.314182 1.5315 0.189248C1.83219 0.0643133 2.15459 0 2.48021 0C2.80582 0 3.12822 0.0643133 3.42891 0.189248C3.7296 0.314182 4.00265 0.497277 4.23239 0.728021L13 9.49296L21.7676 0.728021C21.9973 0.497277 22.2704 0.314182 22.5711 0.189248C22.8718 0.0643133 23.1942 0 23.5198 0C23.8454 0 24.1678 0.0643133 24.4685 0.189248C24.7692 0.314182 25.0422 0.497277 25.272 0.728021C25.5027 0.957759 25.6858 1.23081 25.8108 1.5315C25.9357 1.83219 26 2.15459 26 2.48021C26 2.80582 25.9357 3.12822 25.8108 3.42891C25.6858 3.7296 25.5027 4.00265 25.272 4.23239L16.507 13L25.272 21.7676C25.5027 21.9973 25.6858 22.2704 25.8108 22.5711C25.9357 22.8718 26 23.1942 26 23.5198C26 23.8454 25.9357 24.1678 25.8108 24.4685C25.6858 24.7692 25.5027 25.0422 25.272 25.272C25.0422 25.5027 24.7692 25.6858 24.4685 25.8108C24.1678 25.9357 23.8454 26 23.5198 26C23.1942 26 22.8718 25.9357 22.5711 25.8108C22.2704 25.6858 21.9973 25.5027 21.7676 25.272Z"
						fill="white"
					/>
				</svg>
			}
			content={
				<>
					{/*// <div className="extensions-list">*/}
					{/*//   {extensionsList.map(item => (*/}
					{/*//     <div className="extensions-list-item" onClick={() => handleClick(item.name)} key={item.name}>*/}
					{/*//       <img src={extensionIcon(item.name)} alt={item.name} />*/}
					{/*//       <span>{item.name}</span>*/}
					{/*//     </div>*/}
					{/*//   ))}*/}
					{/*// </div>*/}

					<div className="extensions-list">
						<div
							className="extensions-list-item"
							onClick={() => handleClick("mnemonic")}
						>
							<div
								style={{
									display: "flex",
									width: "100%",
									flexDirection: "column",
									justifyContent: "center",
									alignItems: "center",
								}}
							>
								<button
									style={{
										fontSize: "16px",
										width: "100%",
										marginBottom: "40px",
									}}
									className="btn wallet-btn"
									onClick={() => dispatch(showEnterSeedPhrase(true))}
								>
									Login using Seed Phrase
								</button>
								<button
									style={{fontSize: "16px", width: "100%"}}
									className="btn wallet-btn"
									onClick={() => dispatch(showEnterSeedPhraseRegister())}
								>
									Create a new Seed Phrase and Wallet
								</button>
								{enterSeedPhraseIsVisible === true && <EnterSeedPhrase />}
							</div>
						</div>
					</div>
				</>
			}
		/>
	);
}

export default ExtensionsList;
