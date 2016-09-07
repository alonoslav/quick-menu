import React from 'react';

import classNames from 'classnames';

import { FlowRouter } from 'meteor/kadira:flow-router';

import OwnerEditCategoryModal from './OwnerEditCategoryModal';

export default class OwnerCategoryItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editModalOpened: false,
    };
  }

  goToCategory(event) {
    event.stopPropagation();

    FlowRouter.go('ownerMenuList', {
      category: this.props.category._id,
    });
  }

  openEditCategory(event) {
    event.stopPropagation();

    this.setState({
      editModalOpened: true,
    });
  }

  onEditCategorySuccess() {
    this.setState({
      editModalOpened: false,
    });
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
      <div className={linkClass} style={linkStyle}>
        <div  onClick={this.goToCategory.bind(this)}>
          {category.name}

          <span href="#" style={linkStyle} className="material-icons right orange-text"
                onClick={this.openEditCategory.bind(this)}>create</span>
        </div>

        {this.state.editModalOpened ?
          <OwnerEditCategoryModal category={this.props.category}
                                  onEditCategory={this.onEditCategorySuccess.bind(this)}/> :
          ''}
      </div>
    );
  }
}
