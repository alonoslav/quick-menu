import React from 'react';

import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { Session } from 'meteor/session';
import { createContainer } from 'meteor/react-meteor-data';
import { FlowRouter } from 'meteor/kadira:flow-router';

import MenuList from '../components/MenuList';
import { Menu } from '/imports/api/menu/menu';
import { Category } from '/imports/api/category/category';

export default createContainer(() => {
  const categoryName = FlowRouter.getParam('category');

  Meteor.subscribe('menu.all', categoryName);

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