class ListNode {
  constructor(val,next) {
    this.val = val;
    this.next = (next === undefined)?null:next;
  }
}

class LinkedList {
  constructor(){
    this.head = null;
    this.size = 0;
    this.tail = null;
  }
  
  get next() {return this.head;}
  set next(newHead) {this.head = newHead;}
  
  get front(){return this.head.val;}
  get end(){return this.tail.val;}
  
  get length() {return this.size;}
  
  getElem(index,prevNode) {
    if(prevNode === undefined) {
      prevNode = this.head;  
    }
    if(index===0)
      return prevNode.val;
    else
      return this.getElem(index-1,prevNode.next);
  }
  
  addElem(elem){
    let newNode = new ListNode(elem);
    if(this.head === null) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }
    this.size++;
  }
  
  _removeElem(index,prevNode){
    let currentNode = prevNode.next;
    if(index===0) {
      //handle fail deletion
      if(this.tail === this.currentNode)
        this.tail = prevNode;
      //unlink prevNode from currentNode, return the boxed val
      let nodeVal = currentNode.val;
      prevNode.next = currentNode.next;
      this.size--;
      return nodeVal;
    } else
      return this._removeElem(index-1,currentNode);
  }
  
  removeElem(index){
    if(index >= this.length) {
      console.log("LinkedList Index "+index+" out of bounds!");
      return null;
    }
    
    if(index===0) {
      //handle tail deletion
      if(this.tail === this.head)
        this.tail = null;
      //unlink this.head, return the boxed val
      let val = this.head.val;
      this.head = this.head.next;
      this.size--;
      return val;
    } else {
      return this._removeElem(index-1,this.head);
    }
  }
  
  shift() {
    if(this.length === 0) {
      alert("Cannot shift empty list!");
      return null;
    } else
      return this.remove(0);
  }
  
  iterator() {
    return new Iterator(this);
  }
  
  toString() {
    let listVals = [];
    for(let node = this.head;node !== null;node=node.next)
      listVals.push(node.val);
    return "["+listVals.join(',')+"]";
  }
}

//use this to keep access time constant
class Iterator {
  constructor(list) {
    this.list = list;
    this.prev = null;
  }
  
  get current() {
    if(this.prev===null)
      return this.list;
    else
      return this.prev.next;
  }
  
  remove() {
    if(this.prev === null) {
      alert("Tried to remove without starting iterator!");
      return null;
    }
    let val = this.current.val;
    if(this.prev === null)
      this.list.head = this.current.next;
    else
      this.prev.next = this.current.next;
    return val;
  }
  
  hasNext() {
    if(this.current === null)
      return false;
    else
      return this.current.next !== null;
  }
  
  peekNext() {
    return this.current.next.val;
  }
  
  next() {
    if(!this.hasNext())
      alert("Tried to get next when there is no next!");
    this.prev = this.current;
    return this.current.val;
  }
  
  reset() {this.prev = null;}
}

export default LinkedList;