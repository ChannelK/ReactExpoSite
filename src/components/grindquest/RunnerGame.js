import TitleScreen from "./TitleScreen";

export default function RunnerGame (p) {
  let sketchWidth = 512;
  let sketchHeight = 512;
  let currentScreen = null;
  let screens = null;
  
  let canvas = null;
  p.mousePressed = p.touchStarted = function() {
    console.log("Touched at "+p.mouseX+","+p.mouseY);
    if((p.mouseX >= 0 && p.mouseX<sketchWidth) &&
    (p.mouseY >= 0 && p.mouseY<sketchHeight)) {
      var clickedElem = document.elementFromPoint(p.mouseX+canvas.canvas.offsetLeft,p.mouseY+canvas.canvas.offsetTop)
      console.log("Elem at raw point is "+clickedElem);
      
      if(clickedElem.tag === "HTMLCanvasElement")
        return false;
      else
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
  p.draw = function() {
    var usrU = false;
    var usrD = false;
    var usrL = false;
    var usrR = false;
    //handle keyboard controls
    if(p.keyIsDown(p.UP_ARROW) || p.keyIsDown(87)) {
      usrU = true;
    } else if(p.keyIsDown(p.DOWN_ARROW) || p.keyIsDown(83)) {
      usrD = true;
    }
    if(p.keyIsDown(p.LEFT_ARROW) || p.keyIsDown(65)) {
      usrL = true;
    } else if(p.keyIsDown(p.RIGHT_ARROW) || p.keyIsDown(68)) {
      usrR = true;
    }
    currentScreen.render();
  }
};