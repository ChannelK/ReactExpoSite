import React, { Component } from 'react';
import '../../Site.css';
//import sketch from './Sketch';
import RunnerGame from './RunnerGame';
//import p5 from 'p5';
//use to squash p5 object-type errors
import p5 from 'p5/lib/p5.min';

/*
 * This code based on react-p5-wrapper
 * https://www.npmjs.com/package/react-p5-wrapper
 * Source code appropriated and altered to fix memleak
 * Issue logged at https://github.com/NeroCor/react-p5-wrapper/issues/13
 */

class GrindQuest extends Component {
  componentDidMount() {
    this.canvas = new p5(RunnerGame, this.wrapper);
    //this.canvas = new p5(sketch, this.wrapper);
  }
  
  componentWillUnmount() {
    this.canvas.remove();
  }
  
  render() {
    return (
      <div className="GrindQuest-root">
        <h1 className="GrindQuest-title">Grind Quest</h1>
        <div className="GrindQuest-background">
          <div ref={wrapper => this.wrapper = wrapper}></div>
        </div>
      </div>
    );
  }
}
export default GrindQuest;