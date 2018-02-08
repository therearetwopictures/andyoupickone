// Definition of the comparisons collection

import { Mongo } from "meteor/mongo";
import SimpleSchema from "simpl-schema";

const Comparisons = new Mongo.Collection("comparisons");
const comparisonsSchema = new SimpleSchema({
  urlA: {
    type: String
  },
  urlB: {
    type: String
  },
  createdAt: {
    type: Date
  }
});
Comparisons.attachSchema(comparisonsSchema);
export default Comparisons;
