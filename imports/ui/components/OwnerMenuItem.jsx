import React from 'react';
import classNames from 'classnames';

import { Meteor } from 'meteor/meteor';

import Misc from '/imports/utils/Misc';
import { Category } from '/imports/api/category/category';

export default class OwnerMenuItem extends React.Component {
  formatPrice(price) {
    return price.toFixed(2);
  }

  getCategoryName() {
    const category = Category.findOne({ _id: this.props.menuItem.categoryId });
    return category && category.name;
  }

  getCategoryUrl() {
    return `/menu-list/${this.props.menuItem.categoryId}`;
  }

  removeMenuItem(event) {
    event.preventDefault();

    Meteor.call('menu.remove', this.props.menuItem, Misc.handleMethodResult());
  }

  render() {
    const priceStyle = {
      fontSize: '20px'
    };

    const iconsClass = "material-icons right waves-effect waves-circle-auto-size";

    const badgeStyle = {
      fontSize: '16px',
      marginLeft: '10px',
    };

    return (
      <div className="col s6 m4">
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
              <a href="#" className="red-text" onClick={this.removeMenuItem.bind(this)}>
                <i className="material-icons right">delete</i>
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
