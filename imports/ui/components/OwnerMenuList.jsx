import React from 'react';
import classNames from 'classnames';

import { $ } from 'meteor/jquery';
import { FlowRouter } from 'meteor/kadira:flow-router';

import EditCategoryModal from './EditCategoryModal';

import { Category } from '/imports/api/category/category';

export default class OwnerMenuList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      category: null,
    };
  }

  isActiveCategory(categoryId) {
    const category = FlowRouter.getParam('category');
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

  render() {
    const itemClass = classNames('collection-item', {
      active: this.isActiveCategory(undefined),
    });

    return (
      <div>
        <div className="row">
          <div className="col s12 m4 l4">
            <div className="collection">
              <a href='/owner-menu' className={itemClass}>Усі</a>

              {this.getCategories()}
            </div>
          </div>

          <div className="col s12 m8 l8">
            <h3>Items</h3>
          </div>
        </div>

        <EditCategoryModal category={this.state.category}/>
      </div>
    );
  }
}