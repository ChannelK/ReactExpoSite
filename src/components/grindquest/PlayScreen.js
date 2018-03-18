import GameScreen from './GameScreen';

class PlayScreen extends GameScreen {
  constructor(p,canvasWidth,canvasHeight) {
    super(p,canvasWidth,canvasHeight);
  }
  
  render() {
    this.p.rect(10, 10, 10, 10);
  }
}
export default PlayScreen;