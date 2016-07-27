import React from 'react';

import { Session } from 'meteor/session';

export default class Header extends React.Component {
  componentWillMount() {
    const cartItems = Session.get('cart');

    if (!cartItems) {
      Session.set('cart', []);
    }
  }

  itemsInCartCount() {
    return Session.get('cart').length;
  }

  render() {
    const cartStyle = {
      display: 'inline-block'
    };

    const itemsCountStyle = {
      padding: '2px 6px',
      borderRadius: '5px',
      marginLeft: '-10px'
    };

    return (
      <div className="navbar-fixed">
        <nav className="red lighten-1">
          <div className="nav-wrapper">
            <a href="#" className="brand-logo center">
              {this.props.title}
            </a>

            <ul id="nav-mobile" className="right">
              <li>
                <a href="collapsible.html">
                  <span className="orange" style={itemsCountStyle}>
                    {this.itemsInCartCount()}
                  </span>
                  <i className="material-icons" style={cartStyle}>shopping_cart</i>
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}