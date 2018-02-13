// All UserData-related publications

import { Meteor } from "meteor/meteor";
import { Comparisons } from "../userData.js";

Meteor.publish("userData.all", function() {
  return UserData.find();
});
