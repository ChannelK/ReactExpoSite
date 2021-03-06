import GameScreen from './GameScreen';
import MenuButton from './MenuButton';
import CenterElem from './CenterElem';
import TextBox from './TextBox';
import ElemGroup from './ElemGroup';
import groundImg from '../../assets/PixelGrass.png';
import { State } from './FiniteStateMachine';
import FiniteStateMachine from './FiniteStateMachine';
import { PickupTracker } from './GamePickups';
import laneMarkerImg from '../../assets/LaneMarker.png';
import playerCupImg from '../../assets/CoffeeCupIcon.png';
import level from './GrindQuest_Level_0.json';

class ScrollGround extends CenterElem {
  constructor(x,y,width,height,scrollSpeed,srcImg) {
    super(x,y,width,height);
    this.scrollSpeed = scrollSpeed;
    this.srcImg = srcImg;
    this.sy = this.srcImg.height-this.srcImg.width-1;
    this.disabled = false;
  }
  
  disableMove() {
    this.disabled = true;
  }
  enableMove(){
    this.disabled = false;
  }
  
  setSpeed(newSpeed) {
    this.scrollSpeed = Math.abs(newSpeed);
  }
  
  moveGround() {
    this.sy -= this.scrollSpeed;
    if(this.sy <= 0) {
      this.sy += this.srcImg.height-this.srcImg.width-2;
    }
  }
  
  render(p) {
    p.push();
    p.image(this.srcImg,this.leftX,this.topY,this.width,this.height,
      0,Math.round(this.sy),this.srcImg.width,this.srcImg.width
    );
    p.pop();
    if(this.disabled)
      return;
    this.moveGround();
  }
}
class Lane extends CenterElem {
  constructor(x,y,width,height,laneMarkerImg) {
    super(x,y,width,height);
    this.markerOffsetX = 0;
    this.markerOffsetY = Math.round(height*0.2);
    this.laneMarkerImg = laneMarkerImg;
  }
  
  render(p) {
    let markerSide = Math.round(this.width/4);
    p.push();
    p.rectMode(p.CENTER);
    p.fill(237,201,175,150);
    p.rect(this.x,this.y,this.width,this.height);
    p.fill(10,10,10);
    p.image(this.laneMarkerImg,
      this.x+this.markerOffsetX-markerSide/2,
      this.y+this.markerOffsetY-markerSide/2,
      markerSide,markerSide);
    p.pop();
  }
}

class LaneGroup extends ElemGroup {
  constructor(x,y,width,height,laneSpace,laneMarkerImg) {
    super(x,y,width,height);
    this.laneWidth = width;
    this.laneHeight = height;
    this.laneSpace = laneSpace;
    this.laneMarkerImg = laneMarkerImg;
  }
  
  getLanePosX(laneIndex) {
    return this.elems[laneIndex].x;
  }
  
  createLanes(numLanes) {
    let deltaX = this.laneSpace + this.laneWidth;
    for(let i = 0;i < numLanes;i++) {
      this.addElemLocal(new Lane(deltaX * (-(numLanes-1)/2+i),0,this.laneWidth,this.laneHeight,
        this.laneMarkerImg));
    }
  }
}

class Player extends CenterElem {
  constructor(x,y,width,height,playerImage) {
    super(x,y,width,height);
    this.playerImage = playerImage;
  }
  render(p) {
    p.push();
    p.image(this.playerImage,this.leftX,this.topY,this.width,this.height);
    p.pop();
  }
}

class CountdownDisplay extends TextBox {
  constructor(x,y,width,height,
    textSize,boxMargin,rounding,
    boxColor,font,textColor,
    startCount,countSpeed,threshold,handleDone) {
    
    super(x,y,width,height,startCount.toFixed(1),textSize,boxMargin,rounding,boxColor,font,textColor);
    this.counter = startCount;
    this.maxCount = startCount;
    this.countSpeed = countSpeed;
    this.threshold = threshold;
    this.handleDone = handleDone;
    this.countOver = false;
    this.disabled = false;
  }
  resetCounter() {
    this.disabled = false;
    this.counter = this.maxCount;
    this.countOver = false;
  }
  disableCounter() {this.disabled = true;}
  enableCounter() {this.disabled = false;}
  
