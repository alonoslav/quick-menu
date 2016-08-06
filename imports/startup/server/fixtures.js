import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Random } from 'meteor/random';

import { Organization } from '/imports/api/organization/organization';
import { Table } from '/imports/api/table/table';
import { Category } from '/imports/api/category/category';

if (Meteor.users.find().count() === 0) {
  Accounts.createUser({
    username: 'admin',
    email: Meteor.settings.superUserMail,
    password: 'qweqweqwe'
  });
}

if (Organization.find().count() === 0) {
  const ownerId = Accounts.createUser({
    username: 'freespace.owner',
    password: '897vuq',
  });

  const organizationId = Organization.insert({
    name: 'FreeSpace',
    owner: ownerId,
  });

  Accounts.createUser({
    username: 'freespace.waiter',
    password: '098121315',
  });

  Accounts.createUser({
    username: 'freespace.customer',
    password: '1230984756'
  });

  Meteor.users.update({}, { $set: { organizationId } }, { multi: true });

  ['1', '2', '3', '4', '5', '6'].forEach(name => {
    return Table.insert({
      name,
      organizationId
    });
  });

  const categoryIds = [];

  const categories = [{
    name: 'Закуски',
    icon: 'appetizer.png',
  }, {
    name: 'Напої',
    icon: 'drinks.png',
  }, {
    name: 'Фаст-фуд',
    icon: 'fast-food.png',
  }, {
    name: 'Кальяни',
    icon: 'hookah.png',
  }];

  categories.forEach((category, order) => {
    const categoryId = Category.insert({
      name: category.name,
      urlName: category.urlName,
      icon: category.icon,
      organizationId,
      order
    });

    categoryIds.push(categoryId);
  });
}
