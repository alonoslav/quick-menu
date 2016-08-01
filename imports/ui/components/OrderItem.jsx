import React from 'react';
import classNames from 'classnames';

import { _ } from 'meteor/underscore';
import { moment } from 'meteor/momentjs:moment';

import OrderItemRow from './OrderItemRow';
import Misc from '/imports/utils/Misc';
import CommonAlerts from '/imports/utils/CommonAlerts';
import NotificationSender from '/imports/utils/NotificationSender';
import { Menu } from '/imports/api/menu/menu';

export default class OrderItem extends React.Component {
  componentDidMount() {
    const order = this.props.order;

    if (order.status === 'new' && order.alert === true) {
      NotificationSender.send('Нове замовлення', 'success', () => {
        Meteor.call('order.offAlert', order, Misc.handleMethodResult());
      });
    }
  }

  getOrderedItems() {
    const { orderedItems } = this.props.order;

    return orderedItems.map(item => {
      const menuItem = Menu.findOne({ _id: item._id });
      _.extend(item, menuItem);

      return <OrderItemRow key={item._id} item={item}/>
    });
  }

  getTotal() {
    const { orderedItems } = this.props.order;

    return orderedItems.reduce((memo, item) => {
      return memo + item.price * item.count;
    }, 0);
  }

  approveOrder(event) {
    event.preventDefault();

    Meteor.call('order.setStatus', this.props.order, 'approve', Misc.handleMethodResult(() => {
      CommonAlerts.success('Замовлення підтверджено');
    }));
  }

  closeOrder(event) {
    event.preventDefault();

    Meteor.call('order.setStatus', this.props.order, 'close', Misc.handleMethodResult(() => {
      CommonAlerts.success('Замовлення виконано');
    }));
  }

  formatDate() {
    const date = this.props.order.createdAt;
    return moment(date).format('HH:mm:ss D.MM.YYYY');
  }

  render() {
    const cardClass = classNames('card', {
      'orange lighten-4': this.props.order.status === 'new',
    });

    return (
      <div>
        {this.props.ready ?
          <div className="row">
            <div className="col s12">
              <div className={cardClass}>
                <div className="card-content">
                  <span className="card-title">
                    Столик {this.props.table.name}&nbsp;
                    <h6 className="right grey-text darken-2">{this.formatDate()}</h6>
                  </span>

                  {this.getOrderedItems()}
                  <div className="right-align flow-text">
                    <b>{this.getTotal()} грн.</b>
                  </div>
                </div>
                <div className="card-action">
                  {
                    this.props.order.status === 'new' ?
                      <a href="#" onClick={this.approveOrder.bind(this)}>
                        Підтвердити замовлення
                      </a>
                      :
                      <a href="#" onClick={this.closeOrder.bind(this)}>
                        Завершити замовлення
                      </a>
                  }
                </div>
              </div>
            </div>
          </div> : ''
        }

      </div>
    );
  }
}