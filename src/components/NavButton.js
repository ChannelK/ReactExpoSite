import React, { Component } from 'react';
import '../Site.css';

class NavButton extends Component {
  render() {
    return (
      <button className={"Nav-btn clickable Nav-btn-" + (this.props.activePage===this.props.navId?"selected":"unselected")} 
      id={this.props.navId+"Nav"}
      onClick={this.props.navLink}>
        {this.props.navLabel}
      </button>
    );
  }
}

export default NavButton;
