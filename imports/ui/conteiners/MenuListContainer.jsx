import { Meteor } from 'meteor/meteor';
import React from 'react';

import { createContainer } from 'meteor/react-meteor-data';

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
  };
}, MenuList);