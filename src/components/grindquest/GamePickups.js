import CenterElem from './CenterElem';
import LinkedList from './LinkedList';
import brownBeanImg from '../../assets/GameBean_brown.png';
import greenBeanImg from '../../assets/GameBean_green.png';

class PickupTracker {
  //constructor needs to get the lanes and pickup dimensions
  constructor(p,laneGroup,pickupWidth,pickupHeight,pickupSpeed,bottomEdge,targetFrameRate,gameoverCallback) {
    this.laneGroup = laneGroup;
    this.pickupWidth = pickupWidth;
    this.pickupHeight = pickupHeight;
    this.pickupSpeed = pickupSpeed;
    this.bottomEdge = bottomEdge;
    this.secsPerFrame = 1.0/targetFrameRate;
    
    //holds pickups the player has gotten
    this.picked = null;
    //reference to the pickups array in the level object
    this.levelPickups = null;
    //holds all yet-to-create pickups
    this.queuedPickups = null;
    this.queuedPickups_i = null;
    //holds all active pickups
    this.activePickups = null;
    //gives the ability to pause
    this.enabled = true;
    //relates pickup types to their icons
    this.type2Icon = null;
    //calls this when the game is finished
    this.gameoverCallback = gameoverCallback;
    
    //the required amount of pickups
    this.goalPickups = null;
    
    //timer for keeping track of game creation
    this.totalTime = 0;
    
    //hard coded until a better alternative is found
    this.icon2Image = {
      brownBeanImg : p.loadImage(brownBeanImg),
      greenBeanImg : p.loadImage(greenBeanImg)
    };
  }
  
  enableMove() {
    this.enabled = true;
  }
  disableMove() {
    this.enabled = false;
  }
  
  loadLevel(player,level) {
    this.player = player;
    //initialize level data
    this.picked = [];
    this.levelPickups = level.pickupArray;
    this.queuedPickups = new LinkedList();
    this.activePickups = new LinkedList();
    this.type2Icon = {};
    this.goalPickups = level.levelProps.goalPickups;
    //sort the pickups by creation time
    let pickupCreateOrder = [];
    for(let i = 0;i < this.levelPickups.length;i++)
      pickupCreateOrder.push(i);
    pickupCreateOrder.sort(
      function(a,b){
          let isLT = this[a].createAt - this[b].createAt;
          return isLT;
      }.bind(this.levelPickups)
    );
    //load the pickups and set its iterator
    for(let i = 0;i < pickupCreateOrder.length;i++) {
      let pickupIndex = pickupCreateOrder[i];
      console.log("Queue pickup "+pickupIndex+" for time "+this.levelPickups[pickupIndex].createAt);
      this.queuedPickups.addElem(this.levelPickups[pickupIndex]);
    }
    this.queuedPickups_i = this.queuedPickups.iterator();
    //load images required
    let pickupTypes = Object.keys(level.pickupTypes);
    for(let i = 0;i < pickupTypes.length;i++) {
      let pickupType = pickupTypes[i];
      let icon = level.pickupTypes[pickupTypes[i]].icon;
      this.type2Icon[pickupType] = icon;
    }
  }
  //moves the group and returns and object if there is a collision
  tickGroup(time) {
    if(!this.enabled || this.activePickups === null) {
      return;
    }
    
    //add new pickups if it is their time
    while (this.queuedPickups_i.hasNext() && this.queuedPickups_i.peekNext().createAt <= time) {
      let pickupSpec = this.queuedPickups_i.next();
      let x = this.laneGroup.getLanePosX(pickupSpec.lane);
      let y = -this.pickupHeight/2;
      //type will just change the image
      this.activePickups.addElem(new LanePickup(x,y,this.pickupWidth,this.pickupHeight,
        this.pickupSpeed,pickupSpec.type,this.icon2Image[this.type2Icon[pickupSpec.type]]
      ));
    }
    
    //move all the pickups, remove if they have gone over the edge
    let iter = this.activePickups.iterator();
    while(iter.hasNext()) {
      let pickup = iter.next();
      pickup.movePickup();
      if(pickup.topY >= this.bottomEdge) {
        //remove elem
        //console.log("Elem "+pickup+" went over the bottom edge");
        iter.remove();
      }
    }
    iter.reset();
    //determine collisions and remove as necessary
    while(iter.hasNext()) {
      let pickup = iter.next();
      if(this.player.rectCollision(pickup)) {
        //console.log("Player collided with elem"+pickup);
        this.picked.push(iter.remove());
      }
    }
  }
  
  //clears everything
  quit() {
    this.picked = null;
    this.levelPickups = null;
    this.queuedPickups = null;
    this.queuedPickups_i = null;
    this.activePickups = null;
    this.type2Icon = null;
    this.totalTime = 0;
  }
  
  isGameOver() {
    //the game's end condition
    if(this.activePickups === null || this.queuedPickups === null)
      return false;
    return (this.picked.length >= this.goalPickups) || 
      (this.activePickups.length === 0 && !this.queuedPickups_i.hasNext());
  }
  
  calcScore() {
    let numGoodBeans = 0;
    for(let i = 0;i < this.picked.length;i++) {
      if(this.picked[i].type === "BrownBean")
        numGoodBeans++;
      console.log("Picked up a "+this.picked[i].type);
    }
    let score = numGoodBeans*100/this.goalPickups;
    return score.toFixed(1);
  }
  
  render(p) {
    if(this.enabled && this.activePickups !== null) {
      this.totalTime+=this.secsPerFrame;
      this.tickGroup(this.totalTime);
    }
    if(this.activePickups !== null) {
      let iter = this.activePickups.iterator();
      while(iter.hasNext()) {
        iter.next().render(p);
      }
    }
    if(this.enabled && this.isGameOver())
      this.gameoverCallback();
  }
}

class LanePickup extends CenterElem{
  constructor(x,y,width,height,moveSpeed,type,image) {
    super(x,y,width,height);
    this.moveSpeed = moveSpeed;
    this.type = type;
    this.image = image;
  }
  
  movePickup(){
    this.y = this.y + this.moveSpeed;
  }
  
  render(p) {
    p.push();
    p.fill('rgb(10,10,256)');
    p.image(this.image,this.leftX,this.topY,this.width,this.height);
    p.pop();
  }
  
  toString() {
    return "("+this.x+","+this.y+")";
  }
}

export { PickupTracker, LanePickup };