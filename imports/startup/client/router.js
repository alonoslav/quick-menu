import React from 'react';
import { mount } from 'react-mounter';

import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router'

import BlankLayout from '/imports/ui/layouts/BlankLayout';
import MainLayout from '/imports/ui/layouts/MainLayout';

import LoginContainer from '/imports/ui/conteiners/LoginContainer';
import DashboardContainer from '/imports/ui/conteiners/DashboardContainer';
import CartContainer from '/imports/ui/conteiners/CartContainer';

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
    mount(MainLayout, {
      content: <DashboardContainer />,
      title: 'Меню'
    });
  }
});

FlowRouter.route('/sign-in', {
  name: 'signIn',
  action() {
    mount(BlankLayout, {content: <LoginContainer />});
  }
});

FlowRouter.route('/cart', {
  name: 'cart',
  action() {
    mount(MainLayout, {
      content: <CartContainer />,
      title: 'Кошик',
    });
  }
});

// hidden routes
FlowRouter.route('/logout', {
  name: 'logout',
  action() {
    Meteor.logout();
    FlowRouter.go('signIn');
  },
});

FlowRouter.route('/change-table', {
  name: 'changeTable',
  action() {
    localStorage.removeItem('table');
    FlowRouter.go('dashboard');
  },
});
