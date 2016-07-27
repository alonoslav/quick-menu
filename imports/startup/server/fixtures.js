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
    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/3/32/Pakistan_Tobacco_Company_logo.svg/1280px-Pakistan_Tobacco_Company_logo.svg.png'
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

  Meteor.users.update({}, {$set: {organizationId}}, {multi: true});

  ['1', '2', '3'].forEach(name => {
    return Table.insert({
      name,
      organizationId
    });
  });

  const categoryIds = [];

  ['Закуски', 'Напої', 'Фаст-фуд', 'Кальяни'].forEach((name, order) => {
    const categoryId = Category.insert({
      name,
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

  const photo = 'http://lorempixel.com/1024/768/food';
  const name = 'Lorem ipsum';

  for (let i = 0; i < 9; i++) {
    const categoryId = Random.choice(categoryIds);

    Menu.insert({
      name,
      organizationId,
      categoryId,
      description,
      photo,
      inTop: false,
      price: 48
    });
  }
}