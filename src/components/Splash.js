import React, { Component } from 'react';
import '../Site.css';
import LaunchIcon from './LaunchIcon';
import MugIcon from '../assets/FancyG.png';
import BeanIcon from '../assets/Bean.png';

class Splash extends Component {
  
  render() {
    return (
      <div className="Splash-root">
        <h1 className="Splash-title">Caffeinated Apps</h1>
        <p className="Splash-intro">
          Click any of the app icons to get started.
        </p>
        <div className="App-grid-container">
            <div className="App-grid-item">
                <LaunchIcon icon={BeanIcon} navTrigger={this.props.navTriggers.groundr} label="Groundr"/>
            </div>
            <div className="App-grid-item">
                <LaunchIcon icon={MugIcon} navTrigger={this.props.navTriggers.grindquest} label="GrindQuest"/>
            </div>
        </div>
      </div>
    );
  }
}
export default Splash;