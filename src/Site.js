import React, { Component } from 'react';
import Splash from './components/Splash';
import About from './components/About';
import logo from './logo.svg';
import './Site.css';

class Site extends Component {
  constructor(props) {
    super(props);
    this.pages = {
        "Splash" : <Splash/>,
        "About" : <About/>
    };
    this.state = {activePage: "Splash"}
    this.handleAboutBtn = this.handleAboutBtn.bind(this);
    this.handleSplashBtn = this.handleSplashBtn.bind(this);
  }
  
  handleAboutBtn() {
    this.setState(prevState => ({
      activePage: "About"
    }));
  }
  
  handleSplashBtn() {
    this.setState(prevState => ({
      activePage: "Splash"
    }));      
  }
  
  render() {
    var content = this.pages[this.state.activePage];
    return (
      <div className="Site">
        <header className="Site-header">
          <div className="Nav-bar">
            <div className="Nav-home" onClick={this.handleSplashBtn}>
              <img src={logo} className="Site-logo" alt="logo" />
              <h1 className="Site-title">Coffee Time</h1>
            </div>
            <div className="Nav-btns">
              <button className="Nav-btn" onClick={this.handleSplashBtn}>
                Splash
              </button>
              <button className="Nav-btn" onClick={this.handleAboutBtn}>
                About
              </button>
            </div>
          </div>
        </header>
        {content}
      </div>
    );
  }
}

export default Site;
