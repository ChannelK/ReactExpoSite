import GameScreen from './GameScreen';
import titleImg from '../../assets/GrindQuest.png';

class TitleScreen extends GameScreen {
  constructor(p,canvasWidth,canvasHeight) {
    super(p,canvasWidth,canvasHeight);
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
    
    this.btnTextColor = this.p.color(80, 60, 5);
    this.btnTextSize = this.widthPctI(10);
    this.btnPosX = this.heightPct(50);
    this.btnPosY = this.heightPct(50);
    this.btnSpace = this.heightPct(6);
    this.btns = ['Start','How To Play','About'];
  }
  
  render() {
    this.p.background(158, 244, 66);
    
    this.p.fill(this.dashColor);
    this.p.noStroke();
    for(var i=0;i<this.dashCt;i++) {
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
    
    //draw the button options
    this.p.textFont('Arial');
    this.p.fill(this.btnTextColor);
    this.p.textAlign(this.p.CENTER);
    this.p.textSize(this.btnTextSize);
    for(var i=0;i<this.btns.length;i++) {
      this.p.text(this.btns[i], 
        this.btnPosX-Math.round(this.widthPct(90)/2), 
        this.btnPosY + i*(this.btnTextSize+this.btnSpace) - Math.round(this.btnTextSize/2),
        this.widthPctI(90),
        this.btnTextSize
      );
    }
  }
}
export default TitleScreen;