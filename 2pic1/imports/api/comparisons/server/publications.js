// All comparisons-related publications

import { Meteor } from "meteor/meteor";
import { Comparisons } from "../comparisons.js";

Meteor.publish("comparisons.all", function() {
  return Comparisons.find();
});
