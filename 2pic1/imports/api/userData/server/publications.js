// All UserData-related publications
import { Meteor } from "meteor/meteor";
import UserData from "../userData.js";

if (Meteor.isServer) {
  Meteor.publish("userData.all", function() {
    return UserData.find();
  });

  Meteor.publish("userData.byUserId", function(userId) {
    return UserData.find({ _id: userId });
  });
}
