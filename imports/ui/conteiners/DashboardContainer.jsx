import React from 'react';

import { createContainer } from 'meteor/react-meteor-data';

import PermissionChecker from '/imports/utils/PermissionChecker';
import Dashboard from '/imports/ui/components/Dashboard';

export default createContainer(() => {
  const userId = Meteor.userId();
  const permissionChecker = new PermissionChecker(userId);

  return {
    permissionChecker
  };
}, Dashboard);