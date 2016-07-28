import React from 'react';

import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';

import MenuList from '../components/MenuList';
import { Menu } from '/imports/api/menu/menu';

export default createContainer(() => {
  const subscription = Meteor.subscribe('menu.all');
  const menuList = Menu.find().fetch();

  const user = Meteor.user();

  return {
    user,
    menuList,
    ready: subscription.ready(),
    cartItems: Session.get('cart'),
  };
}, MenuList);