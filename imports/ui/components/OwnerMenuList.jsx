import React from 'react';
import classNames from 'classnames';

import { $ } from 'meteor/jquery';
import { FlowRouter } from 'meteor/kadira:flow-router';

import OwnerMenuItem from './OwnerMenuItem';

export default class OwnerMenuList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      category: null,
    };
  }
  componentDidUpdate() {
    const masonryInit = function () {
      const $container = $('#masonry-grid');

      // initialize
      $container.masonry({
        columnWidth: '.col',
        itemSelector: '.col',
      });
    };

    Meteor.setTimeout(masonryInit, 0);
  }

  getCategory() {
    return FlowRouter.getParam('category');
  }

  isActiveCategory(categoryId) {
    const category = this.getCategory();
    return categoryId === category;
  }

  getCategories() {
    const { categories } = this.props;

    if (categories.length) {
      return categories.map(category => {
        const link = `/owner-menu/${category._id}`;
        const linkClass = classNames('collection-item', {
          active: this.isActiveCategory(category._id),
        });

        return <a key={category._id} href={link} className={linkClass}>
          {category.name}
        </a>
      });
    }
  }

  getMenuItems() {
    const { menus } = this.props;
    if (menus.length > 0) {
      return menus.map(menu => <OwnerMenuItem key={menu._id} menuItem={menu}/>);
    }

    return <h4 className="center-align">Не знайдено нічогісінько...</h4>;
  }

  render() {
    const itemClass = classNames('collection-item', {
      active: this.isActiveCategory(undefined),
    });

    const floatButtonClass = "btn-floating btn-large waves-effect waves-light red fixed";
    const floatButtonStyle = {
      bottom: '15px',
      left: '50%',
      marginLeft: '-27px',
    };

    const category = this.getCategory();
    const linkToCreateMenu = FlowRouter.url('ownerCreateMenu', {
      category,
    });

    return (
      <div>
        <div className="row">
          <div className="col s12 m12 l4">
            <div className="collection">
              <a href='/owner-menu' className={itemClass}>Усі</a>

              {this.getCategories()}
            </div>
          </div>

          <div className="col s12 m12 l8">
            <div id="masonry-grid">
              {this.getMenuItems()}
            </div>
          </div>
        </div>

        <div className="fixed-action-btn" style={floatButtonStyle}>
          <a className={floatButtonClass} href={linkToCreateMenu}>
            <i className="material-icons">add</i>
          </a>
        </div>
      </div>
    );
  }
}
