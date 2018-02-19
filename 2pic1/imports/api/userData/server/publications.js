// All UserData-related publications
import { Meteor } from "meteor/meteor";
import UserData from "../userData.js";

if (Meteor.isServer) {
  Meteor.publish("userData.all", function() {
    return UserData.find();
  });
  Meteor.publish("userData.allIdOnly", function() {
    return UserData.find({}, { fields: { _id: 1, picks: 1 } });
  });

  Meteor.publish("userData.byUserId", function(userId) {
    return UserData.find({ _id: userId });
  });
}
