import React, { Component } from 'react';
import Splash from './components/Splash';
import About from './components/About';
import Groundr from './components/groundr/Groundr';
import logo from './logo.svg';
import menuIcon from './menu-icon.svg';
import './Site.css';

class Site extends Component {
  constructor(props) {
    super(props);
    this.pages = {
        "Splash" : <Splash/>,
        "About" : <About/>,
        "Groundr": <Groundr/>
    };
    this.state = {activePage: "Splash",
                  menuOpen: false}
    
    this.handleMenuToggle = this.handleMenuToggle.bind(this);
    
    this.handleAboutBtn = this.handleAboutBtn.bind(this);
    this.handleSplashBtn = this.handleSplashBtn.bind(this);
    this.handleGroundrBtn = this.handleGroundrBtn.bind(this);
  }
  
  handleAboutBtn() {
    this.setState(prevState => ({
      activePage: "About",
      menuOpen: false
    }));
  }
  
  handleSplashBtn() {
    this.setState(prevState => ({
      activePage: "Splash",
      menuOpen: false
    }));      
  }
  
  handleGroundrBtn() {
    this.setState(prevState => ({
      activePage: "Groundr",
      menuOpen: false
    })); 
  }
  
  handleMenuToggle() {
    //if the menu is open, close it, otherwise open it. Set the new state.
    this.setState(prevState => ({
      menuOpen: !this.state.menuOpen
    })); 
  }
  
  render() {
    var content = this.pages[this.state.activePage];
    return (
      <div className="Site">
        <header className="Site-header">
          <div className="Nav-bar">
            <div className="Nav-home clickable" onClick={this.handleSplashBtn}>
              <img src={logo} className="Site-logo" alt="logo" />
              <h1 className="Site-title">Coffee Time</h1>
            </div>
            <div className="Nav-menu">
                <a className="Nav-toggle clickable" onClick={this.handleMenuToggle}>
                <img src={menuIcon} className="Nav-icon" alt="menu" />
              </a>
              <div className= {"Nav-btns " + (this.state.menuOpen? "Toggle-open" : "Toggle-close")}>
                <nav>
                  <ul className="Nav-btn-list">
                    <li>
                      <button className="Nav-btn clickable" onClick={this.handleSplashBtn}>
                        Splash
                      </button>
                    </li>
                    <li>
                      <button className="Nav-btn clickable" onClick={this.handleGroundrBtn}>
                        Groundr
                      </button>
                    </li>
                    <li>
                      <button className="Nav-btn clickable" onClick={this.handleAboutBtn}>
                        About
                      </button>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </header>
        {content}
      </div>
    );
  }
}

export default Site;
