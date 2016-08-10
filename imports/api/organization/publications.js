import { Meteor } from 'meteor/meteor';

import { Organization } from './organization';

Meteor.publish('organization.byId', function (organizationId) {
  return Organization.find({_id: organizationId});
});
