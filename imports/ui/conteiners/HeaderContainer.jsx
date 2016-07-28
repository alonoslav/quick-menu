import React from 'react';

import { Session } from 'meteor/session';
import { createContainer } from 'meteor/react-meteor-data';

import Header from '../components/Header';

export default createContainer(() => {
  return {
    cartItems: Session.get('cart')
  };
}, Header);