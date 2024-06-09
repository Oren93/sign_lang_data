import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Upload from './pages/Upload';
import ThankYou from './pages/ThankYou'; // Import the new Thank You page

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <header>
          <nav>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/about">About</a></li>
              <li><a href="/contact">Contact</a></li>
            </ul>
          </nav>
        </header>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/about" component={About} />
          <Route path="/contact" component={Contact} />
          <Route path="/upload" component={Upload} />
          <Route path="/thank-you" component={ThankYou} /> {/* Add the new route */}
        </Switch>
        <footer>
          <p>Footer content goes here</p>
        </footer>
      </div>
    </Router>
  );
};

export default App;
