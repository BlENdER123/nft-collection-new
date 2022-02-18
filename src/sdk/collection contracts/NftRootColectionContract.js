const NftRootColectionContract = {
	abi: {
		"ABI version": 2,
		version: "2.1",
		header: ["time", "expire"],
		functions: [
			{
				name: "constructor",
				inputs: [
					{
						name: "codeData",
						type: "cell",
					},
					{
						name: "codeDataChunk",
						type: "cell",
					},
					{
						name: "codeIndex",
						type: "cell",
					},
					{
						name: "codeIndexBasis",
						type: "cell",
					},
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
					{
						name: "addrAuthor",
						type: "address",
					},
				],
				outputs: [],
			},
			{
				name: "deployMetadata",
				inputs: [
					{
						name: "wid",
						type: "int8",
					},
					{
						name: "name",
						type: "string",
					},
					{
						name: "description",
						type: "string",
					},
					{
						name: "contentHash",
						type: "uint256",
					},
					{
						name: "mimeType",
						type: "string",
					},
					{
						name: "chunks",
						type: "uint8",
					},
					{
						name: "chunkSize",
						type: "uint128",
					},
					{
						name: "size",
						type: "uint128",
					},
					{
						components: [
							{
								name: "height",
								type: "uint128",
							},
							{
								name: "width",
								type: "uint128",
							},
							{
								name: "duration",
								type: "uint128",
							},
							{
								name: "extra",
								type: "string",
							},
							{
								name: "json",
								type: "string",
							},
						],
						name: "meta",
						type: "tuple",
					},
				],
				outputs: [],
			},
			{
				name: "mintNft",
				inputs: [],
				outputs: [],
			},
			{
				name: "getInfo",
				inputs: [],
				outputs: [
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
					{
						name: "totalSupply",
						type: "uint128",
					},
					{
						name: "maxMinted",
						type: "uint256",
					},
					{
						name: "addrAuthor",
						type: "address",
					},
					{
						name: "addrOwner",
						type: "address",
					},
				],
			},
			{
				name: "resolveCodeHashIndex",
				inputs: [
					{
						name: "addrRoot",
						type: "address",
					},
					{
						name: "addrOwner",
						type: "address",
					},
				],
				outputs: [
					{
						name: "codeHashIndex",
						type: "uint256",
					},
				],
			},
			{
				name: "resolveIndex",
				inputs: [
					{
						name: "addrRoot",
						type: "address",
					},
					{
						name: "addrData",
						type: "address",
					},
					{
						name: "addrOwner",
						type: "address",
					},
				],
				outputs: [
					{
						name: "addrIndex",
						type: "address",
					},
				],
			},
			{
				name: "resolveCodeHashData",
				inputs: [],
				outputs: [
					{
						name: "codeHashData",
						type: "uint256",
					},
				],
			},
			{
				name: "resolveData",
				inputs: [
					{
						name: "addrRoot",
						type: "address",
					},
					{
						name: "id",
						type: "uint256",
					},
				],
				outputs: [
					{
						name: "addrData",
						type: "address",
					},
				],
			},
			{
				name: "_inited",
				inputs: [],
				outputs: [
					{
						name: "_inited",
						type: "bool",
					},
				],
			},
		],
		data: [
			{
				key: 1,
				name: "_addrOwner",
				type: "address",
			},
			{
				key: 2,
				name: "_id",
				type: "uint256",
			},
		],
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
				name: "_codeData",
				type: "cell",
			},
			{
				name: "_codeIndex",
				type: "cell",
			},
			{
				name: "_checkList",
				type: "uint8",
			},
			{
				name: "_addrOwner",
				type: "address",
			},
			{
				name: "_addrAuthor",
				type: "address",
			},
			{
				name: "_addrBasis",
				type: "address",
			},
			{
				name: "_version",
				type: "string",
			},
			{
				name: "_totalSupply",
				type: "uint128",
			},
			{
				name: "_name",
				type: "string",
			},
			{
				name: "_description",
				type: "string",
			},
			{
				name: "_icon",
				type: "string",
			},
			{
				name: "_inited",
				type: "bool",
			},
			{
				name: "_codeDataChunk",
				type: "cell",
			},
			{
				name: "_codeIndexBasis",
				type: "cell",
			},
			{
				name: "_maxMinted",
				type: "uint256",
			},
			{
				name: "_id",
				type: "uint256",
			},
			{
				name: "_addrCreator",
				type: "address",
			},
		],
	},
	tvc: "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",
	code: "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",
	codeHash: "7a9f4c76d4ed8c4077d287a3202793b478dd8eb726d677bb1216317ec48403d2",
};
module.exports = {NftRootColectionContract};
