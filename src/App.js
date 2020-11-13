// Normalizes string as a slug - a string that is safe to use
// in both URLs and html attributes
import React, { Component } from 'react';
import slugify from 'slugify';
import ComponentOptions from './CommponentOptions/CommponentOptions';
import CustomComponent from './CustomComponents/CustomComponents';
import Customization from './Customization/Customization';
import DisplayList from './DisplayList/DisplayList'
import './App.css';

const USCurrencyFormat = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD'
});

class App extends Component {
  state = {
    selected: {
      Processor: {
        name: '17th Generation Intel Core HB (7 Core with donut spare)',
        cost: 700
      },
      'Operating System': {
        name: 'Ubuntu Linux 16.04',
        cost: 200
      },
      'Video Card': {
        name: 'Toyota Corolla 1.5v',
        cost: 1150.98
      },
      Display: {
        name: '15.6" UHD (3840 x 2160) 60Hz Bright Lights and Knobs',
        cost: 1500
      }
    }
  };

  updateFeature = (feature, newValue) => {
    const selected = Object.assign({}, this.state.selected);
    selected[feature] = newValue;
    this.setState({
      selected
    });
  };

  render() {

// Customization
    const features = Object.keys(this.props.features).map((feature, idx) => {
      const featureHash = feature + '-' + idx;
      const options = this.props.features[feature].map(item => {
        const itemHash = slugify(JSON.stringify(item));
        return (
          <Customization 
          key={itemHash}
          id={itemHash}
          name={slugify(feature)}
          checked={item.name === this.state.selected[feature].name}
          onChange={e => this.updateFeature(feature, item)}
          htmlFor={itemHash}
          itemName={item.name}
          cost={USCurrencyFormat.format(item.cost)}/>
        );
      });
// CustomComponent
      return (
        <CustomComponent 
        key={featureHash}
        feature={feature}
        options={options}/>
      );
    });

//ComponentOption
    const summary = Object.keys(this.state.selected).map((feature, idx) => {
      const featureHash = feature + '-' + idx;
      const selectedOption = this.state.selected[feature];

      return (
        <ComponentOptions
        key={featureHash}
        feature={feature}
        selectedOption={selectedOption.name}
        cost={USCurrencyFormat.format(selectedOption.cost)}
        />
      );
    });
    const total = Object.keys(this.state.selected).reduce(
      (acc, curr) => acc + this.state.selected[curr].cost,
      0
    );
// DisplayList
    return (
      <DisplayList
      summary={summary}
      features={features}
      cost={USCurrencyFormat.format(total)}/>
    );
  }
}

export default App;