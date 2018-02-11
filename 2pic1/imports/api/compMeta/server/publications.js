// All metaData-related publications
import { Meteor } from "meteor/meteor";
import { CompMeta } from "../compMeta.js";

Meteor.publish("compMeta.all", function() {
  return CompMeta.find();
});
