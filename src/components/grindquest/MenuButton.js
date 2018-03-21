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

export default MenuButton;