import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "./styles/App.css";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import Recorder from "./components/Recorder.jsx";
import Login from "./components/Login.jsx";
import Signup from "./components/Register.jsx";
import { UserContext } from "./context/UserContext";

const App = () => {
  const { user, setToken, setUser } = useContext(UserContext);

  const handleLogout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("signLangRecToken");
  };

  return (
    <Router>
      <div className="App">
        <Header isAuthenticated={user} handleLogout={handleLogout} />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/record"
              element={user ? <Recorder /> : <Navigate to="/login" />}
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
