import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
  useLocation,
  Navigate,
  Outlet,
} from "react-router-dom";
import ReactDOM from "react-dom";
import Insurance from "../../contracts/Insurance.json";
import Web3 from "web3";
import ipfs from "./ipfs";
import {
  Row,
  Card,
  Button,
  ListGroup,
  ListGroupItem,
  Col,
} from "react-bootstrap";
import View from "../../info";
import Navvbar from "../navbar";
const crypto = require("crypto");
require("dotenv").config();

function ClaimsFarmer() {
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
    const cnt = await instance.methods._claimsByFarmersize(accounts[0]).call();
    let newClaim = [];
    setClaims(newClaim);
    newClaim = [];
    for (let i = 0; i < cnt; i++) {
      const res = await instance.methods._claimsByFarmer(accounts[0], i).call();
      newClaim.push(res);
    }
    setClaims(newClaim);
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

  // function temp(event) {
  // 	event.preventDefault();
  // 	<Navigate to="/view" />;
  // }

  return (
    <div>
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
              }}
            >
              <Card.Header></Card.Header>
              <Card.Body
                style={{
                  background:
                    "linear-gradient(11deg, rgb(13 68 136) -9.99%, rgb(170 220 255) -9.98%, rgb(186 238 255 / 23%) 131.09%)",
                }}
              >
                {/* <Card.Title>{note.hp_name}</Card.Title>
								<Card.Text>{note.hp_add}</Card.Text> */}
                <ListGroup className="list-group-flush">
                  <ListGroupItem>
                    <b>Cause :</b> {note.cause}
                  </ListGroupItem>
                  <ListGroupItem>
                    <b>Location :</b> {note.farmer_location}
                  </ListGroupItem>
                  <ListGroupItem>
                    <b>Date : </b>
                    {note.date}
                  </ListGroupItem>
                  <ListGroupItem>
                    <b>Cost :</b> {note.inr} INR
                  </ListGroupItem>
                  <ListGroupItem>
                    <b>Insurance Sign :</b> {note.insurance_sign ? "YES" : "NO"}
                  </ListGroupItem>
                </ListGroup>

                <div
                  style={{ display: "flex", justifyContent: "space-evenly" }}
                >
                  <Link to={`/view`} state={{ info: note }}>
                    <Button variant="btn btn-dark">View More</Button>
                  </Link>
                  <Button onClick={() => download(note.ipfs)}>
                    Download File
                  </Button>
                </div>
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

export default ClaimsFarmer;
