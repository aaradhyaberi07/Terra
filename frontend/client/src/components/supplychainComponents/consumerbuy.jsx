import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useLocation, Navigate, Outlet } from "react-router-dom";
import ReactDOM from "react-dom";
import SupplyChain from "../../contracts/SupplyChain.json";
import Web3 from "web3";
import TerraCoin from "../../contracts/TerraCoin.json";

// import ipfs from "./ipfs";
import { Row, Card, Button, ListGroup, ListGroupItem, Col } from "react-bootstrap";
import View from "../../info";
const crypto = require("crypto");
require("dotenv").config();

function ConsumerBuy() {
	const [products, setProducts] = useState([]);
	const [cart, setCart] = useState(new Map());

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

	async function handleBuy(productCode, ownerID, price, units, name) {
		let tokens = price / 20;
		let here = Number(document.getElementById(productCode).value);
		units = Number(units);
		if (here > units) {
			alert(`Given number of units not available for product-code ${productCode}`);
			return;
		}
		let obj = {
			ownerID: ownerID,
			price_per_kg: Number(price / units),
			want: here,
			name: name,
		};
		let temp = cart;
		temp.set(productCode, obj);
		setCart(temp);
	}

	async function see() {
		const web3 = new Web3(window.ethereum);
		const accounts = await web3.eth.getAccounts();
		const networkId = await web3.eth.net.getId();
		const deployedNetwork = SupplyChain.networks[networkId];
		const instance = new web3.eth.Contract(SupplyChain.abi, deployedNetwork && deployedNetwork.address);
		let items = await instance.methods.viewItemAtRetailer().call();
		let newProducts = [];
		setProducts(newProducts);
		newProducts = [];
		for (let i = 0; i < items.length; i++) {
			const it = items[i];
			newProducts.push(it);
		}
		setProducts(newProducts);
	}

	return (
		<div>
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
							<Card.Body>
								<ListGroup className="list-group-flush">
									<ListGroupItem>Name : {note.productName}</ListGroupItem>
									<ListGroupItem>Product-Code : {note.productCode}</ListGroupItem>
									<ListGroupItem>Units (in Kg) Available: {note.productUnits}</ListGroupItem>
									<ListGroupItem>Date of Harvest: {note.produceDate}</ListGroupItem>
									<ListGroupItem>Cost : {getPrice(note)} INR</ListGroupItem>
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
								<Link to={`/viewsupply`} state={{ info: note }}>
									<Button variant="btn btn-dark">View More</Button>
								</Link>
								<br />
								<br />
								<Button variant="btn btn-dark" onClick={() => handleBuy(note.productCode, note.ownerID, getPrice(note), note.productUnits, note.productName)}>
									Add to cart
								</Button>
								<input type="number" id={note.productCode} placeholder="Number of units" />
								{/* </Link> */}
							</Card.Body>
							<Card.Footer className="text-muted"></Card.Footer>
						</Card>
						<br></br>
					</div>
				))}
				<Link to={`/checkout`} state={{ info: cart }}>
					<Button>Checkout</Button>
				</Link>
			</div>
		</div>
	);
}

export default ConsumerBuy;
