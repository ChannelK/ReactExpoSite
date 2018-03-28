import GameScreen from './GameScreen';
import MenuButton from './MenuButton';
import CenterElem from './CenterElem';
import groundImg from '../../assets/PixelGrass.png';

class ScrollGround extends CenterElem {
  constructor(x,y,width,height,scrollSpeed,srcImg) {
    super(x,y,width,height);
    this.scrollSpeed = scrollSpeed;
    this.srcImg = srcImg;
    this.sy = this.srcImg.height-this.srcImg.width-1;
  }
  
  setSpeed(newSpeed) {
    this.scrollSpeed = Math.abs(newSpeed);
  }
  
  moveGround() {
    //this.sy = (this.sy+this.scrollSpeed) % (this.srcImg.height-this.srcImg.width-1);
    this.sy -= this.scrollSpeed;
    if(this.sy <= 0) {
      this.sy += this.srcImg.height-this.srcImg.width-2;
    }
  }
  
  render(p) {
    p.push();
    p.image(this.srcImg,this.leftX,this.topY,this.width,this.height,
      0,Math.round(this.sy),this.srcImg.width,this.srcImg.width
    );
    p.pop();
    this.moveGround();
  }
}
class Lane extends CenterElem {
  constructor(x,y,width,height) {
    super(x,y,width,height);
    this.markerX = x;
    this.markerY = Math.round(y+height*0.2);
  }
  
  render(p) {
    let markerSide = Math.round(this.width/2);
    p.push();
    p.rectMode(p.CENTER);
    p.fill(237,201,175,150);
    p.rect(this.x,this.y,this.width,this.height);
    p.fill(10,10,10);
    p.rect(this.markerX,this.markerY,markerSide,markerSide);
    p.pop();
  }
}

class PlayScreen extends GameScreen {
  constructor(p,setCurrentScreen,canvasWidth,canvasHeight,debug) {
    super(p,setCurrentScreen,canvasWidth,canvasHeight,debug);
    //state info
    this.paused = false;
    
    //pause button pos/size
    this.pauseBtnPosX = this.widthPctI(16);
    this.pauseBtnPosY = this.heightPctI(5);
    this.pauseBtnWidth = this.widthPctI(28);
    this.pauseBtnHeight = this.heightPctI(7);
    //menu button pos/size
    this.menuBtnPosX = this.widthPctI(50);
    this.menuBtnPosY = this.heightPctI(30);
    this.menuBtnWidth = this.widthPctI(65);
    this.menuBtnHeight = this.widthPctI(10);
    this.menuBtnSpace = this.heightPctI(6);
    //ground pos/size
    let groundWidth = this.widthPctI(80);
    let groundHeight = this.heightPctI(80);
    //lane pos/size
    let laneWidth = this.widthPctI(15);
    let laneHeight = this.heightPctI(80);
    let laneY = this.heightPctI(50);
    let laneSpace = this.widthPct(5);
    
    //menu button styling
    this.menuBtnFont = 'Helvetica';
    this.menuBtnColor = this.p.color(209, 176, 87);
    this.menuBtnTextColor = this.p.color(80, 60, 5);
    this.menuBtnRounding = this.widthPctI(3);
    this.menuBtnBoxMargin = this.heightPctI(1.3);
    //pause button styling
    this.pauseBtnFont = 'Helvetica';
    this.pauseBtnColor = this.p.color(209, 176, 87);
    this.pauseBtnTextColor = this.p.color(80, 60, 5);
    this.pauseBtnRounding = this.widthPctI(0.5);
    this.pauseBtnBoxMargin = this.heightPctI(1);
    
    //specify menu buttons
    this.menuBtnStrs = ['Back','Reset'];
    //specify pause button
    this.pauseBtnStr = "Pause";
    
    //specify menu actions
    var backCallback = function() {this.setCurrentScreen('title');};
    backCallback = backCallback.bind(this);
    this.menuBtnActions = {
      'Back':backCallback};
    //specify pause action
    let pauseCallback = function() {this.pauseGame();};
    let resumeCallback = function() {this.resumeGame();};
    this.pauseCallback = pauseCallback.bind(this);
    this.resumeCallback = resumeCallback.bind(this);
    
    //misc ground
    this.groundSpeed = 5.3;
      
    //auto calc menu buttons
    this.menuBtns = [];
    for(var i=0;i<this.menuBtnStrs.length;i++) {
      var offset = i*(this.menuBtnHeight+this.menuBtnSpace);
      //(x,y,width,height,str,boxMargin,rounding,boxColor,font,textColor)
      this.menuBtns.push(new MenuButton(
        this.menuBtnPosX, this.menuBtnPosY+offset, this.menuBtnWidth, this.menuBtnHeight,
        this.menuBtnStrs[i], this.menuBtnBoxMargin, this.menuBtnRounding,
        this.menuBtnColor, this.menuBtnFont, this.menuBtnTextColor
      ));
    }
    //auto calc pause button
    this.pauseBtn = new MenuButton(
      this.pauseBtnPosX, this.pauseBtnPosY, this.pauseBtnWidth, this.pauseBtnHeight,
      this.pauseBtnStr, this.pauseBtnBoxMargin, this.pauseBtnRounding,
      this.pauseBtnColor, this.pauseBtnFont, this.pauseBtnTextColor
    );
    //auto calc ground
    this.ground = new ScrollGround(this.widthPctI(50),this.heightPctI(50),groundWidth,groundHeight,
      this.groundSpeed,this.p.loadImage(groundImg));
    //auto calc lanes
    this.lanes = [];
    for(i=0;i<3;i++) {
      let offset = (-1+i)*(laneSpace+laneWidth);
      this.lanes.push(new Lane(this.widthPctI(50)+offset,laneY,laneWidth,laneHeight));
    }
  }
  
  pauseGame() {
    this.paused = true;
    this.ground.setSpeed(0);
  }
  
  resumeGame() {
    this.ground.setSpeed(this.groundSpeed);
    this.paused = false;
  }
  
  handleMouseClick() {
    var mX = this.p.mouseX,
      mY = this.p.mouseY;
    if(this.paused) {
      if(this.pauseBtn.isAtPoint(mX,mY)) {
        this.resumeCallback();
        return true;
      }
      for(var i=0;i<this.menuBtns.length;i++) {
        if(this.menuBtns[i].isAtPoint(mX,mY)) {
          if(this.menuBtnActions[this.menuBtnStrs[i]])
            this.menuBtnActions[this.menuBtnStrs[i]]();
          return true;
        }
      }
    } else {
      if(this.pauseBtn.isAtPoint(mX,mY)) {
        this.pauseCallback();
        return true;
      }
    }
    return true;
  }
  render() {
    this.p.background(this.p.color(10,50,90));
    //draw the ground
    this.ground.render(this.p);
    //draw the lane markers
    for(var i = 0;i < this.lanes.length;i++) {
      this.lanes[i].render(this.p);
    }
    //draw the stuff on the lanes
    
    //draw the player
    //draw the menu
    
    
    //draw the buttons
    if(this.paused) {
      this.p.fill(20,20,20,150);
      this.p.rect(0,0,this.widthPctI(100),this.heightPctI(100));
      for(i=0;i<this.menuBtns.length;i++) {
        this.menuBtns[i].render(this.p);
      }
    }
    this.pauseBtn.render(this.p);
  }
}
export default PlayScreen;