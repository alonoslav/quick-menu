import React from 'react';

import { FlowRouter } from 'meteor/kadira:flow-router';

import Misc from '/imports/utils/Misc';

export default class Login extends React.Component {
  loginHandler(event) {
    event.preventDefault();

    const email = this.refs.email.value.trim();
    const password = this.refs.password.value.trim();

    return Meteor.loginWithPassword({ email }, password, Misc.handleMethodResult(() => {
      FlowRouter.go('dashboard');
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
                <input type="email" ref="email" required="required" />
                <label htmlFor="email">Email</label>
              </div>
            </div>

            <div className="row">
              <div className="input-field col s12">
                <input type="password" ref="password" required="required" />
                <label htmlFor="password">Пароль</label>
              </div>
            </div>

            <button className="btn waves-effect waves-light" type="submit">Увійти</button>
          </form>
        </div>
      </div>
    );
  }
}