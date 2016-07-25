import React from 'react';
import { mount } from 'react-mounter';

import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router'

import BlankLayout from '/imports/ui/layouts/BlankLayout';
import MainLayout from '/imports/ui/layouts/MainLayout';

import Dashboard from '/imports/ui/components/Dashboard';

import LoginContainer from '/imports/ui/conteiners/LoginContainer';

const requireLogin = function () {
  if (!Meteor.loggingIn()) {
    if (!Meteor.user()) {
      FlowRouter.go('signIn');
    }
  }
};


FlowRouter.route('/', {
  triggersEnter: [requireLogin],
  name: 'dashboard',
  action() {
    mount(BlankLayout, {content: <Dashboard />});
  }
});

FlowRouter.route('/sign-in', {
  name: 'signIn',
  action() {
    mount(BlankLayout, {content: <LoginContainer />});
  }
});