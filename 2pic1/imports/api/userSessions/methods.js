import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
// import { Accounts } from "meteor/accounts-base";
import Users from "./users.js";
import { Cookies } from "meteor/ostrio:cookies";

newUser = () => {
  return Users.insert({ init: true }, (err, insert) => {
    // console.log(insert);
    return insert;
  });
};

Meteor.methods({
  "users.sendCookie"() {
    let cookies = new Cookies();
    WebApp.connectHandlers.use((req, res, next) => {
      cookies = req.Cookies;
      // console.log(Cookies);
      let insert = newUser();
      // console.log(insert);
      cookies.set("userID", insert);
      console.log(cookies);
    });
    // console.log(cookies);
  }
});
