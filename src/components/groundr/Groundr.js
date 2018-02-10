import React, { Component } from 'react';
import '../../Site.css';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import drinks from '../../drinks.json';
import DrinkDisplay from './DrinkDisplay';

class Groundr extends Component {
  constructor(props) {
    super(props);
    
    this.listOptions = [];
    for (var i = 0; i < drinks.recipes.length; i++) {
      var drinkName = drinks.recipes[i].name;
      this.listOptions.push({value:i, label:this.formatName(drinkName)});
    }
    
    this.state = {
      selectedOption: null,
      submittedOption: null
    }
    
    this.handleSelectSubmit = this.handleSelectSubmit.bind(this);
  }
  
  handleDrinkSelect = (newSelection) => {
    this.setState(prevState => ({
      selectedOption: newSelection && newSelection.value
    }));
    
    if(newSelection) {
      console.log(`Selected: ${newSelection.label}`);
    } else {
      console.log(`Selected: null`);
    }
  }
  
  handleSelectSubmit() {
    console.log(`Submitted: ${this.state.selectedOption}`);
    const submitting = this.state.selectedOption;
    this.setState(prevState => ({
      submittedOption: submitting
    }));
    
  }
  
  formatName(oldName) {
    var newName = [];
    newName.push(oldName[0].toUpperCase());
    for(var i=1;i < oldName.length;i++) {
      if(oldName[i-1] === ' ') {
        newName.push(oldName[i].toUpperCase());
      } else {
        newName.push(oldName[i]);
      }
    }
    return newName;
  }
  
  render() {
    const selectFeedback = this.state.selectedOption;
    
    /*
    var display = this.state.submittedOption != null ? 
      <DrinkDisplay className="display" 
        name = drinkTable[drinks.recipes[this.state.submittedOption].name]
        desc = drinkTable[drinks.recipes[this.state.submittedOption].desc]
      />:
      <div className="Blank-drink"><span>Choose your character.</span></div>;
    */
    var display = null;
    
    if(this.state.submittedOption != null) {
      const submittedRecipe = drinks.recipes[this.state.submittedOption]
      display = <DrinkDisplay className="display" 
        name={this.formatName(submittedRecipe.name)} 
        desc={submittedRecipe.desc}
        ingredients={submittedRecipe.ingredients}
        directions={submittedRecipe.directions}
      />;
    } else {
      display = <div className="Blank-drink"><span>Choose your character.</span></div>;
    }
    
    return (
      <div className="Groundr-root">
        <h1 className="Groundr-title">Groundr</h1>
        <div className="Groundr-background">
          <div className="Groundr-selector">
            <Select
              className="Groundr-select"
              name="form-field-name"
              value={selectFeedback}
              onChange={this.handleDrinkSelect}
              options={this.listOptions}
            />
            <span className="Groundr-selector-space"/>
            <button className="Groundr-submit clickable" onClick={this.handleSelectSubmit}>
              Go
            </button>
          </div>
          <div className="Groundr-splitter"/>
          <div className="Groundr-display">
          {display}
          </div>
        </div>
      </div>
    );
  }
}
export default Groundr;