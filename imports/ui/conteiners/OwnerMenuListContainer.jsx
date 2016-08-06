import React from 'react';

import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { FlowRouter } from 'meteor/kadira:flow-router';

import OwnerMenuList from '../components/OwnerMenuList';

import { Menu } from '/imports/api/menu/menu';
import { Category } from '/imports/api/category/category';

export default createContainer(() => {
  const categoryId = FlowRouter.getParam('category');

  const subscription = Meteor.subscribe('menu.all', categoryId);
  const query = categoryId ? { categoryId } : {};
  const menus = Menu.find(query).fetch();

  Meteor.subscribe('category.byOrganization');
  const categories = Category.find().fetch();

  return {
    menus,
    categories,
    ready: subscription.ready(),
  };
}, OwnerMenuList);
