import React, { Component } from 'react';
import '../../Site.css';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import drinks from '../../drinks.json';

class Groundr extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: {value: 'one', label: 'One'}
    }
    this.drinkTable = {};
    this.listOptions = [];
    for (var i = 0; i < drinks.recipes.length; i++) {
      var drinkName = drinks.recipes[i].name;
      this.drinkTable[i] = drinkName;
      this.listOptions.push({value:i, label:drinkName});
    }
  }
  
  handleDrinkSelect = (selectedOption) => {
    this.setState({ selectedOption });
    console.log(`Selected: ${selectedOption.label}`);
  }
  
  render() {
      
    const { selectedOption } = this.state;
  	const value = selectedOption && selectedOption.value;
    
    return (
      <div className="Groundr-root">
        <h1 className="Groundr-title">Groundr</h1>
        <div className="Groundr-screen">
          <div className="Groundr-selector">
            <Select
              name="form-field-name"
              value={value}
              onChange={this.handleDrinkSelect}
              options={this.listOptions}
            />
          </div>
          <div className="Groundr-display">
          </div>
        </div>
      </div>
    );
  }
}
export default Groundr;