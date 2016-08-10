import { Meteor } from 'meteor/meteor';

Meteor.publish('user.current', function() {
  const userId = this.userId;
  return Meteor.users.find({_id: userId});
});
