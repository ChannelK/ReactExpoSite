import GameScreen from './GameScreen';

class TitleScreen extends GameScreen {
  constructor(p) {
    super(p);
  }
  
  render() {
    this.p.rect(30, 20, 55, 55);
  }
}
export default TitleScreen;