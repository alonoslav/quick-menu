import { Meteor } from 'meteor/meteor';

import { Order } from '/imports/api/order/order';

Meteor.methods({
  'order.create'(orderedItems, table) {
    const order = {
      table,
      orderedItems,
      createdAt: new Date(),
      status: 'new',
      alert: true,
    };

    return Order.insert(order);
  },

  'order.setStatus'(order, status) {
    return Order.update({ _id: order._id }, { $set: { status } });
  },

  'order.offAlert'(order) {
    return Order.update({ _id: order._id }, { $set: { alert: false } });
  }
});