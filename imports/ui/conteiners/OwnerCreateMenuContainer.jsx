import React from 'react';

import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import OwnerCreateMenu from '../components/OwnerCreateMenu';
import { Category } from '/imports/api/category/category';

export default createContainer(() => {
  const subscription = Meteor.subscribe('category.byOrganization');
  const categories = Category.find().fetch();

  return {
    categories,
    ready: subscription.ready(),
  };
}, OwnerCreateMenu);
