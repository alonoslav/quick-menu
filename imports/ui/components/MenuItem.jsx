import React from 'react';
import classNames from 'classnames';

import { Session } from 'meteor/session';

import { Category } from '/imports/api/category/category';

export default class MenuItem extends React.Component {
  formatPrice(price) {
    return price.toFixed(2);
  }

  isInCart() {
    const cartItems = this.props.cartItems;
    return cartItems[this.props.menuItem._id];
  }

  toggleAddToCart(event) {
    event.preventDefault();

    const id = this.props.menuItem._id;
    const cartItems = this.props.cartItems;

    if (this.isInCart()) {
      delete cartItems[id];
    } else {
      cartItems[id] = 1;
    }

    Session.set('cart', cartItems);
  }

  getCategoryName() {
    const category = Category.findOne({ _id: this.props.menuItem.categoryId });
    return category && category.name;
  }

  getCategoryUrl() {
    return `/menu-list/${this.props.menuItem.categoryId}`;
  }

  render() {
    const priceStyle = {
      fontSize: '20px'
    };

    const toCartButtonClass = classNames('btn', 'right', 'cart-button-icon',
      'waves-effect', 'waves-light', {
        'orange': !this.isInCart(),
        'grey': this.isInCart()
      });

    const iconsClass = "material-icons right waves-effect waves-circle waves-circle-auto-size";

    const badgeStyle = {
      fontSize: '16px',
      marginLeft: '10px',
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
              <a href={this.getCategoryUrl()}
                 className="badge orange-text"
                 style={badgeStyle}>
                {this.getCategoryName()}
                </a>

              <i className={iconsClass}>more_vert</i>
            </span>
            <p>
              <span style={priceStyle}>
                {this.formatPrice(this.props.menuItem.price)} грн.
              </span>
              <a href="#"
                 className={toCartButtonClass}
                 onClick={this.toggleAddToCart.bind(this)}>
                <i className="material-icons left">
                  {this.isInCart() ? 'delete' : 'shopping_cart'}
                </i>
              </a>
            </p>
          </div>
          <div className="card-reveal">
            <span className="card-title grey-text text-darken-4">
              {this.props.menuItem.name}
              <i className={iconsClass}>close</i>
            </span>
            <p dangerouslySetInnerHTML={{ __html: this.props.menuItem.description }}>
            </p>
          </div>
        </div>
      </div>
    );
  }
}
