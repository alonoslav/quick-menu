import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Random } from 'meteor/random';

import { Organization } from '/imports/api/organization/organization';
import { Table } from '/imports/api/table/table';
import { Category } from '/imports/api/category/category';
import { Menu } from '/imports/api/menu/menu';

if (Meteor.users.find().count() === 0) {
  Accounts.createUser({
    username: 'admin',
    email: Meteor.settings.superUserMail,
    password: 'qweqweqwe'
  });
}

if (Organization.find().count() === 0) {
  const ownerId = Accounts.createUser({
    username: 'test owner',
    email: 'test.owner@mail.com',
    password: 'qweqweqwe',
  });

  const organizationId = Organization.insert({
    name: 'Test org',
    owner: ownerId,
  });

  Accounts.createUser({
    username: 'test waiter',
    email: 'test.waiter@mail.com',
    password: 'qweqweqwe',
  });

  Accounts.createUser({
    username: 'test customer',
    email: 'test.customer@mail.com',
    password: 'qweqweqwe'
  });

  Meteor.users.update({}, { $set: { organizationId } }, { multi: true });

  ['1', '2', '3'].forEach(name => {
    return Table.insert({
      name,
      organizationId
    });
  });

  const categoryIds = [];

  const categories = [{
    name: 'Закуски',
    urlName: 'appetizer',
    icon: 'appetizer.png',
  }, {
    name: 'Напої',
    urlName: 'drinks',
    icon: 'drinks.png',
  }, {
    name: 'Фаст-фуд',
    urlName: 'fast-food',
    icon: 'fast-food.png',
  }, {
    name: 'Кальяни',
    urlName: 'hookah',
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

  const description = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
    Aliquam molestie risus sit amet commodo finibus. Curabitur et bibendum lorem. 
    Quisque ut nisi metus. Donec ornare venenatis rhoncus. Etiam scelerisque dui 
    et ornare varius. Duis id odio in neque hendrerit sagittis. Maecenas congue enim 
    ut vehicula pharetra. Duis venenatis magna eget erat porttitor tempor. Proin tempor 
    auctor urna, eget tempus nunc porta ut. Ut massa ligula, ornare in enim eu, pharetra 
    tincidunt justo. Integer sagittis nisi ac ante viverra, et ultricies tortor volutpat. 
    Integer tortor nisl, viverra nec ornare id, dignissim hendrerit turpis. Duis porta 
    metus non enim tincidunt molestie. In malesuada mollis elit ac ornare.`;

  const photo = '/menu/menu.jpeg';

  const names = description.replace(/\n/g, '').replace(/\s\s/g, '').split(' ');

  for (let i = 0; i < 9; i++) {
    const price = parseInt(Math.random() * 10000, 10) / 100;
    const name = Random.choice(names);
    const categoryId = Random.choice(categoryIds);

    Menu.insert({
      name,
      organizationId,
      categoryId,
      description,
      photo,
      price,
      inTop: false,
    });
  }
}
