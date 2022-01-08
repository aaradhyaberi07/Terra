import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import Insurance from "../../contracts/Insurance.json";
import Web3 from "web3";
import ipfs from "../farmerComponents/ipfs";
import Navvbar from "../navbar";

import {
  Row,
  Card,
  Button,
  ListGroup,
  ListGroupItem,
  Col,
} from "react-bootstrap";
import View from "../../info";
import { Link } from "react-router-dom";
import TerraCoin from "../../contracts/TerraCoin.json";
import Constants from "../../var";
const crypto = require("crypto");
require("dotenv").config();

function Insurance_Provider() {
  const [claims, setClaims] = useState([]);
  useEffect(() => {
    see();
  }, []);

  async function see() {
    const web3 = new Web3(window.ethereum);
    const accounts = await web3.eth.getAccounts();
    const networkId = await web3.eth.net.getId();
    const deployedNetwork = Insurance.networks[networkId];
    const instance = new web3.eth.Contract(
      Insurance.abi,
      deployedNetwork && deployedNetwork.address
    );
    const res = await instance.methods.seeClaimsInsurance().call();
    let sz = res.length;
    let newClaim = [];
    setClaims(newClaim);
    newClaim = [];
    for (let i = 0; i < sz; i++) {
      newClaim.push(res[i]);
    }
    setClaims(newClaim);
  }

  async function signCheck() {
    const web3 = new Web3(window.ethereum);
    const accounts = await web3.eth.getAccounts();
    let msg = "Hackathon";
    let hehe = await web3.eth.personal.sign(msg, accounts[0]);
    const signingAddress = await web3.eth.accounts.recover(msg, hehe);
    return signingAddress === accounts[0];
  }

  async function signInsurance(id, cost, farmer) {
    const web3 = new Web3(window.ethereum);
    const accounts = await web3.eth.getAccounts();
    const networkId = await web3.eth.net.getId();
    const deployedNetwork = Insurance.networks[networkId];
    const instance = new web3.eth.Contract(
      Insurance.abi,
      deployedNetwork && deployedNetwork.address
    );
    const deployedNetwork2 = TerraCoin.networks[networkId];
    const instance2 = new web3.eth.Contract(
      TerraCoin.abi,
      deployedNetwork2 && deployedNetwork2.address
    );
    const balance = await instance2.methods.balanceOf(accounts[0]).call();
    console.log(cost, balance);
    if (Number(cost) > Number(balance)) {
      alert("Insufficient Balance. Buy more Terra Coins");
      window.location.reload();
      return;
    }
    if (!signCheck()) {
      alert("Please sign in to continue");
      return;
    }
    console.log(id);
    await instance.methods
      .signInsurance(id)
      .send({ from: accounts[0], gas: 2100000 });
    await instance2.methods
      .transfer(farmer, Number(cost))
      .send({ from: accounts[0], gas: 2100000 })
      .then(() => {
        window.location.reload();
      });
  }

  async function download(hash) {
    const algorithm = "aes-256-cbc";
    const secretKey = process.env.REACT_APP_SECRET_KEY;
    const iv = process.env.REACT_APP_IV;
    const recData = await ipfs.cat(hash);
    var data = new Uint8Array();
    for await (const item of recData) {
      var prevData = data;
      data = new Uint8Array(data.length + item.length);
      data.set(prevData);
      data.set(item, prevData.length);
    }
    const decipher = crypto.createDecipheriv(algorithm, secretKey, iv);
    let decData = decipher.update(Buffer.from(data));
    decData = Buffer.concat([decData, decipher.final()]);
    // let here = "data:image/png;base64,";
    // here = here + temp.toString("base64");
    const url = window.URL.createObjectURL(new Blob([decData]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "claim.jpg");
    document.body.appendChild(link);
    link.click();
  }
  return (
    <>
      <Navvbar></Navvbar>
      <div className="container">
        {claims.map((note) => (
          <div key={note.id}>
            <Card
              className="text-center"
              style={{
                marginTop: "30px",
                marginBottom: "40px",
                marginLeft: "auto",
                marginRight: "auto",
                width: "400px",
                boxShadow: "0px 4px 10px",
                border: "1.5px solid",
              }}
            >
              <Card.Header></Card.Header>
              <Card.Body
                style={{
                  background:
                    "linear-gradient(184deg, rgb(13 68 136) -9.99%, rgb(170 220 255) -9.98%, rgb(186 238 255 / 23%) 131.09%)",
                }}
              >
                {/* <Card.Title>{note.hp_name}</Card.Title>
								<Card.Text>{note.hp_add}</Card.Text> */}
                <ListGroup className="list-group-flush">
                  {console.log(note)}
                  <ListGroupItem>
                    <b>Name : </b>
                    {note.farmer.farmer_name}
                  </ListGroupItem>
                  <ListGroupItem>
                    <b>Cause :</b> {note.cause}
                  </ListGroupItem>
                  <ListGroupItem>
                    <b>Date :</b> {note.date}
                  </ListGroupItem>
                  <ListGroupItem>
                    <b>Cost :</b> {note.inr} INR
                  </ListGroupItem>
                </ListGroup>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-evenly",
                  }}
                >
                  <div>
                    <Link to={`/view`} state={{ info: note }}>
                      <Button variant="btn btn-dark">View More</Button>
                    </Link>
                  </div>
                  <div>
                    <Button
                      variant="success"
                      onClick={() =>
                        signInsurance(note.id, note.cost, note.farmer_address)
                      }
                    >
                      Sign
                    </Button>
                  </div>
                  <div>
                    <Button
                      variant="primary"
                      onClick={() => download(note.ipfs)}
                    >
                      Download File
                    </Button>
                  </div>
                </div>
              </Card.Body>
              <Card.Footer></Card.Footer>
            </Card>

            <br></br>
          </div>
        ))}
      </div>
    </>
  );
}

export default Insurance_Provider;
