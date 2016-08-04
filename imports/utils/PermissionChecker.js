import { Meteor } from 'meteor/meteor';
import { Organization } from '/imports/api/organization/organization';

export default class PermissionChecker {
  constructor(userId) {
    this._user = Meteor.users.findOne({_id: userId});
  }

  isAdmin() {
    return this._user &&
      this._user.emails &&
      this._user.emails[0].address === Meteor.settings.superUserMail;
  }

  isOwner(organizationId) {
    return this._user &&
      this._user.username.indexOf('owner') > -1;
  }

  // todo: Rewrite it!!!
  isWaiter() {
    return this._user &&
      this._user.username.indexOf('waiter') > -1;
  }

  isCustomer() {
    return this._user &&
      this._user.username.indexOf('customer') > -1;
  }
}