import React from 'react';
import classNames from 'classnames';

import { _ } from 'meteor/underscore';

export default class WaitersHeader extends React.Component {
  render() {
    const priceClass = classNames({
      'hide-on-small-only': true,
      orange: this.props.cartItems.length
    });

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
              <li className={priceClass}>
                <a href="/cart" className="flow-text">

                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}
