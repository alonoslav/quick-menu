import React from 'react';

import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { createContainer } from 'meteor/react-meteor-data';
import { _ } from 'meteor/underscore';

import Cart from '../components/Cart';

import { Menu } from '/imports/api/menu/menu';

export default createContainer(() => {
  const cartItems = Session.get('cart') || [];

  const ids = _.keys(cartItems);

  Meteor.subscribe('menu.byIds', ids);
  const menuItems = Menu.find({ _id: { $in: ids } }).map(item => {
    item.count = cartItems[item._id];
    return item;
  });

  const total = _.reduce(menuItems, (memo, menuItem) => {
    const count = cartItems[menuItem._id] || 0;
    return memo + menuItem.price * count;
  }, 0);

  return {
    total: total.toFixed(2),
    cartItems: menuItems,
  };
}, Cart);
