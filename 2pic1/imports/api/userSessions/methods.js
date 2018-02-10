// import { Meteor } from "meteor/meteor";
// import { check } from "meteor/check";
// // import { Accounts } from "meteor/accounts-base";
// import Users from "./users.js";
// import { Cookies } from "meteor/ostrio:cookies";

// newUser = () => {
//   return Users.insert({ init: true }, (err, insert) => {
//     // console.log(insert);
//     return insert;
//   });
// };

// Meteor.methods({
//   "users.sendCookie"() {}
// });

// WebApp.connectHandlers.use((req, res, next) => {
//   let cookies = new Cookies();
//   cookies = req.Cookies;
//   let insert = newUser();
//   cookies.set("userID", insert);
//   // cookies.send("userID", insert);
//   console.log(cookies);
// });
