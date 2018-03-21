import GameScreen from './GameScreen';
import MenuButton from './MenuButton';

class PlayScreen extends GameScreen {
  constructor(p,setCurrentScreen,canvasWidth,canvasHeight,debug) {
    super(p,setCurrentScreen,canvasWidth,canvasHeight,debug);
    this.btnPosX = this.widthPctI(50);
    this.btnPosY = this.heightPctI(10);
    this.btnWidth = this.widthPctI(65);
    this.btnHeight = this.widthPctI(10);
    this.btnSpace = this.heightPctI(6);
    //button styling
    this.btnFont = 'Helvetica';
    this.btnColor = this.p.color(209, 176, 87);
    this.btnTextColor = this.p.color(80, 60, 5);
    this.btnRounding = this.widthPctI(3);
    this.btnBoxMargin = this.heightPctI(1.3);
    //specify buttons
    this.btnStrs = ['Back','Reset'];
    //specify actions
    var backCallback = function() {this.setCurrentScreen('title');};
    backCallback = backCallback.bind(this);
    this.btnActions = {
      'Back':backCallback};
    //auto calculated from buttons
    this.btns = [];
    for(var i=0;i<this.btnStrs.length;i++) {
      var offset = i*(this.btnHeight+this.btnSpace);
      //(x,y,width,height,str,boxMargin,rounding,boxColor,font,textColor)
      this.btns.push(new MenuButton(
        this.btnPosX, this.btnPosY+offset, this.btnWidth, this.btnHeight,
        this.btnStrs[i], this.btnBoxMargin, this.btnRounding,
        this.btnColor, this.btnFont, this.btnTextColor
      ));
    }
  }
  handleMouseClick() {
    var mX = this.p.mouseX,
      mY = this.p.mouseY;
    for(var i=0;i<this.btns.length;i++) {
      if(this.btns[i].isAtPoint(mX,mY)) {
        if(this.btnActions[this.btnStrs[i]])
          this.btnActions[this.btnStrs[i]]();
        break;
      }
    }
    return true;
  }
  render() {
    this.p.background(this.p.color(10,50,90));
    //draw the buttons
    for(var i=0;i<this.btns.length;i++) {
      this.btns[i].render(this.p);
    }
  }
}
export default PlayScreen;