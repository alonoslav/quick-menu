import { Meteor } from 'meteor/meteor';
import { check, Match } from 'meteor/check';
import { _ } from 'meteor/underscore';

import { Menu } from '/imports/api/menu/menu';
import { Organization } from '/imports/api/organization/organization';

Meteor.methods({
  'menu.add'(menuItem) {
    check(menuItem, {
      name: String,
      categoryId: String,
      description: String,
      photo: String,
      price: Number,
      organizationId: Match.Optional(String),
      inTop: Match.Optional(Boolean),
    });

    const organizationId = Organization.findOne({owner: this.userId});

    _.extend(menuItem, {
      organizationId,
      inTop: false,
    });

    return Menu.insert(menuItem);
  },

  'menu.remove'(menuItem) {
    check(menuItem, Object);

    if (!this.userId) {
      throw new Meteor.Error('Недостатньо прав для цього');
    }

    return Menu.remove({_id: menuItem._id});
  }
});
