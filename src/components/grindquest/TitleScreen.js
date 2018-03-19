import GameScreen from './GameScreen';
import titleImg from '../../assets/GrindQuest.png';

class TitleScreen extends GameScreen {
  constructor(p,canvasWidth,canvasHeight,debug) {
    super(p,canvasWidth,canvasHeight,debug);
    this.DEBUG = true;
    this.titleWidth = this.widthPctI(80);
    this.titleImg = p.loadImage(titleImg);
    
    this.dashColor = this.p.color(70,130,40);
    this.dashCt = Math.round(this.canvasWidth/6);
    this.dashWidth = 3;
    this.dashHeight = this.heightPctI(15);
    this.dashes = [];
    //the grouping goes xpos,ypox,yvelocity
    //the velocity is currently linked to framerate
    for(var i=0;i<this.dashCt;i++) {
      this.dashes.push([Math.round(Math.random()*canvasWidth),
        Math.round(Math.random()*canvasHeight),
        Math.round(Math.random()*12+10)
      ]);
    }
    
    this.btnColor = this.p.color(209, 176, 87);
    this.btnTextColor = this.p.color(80, 60, 5);
    this.btnTextSize = this.widthPctI(10);
    this.btnPosY = this.heightPctI(50);
    this.btnPosX = this.widthPctI(50);
    this.btnSpace = this.heightPctI(6);
    this.btnRounding = this.widthPctI(3);
    this.btns = ['Start','How To Play','About'];
    this.btnBoxMargin = this.heightPctI(1.3);
    //auto calculated from buttons
    this.btnTextboxes = [];
    this.btnBoundingBoxes = [];
    for(i=0;i<this.btns.length;i++) {
      var width = this.widthPctI(65);
      var height = this.btnTextSize;
      var x = this.btnPosX - Math.round(width/2);
      var y = this.btnPosY + i*(height+this.btnSpace) - Math.round(height/2);
      this.btnTextboxes.push([x,y,width,height]);
      this.btnBoundingBoxes.push([x,y-this.btnBoxMargin,width,height+this.btnBoxMargin*2])
    }
    //state info for the menu cursor
    this.menuCursor = 0;
    this.cursorWidth = this.widthPct (6);
    this.cursorHeight = this.widthPct(6);
    this.cursorMargin = this.widthPctI(6);
    this.cursorColor = this.p.color(256,80,80);
    
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
    var mX = this.p.mouseX;
    var mY = this.p.mouseY;
    for(var i=0;i<this.btns.length;i++) {
      var box = this.btnBoundingBoxes[i];
      if(mX >= box[0] && mX <= box[0]+box[2]
        && mY >= box[1] && mY <= box[1]+box[3]) {
        this.menuCursor = i;
        break;
      }
    }
    return true;
  }
  
  handleKeyboard(usrU,usrD,usrL,usrR) {
    if((usrU & this.EDGE) && (usrU & this.LEVEL) && (this.menuCursor-1>=0)){
      this.menuCursor--;
    } else if((usrD & this.EDGE) && (usrD & this.LEVEL) && (this.menuCursor+1<this.btns.length)) {
      this.menuCursor++;
    }
    return true;
  }
  
  render() {
    var i = 0;
    this.p.background(158, 244, 66);
    
    this.p.fill(this.dashColor);
    this.p.noStroke();
    for(i=0;i<this.dashCt;i++) {
      var dashX = this.dashes[i][0];
      var dashY = this.dashes[i][1];
      var dashV = this.dashes[i][2];
      //draw the dash
      this.p.rect(dashX-Math.round(this.dashWidth/2), 
        dashY-Math.round(this.dashHeight/2), 
        this.dashWidth, this.dashHeight
      );
      
      //if the dash is off the screen, recycle it
      if(dashY-Math.round(this.dashHeight/2)+dashV >= this.canvasHeight) {
        this.dashes[i][0] = Math.round(Math.random()*this.canvasWidth);
        this.dashes[i][1] = Math.round(-this.dashHeight/2);
        this.dashes[i][2] = Math.round(Math.random()*20+5);
      } else
        this.dashes[i][1] += dashV;
    }
    //draw the title
    this.p.image(this.titleImg,
      this.widthPctI(50)-this.titleWidth/2, 
      this.heightPctI(10),
      this.titleWidth,
      this.titleImg.height/this.titleImg.width*this.titleWidth
    );
    
    this.p.fill(this.btnColor);
    //draw the button backgrounds
    for(i=0;i<this.btns.length;i++) {
      var backBox = this.btnBoundingBoxes[i];
      this.p.rect(backBox[0],backBox[1],backBox[2],backBox[3],this.btnRounding);
    }
    //draw the button options
    this.p.textFont('Arial');
    this.p.fill(this.btnTextColor);
    this.p.textAlign(this.p.CENTER);
    this.p.textSize(this.btnTextSize);
    for(i=0;i<this.btns.length;i++) {
      var btnBox = this.btnTextboxes[i];
      this.p.text(this.btns[i],btnBox[0],btnBox[1],btnBox[2],btnBox[3]);
    }
    
    //draw the cursor
    this.p.fill(this.cursorColor);
    var cursorBox = this.btnTextboxes[this.menuCursor];
    var cursorX = cursorBox[0] - this.cursorMargin;
    var cursorY = Math.round(cursorBox[1] + cursorBox[3]/2);
    this.p.ellipse(cursorX,cursorY,this.cursorWidth,this.cursorHeight);
    
    //draw debug
    if(this.DEBUG) {
      this.p.fill(this.dbpc);
      this.p.ellipse(this.dbpx,this.dbpy,this.dbpw);
    }
  }
}
export default TitleScreen;