import React from 'react';

import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import Login from '../components/Login';

export default createContainer(() => {
  return {
    currentUser: Meteor.user()
  };
}, Login);