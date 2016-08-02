import React from 'react';

import OrderItemContainer from '../conteiners/OrderItemContainer';

export default class OrdersList extends React.Component {
  getOrderItems() {
    const orders = this.props.orders;

    if (orders.length === 0) {
      return <h2 className="center-align">Замовлень немає</h2>
    } else {
      return orders.map(order => <OrderItemContainer key={order._id} order={order}/>);
    }
  }

  render() {
    return (
      <div>
        {this.getOrderItems()}
      </div>
    );
  }
}