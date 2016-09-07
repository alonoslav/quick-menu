import { Meteor } from 'meteor/meteor';
import { check, Match } from 'meteor/check';

import { Category } from './category';

const CategoryDocument = {
  _id: Match.Optional(String),
  name: String,
  urlName: Match.Optional(Match.OneOf(null, String)),
  icon: Match.Optional(String),
  organizationId: String,
  order: Number,
};

Meteor.methods({
  'category.update'(updatedCategory) {
    check(updatedCategory, CategoryDocument);

    return Category.update({ _id: updatedCategory._id }, { $set: updatedCategory });
  },
});
