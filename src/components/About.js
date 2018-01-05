import React, { Component } from 'react';
import '../Site.css';

class About extends Component {
  /*
  constructor(props) {
    super(props);
  }
  */
  
  render() {
    return (
      <div className="About-root">
        <h1 className="About-title">About This Site And Me</h1>
        <p className="About-text">
          I&#39;m just a simple programmer who makes projects. This site is a quick demonstration of ReactJS.
        </p>
      </div>
    );
  }
}
export default About;