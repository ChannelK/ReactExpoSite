import React, { Component } from 'react';
import logo from '../logo.svg';
import '../Site.css';

class Splash extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <div className="Splash-root">
        <header className="Splash-header">
          <img src={logo} className="Site-logo" alt="logo" />
          <h1 className="Site-title">Welcome to React</h1>
        </header>
        <p className="Splash-intro">
          To get started, edit <code>src/Site.js</code> and save to reload.
        </p>
      </div>
    );
  }
}
export default Splash;