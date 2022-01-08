import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import SupplyChain from "../../contracts/SupplyChain.json";
import Web3 from "web3";
// import ipfs from "./ipfs";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { getProfile } from "../temp/utils";

import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import FarmerHome from "../farmerComponents/FarmerHome";
import Styles from "../temp/SignInUp.module.css";

// const crypto = require("crypto");
require("dotenv").config();

const AddProductFarmer = () => {
  const [product_name, setProductName] = useState("");
  const [units, setUnits] = useState("");
  const [date, setDate] = useState("");
  const [cost, setCost] = useState(0);
  const [message, setMessage] = useState("");
  // const [buffer, setBuffer] = useState(null);
  // const [ipfsHash, setIPfsHash] = useState("");
  const creds = JSON.parse(localStorage.getItem("creds"));
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
    const deployedNetwork = SupplyChain.networks[networkId];
    const instance = new web3.eth.Contract(
      SupplyChain.abi,
      deployedNetwork && deployedNetwork.address
    );
    // console.log(instance);
    // if (!signCheck()) {
    // 	alert("Please sign in to continue");
    // }
    if (!signCheck()) {
      alert("Please sign in to continue");
      return;
    }
    const data = await getProfile(creds.access);
    const token = cost / 20;
    // console.log(token);
    // console.log(creds);
    // console.log(product_name, units, date, cost, accounts[0]);

    await instance.methods
      .produceByFarmer(product_name, units, date, cost)
      .send({ from: accounts[0], gas: 2100000 })
      .then(() => {
        window.location = `/productview`;
      });
  }

  const location = useLocation();
  const navigate = useNavigate();

  async function check() {
    if (location.pathname === "/farmer/addproduct") {
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
              <h3>Add Product</h3>
            </div>
            <div>
              <button
                onClick={Closenav}
                type="button"
                className="btn-close"
                aria-label="Close"
                style={{ flex: "1", marginRight: "14px" }}
              ></button>
            </div>
          </div>
          <div className="form-group">
            <input
              type="text"
              value={product_name}
              onChange={(event) => setProductName(event.target.value)}
              className="form-control"
              placeholder="Product Name"
            />
          </div>
          <div className="form-group">
            <input
              type="number"
              value={units}
              onChange={(event) => setUnits(event.target.value)}
              className="form-control"
              placeholder="Units in kg"
            />
          </div>
          <div className="form-group">
            <input
              type="Date"
              value={date}
              onChange={(event) => setDate(event.target.value)}
              className="form-control"
              placeholder="Date"
            />
          </div>
          <div className="form-group">
            <input
              type="number"
              value={cost}
              onChange={(event) => setCost(event.target.value)}
              className="form-control"
              placeholder="Price in INR"
            />
          </div>
          {/* <div className="form-group">
							<input type="file" onChange={capturefile} />
						</div> */}
          <div className="form-group">
            <button
              onClick={handleClick}
              type="submit"
              className="btn btn-dark btn-lg btn-block"
              style={{ marginLeft: "37.5%" }}
            >
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

export default AddProductFarmer;
