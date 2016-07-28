import React from 'react';
import classNames from 'classnames';

import { _ } from 'meteor/underscore';

export default class Header extends React.Component {
  itemsInCartPrice() {
    if (this.props.ready) {
      const { cartItems } = this.props;
      const price = _.reduce(cartItems, (memo, menuItem) => {
        return memo + menuItem.price * menuItem.count;
      }, 0);

      return price.toFixed(2);
    }

    return 0;
  }

  render() {
    const cartClass = classNames({
      orange: this.props.cartItems.length
    });

    return (
      <div className="navbar-fixed">
        <nav className="red lighten-1">
          <div className="nav-wrapper">
            <a href="/" className="brand-logo center">
              {this.props.title}
            </a>

            <ul id="nav-mobile" className="right">
              <li className="hide-on-small-only">
                <a href="/cart" className="flow-text">
                  {this.itemsInCartPrice()} грн.
                </a>
              </li>
              <li className={cartClass}>
                <a href="/cart">
                  <i className="material-icons">shopping_cart</i>
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}