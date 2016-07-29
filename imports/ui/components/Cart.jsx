import React from 'react';

import CartItemContainer from '../conteiners/CartItemContainer';

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

              <button className="btn orange waves-effect waves-light">Замовити</button>
            </div>
          </div>
        }
      </div>
    );
  }
}
