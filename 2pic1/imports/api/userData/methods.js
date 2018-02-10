import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
// import { Accounts } from "meteor/accounts-base";
import UserData from "./userData.js";

Meteor.methods({
  "userData.createUserSession"() {
    let currentUser = UserData.find({ userId: this.userId }).fetch();
    // console.log(currentUser);
    if (currentUser && currentUser.length === 0) {
      UserData.insert({ userId: this.userId });
    }
    // console.log(this.userId);
  }
});
