import { _ } from 'meteor/underscore';

import CommonAlerts from './CommonAlerts';

export default class Misc {
  static handleMethodResult(onSuccessCallback) {
    return function (err, res) {
      if (err) {
        CommonAlerts.error(err);
      } else {
        if (_.isFunction(onSuccessCallback)) {
          onSuccessCallback(res);
        }
      }
    };
  }
}