  render(p) {
    super.render(p);
    if(this.disabled)
      return;
    if(this.counter-this.countSpeed > this.threshold) {
      this.counter -= this.countSpeed;
      let countStr = this.counter.toFixed(1);
      if(countStr !== this.text)
        this.text = countStr;
    } else {
      if(!this.countOver) {
        this.handleDone();
        this.countOver = true;
      }
    }
  }
}

class InvisRect extends CenterElem {
  render(p) {;}
}

class Cursor extends CenterElem {
  constructor(x,y,width,height,offsetX,offsetY,cursorColor) {
    super(x,y,width,height);
    this.offsetX = offsetX;
    this.offsetY = offsetY;
    this.cursorColor = cursorColor===undefined?'rgb(256,80,80)':cursorColor;
  }
  offsetElemBottom(elem,marginY) {return elem.height/2-marginY-this.height/2;}
  offsetElemTop(elem,marginY) {return -this.offsetElemBottom(elem,marginY);}
  offsetElemRight(elem,marginX) {return elem.width/2+marginX+this.width/2;}
  offsetElemLeft(elem,marginX) {return -this.offsetElemRight(elem,marginX);}
  
  moveToElem(elem,offsetX,offsetY) {
    this.x = elem.x + ((offsetX===undefined)?this.offsetX:offsetX);
    this.y = elem.y + ((offsetY===undefined)?this.offsetY:offsetY);
  }
  render(p) {
    p.push();
    p.noStroke();
    p.fill(this.cursorColor);
    p.ellipse(this.x,this.y,this.width,this.height);
    p.pop();
  }
}

class Border extends CenterElem {
  constructor(x,y,width,height,innerX,innerY,innerWidth,innerHeight,borderColor,cornerColor) {
    super(x,y,width,height);
    this.innerBox = new CenterElem(innerX,innerY,innerWidth,innerHeight);
    this.borderColor = borderColor;
    this.cornerColor = cornerColor;
  }
  render(p) {
    p.push();
    p.rectMode(p.CORNERS);
    p.fill(this.borderColor);
    //top
    p.rect(this.innerBox.leftX,this.topY,
      this.innerBox.rightX,this.innerBox.topY);
    //bottom
    p.rect(this.innerBox.leftX,this.innerBox.bottomY,
      this.innerBox.rightX,this.bottomY);
    //left
    p.rect(this.leftX,this.innerBox.topY,
      this.innerBox.leftX,this.innerBox.bottomY);
    //right
    p.rect(this.innerBox.rightX,this.innerBox.topY,
      this.rightX,this.innerBox.bottomY);
    
    p.fill(this.cornerColor);
    //top-left
    p.rect(this.leftX,this.topY,
      this.innerBox.leftX,this.innerBox.topY);
    //top-right
    p.rect(this.rightX,this.topY,
      this.innerBox.rightX,this.innerBox.topY);
    //bottom-left
    p.rect(this.leftX,this.bottomY,
      this.innerBox.leftX,this.innerBox.bottomY);
    //bottom-right
    p.rect(this.rightX,this.bottomY,
      this.innerBox.rightX,this.innerBox.bottomY);
      
    p.pop();
  }
}

class Scoreboard extends CenterElem {
  constructor(x,y,width,height,textSize,pickupTracker) {
    super(x,y,width,height);
    this.textSize = textSize;
    this.pickupTracker = pickupTracker;
  }
  
  render(p) {
    p.push();
    //should display out Collected x / y
    let picked = this.pickupTracker.picked;
    let allPickups = this.pickupTracker.goalPickups;
    let collected = (picked === null)?"--":picked.length;
    let total = (allPickups === null)?"--":allPickups;
    p.rectMode(p.CENTER);
    p.fill('rgb(10,10,10)');
    p.rect(this.x,this.y,this.width,this.height);
    p.fill('rgb(256,256,256)');
    p.textSize(this.textSize);
    p.textAlign(p.CENTER);
    p.text("Collected "+collected+"/"+total,this.x,this.y);
    p.pop();
  }
}

