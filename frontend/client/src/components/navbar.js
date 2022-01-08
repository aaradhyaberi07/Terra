import React, { Component } from "react";
import styles from "./LandingPage/UpperSection/UpperSection.module.css";
import { Navigate, useNavigate } from "react-router-dom";
// import Button from "./Button/Button";
import terra from "../static/images/logo.jpg";
import { Container, Navbar, Nav, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Navvbar = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Navbar
        style={{ paddingTop: "4px", paddingBottom: "4px" }}
        bg="light"
        expand="lg"
      >
        <Container fluid>
          <Navbar.Brand href="/">
            <img style={{ width: "120px" }} src={terra}></img>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            ></Nav>
            <Form className="d-flex">
              <Button
                style={{ marginRight: "30px" }}
                variant="warning"
                onClick={() => navigate(-1)}
              >
                Back
              </Button>
              <Link to="/buy">
                <Button style={{ marginRight: "30px" }} variant="success">
                  Buy
                </Button>
              </Link>

              <Link to="/logout">
                <Button style={{ marginRight: "30px" }} variant="danger">
                  Logout
                </Button>
              </Link>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Navvbar;
