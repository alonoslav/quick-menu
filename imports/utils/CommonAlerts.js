import { Materialize } from 'meteor/materialize:materialize';

export default class CommonAlerts {
  static error(err) {
    console.log(err);

    const toast = function (text) {
      return Materialize.toast(`Error! ${text}`, 3000, 'red lighten-1');
    };

    if (err) {
      if (err.reason) {
        return toast(err.reason);
      } else if (err.error) {
        return toast(err.error);
      } else if (err.message) {
        return toast(err.message);
      } else {
        return toast(err);
      }
    } else {
      return toast('');
    }
  }

  static success(text) {
    return Materialize.toast(text, 3000, 'green lighten-1');
  }
}