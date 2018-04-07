var stateHandles = ['enter','exit','keyInput','mouseMove','mouseClick'];

var State = function(opts) {
  for(let i = 0;i < stateHandles.length;i++) {
    let handle = stateHandles[i];
    if(handle in opts)
      this[handle] = opts[handle];
    else
      this[handle] = false;
  }
};

class FiniteStateMachine {
  constructor(screen) {
    this.screen = screen;
    
    this.state = undefined;
    this.enabled = false;
    
    this.states = {};
  }
  
  addState(name,newState) {
    //autobind the state's functions
    for(let i = 0;i < stateHandles.length;i++) {
      let handle = stateHandles[i];
      console.log("Binding "+handle);
      
      if(newState[handle]) {
        let callBack = newState[handle];
        newState[handle] = callBack.bind(this);
      } else {
        newState[handle] = () => {;};
      }
    }
    this.states[name] = newState;
  }
  
  handleKeyboard(usrU,usrD,usrL,usrR,usrEnter,usrEsc) {
    if(this.enabled)
      this.state.keyInput(usrU,usrD,usrL,usrR,usrEnter,usrEsc);
  }
  
  handleMouseMove() {
    if(this.enabled)
      this.state.mouseMove();
  }
  
  handleMouseClick() {
    if(this.enabled)
      this.state.mouseClick();
  }
  
  setState(newState) {
    if(this.state!==undefined && (this.state.exit))
      this.state.exit();
    
    this.state = this.states[newState];
    
    if(this.state!==undefined && (this.state.enter))
      this.state.enter();
  }
  
  enable(){this.enabled=true;};
  disable(){this.enabled=false;};
};
export { State } ;
export default FiniteStateMachine;