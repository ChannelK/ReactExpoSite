import TitleScreen from './TitleScreen';
import PlayScreen from './PlayScreen';
import HowToScreen from './HowToScreen';
import AboutScreen from './AboutScreen';

export default function RunnerGame (p) {
  let LEVEL = 0x01;
  let EDGE = 0x02;
  let sketchWidth = 512;
  let sketchHeight = 512;
  let currentScreen = null;
  let screens = null;
  //buffered user keyboard controls
  //ordered: up down left right enter esc
  let usr = [0,0,0,0,0,0];
  let pUsr = [0,0,0,0,0,0];
  //keys to scan for udlr
  let keyDown = [
    [p.UP_ARROW,87],
    [p.DOWN_ARROW,83],
    [p.LEFT_ARROW,65],
    [p.RIGHT_ARROW,68],
    [p.ENTER,69],
    [27]
  ];
  
  let canvas = null;
  
  let setCurrentScreen = function(screen) {
    if(screens[screen])
      currentScreen = screens[screen];
    else
      alert("No such screen named "+screen);
  }
  let getCurrentScreen = function() {
    return currentScreen;
  }
  p.mousePressed = p.touchStarted = function() {
    //console.log("Touched at "+p.mouseX+","+p.mouseY);
    if((p.mouseX >= 0 && p.mouseX<sketchWidth) &&
    (p.mouseY >= 0 && p.mouseY<sketchHeight)) {
      //taken from https://stackoverflow.com/questions/3464876/javascript-get-window-x-y-position-for-scroll
      var top  = window.pageYOffset || document.documentElement.scrollTop,
        left = window.pageXOffset || document.documentElement.scrollLeft;
      
      var adjustX = p.mouseX + canvas.canvas.offsetLeft - left,
        adjustY =   p.mouseY + canvas.canvas.offsetTop - top;
      //console.log("AdjustX mouse:"+p.mouseX+", canvasOffset:"+canvas.canvas.offsetLeft+", window:"+left+" = "+adjustX);
      //console.log("AdjustY mouse:"+p.mouseY+", canvasOffset:"+canvas.canvas.offsetTop+ ", window:"+top+ " = "+adjustY);
      var clickedElem = document.elementFromPoint(adjustX,adjustY);
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
    //console.log("Canvas is ");
    //console.log(canvas);
    
    screens = {
      'title':new TitleScreen(p,setCurrentScreen,sketchWidth,sketchHeight),
      'play':new PlayScreen(p,setCurrentScreen,sketchWidth,sketchHeight),
      'howto':new HowToScreen(p,setCurrentScreen,sketchWidth,sketchHeight),
      'about':new AboutScreen(p,setCurrentScreen,sketchWidth,sketchHeight)};
    setCurrentScreen('title');
    //currentScreen = screens['title'];
  }
  p.mouseMoved = function() {
    getCurrentScreen().handleMouseMove();
  }
  
  p.draw = function() {
    var i=0;
    var j=0;
    //handle keyboard controls
    for(i=0;i<usr.length;i++) {
      usr[i] = 0;
      for(j=0;j<keyDown[i].length;j++) {
        if(p.keyIsDown(keyDown[i][j])) {
          usr[i] |= LEVEL;
          break;
        }
      }
      if((pUsr[i] & LEVEL) !== (usr[i] & LEVEL)) {
        usr[i] |= EDGE;
      }
    }
    
    
    for(i=0;i<usr.length;i++) {
      if(usr[i]) {
        getCurrentScreen().handleKeyboard(usr[0],usr[1],usr[2],usr[3],usr[4],usr[5]);
        break;
      }
    }
    getCurrentScreen().render();
    for(i=0;i<usr.length;i++) {
      pUsr[i]=usr[i];
    }
  }
};