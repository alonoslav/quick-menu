import React from 'react';

import { createContainer } from 'meteor/react-meteor-data';
import { FlowRouter } from 'meteor/kadira:flow-router';

import PermissionChecker from '/imports/utils/PermissionChecker';
import Dashboard from '/imports/ui/components/Dashboard';

export default createContainer(() => {
  const userId = Meteor.userId();
  const permissionChecker = new PermissionChecker(userId);

  if (permissionChecker.isCustomer()) {
    FlowRouter.go('menuList');
  } else if (permissionChecker.isWaiter()) {
    FlowRouter.go('ordersList');
  } else {
    FlowRouter.go('dashboard');
  }

  return {
    permissionChecker
  };
}, Dashboard);