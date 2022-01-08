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

export default function ViewSupply() {
  const [data, setData] = useState([]);
  const here = useLocation();

  useEffect(() => {
    console.log("Data : ", here.state.info);
    setData(JSON.parse(JSON.stringify(here.state.info)));
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
              "linear-gradient(86deg, rgb(13, 68, 136) -9.99%, rgb(166 255 144) -9.98%, rgba(186, 238, 255, 0.23) 131.09%)",
          }}
        >
          <ListGroup className="list-group-flush">
            <ListGroupItem>
              <b>Name: {data[1]}</b>
            </ListGroupItem>
            <ListGroupItem>
              <b>Product-Code:</b> {data[0]}
            </ListGroupItem>
            <ListGroupItem>
              <b>Units:</b> {data[2]}
            </ListGroupItem>
            <ListGroupItem>
              <b>Produce Date:</b> {data[3]}
            </ListGroupItem>
            <ListGroupItem>
              <b>Farmer Selling Price:</b> {data[9]}
            </ListGroupItem>
            <ListGroupItem>
              <b>WholeSale Price:</b> {data[10]}
            </ListGroupItem>
            <ListGroupItem>
              <b>Maximum Retail Price:</b> {data[11]}
            </ListGroupItem>
            <ListGroupItem>
              <b>Farmer ID:</b> {data[8]}
            </ListGroupItem>
            <ListGroupItem>
              <b>Distributor ID:</b> {data[5]}
            </ListGroupItem>
            <ListGroupItem>
              <b>Retailer ID:</b> {data[6]}
            </ListGroupItem>
            <ListGroupItem>
              <b>Consumer ID:</b> {data[7]}
            </ListGroupItem>
          </ListGroup>
        </Card.Body>
        <Card.Footer className="text-muted"></Card.Footer>
      </Card>
    </div>
  );
}
