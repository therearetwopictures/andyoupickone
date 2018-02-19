// All comparisons-related publications

import { Meteor } from "meteor/meteor";
import Comparisons from "../comparisons.js";

Meteor.publish("comparisons.all", function() {
  return Comparisons.find();
});

Meteor.publish("comparisons.tagsA", function() {
  return Comparisons.find({}, { fields: { tagsA: 1 } });
});

Meteor.publish("comparisons.tagsA", function() {
  return Comparisons.find({}, { fields: { tagsB: 1 } });
});
