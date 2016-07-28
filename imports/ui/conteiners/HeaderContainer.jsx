import React from 'react';

import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { createContainer } from 'meteor/react-meteor-data';

import Header from '../components/Header';
import { Menu } from '/imports/api/menu/menu';

export default createContainer(() => {
  const cartItems = Session.get('cart') || [];

  if (cartItems.length === 0) {
    Session.set('cart', []);
  }

  const subscription = Meteor.subscribe('menu.byIds', cartItems);
  const menuItems = Menu.find({ _id: { $in: cartItems } }).fetch();

  return {
    ready: subscription.ready(),
    cartItems: menuItems,
  };
}, Header);