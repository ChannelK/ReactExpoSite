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
    //this.activePage = "Splash";
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
    //var content = this.pages[this.activePage];
    var content = this.pages[this.state.activePage];
    return (
      <div className="Site">
        <header className="Site-header">
          <img src={logo} className="Site-logo" alt="logo" />
          <h1 className="Site-title">Welcome to React</h1>
          <button className="Splash-btn" onClick={this.handleSplashBtn}>
            Splash
          </button>
          <button className="About-btn" onClick={this.handleAboutBtn}>
            About
          </button>
        </header>
        {content}
      </div>
    );
  }
}

export default Site;
