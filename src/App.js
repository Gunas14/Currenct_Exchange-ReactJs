import React from 'react';
import './App.css';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import nav from 'react-bootstrap/Nav';
import home from './components/home/home';
import history from './components/history/history';
import currency from './components/currency/currency';
import conversion from './components/conversion/conversion';

function App() {
  return (
    <Router>
      <div id="mainDiv">
      <nav className="navbar navbar-expand-lg navbar-dark  bg-primary">
        <Link className="navbar-brand" to="/home">Home</Link>
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link" to="/currency">Currency list</Link>
          </li> 
          <li className="nav-item">
            <Link className="nav-link" to="/history">History</Link>
          </li> 
          <li className="nav-item">
            <Link className="nav-link" to="/conversion">Conversion</Link>
          </li> 
        </ul>
      </nav>
        <Route exact path="/home" component={home} />
        <Route path="/currency" component={currency} />
        <Route path="/history" component={history} />
        <Route path="/conversion" component={conversion} />
      </div>
    </Router>
  );
}


export default App;
