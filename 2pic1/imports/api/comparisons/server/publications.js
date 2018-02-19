// All comparisons-related publications

import { Meteor } from "meteor/meteor";
import Comparisons from "../comparisons.js";

Meteor.publish("comparisons.all", function() {
  return Comparisons.find({});
});
Meteor.publish("comparisons.getByCompId", function(compId) {
  return Comparisons.find(compId);
});

// Meteor.publish("comparisons.tagsA", function() {
//   return Comparisons.find({}, { fields: { tagsA: 1 } });
// });

// Meteor.publish("comparisons.tagsA", function() {
//   return Comparisons.find({}, { fields: { tagsB: 1 } });
// });
Meteor.publish("comparisons.byCompId", function(compId) {
  return Comparisons.find({ _id: compId });
});
