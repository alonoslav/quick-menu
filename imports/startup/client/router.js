import React from 'react';
import { mount } from 'react-mounter';

import { FlowRouter } from 'meteor/kadira:flow-router'

import BlankLayout from '/imports/ui/layouts/BlankLayout';
import MainLayout from '/imports/ui/layouts/MainLayout';

import Dashboard from '/imports/ui/components/Dashboard';

FlowRouter.route('/', {
  name: 'dashboard',
  action() {
    mount(BlankLayout, {content: <Dashboard />});
  }
});