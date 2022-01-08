import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { register } from "./utils";

import Styles from "./SignInUp.module.css";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import styles from "../LandingPage/UpperSection/UpperSection.module.css";

import Buttons from "../Button/Button";

import LandingPage from "../LandingPage";

const Reg = () => {
  //states and handler for register
  const [emailR, setEmailR] = useState("");
  const [usernameR, setUsernameR] = useState("");
  const [passwordR, setPassWordR] = useState("");
  const [typeR, setTypeR] = useState("");
  const [msgR, setmsgR] = useState("");
  const [togR, setTogR] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  async function check() {
    if (location.pathname === "/register") {
      document.getElementById("sidenav").style.width = "500px";
    } else document.getElementById("sidenav").style.width = "0px";
  }

  useEffect(() => {
    check();
  }, []);

  async function Closenav() {
    navigate("/");
  }

  async function Register(e) {
    e.preventDefault();
    if (passwordR.length < 1 || usernameR.length < 1 || emailR.length < 1) {
      alert("Fields should not remain blank");
      return;
    }
    //console.log(emailR, usernameR, passwordR, typeR);
    const data = await register(emailR, usernameR, passwordR, typeR);
    console.log(data);
    if (data.status === "OK") {
      setmsgR("Successful, You can now login");
      alert("Account created successfully. You can now log in");
    } else if (data.status == "FAILED") {
      setmsgR(data.error);
    } else {
      let msg = "";
      if (data.email) {
        msg = msg + " email:" + data.email[0] + "\n";
      }
      if (data.username) {
        msg = msg + " username :" + data.username[0] + "\n";
      }
      if (data.password) {
        msg = msg + " password :" + data.password[0];
      }
      setmsgR(msg);

      window.location = "/login";
    }
  }

  return (
    <>
      <LandingPage></LandingPage>
      <div
        className={Styles.Wrapper}
        id="sidenav"
        style={{ padding: "40px", display: "block" }}
      >
        <form>
          <div style={{ display: "flex" }}>
            <div style={{ flex: "1", marginLeft: "12px" }}>
              <h3>SignUp</h3>
            </div>
            <div>
              <button
                onClick={Closenav}
                type="button"
                className="btn-close"
                aria-label="Close"
                style={{ flex: "1", marginRight: "14px" }}
              ></button>
            </div>
          </div>
          <div className="form-group">
            <input
              className="form-control"
              placeholder="Email"
              value={emailR}
              onChange={(e) => setEmailR(e.target.value)}
              type="email"
              required
            />
          </div>
          <div className="form-group">
            <input
              className="form-control"
              placeholder="Username"
              value={usernameR}
              onChange={(e) => setUsernameR(e.target.value)}
              type="text"
              required
            />
          </div>
          <div className="form-group">
            <input
              className="form-control"
              placeholder="Password"
              value={passwordR}
              onChange={(e) => {
                setPassWordR(e.target.value);
              }}
              type={togR ? "password" : "text"}
              required
            />
          </div>
          <div className="form-group">
            {/* <input className="form-control" placeholder="Username" value={typeR} onChange={(e) => setTypeR(e.target.value)} type="text" required /> */}

            <select
              className="form-control"
              value={typeR}
              onChange={(e) => setTypeR(e.target.value)}
              name="Type"
            >
              <option value="F">Farmer</option>
              <option value="A">Admin</option>
              <option value="D">Distributor</option>
              <option value="R">Retailer</option>
              <option value="C">Consumer</option>
              <option value="I">Insurance</option>
            </select>
          </div>
          <div style={{ textAlign: "center" }}>
            <Buttons
              wrapperClass={styles.ButtonStyle1}
              content="SignUp"
              onClick={Register}
            />
          </div>
          <p className="forgot-password text-right">
            Already registered? <Link to="/login">Log in</Link>
          </p>
        </form>
      </div>
    </>
  );
};
export default Reg;
