import GameScreen from './GameScreen';
import titleImg from '../../assets/GrindQuest.png';
import DashSystem from './DashSystem';
import MenuButton from './MenuButton';

class TitleScreen extends GameScreen {
  constructor(p,setCurrentScreen,canvasWidth,canvasHeight,debug) {
    super(p,setCurrentScreen,canvasWidth,canvasHeight,debug);
    this.DEBUG = false;
    
    //title positioning
    this.titleWidth = this.widthPctI(80);
    this.titleImg = p.loadImage(titleImg);
    
    //dash dimensions
    var dashVelRange = [4,20];
    var dashWidthRange = [2,6];
    var dashHeight = this.heightPctI(15);
    //dash styling
    var dashColor = 'rgb(70,130,40)';
    //specify dashes
    var dashCt = Math.round(this.canvasWidth/6);
    //var dashCt = 1;
    this.dashSystem = new DashSystem(dashCt,
      this.canvasWidth, Math.round(this.canvasHeight + dashHeight/2),
      dashVelRange, dashWidthRange,dashHeight,dashColor);
    
    //button positioning
    this.btnPosX = this.widthPctI(50);
    this.btnPosY = this.heightPctI(50);
    this.btnWidth = this.widthPctI(65);
    this.btnHeight = this.widthPctI(10);
    this.btnSpace = this.heightPctI(6);
    //button styling
    this.btnFont = 'Helvetica';
    this.btnColor = 'rgb(209, 176, 87)';
    this.btnTextColor = 'rgb(80, 60, 5)';
    this.btnRounding = this.widthPctI(3);
    this.btnBoxMargin = this.heightPctI(1.3);
    //specify buttons
    this.btnStrs = ['Start','How To Play','About'];
    //specify actions
    var startCallback = function() {this.setCurrentScreen('play');};
    var howToCallback = function() {this.setCurrentScreen('howto');};
    startCallback = startCallback.bind(this);
    howToCallback = howToCallback.bind(this);
    this.btnActions = {
      'Start':startCallback,
      'How To Play':howToCallback};
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
    
    //cursor dimensions and margin from box
    this.cursorWidth = this.widthPct (6);
    this.cursorHeight = this.widthPct(6);
    this.cursorMargin = this.widthPctI(6);
    //cursor styling
    //this.cursorColor = this.p.color(256,80,80);
    this.cursorColor = 'rgb(256,80,80)';
    //state info for the menu cursor
    this.menuCursor = 0;
    
    //debug point
    this.dbpc = 'rgb(0,0,256)';
    this.dbpx = 4;
    this.dbpy = 4;
    this.dbpw = 4;
    
  }
  
  handleMouseClick() {
    var mX = this.p.mouseX, mY = this.p.mouseY;
    this.dbpx = mX;
    this.dbpy = mY;
    //make sure the last movement is considered
    this.handleMouseMove();
    for(var i=0;i<this.btns.length;i++) {
      if(this.btns[i].isAtPoint(mX,mY)) {
        if(this.btnActions[this.btnStrs[i]]) {
          this.btnActions[this.btnStrs[i]]();
        }
        break;
      }
    }
    return true;
  }
  
  handleMouseMove() {
    var mX = this.p.mouseX, mY = this.p.mouseY;
    for(var i=0;i<this.btns.length;i++) {
      if(this.btns[i].isAtPoint(mX,mY)) {
        this.menuCursor = i;
        break;
      }
    }
    return true;
  }
  
  handleKeyboard(usrU,usrD,usrL,usrR) {
    if((usrU & this.EDGE) && (usrU & this.LEVEL) && (this.menuCursor-1>=0)){
      this.menuCursor--;
    } else if((usrD & this.EDGE) && (usrD & this.LEVEL) && (this.menuCursor+1<this.btnStrs.length)) {
      this.menuCursor++;
    }
    return true;
  }
  
  render() {
    var i = 0;
    this.p.background( 158, 244, 66);
    //draw dashes
    this.dashSystem.render(this.p);
    
    //draw the title
    //as of p5 v0.6.0 this will give a false error
    this.p.image(this.titleImg,
      this.widthPctI(50)-this.titleWidth/2, 
      this.heightPctI(10),
      this.titleWidth,
      this.titleImg.height/this.titleImg.width*this.titleWidth
    );
    
    
    //draw the buttons
    for(i=0;i<this.btns.length;i++) {
      this.btns[i].render(this.p);
    }
    
    //draw the cursor
    this.p.noStroke();
    this.p.fill(this.cursorColor);
    var cursorBox = this.btns[this.menuCursor];
    var cursorX = cursorBox.leftX - this.cursorMargin;
    var cursorY = Math.round(cursorBox.topY + cursorBox.height/2);
    this.p.ellipse(cursorX,cursorY,this.cursorWidth,this.cursorHeight);
    
    //draw debug
    if(this.DEBUG) {
      this.p.fill(this.dbpc);
      this.p.ellipse(this.dbpx,this.dbpy,this.dbpw);
    }
  }
}
export default TitleScreen;