import React, { Component } from 'react';
import '../../Site.css';
import sketch from './Sketch';
import P5Wrapper from 'react-p5-wrapper';

class GrindQuest extends Component {
  render() {
    return (
      <div className="GrindQuest-root">
        <h1 className="GrindQuest-title">Grind Quest</h1>
        <div className="GrindQuest-background">
        <P5Wrapper sketch={sketch}/>
        </div>
      </div>
    );
  }
}
export default GrindQuest;