function changeGameState(newState) {
  if(this.paused) {
    this.resumeGame();    
  }
  
  if(newState === this.FIRSTRUN) {
    this.playerLane = 1;
    this.updatePlayerLane();
    this.playerMoving = false;
    this.groundSpeed = 0;
    this.elems.pickupTracker.quit();
    this.elems.pickupTracker.disableMove();
    this.elems.countdownText.disableCounter();
    
    this.menuFSM.enable();
    this.menuFSM.setState('menubtn_start');
    this.ctrlFSM.disable();
    
    this.elemVisible['countdownText'] = false;
    this.elemVisible['pauseBtn'] = false;
  } else if(newState === this.COUNTDOWN) {
    this.playerLane = 1;
    this.updatePlayerLane();
    this.playerMoving = false;
    this.groundSpeed = 0;
    this.elems.pickupTracker.loadLevel(this.elems.player,this.level);
    this.elems.pickupTracker.disableMove();
    this.elems.countdownText.resetCounter();
    
    this.menuFSM.disable();
    this.menuFSM.setState('menubtn_resume');
    this.ctrlFSM.enable();
    this.ctrlFSM.setState(this.defaultLane);
    
    this.elemVisible['pauseBtn'] = true;
    this.elemVisible['countdownText'] = true;
  } else if(newState === this.RUNNING) {
    this.playerLane = 1;
    this.updatePlayerLane();
    this.playerMoving = false;
    this.groundSpeed = this.maxGroundSpeed;
    this.elems.pickupTracker.enableMove();
    this.counter = 0;
    this.elems.countdownText.disableCounter();
    
    this.menuFSM.disable();
    this.menuFSM.setState('menubtn_resume');
    this.ctrlFSM.enable();
    
    this.elemVisible['countdownText'] = false;
    this.elemVisible['pauseBtn'] = true;
  } else if(newState === this.STOPPED) {
    this.playerMoving = false;
    this.groundSpeed = 0;
    this.counter = 0;
    this.elems.pickupTracker.disableMove();
    
    this.menuFSM.enable();
    this.menuFSM.setState('menubtn_reset');
    
    this.elemVisible['pauseBtn'] = false;
  } else
    return;

  //re-set menu visibility
  for(let i = 0;i < this.menuBtnElems.length;i++) {
    let btnElem = this.menuBtnElems[i];
    this.elemVisible[btnElem] = false;
  }
  let menuVisible = this.state2DefaultMenuOpen[newState];
  if(menuVisible) {
    this.elemVisible["menuOverlay"] = true;
    this.elemVisible["menuText"] = true;
    this.elemVisible['menuCursor'] = true;
    let menuBtnVisible = this.state2Btns[newState];
    for(let i = 0;i < menuBtnVisible.length;i++) {
      this.elemVisible[menuBtnVisible[i]] = true;
    }
  } else {
    this.elemVisible["menuOverlay"] = false;
    this.elemVisible["menuText"] = false;
    this.elemVisible['menuCursor'] = false;
  }
  //change the message to the new state's message
  let menuMessage = this.state2menuText[newState];
  if(newState === this.STOPPED) {
    menuMessage = "Score: "+(this.elems.pickupTracker.calcScore())+"%\n"+menuMessage;
  }
  this.elems.menuText.text = menuMessage;
  
  this.gameState = newState;
}

