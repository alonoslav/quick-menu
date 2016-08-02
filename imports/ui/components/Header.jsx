import React from 'react';
import classNames from 'classnames';

import { _ } from 'meteor/underscore';
import { $ } from 'meteor/jquery';
import { FlowRouter } from 'meteor/kadira:flow-router';

import SideMenuItem from './SideMenuItem';

export default class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      category: FlowRouter.getParam('category'),
    };
  }

  componentDidMount() {
    setTimeout(() => {
      $('.button-collapse').sideNav({
        closeOnClick: true,
      });
    }, 500);
  }

  itemsInCartPrice() {
    const { cartItems } = this.props;

    const price = _.reduce(cartItems, (memo, menuItem) => {
      return memo + menuItem.price * menuItem.count;
    }, 0);

    return price.toFixed(2);
  }

  getCategories() {
    let { categories } = this.props;

    const allMenus = {
      _id: 'all',
      icon: 'all.png',
      name: 'Все меню'
    };

    categories = _.union([allMenus], categories);

    if (categories.length) {
      return categories.map(category => {
        const onClick = (categoryName) => {
          this.setState({ category: categoryName });
        };

        const active = this.state.category === category.urlName;

        return <SideMenuItem key={category._id} category={category} active={active} onClick={onClick}/>;
      });
    }

    return <li>&nbsp;</li>;
  }

  getTitle() {
    const category = this.state.category;
    let title = this.props.title;

    if (category) {
      this.props.categories.some(categoryOptions => {
        if (categoryOptions.urlName === category) {
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

    return (
      <div className="navbar-fixed">
        <nav className="red lighten-1">
          <div className="nav-wrapper">
            <a href="#" data-activates="mobile-demo" className="button-collapse">
              <i className="material-icons">menu</i>
            </a>

            <a href="/" className="brand-logo center">
              {this.getTitle()}
            </a>

            <ul id="nav-mobile" className="right">
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

            <ul className="side-nav" id="mobile-demo">
              {this.getCategories()}
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}
