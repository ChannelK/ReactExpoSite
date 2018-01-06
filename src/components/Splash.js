import React, { Component } from 'react';
import '../Site.css';

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
                <div className="App-selector"> Placeholder 1</div>
            </div>
            <div className="App-grid-item">
                <div className="App-selector"> Placeholder 2</div>
            </div>
            <div className="App-grid-item">
                <div className="App-selector"> Placeholder 3</div>
            </div>
        </div>
      </div>
    );
  }
}
export default Splash;