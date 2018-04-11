import CenterElem from './CenterElem';
import LinkedList from './LinkedList';

class PickupTracker {
  constructor(x,y,width,height,bottomEdge) {
    this.bottomEdge = bottomEdge;
    
    //holds pickups the player has gotten
    this.picked = null;
    //reference to the pickups array in the level object
    this.levelPickups = null;
    //holds all yet-to-create pickups
    this.queuedPickups = null;
    this.queuedPickups_i = null;
    //holds all active pickups
    this.activePickups = null;
  }
  
  loadLevel(level) {
    //initialize level data
    this.picked = [];
    this.levelPickups = level.pickupArray;
    this.queuedPickups = new LinkedList();
    this.activePickups = new LinkedList();
    //sort the pickups by creation time
    let pickupCreateOrder = [];
    for(let i = 0;i < this.levelPickups.length;i++)
      pickupCreateOrder.push(i);
    pickupCreateOrder.sort(
      function(a,b){
          return this[a].createTime < this[b].createTime;
      }.bind(this.levelPickups)
    );
    //load the pickups and set its iterator
    for(let i = 0;i < pickupCreateOrder.length;i++) {
      let pickupIndex = pickupCreateOrder[i];
      this.queuedPickups.addElem(this.levelPickups[pickupIndex]);
    }
    this.queuedPickups_i = this.queuedPickups.iterator();
  }
  
  //moves the group and returns and object if there is a collision
  tickGroup(player) {
    //add new pickups if it is their time
    
    //move all the pickups, remove if they have gone over the edge
    let iter = this.activePickups.iterator();
    for(let pickup = iter.next();iter.hasNext();pickup = iter.next()) {
      pickup.movePickup();
      if(pickup.topY < this.bottomEdge) {
        //remove elem
        console.log("Elem "+pickup+" went over the bottom edge");
        //for test purposes, remove later
        this.pickup.y = -this.pickup.height/2;
      }
    }
    iter.reset();
    //determine collision
    for(let pickup = iter.next();iter.hasNext();pickup = iter.next()) {
      if(player.rectCollision(pickup))
        console.log("Player collided with elem"+pickup);
    }
    return;
  }
}

class LanePickup extends CenterElem{
  constructor(x,y,width,height,moveSpeed) {
    super(x,y,width,height);
    this.moveSpeed = moveSpeed;
  }
  
  movePickup(){
    this.y = this.y + this.moveSpeed;
  }
  
  render(p) {
    p.push();
    p.fill('rgb(10,10,256)');
    p.ellipse(this.x,this.y,this.width,this.height);
    p.pop();
  }
  
  toString() {
    return "("+this.x+","+this.y+")";
  }
}

export { PickupTracker, LanePickup };