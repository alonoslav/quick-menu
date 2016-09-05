import React from 'react';

import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import OwnerEditMenu from '../components/OwnerEditMenu';
import { Category } from '/imports/api/category/category';
import { Menu } from '/imports/api/menu/menu';

export default createContainer(() => {
  Meteor.subscribe('category.byOrganization');
  const categories = Category.find().fetch();

  const menuId = FlowRouter.getParam('_id');
  const subscription = Meteor.subscribe('menu.byIds', menuId);

  const menuItem = Menu.findOne({ _id: menuId });

  return {
    categories,
    menuItem,
    ready: subscription.ready(),
  };
}, OwnerEditMenu);
