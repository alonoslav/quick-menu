import React from 'react';

import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { _ } from 'meteor/underscore';

import WaitersHeader from '../components/WaitersHeader';
import { Order } from '/imports/api/order/order';

export default createContainer(() => {
  const subscription = Meteor.subscribe('order.byOrganization');
  const orders = Order.find().fetch();

  return {
    orders,
    ready: subscription.ready(),
  };
}, WaitersHeader);