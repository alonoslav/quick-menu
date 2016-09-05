import React from 'react';
import classNames from 'classnames';
import Masonry from 'react-masonry-component';

import { $ } from 'meteor/jquery';
import { FlowRouter } from 'meteor/kadira:flow-router';

import OwnerMenuItem from './OwnerMenuItem';
import OwnerCategoryItem from './OwnerCategoryItem';
import OwnerEditCategoryModal from './OwnerEditCategoryModal';
import Loader from './Loader';

export default class OwnerMenuList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      category: null,
    };
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
      return categories.map(category => <OwnerCategoryItem category={category}
                                                           key={category._id}/>);
    }
  }

  getMenuList() {
    const { menuList } = this.props;
    return menuList.map(menu => <OwnerMenuItem key={menu._id} menuItem={menu}/>);
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

            <OwnerEditCategoryModal category={this.getCategory()}/>
          </div>

          <div className="col s12 m12 l8">
            {
              !this.props.ready ? <Loader/> :
                this.props.menuList.length ?
                  <Masonry className={'row'}>{this.getMenuList()}</Masonry> :
                  <h3 className="center-align">Нічого не знайдено</h3>
            }
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
