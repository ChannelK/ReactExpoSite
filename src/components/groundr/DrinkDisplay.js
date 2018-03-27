import React, { Component } from 'react';
import '../../Site.css';
import drinks from '../../drinks.json';

class DrinkDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {imgReady: false};
  }
  
  handleImageLoaded() {
    this.setState({ imgReady: true });
  }
  
  getIngredLi(ings) {
    var lis = [];
    for(var i = 0;i < ings.length;i++) {
      //singularize if appropriate and available
      var unit;
      if(ings[i].quantity === 1) {
        const convert = drinks.singulars[ings[i].unit];
        unit = convert?convert:ings[i].unit;
      } else {
        unit = ings[i].unit;
      }
      const text = ings[i].name + ': ' + ings[i].quantity + ' ' + unit;
      lis.push(<li key={i}>{text}</li>);
    }
    return lis;
  }
  
  singularize(unit) {
    const convert = drinks.singulars[unit];
    return convert?convert:unit;
  }
  
  getTableRows(ings) {
    var rows = [];
    for(var i = 0;i < ings.length;i++) {
      //singularize if appropriate and available
      const unit = ings[i].quantity===1?this.singularize(ings[i].unit):ings[i].unit;
      rows.push(<tr className="Drink-ingredient" key={i}>
        <td className="Drink-ingredient-name">
          {ings[i].name}
        </td>
        <td>:</td>
        <td className="Drink-ingredient-amount">
          {ings[i].quantity + ' ' + unit}
        </td>
      </tr>);
    }
    return rows;
  }
  
  componentWillReceiveProps(nextProps) {
    if(nextProps.imgsrc !== this.props.imgsrc) {
      this.setState({imgReady: false});
    }
  }
  
  render() {
    return (    
      <div className="Drink-root">
        <h1 className={"Drink-title"}>{this.props.name}</h1>
        <p className="Drink-desc">{this.props.desc}</p>
          
        <img className={"Scale-pic "+(this.state.imgReady?"":"hidden")}
          src={require("../../assets/"+this.props.imgsrc)}
          onLoad={this.handleImageLoaded.bind(this)}
          alt="Coffee Cup"
        />
          
        <img className={"Scale-pic "+(this.state.imgReady?"hidden":"")}
          src={this.props.bufferImg}
          alt="Loading..."/>
          
        <table className="Drink-ingredients">
          <tbody>
            {this.getTableRows(this.props.ingredients)}
          </tbody>
        </table>
        <p className="Drink-directions">{this.props.directions}</p>
      </div>
    );
  }
}
export default DrinkDisplay;