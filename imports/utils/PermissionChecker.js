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
    return Organization.findOne({
      _id: organizationId,
      owner: this._user._id,
    });
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