import React, { useState, useEffect } from "react";
import { login } from "./utils";

import Styles from "./SignInUp.module.css";

import styles from "../LandingPage/UpperSection/UpperSection.module.css";

import Buttons from "../Button/Button";
import LandingPage from "../LandingPage";

import { useNavigate, useLocation } from "react-router-dom";

const Log = () => {
  const [usernameL, setUserNameL] = useState("");
  const [passwordL, setpasswordL] = useState("");
  const [msgL, setmsgL] = useState("");
  const [first, setFirst] = useState(false);
  const [togL, setTogL] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  async function check() {
    if (location.pathname === "/login") {
      document.getElementById("sidenav").style.width = "500px";
    } else document.getElementById("sidenav").style.width = "0px";
  }

  useEffect(() => {
    check();
  }, []);

  async function Closenav() {
    navigate("/");
  }

  async function Login(e) {
    e.preventDefault();
    if (usernameL.length < 1 || passwordL.length < 1) {
      alert("Fields should not remain blank");
      return;
    }
    //console.log(usernameL, passwordL);
    const data = await login(usernameL, passwordL);
    console.log(data);
    if (data.status == "FAILED") {
      setmsgL(data.error);
      alert("Invalid credentials");
      window.location.reload();
    } else if (data.tokens) {
      setmsgL(`Hello, ${usernameL}`);
      localStorage.setItem(
        "creds",
        JSON.stringify({
          access: data.tokens.access,
          refresh: data.tokens.refresh,
          first: data.first_time_login,
          username: usernameL,
          type: data.type,
        })
      );

      if (data.first_time_login === true) {
        console.log("first time login");
        window.location = `/profile`;
      } else {
        console.log("not first time login");
        if (data.type == "F") {
          window.location = `/farmer/home`;
        } else if (data.type == "A") {
          window.location = `/admin/notif`;
        } else if (data.type == "D") {
          window.location = `/buyproduct`;
        } else if (data.type == "R") {
          window.location = `/buyproduct`;
        } else if (data.type == "C") {
          window.location = `/buyproduct`;
        } else {
          window.location = `/provider`;
        }
      }
    } else if (data.password) {
      setmsgL("Password :" + data.password[0]);
    } else if (data.username) {
      setmsgL("Username :" + data.username[0]);
    }
  }
  return (
    <>
      <LandingPage></LandingPage>
      <div>
        <div
          className={Styles.Wrapper}
          id="sidenav"
          style={{ padding: "40px" }}
        >
          <form>
            <div style={{ display: "flex" }}>
              <div style={{ flex: "1", marginLeft: "12px" }}>
                <h3>SignIn</h3>
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
                required
                onChange={(e) => setUserNameL(e.target.value)}
                id="login-email"
                type="text"
                className="form-control"
                placeholder="Username"
                required
              />
            </div>
            <div className="form-group">
              <input
                required
                onChange={(e) => setpasswordL(e.target.value)}
                id="login-password"
                type={togL ? "password" : "text"}
                className="form-control"
                placeholder="Password"
                required
              ></input>
            </div>
            <div style={{ textAlign: "center" }}>
              <Buttons
                wrapperClass={styles.ButtonStyle1}
                content="SignIn"
                onClick={Login}
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
export default Log;
