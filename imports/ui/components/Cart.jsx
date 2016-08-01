import React from 'react';

import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';

import { FlowRouter } from 'meteor/kadira:flow-router';

import CartItemContainer from '../conteiners/CartItemContainer';
import CommonAlerts from '../../utils/CommonAlerts';
import Misc from '../../utils/Misc';

export default class Cart extends React.Component {
  cartEmpty() {
    const { cartItems } = this.props;
    return cartItems.length === 0;
  }

  getCartItems() {
    const { cartItems } = this.props;
    return cartItems.map(cartItem => <CartItemContainer key={cartItem._id}
                                                        cartItem={cartItem}/>);
  }

  saveOrder(event) {
    event.preventDefault();

    const cartItems = _.map(this.props.cartItems, item => {
      return _.pick(item, ['_id', 'count', 'price']);
    });

    if (cartItems.length === 0) {
      return CommonAlerts.error('Ваше замовлення порожнє!')
    }

    const table = localStorage.getItem('table');

    Meteor.call('order.create', cartItems, table, Misc.handleMethodResult(() => {
      Session.set('cart', null);
      CommonAlerts.success('Ваше замовлення прийняте. Очікуйте підтвердження.');
      return FlowRouter.go('/menu-list');
    }));
  }

  render() {
    return (
      <div>
        {this.cartEmpty() ? <h3 className="center-align">Ваш кошик порожній</h3> :
          <div>
            <ul className="collection">
              {this.props.ready ? this.getCartItems() : 'Loading...'}
            </ul>
            <div className="center-align">
              <p className="flow-text">
                Загалом: <b>{this.props.total} грн.</b>
              </p>

              <button className="btn orange waves-effect waves-light"
                      onClick={this.saveOrder.bind(this)}>
                Замовити
              </button>
            </div>
          </div>
        }
      </div>
    );
  }
}
