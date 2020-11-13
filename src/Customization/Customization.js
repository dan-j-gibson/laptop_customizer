import React, { Component } from 'react';


class Customization extends Component {
    
    render() {
        return (
            <div key={this.props.key} className="feature__item">
              <input
                type="radio"
                id={this.props.id}
                className="feature__option"
                name={this.props.name}
                checked={this.props.checked}
                onChange={this.props.onChange}
              />
              <label htmlFor={this.props.htmlFor} className="feature__label">
                {this.props.itemName} ({this.props.cost})
              </label>
            </div>
          );
    }
}
        

export default Customization;