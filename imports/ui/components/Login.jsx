import React from 'react';

import { FlowRouter } from 'meteor/kadira:flow-router';

import Misc from '/imports/utils/Misc';

export default class Login extends React.Component {
  loginHandler(event) {
    event.preventDefault();

    const username = this.refs.username.value.trim();
    const password = this.refs.password.value.trim();

    return Meteor.loginWithPassword({ username }, password, Misc.handleMethodResult(() => {
      const user = Meteor.user();
      const organizationId = user && user.organizationId;

      localStorage.setItem('organization', organizationId);

      FlowRouter.go('/');
    }));
  }

  render() {
    return (
      <div>
        <h3 className="center-align">Увійти</h3>

        <div className="row">
          <form className="col s12 l6 offset-l3" onSubmit={this.loginHandler.bind(this)}>

            <div className="row">
              <div className="input-field col s12">
                <input type="text" ref="username" required="required"/>
                <label htmlFor="username">Ім’я користувача</label>
              </div>
            </div>

            <div className="row">
              <div className="input-field col s12">
                <input type="password" ref="password" required="required"/>
                <label htmlFor="password">Пароль</label>
              </div>
            </div>

            <div className="s12">
              <button className="btn waves-effect waves-light orange btn-block" type="submit">
                Увійти
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
