import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
// import { Accounts } from "meteor/accounts-base";
import Users from "./users.js";
import { Cookies } from "meteor/ostrio:cookies";

Meteor.methods({
  "users.sendCookie"() {
    const cookies = new Cookies();
    newUser = () => {
      Users.insert({ init: true }, (err, insert) => {
        console.log(insert);
        cookies.set("userID", insert);
      });
    };
    newUser();
    console.log(cookies);

    // console.log(cookies);
  }
});
