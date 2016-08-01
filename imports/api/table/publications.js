import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';

import { Table } from './table';

Meteor.publish('table.byOrganization', function () {
  return Table.find();
});

Meteor.publish('table.byIds', function (ids) {
  ids = _.isArray(ids) ? ids : [ids];

  return Table.find({ _id: { $in: ids } });
});