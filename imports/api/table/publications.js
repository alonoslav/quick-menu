import { Meteor } from 'meteor/meteor';

import { Table } from './table';

Meteor.publish('table.byOrganization', function () {
  return Table.find();
});