import React, { useEffect } from "react";
import Navbar from "./navbar.js";

import "../static/css/bootstrap-icons.css";
import "../static/css/bootstrap.min.css";
import "../static/css/owl.theme.default.min.css";
import "../static/css/templatemo-medic-care.css";
import { useNavigate, Link } from "react-router-dom";

import Footer from "./footer/footer";

import styles from "./LandingPage/UpperSection/UpperSection.module.css";

import Buttons from "./Button/Button";
import logo from "../static/images/logo2.png";
import farmer from "../static/images/farmer.jpg";
import tractor from "../static/images/tractor.jpg";

// import "../static/js";

function LandingPage() {
  async function check() {
    const { ethereum } = window;
    if (ethereum == null) {
      alert("You need to have metamask to run this application");
      window.location.reload();
      return;
    }
    await window.ethereum.enable();
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
  }

  useEffect(() => {
    check();
  }, []);

  const navigate = useNavigate();
  const goToSignUp = () => {
    navigate("/register");
  };

  const goToSignIn = () => {
    navigate("/login");
  };

  const seenotifs = () => {
    navigate("/notifs");
  };

  const buycoin = () => {
    navigate("/buy");
  };
  return (
    //register
    <div>
      <div id="main">
        <div className={styles.Wrapper}>
          <div className={styles.LogoWrapper}>
            <img className={styles.Logo} src={logo}></img>
          </div>
        </div>
        <section style={{ marginBottom: "130px" }} className="hero" id="hero">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div
                  id="myCarousel"
                  className="carousel slide carousel-fade"
                  data-bs-ride="carousel"
                >
                  <div className="carousel-inner">
                    <div className="carousel-item active">
                      <img
                        style={{
                          marginTop: "180px",
                          width: "320px",
                          marginLeft: "140px",
                        }}
                        src={tractor}
                        className="img-fluid"
                        alt=""
                      />
                    </div>
                  </div>
                </div>

                <div className="heroText " style={{ top: "250px" }}>
                  <h1 className="mt-auto mb-2">
                    Better
                    <div className="animated-info">
                      <span
                        style={{ color: "#34cc03" }}
                        className="animated-item"
                      >
                        Farming
                      </span>
                      <span
                        style={{ color: "#34cc03" }}
                        className="animated-item"
                      >
                        Returns
                      </span>
                      <span
                        style={{ color: "#34cc03" }}
                        className="animated-item"
                      >
                        lives
                      </span>
                    </div>
                  </h1>

                  <p className="mb-4">
                    Terra is a one-stop solution for making our agriculture
                    industry more efficient, transparent and accountable
                  </p>

                  <div className="heroLinks d-flex flex-wrap align-items-center">
                    <div className={styles.Buttons}>
                      <Buttons
                        wrapperClass={styles.ButtonStyle1}
                        content="Sign Up"
                        onClick={goToSignUp}
                      />
                      <div style={{ marginLeft: "20px" }}>
                        <Buttons
                          wrapperClass={styles.ButtonStyle2}
                          isNotBorder
                          content="Sign In"
                          onClick={goToSignIn}
                        />
                      </div>
                    </div>
                    <div
                      style={{ marginTop: "10px" }}
                      className="heroLinks d-flex flex-wrap align-items-center"
                    >
                      <Buttons
                        wrapperClass={styles.ButtonStyle1}
                        isNotBorder
                        content="See Notifications"
                        onClick={seenotifs}
                      />
                      <div style={{ marginLeft: "20px" }}>
                        <Buttons
                          wrapperClass={styles.ButtonStyle2}
                          isNotBorder
                          content="Buy Coin"
                          onClick={buycoin}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section-padding" id={styles.about}>
          <div className="container">
            <div className="row">
              <div className="col-lg-6 col-md-6 col-12">
                <h2 className="mb-lg-3 mb-3">About Terra</h2>

                <p style={{ color: "black" }}>
                  We present Terra, a one-stop platform to combat several
                  administrative issues that plague our agriculture industry. We
                  plan to tackle this lack of transparency, honesty and morality
                  by using blockchain technology.
                </p>

                <p style={{ color: "black" }}>
                  Our platform aims to introduce blockchain technology into
                  various spheres of the agriculture industry system to ensure
                  more efficiency, accountability and transparency.
                </p>
              </div>

              <div className="col-lg-4 col-md-5 col-12 mx-auto">
                <div className="featured-circle bg-white shadow-lg d-flex justify-content-center align-items-center">
                  <img src={farmer} className="img-fluid" alt="" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section-padding pb-0" id="timeline">
          <div className="container">
            <div className="row">
              <h2 className="text-center mb-lg-5 mb-4">Our Services</h2>

              <div className="timeline">
                <div className="row g-0 justify-content-end justify-content-md-around align-items-start timeline-nodes">
                  <div className="col-9 col-md-5 me-md-4 me-lg-0 order-3 order-md-1 timeline-content bg-white shadow-lg">
                    <h3
                      style={{ background: "rgb(70 209 35)" }}
                      className=" text-light"
                    >
                      Check Notices
                    </h3>

                    <p>
                      Stay updated with the latest notices and information about
                      weather, threats, prices, etc.
                    </p>
                  </div>

                  <div className="col-3 col-sm-1 order-2 timeline-icons text-md-center">
                    <i
                      style={{ color: "rgb(70 209 35)" }}
                      className="bi-patch-check-fill timeline-icon"
                    ></i>
                  </div>

                  <div className="col-9 col-md-5 ps-md-3 ps-lg-0 order-1 order-md-3 py-4 timeline-date"></div>
                </div>

                <div className="row g-0 justify-content-end justify-content-md-around align-items-start timeline-nodes my-lg-5 my-4">
                  <div className="col-9 col-md-5 ms-md-4 ms-lg-0 order-3 order-md-1 timeline-content bg-white shadow-lg">
                    <h3
                      style={{ background: "rgb(70 209 35)" }}
                      className=" text-light"
                    >
                      Transforming supply chains
                    </h3>

                    <p>
                      We use blockchain to make supply chains
                      efficient,transparent and curb malpractices
                    </p>
                  </div>

                  <div className="col-3 col-sm-1 order-2 timeline-icons text-md-center">
                    <i
                      style={{ color: "rgb(70 209 35)" }}
                      className="bi-book timeline-icon"
                    ></i>
                  </div>

                  <div className="col-9 col-md-5 pe-md-3 pe-lg-0 order-1 order-md-3 py-4 timeline-date"></div>
                </div>

                <div className="row g-0 justify-content-end justify-content-md-around align-items-start timeline-nodes">
                  <div className="col-9 col-md-5 me-md-4 me-lg-0 order-3 order-md-1 timeline-content bg-white shadow-lg">
                    <h3
                      style={{ background: "rgb(70 209 35)" }}
                      className=" text-light"
                    >
                      Claim Insurance
                    </h3>

                    <p>
                      We make claiming insurance an easy, smooth and hassle-free
                      process.
                    </p>
                  </div>

                  <div className="col-3 col-sm-1 order-2 timeline-icons text-md-center">
                    <i
                      style={{ color: "rgb(70 209 35)" }}
                      className="bi-file-medical timeline-icon"
                    ></i>
                  </div>

                  <div className="col-9 col-md-5 ps-md-3 ps-lg-0 order-1 order-md-3 py-4 timeline-date"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Footer></Footer>
      </div>
    </div>
  );
}

export default LandingPage;
