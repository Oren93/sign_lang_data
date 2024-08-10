import React, { useContext } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { UserContext } from "./context/UserContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Recorder from "./components/Recorder";
import Login from "./components/Login";
import Register from "./components/Register";
import VideoRating from "./components/VideoRating";
import DataAccess from "./pages/DataAccess"; 

const App = () => {
  const { user, setToken, setUser } = useContext(UserContext);

  const handleLogout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("signLangRecToken");
  };

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-100">
        <Header isAuthenticated={user} handleLogout={handleLogout} />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Register />} />
            <Route
              path="/record"
              element={user ? <Recorder /> : <Navigate to="/login" />}
            />
            <Route
              path="/rate"
              element={user ? <VideoRating /> : <Navigate to="/login" />}
            />
            <Route  // Add this new route
              path="/data-access"
              element={user ? <DataAccess /> : <Navigate to="/login" />}
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;