import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
// import { Accounts } from "meteor/accounts-base";
import UserData from "./userData.js";

Meteor.methods({
  "userData.createUserSession"() {
    let currentUser = UserData.find({ _id: this.userId }).fetch();
    // console.log(currentUser);
    if (currentUser && currentUser.length === 0) {
      UserData.insert({
        _id: this.userId,
        sessions: [{ start: new Date().toISOString() }]
      });
    } else {
      UserData.update(
        { _id: this.userId },
        { $push: { sessions: { start: new Date().toISOString() } } }
      );
    }
    // console.log(this.userId);
  },
  "userData.updatePicks"() {
    UserData.update(
      { _id: this.userId },
      {
        $set: {
          picks: {
            $push: {
              comparissonId: /*(comparissonId)*/ "",
              pick: /*A or B*/ ""
            }
          }
        }
      }
    );
  }
});
