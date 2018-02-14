// Fill the DB with example data on startup

import { Meteor } from "meteor/meteor";
import Comparisons from "../../api/comparisons/comparisons.js";
import Users from "../../api/users/";

Meteor.startup(() => {
  Accounts.onCreateUser((options, user) => {
    const adminUser = Object.assign({ role: "admin" }, user);
    return adminUser;
  });
  if (Comparisons.find().count() === 0) {
    const data = [
      {
        urlA:
          "https://firebasestorage.googleapis.com/v0/b/boomtown-e933c.appspot.com/o/urlA.jpg?alt=media&token=1dbd46ea-bcb5-4b42-a4b5-df6ce1d2ac2e",
        urlB:
          "https://firebasestorage.googleapis.com/v0/b/boomtown-e933c.appspot.com/o/urlB.jpg?alt=media&token=8b933e2e-941c-421d-82b6-c01ac7f01453",
        createdAt: new Date()
      }
    ];

    data.forEach(comparison => Comparisons.insert(comparison));
  }
  if (Meteor.users.find({ role: "admin" }).count() === 0) {
    Accounts.createUser({
      email: "scottdlivingstone@gmail.com",
      password: "password"
    });
  }
});
