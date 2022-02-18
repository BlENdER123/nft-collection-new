import {SET_IMG} from "../actions/types";

const initialState = {
	nfts: [],
};

const nftCollectionReducer = (state = initialState, {type, payload}) => {
	switch (type) {
		case SET_IMG:
			return {
				...state,
				...payload,
			};
		default:
			return state;
	}
};

export default nftCollectionReducer;
