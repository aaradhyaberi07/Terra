import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  Row,
  Card,
  Button,
  ListGroup,
  ListGroupItem,
  Col,
} from "react-bootstrap";
import Navvbar from "./components/navbar";

export default function View() {
  const [data, setData] = useState([]);
  const [extra, setExtra] = useState([]);
  const here = useLocation();

  useEffect(() => {
    console.log(here.state.info);
    setData(JSON.parse(JSON.stringify(here.state.info)));
    setExtra(JSON.parse(JSON.stringify(here.state.info[10])));
  }, []);

  return (
    <div>
      <Navvbar></Navvbar>
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
              "linear-gradient(102deg, rgb(13, 68, 136) -9.99%, rgb(250 255 170) -9.98%, rgba(186, 238, 255, 0.23) 131.09%)",
          }}
        >
          <ListGroup className="list-group-flush">
            <ListGroupItem>
              <b>Claim ID :</b> {data[0]}
            </ListGroupItem>
            <ListGroupItem>
              <b>Farmer Name :</b> {extra[0]}
            </ListGroupItem>
            <ListGroupItem>
              <b>Farmer Age : </b>
              {extra[1]}
            </ListGroupItem>
            <ListGroupItem>
              <b>Farmer Sex : </b>
              {extra[2]}
            </ListGroupItem>
            <ListGroupItem>
              <b>Cost :</b> {data[9]} INR
            </ListGroupItem>
            <ListGroupItem>
              <b>Cost :</b> {data[1]} TC ( 1TC = 20 INR )
            </ListGroupItem>
            <ListGroupItem>
              <b>Insurance Sign : </b>
              {data[2] ? "YES" : "NO"}
            </ListGroupItem>
            <ListGroupItem>
              <b>Cause :</b> {data[3]}
            </ListGroupItem>
            <ListGroupItem>
              <b>Date :</b> {data[4]}
            </ListGroupItem>
            <ListGroupItem>
              <b>Location : </b>
              {data[8]}
            </ListGroupItem>
            <ListGroupItem>
              <b>Farmer Address:</b> {data[5]}
            </ListGroupItem>
            <ListGroupItem>
              <b>Insurance provider address :</b>
              {data[6]}
            </ListGroupItem>
            <ListGroupItem>
              <b>IPFS Hash : </b>
              {data[7]}
            </ListGroupItem>
          </ListGroup>
        </Card.Body>
        <Card.Footer className="text-muted"></Card.Footer>
      </Card>
    </div>
  );
}
