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

function Checkout() {
	const creds = JSON.parse(localStorage.getItem("creds"));
	const here = useLocation();
	const [total, setTotal] = useState(0);
	const [cart, setCart] = useState([]);
	useEffect(() => {
		let tot = 0;
		let temp_arr = [];
		here.state.info.forEach((key, value) => {
			tot += Number(key.want) * Number(key.price_per_kg);
			let obj = {
				id: key,
				value: value,
			};
			temp_arr.push(obj);
		});
		setTotal(tot);
		setCart(temp_arr);
	}, []);
	async function signCheck() {
		const web3 = new Web3(window.ethereum);
		const accounts = await web3.eth.getAccounts();
		let msg = "Hackathon";
		let hehe = await web3.eth.personal.sign(msg, accounts[0]);
		const signingAddress = await web3.eth.accounts.recover(msg, hehe);
		return signingAddress === accounts[0];
	}

	// async function checkout(productCode) {
	// 	event.preventDefault();
	// 	const web3 = new Web3(window.ethereum);
	// 	const accounts = await web3.eth.getAccounts();
	// 	const networkId = await web3.eth.net.getId();
	// 	const deployedNetwork = SupplyChain.networks[networkId];
	// 	const instance = new web3.eth.Contract(SupplyChain.abi, deployedNetwork && deployedNetwork.address);
	// 	const deployedNetwork2 = TerraCoin.networks[networkId];
	// 	const instance2 = new web3.eth.Contract(TerraCoin.abi, deployedNetwork2 && deployedNetwork2.address);
	// 	const balance = await instance2.methods.balanceOf(accounts[0]).call();
	// 	console.log(tokens, balance);
	// 	let tokens = Number(total) / 20;
	// 	if (Number(total) % 20 != 0) tokens++;
	// 	if (Number(tokens) > Number(balance)) {
	// 		alert("Insufficient Balance. Buy more Terra Coins");
	// 		window.location.reload();
	// 		return;
	// 	}
	// 	if (!signCheck()) {
	// 		alert("Please sign in to continue");
	// 		return;
	// 	}
	// 	const ret = await instance.methods.purchaseItemByConsumer(productCode).send({
	// 		from: accounts[0],
	// 		gas: 2100000,
	// 	});
	// 	await instance2.methods
	// 		.transfer(ownerID, Number(tokens))
	// 		.send({ from: accounts[0], gas: 2100000 })
	// 		.then(() => {
	// 			window.location = `/productview`;
	// 		});
	// 	console.log(ret);
	// }

	return (
		<div>
			<div className="container">
				{cart.map((note) => (
					<div key={note.value}>
						{console.log(note)}
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
									background: "linear-gradient(11deg, rgb(13 68 136) -9.99%, rgb(170 220 255) -9.98%, rgb(186 238 255 / 23%) 131.09%)",
								}}
							>
								{/* <Card.Title>{note.hp_name}</Card.Title>
								<Card.Text>{note.hp_add}</Card.Text> */}
								<ListGroup className="list-group-flush">
									<ListGroupItem>
										<b>Product ID :</b> {note.value}
									</ListGroupItem>
									<ListGroupItem>
										<b>Product Name :</b> {note.id.name}
									</ListGroupItem>
									<ListGroupItem>
										<b>Price Per Unit :</b> {note.id.price_per_kg}
									</ListGroupItem>
									<ListGroupItem>
										<b>Units Required : </b>
										{note.id.want}
									</ListGroupItem>
									<ListGroupItem>
										<b>Cost : </b>
										{note.id.want * note.id.price_per_kg} INR
									</ListGroupItem>
									<ListGroupItem>
										<b>Cost : </b>
										{(note.id.want * note.id.price_per_kg) / 20} TC
									</ListGroupItem>
								</ListGroup>

								<div style={{ display: "flex", justifyContent: "space-evenly" }}></div>
							</Card.Body>
							<Card.Footer className="text-muted"></Card.Footer>
						</Card>

						<br></br>
					</div>
				))}
				{/* <Button onClick={checkout}>Checkout</Button> */}
			</div>
		</div>
	);
}

export default Checkout;
