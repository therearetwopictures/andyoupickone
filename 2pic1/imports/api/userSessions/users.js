// import { Mongo } from "meteor/mongo";
// import SimpleSchema from "simpl-schema";

// const Users = new Mongo.Collection("users");

// // const picks.$ = new SimpleSchema({
// //   comparisonId: { type: String },
// //   pick: { type: String }
// // });

// // const sessionsSchema = new SimpleSchema({
// //   start: { type: Date },
// //   end: { type: Date }
// // });
// const usersSchema = new SimpleSchema({
//   init: {
//     type: Boolean
//   },
//   cookieKey: {
//     type: String,
//     optional: true
//   },
//   // picks: {
//   //   type: Array
//   // },
//   "picks.$.comparisonId": {
//     type: String,
//     optional: true
//   },
//   "picks.$.pick": {
//     type: String,
//     optional: true
//   },
//   location: {
//     type: String,
//     optional: true
//   },
//   "sessions.$.start": {
//     type: Date,
//     optional: true
//   },
//   "sessions.$.end": {
//     type: Date,
//     optional: true
//   }
// });
// Users.attachSchema(usersSchema);
// export default Users;
