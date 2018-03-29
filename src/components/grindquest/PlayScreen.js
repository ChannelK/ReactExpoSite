import GameScreen from './GameScreen';
import MenuButton from './MenuButton';
import CenterElem from './CenterElem';
import TextBox from './TextBox';
import groundImg from '../../assets/PixelGrass.png';

class ScrollGround extends CenterElem {
  constructor(x,y,width,height,scrollSpeed,srcImg) {
    super(x,y,width,height);
    this.scrollSpeed = scrollSpeed;
    this.srcImg = srcImg;
    this.sy = this.srcImg.height-this.srcImg.width-1;
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
    this.moveGround();
  }
}
class Lane extends CenterElem {
  constructor(x,y,width,height) {
    super(x,y,width,height);
    this.markerX = x;
    this.markerY = Math.round(y+height*0.2);
  }
  
  render(p) {
    let markerSide = Math.round(this.width/2);
    p.push();
    p.rectMode(p.CENTER);
    p.fill(237,201,175,150);
    p.rect(this.x,this.y,this.width,this.height);
    p.fill(10,10,10);
    p.rect(this.markerX,this.markerY,markerSide,markerSide);
    p.pop();
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
    this.counter = 0;
    //used to buffer speed for pausing
    this.prePauseSpeed = 0;
    
    //countdown rate
    this.maxCount = 3;
    this.countSpeed = 1.05 / this.targetFrameRate;
    
    //pause button pos/size
    this.pauseBtnPosX = this.widthPctI(16);
    this.pauseBtnPosY = this.heightPctI(5);
    this.pauseBtnWidth = this.widthPctI(28);
    this.pauseBtnHeight = this.heightPctI(7);
    //menu button pos/size
    this.menuBtnPosX = this.widthPctI(50);
    this.menuBtnPosY = this.heightPctI(55);
    this.menuBtnWidth = this.widthPctI(65);
    this.menuBtnHeight = this.widthPctI(10);
    this.menuBtnSpace = this.heightPctI(6);
    //ground pos/size
    let groundWidth = this.widthPctI(80);
    let groundHeight = this.heightPctI(80);
    //lane pos/size
    this.laneWidth = this.widthPctI(15);
    this.laneHeight = this.heightPctI(80);
    this.laneY = this.heightPctI(50);
    this.laneSpace = this.widthPct(5);
    //player pos/size
    this.playerPosX = this.widthPctI(50);
    this.playerPosY = this.heightPctI(85);
    this.playerWidth = this.widthPctI(5);
    this.playerHeight = this.widthPctI(5);
    //dialogue pos/size
    this.dialoguePosX = this.widthPctI(50);
    this.dialoguePosY = this.heightPctI(30);
    this.dialogueWidth = this.widthPctI(70);
    this.dialogueHeight = this.heightPctI(20);
    this.dialogueTextSize = this.heightPctI(4);
    //countdown pos/size
    this.countdownPosX = this.widthPctI(50);
    this.countdownPosY = this.heightPctI(30);
    this.countdownWidth  = this.widthPctI(30);
    this.countdownHeight  = this.heightPctI(12);
    this.countdownTextSize = this.heightPctI(10);
    
    //menu button styling
    this.menuBtnFont = 'Helvetica';
    this.menuBtnColor = this.p.color(209, 176, 87);
    this.menuBtnTextColor = this.p.color(80, 60, 5);
    this.menuBtnRounding = this.widthPctI(3);
    this.menuBtnBoxMargin = this.heightPctI(1.3);
    //pause button styling
    this.pauseBtnFont = 'Helvetica';
    this.pauseBtnColor = this.p.color(209, 176, 87);
    this.pauseBtnTextColor = this.p.color(80, 60, 5);
    this.pauseBtnRounding = this.widthPctI(0.5);
    this.pauseBtnBoxMargin = this.heightPctI(1);
    //countdown styling
    this.countdownBoxMargin = this.heightPctI(1);
    this.countdownRounding  = this.widthPctI(0.5);
    this.countdownBoxColor = "rgba(20,20,20,200)";
    this.countdownFont = "Arial";
    this.countdownTextColor = "rgb(256,256,256)";
    
    //list all menu buttons
    this.menuBtnStrs = ['Start','Back','Resume','Reset','Quit'];
    //all menu button layout indices (how far they come down the screen)
    this.menuBtnOffsetIndices = {'Start':0,'Back':1,'Resume':0,'Reset':1,'Quit':2}
    
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
    this.pauseBtnStr = "Pause";
    
    
    //specify menu actions
    //specify back action
    let backCallback = function() {
      this.setCurrentScreen('title');
      this.changeGameState(this.FIRSTRUN);
    };
    this.backCallback = backCallback.bind(this);
    //specify pause action
    let pauseCallback = function() {this.pauseGame();};
    this.pauseCallback = pauseCallback.bind(this);
    //specify resume action
    let resumeCallback = function() {this.resumeGame();};
    this.resumeCallback = resumeCallback.bind(this);
    //specify start action
    let startCallBack = function() {this.changeGameState(this.COUNTDOWN);};
    this.startCallBack = startCallBack.bind(this);
    //specify reset action
    let resetCallBack = function() {this.changeGameState(this.FIRSTRUN);};
    this.resetCallBack = resetCallBack.bind(this);
    //aggregate callbacks
    this.menuBtnActions = {
      'Start':this.startCallBack,
      'Back':this.backCallback,
      'Quit':this.backCallback,
      'Resume':this.resumeCallback,
      'Reset':this.resetCallBack
    };
    
    //misc ground
    let numLanes = 3;
    this.maxGroundSpeed = 5.3;
      
    //auto calc menu buttons
    this.menuBtns = {};
    for(var i=0;i<this.menuBtnStrs.length;i++) {
      let btnStr = this.menuBtnStrs[i];
      let offset = this.menuBtnOffsetIndices[btnStr]*(this.menuBtnHeight+this.menuBtnSpace);
      //(x,y,width,height,str,boxMargin,rounding,boxColor,font,textColor)
      this.menuBtns[btnStr] = new MenuButton(
        this.menuBtnPosX, this.menuBtnPosY+offset, this.menuBtnWidth, this.menuBtnHeight,
        btnStr, this.menuBtnBoxMargin, this.menuBtnRounding,
        this.menuBtnColor, this.menuBtnFont, this.menuBtnTextColor
      );
    }
    //auto calc pause button
    this.pauseBtn = new MenuButton(
      this.pauseBtnPosX, this.pauseBtnPosY, this.pauseBtnWidth, this.pauseBtnHeight,
      this.pauseBtnStr, this.pauseBtnBoxMargin, this.pauseBtnRounding,
      this.pauseBtnColor, this.pauseBtnFont, this.pauseBtnTextColor
    );
    //auto calc ground
    this.ground = new ScrollGround(this.widthPctI(50),this.heightPctI(50),groundWidth,groundHeight,
      0,this.p.loadImage(groundImg));
    //auto calc lanes
    this.lanes = [];
    for(i=0;i<numLanes;i++) {
      let offset = (-1+i)*(this.laneSpace+this.laneWidth);
      this.lanes.push(new Lane(this.widthPctI(50)+offset,this.laneY,this.laneWidth,this.laneHeight));
    }
    //auto calc player
    this.player = new Player(this.playerPosX,this.playerPosY,this.playerWidth,this.playerHeight);
    //auto calc countdown
    this.countdownText = new TextBox(
      this.countdownPosX,this.countdownPosY,this.countdownWidth,this.countdownHeight,
      "BLANK",this.countdownTextSize,
      this.countdownBoxMargin,this.countdownRounding,
      this.countdownBoxColor,this.countdownFont,this.countdownTextColor
    );
    
    //auto calc menu text
    this.menuText = new TextBox(
      this.dialoguePosX,this.dialoguePosY,this.dialogueWidth,this.dialogueHeight,
      "BLANK",this.dialogueTextSize,
      this.countdownBoxMargin,this.countdownRounding,
      this.countdownBoxColor,this.countdownFont,this.countdownTextColor
    );
    
    //auto calc left and right click areas
    let lBoundPct = 30;
    let rBoundPct = 30;
    this.screenLeftRect = new CenterElem(this.widthPctI(lBoundPct/2),this.heightPctI(50),
      this.widthPctI(lBoundPct),this.heightPctI(100)
    );
    this.screenRightRect = new CenterElem(this.widthPctI(100 - rBoundPct/2),this.heightPctI(50),
      this.widthPctI(lBoundPct),this.heightPctI(100)
    );
  }
  
