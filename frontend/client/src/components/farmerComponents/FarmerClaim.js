import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import Insurance from "../../contracts/Insurance.json";
import Web3 from "web3";
import ipfs from "./ipfs";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { getProfile } from "../temp/utils";
import Navbar from "../navbar";
import FarmerHome from "./FarmerHome";
import Styles from "../temp/SignInUp.module.css";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const crypto = require("crypto");
require("dotenv").config();

const FarmerClaim = () => {
	const [cause, setCause] = useState("");
	const [date, setDate] = useState("");
	const [farmer_location, setFarmer_location] = useState("");
	const [cost, setCost] = useState(0);
	const [message, setMessage] = useState("");
	const [buffer, setBuffer] = useState(null);
	const [ipfsHash, setIPfsHash] = useState("");
	const creds = JSON.parse(localStorage.getItem("creds"));
	async function capturefile(event) {
		event.stopPropagation();
		event.preventDefault();
		const file = event.target.files[0];
		let reader = new window.FileReader();
		reader.readAsArrayBuffer(file);
		reader.onloadend = () => convertToBuffer(reader);
	}

	async function convertToBuffer(reader) {
		const buffer = await Buffer.from(reader.result);
		setBuffer(buffer);
		const algorithm = "aes-256-cbc";
		const secretKey = process.env.REACT_APP_SECRET_KEY;
		const iv = process.env.REACT_APP_IV;
		const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
		const crypted = Buffer.concat([cipher.update(buffer), cipher.final()]);
		const uploadResult = await ipfs.add(crypted);
		const hash = uploadResult.path;
		console.log(hash);
		setIPfsHash(hash);
	}

	async function signCheck() {
		const web3 = new Web3(window.ethereum);
		const accounts = await web3.eth.getAccounts();
		let msg = "Hackathon";
		let hehe = await web3.eth.personal.sign(msg, accounts[0]);
		const signingAddress = await web3.eth.accounts.recover(msg, hehe);
		return signingAddress === accounts[0];
	}

	async function handleClick(event) {
		event.preventDefault();
		const web3 = new Web3(window.ethereum);
		const accounts = await web3.eth.getAccounts();
		const networkId = await web3.eth.net.getId();
		const deployedNetwork = Insurance.networks[networkId];
		const instance = new web3.eth.Contract(Insurance.abi, deployedNetwork && deployedNetwork.address);
		if (!signCheck()) {
			alert("Please sign in to continue");
			return;
		}
		const data = await getProfile(creds.access);
		const token = Number(cost) / 20;
		console.log(token);
		await instance.methods
			.newClaim(data[0].name, Number(data[0].age), data[0].sex, Number(token), cause, date, farmer_location, ipfsHash, Number(cost))
			.send({ from: accounts[0], gas: 2100000 })
			.then(() => {
				window.location = `/farmer/list`;
			});
	}

	const location = useLocation();
	const navigate = useNavigate();

	async function check() {
		if (location.pathname === "/farmer/claim") {
			document.getElementById("sidenav").style.width = "500px";
		} else document.getElementById("sidenav").style.width = "0px";
	}

	useEffect(() => {
		check();
	}, []);

	async function Closenav() {
		navigate("/farmer/home");
	}

	return (
		<>
			<FarmerHome></FarmerHome>
			<div className={Styles.Wrapper} id="sidenav" style={{ padding: "40px" }}>
				<form>
					<div style={{ display: "flex" }}>
						<div style={{ flex: "1", marginLeft: "12px" }}>
							<h3>File Claim</h3>
						</div>
						<div>
							<button onClick={Closenav} type="button" className="btn-close" aria-label="Close" style={{ flex: "1", marginRight: "14px" }}></button>
						</div>
					</div>

					<div className="form-group">
						<input type="text" value={cause} onChange={(event) => setCause(event.target.value)} className="form-control" placeholder="Cause" />
					</div>
					<div className="form-group">
						<input type="Date" value={date} onChange={(event) => setDate(event.target.value)} className="form-control" placeholder="date" />
					</div>
					<div className="form-group">
						<input type="text" value={farmer_location} onChange={(event) => setFarmer_location(event.target.value)} className="form-control" placeholder="Location" />
					</div>
					<div className="form-group">
						<input type="number" value={cost} onChange={(event) => setCost(event.target.value)} className="form-control" placeholder="Cost in INR" />
					</div>
					<div className="form-group">
						<input type="file" onChange={capturefile} />
					</div>
					<div className="form-group">
						<button onClick={handleClick} type="submit" className="btn btn-dark btn-lg btn-block" style={{ marginLeft: "37.5%" }}>
							Submit
						</button>
					</div>
					{message && <p className="alert alert-danger fade in">{message}</p>}
					<div className="clearfix" />
					<img src="" id="imp"></img>
				</form>
			</div>
		</>
	);
};

export default FarmerClaim;
