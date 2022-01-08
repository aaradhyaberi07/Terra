import React, { useState } from "react";
import ReactDOM from "react-dom";
import Notice from "../../contracts/Notice.json";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Web3 from "web3";
import Navvbar from "../navbar";
import ipfs from "../farmerComponents/ipfs";
import styles from "../LandingPage/UpperSection/UpperSection.module.css";

const crypto = require("crypto");
require("dotenv").config();

const AdminNotif = () => {
  const [buffer, setBuffer] = useState(null);
  const [ipfsHash, setIPfsHash] = useState("");

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

  async function makeNotice(event) {
    event.preventDefault();
    const web3 = new Web3(window.ethereum);
    const accounts = await web3.eth.getAccounts();
    const networkId = await web3.eth.net.getId();
    const deployedNetwork = Notice.networks[networkId];
    const instance = new web3.eth.Contract(
      Notice.abi,
      deployedNetwork && deployedNetwork.address
    );
    if (!signCheck()) {
      alert("Please sign in to continue");
      return;
    }
    let textareas = document.getElementsByTagName("textarea");
    console.log(textareas[0].value);
    await instance.methods
      .newInfo(textareas[0].value, ipfsHash)
      .send({ from: accounts[0], gas: 2100000 })
      .then(() => {
        window.location = `/notifs`;
      });
  }
  return (
    <>
      <Navvbar></Navvbar>
      <div className="outer">
        <div
          style={{
            background:
              "linear-gradient(63.31deg,#dda11f -9.99%,#ffd311 -9.98%,rgba(193, 218, 226, 0.23) 131.09%)",
          }}
          className="inner "
        >
          <form>
            <h3>New Notification</h3>
            <div className="form-group">
              <textarea
                className="form-control"
                placeholder="Content"
                cols="50"
                rows="5"
                style={{ border: "1px solid" }}
              ></textarea>
            </div>
            <div className="form-group">
              <input type="file" onChange={capturefile} />
            </div>
            <div className="form-group">
              <button
                className="btn btn-dark btn-lg btn-block"
                style={{ marginLeft: "37.5%" }}
                onClick={makeNotice}
              >
                Submit
              </button>
            </div>
            <div className="clearfix" />
          </form>
        </div>
      </div>
    </>
  );
};

export default AdminNotif;
