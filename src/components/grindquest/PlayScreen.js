import GameScreen from './GameScreen';

class PlayScreen extends GameScreen {
  constructor(p) {
    super(p);
  }
  
  render() {
    this.p.rect(10, 10, 10, 10);
  }
}
export default PlayScreen;