import CenterElem from './CenterElem';

class TextBox extends CenterElem {
  constructor(x,y,width,height,str,textSize,boxMargin,rounding,boxColor,font,textColor) {
    super(x,y,width,height);
    this.rounding = rounding;
    this.boxMargin = boxMargin;
    this.boxColor = boxColor;
    this.innerText = new class InnerText extends CenterElem{
      constructor(x,y,width,height,str,textSize,font,textColor) {
        super(x,y,width,height);
        this.str = str;
        this.textSize = textSize;
        this.font = font?font:'Ariel';
        this.textColor = textColor;
      }
      render(p) {
        p.push();
        p.rectMode(p.CENTER);
        p.textFont(this.font);
        p.fill(this.textColor);
        p.textAlign(p.CENTER);
        p.textSize(this.textSize);
        p.text(this.str,this.x,this.y,this.width,this.height);
        p.pop();
      }
    }(x,y,width-boxMargin*2,height-boxMargin*2,str,textSize,font,textColor);
  }
  
  render(p) {
    p.push();
    p.noStroke();
    p.fill(this.boxColor);
    //draw the button backgrounds
    p.rect(this.leftX,this.topY,this.width,this.height,this.rounding);
    this.innerText.render(p);
    p.pop()
  }
}

export default TextBox;