  set groundSpeed(newSpeed) {
    this.ground.setSpeed(newSpeed);
  }
  get groundSpeed() {
    return this.ground.scrollSpeed;
  }
  
  updatePlayerLane() {
    this.player.x = this.lanes[this.playerLane].x;
  }
  
  moveLeft() {
    if(this.playerLane > 0) {
      this.playerLane -= 1;
      this.updatePlayerLane();
    }
  }
  
  moveRight() {
    if(this.playerLane < this.lanes.length-1) {
      this.playerLane += 1;
      this.updatePlayerLane();
    }
  }
  
  pauseGame() {
    this.paused = true;
    this.prePauseSpeed = this.groundSpeed;
    this.groundSpeed = 0;
  }
  
  resumeGame() {
    this.ground.setSpeed(this.prePauseSpeed);
    this.paused = false;
  }
  
  changeGameState(newState) {
    if(newState === this.FIRSTRUN) {
      this.paused = false;
      this.playerLane = 1;
      this.playerMoving = false;
      this.groundSpeed = 0;
      this.counter = this.maxCount;
    } else if(newState === this.COUNTDOWN) {
      this.playerLane = 1;
      this.playerMoving = false;
      this.groundSpeed = 0;
      this.counter = this.maxCount;
    } else if(newState === this.RUNNING) {
      this.playerLane = 1;
      this.playerMoving = false;
      this.groundSpeed = this.maxGroundSpeed;
      this.counter = 0;
    } else if(newState === this.STOPPED) {
      this.paused = false;
      this.playerMoving = false;
      this.groundSpeed = 0;
      this.counter = 0;
    } else
      return;
    this.gameState = newState;
  }
  
