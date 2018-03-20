import GameScreen from './GameScreen';

class PlayScreen extends GameScreen {
  constructor(p,setCurrentScreen,canvasWidth,canvasHeight,debug) {
    super(p,setCurrentScreen,canvasWidth,canvasHeight,debug);
  }
  
  render() {
    this.p.rect(10, 10, 10, 10);
  }
}
export default PlayScreen;