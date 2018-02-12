import React, { Component } from 'react';
import '../Site.css';

class LaunchIcon extends Component {
  
  render() {
    return (
      <div className="LaunchIcon-root App-selector clickable" onClick={this.props.navTrigger}>
        <img className="App-Icon" src={this.props.icon} alt={"Launch " + this.props.label}/>
        <span className="App-Label">{this.props.label}</span>
      </div>
      )
  }
}
export default LaunchIcon;