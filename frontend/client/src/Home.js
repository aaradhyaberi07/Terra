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
import AddProductFarmer from "./components/supplychainComponents/AddProductFarmer";
import ViewProductsToBuy from "./components/supplychainComponents/ViewProductsToBuy";

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
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" exact element={<LandingPage />} />

          <Route path="/login" element={<Log />} />
          <Route path="/register" element={<Reg />} />
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
            path="/buyproduct"
            element={
              <RequireSupplyChain>
                <ViewProductsToBuy />
              </RequireSupplyChain>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default Home;
