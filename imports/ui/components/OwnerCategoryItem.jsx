import React from 'react';

import classNames from 'classnames';

import { FlowRouter } from 'meteor/kadira:flow-router';

export default class OwnerCategoryItem extends React.Component {
  goToCategory(event) {
    event.stopPropagation();

    FlowRouter.go('ownerMenuList', {
      category: this.props.category._id,
    });
  }

  openEditCategory(event) {
    event.stopPropagation();

    $('#modal1').openModal();
  }

  render() {
    const { category } = this.props;
    const activeCategory = FlowRouter.getParam('category');

    const linkClass = classNames('collection-item', {
      active: activeCategory === category._id,
    });

    const linkStyle = {
      cursor: 'pointer',
    };

    return (
      <div className={linkClass} style={linkStyle} onClick={this.goToCategory.bind(this)}>
        {category.name}

        {/*<span href="#" style={linkStyle} className="material-icons right orange-text"*/}
              {/*onClick={this.openEditCategory.bind(this)}>create</span>*/}
      </div>
    );
  }
}
