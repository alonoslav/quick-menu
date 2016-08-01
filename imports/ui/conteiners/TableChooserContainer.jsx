import React from 'react';

import { createContainer } from 'meteor/react-meteor-data';

import TableChooser from '../components/TableChooser';
import { Table } from '../../api/table/table';

export default createContainer(() => {
  const subscription = Meteor.subscribe('table.byOrganization');
  const tables = Table.find().fetch();

  return {
    tables,
    ready: subscription.ready(),
  };
}, TableChooser);