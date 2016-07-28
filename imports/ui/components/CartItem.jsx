import React from 'react';

import { Session } from 'meteor/session';

export default class CartItem extends React.Component {
  getPrice() {
    const { price } = this.props.cartItem;
    return price.toFixed(2);
  }

  onChange(event) {
    const count = parseInt(event.target.value);

    const cartItems = Session.get('cart');
    cartItems[this.props.cartItem._id] = count;

    Session.set('cart', cartItems);
  }

  render() {
    const itemStyle = {
      minHeight: 'inherit'
    };

    const inputFieldStyle = {
      marginTop: 0
    };

    return (
      <li className="collection-item avatar" style={itemStyle}>
        <img src={this.props.cartItem.photo} alt="" className="circle" />
          <span className="title">{this.props.cartItem.name}</span>
          <p>
            {this.getPrice()} грн.
          </p>
          <a href="#!" className="secondary-content">
            <div className="input-field" style={inputFieldStyle}>
              <input type="number"
                     value={this.props.count}
                     min="1"
                     onChange={this.onChange.bind(this)} />
            </div>
          </a>
      </li>
    );
  }
}