import GameScreen from './GameScreen';
import titleImg from '../../assets/GrindQuest.png';
import CenterElem from './CenterElem';

class MenuButton extends CenterElem {
  constructor(x,y,width,height,str,boxMargin,rounding,boxColor,font,textColor) {
    super(x,y,width,height);
    this.rounding = rounding;
    this.boxMargin = boxMargin;
    this.boxColor = boxColor;
    this.buttonText = new class ButtonText extends CenterElem{
      constructor(x,y,width,height,str,font,textColor) {
        super(x,y,width,height);
        this.str = str;
        this.font = font?font:'Ariel';
        this.textColor = textColor;
      }
      render(p) {
        p.push();
        p.textFont(this.font);
        p.fill(this.textColor);
        p.textAlign(p.CENTER);
        p.textSize(this.height);
        p.text(this.str,this.leftX,this.topY,this.width,this.height);
        p.pop();
      }
    }(x,y,width,height-boxMargin*2,str,font,textColor);
  }
  
  render(p) {
    //console.log("Btn at "+this.x+","+this.y);
    p.push();
    p.noStroke();
    p.fill(this.boxColor);
    //draw the button backgrounds
    p.rect(this.leftX,this.topY,this.width,this.height,this.rounding);
    this.buttonText.render(p);
    p.pop()
  }
}

class DashSystem {
  constructor(dashCount,xRange,yRange,velRange,widthRange,height,dashColor) {
    
    if(Array.isArray(xRange)) {
      this.xMin = Math.min(xRange[0],xRange[1]);
      this.xMax = Math.max(xRange[0],xRange[1]);
    } else {
      this.xMin = 0;
      this.xMax = xRange;
    }
    if(Array.isArray(yRange)) {
      this.yMin = Math.min(yRange[0],yRange[1]);
      this.yMax = Math.max(yRange[0],yRange[1]);
    } else {
      this.yMin = -Math.round(height/2);
      this.yMax = yRange;
    }
    this.vMin = Math.min(velRange[0],velRange[1]);
    this.vMax = Math.max(velRange[0],velRange[1]);
    this.wMin = Math.min(widthRange[0],widthRange[1]);
    this.wMax = Math.max(widthRange[0],widthRange[1]);
    this.height = height;
    this.dashColor = dashColor;
    
    //auto calc from params
    //dash objs keep their position, size and velocity
    this.dashes = [];
    for(var i = 0;i < dashCount;i++) {
      var xPos =  Math.round(this.xMin + Math.random() * (this.xMax-this.xMin));
      var yPos =  Math.round(this.yMin + Math.random() * (this.yMax-this.yMin));
      var speedPct = Math.random();
      var yVel  = Math.round(this.vMin + speedPct * (this.vMax-this.vMin));
      var width = Math.round(this.wMin + speedPct * (this.wMax-this.wMin));
      //console.log("New Dash ("+xPos+","+yPos+","+width+","+this.height+","+yVel+")");
            
      this.dashes.push(
        new class Dash extends CenterElem{
          constructor(x,y,width,height,yVel) {
            super(x,y,width,height);
            this.yVel = yVel;
          }
          get nextPos() {return this.y+this.yVel};
          move(){this.y = this.y+this.yVel;}
          render(p) {
            p.rect(this.x,this.y,this.width,this.height);
          }
        }(xPos,yPos,width,this.height,yVel)
      );
    }
  }
  
  render(p) {
    p.push();
    p.fill(this.dashColor);
    p.noStroke();
    
    p.rectMode(p.CENTER);
    for(var i = 0;i < this.dashes.length;i++) {
      //render dash
      this.dashes[i].render(p);
      //decide next pos
      if(this.dashes[i].nextPos >= this.yMax) {
        var speedPct = Math.random();
        this.dashes[i].yVel  = Math.round(this.vMin + speedPct      * (this.vMax-this.vMin));
        this.dashes[i].width = Math.round(this.wMin + speedPct      * (this.wMax-this.wMin));
        
        this.dashes[i].x = Math.round(this.xMin + Math.random() * (this.xMax-this.xMin));
        this.dashes[i].y = this.yMin;
      } else {
        this.dashes[i].move();
      }
    }
    p.pop();
  }
}

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
    var dashColor = this.p.color(70,130,40);
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
    this.btnColor = this.p.color(209, 176, 87);
    this.btnTextColor = this.p.color(80, 60, 5);
    this.btnRounding = this.widthPctI(3);
    this.btnBoxMargin = this.heightPctI(1.3);
    //specify buttons
    this.btnStrs = ['Start','How To Play','About'];
    
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
    this.cursorColor = this.p.color(256,80,80);
    //state info for the menu cursor
    this.menuCursor = 0;
    
    //debug point
    this.dbpc = this.p.color(0,0,256);
    this.dbpx = 4;
    this.dbpy = 4;
    this.dbpw = 4;
  }
  
  handleMouseClick() {
    this.dbpx = this.p.mouseX;
    this.dbpy = this.p.mouseY;
    //make sure the last movement is considered
    this.handleMouseMove();
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