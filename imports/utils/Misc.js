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

  static getValuesFromRefs(refs, fields, trim) {
    const values = {};

    fields.forEach(field => {
      let value = refs[field].value;
      values[field] = trim ? value.trim() : value;
    });

    return values;
  }
}
