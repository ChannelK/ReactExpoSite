import CenterElem from './CenterElem';
import ElemGroup from './ElemGroup';
import LinkedList from './LinkedList';

class PickupTracker extends ElemGroup {
  constructor(x,y,width,height,bottomEdge) {
    super(x,y,width,height);
    this.bottomEdge = bottomEdge;
    
    this.pickupOrder = [];
    this.nextOrder = -1;
    this.picked = [];
    this.pickup2CreateTime = {};
    this.levelPickups = null;
    
    this.activePickups = new LinkedList();
  }
  
  loadLevel(level) {
    this.levelPickups = level.pickupArray;
    for(let i = 0;i < this.levelPickups.length;i++)
      this.pickupOrder.push(i);
    this.pickupOrder.sort(
      function(a,b){
          return this[a].createTime < this[b].createTime;
      }.bind(level.pickupArray)
    );
    this.nextOrder = 0;
  }
  
  //moves the group and returns and object if there is a collision
  tickGroup(player) {
    //add new pickups if it is their time
    
    //move all the pickups, remove if they have gone over the edge
    for(let i = 0;i < this.elems.length;i++) {
      this.elems[i].movePick();
      if(this.elems[i].topY < this.bottomEdge) {
        //remove elem
        console.log("Elem "+i+" went over the bottom edge");
        //for test purposes, remove later
        this.elems[i].y = -this.elems[i].height/2;
      }
      
    }
    //determine collision
    for(let i = 0;i < this.elems.length;i++) {
      if(player.rectCollision(this.elems[i]))
        console.log("Player collided with elem"+1);
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
}

export { PickupTracker, LanePickup };