import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
// import { Accounts } from "meteor/accounts-base";
import UserData from "./userData.js";

Meteor.methods({
  "userData.createUserSession"() {
    let currentUser = UserData.find({ _id: this.userId }).fetch();
    const sessionId = new Meteor.Collection.ObjectID()._str;
    // console.log(sessionId);
    // console.log(currentUser);
    if (currentUser && currentUser.length === 0) {
      UserData.insert({
        _id: this.userId,
        sessions: [
          {
            sessionId: sessionId,
            start: new Date().toISOString(),
            end: new Date().toISOString()
          }
        ]
      });
    } else {
      UserData.update(
        { _id: this.userId },
        {
          $push: {
            sessions: {
              sessionId: sessionId,
              start: new Date().toISOString(),
              end: new Date().toISOString()
            }
          }
        }
      );
    }
    // console.log(this.userId);
  },
  "userData.userHasPicked"(compId) {
    const result = UserData.find(
      {
        _id: this.userId,
        picks: {
          $elemMatch: {
            comparisonId: compId
          }
        }
      },
      { fields: { picks: 0, sessions: 0 } }
    ).fetch();
    return result.length;
  },
  "userData.getPicks"() {
    const result = UserData.find(
      {
        _id: this.userId
      },
      { fields: { _id: 0, "picks.comparisonId": 1 } }
    ).fetch();
    //console.log(result);
    if (!Object.keys(result[0]).length) return [];
    return result[0].picks.map(pick => pick["comparisonId"]);
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
        },
        $set: { "sessions.$.end.-1": new Date().toISOString() }
      }
    );
  }
});
