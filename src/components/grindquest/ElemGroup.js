import CenterElem from './CenterElem';

class ElemGroup extends CenterElem{
  constructor(x,y,width,height) {
    super(x,y,width,height);
    this.elems = [];
    this.width = 0;
    this.height = 0;
    //width and height are calculated whenever elements are added
  }
  
  addElemGlobal(elem) {
    this.elems.push(elem);
  }
  
  addElemLocal(elem) {
    elem.translate(this.x,this.y);
    this.elems.push(elem);
  }
  
  isAtPoint(x,y) {
    for(let i = 0;i < this.elems.length;i++) {
      if(this.elems[i].isAtPoint(x,y))
        return true;
    }
    return false;
  }
  
  get length() {
    return this.elems.length;
  }
  
  setWidth(width) {
    alert("setWidth invalid in ElemGroup");
    return false;
  }
  setHeight(height) {
    alert("setWidth invalid in ElemGroup");
    return false;
  }
  
  translateGroup(xDelta,yDelta) {
    super.translate(xDelta,yDelta);
    for(let i = 0;i < this.elems.length;i++)
      this.elems[i].translate(xDelta,yDelta);
  }
  
  render(p) {
    for(let i = 0;i < this.elems.length;i++)
      this.elems[i].render(p);
  }
}
export default ElemGroup;