//fsm for menu handling
var menuStates = {
  menubtn_start:{
    enter:function(){
      this.screen.moveMenuCursor('menubtn_start');
    },
    keyInput:function(usrU,usrD,usrL,usrR,usrEnter,usrEsc){
      if(this.screen.keyPress(usrD))
        this.setState('menubtn_back');
      else if(this.screen.keyPress(usrEnter)) {
        this.screen.menuBtnActions.menubtn_start();
      }
    }
  },
  menubtn_back:{
    enter:function(){
      this.screen.moveMenuCursor('menubtn_back');
    },
    keyInput:function(usrU,usrD,usrL,usrR,usrEnter,usrEsc){
      if(this.screen.keyPress(usrU))
        this.setState('menubtn_start');
      else if(this.screen.keyPress(usrEnter)) {
        this.screen.menuBtnActions.menubtn_back();
      }
    }
  },
  menubtn_resume:{
    enter:function(){
      this.screen.moveMenuCursor('menubtn_resume');
    },
    keyInput:function(usrU,usrD,usrL,usrR,usrEnter,usrEsc){
      if(this.screen.keyPress(usrD))
        this.setState('menubtn_reset');
      else if(this.screen.keyPress(usrEnter)) {
        this.screen.menuBtnActions.menubtn_resume();
      }
    }
  },
  menubtn_reset:{
    enter:function(){
      this.screen.moveMenuCursor('menubtn_reset');
    },
    keyInput:function(usrU,usrD,usrL,usrR,usrEnter,usrEsc){
      if(this.screen.keyPress(usrU))
        this.setState('menubtn_resume');
      else if(this.screen.keyPress(usrD))
        this.setState('menubtn_quit');
      else if(this.screen.keyPress(usrEnter)) {
        this.screen.menuBtnActions.menubtn_reset();
      }
    }
  },
  menubtn_quit:{
    enter:function(){
      this.screen.moveMenuCursor('menubtn_quit');
    },
    keyInput:function(usrU,usrD,usrL,usrR,usrEnter,usrEsc){
      if(this.screen.keyPress(usrU))
        this.setState('menubtn_reset');
      else if(this.screen.keyPress(usrEnter)) {
        this.screen.menuBtnActions.menubtn_quit();
      }
    }
  }
};

var CtrlStates = function(numLanes){
  let stateKeyInputFactory = function(laneIndex,max) {
    var numLanes = max;
    var currentLaneIndex = laneIndex;
    var leftLane = 'laneGroup_'+(currentLaneIndex-1);
    var rightLane = 'laneGroup_'+(currentLaneIndex+1);
    return function(usrU,usrD,usrL,usrR,usrEnter,usrEsc){
      if(this.screen.keyPress(usrL)) {
          if(currentLaneIndex!==0) {
            this.screen.movePlayerLeft();
            this.setState(leftLane);
          }
      } else if(this.screen.keyPress(usrR)) {
          if(currentLaneIndex!==numLanes-1){
            this.screen.movePlayerRight();
            this.setState(rightLane);
          }
      } else if(this.screen.keyPress(usrEsc)) {
        this.screen.pauseGame();
      }
    };
  };
  
  let stateEntryFactory = function(j){
        var k=j;
        return function() {
          //do nothing as player movement is handled in the key press
          //this may change later
          console.log("Entered Lane "+k);
        };
  };
  
  for(let i = 0;i < numLanes;i++) {
    let state = {
      enter: stateEntryFactory(i),
      keyInput:stateKeyInputFactory(i,numLanes)
    }; 
    this['laneGroup_'+i] = state;
  }
};

