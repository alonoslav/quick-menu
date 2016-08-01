import { Meteor } from 'meteor/meteor';

import { Menu } from '/imports/api/menu/menu';

Meteor.publish('menu.all', function () {
  return Menu.find();
});

Meteor.publish('menu.byIds', function (ids) {
  ids = _.isArray(ids) ? ids : [ids];

  return Menu.find({ _id: { $in: ids } });
});
