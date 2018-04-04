import GameScreen from './GameScreen';
import MenuButton from './MenuButton';
import CenterElem from './CenterElem';
import TextBox from './TextBox';
import ElemGroup from './ElemGroup';
import groundImg from '../../assets/PixelGrass.png';

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
    //this.sy = (this.sy+this.scrollSpeed) % (this.srcImg.height-this.srcImg.width-1);
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
  constructor(x,y,width,height) {
    super(x,y,width,height);
    this.markerOffsetX = 0;
    this.markerOffsetY = Math.round(height*0.2);
  }
  
  render(p) {
    let markerSide = Math.round(this.width/2);
    p.push();
    p.rectMode(p.CENTER);
    p.fill(237,201,175,150);
    p.rect(this.x,this.y,this.width,this.height);
    p.fill(10,10,10);
    p.rect(this.x+this.markerOffsetX,this.y+this.markerOffsetY,
      markerSide,markerSide);
    p.pop();
  }
}

class LaneGroup extends ElemGroup {
  constructor(x,y,width,height,laneSpace) {
    super(x,y,width,height);
    this.laneWidth = width;
    this.laneHeight = height;
    this.laneSpace = laneSpace;
  }
  
  getLanePosX(laneIndex) {
    return this.elems[laneIndex].x;
  }
  
  createLanes(numLanes) {
    let deltaX = this.laneSpace + this.laneWidth;
    for(let i = 0;i < numLanes;i++) {
      this.addElemLocal(new Lane(deltaX * (-(numLanes-1)/2+i),0,this.laneWidth,this.laneHeight));
    }
  }
}

class Player extends CenterElem {
  render(p) {
    p.push();
    p.rectMode(p.CENTER);
    p.fill(256,120,120);
    p.rect(this.x,this.y,this.width,this.height);
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

function changeGameState(newState) {
  if(this.paused) {
    this.resumeGame();    
  }
  
  if(newState === this.FIRSTRUN) {
    this.playerLane = 1;
    this.playerMoving = false;
    this.groundSpeed = 0;
    this.elems.countdownText.disableCounter();
    
    this.elemVisible['countdownText'] = false;
    this.elemVisible['pauseBtn'] = false;
  } else if(newState === this.COUNTDOWN) {
    this.playerLane = 1;
    this.playerMoving = false;
    this.groundSpeed = 0;
    this.elems.countdownText.resetCounter();
    
    this.elemVisible['pauseBtn'] = true;
    this.elemVisible['countdownText'] = true;
  } else if(newState === this.RUNNING) {
    this.playerLane = 1;
    this.playerMoving = false;
    this.groundSpeed = this.maxGroundSpeed;
    this.counter = 0;
    this.elems.countdownText.disableCounter();
    
    this.elemVisible['countdownText'] = false;
    this.elemVisible['pauseBtn'] = true;
  } else if(newState === this.STOPPED) {
    this.playerMoving = false;
    this.groundSpeed = 0;
    this.counter = 0;
    
    this.elemVisible['pauseBtn'] = false;
  } else
    return;

  //re-set menu visibility
  for(let i = 0;i < this.menuBtnStrs.length;i++) {
    this.elemVisible["menubtn_"+this.menuBtnStrs[i]] = false;
  }
  let menuVisible = this.state2DefaultMenuOpen[newState];
  if(menuVisible) {
    this.elemVisible["menuOverlay"] = true;
    this.elemVisible["menuText"] = true;
    let menuBtnVisible = this.state2Btns[newState];
    for(let i = 0;i < menuBtnVisible.length;i++) {
      this.elemVisible["menubtn_"+menuBtnVisible[i]] = true;
    }
  } else {
    this.elemVisible["menuOverlay"] = false;
    this.elemVisible["menuText"] = false;
  }
  //change the message to the new state's message
  let menuMessage = this.state2menuText[newState];
  this.elems.menuText.text = menuMessage;
  
  this.gameState = newState;
}

class PlayScreen extends GameScreen {
  constructor(p,setCurrentScreen,canvasWidth,canvasHeight,debug) {
    super(p,setCurrentScreen,canvasWidth,canvasHeight,debug);
    
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
    let playerWidth = this.widthPctI(5);
    let playerHeight = this.widthPctI(5);
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
    let countdownBoxColor = "rgba(20,20,20,200)";
    let countdownFont = "Arial";
    let countdownTextColor = "rgb(256,256,256)";
    //menu overlay styling
    let menuOverlayColor = this.p.color(20,20,20,150);
    
    //list all menu buttons
    this.menuBtnStrs = ['Start','Back','Resume','Reset','Quit'];
    //all menu button layout indices (how far they come down the screen)
    this.menuBtnOffsetIndices = {'Start':0,'Back':1,'Resume':0,'Reset':1,'Quit':2}
    
    //declare default menu visibility
    this.state2DefaultMenuOpen = {};
    this.state2DefaultMenuOpen[this.FIRSTRUN] = true;
    this.state2DefaultMenuOpen[this.COUNTDOWN] = false;
    this.state2DefaultMenuOpen[this.RUNNING] = false;
    this.state2DefaultMenuOpen[this.STOPPED] = true;
    
    //associate buttons with game state
    let pauseMenu = ['Resume','Reset','Quit'];
    this.state2Btns = {};
    this.state2Btns[this.FIRSTRUN] = ['Start','Back'];
    this.state2Btns[this.COUNTDOWN] = pauseMenu;
    this.state2Btns[this.RUNNING] = pauseMenu;
    this.state2Btns[this.STOPPED] = ['Start','Quit'];
    
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
      'Start':this.startCallBack,
      'Back':this.backCallback,
      'Quit':this.backCallback,
      'Resume':this.resumeCallback,
      'Reset':this.resetCallBack
    };
    //specify countdown done action
    let handleCounterDone = (function() {this.changeGameState(this.RUNNING);}).bind(this);
    
    //misc ground
    let numLanes = 3;
    this.maxGroundSpeed = 5.3;
    
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
      laneGroup : new LaneGroup(this.widthPctI(50),laneY,
        laneWidth,laneHeight,laneSpace
      ),
      player : new Player(playerPosX,playerPosY,playerWidth,playerHeight),
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
      )
    };
    //auto calc menu buttons
    for(var i=0;i<this.menuBtnStrs.length;i++) {
      let btnStr = this.menuBtnStrs[i];
      let offset = this.menuBtnOffsetIndices[btnStr]*(menuBtnHeight+menuBtnSpace);
      //(x,y,width,height,str,boxMargin,rounding,boxColor,font,textColor)
      this.elems['menubtn_'+btnStr] = new MenuButton(
        menuBtnPosX, menuBtnPosY+offset, menuBtnWidth, menuBtnHeight,
        btnStr, menuBtnBoxMargin, menuBtnRounding,
        menuBtnColor, menuBtnFont, menuBtnTextColor
      );
    }
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
    //player
    this.layout.push("player");
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
    //this.layout.push(this.menuBtnGroup);
    //this.elemVisible[this.menuBtnGroup] = true;
    for(let i = 0;i < this.menuBtnStrs.length;i++) {
      let str = this.menuBtnStrs[i];
      this.layout.push("menubtn_"+str);
      this.elemVisible["menubtn_"+str] = true;
      this.elemHandleClick["menubtn_"+str] = this.menuBtnActions[str];
    }
    
