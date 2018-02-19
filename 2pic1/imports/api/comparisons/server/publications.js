// All comparisons-related publications

import { Meteor } from "meteor/meteor";
import Comparisons from "../comparisons.js";

Meteor.publish("comparisons.all", function() {
  return Comparisons.find();
});

Meteor.publish("comparisons.byCompId", function(compId) {
  return Comparisons.find({ _id: compId });
});
