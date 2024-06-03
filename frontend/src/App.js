import React from "react";
import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Redirect,
} from "react-router-dom";
import "./styles/App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Recorder from "./components/Recorder";
import Login from "./components/Login";
import Signup from "./components/Register";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(null);

  const handleLogin = (token) => {
    setIsAuthenticated(true);
    setToken(token);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setToken(null);
  };

  return (
    <Router>
      <div className="App">
        <Header isAuthenticated={isAuthenticated} handleLogout={handleLogout} />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/record" element={<Recorder />} />
            <Route path="/login" element={<Login />}>
              <Login handleLogin={handleLogin} />
            </Route>
            <Route path="/signup" element={<Signup />} />
            <Route path="/record">
              {isAuthenticated ? (
                <Recorder token={token} />
              ) : (
                <Redirect to="/login" />
              )}
            </Route>
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
