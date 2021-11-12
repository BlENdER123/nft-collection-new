import React, {useEffect, useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import {
	HashRouter as Router,
	Switch,
	Route,
	Redirect,
	useLocation,
	useHistory,
} from "react-router-dom";
import {changeTheme, hideTip, showPopup} from "./store/actions/app";
import {
	setAssetsFromGraphQL,
	setLiquidityList,
	setPairsList,
	setSubscribeReceiveTokens,
	setTokenList,
	setTransactionsList,
	setWallet,
} from "./store/actions/wallet";
import {
	agregateQueryNFTassets,
	checkClientPairExists,
	checkPubKey,
	checkwalletExists,
	getAllClientWallets,
	getAllPairsWoithoutProvider,
	getAssetsForDeploy,
	getClientBalance,
	queryRoots,
	subscribe,
} from "./extensions/webhook/script";
import {
	setSwapAsyncIsWaiting,
	setSwapFromInputValue,
	setSwapFromInputValueChange,
	setSwapFromToken,
	setSwapToInputValue,
	setSwapToToken,
} from "./store/actions/swap";
import {
	setPoolAsyncIsWaiting,
	setPoolFromInputValue,
	setPoolFromToken,
	setPoolToInputValue,
	setPoolToToken,
} from "./store/actions/pool";
import {
	setManageAsyncIsWaiting,
	setManageBalance,
	setManageFromToken,
	setManagePairId,
	setManageRateAB,
	setManageRateBA,
	setManageToToken,
} from "./store/actions/manage";
import Account from "./pages/Account/Account";
import Swap from "./pages/Swap/Swap";
import Pool from "./pages/Pool/Pool";
import Popup from "./components/Popup/Popup";
// import Header from "./components/Header/Header";
import Manage from "./pages/Manage/Manage";
import AddLiquidity from "./pages/AddLiquidity/AddLiquidity";
import PoolExplorer from "./components/PoolExplorer/PoolExplorer";
import NativeLogin from "./components/NativeLogin/NativeLogin";
import Assets from "./pages/Assets/Assets";
import SendAssets from "./components/SendAssets/SendAssets";
import ReceiveAssets from "./components/ReceiveAssets/ReceiveAssets";
import AssetsModal from "./components/SendAssets/AssetsModal";
import AssetsModalReceive from "./components/ReceiveAssets/AssetsModalReceive";
import {useMount} from "react-use";
import {
	enterSeedPhraseEmptyStorage,
	setEncryptedSeedPhrase,
	showEnterSeedPhraseUnlock,
} from "./store/actions/enterSeedPhrase";
import EnterPassword from "./components/EnterPassword/EnterPassword";
import WalletSettings from "./components/WalletSettings/WalletSettings";
import KeysBlock from "./components/WalletSettings/KeysBlock";
import Stacking from "./pages/Stacking/Stacking";
import RevealSeedPhrase from "./components/RevealSeedPhrase/RevealSeedPhrase";
import {setNFTassets} from "./store/actions/walletSeed";

import AssetsListForDeploy from "./components/AssetsListForDeploy/AssetsListForDeploy";
import {useSnackbar} from "notistack";
import {
	getAllPairsAndSetToStore,
	getAllTokensAndSetToStore,
} from "./reactUtils/reactUtils";
import LimitOrder from "./pages/LimitOrder/LimitOrder";
import useFetchLimitOrders from "./hooks/useFetchLimitOrders";
import useSubLimitOrders from "./hooks/useSubLimitOrders";
import CreatePair from "./pages/CreatePair/CreatePair";

import {
	showEnterSeedPhrase,
	showEnterSeedPhraseRegister,
} from "./store/actions/enterSeedPhrase";

import EnterSeedPhrase from "./components/EnterSeedPhrase/EnterSeedPhrase";

import EnterSeed from "./sdk";

import Context from "./sdk/Context";

import ConnectWalletPage from "./sdk/ConnectWalletPage";
import WelcomeDidPage from "./sdk/WelcomeDidPage";
import LoginDidPage from "./sdk/LoginDidPage";
import LoginPage from "./sdk/LoginPage";
import AppPage from "./sdk/AppPage";

import Header from "./sdk/Header";

// import "./sdk/App.css";

function App() {
	const {enqueueSnackbar} = useSnackbar();
	const dispatch = useDispatch();
	const location = useLocation();
	const history = useHistory();
	const popup = useSelector((state) => state.appReducer.popup);
	const appTheme = useSelector((state) => state.appReducer.appTheme);
	const pubKey = useSelector((state) => state.walletReducer.pubKey);
	const walletIsConnected = useSelector(
		(state) => state.appReducer.walletIsConnected,
	);
	const swapAsyncIsWaiting = useSelector(
		(state) => state.swapReducer.swapAsyncIsWaiting,
	);
	const transactionsList = useSelector(
		(state) => state.walletReducer.transactionsList,
	);
	const poolAsyncIsWaiting = useSelector(
		(state) => state.poolReducer.poolAsyncIsWaiting,
	);
	const tokenList = useSelector((state) => state.walletReducer.tokenList);
	const liquidityList = useSelector(
		(state) => state.walletReducer.liquidityList,
	);
	const revealSeedPhraseIsVisible = useSelector(
		(state) => state.enterSeedPhrase.revealSeedPhraseIsVisible,
	);

	const [onloading, setonloading] = useState(false);
	const manageAsyncIsWaiting = useSelector(
		(state) => state.manageReducer.manageAsyncIsWaiting,
	);
	const subscribeData = useSelector(
		(state) => state.walletReducer.subscribeData,
	);
	const curExt = useSelector((state) => state.appReducer.curExt);

	const chrome = localStorage.getItem("chrome");
	if (chrome === null) showChromePopup();
	else if (chrome === "false") showChromePopup();

	function showChromePopup() {
		dispatch(showPopup({type: "chrome"}));
		localStorage.setItem("chrome", "true");
	}

	const enterSeedPhraseIsVisible = useSelector(
		(state) => state.enterSeedPhrase.enterSeedPhraseIsVisible,
	);

	useFetchLimitOrders();
	useSubLimitOrders();

	/*
        get pairs from dexroot
    */
	useEffect(async () => {
		const pairs2 = await getAllPairsWoithoutProvider();
		dispatch(setPairsList(pairs2));
		setonloading(false);
	}, []);

	useEffect(async () => {
		setonloading(true);
		const theme =
			localStorage.getItem("appTheme") === null
				? "light"
				: localStorage.getItem("appTheme");
		if (appTheme !== theme) dispatch(changeTheme(theme));
		setonloading(false);
		console.log("setonloading", onloading);
	}, []);

	// const transListReceiveTokens = useSelector(state => state.walletReducer.transListReceiveTokens);

	useEffect(() => {
		window.addEventListener("beforeunload", function (e) {
			if (swapAsyncIsWaiting || poolAsyncIsWaiting || manageAsyncIsWaiting)
				e.returnValue = "";
		});
	}, [swapAsyncIsWaiting, poolAsyncIsWaiting, manageAsyncIsWaiting]);

	async function checkOnLogin() {
		let esp = localStorage.getItem("esp");
		if (esp === null) dispatch(enterSeedPhraseEmptyStorage(true));
		else if (typeof esp === "string") {
			// const receiveTokensData = JSON.parse(localStorage.getItem("setSubscribeReceiveTokens"))
			// dispatch(setSubscribeReceiveTokens(receiveTokensData))
			dispatch(enterSeedPhraseEmptyStorage(false));
			dispatch(setEncryptedSeedPhrase(esp));
			dispatch(showEnterSeedPhraseUnlock());
		} else dispatch(enterSeedPhraseEmptyStorage(true));
	}

	useMount(async () => {
		await checkOnLogin();
	});
	const visibleEnterSeedPhraseUnlock = useSelector(
		(state) => state.enterSeedPhrase.enterSeedPhraseUnlockIsVisible,
	);
	const emptyStorage = useSelector(
		(state) => state.enterSeedPhrase.emptyStorage,
	);

	const clientData = useSelector((state) => state.walletReducer.clientData);
	useEffect(async () => {
		console.log("clientData", clientData);
		const NFTassets = await agregateQueryNFTassets(clientData.address);
		// setAssets(NFTassets)
		dispatch(setNFTassets(NFTassets));
	}, [clientData.address]);

	// const tipOpened = useSelector(state => state.appReducer.tipOpened);
	// const tipSeverity = useSelector(state => state.appReducer.tipSeverity);
	// const tipDuration = useSelector(state => state.appReducer.tipDuration);
	// const tipMessage = useSelector(state => state.appReducer.tipMessage);
	const tips = useSelector((state) => state.appReducer.tips);
	const transListReceiveTokens = useSelector(
		(state) => state.walletReducer.transListReceiveTokens,
	);

	useEffect(async () => {
		console.log("tips22222", tips);
		if (!tips) return;
		if (
			tips.type === "error" ||
			tips.message === "Sended message to blockchain" ||
			tips.message === "Copied"
		) {
			enqueueSnackbar({type: tips.type, message: tips.message});
			return;
		}

		const newTransList = JSON.parse(JSON.stringify(transListReceiveTokens));
		console.log("newTransList", newTransList);
		if (
			tips.name === "deployLockStakeSafeCallback" ||
			"transferOwnershipCallback"
		) {
			const NFTassets = await agregateQueryNFTassets(clientData.address);
			dispatch(setNFTassets(NFTassets));
		}
		if (tips.name === "connectRoot") {
			await getAllPairsAndSetToStore(clientData.address);
			await getAllTokensAndSetToStore(clientData.address);
		}
		if (tips.name === "acceptedPairTokens") {
			console.log("i at acceptedPairTokens");
			setTimeout(
				async () => await getAllTokensAndSetToStore(clientData.address),
				10000,
			);
		}

		if (
			tips.name === "tokensReceivedCallback" ||
			tips.name === "processLiquidityCallback" ||
			tips.name === "sendTokens" ||
			tips.name === "connectRoot" ||
			tips.name === "UpdateBalanceTONs"
		) {
			console.log("i was here", tips);
			await getAllTokensAndSetToStore(clientData.address);
		}
		enqueueSnackbar({type: tips.type, message: tips.message});
		newTransList.push(tips);
		dispatch(setSubscribeReceiveTokens(newTransList));
	}, [tips]);

	function onTipClosed() {
		dispatch(hideTip());
	}

	useEffect(async () => {
		// setLoadingRoots(true)
		const addrArray = await getAssetsForDeploy();
		// console.log("addrArray", addrArray);
		dispatch(setAssetsFromGraphQL(addrArray));
		// setLoadingRoots(true)
	}, []);

	return (
		<>
			<Router>
				<Context.Provider value={{status: status}}>
					<div className="App">
						<Header></Header>
						<Switch>
							<Route exact path="/" component={ConnectWalletPage}></Route>
							{/* <Route exact path="/connect-wallet" component={ConnectWalletPage}></Route> */}
							<Route
								exact
								path="/welcome-did"
								component={WelcomeDidPage}
							></Route>
							<Route exact path="/login-did" component={LoginDidPage}></Route>
							<Route exact path="/login" component={LoginPage}></Route>
							<Route exact path="/app" component={AppPage}></Route>
						</Switch>
					</div>
				</Context.Provider>
			</Router>
		</>

		// <>
		// <button
		// 	style={{fontSize: "16px", width: "100%"}}
		// 	className="btn wallet-btn"
		// 	onClick={() => dispatch(showEnterSeedPhraseRegister())}
		// >
		// 	Create a new Seed Phrase and Wallet
		// </button>
		// {enterSeedPhraseIsVisible === true && <EnterSeedPhrase />}
		// <EnterSeed></EnterSeed>
		// 	{/*{onloading && <div className="blockDiv"><Loader/></div>}*/}
		// 	{visibleEnterSeedPhraseUnlock === true &&
		// 		emptyStorage === false &&
		// 		!onloading && <EnterPassword />}
		// 	<div className="beta" onClick={onTipClosed}>
		// 		Beta version. Use desktop Google Chrome
		// 	</div>
		// 	<Header />
		// 	<Switch location={location}>
		// 		{/* <Route exact path="/native-login" component={NativeLogin} />
		// 		<Route exact path="/pool-explorer" component={PoolExplorer} />
		// 		<Route exact path="/pool" component={Pool} />
		// 		<Route exact path="/account" component={Account} />
		// 		<Route exact path="/swap" component={Swap} />
		// 		<Route exact path="/manage" component={Manage} />
		// 		<Route exact path="/add-liquidity" component={AddLiquidity} />
		// 		<Route exact path="/create-pair" component={CreatePair} />
		// 		<Route exact path="/staking" component={Stacking} />
		// 		<Route exact path="/wallet" component={Assets} />
		// 		<Route exact path="/orders" component={LimitOrder} />
		// 		<Route exact path="/">
		// 			<Redirect from="/" to="/wallet" />
		// 		</Route> */}

		// 		{walletIsConnected ? (
		// 			<>

		// 				<Route exact path="/wallet/settings/keys" component={KeysBlock} />
		// 				<Route exact path="/wallet/send" component={SendAssets} />
		// 				<Route exact path="/wallet/receive" component={ReceiveAssets} />
		// 				<Route exact path="/wallet/settings" component={WalletSettings} />
		// 				<Route
		// 					exact
		// 					path="/wallet/deployAssets"
		// 					component={AssetsListForDeploy}
		// 				/>
		// 				<Route
		// 					exact
		// 					path="/wallet/receive/receive-modal"
		// 					component={AssetsModalReceive}
		// 				/>
		// 				<Route
		// 					exact
		// 					path="/wallet/send/send-modal"
		// 					component={AssetsModal}
		// 				/>
		// 			</>
		// 		) : null}
		// 	</Switch>
		// 	{popup.isVisible ? (
		// 		<Popup type={popup.type} message={popup.message} link={popup.link} />
		// 	) : null}
		// 	{revealSeedPhraseIsVisible ? <RevealSeedPhrase /> : null}
		// </>
	);
}

export default App;
