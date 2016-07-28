import React from 'react';
import classNames from 'classnames';

import { Session } from 'meteor/session';

export default class MenuItem extends React.Component {
  formatPrice(price) {
    return price.toFixed(2);
  }

  addToCart(event) {
    event.preventDefault();

    const id = this.props.menuItem._id;
    const cartItems = this.props.cartItems;

    cartItems[id] = 1;

    Session.set('cart', cartItems);
  }

  isInCart() {
    const cartItems = this.props.cartItems;
    return cartItems[this.props.menuItem._id];
  }


  render() {
    const priceStyle = {
      fontSize: '20px'
    };

    const toCartButtonClass = classNames('btn', 'orange', 'right',
      'waves-effect', 'waves-light', {
        disabled: this.isInCart()
      });

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
                 className={toCartButtonClass}
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