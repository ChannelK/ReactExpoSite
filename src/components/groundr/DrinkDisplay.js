import React, { Component } from 'react';
import '../../Site.css';
import drinks from '../../drinks.json';

class DrinkDisplay extends Component {

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
  
  render() {
    return (
      <div className="Drink-root">
        <h1 className="Drink-title">{this.props.name}</h1>
        <p className="Drink-desc">{this.props.desc}</p>
        <ul className="Drink-ingredients">
          {this.getIngredLi(this.props.ingredients)}
        </ul>
        <p className="Drink-directions">{this.props.directions}</p>
      </div>
    );
  }
}
export default DrinkDisplay;