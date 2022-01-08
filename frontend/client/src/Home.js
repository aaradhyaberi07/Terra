import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
  useLocation,
  Navigate,
  Outlet,
} from "react-router-dom";

//Components
import LandingPage from "./components/LandingPage";
import Reg from "./components/temp/register";
import Log from "./components/temp/login";
import Profile from "./components/temp/profile";

import BuyCoin from "./components/BuyCoin/BuyCoin.js";

import FarmerHome from "./components/farmerComponents/FarmerHome";
import AddProductFarmer from "./components/supplychainComponents/AddProductFarmer";
import FarmerClaim from "./components/farmerComponents/FarmerClaim";
import ClaimsFarmer from "./components/farmerComponents/claims";

import ViewProductsToBuy from "./components/supplychainComponents/ViewProductsToBuy";
import ViewUserProducts from "./components/supplychainComponents/ViewUserProducts";

import Insurance_Provider from "./components/insuranceComponents/insurance_sign.js";

import AdminNotif from "./components/adminComponents/AdminNotif";

function Home() {
  function RequireAuth({ children }) {
    const data = JSON.parse(localStorage.getItem("creds"));
    if (data) {
      return children;
    }
    alert("You must login to view this page");
    return <Navigate to="/login" />;
  }

  function RequireFarmer({ children }) {
    const data = JSON.parse(localStorage.getItem("creds"));
    if (!data) {
      alert("You must login to view this page");
      return <Navigate to="/login" />;
    }
    if (data.type != "F") {
      alert("You must be a farmer to view this page");
      return <Navigate to="/" />;
    }
    return children;
  }

  function RequireInsurance({ children }) {
    const data = JSON.parse(localStorage.getItem("creds"));
    if (!data) {
      alert("You must login to view this page");
      return <Navigate to="/login" />;
    }
    if (data.type != "I") {
      alert("You must be an insurance provider to view this page");
      return <Navigate to="/" />;
    }
    return children;
  }

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" exact element={<LandingPage />} />

          <Route path="/login" element={<Log />} />
          <Route path="/register" element={<Reg />} />
          <Route path="/buy" element={<BuyCoin />} />

          <Route
            path="/profile"
            element={
              <RequireAuth>
                <Profile />
              </RequireAuth>
            }
          />
          <Route
            path="/farmer/home"
            element={
              <RequireFarmer>
                <FarmerHome />
              </RequireFarmer>
            }
          />
          <Route
            path="/farmer/addproduct"
            element={
              <RequireFarmer>
                <AddProductFarmer />
              </RequireFarmer>
            }
          />
          <Route
            path="/farmer/list"
            element={
              <RequireFarmer>
                <ClaimsFarmer />
              </RequireFarmer>
            }
          />
          <Route
            path="/farmer/claim"
            element={
              <RequireFarmer>
                <FarmerClaim />
              </RequireFarmer>
            }
          />

          <Route
            path="/buyproduct"
            element={
              <RequireSupplyChain>
                <ViewProductsToBuy />
              </RequireSupplyChain>
            }
          />
          <Route
            path="/productview"
            element={
              <RequireSupplyChain>
                <ViewUserProducts />
              </RequireSupplyChain>
            }
          />

          <Route
            path="/provider"
            element={
              <RequireInsurance>
                <Insurance_Provider />
              </RequireInsurance>
            }
          />

          <Route
            path="/admin/notif"
            element={
              <RequireAdmin>
                <AdminNotif />
              </RequireAdmin>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default Home;
