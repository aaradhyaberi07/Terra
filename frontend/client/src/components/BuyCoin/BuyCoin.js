import React, { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import ReactDOM from "react-dom";
import Web3 from "web3";
import {
  Row,
  Card,
  Button,
  ListGroup,
  ListGroupItem,
  Col,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import TerraCoin from "../../contracts/TerraCoin.json";
import coin from "../../static/images/coin3.jpg";
import styles from "./BuyCoin.css";
import "./BuyCoin.css";
import Navvbar from "../navbar";

const crypto = require("crypto");
require("dotenv").config();

function BuyCoin() {
  const [balance, setBalance] = useState(0);
  const [inr, setInr] = useState(0.0);
  const [account, setAccount] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    see();
  }, []);

  async function see() {
    const web3 = new Web3(window.ethereum);
    const accounts = await web3.eth.getAccounts();
    const networkId = await web3.eth.net.getId();
    const deployedNetwork = TerraCoin.networks[networkId];
    const instance = new web3.eth.Contract(
      TerraCoin.abi,
      deployedNetwork && deployedNetwork.address
    );
    await instance.methods
      .balanceOf(accounts[0])
      .call()
      .then((res) => {
        setBalance(res);
        setAccount(accounts[0]);
      });
  }

  async function signCheck() {
    const web3 = new Web3(window.ethereum);
    const accounts = await web3.eth.getAccounts();
    let msg = "Hackathon";
    let hehe = await web3.eth.personal.sign(msg, accounts[0]);
    const signingAddress = await web3.eth.accounts.recover(msg, hehe);
    return signingAddress === accounts[0];
  }

  async function Buy(event) {
    event.preventDefault();
    const web3 = new Web3(window.ethereum);
    const accounts = await web3.eth.getAccounts();
    const networkId = await web3.eth.net.getId();
    const deployedNetwork = TerraCoin.networks[networkId];
    const instance = new web3.eth.Contract(
      TerraCoin.abi,
      deployedNetwork && deployedNetwork.address
    );
    if (!signCheck()) {
      alert("Please sign in to continue");
    }
    const eth = Number(inr) * 0.0000035;
    console.log(eth);
    await instance.methods
      .payUser()
      .send({
        from: accounts[0],
        value: web3.utils.toWei(eth.toString(), "ether"),
      })
      .then(() => {
        window.location.reload();
      });
    // await instance.methods.signInsurance(id).send({ from: accounts[0], gas: 2100000 });
    // const deployedNetwork2 = TerraCoin.networks[networkId];
    // const instance2 = new web3.eth.Contract(TerraCoin.abi, deployedNetwork2 && deployedNetwork2.address);
    // await instance2.methods.approve(accounts[0], Insurance_address, cost).send({ from: accounts[0], gas: 2100000 });
    // await instance2.methods.transferFrom(Insurance_address, farmer, cost).send({ from: accounts[0], gas: 2100000 });
    //window.location.reload();
  }

  return (
    <div>
      <Navvbar></Navvbar>
      <div className="container">
        <h1
          style={{ fontFamily: "Dancing Script, cursive" }}
          className="heading"
        >
          Buy Terra Coin
        </h1>
        <img className="coin" src={coin}></img>
        <div className="content">
          <p className="balance">
            <b>Balance :</b> {balance} TC (1TC = 20INR)
          </p>
          <p className="balance">
            <b>Current Account :</b> {account}
          </p>
          <input
            type="number"
            onChange={(event) => setInr(event.target.value)}
            placeholder="Cost in INR"
            style={{ width: "200px", height: "40px" }}
          />
          <Button
            variant="success"
            style={{ marginLeft: "20px" }}
            onClick={Buy}
          >
            Buy
          </Button>
        </div>
      </div>
    </div>
  );
}

export default BuyCoin;
