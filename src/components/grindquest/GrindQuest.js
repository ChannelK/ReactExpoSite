import React, { Component } from 'react';
import '../../Site.css';
//import sketch from './Sketch';
import RunnerGame from './RunnerGame';
//import p5 from 'p5';
//use to squash p5 object-type errors
import p5 from 'p5/lib/p5.min';

class GrindQuest extends Component {
  componentDidMount() {
    this.canvas = new p5(RunnerGame, this.wrapper);
    //this.canvas = new p5(sketch, this.wrapper);
    if( this.canvas.myCustomRedrawAccordingToNewPropsHandler ) {
      this.canvas.myCustomRedrawAccordingToNewPropsHandler(this.props);
    }
  }
  
  componentWillReceiveProps(newprops) {
    if( this.canvas.myCustomRedrawAccordingToNewPropsHandler ) {
      this.canvas.myCustomRedrawAccordingToNewPropsHandler(newprops);
    }
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