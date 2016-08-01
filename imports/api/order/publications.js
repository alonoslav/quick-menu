import { Meteor } from 'meteor/meteor';

import { Order } from '/imports/api/order/order';

Meteor.publish('order.byOrganization', function () {
  return Order.find();
});