    //put this here so the initial state is handled regularly
    this.changeGameState = changeGameState.bind(this);
    this.changeGameState(this.FIRSTRUN);
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
    
    this.elemVisible['menuOverlay'] = true;
    this.elemVisible['menuText'] = true;
    let showBtns = this.state2Btns[this.gameState];
    for(let i = 0;i < showBtns.length;i++)
      this.elemVisible["menubtn_"+showBtns[i]] = true;
  }
  
  resumeGame() {
    this.elems.countdownText.enableCounter();
    this.elems.ground.enableMove();
    
    this.elemVisible['menuOverlay'] = false;
    this.elemVisible['menuText'] = false;
    let showBtns = this.state2Btns[this.gameState];
    for(let i = 0;i < showBtns.length;i++)
      this.elemVisible["menubtn_"+showBtns[i]] = false;
    
    this.paused = false;
  }
  
  handleMouseClick() {
    var mX = this.p.mouseX,
      mY = this.p.mouseY;
    
    for(let i = 0;i < this.layout.length;i++) {
      let elem = this.layout[this.layout.length-1-i];
      if(this.elemVisible[elem] && this.elems[elem].isAtPoint(mX,mY)) {
        let propagate = this.elemHandleClick[elem]();
        if(!propagate)
          break;
      }
    }
  }
  render() {
    this.p.background(this.p.color(10,50,90));
    for(let i = 0;i < this.layout.length;i++) {
      let elemStr = this.layout[i];
      if(!(elemStr in this.elemVisible) || (this.elemVisible[elemStr] === true)) {
        //console.log("Rendering "+elemStr);
        this.elems[elemStr].render(this.p);
      }
    }
  }
}
export default PlayScreen;