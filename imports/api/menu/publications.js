import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';

import { Menu } from '/imports/api/menu/menu';

Meteor.publish('menu.all', function (categoryId) {
  const query = {};

  if (!_.isNull(categoryId)) {
    query.categoryId = categoryId;
  }

  return Menu.find(query);
});

Meteor.publish('menu.byIds', function (ids) {
  ids = _.isArray(ids) ? ids : [ids];

  return Menu.find({ _id: { $in: ids } });
});
