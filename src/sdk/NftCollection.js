import React, {useState} from "react";
import {HashRouter as Router} from "react-router-dom";

function NftCustomization() {
	let arr = JSON.parse(localStorage.getItem("collection"));

	const [collection, setCollection] = useState(arr);

	return (
		<Router>
			<div class="constructors">
				<div className="modal-constructor show">
					<div class="title">Your Collection</div>
					<div class="nft-collection">
						{collection.map((item) => {
							return (
								<div class="nft-element">
									<div class="img">
										<img src={item} />
									</div>
								</div>
							);
						})}
					</div>
				</div>

				<div class="break"></div>
				<a href="#/">
					<div class="next">Deploy Collection</div>
				</a>
			</div>
		</Router>
	);
}

export default NftCustomization;
