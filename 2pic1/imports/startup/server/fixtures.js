// Fill the DB with example data on startup

import { Meteor } from "meteor/meteor";
import Comparisons from "../../api/comparisons/comparisons.js";

Meteor.startup(() => {
  Accounts.onCreateUser((options, user) => {
    console.log(user);
    if (user.emails) {
      const adminUser = Object.assign({ role: "admin" }, user);
      return adminUser;
    } else {
      return user;
    }
  });
  if (Meteor.users.find({ role: "admin" }).count() === 0) {
    Accounts.createUser({
      email: "scottdlivingstone@gmail.com",
      password: "password"
    });
  }
});
