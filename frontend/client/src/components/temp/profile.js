import React, { useState, useEffect } from "react";
import { getProfile, upProfile } from "./utils";

import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Navvbar from "../navbar";

const Profile = () => {
  const [name, setName] = useState("");
  const [sex, setSex] = useState("");
  const [age, setAge] = useState(0);
  const [run, setRun] = useState(false);
  // useEffect(() => {
  // 	console.log(name);
  // });

  const creds = JSON.parse(localStorage.getItem("creds"));

  async function SeeProfile() {
    setRun(true);
    const data = await getProfile(creds.access);
    setName(data[0].name);
    setSex(data[0].sex);
    setAge(data[0].age);
    console.log(data[0].type);
  }

  async function UpdateProfile() {
    console.log(age);
    const data = await upProfile(name, age, sex, creds.access, creds.username);
    window.location = `/profile`;
  }

  if (!run) SeeProfile();
  return (
    <>
      <Navvbar></Navvbar>
      <div className="container container-fluid login-conatiner">
        <div className="outer">
          <div
            style={{
              background:
                "linear-gradient(63.31deg, rgb(221, 161, 31) -9.99%, rgb(17 233 255) -9.98%, rgba(193, 218, 226, 0.23) 131.09%)",
            }}
            className="inner"
          >
            <form>
              <h3>Profile</h3>

              <div className="form-group">
                <label>Name</label>
                <input
                  required
                  onChange={(e) => setName(e.target.value)}
                  className="form-control"
                  type="text"
                  placeholder={name}
                  required
                />
              </div>
              <div className="form-group">
                <label>Sex</label>

                <input
                  required
                  onChange={(e) => setSex(e.target.value)}
                  className="form-control"
                  type="text"
                  placeholder={sex}
                  required
                ></input>
              </div>
              <div className="form-group">
                <label>Age</label>
                <input
                  required
                  onChange={(e) => setAge(e.target.value)}
                  id="inline-form-age"
                  className="form-control"
                  type="number"
                  placeholder={age}
                  required
                />
              </div>
              <div style={{ textAlign: "center" }}>
                <button
                  onClick={UpdateProfile}
                  type="submit"
                  className="btn btn-dark"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
export default Profile;
