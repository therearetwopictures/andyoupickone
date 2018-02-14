// Fill the DB with example data on startup

import { Meteor } from "meteor/meteor";
import Comparisons from "../../api/comparisons/comparisons.js";
import Users from "../../api/users/";

Meteor.startup(() => {
  Accounts.onCreateUser((options, user) => {
    const adminUser = Object.assign({ role: "admin" }, user);
    return adminUser;
  });
  if (Meteor.users.find({ role: "admin" }).count() === 0) {
    Accounts.createUser({
      email: "scottdlivingstone@gmail.com",
      password: "password"
    });
  }
});
