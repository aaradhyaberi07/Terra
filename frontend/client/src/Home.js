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

function Home() {
  function RequireAuth({ children }) {
    const data = JSON.parse(localStorage.getItem("creds"));
    if (data) {
      return children;
    }
    alert("You must login to view this page");
    return <Navigate to="/login" />;
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
            path="/farmer/addproduct"
            element={
              <RequireFarmer>
                <AddProductFarmer />
              </RequireFarmer>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default Home;
