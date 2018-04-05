import ElemGroup from './ElemGroup';
import MenuButton from './MenuButton';

class ButtonGroup extends ElemGroup {
  constructor(x,y,width,height,boxMargin,rounding,btnSpace,boxColor,font,textColor) {
    super(x,y,width,height);
    this.btnHeight = height;
    this.btnWidth = width;
    this.boxMargin = boxMargin;
    this.rounding = rounding;
    this.btnSpace = btnSpace;
    this.boxColor = boxColor;
    this.font = font;
    this.textColor = textColor;
    this.btns = {};
  }
  
  hasChildBtn(btnIndex) {
    return this.btns[btnIndex] === undefined;
  }
  
  getChildBtn(btnIndex) {
    if(!this.hasChildBtn(btnIndex))
      console.log("No such button '"+btnIndex+"' in button group!");
    return this.btns[btnIndex];
  }
  
  createButton(btnIndex,btnStr,handleClick) {
    let deltaY = (this.btnSpace + this.laneWidth)*this.elems.length;
    let newElem = this.createElem(
      (x,y,width,height,str,boxMargin,rounding,boxColor,font,textColor) => 
        {return new MenuButton(x,y,width,height,str,boxMargin,rounding,boxColor,font,textColor,handleClick);},
      0,deltaY,0,this.btnWidth,this.btnHeight,btnStr,this.boxMargin,this.rounding,this.boxColor,this.font,this.textColor,handleClick);
    this.btns[btnIndex] = newElem;
  }
}

export default ButtonGroup;