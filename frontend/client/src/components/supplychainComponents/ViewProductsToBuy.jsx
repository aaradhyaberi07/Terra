import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useLocation, Navigate, Outlet } from "react-router-dom";
import ReactDOM from "react-dom";
import SupplyChain from "../../contracts/SupplyChain.json";
import Web3 from "web3";
import TerraCoin from "../../contracts/TerraCoin.json";
import Navvbar from "../navbar";

// import ipfs from "./ipfs";
import { Row, Card, Button, ListGroup, ListGroupItem, Col } from "react-bootstrap";
import View from "../../info";
const crypto = require("crypto");
require("dotenv").config();

function ViewProductsToBuy() {
	const [products, setProducts] = useState([]);
	const creds = JSON.parse(localStorage.getItem("creds"));

	useEffect(() => {
		see();
	}, []);
	async function signCheck() {
		const web3 = new Web3(window.ethereum);
		const accounts = await web3.eth.getAccounts();
		let msg = "Hackathon";
		let hehe = await web3.eth.personal.sign(msg, accounts[0]);
		const signingAddress = await web3.eth.accounts.recover(msg, hehe);
		return signingAddress === accounts[0];
	}

	function getPrice(product) {
		const type = creds.type;
		if (type === "D") {
			return Number(product.sourceCost);
		} else if (type === "R") {
			return Number(product.wholesaleCost);
		} else {
			return Number(product.retailCost);
		}
	}

	async function handleBuy(productCode, ownerID, price) {
		let tokens = price / 20;
		const web3 = new Web3(window.ethereum);
		const accounts = await web3.eth.getAccounts();
		const networkId = await web3.eth.net.getId();
		const deployedNetwork = SupplyChain.networks[networkId];
		const instance = new web3.eth.Contract(SupplyChain.abi, deployedNetwork && deployedNetwork.address);
		const deployedNetwork2 = TerraCoin.networks[networkId];
		const instance2 = new web3.eth.Contract(TerraCoin.abi, deployedNetwork2 && deployedNetwork2.address);
		const balance = await instance2.methods.balanceOf(accounts[0]).call();
		console.log(tokens, balance);
		if (Number(tokens) > Number(balance)) {
			alert("Insufficient Balance. Buy more Terra Coins");
			window.location.reload();
			return;
		}
		if (!signCheck()) {
			alert("Please sign in to continue");
			return;
		}
		console.log("Buying...");
		console.log(productCode, ownerID, price);

		const type = creds.type;
		if (type === "D") {
			const ret = await instance.methods.purchaseItemByDistributor(productCode, Number(price + 100)).send({
				from: accounts[0],
				gas: 2100000,
			});
			await instance2.methods
				.transfer(ownerID, Number(tokens))
				.send({ from: accounts[0], gas: 2100000 })
				.then(() => {
					window.location = `/productview`;
				});
		} else if (type === "R") {
			const ret = await instance.methods.purchaseItemByRetailer(productCode, Number(price + 100)).send({
				from: accounts[0],
				gas: 2100000,
			});
			await instance2.methods
				.transfer(ownerID, Number(tokens))
				.send({ from: accounts[0], gas: 2100000 })
				.then(() => {
					window.location = `/productview`;
				});
		} else {
			const ret = await instance.methods.purchaseItemByConsumer(productCode).send({
				from: accounts[0],
				gas: 2100000,
			});
			await instance2.methods
				.transfer(ownerID, Number(tokens))
				.send({ from: accounts[0], gas: 2100000 })
				.then(() => {
					window.location = `/productview`;
				});
			console.log(ret);
			// const ret2 = await instance.methods.shippedItemByFarmer(productCode);
		}
	}

	async function see() {
		const web3 = new Web3(window.ethereum);
		const accounts = await web3.eth.getAccounts();
		const networkId = await web3.eth.net.getId();
		const deployedNetwork = SupplyChain.networks[networkId];
		const instance = new web3.eth.Contract(SupplyChain.abi, deployedNetwork && deployedNetwork.address);

		// const cnt = await instance.methods._claimsByFarmersize(accounts[0]).call();
		// console.log("hello", creds.type);
		const type = creds.type;
		let items;
		if (type === "D") {
			items = await instance.methods.viewItemAtFarmer().call();
		} else if (type === "R") {
			items = await instance.methods.viewItemAtDistributor().call();
		} else {
			items = await instance.methods.viewItemAtRetailer().call();
		}

		let newProducts = [];
		setProducts(newProducts);
		newProducts = [];
		for (let i = 0; i < items.length; i++) {
			const it = items[i];
			newProducts.push(it);
		}
		setProducts(newProducts);
		console.log(products);
		console.log(newProducts);
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
				Buy Products
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
									background: "linear-gradient(184deg, rgb(13 68 136) -9.99%, rgb(170 220 255) -9.98%, rgb(186 238 255 / 23%) 131.09%)",
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
										<b>Cost :</b> {getPrice(note)} INR
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
								<div
									style={{
										display: "flex",
										justifyContent: "space-evenly",
									}}
								>
									<Link to={`/viewsupply`} state={{ info: note }}>
										<Button variant="btn btn-dark">View More</Button>
									</Link>
									<Button variant="success" onClick={() => handleBuy(note.productCode, note.ownerID, getPrice(note))}>
										Buy Now
									</Button>
								</div>
								{/* </Link> */}
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

export default ViewProductsToBuy;
