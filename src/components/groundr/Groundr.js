import React, { Component } from 'react';
import '../../Site.css';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

class Groundr extends Component {
  /*
  constructor(props) {
    super(props);
  }
  */
  
  state = {
    selectedOption: '',
  }
  handleChange = (selectedOption) => {
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
              onChange={this.handleChange}
              options={[
                { value: 'one', label: 'One' },
                { value: 'two', label: 'Two' },
              ]}
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