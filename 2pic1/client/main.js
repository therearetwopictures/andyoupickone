import { Meteor } from "meteor/meteor";
import { render } from "react-dom";
import React from "react";
import AppComponent from "../imports/ui/containers/app/app.js";

Meteor.startup(() => {
  AccountsAnonymous.login();
  Meteor.call("userData.createUserSession");
  // Meteor.call("comparisons.addOne");
  // Meteor.call(
  //   "compMeta.classifyImage",
  //   "434u3eCWXcRJgmQRv",
  //   "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1437660869i/23745753._UY500_SS500_.jpg",
  //   "http://www.artitude.eu/immagini/news/3-1307111909274.jpg"
  // );

  // Meteor.call("comparisons.getRandOne");

  render(<AppComponent />, document.getElementById("app"));
});
