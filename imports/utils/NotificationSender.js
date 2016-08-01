import { _ } from 'meteor/underscore';

import CommonAlerts from './CommonAlerts';

export default class NotificationSender {
  static send(text, type, callback) {
    const notificationSound = new Audio('/expect-good-news.mp3');
    notificationSound.play();

    CommonAlerts[type](text);

    if (_.isFunction(callback)) {
      callback();
    }
  }
}