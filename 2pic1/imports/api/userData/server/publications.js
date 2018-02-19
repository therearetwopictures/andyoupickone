// All UserData-related publications

import { Meteor } from "meteor/meteor";
import UserData from "../userData";

Meteor.publish("userData.all", function() {
  return UserData.find();
});

Meteor.publish("userData.allIdOnly", function() {
  return UserData.find({}, { fields: { _id: 1 } });
});
Meteor.publish("comparisons.byUserId", function(compId) {
  return Comparisons.find(compId);
});
