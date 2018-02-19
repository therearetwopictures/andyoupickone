// All comparisons-related publications

import { Meteor } from "meteor/meteor";
import Comparisons from "../comparisons.js";

Meteor.publish("comparisons.all", function() {
  return Comparisons.find({}, { fields: { _id: 1 } });
});
Meteor.publish("comparisons.getByCompId", function(compId) {
  return Comparisons.find(compId);
});

Meteor.publish("comparisons.byCompId", function(compId) {
  return Comparisons.find({ _id: compId });
});
