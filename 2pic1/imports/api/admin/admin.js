import { Meteor } from "meteor/meteor";

if (Meteor.isServer) {
  Meteor.publish("admin", function isUserAdmin() {
    return Meteor.users.find(this.userId, { fields: { role: 1 } });
  });
}
