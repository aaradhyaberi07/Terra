import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import Notice from "../../contracts/Notice.json";
import Web3 from "web3";
import ipfs from "./ipfs";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import {
  Row,
  Card,
  Button,
  ListGroup,
  ListGroupItem,
  Col,
} from "react-bootstrap";

import terra from "../../static/images/logo.jpg";

import { Container, Navbar, Nav, Form } from "react-bootstrap";
import Navvbar from "../navbar";

const crypto = require("crypto");
require("dotenv").config();
const Listener = () => {
  const [notices, setNotices] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    see();
  }, []);
  async function see() {
    const web3 = new Web3(window.ethereum);
    const accounts = await web3.eth.getAccounts();
    const networkId = await web3.eth.net.getId();
    const deployedNetwork = Notice.networks[networkId];
    const instance = new web3.eth.Contract(
      Notice.abi,
      deployedNetwork && deployedNetwork.address
    );
    const res = await instance.methods.seeNotices().call();
    res.sort(function (a, b) {
      return b[0] - a[0];
    });
    console.log(res);
    setNotices(res);
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
    link.setAttribute("download", "info.pdf");
    document.body.appendChild(link);
    link.click();
  }
  return (
    <div>
      <Navvbar></Navvbar>
      <div className="container">
        {notices.map((note) => (
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
              <Card.Header style={{ backgroundColor: "#474a4e" }}></Card.Header>
              <Card.Body style={{ backgroundColor: "rgb(251 242 164)" }}>
                <ListGroup className="list-group-flush">
                  <ListGroupItem>
                    <b>Id :</b> {note[0]}
                  </ListGroupItem>
                  <ListGroupItem>
                    <b>Sender Address : </b>
                    {note[1]}
                  </ListGroupItem>
                  <ListGroupItem>
                    <b>Content :</b> {note[2]}
                  </ListGroupItem>
                  <ListGroupItem>
                    <b>IPFS :</b>IPFS : {note[3]}
                  </ListGroupItem>
                </ListGroup>
                <Button
                  style={{ backgroundColor: "#474a4e" }}
                  onClick={() => download(note.ipfs)}
                >
                  Download
                </Button>
              </Card.Body>
              <Card.Footer
                style={{ backgroundColor: "#474a4e", borderRadius: "0px" }}
                className="text-muted"
              ></Card.Footer>
            </Card>

            <br></br>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Listener;
