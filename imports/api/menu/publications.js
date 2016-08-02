import { Meteor } from 'meteor/meteor';

import { Menu } from '/imports/api/menu/menu';
import { Category } from '../category/category';

Meteor.publish('menu.all', function (categoryName) {
  const query = {};

  if (categoryName) {
    const category = Category.findOne({urlName: categoryName});
    if (category) {
      query.categoryId = category._id;
    }
  }
  return [
    Category.find({urlName: categoryName}),
    Menu.find(query)
  ];
});

Meteor.publish('menu.byIds', function (ids) {
  ids = _.isArray(ids) ? ids : [ids];

  return Menu.find({ _id: { $in: ids } });
});
