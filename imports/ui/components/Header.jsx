import React from 'react';
import classNames from 'classnames';

import { _ } from 'meteor/underscore';
import { $ } from 'meteor/jquery';
import { FlowRouter } from 'meteor/kadira:flow-router';

import HeaderMobile from './HeaderMobile';

export default class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      category: FlowRouter.getParam('category'),
    };
  }

  componentDidMount() {
    const sidebarInit = () => {
      $('.button-collapse').sideNav({
        menuWidth: 240,
      });
    };

    Meteor.setTimeout(sidebarInit, 0);
  }

  itemsInCartPrice() {
    const { cartItems } = this.props;

    const price = _.reduce(cartItems, (memo, menuItem) => {
      return memo + menuItem.price * menuItem.count;
    }, 0);

    return price.toFixed(2);
  }

  onClick() {
    return categoryId => {
      this.setState({ category: categoryId });
      $('.button-collapse').sideNav('hide');
    }
  }

  getTitle() {
    const category = this.state.category;
    let title = this.props.title;

    if (category) {
      this.props.categories.some(categoryOptions => {
        if (categoryOptions._id === category) {
          title = categoryOptions.name;
          return true;
        }

        return false;
      });
    }

    return title;
  }

  render() {
    const priceClass = classNames({
      'hide-on-small-only': true,
      orange: this.props.cartItems.length
    });

    const cartClass = classNames({
      orange: this.props.cartItems.length
    });

    const menuToggleStyle = {
      paddingLeft: '10px',
    };

    return (
      <div className="navbar-fixed">
        <nav className="red lighten-1">
          <div className="nav-wrapper">
            <a href="#" data-activates="nav-mobile" className="button-collapse"
               style={menuToggleStyle}>
              <i className="material-icons">menu</i>
            </a>

            <span className="brand-logo center">
              {this.getTitle()}
            </span>

            <ul className="right">
              <li className={priceClass}>
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

            <HeaderMobile categories={this.props.categories}
                          category={this.state.category}
                          onClick={this.onClick()}/>
          </div>
        </nav>
      </div>
    );
  }
}
