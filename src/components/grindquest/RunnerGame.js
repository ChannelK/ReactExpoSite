import TitleScreen from "./TitleScreen";

export default function RunnerGame (p) {
  let LEVEL = 0x01;
  let EDGE = 0x02;
  let sketchWidth = 512;
  let sketchHeight = 512;
  let currentScreen = null;
  let screens = null;
  let pUsrU = 0;
  let pUsrD = 0;
  let pUsrL = 0;
  let pUsrR = 0;
  
  let canvas = null;
  
  let getCurrentScreen = function() {
    return currentScreen;
  }
  p.mousePressed = p.touchStarted = function() {
    console.log("Touched at "+p.mouseX+","+p.mouseY);
    if((p.mouseX >= 0 && p.mouseX<sketchWidth) &&
    (p.mouseY >= 0 && p.mouseY<sketchHeight)) {
      var clickedElem = document.elementFromPoint(p.mouseX+canvas.canvas.offsetLeft,p.mouseY+canvas.canvas.offsetTop)
      //console.log("Elem at raw point is "+clickedElem);
      //console.log(clickedElem)
      
      if(clickedElem && clickedElem.tagName === "CANVAS") {
        getCurrentScreen().handleMouseClick();
        return false;
      } else
        return true;          
    } else {
      return true;
    }
  }
  
  p.setup = function() {
    p.frameRate(30);
    if(sketchWidth > p.windowWidth) {
      sketchWidth = p.windowWidth;
    }
    canvas = p.createCanvas(sketchWidth,sketchHeight);
    console.log("Canvas is ");
    console.log(canvas);
    
    screens = {'title':new TitleScreen(p,sketchWidth,sketchHeight)};
    currentScreen = screens['title'];
  }
  p.mouseMoved = function() {
    getCurrentScreen().handleMouseMove();
  }
  
  p.draw = function() {
    var usrU = 0;
    var usrD = 0;
    var usrL = 0;
    var usrR = 0;
    //handle keyboard controls
    //up
    if(p.keyIsDown(p.UP_ARROW) || p.keyIsDown(87)) {
      usrU |= LEVEL;
    }
    if((pUsrU & LEVEL) !== (usrU & LEVEL)) {
      usrU |= EDGE;
    }
    
    //down
    if(p.keyIsDown(p.DOWN_ARROW) || p.keyIsDown(83)) {
      usrD |= LEVEL;
    }
    if((pUsrD & LEVEL) !== (usrD & LEVEL)) {
      usrD |= EDGE;
    }
    
    //left
    if(p.keyIsDown(p.LEFT_ARROW) || p.keyIsDown(65)) {
      usrL |= LEVEL;
    }
    if((pUsrL & LEVEL) !== (usrL & LEVEL)) {
      usrL |= EDGE;
    }
    
    //right
    if(p.keyIsDown(p.RIGHT_ARROW) || p.keyIsDown(68)) {
      usrR |= LEVEL;
    }
    if((pUsrR & LEVEL) !== (usrR & LEVEL)) {
      usrR |= EDGE;
    }
    if(usrU || usrD || usrL || usrR)
      getCurrentScreen().handleKeyboard(usrU,usrD,usrL,usrR);
    getCurrentScreen().render();
    
    pUsrU = usrU;
    pUsrD = usrD;
    pUsrL = usrL;
    pUsrR = usrR;
  }
};