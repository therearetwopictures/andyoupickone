import { Meteor } from "meteor/meteor";
import { render } from "react-dom";
import React from "react";
import AppComponent from "../imports/ui/containers/app/app.js";

Meteor.startup(() => {
  AccountsAnonymous.login();
  // Meteor.call("userData.createUserSession");
  // Meteor.call("comparisons.addOne");
  Meteor.call("compMeta.classifyImage");

  // Meteor.call("comparisons.getRandOne");

  // Meteor.call("users.sendCookie");
  render(<AppComponent />, document.getElementById("app"));
});
