import React, {useState} from "react";
import {HashRouter as Router, Redirect} from "react-router-dom";
//import {main_screen_bg} from "../sdk/img/screenbg1.png"

function HowPage() {
	const [curentMode, setCurentMode] = useState(0);

	const [redirect, setRedirect] = useState([false, false]);

	function next() {
		let temp = [];
		for (let i = 0; i < redirect.length; i++) {
			let tempVal = redirect[i];
			if (i == curentMode) {
				tempVal = true;
			} else {
				tempVal = false;
			}
			temp.push(tempVal);
		}
		setRedirect(temp);
	}

	return (
		<Router>
			<div className="App2">
				<div className="header header2">
					<div className="container-header">
						<div className="acc-info">
							<div class="acc-info1">
								<a href="#/">
									<div class="name">NFTour</div>
								</a>
								{localStorage.address ? (
									<div class="wallet">
										<div className="acc-status">Connected:</div>
										<div className="acc-wallet">{localStorage.address}</div>
									</div>
								) : (
									""
								)}
							</div>

							<div class="pages">
								<a href="#/">
									<div class="page-element">Home</div>
								</a>
								<a href="#/load-nft">
									<div class="page-element">NFT Generator</div>
								</a>
								<a href="#/collection-market">
									<div class="page-element">NFT Collection Market</div>
								</a>
								<div class="page-element">FAQ</div>
							</div>
						</div>
					</div>
				</div>

				<div class="start-screen">
					<div
						class="container-header"
						style={{display: "flex", justifyContent: "center"}}
					>
						<div style={{width: "700px"}}>
							<div class="title">How to Use NFTour Collection Generator?</div>
							<br />
							<div class="text">
								NFTour collection generator is a special software by which you
								can easily create thousands of unique NFT arts. The software
								application will generate a series of digital collectibles based
								on the specification given by the user. Here are the steps you
								need to follow in order to use it.
								<br />
								<br />
								• Step 1: Select NFT Generator or NFT Collection Market Software
								<br />
								The first thing you need to do is select option. You can choose
								NFT Generator to create your own NFT or you can use NFT
								collection market software.
								<br />
								<br />
								• Step 2: Upload File
								<br />
								If you chose NFT Generator option, you need to upload an
								original and unique base file. There is no need to create a
								complete base artwork. You can simply upload parts of the
								artwork. The software will use the parts to create unique art
								combinations.
								<br />
								<br />
								• Step 3: Adjust Settings
								<br />
								After uploading the file, you need to adjust the settings to
								customize the artwork. The rarity settings help you to adjust
								different attributes as well as characters of the NFT
								collection.
								<br />
								<br />
								• Step 4: Title and Description
								<br />
								You also need to add a title for the NFT collection along with a
								description. It will help to create metadata for the NFTs.
								<br />
								<br />
								• Step 5: Create NFT
								<br />
								Now, you will be able to see the preview of the NFT collection.
								<br />
								<br />
								• Step 6: Connect your wallet
								<br />
								NFTs should be stored in a secure location such as your software
								Everscale wallet. Your wallet will prompt you to “Sign” the
								transaction. When you sign your artwork, it will forever link
								the NFT to your unique Everscale address and wallet, which
								allows collectors to verify the work is yours—and ensure that
								you’re always listed as the original artist who receives royalty
								payments.
								<br />
								<br />
								• Step 7: Approve gas
								<br />
								A gas fee will need to be approved in your wallet to complete
								the minting. Gas fees are the cost of interacting with the
								Everscale blockchain.
								<br />
								<br />
								• Step 8: Create NFT Collection
								<br />
								(https://graphictutorials.net/undoing-changes-made-to-your-computer/)Once
								you are satisfied with the preview, you can approve it and
								software will generate the NFT collection. Now, you can mint it
								and start selling it online.
								<br />
								<br />
								How to Use NFT Collection Market Software?
								<br />
								<br />
								• Step 1: Choose Collection
								<br />
								You can choose NFT Collection from which you want mint NFT.
								<br />
								• Step 2: Connect your Wallet
								<br />
								• Step 3: Buy&Open Pack
								<br />
								When you chose NFT Collection, you can unpack and buy your
								unique NFT. Now you can purchase and trade it in the market.
							</div>
						</div>
					</div>
				</div>

				{redirect[0] ? <Redirect to="/load-nft" /> : ""}
				{redirect[1] ? <Redirect to="/collection-market" /> : ""}

				<div class="footer">
					<div class="container-header">
						<div class="footer-1">
							<div class="name">RADIANCETEAM</div>
							<div class="copyright">
								© 2021, radianceteam.com
								<br />
								Terms of Service
								<br />
								Privacy Policy
							</div>
						</div>
						<div class="footer-2">
							<div class="pages">
								<div class="page-element active">Home</div>
								<div class="page-element">App</div>
								<div class="page-element">FAQ</div>
								<div class="page-element">Twitter</div>
								<div class="page-element">Facebook</div>
							</div>
							<div class="email">
								<span>For corparation</span>
								<div class="text">info@radianceteam.com</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Router>
	);
}

export default HowPage;
