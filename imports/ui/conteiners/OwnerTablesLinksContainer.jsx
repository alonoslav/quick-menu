import React from 'react';

import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import OwnerTablesLinks from '../components/OwnerTablesLinks';
import { Table } from '/imports/api/table/table';

export default createContainer(() => {
  const userSubscription = Meteor.subscribe('user.current');

  let data = {};

  if (userSubscription.ready()) {
    const user = Meteor.user();
    const { organizationId } = user;

    const tableSubscription = Meteor.subscribe('table.byOrganization', organizationId);
    const tables = Table.find({ organizationId }).fetch();

    data = {
      organizationId,
      tables,
      ready: tableSubscription.ready(),
    };
  }

  return data;
}, OwnerTablesLinks);
