class CenterElem {
  constructor(x,y,width,height) {
    this.width = width;
    this.height = height;
    this.centerX = x;
    this.centerY = y;
    this.leftX = Math.round(x-this.width/2);
    this.topY = Math.round(y-this.height/2);
  }
  
  calcOffset(center,length) {
    return Math.round(center-length/2);
  }
  
  set x(x0) {
    this.centerX = x0;
    this.leftX = this.calcOffset(x0,this.width);
  }
  
  set y(y0) {
    this.centerY = y0;
    this.topY = this.calcOffset(y0,this.height);
  }
  
  get x() { return this.centerX; }
  get y() { return this.centerY; }
  
  isAtPoint(x,y) { 
    if(x >= this.leftX && x <= this.leftX+this.width
    && y >= this.topY && y <= this.topY+this.height)
      return true;
    else
      return false;
  }
  
  setWidth(width) {
    this.width = width;
    this.leftX = this.calcOffset(this.x,width);
  }
  setHeight(height) {
    this.height = height;
    this.topY = this.calcOffset(this.y,height);
  }
  
  translate(xDelta,yDelta) {
    this.x = this.x + xDelta;
    this.y = this.y + yDelta;
  }
  
  setCenterPos(x,y) {
    this.x = x;
    this.y = y;
  }
  
  render(p) {
    alert("render in CenterElem not implemented");
  }
}
export default CenterElem;