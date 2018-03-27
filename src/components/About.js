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
          This site was built using <a href="https://reactjs.org/">ReactJS</a> and <a href="https://p5js.org/">p5.js</a>.
          Photos are public domain taken from <a href="https://www.pexels.com/public-domain-images/">pexels.com</a>.
        </p>
        <h1 className="About-title">About Me</h1>
        <p className="About-text">
          My name is Ken, and I am a programmer with a Bachelors of Engineering in Computer Engineering. I have three years of experience working with a variety of computer systems.
          These range from drone-mounted computer vision systems to blackbox frontend testing automation. My main interests are automation and system design, but this list is far from exhaustive.
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