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

function Home() {
  <div>
    <Router>
      <Routes>
        <Route path="/" exact element={<LandingPage />} />
      </Routes>
    </Router>
  </div>;
}

export default Home;
