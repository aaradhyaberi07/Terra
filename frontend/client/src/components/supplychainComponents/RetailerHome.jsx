import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function DistributorHome() {
	return (
		<div className="container container-fluid login-conatiner">
			<div style={{ padding: "5px" }}>
				<div className="d-flex flex-row-reverse btn btn-dark btn-lg btn-block">
					<Link to="/logout">
						<Button variant="secondary">Logout</Button>
					</Link>{" "}
					{/* <Link to="/logout">
            <Button variant="secondary">Logout</Button>
          </Link>{" "} */}
					<Link style={{ marginRight: "1100px" }} to="/">
						<Button variant="secondary">Home</Button>
					</Link>{" "}
				</div>
			</div>
			<Container style={{ paddingTop: "100px" }}>
				<Row style={{ paddingLeft: "160px" }}>
					<Col sm>
						<Card className="inner-prop" style={{ borderRadius: "25px" }}>
							<Card.Img
								style={{
									width: 286,
									height: 160,
									borderRadius: "25px",
									marginLeft: "8px",
								}}
								variant="top"
								src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvn1uYhlehYt1O51oW41l_it3umvhi_n3_oQ&usqp=CAU"
							/>
							<Card.Body>
								<Card.Title>
									<b>Insurance</b>
								</Card.Title>
								<Card.Text>File an Insurance claim in a few clicks. Just mention your disease, hospital name,amount,select the date and upload necessary files.</Card.Text>
								<Link to="/farmer/claim">
									<Button variant="btn btn-dark" style={{ marginLeft: "18%" }}>
										File Insurance Claim
									</Button>
								</Link>{" "}
							</Card.Body>
						</Card>
					</Col>
					<Col sm>
						<Card className="inner-prop" style={{ borderRadius: "25px" }}>
							<Card.Img
								style={{
									width: 286,
									height: 160,
									borderRadius: "25px",
									marginLeft: "8px",
								}}
								variant="top"
								src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTzGfL87G917Q1wFaBVMFMtE7J4SXfdBem2Q&usqp=CAU"
							/>
							<Card.Body>
								<Card.Title>
									<b>See Notifications</b>
								</Card.Title>
								<Card.Text>Check notifications regarding number of ICU beds, ventilator beds, oxygen cylinders and vaccine doses at various hospitals.</Card.Text>
								<Link to="/farmer/notifs">
									<Button variant="btn btn-dark" style={{ marginLeft: "20%" }}>
										Check Notifications
									</Button>
								</Link>{" "}
							</Card.Body>
						</Card>
					</Col>
					<Col sm>
						<Card className="inner-prop" style={{ borderRadius: "25px" }}>
							<Card.Img
								style={{
									width: 286,
									height: 160,
									borderRadius: "25px",
									marginLeft: "8px",
								}}
								variant="top"
								src="https://previews.123rf.com/images/j33p3l2/j33p3l21610/j33p3l2161000036/64752167-yellow-paddy-jasmine-rice-on-wood-background-ready-to-use-for-website-or-poster-.jpg"
							/>
							<Card.Body>
								<Card.Title>
									<b>Buy Product</b>
								</Card.Title>
								<Card.Text>Buy a new product put up for sale by farmers. Please check the product name, notes and other details before the purchase.</Card.Text>
								<Link to="/buyproduct">
									<Button variant="btn btn-dark" style={{ marginLeft: "20%" }}>
										Buy Product
									</Button>
								</Link>{" "}
							</Card.Body>
						</Card>
					</Col>
				</Row>
			</Container>
		</div>
	);
}

export default DistributorHome;
