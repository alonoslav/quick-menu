import React from 'react';

export default class OrderItemRow extends React.Component {
  render() {
    const { item } = this.props;

    return (
      <div className="row">
        <div className="col s5">
          <b>{item.name}</b> x {item.count} од.
        </div>

        <div className="col s7 right-align">
          {item.price * item.count} грн. ({item.price} грн. x {item.count})
        </div>
      </div>
    );
  }
}