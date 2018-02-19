// All comparisons-related publications

import { Meteor } from "meteor/meteor";
import Comparisons from "../comparisons.js";

Meteor.publish("comparisons.all", function() {
  return Comparisons.find({});
});
Meteor.publish("comparisons.allIdOnly", function() {
  return Comparisons.find({}, { fields: { _id: 1 } });
});

Meteor.publish("comparisons.byCompId", function(compId) {
  return Comparisons.find(compId);
});