class PlayScreen extends GameScreen {
  constructor(p,setCurrentScreen,canvasWidth,canvasHeight,debug) {
    super(p,setCurrentScreen,canvasWidth,canvasHeight,debug);
    
    //this will be selectable in the future
    this.level = level;
    
    //constants for game state
    this.FIRSTRUN = 0;
    this.COUNTDOWN = 1;
    this.RUNNING = 2;
    this.STOPPED = 3;
    
    //game stateful info
    this.paused = false;
    this.gameState = this.FIRSTRUN;
    this.playerLane = 1;
    this.playerMoving = false;
    
    //countdown rate
    let startCount = 3;
    let countSpeed = 1.05 / this.targetFrameRate;
    
    //pause button pos/size
    let pauseBtnPosX = this.widthPctI(16);
    let pauseBtnPosY = this.heightPctI(5);
    let pauseBtnWidth = this.widthPctI(28);
    let pauseBtnHeight = this.heightPctI(7);
    //menu button pos/size
    let menuBtnPosX = this.widthPctI(50);
    let menuBtnPosY = this.heightPctI(55);
    let menuBtnWidth = this.widthPctI(65);
    let menuBtnHeight = this.widthPctI(10);
    let menuBtnSpace = this.heightPctI(6);
    //ground pos/size
    let groundWidth = this.widthPctI(80);
    let groundHeight = this.heightPctI(80);
    //lane pos/size
    let laneWidth = this.widthPctI(15);
    let laneHeight = this.heightPctI(80);
    let laneY = this.heightPctI(50);
    let laneSpace = this.widthPct(5);
    //player pos/size
    let playerPosX = this.widthPctI(50);
    let playerPosY = this.heightPctI(85);
    let playerWidth = this.widthPctI(9);
    let playerHeight = this.widthPctI(9);
    //dialogue pos/size
    let dialoguePosX = this.widthPctI(50);
    let dialoguePosY = this.heightPctI(30);
    let dialogueWidth = this.widthPctI(70);
    let dialogueHeight = this.heightPctI(20);
    let dialogueTextSize = this.heightPctI(4);
    //countdown pos/size
    let countdownPosX = this.widthPctI(50);
    let countdownPosY = this.heightPctI(30);
    let countdownWidth  = this.widthPctI(30);
    let countdownHeight  = this.heightPctI(12);
    let countdownTextSize = this.heightPctI(10);
    //touchareas pos/size
    let lBoundPct = 30;
    let rBoundPct = 30;
    //menuCursor pos/size
    let cursorWidth = this.widthPctI(6);
    let cursorHeight = this.widthPctI(6);
    let cursorOffsetX = this.widthPctI(-6);
    let cursorOffsetY = 0;
    //pickups pos/size
    let pickupWidth = this.widthPctI(7);
    let pickupHeight = this.widthPctI(7);
    //scoreboard pos/size
    let scoreboardPosX = this.widthPctI(80);
    let scoreboardPosY = this.heightPct(8);
    let scoreboardWidth = this.widthPctI(30);
    let scoreboardHeight = this.heightPctI(10);
    
    //border styling
    let borderColor = "rgb(70, 181, 68)";
    let cornerColor = "rgb(71, 165, 69)";
    //menu button styling
    let menuBtnFont = 'Helvetica';
    let menuBtnColor = this.p.color(209, 176, 87);
    let menuBtnTextColor = this.p.color(80, 60, 5);
    let menuBtnRounding = this.widthPctI(3);
    let menuBtnBoxMargin = this.heightPctI(1.3);
    //pause button styling
    let pauseBtnFont = 'Helvetica';
    let pauseBtnColor = this.p.color(209, 176, 87);
    let pauseBtnTextColor = this.p.color(80, 60, 5);
    let pauseBtnRounding = this.widthPctI(0.5);
    let pauseBtnBoxMargin = this.heightPctI(1);
    //countdown styling
    let countdownBoxMargin = this.heightPctI(1);
    let countdownRounding  = this.widthPctI(0.5);
    let countdownBoxColor = "rgb(20,20,20)";
    let countdownFont = "Arial";
    let countdownTextColor = "rgb(256,256,256)";
    //menu overlay styling
    let menuOverlayColor = this.p.color(20,20,20,150);
    //scoreboard styling
    let scoreboardTextSize = this.widthPctI(4);
    
    //list all menu buttons
    this.menuBtnElems = ['menubtn_start','menubtn_back','menubtn_resume','menubtn_reset','menubtn_quit'];
    this.menuBtnStrs = {
      'menubtn_start':'Start',
      'menubtn_back':'Back',
      'menubtn_resume':'Resume',
      'menubtn_reset':'Reset',
      'menubtn_quit':'Quit'
    }
    //all menu button layout indices (how far they come down the screen)
    this.menuBtnOffsetIndices = {'menubtn_start':0,'menubtn_back':1,'menubtn_resume':0,'menubtn_reset':1,'menubtn_quit':2}
    
    //declare default menu visibility
    this.state2DefaultMenuOpen = {};
    this.state2DefaultMenuOpen[this.FIRSTRUN] = true;
    this.state2DefaultMenuOpen[this.COUNTDOWN] = false;
    this.state2DefaultMenuOpen[this.RUNNING] = false;
    this.state2DefaultMenuOpen[this.STOPPED] = true;
    
    //associate buttons with game state
    this.state2Btns = {};
    this.state2Btns[this.FIRSTRUN] = ['menubtn_start','menubtn_back'];
    this.state2Btns[this.COUNTDOWN] = ['menubtn_resume','menubtn_reset','menubtn_quit'];
    this.state2Btns[this.RUNNING] = ['menubtn_resume','menubtn_reset','menubtn_quit'];
    this.state2Btns[this.STOPPED] = ['menubtn_reset','menubtn_quit'];
    
    //associate menu text with game state
    let pauseText = "Paused";
    this.state2menuText = {};
    this.state2menuText[this.FIRSTRUN] = "Press the start button to play.";
    this.state2menuText[this.COUNTDOWN] = pauseText;
    this.state2menuText[this.RUNNING] = pauseText;
    this.state2menuText[this.STOPPED] = "The End. Play again?";
    
    //pause button text
    let pauseBtnStr = "Pause";
    
    //specify menu actions
    //specify back action
    let backCallback = function() {
      this.setCurrentScreen('title');
      this.changeGameState(this.FIRSTRUN);
    };
    this.backCallback = backCallback.bind(this);
    //specify pause action
    this.pauseCallback = (function() {this.pauseGame();}).bind(this);
    //specify resume action
    this.resumeCallback = (function() {this.resumeGame();}).bind(this);
    //specify start action
    this.startCallBack = (function() {this.changeGameState(this.COUNTDOWN);}).bind(this);
    //specify reset action
    this.resetCallBack = (function() {this.changeGameState(this.FIRSTRUN);}).bind(this);
    //aggregate button callbacks
    this.menuBtnActions = {
      'menubtn_start':this.startCallBack,
      'menubtn_back':this.backCallback,
      'menubtn_quit':this.backCallback,
      'menubtn_resume':this.resumeCallback,
      'menubtn_reset':this.resetCallBack
    };
    //specify countdown done action
    let handleCounterDone = (function() {this.changeGameState(this.RUNNING);}).bind(this);
    //specify gameover action
    let gameoverCallback = (function() {
      console.log("STOPPING GAME");
      this.changeGameState(this.STOPPED);
    }).bind(this);
    
    //misc ground
    let numLanes = 3;
    this.defaultLane = "laneGroup_"+Math.floor(numLanes/2);
    this.maxGroundSpeed = 14;
    
    //the sub-object that keeps all the member elements
    this.elems = {
      pauseBtn : new MenuButton(
        pauseBtnPosX, pauseBtnPosY, pauseBtnWidth, pauseBtnHeight,
        pauseBtnStr, pauseBtnBoxMargin, pauseBtnRounding,
        pauseBtnColor, pauseBtnFont, pauseBtnTextColor
      ),
      ground : new ScrollGround(this.widthPctI(50),this.heightPctI(50),groundWidth,groundHeight,
        0,this.p.loadImage(groundImg)
      ),
      border : new Border(this.widthPct(50),this.heightPct(50),this.widthPct(100),this.widthPct(100),
        this.widthPctI(50),this.heightPctI(50),groundWidth,groundHeight,borderColor,cornerColor),
      laneGroup : new LaneGroup(this.widthPctI(50),laneY,
        laneWidth,laneHeight,laneSpace,this.p.loadImage(laneMarkerImg)
      ),
      player : new Player(playerPosX,playerPosY,playerWidth,playerHeight,this.p.loadImage(playerCupImg)),
      countdownText : new CountdownDisplay(
        countdownPosX, countdownPosY, countdownWidth, countdownHeight,
        countdownTextSize,countdownBoxMargin,countdownRounding,
        countdownBoxColor,countdownFont,countdownTextColor,
        startCount,countSpeed,0,handleCounterDone
      ),
      menuOverlay : new class MenuOverlay extends CenterElem {
        constructor(x,y,width,height,overlayColor){
          super(x,y,width,height);
          this.overlayColor = overlayColor;
        }
        render(p) {
          p.fill(this.overlayColor);
          p.rect(this.leftX,this.topY,this.width,this.height);
        }
      }(this.widthPct(50),this.heightPct(50),this.widthPctI(100),this.heightPctI(100),
        menuOverlayColor
      ),
      menuText : new TextBox(
        dialoguePosX,dialoguePosY,dialogueWidth,dialogueHeight,
        "BLANK",dialogueTextSize,
        countdownBoxMargin,countdownRounding,
        countdownBoxColor,countdownFont,countdownTextColor
      ),
      screenLeftRect : new InvisRect(this.widthPctI(lBoundPct/2),this.heightPctI(50),
        this.widthPctI(lBoundPct),this.heightPctI(100)
      ),
      screenRightRect : new InvisRect(this.widthPctI(100 - rBoundPct/2),this.heightPctI(50),
        this.widthPctI(lBoundPct),this.heightPctI(100)
      ),
      menuCursor : new Cursor(0,0,cursorWidth,cursorHeight,cursorOffsetX,cursorOffsetY)
    };
    //auto calc menu buttons
    for(var i=0;i<this.menuBtnElems.length;i++) {
      let btnElem = this.menuBtnElems[i];
      let btnStr = this.menuBtnStrs[btnElem];
      let offset = this.menuBtnOffsetIndices[btnElem]*(menuBtnHeight+menuBtnSpace);
      this.elems[btnElem] = new MenuButton(
        menuBtnPosX, menuBtnPosY+offset, menuBtnWidth, menuBtnHeight,
        btnStr, menuBtnBoxMargin, menuBtnRounding,
        menuBtnColor, menuBtnFont, menuBtnTextColor
      );
    }
    //add the pickup tracker, referencing the laneGroup elem
    this.elems.pickupTracker = new PickupTracker(this.p,this.elems.laneGroup,
      pickupWidth,pickupHeight,this.maxGroundSpeed,this.heightPctI(100),
      this.targetFrameRate,gameoverCallback);
    //add the scoreboard, referencing the pickup tracker
    this.elems.scoreboard = new Scoreboard(scoreboardPosX,scoreboardPosY,
      scoreboardWidth,scoreboardHeight,scoreboardTextSize,this.elems.pickupTracker);
      
    //populate lane group
    this.elems.laneGroup.createLanes(numLanes);
    
    //flattened DAG for layout priority
    this.layout = [];
    //control layout visibility
    this.elemVisible = {};
    //control click handling
    //if handles return true, the click propagates to lower elements
    this.elemHandleClick = {};
    
    //ground
    this.layout.push("ground");
    //lanes
    this.layout.push("laneGroup");
    //pickup tracker
    this.layout.push("pickupTracker");
    //player
    this.layout.push("player");
    //border
    this.layout.push("border");
    //countdown
    this.layout.push("scoreboard");
    //countdown group
    this.layout.push("countdownText");
    this.elemVisible["countdownText"] = false;
    //screen left
    this.layout.push("screenLeftRect");
    this.elemVisible["screenLeftRect"] = true;
    this.elemHandleClick["screenLeftRect"] = function() {
      if(this.gameState === this.RUNNING)
        this.movePlayerLeft();
      return false;
    }.bind(this);
    //screen right
    this.layout.push("screenRightRect");
    this.elemVisible["screenRightRect"] = true;
    this.elemHandleClick["screenRightRect"] = function() {
      if(this.gameState === this.RUNNING)
        this.movePlayerRight();
      return false;
    }.bind(this);
    
    //menu overlay
    this.layout.push("menuOverlay");
    this.elemVisible["menuOverlay"] = false;
    this.elemHandleClick["menuOverlay"] = function() {return false;};
    //pause btn
    this.layout.push("pauseBtn");
    this.elemVisible["pauseBtn"] = false;
    this.elemHandleClick["pauseBtn"] = this.pauseCallback;
    //text display
    this.layout.push("menuText");
    this.elemVisible["menuText"] = true;
    //button group
    for(let i = 0;i < this.menuBtnElems.length;i++) {
      let btnElem = this.menuBtnElems[i];
      this.layout.push(btnElem);
      this.elemVisible[btnElem] = true;
      this.elemHandleClick[btnElem] = this.menuBtnActions[btnElem];
    }
    //menu cursor
    this.layout.push("menuCursor");
    this.elemVisible["menuCursor"] = true;
    
    //set up the FSMs that handle keyboard/mouse
    this.menuFSM = new FiniteStateMachine(this);
    let menuStateNames = Object.keys(menuStates);
    for(let i = 0;i < menuStateNames.length;i++) {
      let stateName = menuStateNames[i];
      this.menuFSM.addState(stateName,new State(menuStates[stateName]));
    }
    
    this.ctrlFSM = new FiniteStateMachine(this);
    //the states are dynamically gen'd based on the number of lanes
    let ctrlStates = new CtrlStates(numLanes);
    let ctrlStateNames = Object.keys(ctrlStates);
    for(let i = 0;i < ctrlStateNames.length;i++) {
      let stateName = ctrlStateNames[i];
      this.ctrlFSM.addState(stateName,new State(ctrlStates[stateName]));
    }
    
    //put this here so the initial state is handled regularly
    this.changeGameState = changeGameState.bind(this);
    this.changeGameState(this.FIRSTRUN);
  }
  
