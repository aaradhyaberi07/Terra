import React, { Component } from "react";
import Home from "./Home";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/css/bootstrap.min.css";

class App extends Component {
  state = { storageValue: 0, web3: null, accounts: null, contract: null };

  render() {
    return (
      <div>
        <Home />

        {/* <h1>Good to Go!</h1>
        <p>Your Truffle Box is installed and ready.</p>
        <h2>Smart Contract Example</h2>
        <p>
          If your contracts compiled and migrated successfully, below will show
          a stored value of 5 (by default).
        </p>
        <p>
          Try changing the value stored on <strong>line 42</strong> of App.js.
        </p>
        <div>The stored value is: {this.state.storageValue}</div> */}
      </div>
    );
  }
}

export default App;
