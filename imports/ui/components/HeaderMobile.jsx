import React from 'react';

import { _ } from 'meteor/underscore';

import SideMenuItem from './SideMenuItem';

export default class HeaderMobile extends React.Component {
  getCategories() {
    let { categories } = this.props;

    const allMenus = {
      _id: '',
      icon: 'all.png',
      name: 'Все меню'
    };

    categories = _.union([allMenus], categories);

    if (categories.length) {
      return categories.map(category => {
        const onClick = categoryId => {
          this.props.onClick(categoryId);
        };

        const active = this.props.category === category._id;

        return <SideMenuItem key={category._id} category={category} active={active} onClick={onClick}/>;
      });
    }

    return <li>&nbsp;</li>;
  }

  render() {
    const onLogoClick = function () {
      this.props.onClick();
    };

    return (
      <ul id="nav-mobile" className="side-nav fixed">
        <li className="logo">
          <a id="logo-container" href="/menu-list" className="brand-logo" onClick={onLogoClick.bind(this)}>
            <img src="/logo.png" />
          </a>
        </li>

        {this.getCategories()}
      </ul>
    );
  }
}
