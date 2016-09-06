import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';

import { Table } from './table';

Meteor.publish('table.byOrganization', function (organizationId = null) {
  const query = {};

  if (organizationId) {
    query.organizationId = organizationId;
  }

  return Table.find(query);
});

Meteor.publish('table.byIds', function (ids) {
  ids = _.isArray(ids) ? ids : [ids];

  return Table.find({ _id: { $in: ids } });
});
