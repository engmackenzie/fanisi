import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";
import UsersPage from "./pages/UsersPage";

const App = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  const requiresLogin = (Component) => {
    return isSignedIn ? Component : <Navigate to="/login" />;
  };

  const onLogin = () => {
    setIsSignedIn(true);
  };

  useEffect(() => {
    
  }, []);

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage onLogin={onLogin} />} />
          <Route
            path="/users"
            element={requiresLogin(<UsersPage setIsSignedIn={setIsSignedIn} />)}
          />
          {/* Catch-all route for non-existent routes */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;