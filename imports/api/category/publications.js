import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';

import { Category } from './category';

Meteor.publish('category.byOrganization', function () {
  return Category.find();
});

Meteor.publish('category.byIds', function (ids) {
  if (!_.isArray(ids)) {
    ids = [ids];
  }

  return Category.find({ _id: { $in: ids } });
});
