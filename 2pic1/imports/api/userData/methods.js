import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
// import { Accounts } from "meteor/accounts-base";
import UserData from "./userData.js";

Meteor.methods({
  "userData.createUserSession"() {
    let currentUser = UserData.find({ _id: this.userId }).fetch();
    const sessionId = new Meteor.Collection.ObjectID()._str;
    console.log(sessionId);
    // console.log(currentUser);
    if (currentUser && currentUser.length === 0) {
      UserData.insert({
        _id: this.userId,
        sessions: [{ sessionId: sessionId, start: new Date().toISOString() }]
      });
    } else {
      UserData.update(
        { _id: this.userId },
        {
          $push: {
            sessions: { sessionId: sessionId, start: new Date().toISOString() }
          }
        }
      );
    }
    // console.log(this.userId);
  },
  "userData.updatePicks"(comparisonId, pick) {
    UserData.update(
      { _id: this.userId },
      {
        $push: {
          picks: {
            comparisonId,
            pick
          }
        }
      }
    );
  }
});
