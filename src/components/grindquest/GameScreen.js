class GameScreen {
  constructor(p,canvasWidth,canvasHeight,debug) {
    if(debug === undefined)
      this.DEBUG = false;
    else
      this.DEBUG = debug;
    this.p = p;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.LEVEL = 0x01;
    this.EDGE = 0x02;
  }
  
  //for convenience of scalability
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
  
  //event handlers
  handleKeyboard(usrU,usrD,usrL,usrR) {
    return false;
  }
  handleMouseClick() {
    return false;
  }
  handleMouseMove() {
    return false;
  }
  render() {
    alert("render in GameScreen not implemented");
  }
}
export default GameScreen;