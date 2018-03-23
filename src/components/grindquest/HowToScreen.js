import GameScreen from './GameScreen';
import MenuButton from './MenuButton';
import TextBox from './TextBox';

class HowToScreen extends GameScreen {
  constructor(p,setCurrentScreen,canvasWidth,canvasHeight,debug) {
    super(p,setCurrentScreen,canvasWidth,canvasHeight,debug);
    //button position and size
    this.btnPosX = this.widthPctI(50);
    this.btnPosY = this.heightPctI(90);
    this.btnWidth = this.widthPctI(65);
    this.btnHeight = this.heightPctI(10);
    //helpText position and size
    this.textPosX = this.widthPctI(50);
    this.textPosY = this.heightPctI(45);
    this.textWidth = this.widthPctI(80);
    this.textHeight = this.heightPctI(73);
    //button styling
    this.btnFont = 'Helvetica';
    this.btnColor = this.p.color(209, 176, 87);
    this.btnTextColor = this.p.color(80, 60, 5);
    this.btnRounding = this.widthPctI(3);
    this.btnBoxMargin = this.heightPctI(1.3);
    //text styling
    this.textFont = 'Helvetica';
    this.textSize = this.widthPct(4);
    this.textBackgroundColor = this.p.color(209, 176, 87);
    this.textColor = this.p.color(80, 60, 5);
    this.textRounding = this.widthPctI(0.5);
    this.textBoxMargin = this.heightPctI(0.5);
    //specify button
    this.btnStr = 'Back';
    //specify text
    this.textStr = "Collect the brown coffee beans coming towards you while avoiding green coffee beans.\n\n"+
      "Move between the three lanes by going left or right.\n\n"+
      "Go left using 'A', left arrow, or clicking on the left.\n"+
      "Go right using 'D', right arrow, or clicking on the right.\n\n"+
      "The game ends when you have collected enough coffee beans";
    //specify actions
    var backCallback = function() {this.setCurrentScreen('title');};
    this.backCallback = backCallback.bind(this);
    //auto calculated from button attributes
    this.backBtn = new MenuButton(
      this.btnPosX, this.btnPosY, this.btnWidth, this.btnHeight,
      this.btnStr, this.btnBoxMargin, this.btnRounding,
      this.btnColor, this.btnFont, this.btnTextColor
    );
    //auto calculated from text attributes
    this.helpText = new TextBox(
        this.textPosX, this.textPosY, this.textWidth, this.textHeight,
        this.textStr, this.textSize,this.textBoxMargin, this.textRounding,
        this.textBackgroundColor, this.textFont, this.textColor
    );
    
  }
  handleMouseClick() {
    var mX = this.p.mouseX,
      mY = this.p.mouseY;
    if(this.backBtn.isAtPoint(mX,mY)) {
      this.backCallback();
    }
    return true;
  }
  render() {
    this.p.background(this.p.color( 158, 244, 66));
    //draw the buttons
    this.backBtn.render(this.p);
    this.helpText.render(this.p);
  }
}
export default HowToScreen;