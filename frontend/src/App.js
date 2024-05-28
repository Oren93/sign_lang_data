import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./styles/App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Recorder from "./components/Recorder";

const App = () => {
  return (
    <Router>
      <div className="App">
        <Header />
        <main>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/about" component={About} />
            <Route path="/contact" component={Contact} />
            <Route path="/record" component={Recorder} />
          </Switch>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
