class GameScreen {
  constructor(p,canvasWidth,canvasHeight) {
    this.p = p;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
  }
  
  widthPct(pct) {
    return this.canvasWidth/100.0*pct;
  }
  widthPctI(pct) {
    return Math.round(this.widthPct(pct));
  }
  
  heightPct(pct) {
    return this.canvasHeight/100.0*pct;
  }
  heightPctI(pct) {
    return Math.round(this.heightPct(pct));
  }
  
  render() {
    alert("render in GameScreen not implemented");
  }
}
export default GameScreen;