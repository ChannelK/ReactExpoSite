import React, { Component } from 'react';
import NavButton from './components/NavButton';
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
    
    this.navTriggers = {
      "about":this.handleAboutBtn,
      "splash":this.handleSplashBtn,
      "groundr":this.handleGroundrBtn,
      "grindquest":this.handleGrindQuestBtn
    }
    this.state = {activePage: "splash",
                  menuOpen: false}
  }
  
  handleAboutBtn() {
    this.setState(prevState => ({
      activePage: "about",
      menuOpen: false
    }));
  }
  
  handleSplashBtn() {
    this.setState(prevState => ({
      activePage: "splash",
      menuOpen: false
    }));      
  }
  
  handleGroundrBtn() {
    this.setState(prevState => ({
      activePage: "groundr",
      menuOpen: false
    })); 
  }
  
  handleGrindQuestBtn() {
    this.setState(prevState => ({
      activePage: "grindquest",
      menuOpen: false
    })); 
  }
  
  handleMenuToggle() {
    //if the menu is open, close it, otherwise open it. Set the new state.
    this.setState(prevState => ({
      menuOpen: !this.state.menuOpen
    })); 
  }
  renderPage(pageName) {
    if (pageName==="splash")
      return <Splash navTriggers={this.navTriggers}/>;
    else if (pageName === "about")
      return <About/>;
    else if (pageName === "groundr") 
      return <Groundr/>;
    else if (pageName === "grindquest") 
      return <GrindQuest/>;
  }
  
  render() {
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
                    <li><NavButton activePage={this.state.activePage} navId="splash"     navLabel="Splash"         navLink={this.handleSplashBtn}/>    </li>
                    <li><NavButton activePage={this.state.activePage} navId="groundr"    navLabel="Groundr"        navLink={this.handleGroundrBtn}/>   </li>
                    <li><NavButton activePage={this.state.activePage} navId="grindquest" navLabel="GrindQuest WIP" navLink={this.handleGrindQuestBtn}/></li>
                    <li><NavButton activePage={this.state.activePage} navId="tbd"        navLabel="Placeholder"/>                                      </li>
                    <li><NavButton activePage={this.state.activePage} navId="about"      navLabel="About"          navLink={this.handleAboutBtn}/>     </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </header>
        {this.renderPage(this.state.activePage)}
      </div>
    );
  }
}

export default Site;
