import { Meteor } from "meteor/meteor";
import { render } from "react-dom";
import React from "react";
import AppComponent from "../imports/ui/containers/app/app.js";

Meteor.startup(() => {
  Meteor.call("users.sendCookie");
  render(<AppComponent />, document.getElementById("app"));
});
