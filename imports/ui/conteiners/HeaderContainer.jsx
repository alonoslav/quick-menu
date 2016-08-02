import React from 'react';

import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { createContainer } from 'meteor/react-meteor-data';
import { _ } from 'meteor/underscore';

import Header from '../components/Header';
import { Menu } from '/imports/api/menu/menu';
import { Category } from '/imports/api/category/category';

export default createContainer(() => {
  const cartItems = Session.get('cart') || {};

  if (_.keys(cartItems).length === 0) {
    Session.set('cart', {});
  }

  const ids = _.keys(cartItems);

  Meteor.subscribe('menu.byIds', ids);
  Meteor.subscribe('category.byOrganization');

  const menuItems = Menu.find({ _id: { $in: ids } }).map(menuItem => {
    menuItem.count = cartItems[menuItem._id] || 0;
    return menuItem;
  });

  const categories = Category.find().fetch();

  return {
    categories,
    cartItems: menuItems,
  };
}, Header);