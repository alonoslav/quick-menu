import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import { Menu } from '/imports/api/menu/menu';
Meteor.methods({
  'menu.remove'(menuItem) {
    check(menuItem, Object);

    if (!this.userId) {
      throw new Meteor.Error('Недостатньо прав для цього');
    }

    return Menu.remove({_id: menuItem._id});
  }
});
