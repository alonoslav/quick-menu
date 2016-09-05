import { Meteor } from 'meteor/meteor';
import { check, Match } from 'meteor/check';
import { _ } from 'meteor/underscore';

import { Menu } from '/imports/api/menu/menu';
import { Organization } from '/imports/api/organization/organization';

const MenuItemDocument = {
  _id: Match.Optional(String),
  name: String,
  categoryId: String,
  description: String,
  photo: String,
  price: Number,
  organizationId: Match.Optional(String),
  inTop: Match.Optional(Boolean),
};

Meteor.methods({
  'menu.add'(menuItem) {
    check(menuItem, MenuItemDocument);

    const organization = Organization.findOne({ owner: this.userId });

    _.extend(menuItem, {
      organizationId: organization._id,
      inTop: false,
    });

    return Menu.insert(menuItem);
  },

  'menu.edit'(menuItem) {
    check(menuItem, MenuItemDocument);

    return Menu.update({ _id: menuItem._id }, { $set: menuItem });
  },

  'menu.remove'(menuItem) {
    check(menuItem, Object);

    if (!this.userId) {
      throw new Meteor.Error('Недостатньо прав для цього');
    }

    return Menu.remove({ _id: menuItem._id });
  }
});
