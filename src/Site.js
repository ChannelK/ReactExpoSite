import React, { Component } from 'react';
import Splash from './components/Splash';
import About from './components/About';
import Groundr from './components/groundr/Groundr';
import GrindQuest from './components/grindquest/GrindQuest';
import logo from './logo.svg';
import menuIcon from './menu-icon.svg';
import './Site.css';

class Site extends Component {
  constructor(props) {
    super(props);
    
    this.handleMenuToggle = this.handleMenuToggle.bind(this);
    
    this.handleAboutBtn = this.handleAboutBtn.bind(this);
    this.handleSplashBtn = this.handleSplashBtn.bind(this);
    this.handleGroundrBtn = this.handleGroundrBtn.bind(this);
    this.handleGrindQuestBtn = this.handleGrindQuestBtn.bind(this);
    
    const navTriggers = {
      "about":this.handleAboutBtn,
      "splash":this.handleSplashBtn,
      "groundr":this.handleGroundrBtn,
      "grindquest":this.handleGrindQuestBtn
    }
    this.pages = {
        "Splash" : <Splash navTriggers={navTriggers}/>,
        "About" : <About/>,
        "Groundr": <Groundr/>,
        "GrindQuest": <GrindQuest/>
    };
    this.state = {activePage: "Splash",
                  menuOpen: false}
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
  
  handleGrindQuestBtn() {
    this.setState(prevState => ({
      activePage: "GrindQuest",
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
                      <button className={"Nav-btn clickable Nav-btn-" + (this.state.activePage==="Splash"?"selected":"unselected")} id="splashNav" onClick={this.handleSplashBtn}>
                        Splash
                      </button>
                    </li>
                    <li>
                      <button className={"Nav-btn clickable Nav-btn-" + (this.state.activePage==="Groundr"?"selected":"unselected")} id="groundrNav" onClick={this.handleGroundrBtn}>
                        Groundr
                      </button>
                    </li>
                    <li>
                      <button className={"Nav-btn clickable Nav-btn-" + (this.state.activePage==="GrindQuest"?"selected":"unselected")} id="grindquestNav" onClick={this.handleGrindQuestBtn}>
                        GrindQuest WIP
                      </button>
                    </li>
                    <li>
                      <button className={"Nav-btn clickable Nav-btn-" + (this.state.activePage==="Placeholder"?"selected":"unselected")} id="tbdNav">
                        Placeholder
                      </button>
                    </li>
                    <li>
                      <button className={"Nav-btn clickable Nav-btn-" + (this.state.activePage==="About"?"selected":"unselected")} id="aboutNav" onClick={this.handleAboutBtn}>
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
