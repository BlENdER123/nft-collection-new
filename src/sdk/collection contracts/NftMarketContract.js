const NFTMarketContract = {
	abi: {
		"ABI version": 2,
		version: "2.1",
		header: ["pubkey", "time", "expire"],
		functions: [
			{
				name: "constructor",
				inputs: [
					{
						name: "root",
						type: "cell",
					},
					{
						name: "oneRoot",
						type: "cell",
					},
					{
						name: "data",
						type: "cell",
					},
					{
						name: "dataChunk",
						type: "cell",
					},
					{
						name: "index",
						type: "cell",
					},
					{
						name: "indexBasis",
						type: "cell",
					},
					{
						name: "offer",
						type: "cell",
					},
					{
						name: "indexOffer",
						type: "cell",
					},
				],
				outputs: [],
			},
			{
				name: "putOnSale",
				inputs: [
					{
						name: "addrNft",
						type: "address",
					},
					{
						name: "price",
						type: "uint128",
					},
				],
				outputs: [],
			},
			{
				name: "deployColection",
				inputs: [
					{
						name: "name",
						type: "string",
					},
					{
						name: "description",
						type: "string",
					},
					{
						name: "icon",
						type: "string",
					},
				],
				outputs: [],
			},
			{
				name: "getInfo",
				inputs: [],
				outputs: [
					{
						name: "countColections",
						type: "uint128",
					},
					{
						name: "oneRoot",
						type: "address",
					},
				],
			},
			{
				name: "resolveCodeHashOffer",
				inputs: [],
				outputs: [
					{
						name: "codeHashOffer",
						type: "uint256",
					},
				],
			},
			{
				name: "resolveAddrOffer",
				inputs: [
					{
						name: "addrOwner",
						type: "address",
					},
					{
						name: "addrNft",
						type: "address",
					},
				],
				outputs: [
					{
						name: "addrOffer",
						type: "address",
					},
				],
			},
			{
				name: "resolveCodeHashNftRoot",
				inputs: [],
				outputs: [
					{
						name: "codeHashData",
						type: "uint256",
					},
				],
			},
			{
				name: "resolveNftRoot",
				inputs: [
					{
						name: "addrOwner",
						type: "address",
					},
					{
						name: "id",
						type: "uint128",
					},
				],
				outputs: [
					{
						name: "addrNftRoot",
						type: "address",
					},
				],
			},
		],
		data: [],
		events: [],
		fields: [
			{
				name: "_pubkey",
				type: "uint256",
			},
			{
				name: "_timestamp",
				type: "uint64",
			},
			{
				name: "_constructorFlag",
				type: "bool",
			},
			{
				name: "_codeNftRoot",
				type: "cell",
			},
			{
				name: "_codeOffer",
				type: "cell",
			},
			{
				name: "oneNFTRoot",
				type: "address",
			},
			{
				name: "_data",
				type: "cell",
			},
			{
				name: "_dataChunk",
				type: "cell",
			},
			{
				name: "_index",
				type: "cell",
			},
			{
				name: "_indexBasis",
				type: "cell",
			},
			{
				name: "_indexOffer",
				type: "cell",
			},
			{
				name: "_countColections",
				type: "uint128",
			},
		],
	},
	tvc: "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",
	code: "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",
	codeHash: "c0d036d3ab13963e99ac972566ecc7802d6d60d29847d612e652700cfc39005f",
};
module.exports = {NFTMarketContract};
