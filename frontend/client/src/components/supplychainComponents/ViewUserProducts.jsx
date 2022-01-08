import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useLocation, Navigate, Outlet } from "react-router-dom";
import ReactDOM from "react-dom";
import SupplyChain from "../../contracts/SupplyChain.json";
import Web3 from "web3";
// import ipfs from "./ipfs";
import { Row, Card, Button, ListGroup, ListGroupItem, Col } from "react-bootstrap";
import View from "../../info";
import Navvbar from "../navbar";
// const crypto = require("crypto");
require("dotenv").config();

function ViewUserProducts() {
	const [products, setProducts] = useState([]);

	useEffect(() => {
		see();
	}, []);

	// async function getProduct(code, instance) {
	//   let ret = await instance.methods.viewItem(code);
	//   return ret;
	// }

	async function see() {
		const web3 = new Web3(window.ethereum);
		const accounts = await web3.eth.getAccounts();
		const networkId = await web3.eth.net.getId();
		const deployedNetwork = SupplyChain.networks[networkId];
		const instance = new web3.eth.Contract(SupplyChain.abi, deployedNetwork && deployedNetwork.address);

		// const cnt = await instance.methods._claimsByFarmersize(accounts[0]).call();
		// console.log("hello", creds.type);
		// const type = creds.type;
		// console.log(instance);
		const items = await instance.methods.viewUserItems(accounts[0]).call();
		console.log(items);
		// const test = await instance.methods.viewItemAtDistributor().call();
		const test = await instance.methods.viewItem(1).call();
		console.log(test);
		// console.log(accounts[0]);

		let newProducts = [];
		setProducts(newProducts);
		newProducts = [];
		for (let i = 0; i < items.length; i++) {
			const it = items[i];
			newProducts.push(it);
		}
		setProducts(newProducts);
		// console.log(products);
		// console.log(newProducts);
	}

	return (
		<div>
			<Navvbar></Navvbar>
			<h1
				style={{
					fontFamily: "Dancing Script, cursive",
					marginTop: "2%",
					marginLeft: "42%",
				}}
				className="heading"
			>
				Your Products
			</h1>
			<div className="container">
				{products.map((note) => (
					<div key={note.productCode}>
						<Card
							className="text-center"
							style={{
								marginTop: "30px",
								marginBottom: "40px",
								marginLeft: "auto",
								marginRight: "auto",
								width: "400px",
								boxShadow: "0px 4px 10px",
							}}
						>
							<Card.Header></Card.Header>
							<Card.Body
								style={{
									background: "linear-gradient(272deg, rgb(13, 68, 136) -9.99%, rgb(135 254 172) -9.98%, rgba(186, 238, 255, 0.23) 131.09%)",
								}}
							>
								<ListGroup className="list-group-flush">
									<ListGroupItem>
										<b>Name : {note.productName}</b>
									</ListGroupItem>
									<ListGroupItem>
										<b>Units (in Kg) :</b> {note.productUnits}
									</ListGroupItem>
									<ListGroupItem>
										<b>Date of Harvest:</b> {note.produceDate}
									</ListGroupItem>
									<ListGroupItem>
										<b>Farmer Selling Price:</b> {note.sourceCost} INR
									</ListGroupItem>
									<ListGroupItem>
										<b>Wholesale Price:</b> {note.wholesaleCost} INR
									</ListGroupItem>
									<ListGroupItem>
										<b> Retail Price:</b> {note.retailCost} INR
									</ListGroupItem>
									<ListGroupItem>
										<b>Owner Address :</b> {note.ownerID}
									</ListGroupItem>
									{/* <ListGroupItem>
                    Farm Address : {note.originFarmID}
                  </ListGroupItem>
                  <ListGroupItem>
                    Distributor Address : {note.distributorID}
                  </ListGroupItem>
                  <ListGroupItem>
                    Retailer Address : {note.retailerID}
                  </ListGroupItem>
                  <ListGroupItem>
                    Consumer Address : {note.consumerID}
                  </ListGroupItem> */}
								</ListGroup>
								{/* <Link to={`/view`} state={{ info: note }}> */}
								{/* <Button
                  variant="btn btn-dark"
                  onClick={() =>
                    handleBuy(note.productCode, note.ownerID, getPrice(note))
                  }
                >
                  Buy Now
                </Button> */}
								{/* </Link> */}
								<Link to={`/viewsupply`} state={{ info: note }}>
									<Button variant="btn btn-dark">View More</Button>
								</Link>
							</Card.Body>
							<Card.Footer className="text-muted"></Card.Footer>
						</Card>
						<br></br>
					</div>
				))}
			</div>
		</div>
	);
}

export default ViewUserProducts;
