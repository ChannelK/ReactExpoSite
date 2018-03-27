import React, { Component } from 'react';
import '../Site.css';

class LaunchIcon extends Component {
  
  render() {
    return (
      <span className="LaunchIcon-root App-selector clickable" onClick={this.props.navTrigger}>
        <img className="App-Icon" src={this.props.icon} alt={"Launch " + this.props.label}/>
        <div className="App-Label">{this.props.label}</div>
      </span>
      )
  }
}
export default LaunchIcon;