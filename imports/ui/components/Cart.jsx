import React from 'react';

import CartItemContainer from '../conteiners/CartItemContainer';

export default class Cart extends React.Component {
  getCartItems() {
    const { cartItems } = this.props;
    return cartItems.map(cartItem => <CartItemContainer key={cartItem._id}
                                               cartItem={cartItem}/>);
  }

  render() {
    return (
      <div>
        <ul className="collection">
          {this.props.ready ? this.getCartItems() : 'loading...'}
        </ul>
        <div>
          <h2 className="right-align">{this.props.total} грн.</h2>
        </div>
      </div>
    );
  }
}