  handleMouseClick() {
    var mX = this.p.mouseX,
      mY = this.p.mouseY;
    //pause is like a super-state 
    if(this.paused) {
      if(this.pauseBtn.isAtPoint(mX,mY)) {
        this.resumeCallback();
        return true;
      }
      let pauseBtns = this.state2Btns[this.gameState];
      for(let i = 0;i < pauseBtns.length;i++) {
        if(this.menuBtns[pauseBtns[i]].isAtPoint(mX,mY)) {
          if(this.menuBtnActions[pauseBtns[i]])
            this.menuBtnActions[pauseBtns[i]]();
          return true;
        }
      }
    } else {
      //pause works when the gameMode is not stopped or firstrun
      if((this.gameState === this.RUNNING || this.gameState === this.COUNTDOWN) && this.pauseBtn.isAtPoint(mX,mY)) {
        this.pauseCallback();
        return true;
      }
      //if first run, only enable certain buttons, ignore the pause button
      if(this.gameState === this.FIRSTRUN){
        let firstRunBtns = this.state2Btns[this.FIRSTRUN];
        for(let i = 0;i < firstRunBtns.length;i++) {
          let btnStr = firstRunBtns[i];
          if(this.menuBtns[btnStr].isAtPoint(mX,mY)) {
            if(this.menuBtnActions[btnStr])
              this.menuBtnActions[btnStr]();
            return true;
          }
        }
      }
      //while running, handle the click based on where the click was
      //left and right thirds are the L and R controls
      //the central third should be blank for now
      else if(this.gameState === this.RUNNING) {
        //movement controls disabled while still moving
        if(!this.playerMoving) {
          if(this.screenLeftRect.isAtPoint(mX,mY))
            this.moveLeft();
          else if(this.screenRightRect.isAtPoint(mX,mY))
            this.moveRight();
        }
        return true;
      }
    }
    return true;
  }
  render() {
    this.p.background(this.p.color(10,50,90));
    //draw the ground
    this.ground.render(this.p);
    //draw the lane markers
    for(var i = 0;i < this.lanes.length;i++) {
      this.lanes[i].render(this.p);
    }
    
    //draw the stuff on the lanes
    
    //draw the player
    this.player.render(this.p);
    
    //draw the countdown if game is counting down
    if(this.gameState === this.COUNTDOWN) {
      let countStr = this.counter.toFixed(1);
      if(countStr !== this.countdownText.text)
        this.countdownText.text = countStr;
      this.countdownText.render(this.p);
    }
    
    //draw the relevant menu info
    if(this.paused || this.gameState === this.FIRSTRUN || this.gameState === this.STOPPED) {
      
      let contextBtns = this.state2Btns[this.gameState];
      this.p.fill(20,20,20,150);
      this.p.rect(0,0,this.widthPctI(100),this.heightPctI(100));
      //draw the menu text
      this.menuText.text = this.state2menuText[this.gameState];
      this.menuText.render(this.p);
      for(i=0;i<contextBtns.length;i++) {
        this.menuBtns[contextBtns[i]].render(this.p);
      }
    }
    //draw the pause button if the game is running
    if(this.gameState === this.RUNNING || this.gameState === this.COUNTDOWN) {
      this.pauseBtn.render(this.p);
    }
    
    //state change stuff
    //countdown if necessary
    if(this.gameState === this.COUNTDOWN && !this.paused) {
      if(this.counter-this.countSpeed > 0) {
        this.counter -= this.countSpeed;
      } else
        this.changeGameState(this.RUNNING);
    }
  }
}
export default PlayScreen;