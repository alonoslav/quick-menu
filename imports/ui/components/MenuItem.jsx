import React from 'react';

import { Session } from 'meteor/session';

export default class MenuItem extends React.Component {
  formatPrice(price) {
    return price.toFixed(2);
  }

  addToCart(event) {
    event.preventDefault();
// todo: add reactivity for menu counter
    const cartItems = Session.get('cart');
    cartItems.push(this.props.menuItem._id);
    Session.set('cart', cartItems);
  }

  isInCart() {
    const cartItems = Session.get('cart');
    return cartItems.indexOf(this.props.menuItem._id) > -1;
  }


  render() {
    const priceStyle = {
      fontSize: '20px'
    };

    return (
      <div className="col s12 m6 l4">
        <div className="card">
          <div className="card-image waves-effect waves-block waves-light">
            <img className="activator" src={this.props.menuItem.photo}/>
          </div>
          <div className="card-content">
            <span className="card-title activator grey-text text-darken-4">
              {this.props.menuItem.name}
              <i className="material-icons right">more_vert</i>
            </span>
            <p>
              <span style={priceStyle}>
                {this.formatPrice(this.props.menuItem.price)} грн.
              </span>
              <a href="#"
                 className="waves-effect waves-light btn orange right"
                 onClick={this.addToCart.bind(this)}>
                <i className="material-icons left">
                  {this.isInCart() ? 'done' : 'shopping_cart'}
                </i>
                В кошик
                {this.isInCart() ? 'у' : ''}
              </a>
            </p>
          </div>
          <div className="card-reveal">
            <span className="card-title grey-text text-darken-4">
              {this.props.menuItem.name}
              <i className="material-icons right">close</i>
            </span>
            <p>
              {this.props.menuItem.description}
            </p>
          </div>
        </div>
      </div>
    );
  }
}