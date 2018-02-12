// Definition of the comparisons collection

import { Mongo } from "meteor/mongo";
import SimpleSchema from "simpl-schema";

const CompMeta = new Mongo.Collection("compMeta");
const compMetaSchema = new SimpleSchema({
  urlA: {
    type: String
  },
  seedA: {
    type: String
  },
  tagsA: {
    type: Array,
    optional: true
  },
  "tagsA.$": {
    type: Object,
    optional: true
  },
  "tagsA.$.class": {
    type: String,
    optional: true
  },
  "tagsA.$.score": {
    type: Number,
    optional: true
  },
  urlB: {
    type: String
  },
  seedB: {
    type: String
  },
  tagsB: {
    type: Array,
    optional: true
  },
  "tagsB.$": {
    type: Object,
    optional: true
  },
  "tagsB.$.class": {
    type: String,
    optional: true
  },
  "tagsB.$.score": {
    type: Number,
    optional: true
  },
  A: {
    type: Number,
    optional: true
  },
  B: {
    type: Number,
    optional: true
  }
});
CompMeta.attachSchema(compMetaSchema);
export default CompMeta;
