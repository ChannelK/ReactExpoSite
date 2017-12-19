import React, { Component } from 'react';
import Splash from './components/Splash';
import logo from './logo.svg';
import './Site.css';

class Site extends Component {
  constructor(props) {
    super(props);
    this.pages = {
        "Splash" : Splash
    };
    this.activePage = "Splash";
  }
  
  render() {
    return (
      <div className="Site">
        <header className="Site-header">
          <img src={logo} className="Site-logo" alt="logo" />
          <h1 className="Site-title">Welcome to React</h1>
        </header>
        <p className="Site-intro">
          To get started, edit <code>src/Site.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default Site;
