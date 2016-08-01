import React from 'react';

import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import OrdersList from '../components/OrdersList';

import { Order } from '/imports/api/order/order';

export default createContainer(() => {
  const subscription = Meteor.subscribe('order.byOrganization');
  const orders = Order.find({ status: { $ne: 'close' } }, { sort: { createdAt: -1 } }).fetch();

  return {
    orders,
    ready: subscription.ready(),
  };
}, OrdersList);