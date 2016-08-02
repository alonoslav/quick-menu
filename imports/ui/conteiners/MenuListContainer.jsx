import React from 'react';

import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';

import MenuList from '../components/MenuList';
import { Menu } from '/imports/api/menu/menu';

export default createContainer(() => {
  Meteor.subscribe('menu.all');
  const menuList = Menu.find().fetch();

  const user = Meteor.user();

  const tableChosen = localStorage.getItem('table');

  return {
    user,
    menuList,
    tableChosen,
    cartItems: Session.get('cart'),
  };
}, MenuList);