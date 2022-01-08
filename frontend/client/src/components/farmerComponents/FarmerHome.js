import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Card } from "react-bootstrap";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Navbar, Nav, Form, Button } from "react-bootstrap";
import terra from "../../static/images/logo.jpg";
import Buttons from "../Button/Button";
import styles from "../LandingPage/UpperSection/UpperSection.module.css";
import { useNavigate, Navigate } from "react-router-dom";

function FarmerHome() {
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
              <Link to="/farmer/list">
                <Button style={{ marginRight: "30px" }} variant="info">
                  See Claims
                </Button>
              </Link>

              <Link to="/notifs">
                <Button style={{ marginRight: "30px" }} variant="warning">
                  See Notifications
                </Button>
              </Link>
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
      <div className="container container-fluid login-conatiner">
        <Container>
          <Row>
            <Col style={{ paddingTop: "60px" }} className="border-right">
              <Card
                style={{
                  width: "35rem",
                  height: "13rem",
                  borderRadius: "20px",
                }}
              >
                <Row className="no-gutters">
                  <Col md={5} lg={5}>
                    <Card.Img
                      style={{
                        width: "230px",
                        paddingTop: "10px",
                        paddingLeft: "10px",
                        height: "190px",
                        borderRadius: "20px",
                      }}
                      variant="top"
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvn1uYhlehYt1O51oW41l_it3umvhi_n3_oQ&usqp=CAU"
                    />
                  </Col>
                  <Col>
                    <Card.Body>
                      <Card.Title>Claim Insurance</Card.Title>
                      <Card.Text>
                        Claim insurance for spoilt crop, weather damage, etc.
                        with the insurance company.
                      </Card.Text>
                      <Buttons
                        wrapperClass={styles.ButtonStyle2}
                        content="File Claim"
                        onClick={(event) =>
                          (window.location.href = "/farmer/claim")
                        }
                      />
                    </Card.Body>
                  </Col>
                </Row>
              </Card>
              <br></br>{" "}
              <Card
                style={{
                  width: "35rem",
                  height: "13rem",
                  borderRadius: "20px",
                }}
              >
                <Row className="no-gutters">
                  <Col md={5} lg={5}>
                    <Card.Img
                      style={{
                        width: "230px",
                        paddingTop: "10px",
                        paddingLeft: "10px",
                        height: "190px",
                        borderRadius: "20px",
                      }}
                      variant="top"
                      src="https://previews.123rf.com/images/j33p3l2/j33p3l21610/j33p3l2161000036/64752167-yellow-paddy-jasmine-rice-on-wood-background-ready-to-use-for-website-or-poster-.jpg"
                    />
                  </Col>
                  <Col>
                    <Card.Body>
                      <Card.Title>Add Product</Card.Title>
                      <Card.Text>
                        Add a new product to sell to the distributors. Please
                        keep details of the product at hand.
                      </Card.Text>
                      <Buttons
                        wrapperClass={styles.ButtonStyle2}
                        content="Add product"
                        onClick={(event) =>
                          (window.location.href = "/farmer/addproduct")
                        }
                      />
                    </Card.Body>
                  </Col>
                </Row>
              </Card>
            </Col>
            <Col>
              <div className="heroText " style={{ top: "250px" }}>
                <h1 className="mt-auto mb-2">
                  Better
                  <div className="animated-info">
                    <span
                      style={{ color: "#dda11f" }}
                      className="animated-item"
                    >
                      Farming
                    </span>
                    <span
                      style={{ color: "#dda11f" }}
                      className="animated-item"
                    >
                      Returns
                    </span>
                    <span
                      style={{ color: "#dda11f" }}
                      className="animated-item"
                    >
                      lives
                    </span>
                  </div>
                </h1>

                <p className="mb-4">
                  Elixir is a one-stop solution for making our medical system
                  more efficient, transparent and accountable
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default FarmerHome;
