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
        <h1 className="About-title">About This Site</h1>
        <p className="About-text">
          This site is a quick demonstration of ReactJS. It also serves as a quick reference for coffee lore.
        </p>
        <h1 className="About-title">About Me</h1>
        <p className="About-text">
          I&#39;m just a simple programmer who makes projects. Coffee is always involved one way or another.
        </p>
        <h2 className="About-title">Contact Info</h2>
        <p className="About-text">
            If you have any questions or concerns you can reach me at <a href="mailto:kennithdchan@gmail.com">kennithdchan@gmail.com</a>
        </p>
      </div>
    );
  }
}
export default About;