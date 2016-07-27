import { Meteor } from 'meteor/meteor';

import { Menu } from '/imports/api/menu/menu';

Meteor.publish('menu.all', function () {
  return Menu.find();
});