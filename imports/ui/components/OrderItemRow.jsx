import React from 'react';

export default class OrderItemRow extends React.Component {
  getTotal() {
    const { item } = this.props;
    const total = item.price * item.count;
    return total.toFixed(2);
  }

  render() {
    const { item } = this.props;

    return (
      <div className="row">
        <div className="col s5">
          <b>{item.name}</b> x {item.count} од.
        </div>

        <div className="col s7 right-align">
          {this.getTotal()} грн. ({item.price} грн. x {item.count})
        </div>
      </div>
    );
  }
}
