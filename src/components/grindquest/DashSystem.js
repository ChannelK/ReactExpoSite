import CenterElem from './CenterElem';

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
export default DashSystem;