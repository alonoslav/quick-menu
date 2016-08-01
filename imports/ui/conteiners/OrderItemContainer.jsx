import React from 'react';

import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import OrderItem from '../components/OrderItem';

import { Table } from '/imports/api/table/table';

export default createContainer(({ order }) => {
  const tableId = order.table;

  const tableSubscription = Meteor.subscribe('table.byIds', tableId);
  const table = Table.findOne({ _id: tableId });

  const menuIds = order.orderedItems.map(item => item._id);
  const menuSubscription = Meteor.subscribe('menu.byIds', menuIds);

  return {
    table,
    ready: tableSubscription.ready() && menuSubscription.ready(),
  };
}, OrderItem);