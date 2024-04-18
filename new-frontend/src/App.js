import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import './App.css';

function App() {
  const [isSignedIn, setIsSignedIn] = useState(true);

  const requiresLogin = (Component) => {
    return isSignedIn ? Component : <Navigate to="/login" />;
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage isSignedIn={isSignedIn} setIsSignedIn={setIsSignedIn}/>} />
        <Route
          path="*"
          element={requiresLogin(<DashboardPage />)}
        />
      </Routes>
    </Router>
  );
}

export default App;
