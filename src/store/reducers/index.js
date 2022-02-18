import {combineReducers} from "redux";
import appReducer from "./app";
import walletReducer from "./wallet";
import poolReducer from "./pool";
import swapReducer from "./swap";
import walletSeedReducer from "./walletSeed";
import manageReducer from "./manage";
import clientWallets from "./clientWallets";
import poolExplorer from "./poolExplorer";
import enterSeedPhrase from "./enterSeedPhrase";
import stakingReducer from "./stake";
import limitOrders from "./limitOrders";
import nftCollection from "./nftCollection";

export default combineReducers({
	appReducer,
	walletReducer,
	swapReducer,
	poolReducer,
	manageReducer,
	clientWallets,
	poolExplorer,
	walletSeedReducer,
	enterSeedPhrase,
	stakingReducer,
	limitOrders,
	nftCollection,
});
