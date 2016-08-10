import React from 'react';

import { Meteor } from 'meteor/meteor';

import { createContainer } from 'meteor/react-meteor-data';

import BlankLayout from './BlankLayout';

export default createContainer(() => {
  Meteor.subscribe('user.current');

  return {};
}, BlankLayout);
