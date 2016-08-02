import { Meteor } from 'meteor/meteor';

import { Category } from './category';

Meteor.publish('category.byOrganization', function () {
  return Category.find();
});

Meteor.publish('category.byName', function (name) {
  return Category.find({ urlName: name });
});