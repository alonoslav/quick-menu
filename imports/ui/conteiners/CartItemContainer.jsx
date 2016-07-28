import React from 'react';

import { createContainer } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';

import CartItem from '../components/CartItem';

export default createContainer(({ cartItem }) => {
  const cartItems = Session.get('cart');
  const count = cartItems[cartItem._id];

  return {
    count
  };
}, CartItem);