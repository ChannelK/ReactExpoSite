import React, { Component } from 'react';
import '../../Site.css';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import drinks from '../../drinks.json';

class Groundr extends Component {
  constructor(props) {
    super(props);
    
    this.drinkTable = {};
    this.listOptions = [];
    for (var i = 0; i < drinks.recipes.length; i++) {
      var drinkName = drinks.recipes[i].name;
      this.drinkTable[i] = drinkName;
      this.listOptions.push({value:i, label:drinkName});
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
  
  render() {
    const selectFeedback = this.state.selectedOption;
    
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
          </div>
        </div>
      </div>
    );
  }
}
export default Groundr;