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
  urlB: {
    type: String
  },
  seedB: {
    type: String
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