  //this can be calculated from the internal state 
  get menuOpen() {
    return (this.gameState===this.FIRSTRUN) || (this.gameState === this.STOPPED) || (this.paused===true);
  }
  
  set groundSpeed(newSpeed) {this.elems.ground.setSpeed(newSpeed);}
  get groundSpeed() {return this.elems.ground.scrollSpeed;}
  updatePlayerLane() {this.elems.player.x = this.elems.laneGroup.getLanePosX(this.playerLane);}
  movePlayerLeft() {
    if(this.playerLane > 0) {
      this.playerLane -= 1;
      this.updatePlayerLane();
    }
  }
  movePlayerRight() {
    if(this.playerLane < this.elems.laneGroup.length-1) {
      this.playerLane += 1;
      this.updatePlayerLane();
    }
  }
  
  pauseGame() {
    this.paused = true;
    
    this.elems.countdownText.disableCounter();
    this.elems.ground.disableMove();
    this.elems.pickupTracker.disableMove();
    this.menuFSM.enable();
    this.ctrlFSM.disable();
    
    this.elemVisible['menuOverlay'] = true;
    this.elemVisible['menuText'] = true;
    this.elemVisible['menuCursor'] = true;
    let showBtns = this.state2Btns[this.gameState];
    for(let i = 0;i < showBtns.length;i++)
      this.elemVisible[showBtns[i]] = true;
  }
  
