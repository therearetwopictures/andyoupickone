import { Meteor } from "meteor/meteor";
import { render } from "react-dom";
import React from "react";
import AppComponent from "../imports/ui/containers/app/app.js";

Meteor.startup(() => {
  AccountsAnonymous.login();
  render(<AppComponent />, document.getElementById("app"));
});
