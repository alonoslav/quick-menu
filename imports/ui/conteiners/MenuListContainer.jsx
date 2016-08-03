import React from 'react';

import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { Session } from 'meteor/session';
import { createContainer } from 'meteor/react-meteor-data';
import { FlowRouter } from 'meteor/kadira:flow-router';

import MenuList from '../components/MenuList';
import { Menu } from '/imports/api/menu/menu';

export default createContainer(() => {
  const user = Meteor.user();
  const tableChosen = localStorage.getItem('table');
  const categoryId = FlowRouter.getParam('category');

  Meteor.subscribe('menu.all', categoryId);

  const query = categoryId ? { categoryId } : {};
  const menuList = Menu.find(query, { sort: { categoryId: 1 } }).fetch();

  const categoryIds = menuList.map(menu => menu.categoryId);
  Meteor.subscribe('category.byIds', categoryIds);

  return {
    user,
    menuList,
    tableChosen,
    cartItems: Session.get('cart'),
  };
}, MenuList);
