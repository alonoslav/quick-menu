import React from 'react';
import { mount } from 'react-mounter';

import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router'

import BlankLayout from '/imports/ui/layouts/BlankLayout';
import MainLayout from '/imports/ui/layouts/MainLayout';
import WaitersLayout from '/imports/ui/layouts/WaitersLayout';
import OwnersLayout from '/imports/ui/layouts/OwnersLayout';

import LoginContainer from '/imports/ui/conteiners/LoginContainer';
import DashboardContainer from '/imports/ui/conteiners/DashboardContainer';
import CartContainer from '/imports/ui/conteiners/CartContainer';
import MenuListContainer from '/imports/ui/conteiners/MenuListContainer';
import OrdersListContainer from '/imports/ui/conteiners/OrdersListContainer';
import OwnerMenuListContainer from '/imports/ui/conteiners/OwnerMenuListContainer';
import OwnerCreateMenuContainer from '/imports/ui/conteiners/OwnerCreateMenuContainer';

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

FlowRouter.route('/menu-list/:category?', {
  name: 'menuList',
  action() {
    mount(MainLayout, {
      content: <MenuListContainer />,
      title: 'Меню',
    });
  },
});

FlowRouter.route('/orders-list', {
  name: 'ordersList',
  action() {
    mount(WaitersLayout, {
      content: <OrdersListContainer/>,
      title: 'Замовлення',
    });
  },
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

FlowRouter.route('/owner-menu/:category?', {
  triggersEnter: [requireLogin],
  name: 'ownerMenuList',
  action() {
    mount(OwnersLayout, {
      content: <OwnerMenuListContainer />,
      title: 'Керування меню'
    });
  },
});

FlowRouter.route('/owner-crete-menu', {
  name: 'ownerCreateMenu',
  action() {
    mount(OwnersLayout, {
      content: <OwnerCreateMenuContainer />,
      title: 'Створити меню',
    });
  }
});
