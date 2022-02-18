const DataContract = {
	abi: {
		"ABI version": 2,
		version: "2.1",
		header: ["time"],
		functions: [
			{
				name: "constructor",
				inputs: [
					{
						name: "name",
						type: "string",
					},
					{
						name: "descriprion",
						type: "string",
					},
					{
						name: "addrOwner",
						type: "address",
					},
					{
						name: "addrAuthor",
						type: "address",
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
						name: "codeIndex",
						type: "cell",
					},
					{
						name: "codeDataChunk",
						type: "cell",
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
				name: "setRoyalty",
				inputs: [
					{
						name: "royalty",
						type: "uint128",
					},
				],
				outputs: [],
			},
			{
				name: "setAddrApproved",
				inputs: [
					{
						name: "addrApproved",
						type: "address",
					},
				],
				outputs: [],
			},
			{
				name: "transfer",
				inputs: [
					{
						name: "addrTo",
						type: "address",
					},
				],
				outputs: [],
			},
			{
				name: "deployDataChunk",
				inputs: [
					{
						name: "chunk",
						type: "bytes",
					},
					{
						name: "chunkNumber",
						type: "uint128",
					},
				],
				outputs: [],
			},
			{
				name: "getAddrOwner",
				inputs: [
					{
						name: "answerId",
						type: "uint32",
					},
				],
				outputs: [
					{
						name: "value0",
						type: "address",
					},
				],
			},
			{
				name: "getAddrApproved",
				inputs: [
					{
						name: "answerId",
						type: "uint32",
					},
				],
				outputs: [
					{
						name: "value0",
						type: "address",
					},
				],
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
						name: "descriprion",
						type: "string",
					},
					{
						name: "addrOwner",
						type: "address",
					},
					{
						name: "addrAuthor",
						type: "address",
					},
					{
						name: "createdAt",
						type: "uint128",
					},
					{
						name: "addrRoot",
						type: "address",
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
					{
						name: "royalty",
						type: "uint128",
					},
				],
			},
			{
				name: "resolveDataChunk",
				inputs: [
					{
						name: "addrData",
						type: "address",
					},
					{
						name: "chunkNumber",
						type: "uint128",
					},
				],
				outputs: [
					{
						name: "addrDataChunk",
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
				name: "_id",
				inputs: [],
				outputs: [
					{
						name: "_id",
						type: "uint256",
					},
				],
			},
			{
				name: "_deployed",
				inputs: [],
				outputs: [
					{
						name: "_deployed",
						type: "bool",
					},
				],
			},
		],
		data: [
			{
				key: 1,
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
				name: "_codeIndex",
				type: "cell",
			},
			{
				name: "_codeDataChunk",
				type: "cell",
			},
			{
				name: "_name",
				type: "string",
			},
			{
				name: "_descriprion",
				type: "string",
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
				name: "_createdAt",
				type: "uint128",
			},
			{
				name: "_addrRoot",
				type: "address",
			},
			{
				name: "_contentHash",
				type: "uint256",
			},
			{
				name: "_mimeType",
				type: "string",
			},
			{
				name: "_chunks",
				type: "uint8",
			},
			{
				name: "_chunkSize",
				type: "uint128",
			},
			{
				name: "_size",
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
				name: "_meta",
				type: "tuple",
			},
			{
				name: "_id",
				type: "uint256",
			},
			{
				name: "_deployed",
				type: "bool",
			},
			{
				name: "_royalty",
				type: "uint128",
			},
			{
				name: "_addrApproved",
				type: "address",
			},
		],
	},
	tvc: "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",
	code: "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",
	codeHash: "06a1bc58632589653c8c947787484ab6095a9fc27c7d0c1386e615c05cca75f6",
};
module.exports = {DataContract};
