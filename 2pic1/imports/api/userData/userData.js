import { Mongo } from "meteor/mongo";
import SimpleSchema from "simpl-schema";

const UserData = new Mongo.Collection("userData");

const usersSchema = new SimpleSchema({
  _id: {
    type: String
  },
  picks: {
    type: Array,
    optional: true
  },
  "picks.$": {
    type: Object,
    optional: true
  },
  "picks.$.comparisonId": {
    type: String,
    optional: true
  },
  "picks.$.pick": {
    type: String,
    optional: true
  },
  location: {
    type: String,
    optional: true
  },
  sessions: {
    type: Array,
    optional: true
  },
  "sessions.$": {
    type: Object,
    optional: true
  },
  "sessions.$.start": {
    type: Date,
    optional: true
  },
  "sessions.$.end": {
    type: Date,
    optional: true
  }
});
UserData.attachSchema(usersSchema);
export default UserData;
