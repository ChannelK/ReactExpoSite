export default function sketch (p) {
  let sketchWidth = 512;
  let sketchHeight = 512;
  if(sketchWidth > p.windowWidth) {
    sketchWidth = p.windowWidth;
  }
  let ballW = 40;
  let ballH = 40;
  let moveSpeed = 5;
  
  
  let wallL = Math.floor(ballW/2);
  let wallR = sketchWidth-Math.floor(ballW/2);
  let wallD = sketchHeight-Math.floor(ballH/2)-8;
  
  let ballX = Math.floor(ballW/2)+3;
  let ballY = wallD;
  
  let ballVel = 0;
  let ballAcc = 1;
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
  
  /*= function() {
    console.log("Pressed!");
    return false;
  }*/
  
  p.setup = function() {
    canvas = p.createCanvas(sketchWidth,sketchHeight);
    console.log("Canvas is ");
    console.log(canvas);
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
    
    if(usrL) {
      if(ballX - moveSpeed >= wallL) {
        ballX -= moveSpeed;
      } else {
        ballX = wallL;
      }
    } else if(usrR) {
      if(ballX + moveSpeed <= wallR) {
        ballX += moveSpeed;
      } else {
        ballX = wallR;
      }
    }
    //handle mouse controls
    
    if(ballY === wallD) {
      if(usrU) {
        ballVel = -20;
      } else {
        ballVel = 0;
      }
    } else {
      ballVel+=ballAcc;
    }
    
    if(ballY+ballVel <= wallD) {
      ballY += ballVel;
    } else {
      ballY = wallD;
    }
    
    p.background(100,10,usrD?255:0);
    p.ellipse(ballX, ballY, ballW, ballH)
  }
};