  resumeGame() {
    this.elems.countdownText.enableCounter();
    this.elems.ground.enableMove();
    this.elems.pickupTracker.enableMove();
    this.menuFSM.disable();
    this.ctrlFSM.enable();
    
    this.elemVisible['menuOverlay'] = false;
    this.elemVisible['menuText'] = false;
    this.elemVisible['menuCursor'] = false;
    let showBtns = this.state2Btns[this.gameState];
    for(let i = 0;i < showBtns.length;i++)
      this.elemVisible[showBtns[i]] = false;
    
    this.paused = false;
  }
  
  moveMenuCursor(elem) {
    let cursor = this.elems.menuCursor;
    cursor.moveToElem(this.elems[elem],cursor.offsetElemLeft(this.elems[elem],this.widthPctI(2)));
  }
  
  handleMouseClick() {
    var mX = this.p.mouseX,
      mY = this.p.mouseY;
    
    for(let i = 0;i < this.layout.length;i++) {
      let elem = this.layout[this.layout.length-1-i];
      if((elem in this.elemHandleClick) && this.elemVisible[elem] && this.elems[elem].isAtPoint(mX,mY)) {
        let propagate = this.elemHandleClick[elem]();
        if(!propagate)
          break;
      }
    }
  }
  
  handleKeyboard(usrU,usrD,usrL,usrR,usrEnter,usrEsc) {
    if(this.menuOpen) {
      this.menuFSM.handleKeyboard(usrU,usrD,usrL,usrR,usrEnter,usrEsc);
    } else {
      this.ctrlFSM.handleKeyboard(usrU,usrD,usrL,usrR,usrEnter,usrEsc);
    }
    return true;
  }
  
  render() {
    this.p.background(this.p.color(10,50,90));
    for(let i = 0;i < this.layout.length;i++) {
      let elemStr = this.layout[i];
      if(!(elemStr in this.elemVisible) || (this.elemVisible[elemStr] === true)) {
        this.elems[elemStr].render(this.p);
      }
    }
  }
}
export default PlayScreen;